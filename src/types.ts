export type AppPage = 'landing' | 'gallery' | 'editor';

export interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
}

export interface ParsedPage {
  width: number;
  height: number;
  items: TextItem[];
}
