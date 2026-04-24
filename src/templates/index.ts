import classic from './classic';
import modern from './modern';
import minimal from './minimal';
import sidebar from './sidebar';
import sharp from './sharp';
import executive from './executive';

export interface Template {
  id: string;
  name: string;
  description: string;
  latex: string;
}

const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional serif layout — timeless and professional.',
    latex: classic,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean sans-serif with indigo accents — great for tech & product roles.',
    latex: modern,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Understated and spacious — lets your content breathe.',
    latex: minimal,
  },
  {
    id: 'sharp',
    name: 'Sharp',
    description: 'Bold navy & teal, single-column portrait — modern engineering look.',
    latex: sharp,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Distinguished Times serif with charcoal & gold — built for C-suite and senior leadership.',
    latex: executive,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Two-column with a colored sidebar — striking design for creative and UX roles.',
    latex: sidebar,
  }
];

export default templates;
