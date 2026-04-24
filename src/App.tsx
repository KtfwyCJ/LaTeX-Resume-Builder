import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import type { AppPage } from './types';

export default function App() {
  const [page, setPage] = useState<AppPage>('landing');
  const [latexSource, setLatexSource] = useState('');

  const handleParsed = (latex: string) => {
    setLatexSource(latex);
    setPage('editor');
  };

  const handleBack = () => {
    setPage('landing');
    setLatexSource('');
  };

  if (page === 'editor') {
    return <EditorPage initialLatex={latexSource} onBack={handleBack} />;
  }

  return <LandingPage onParsed={handleParsed} />;
}
