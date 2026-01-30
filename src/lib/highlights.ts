// ============ Types ============

export type HighlightColor = 'gold' | 'sage' | 'sky' | 'rose';

export interface VerseHighlight {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  note?: string;
  createdAt: string;
}

// ============ Storage ============

const STORAGE_KEY = 'wl-highlights';

function loadAll(): VerseHighlight[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(highlights: VerseHighlight[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
}

// ============ CRUD ============

export function getAllHighlights(): VerseHighlight[] {
  return loadAll();
}

export function getHighlightsForChapter(book: string, chapter: number): VerseHighlight[] {
  return loadAll().filter(h => h.book === book && h.chapter === chapter);
}

export function getHighlightForVerse(
  book: string,
  chapter: number,
  verse: number
): VerseHighlight | undefined {
  return loadAll().find(h => h.book === book && h.chapter === chapter && h.verse === verse);
}

export function saveHighlight(
  book: string,
  chapter: number,
  verse: number,
  color: HighlightColor = 'gold',
  note?: string
): VerseHighlight {
  const highlights = loadAll();

  // Remove existing highlight on this verse if any
  const filtered = highlights.filter(
    h => !(h.book === book && h.chapter === chapter && h.verse === verse)
  );

  const highlight: VerseHighlight = {
    id: crypto.randomUUID(),
    book,
    chapter,
    verse,
    color,
    note,
    createdAt: new Date().toISOString(),
  };

  filtered.unshift(highlight);
  saveAll(filtered);
  return highlight;
}

export function removeHighlight(book: string, chapter: number, verse: number): void {
  const highlights = loadAll();
  const filtered = highlights.filter(
    h => !(h.book === book && h.chapter === chapter && h.verse === verse)
  );
  saveAll(filtered);
}

export function updateHighlightNote(
  book: string,
  chapter: number,
  verse: number,
  note: string
): void {
  const highlights = loadAll();
  const target = highlights.find(
    h => h.book === book && h.chapter === chapter && h.verse === verse
  );
  if (target) {
    target.note = note;
    saveAll(highlights);
  }
}

export function getHighlightCount(): number {
  return loadAll().length;
}

// ============ Color Utilities ============

export const HIGHLIGHT_COLORS: Record<HighlightColor, { bg: string; text: string; label: string }> = {
  gold: { bg: 'rgba(218, 165, 32, 0.2)', text: '#DAA520', label: 'Gold' },
  sage: { bg: 'rgba(135, 169, 107, 0.2)', text: '#87A96B', label: 'Sage' },
  sky: { bg: 'rgba(100, 149, 237, 0.2)', text: '#6495ED', label: 'Sky' },
  rose: { bg: 'rgba(205, 92, 92, 0.15)', text: '#CD5C5C', label: 'Rose' },
};
