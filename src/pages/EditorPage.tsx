import { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { compileLatex } from '../lib/latexCompiler';
import { saveResume } from '../lib/resumeStorage';

interface Props {
  initialLatex: string;
  onBack: () => void;
}

export default function EditorPage({ initialLatex, onBack }: Props) {
  const [source, setSource] = useState(initialLatex);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [compiling, setCompiling] = useState(false);
  const [compileError, setCompileError] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const prevPdfUrl = useRef<string | null>(null);
  const hasChanged = useRef(false);

  const [splitPct, setSplitPct] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPct(Math.min(80, Math.max(20, pct)));
    };
    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const compile = async (latexSource: string) => {
    setCompiling(true);
    setCompileError('');
    const result = await compileLatex(latexSource);
    setCompiling(false);

    if (result.ok && result.pdfUrl) {
      if (prevPdfUrl.current) URL.revokeObjectURL(prevPdfUrl.current);
      prevPdfUrl.current = result.pdfUrl;
      setPdfUrl(result.pdfUrl);
    } else {
      setCompileError(result.error ?? 'Unknown compile error.');
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    compile(initialLatex);
    return () => {
      if (prevPdfUrl.current) URL.revokeObjectURL(prevPdfUrl.current);
    };
  }, []);

  useEffect(() => {
    if (!hasChanged.current) { hasChanged.current = true; return; }
    const timer = setTimeout(() => saveResume(source), 1000);
    return () => clearTimeout(timer);
  }, [source]);

  const downloadTex = () => {
    const blob = new Blob([source], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'resume.pdf';
    a.click();
  };

  const copyTex = () => navigator.clipboard.writeText(source);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-indigo-500 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
          <span className="text-gray-200">|</span>
          <span className="font-bold text-gray-800 tracking-tight">
            LaTeX{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Resume Builder
            </span>
          </span>
        </div>
      </header>

      {/* Split panels */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left: LaTeX editor */}
        <div className="flex flex-col overflow-hidden" style={{ width: `${splitPct}%` }}>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              LaTeX Source
            </span>
            <div className="flex gap-2">
              <button
                onClick={copyTex}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-indigo-500 font-semibold hover:bg-indigo-50 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={downloadTex}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-indigo-500 font-semibold hover:bg-indigo-50 transition-colors"
              >
                Download .tex
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="latex"
              value={source}
              onChange={(val) => setSource(val ?? '')}
              theme="light"
              options={{
                fontSize: 13,
                lineNumbers: 'on',
                minimap: { enabled: false },
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                renderLineHighlight: 'line',
              }}
            />
          </div>

          {/* Compile error panel */}
          {compileError && (
            <div className="border-t border-red-100 bg-red-50">
              <button
                onClick={() => setErrorOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-red-500"
              >
                <span>⚠ Compile error</span>
                <span>{errorOpen ? '▲' : '▼'}</span>
              </button>
              {errorOpen && (
                <pre className="px-4 pb-3 text-xs text-red-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {compileError}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Draggable divider */}
        <div
          onMouseDown={onDividerMouseDown}
          className="w-1 bg-gray-200 hover:bg-indigo-400 cursor-col-resize transition-colors flex-shrink-0"
        />

        {/* Right: PDF preview */}
        <div className="flex flex-col bg-gray-50 overflow-hidden" style={{ width: `${100 - splitPct}%` }}>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              PDF Preview
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => compile(source)}
                disabled={compiling}
                className="
                  text-xs px-3 py-1.5 rounded-lg font-semibold transition-all
                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                  shadow shadow-indigo-200
                  hover:from-indigo-600 hover:to-purple-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {compiling ? 'Compiling…' : '↺ Recompile'}
              </button>
              <button
                onClick={downloadPdf}
                disabled={!pdfUrl}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-indigo-500 font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            {compiling && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Compiling LaTeX…</p>
                </div>
              </div>
            )}

            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Compiled PDF"
              />
            ) : !compiling ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
                <span className="text-5xl">📄</span>
                <p className="text-sm">Click Recompile to preview</p>
              </div>
            ) : null}
          </div>

          <div className="px-4 py-2 border-t border-gray-100 bg-white text-center text-xs text-gray-300">
            Compiled via LaTeX.Online · click Recompile after edits
          </div>
        </div>
      </div>
    </div>
  );
}
