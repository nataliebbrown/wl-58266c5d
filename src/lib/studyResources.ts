// ============ Study mode resources ============
//
// All from the Free Use Bible API (bible.helloao.org):
//  - Study notes: Tyndale Open Study Notes — CC BY-SA 4.0
//  - Classic commentary: Matthew Henry's Commentary (public domain)
//  - Cross-references: Treasury of Scripture Knowledge (public domain)
//  - Footnotes: Berean Standard Bible (public domain)

import { BOOK_TO_USFM, getBook, type BibleReference } from './bibleApi';

const API = 'https://bible.helloao.org/api';

export type CommentarySource = 'tyndale' | 'matthew-henry';

export const COMMENTARY_SOURCES: { id: CommentarySource; label: string; credit: string }[] = [
  { id: 'tyndale', label: 'Study notes', credit: 'Tyndale Open Study Notes (CC BY-SA 4.0)' },
  { id: 'matthew-henry', label: 'Classic commentary', credit: "Matthew Henry's Commentary (1706), public domain" },
];

export interface VerseNote {
  /** Verse the note starts at */
  verse: number;
  /** Paragraphs of the note */
  paragraphs: string[];
}

export interface ChapterNotes {
  introduction?: string;
  notes: VerseNote[];
}

export interface CrossRef {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
  label: string;
}

export interface CrossRefGroup {
  /** The word/phrase in the verse the references explain, e.g. "green pastures." */
  keyword?: string;
  refs: CrossRef[];
}

export interface VerseCrossRefs {
  verse: number;
  groups: CrossRefGroup[];
}

export interface Footnote {
  verse: number;
  text: string;
}

interface ApiChapter {
  chapter: {
    number: number;
    introduction?: string;
    content: { type: string; number?: number; content?: unknown[] }[];
    footnotes?: { text: string; reference?: { chapter: number; verse: number } }[];
  };
}

// ---- Fetch with caching ----

const cache = new Map<string, Promise<unknown>>();

function cachedJson<T>(url: string): Promise<T> {
  let p = cache.get(url) as Promise<T> | undefined;
  if (!p) {
    p = fetch(url).then(r => {
      if (r.status === 404) return null as T; // no entry for this chapter
      if (!r.ok) throw new Error(`Request failed (${r.status})`);
      return r.json() as Promise<T>;
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}

function usfm(book: string): string {
  const code = BOOK_TO_USFM[book];
  if (!code) throw new Error(`Unknown book: ${book}`);
  return code;
}

function textOf(content: unknown[] | undefined): string {
  return (content ?? [])
    .map(c => (typeof c === 'string' ? c : typeof c === 'object' && c && 'text' in c ? String((c as { text: unknown }).text) : ''))
    .join(' ')
    .trim();
}

// ---- Study notes / commentary ----

/** Split a note into readable paragraphs (Tyndale uses " • " between points). */
function toParagraphs(text: string, chapter: number): string[] {
  return (
    text
      // Drop the leading "3:1 " reference Tyndale prefixes to each note
      .replace(new RegExp(`^${chapter}:\\d+(?:-\\d+)?\\s+`), '')
      .split(/\s*•\s*|\n+/)
      // A note can hold several sub-notes ("…begins; 3:16-21 might be… 3:16 The truth…"):
      // start a new paragraph at each "ch:v " that follows the end of a sentence
      .flatMap(p => p.split(new RegExp(`(?<=[.!?”’)])\\s+(?=${chapter}:\\d+(?:-\\d+)?\\s)`)))
      .map(s => s.trim())
      .filter(Boolean)
  );
}

export async function fetchChapterNotes(book: string, chapter: number, source: CommentarySource): Promise<ChapterNotes> {
  const data = await cachedJson<ApiChapter | null>(`${API}/c/${source}/${usfm(book)}/${chapter}.json`);
  if (!data) return { notes: [] };
  const notes = data.chapter.content
    .filter(item => item.type === 'verse' && typeof item.number === 'number')
    .map(item => ({ verse: item.number!, paragraphs: toParagraphs(textOf(item.content), chapter) }))
    .filter(n => n.paragraphs.length > 0);
  return { introduction: data.chapter.introduction?.trim() || undefined, notes };
}

interface ApiBooks {
  books: { id: string; introduction?: string }[];
}

/** Book introduction from Tyndale's study notes. */
export async function fetchBookIntroduction(book: string): Promise<string | undefined> {
  const data = await cachedJson<ApiBooks | null>(`${API}/c/tyndale/books.json`);
  return data?.books.find(b => b.id === usfm(book))?.introduction?.trim() || undefined;
}

// ---- Footnotes (BSB) ----

export async function fetchFootnotes(book: string, chapter: number): Promise<Footnote[]> {
  const data = await cachedJson<ApiChapter | null>(`${API}/BSB/${usfm(book)}/${chapter}.json`);
  return (data?.chapter.footnotes ?? [])
    .filter(f => f.reference?.chapter === chapter)
    .map(f => ({ verse: f.reference!.verse, text: f.text.trim() }));
}

// ---- Cross-references (Treasury of Scripture Knowledge) ----

// TSK's book abbreviations -> app book names
const TSK_BOOKS: Record<string, string> = {
  Ge: 'Genesis', Ex: 'Exodus', Le: 'Leviticus', Nu: 'Numbers', De: 'Deuteronomy', Jos: 'Joshua',
  Jud: 'Judges', Ru: 'Ruth', '1Sa': '1 Samuel', '2Sa': '2 Samuel', '1Ki': '1 Kings', '2Ki': '2 Kings',
  '1Ch': '1 Chronicles', '2Ch': '2 Chronicles', Ezr: 'Ezra', Ne: 'Nehemiah', Es: 'Esther', Job: 'Job',
  Ps: 'Psalms', Pr: 'Proverbs', Ec: 'Ecclesiastes', So: 'Song of Solomon', Isa: 'Isaiah',
  Jer: 'Jeremiah', La: 'Lamentations', Eze: 'Ezekiel', Da: 'Daniel', Ho: 'Hosea', Joe: 'Joel',
  Am: 'Amos', Ob: 'Obadiah', Jon: 'Jonah', Mic: 'Micah', Na: 'Nahum', Hab: 'Habakkuk',
  Zep: 'Zephaniah', Hag: 'Haggai', Zec: 'Zechariah', Mal: 'Malachi', Mt: 'Matthew', Mr: 'Mark',
  Lu: 'Luke', Joh: 'John', Ac: 'Acts', Ro: 'Romans', '1Co': '1 Corinthians', '2Co': '2 Corinthians',
  Ga: 'Galatians', Eph: 'Ephesians', Php: 'Philippians', Col: 'Colossians', '1Th': '1 Thessalonians',
  '2Th': '2 Thessalonians', '1Ti': '1 Timothy', '2Ti': '2 Timothy', Tit: 'Titus', Phm: 'Philemon',
  Heb: 'Hebrews', Jas: 'James', '1Pe': '1 Peter', '2Pe': '2 Peter', '1Jo': '1 John', '2Jo': '2 John',
  '3Jo': '3 John', Jude: 'Jude', Re: 'Revelation',
};

// One reference token: optional book, then "ch:v[,v][-v]" or a bare verse list
const TOKEN = /^(?:([123]?[A-Z][a-z]+)\s+)?(\d+(?:[,–-]\d+)*)(?::([\d,\s–-]+))?$/;

function shortLabel(book: string, chapter: number, verse?: number, endVerse?: number): string {
  const abbr = getBook(book)?.abbreviation ?? book;
  if (verse === undefined) return `${abbr} ${chapter}`;
  return `${abbr} ${chapter}:${verse}${endVerse ? `–${endVerse}` : ''}`;
}

/** Expand "11,14,27-30" into [{verse:11},{verse:14},{verse:27,endVerse:30}]. */
function expandVerses(list: string): { verse: number; endVerse?: number }[] {
  return list
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(part => {
      const [a, b] = part.split(/[–-]/).map(n => parseInt(n, 10));
      return Number.isFinite(b) && b > a ? { verse: a, endVerse: b } : { verse: a };
    })
    .filter(v => Number.isFinite(v.verse));
}

/**
 * Parse one line of TSK references, e.g. "79:13; 80:1; Isa 40:11; Jer 23:3,4".
 * Returns null if the line isn't a reference line (e.g. a keyword line).
 * `state.book`/`state.chapter` carry the book and chapter forward between tokens.
 */
export function parseTskRefLine(
  line: string,
  state: { book: string; chapter: number; currentBook: string; currentChapter: number }
): CrossRef[] | null {
  const tokens = line.split(';').map(t => t.trim()).filter(Boolean);
  if (tokens.length === 0) return null;
  const parsed = tokens.map(t => t.match(TOKEN));
  if (parsed.some(m => !m)) return null;
  const refs: CrossRef[] = [];
  for (const m of parsed as RegExpMatchArray[]) {
    const [, abbr, first, verseList] = m;
    if (abbr) {
      const book = TSK_BOOKS[abbr];
      if (!book) return null; // unknown abbreviation → probably not a ref line
      state.book = book;
    }
    if (verseList !== undefined) {
      // "ch:verses"
      state.chapter = parseInt(first, 10);
      for (const v of expandVerses(verseList)) {
        refs.push({ book: state.book, chapter: state.chapter, ...v, label: shortLabel(state.book, state.chapter, v.verse, v.endVerse) });
      }
    } else if (abbr) {
      // "Book ch" — whole chapter
      state.chapter = parseInt(first, 10);
      refs.push({ book: state.book, chapter: state.chapter, label: shortLabel(state.book, state.chapter) });
    } else {
      // Bare verse(s) in the current chapter, e.g. "10" or "5,6"
      for (const v of expandVerses(first)) {
        refs.push({ book: state.book, chapter: state.chapter, ...v, label: shortLabel(state.book, state.chapter, v.verse, v.endVerse) });
      }
    }
  }
  return refs;
}

/** Parse one verse's TSK entry into keyword groups. */
export function parseTskEntry(text: string, book: string, chapter: number): CrossRefGroup[] {
  const groups: CrossRefGroup[] = [];
  const state = { book, chapter, currentBook: book, currentChapter: chapter };
  let current: CrossRefGroup | null = null;

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    // A comma-separated bare verse list like "5,6" also parses as refs
    const refs = parseTskRefLine(line.replace(/,\s+/g, ','), state);
    if (refs) {
      if (!current) {
        current = { refs: [] };
        groups.push(current);
      }
      current.refs.push(...refs);
    } else {
      // Keyword (or chapter summary) line: start a new group; refs default to this book/chapter
      state.book = book;
      state.chapter = chapter;
      current = { keyword: line, refs: [] };
      groups.push(current);
    }
  }
  return groups.filter(g => g.refs.length > 0);
}

export async function fetchCrossRefs(book: string, chapter: number): Promise<VerseCrossRefs[]> {
  const data = await cachedJson<ApiChapter | null>(`${API}/c/tsk/${usfm(book)}/${chapter}.json`);
  if (!data) return [];
  return data.chapter.content
    .filter(item => item.type === 'verse' && typeof item.number === 'number')
    .map(item => ({ verse: item.number!, groups: parseTskEntry(textOf(item.content), book, chapter) }))
    .filter(v => v.groups.length > 0);
}

export function crossRefToReference(ref: CrossRef): BibleReference {
  return { book: ref.book, chapter: ref.chapter, verse: ref.verse, endVerse: ref.endVerse };
}

/** Exposed for tests */
export const __test = { toParagraphs };
