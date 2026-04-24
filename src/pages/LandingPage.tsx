import { useCallback, useEffect, useRef, useState } from 'react';
import { renderPagesAsImages } from '../lib/pdfParser';
import { clearResume, loadResume } from '../lib/resumeStorage';
import type { Draft } from '../lib/resumeStorage';

async function renderFirstPage(file: File): Promise<string> {
  const [img] = await renderPagesAsImages(file, 1);
  return img;
}

interface Props {
  onParsed: (latex: string) => void;
  onOpenGallery: () => void;
}

const MAX_SIZE = 10 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function draftAge(savedAt: number): string {
  const days = Math.floor((Date.now() - savedAt) / 86_400_000);
  return days < 1 ? 'today' : `${days} day${days === 1 ? '' : 's'} ago`;
}

export default function LandingPage({ onParsed, onOpenGallery }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(loadResume());
  }, []);

  // Render first page to canvas image when a file is selected
  useEffect(() => {
    if (!previewFile) { setPreviewImg(null); return; }
    let cancelled = false;
    renderFirstPage(previewFile).then((img) => {
      if (!cancelled) setPreviewImg(img);
    });
    return () => { cancelled = true; };
  }, [previewFile]);

  const validateAndPreview = useCallback((file: File) => {
    setError('');
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('File is too large. Maximum size is 10 MB.');
      return;
    }
    setPreviewFile(file);
  }, []);

  const confirmConvert = useCallback(async () => {
    if (!previewFile) return;
    setLoading(true);
    setError('');
    try {
      const images = await renderPagesAsImages(previewFile);
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { error?: string };
        setError(json.error ?? `Conversion failed (HTTP ${res.status})`);
        setLoading(false);
        return;
      }
      const { latex } = await res.json() as { latex: string };
      onParsed(latex);
    } catch {
      setError('Failed to convert the PDF. Please try another file.');
      setLoading(false);
    }
  }, [previewFile, onParsed]);

  const cancelPreview = () => {
    setPreviewFile(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndPreview(file);
  }, [validateAndPreview]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndPreview(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Resume draft banner */}
      {draft && (
        <div className="fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-3 px-5 py-2.5 bg-indigo-600 text-white text-sm">
          <span className="flex items-center gap-2">
            <span>You have changes saved {draftAge(draft.savedAt)} —</span>
            <button
              onClick={() => onParsed(draft.latex)}
              className="font-semibold underline underline-offset-2 hover:text-indigo-200 transition-colors"
            >
              Resume editing →
            </button>
          </span>
          <button
            onClick={() => { clearResume(); setDraft(null); }}
            className="text-indigo-200 hover:text-white transition-colors leading-none"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

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
      <p className="text-gray-500 text-lg mb-10 text-center max-w-md leading-relaxed">
        Pick a professional template and edit it live — or import your existing PDF resume.
      </p>

      {/* Primary CTA: Templates */}
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-px shadow-xl shadow-indigo-200">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 px-8 py-8 text-center">
          {/* Mini template chips */}
          <div className="flex justify-center gap-2 mb-6">
            {['Modern', 'Classic', 'Minimal', 'Sidebar', 'Executive'].map((name) => (
              <span
                key={name}
                className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
            Start from a Template
          </h2>
          <p className="text-indigo-100 text-sm mb-7 leading-relaxed">
            10+ professional designs ready to customize with a live LaTeX editor and instant PDF preview.
          </p>
          <button
            onClick={onOpenGallery}
            className="
              w-full py-3.5 rounded-xl bg-white text-indigo-600 font-bold text-sm tracking-wide
              shadow-lg hover:bg-indigo-50 transition-colors duration-200
            "
          >
            Browse Templates →
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 w-full max-w-md my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">or import your PDF</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Secondary CTA: PDF upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          w-full max-w-md border-2 border-dashed rounded-2xl px-8 py-6 text-center cursor-pointer
          transition-all duration-200 select-none
          ${isDragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'}
        `}
      >
        <p className="text-sm font-semibold text-gray-500 mb-1">
          {isDragging ? 'Release to upload' : 'Drop your PDF here'}
        </p>
        <p className="text-xs text-gray-400 mb-4">PDF only · Max 10 MB</p>
        <button
          className="
            px-6 py-2.5 rounded-xl text-indigo-600 text-sm font-bold border-2 border-indigo-200
            hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200
          "
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Browse File
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

      {/* Preview modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-800 text-sm truncate max-w-xs">{previewFile.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatSize(previewFile.size)}</p>
              </div>
              <button
                onClick={cancelPreview}
                className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* PDF thumbnail */}
            <div className="bg-gray-50 px-5 py-4 flex items-center justify-center min-h-[16rem]">
              {previewImg ? (
                <img
                  src={`data:image/png;base64,${previewImg}`}
                  alt="Resume preview"
                  className="max-h-64 w-auto rounded-lg border border-gray-200 shadow-sm object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-300">
                  <div className="w-6 h-6 border-2 border-gray-200 border-t-indigo-400 rounded-full animate-spin" />
                  <span className="text-xs">Loading preview…</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">
              <button
                onClick={cancelPreview}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmConvert}
                disabled={loading}
                className="
                  px-6 py-2 rounded-lg text-sm font-bold text-white
                  bg-gradient-to-r from-indigo-500 to-purple-500
                  shadow shadow-indigo-200
                  hover:from-indigo-600 hover:to-purple-600
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center gap-2
                "
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Converting…
                  </>
                ) : (
                  'Convert to LaTeX'
                )}
              </button>
            </div>

            {loading && (
              <p className="text-xs text-indigo-400 text-center pb-4 animate-pulse">
                AI is analyzing your resume… this may take 15–30 seconds.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
