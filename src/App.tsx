import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import TemplateGallery from './components/TemplateGallery';
import templates from './templates';
import type { AppPage } from './types';

export default function App() {
  const [page, setPage] = useState<AppPage>('landing');
  const [latexSource, setLatexSource] = useState('');

  const handleParsed = (latex: string) => {
    setLatexSource(latex);
    setPage('editor');
  };

  if (page === 'editor') {
    return (
      <EditorPage
        initialLatex={latexSource}
        onBack={() => { setPage('landing'); setLatexSource(''); }}
      />
    );
  }

  if (page === 'gallery') {
    return (
      <TemplateGallery
        templates={templates}
        onSelect={handleParsed}
        onBack={() => setPage('landing')}
      />
    );
  }

  return <LandingPage onParsed={handleParsed} onOpenGallery={() => setPage('gallery')} />;
}
