import { useCallback, useRef, useState } from 'react';
import { renderPagesAsImages } from '../lib/pdfParser';

interface Props {
  onParsed: (latex: string) => void;
}

const MAX_SIZE = 10 * 1024 * 1024;

export default function LandingPage({ onParsed }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError('');
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are supported.');
        return;
      }
      if (file.size > MAX_SIZE) {
        setError('File is too large. Maximum size is 10 MB.');
        return;
      }

      setLoading(true);
      try {
        const images = await renderPagesAsImages(file);
        const res = await fetch('/api/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({})) as { error?: string };
          setError(json.error ?? `Conversion failed (HTTP ${res.status})`);
          return;
        }
        const { latex } = await res.json() as { latex: string };
        onParsed(latex);
      } catch {
        setError('Failed to convert the PDF. Please try another file.');
      } finally {
        setLoading(false);
      }
    },
    [onParsed],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Badge */}
      <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase">
        ✦ Free · No sign-up needed
      </div>

      {/* Headline */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 text-center leading-tight">
        LaTeX Based{' '}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Resume Builder
        </span>
      </h1>
      <p className="text-gray-500 text-lg mb-12 text-center max-w-md leading-relaxed">
        Upload your PDF resume and instantly get pixel-perfect LaTeX source — fully editable with a live compiled preview.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          w-full max-w-md border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer
          transition-all duration-200 select-none
          ${isDragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-indigo-200 bg-white hover:border-indigo-400 hover:bg-indigo-50'}
        `}
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl">
          📄
        </div>
        <h3 className="text-base font-semibold text-gray-700 mb-2">
          {isDragging ? 'Release to upload' : 'Drop your resume here'}
        </h3>
        <p className="text-sm text-gray-400 mb-6">PDF only · Max 10 MB</p>

        <button
          disabled={loading}
          className="
            px-7 py-3 rounded-xl text-white text-sm font-bold tracking-wide
            bg-gradient-to-r from-indigo-500 to-purple-500
            shadow-lg shadow-indigo-200
            hover:shadow-xl hover:from-indigo-600 hover:to-purple-600
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-200
          "
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          {loading ? 'Converting…' : 'Browse & Convert'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {error && (
        <p className="mt-5 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-5 py-3 max-w-md text-center">
          {error}
        </p>
      )}

      {loading && (
        <p className="mt-5 text-sm text-indigo-500 animate-pulse">
          Converting your resume with AI… this may take 15–30 seconds.
        </p>
      )}
    </div>
  );
}
