// ============ Original language (Hebrew & Greek) ============
//
// Data built by scripts/build-original-language.mjs into public/data/original/.
// Sources: STEPBible Data (Tyndale House, Cambridge; CC BY 4.0) — tagged Hebrew OT
// (TAHOT), tagged Greek NT (TAGNT), brief lexicons (TBESH/TBESG), and the full LSJ
// Greek lexicon; Open Scriptures — Strong's Hebrew Dictionary and the BDB outline.

import { BIBLE_BOOKS, type BibleReference } from './bibleApi';

export interface OriginalWord {
  original: string;
  translit: string;
  gloss: string;
  /** Extended Strong's number, e.g. "H2617A", "G0026" */
  strong: string;
  /** Grammar code, e.g. "HVqp3ms", "V-AAI-3S" */
  morph: string;
}

export type LexiconLevel = 'brief' | 'full';

export interface BriefEntry {
  w: string;
  t: string;
  g: string;
  d: string;
}

export interface FullEntry {
  w: string;
  t: string;
  /** Greek (LSJ) */
  g?: string;
  d?: string;
  /** Hebrew: Strong's dictionary text */
  strongs?: string;
  /** Hebrew: BDB outline entries */
  bdb?: string[];
}

export interface Occurrences {
  /** Number of verses the word appears in */
  count: number;
  /** First references (up to 400) */
  refs: BibleReference[];
  /** Verse counts per book (STEPBible code -> count) */
  byBook: Record<string, number>;
}

export const ORIGINAL_ATTRIBUTION = {
  text: 'Hebrew & Greek text, glosses, and grammar: STEPBible.org, Tyndale House Cambridge (CC BY 4.0)',
  brief: {
    H: 'Translators Brief Lexicon of Hebrew — STEPBible.org (CC BY 4.0)',
    G: 'Translators Brief Lexicon of Greek (based on Abbott-Smith) — STEPBible.org (CC BY 4.0)',
  },
  full: {
    H: "Strong's Hebrew Dictionary (1890) and Brown-Driver-Briggs outline — Open Scriptures (work in progress)",
    G: 'Liddell-Scott-Jones Greek Lexicon (LSJ) — formatted by STEPBible.org (CC BY 4.0)',
  },
};

export const LEXICON_LEVELS: { id: LexiconLevel; label: string; description: string }[] = [
  { id: 'brief', label: 'Brief', description: 'A short translator’s definition — clear and quick.' },
  {
    id: 'full',
    label: 'In-depth',
    description:
      'Greek: the full Liddell-Scott-Jones lexicon (academic, covers classical Greek too). Hebrew: Strong’s dictionary plus the Brown-Driver-Briggs outline, which is still being completed.',
  },
];

// STEPBible book codes in canonical order (same order as BIBLE_BOOKS)
const STEP_BOOKS = [
  'Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rut', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est',
  'Job', 'Psa', 'Pro', 'Ecc', 'Sng', 'Isa', 'Jer', 'Lam', 'Ezk', 'Dan', 'Hos', 'Jol', 'Amo', 'Oba', 'Jon', 'Mic', 'Nam',
  'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Php', 'Col',
  '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev',
];

export function stepCode(book: string): string | undefined {
  const i = BIBLE_BOOKS.findIndex(b => b.name === book);
  return i >= 0 ? STEP_BOOKS[i] : undefined;
}

export function bookFromStep(code: string): string | undefined {
  const i = STEP_BOOKS.indexOf(code);
  return i >= 0 ? BIBLE_BOOKS[i].name : undefined;
}

/** "Gen.1.1" -> { book: 'Genesis', chapter: 1, verse: 1 } */
export function parseStepRef(ref: string): BibleReference | null {
  const [code, ch, vs] = ref.split('.');
  const book = bookFromStep(code);
  return book ? { book, chapter: Number(ch), verse: Number(vs) } : null;
}

export function isOldTestament(book: string): boolean {
  return BIBLE_BOOKS.find(b => b.name === book)?.testament === 'OT';
}

export function languageOf(strong: string): 'H' | 'G' {
  return strong.startsWith('G') ? 'G' : 'H';
}

/** "H2617A" -> "H2617", "G26" -> "G0026" */
export function baseStrong(strong: string): string {
  const m = strong.match(/^([HG])0*(\d+)/);
  return m ? `${m[1]}${m[2].padStart(4, '0')}` : strong;
}

/** Clean a lexicon transliteration for display: "che.sed" -> "chesed" */
export function formatTranslit(t: string): string {
  return t.replace(/[.·]/g, '').trim();
}

/** Display form: "H2617", "G26" style without leading zeros */
export function displayStrong(strong: string): string {
  const m = strong.match(/^([HG])0*(\d+)([A-Za-z]?)$/);
  return m ? `${m[1]}${m[2]}${m[3]}` : strong;
}

const chunkOf = (strong: string) => {
  const m = strong.match(/^([HG])(\d+)/);
  return m ? `${m[1]}${Math.floor(Number(m[2]) / 200)}` : null;
};

// ---- Loading (cached) ----

const BASE = `${import.meta.env.BASE_URL}data/original`;
const cache = new Map<string, Promise<unknown>>();

function load<T>(rel: string): Promise<T | null> {
  let p = cache.get(rel) as Promise<T | null> | undefined;
  if (!p) {
    p = fetch(`${BASE}/${rel}`).then(r => (r.ok ? (r.json() as Promise<T>) : null));
    p.catch(() => cache.delete(rel));
    cache.set(rel, p);
  }
  return p;
}

type RawWord = [string, string, string, string, string];

export async function getChapterWords(book: string, chapter: number): Promise<Record<number, OriginalWord[]>> {
  const code = stepCode(book);
  if (!code) return {};
  const data = await load<Record<string, RawWord[]>>(`text/${code}/${chapter}.json`);
  const result: Record<number, OriginalWord[]> = {};
  for (const [verse, words] of Object.entries(data ?? {})) {
    result[Number(verse)] = words.map(([original, translit, gloss, strong, morph]) => ({ original, translit, gloss, strong, morph }));
  }
  return result;
}

export async function getVerseWords(book: string, chapter: number, verse: number): Promise<OriginalWord[]> {
  return (await getChapterWords(book, chapter))[verse] ?? [];
}

let morphPromise: Promise<Record<string, string>> | null = null;
export async function describeMorph(code: string): Promise<string> {
  morphPromise ??= load<Record<string, string>>('morph.json').then(m => m ?? {});
  const morph = await morphPromise;
  return morph[code] ?? morph[code.replace(/-[A-Z]+$/, '')] ?? '';
}

/** Find the best key for a Strong's number in a chunk: exact, then same base number. */
function findKey<T>(data: Record<string, T> | null, strong: string): string | undefined {
  if (!data) return undefined;
  if (data[strong]) return strong;
  const base = baseStrong(strong);
  if (data[base]) return base;
  return Object.keys(data).find(k => baseStrong(k) === base);
}

export async function lookupBrief(strong: string): Promise<BriefEntry | null> {
  const chunk = chunkOf(baseStrong(strong));
  if (!chunk) return null;
  const data = await load<Record<string, BriefEntry>>(`lexicon/brief/${chunk}.json`);
  const key = findKey(data, strong);
  return key && data ? data[key] : null;
}

export async function lookupFull(strong: string): Promise<FullEntry | null> {
  const chunk = chunkOf(baseStrong(strong));
  if (!chunk) return null;
  const data = await load<Record<string, FullEntry>>(`lexicon/full/${chunk}.json`);
  const key = findKey(data, strong);
  return key && data ? data[key] : null;
}

/** Verses where this exact word appears. Falls back to all senses of the same number. */
export async function getOccurrences(strong: string): Promise<Occurrences> {
  const chunk = chunkOf(baseStrong(strong));
  if (!chunk) return { count: 0, refs: [], byBook: {} };
  type Raw = { n: number; r: string[]; b?: Record<string, number> };
  const data = await load<Record<string, Raw>>(`occurrences/${chunk}.json`);
  if (!data) return { count: 0, refs: [], byBook: {} };
  let entry = data[strong];
  if (!entry) {
    const base = baseStrong(strong);
    const keys = Object.keys(data).filter(k => baseStrong(k) === base);
    entry = keys.reduce<Raw>((acc, k) => {
      const b = { ...acc.b };
      for (const [book, n] of Object.entries(data[k].b ?? {})) b[book] = (b[book] ?? 0) + n;
      return { n: acc.n + data[k].n, r: [...acc.r, ...data[k].r], b };
    }, { n: 0, r: [], b: {} });
    entry.r.sort((a, b) => refOrder(a) - refOrder(b));
  }
  return {
    count: entry.n,
    refs: entry.r.map(parseStepRef).filter((r): r is BibleReference => !!r),
    byBook: entry.b ?? {},
  };
}

function refOrder(ref: string): number {
  const [code, ch, vs] = ref.split('.');
  return STEP_BOOKS.indexOf(code) * 1e6 + Number(ch) * 1e3 + Number(vs);
}

/** STEPBible book codes in canonical order */
export const STEP_BOOK_CODES = STEP_BOOKS;

// ---- Preference ----

const LEVEL_KEY = 'wl-lexicon-level';

export function getLexiconLevel(): LexiconLevel {
  try {
    return localStorage.getItem(LEVEL_KEY) === 'full' ? 'full' : 'brief';
  } catch {
    return 'brief';
  }
}

export function saveLexiconLevel(level: LexiconLevel) {
  try {
    localStorage.setItem(LEVEL_KEY, level);
  } catch {
    /* ignore */
  }
}

/** Find the original word(s) in a verse whose English gloss contains the given English word. */
export function matchWordsByGloss(words: OriginalWord[], english: string): OriginalWord[] {
  const target = english.toLowerCase().replace(/[^a-z']/g, '');
  if (!target) return [];
  const stem = target.replace(/(ing|ed|es|s)$/, '');
  return words.filter(w => {
    const tokens = w.gloss.toLowerCase().split(/[^a-z']+/).filter(Boolean);
    return tokens.some(t => t === target || (stem.length > 2 && t.startsWith(stem)));
  });
}

// ---- Look-up ----

export interface LexiconHit {
  strong: string;
  lemma: string;
  translit: string;
  gloss: string;
}

let indexPromise: Promise<LexiconHit[]> | null = null;

/** Search the lexicon by number ("H2617", "G26"), English gloss ("grace"), or transliteration ("hesed"). */
export async function searchLexicon(query: string, limit = 30): Promise<LexiconHit[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  indexPromise ??= load<[string, string, string, string][]>('lexicon/index.json').then(rows =>
    (rows ?? []).map(([strong, lemma, translit, gloss]) => ({ strong, lemma, translit, gloss }))
  );
  const index = await indexPromise;
  const num = q.match(/^([hg])\s*0*(\d+)([a-z]?)$/);
  if (num) {
    const base = `${num[1].toUpperCase()}${num[2].padStart(4, '0')}`;
    return index.filter(h => baseStrong(h.strong) === base).slice(0, limit);
  }
  const plain = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ.·’'ʼ-]/g, '');
  const pq = plain(q);
  const scored: { hit: LexiconHit; score: number }[] = [];
  for (const h of index) {
    const gloss = h.gloss.toLowerCase();
    const tr = plain(h.translit);
    let score = 0;
    if (gloss === q || tr === pq) score = 3;
    else if (gloss.split(/[^a-z]+/).includes(q)) score = 2;
    else if (gloss.split(/[^a-z]+/).some(w => w.startsWith(q)) || tr.startsWith(pq)) score = 1;
    if (score) scored.push({ hit: h, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.hit.gloss.length - b.hit.gloss.length)
    .slice(0, limit)
    .map(s => s.hit);
}
