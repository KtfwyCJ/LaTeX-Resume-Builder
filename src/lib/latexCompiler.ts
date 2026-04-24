export interface CompileResult {
  ok: boolean;
  pdfUrl?: string;
  error?: string;
}

export async function compileLatex(source: string): Promise<CompileResult> {
  try {
    const res = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
    });

    if (!res.ok) {
      let error = `Compile failed (HTTP ${res.status})`;
      try {
        const json = await res.json() as { error?: string };
        if (json.error) error = json.error;
      } catch {
        error = await res.text() || error;
      }
      return { ok: false, error };
    }

    const blob = await res.blob();
    const pdfUrl = URL.createObjectURL(blob);
    return { ok: true, pdfUrl };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error
        ? err.message
        : 'Network error — compilation service may be unreachable. Try pasting your .tex into Overleaf.',
    };
  }
}
