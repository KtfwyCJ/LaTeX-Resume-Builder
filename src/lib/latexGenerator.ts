import type { ParsedPage, TextItem } from '../types';

interface FontSizeGroup {
  size: number;
  role: 'name' | 'section' | 'body' | 'small';
}

function classifyFontSizes(items: TextItem[]): Map<number, FontSizeGroup['role']> {
  const sizes = [...new Set(items.map((i) => Math.round(i.fontSize)))].sort((a, b) => b - a);
  const map = new Map<number, FontSizeGroup['role']>();
  sizes.forEach((size, idx) => {
    if (idx === 0) map.set(size, 'name');
    else if (idx === 1) map.set(size, 'section');
    else if (idx === sizes.length - 1 && sizes.length > 3) map.set(size, 'small');
    else map.set(size, 'body');
  });
  return map;
}

function inferMargins(page: ParsedPage) {
  const xs = page.items.map((i) => i.x);
  const ys = page.items.map((i) => i.y);
  const xRights = page.items.map((i) => i.x + (i.width || 0));

  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const right = page.width - Math.max(...xRights);
  const bottom = page.height - Math.max(...ys);

  const toMm = (pt: number) => Math.round((pt * 25.4) / 72);
  return {
    left: Math.max(10, toMm(left)),
    right: Math.max(10, toMm(right)),
    top: Math.max(10, toMm(top)),
    bottom: Math.max(10, toMm(bottom)),
  };
}

function detectColumns(items: TextItem[], pageWidth: number): boolean {
  const midX = pageWidth / 2;
  const leftCount = items.filter((i) => i.x + (i.width || 0) / 2 < midX).length;
  const rightCount = items.filter((i) => i.x + (i.width || 0) / 2 >= midX).length;
  const ratio = Math.min(leftCount, rightCount) / Math.max(leftCount, rightCount);
  return ratio > 0.3 && leftCount > 5 && rightCount > 5;
}

function escapeLatex(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

function groupIntoLines(items: TextItem[]): TextItem[][] {
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);
  const lines: TextItem[][] = [];
  let currentLine: TextItem[] = [];
  let lastY = -Infinity;

  for (const item of sorted) {
    if (Math.abs(item.y - lastY) > item.fontSize * 0.6 && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [];
    }
    currentLine.push(item);
    lastY = item.y;
  }
  if (currentLine.length > 0) lines.push(currentLine);
  return lines;
}

export function generateLatex(pages: ParsedPage[]): string {
  if (pages.length === 0) return '';

  const allItems = pages.flatMap((p) => p.items);
  const fontRoles = classifyFontSizes(allItems);
  const margins = inferMargins(pages[0]);
  const isMultiColumn = detectColumns(pages[0].items, pages[0].width);

  const packages = [
    '\\usepackage[T1]{fontenc}',
    '\\usepackage[utf8]{inputenc}',
    `\\usepackage[top=${margins.top}mm, bottom=${margins.bottom}mm, left=${margins.left}mm, right=${margins.right}mm]{geometry}`,
    '\\usepackage{titlesec}',
    '\\usepackage{enumitem}',
    '\\usepackage{hyperref}',
    '\\usepackage{xcolor}',
    ...(isMultiColumn ? ['\\usepackage{multicol}'] : []),
  ];

  const titlesetup = [
    '\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]',
    '\\titlespacing*{\\section}{0pt}{6pt}{4pt}',
    '\\setlength{\\parindent}{0pt}',
    '\\setlength{\\parskip}{2pt}',
    '\\hypersetup{colorlinks=true, urlcolor=blue, linkcolor=black}',
    '\\pagestyle{empty}',
  ];

  const bodyLines: string[] = [];

  for (const page of pages) {
    const lines = groupIntoLines(page.items);
    let inSection = false;
    let nameEmitted = false;

    for (const line of lines) {
      const lineText = line.map((i) => i.text).join(' ').trim();
      if (!lineText) continue;

      const dominantSize = Math.round(
        line.reduce((sum, i) => sum + i.fontSize, 0) / line.length,
      );
      const role = fontRoles.get(dominantSize) ?? 'body';

      if (role === 'name' && !nameEmitted) {
        bodyLines.push(`\\begin{center}`);
        bodyLines.push(`  {\\LARGE\\bfseries ${escapeLatex(lineText)}}`);
        bodyLines.push(`\\end{center}`);
        nameEmitted = true;
      } else if (role === 'section') {
        if (inSection) bodyLines.push('');
        bodyLines.push(`\\section*{${escapeLatex(lineText)}}`);
        inSection = true;
      } else if (role === 'small') {
        bodyLines.push(`{\\small ${escapeLatex(lineText)}}\\\\`);
      } else {
        bodyLines.push(escapeLatex(lineText) + '\\\\[2pt]');
      }
    }
  }

  return [
    '\\documentclass[11pt,a4paper]{article}',
    ...packages,
    '',
    ...titlesetup,
    '',
    '\\begin{document}',
    '',
    ...bodyLines,
    '',
    '\\end{document}',
  ].join('\n');
}
