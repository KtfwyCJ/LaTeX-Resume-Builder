# Resume Draft Storage — Design Spec

**Date:** 2026-04-24  
**Status:** Approved

## Goal

Persist a user's LaTeX editor content in the browser for up to 30 days with no database or login required. When the user returns to the landing page, show a non-intrusive banner inviting them to resume where they left off.

## Storage Layer

**File:** `src/lib/resumeStorage.ts`  
**Storage key:** `latex_resume_draft`  
**Stored value shape:** `{ latex: string, savedAt: number }` (savedAt is `Date.now()`)

Three exported functions:

| Function | Behaviour |
|---|---|
| `saveResume(latex)` | Writes the current LaTeX source + current timestamp to localStorage |
| `loadResume()` | Reads the entry; returns `null` and deletes the entry if it is older than 30 days or malformed; otherwise returns `{ latex, savedAt }` |
| `clearResume()` | Deletes the entry unconditionally |

The 30-day expiry check: `Date.now() - savedAt > 30 * 24 * 60 * 60 * 1000`.

## Auto-Save in the Editor

**File:** `src/pages/EditorPage.tsx`

- A `useEffect` watches `source` and schedules `saveResume(source)` after a **1-second debounce**.
- The debounce timer is cancelled and rescheduled on every keystroke, so storage is only written when the user pauses.
- Saving is completely silent — no toast, no indicator.

## Landing Page Banner

**File:** `src/pages/LandingPage.tsx`

- On mount, call `loadResume()`.
- If it returns data, render a slim banner at the top of the page:
  > `"You have changes saved N days ago — Resume editing →"` `[×]`
  - `N` is computed as `Math.floor((Date.now() - savedAt) / 86_400_000)`. If less than 1 day, show `"today"`.
- **Resume editing →** — calls the existing `onParsed(latex)` prop, navigating to `EditorPage` with the saved source pre-filled. Does NOT call `clearResume()` so the draft stays saved while editing continues.
- **`×` button** — calls `clearResume()` and hides the banner for the rest of the session (local state, no reload).
- If `loadResume()` returns `null`, the banner is not rendered at all.

## Data Flow

```
EditorPage (source changes)
  └─ debounce 1s → saveResume(source) → localStorage

LandingPage (mount)
  └─ loadResume()
       ├─ null → no banner
       └─ { latex, savedAt }
            ├─ "Resume" clicked → onParsed(latex) → EditorPage
            └─ "×" clicked → clearResume() → banner hidden
```

## Error Handling

- `localStorage` writes are wrapped in a try/catch inside `saveResume`; failure is silently ignored (storage quota exceeded, private mode restrictions, etc.).
- `loadResume` is wrapped in try/catch; any parse error causes it to delete the corrupted entry and return `null`.

## Out of Scope

- Cross-device sync
- Multiple saved drafts / draft history
- Explicit "Save" button or save indicator UI
- Any server-side persistence
