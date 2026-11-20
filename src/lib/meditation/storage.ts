// ============ Scripture Meditation — splitting, saved verses, settings ============

export interface MeditationTarget {
  book: string;
  chapter: number;
  verse: number;
  inhale: string;
  exhale: string;
  translation?: string;
  /** Truth about God shown before the session begins (catalog verses) */
  truth?: string;
}

/** Router state used to open a verse in the Meditate tab (e.g. from the Bible reader). */
export interface MeditateLocationState {
  verse?: { book: string; chapter: number; verse: number; text: string; translation?: string };
}

export interface SavedMeditationVerse extends MeditationTarget {
  id: string;
  savedAt: string;
}

export interface BreathPace {
  id: 'gentle' | 'slow' | 'even';
  label: string;
  inhaleSec: number;
  exhaleSec: number;
}

export const BREATH_PACES: BreathPace[] = [
  { id: 'gentle', label: 'Gentle', inhaleSec: 4, exhaleSec: 6 },
  { id: 'slow', label: 'Slow', inhaleSec: 5, exhaleSec: 7 },
  { id: 'even', label: 'Even', inhaleSec: 4, exhaleSec: 4 },
];

export const SESSION_MINUTES = [1, 3, 5] as const;
export type SessionMinutes = (typeof SESSION_MINUTES)[number];

export interface MeditationSettings {
  paceId: BreathPace['id'];
  minutes: SessionMinutes;
}

const SAVED_KEY = 'wl-meditation-verses';
const SETTINGS_KEY = 'wl-meditation-settings';
const DEFAULT_SETTINGS: MeditationSettings = { paceId: 'gentle', minutes: 3 };

// ---- Splitting ----

/** Normalize verse text into words (keeps punctuation attached to words). */
export function toWords(text: string): string[] {
  return text
    .replace(/[“”"]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Choose where to break a verse into an inhale half and an exhale half.
 * Returns the number of words in the inhale half. Prefers a natural pause
 * (; : , — .) nearest the middle; falls back to the midpoint.
 */
export function suggestBreak(words: string[]): number {
  if (words.length < 2) return words.length;
  const mid = words.length / 2;
  // Strength of a break placed after `prev` and before `next`
  const strength = (prev: string, next: string) => {
    if (/[.;:!?]$/.test(prev) || /—$/.test(prev)) return 3;
    if (/,$/.test(prev)) return 2;
    // No punctuation: breaking before a conjunction still reads naturally
    if (/^(and|but|for|so|that|because|yet|or|who|which)$/i.test(next)) return 1;
    return 0;
  };
  let best = Math.round(mid);
  let bestScore = -Infinity;
  for (let i = 1; i < words.length; i++) {
    const s = strength(words[i - 1], words[i]);
    if (s === 0) continue;
    // Strong pauses near the middle win; distance from middle is penalized
    const score = s * 2 - Math.abs(i - mid) / Math.max(words.length / 6, 1);
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

export function splitAt(words: string[], breakIndex: number): { inhale: string; exhale: string } {
  return {
    inhale: words.slice(0, breakIndex).join(' '),
    exhale: words.slice(breakIndex).join(' '),
  };
}

export function splitVerse(text: string): { inhale: string; exhale: string } {
  const words = toWords(text);
  return splitAt(words, suggestBreak(words));
}

// ---- Saved verses ("Your verses") ----

function verseId(t: { book: string; chapter: number; verse: number }): string {
  return `${t.book}-${t.chapter}-${t.verse}`.toLowerCase().replace(/\s+/g, '-');
}

export function getSavedMeditationVerses(): SavedMeditationVerse[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save (or update the split of) a verse in "Your verses". Most recent first. */
export function saveMeditationVerse(target: MeditationTarget): SavedMeditationVerse {
  const id = verseId(target);
  const entry: SavedMeditationVerse = { ...target, id, savedAt: new Date().toISOString() };
  const rest = getSavedMeditationVerses().filter(v => v.id !== id);
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify([entry, ...rest]));
  } catch {
    /* storage unavailable — session still works */
  }
  return entry;
}

export function removeMeditationVerse(id: string): void {
  try {
    const next = getSavedMeditationVerses().filter(v => v.id !== id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

// ---- Settings ----

export function getMeditationSettings(): MeditationSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveMeditationSettings(settings: MeditationSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}

export function getPace(id: BreathPace['id']): BreathPace {
  return BREATH_PACES.find(p => p.id === id) ?? BREATH_PACES[0];
}
