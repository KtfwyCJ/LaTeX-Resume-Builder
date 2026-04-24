const KEY = 'latex_resume_draft';
const TTL = 30 * 24 * 60 * 60 * 1000;

export interface Draft {
  latex: string;
  savedAt: number;
}

export function saveResume(latex: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ latex, savedAt: Date.now() }));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

export function loadResume(): Draft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Draft;
    if (!draft.latex || !draft.savedAt || Date.now() - draft.savedAt > TTL) {
      localStorage.removeItem(KEY);
      return null;
    }
    return draft;
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
}

export function clearResume(): void {
  localStorage.removeItem(KEY);
}
