import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem as PdfjsTextItem } from 'pdfjs-dist/types/src/display/api';
import type { ParsedPage, TextItem } from '../types';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export async function renderPagesAsImages(file: File, maxPages = 3): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: string[] = [];
  const count = Math.min(pdf.numPages, maxPages);

  for (let i = 1; i <= count; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''));
  }

  return images;
}

export async function parsePdf(file: File): Promise<ParsedPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: ParsedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();

    const items: TextItem[] = textContent.items
      .filter((item): item is PdfjsTextItem => 'str' in item && (item as PdfjsTextItem).str.trim() !== '')
      .map((item) => {
        const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
        const fontSize = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);
        return {
          text: item.str,
          x: tx[4],
          y: viewport.height - tx[5],
          width: item.width ?? 0,
          height: item.height ?? fontSize,
          fontSize,
          fontName: item.fontName ?? '',
        };
      });

    pages.push({ width: viewport.width, height: viewport.height, items });
  }

  return pages;
}
