// ============ Types ============

export interface BibleBook {
  name: string;
  abbreviation: string;
  chapters: number;
  testament: 'OT' | 'NT';
}

export interface BibleReference {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
}

export interface BiblePassage {
  reference: string;
  text: string;
  verses: BibleVerse[];
  copyright: string;
  blocks?: PassageBlock[];
  metadata?: PassageMetadata;
}

export interface BibleVerse {
  number: number;
  text: string;
}

export type PassageBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; verses: BibleVerse[]; startsChapter?: boolean };

export interface PassageMetadata {
  bookName: string;
  chapter: number;
  isChapterStart: boolean;
}

export interface BibleSearchResult {
  reference: string;
  text: string;
}

// ============ Book Data ============

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { name: 'Genesis', abbreviation: 'Gen', chapters: 50, testament: 'OT' },
  { name: 'Exodus', abbreviation: 'Exod', chapters: 40, testament: 'OT' },
  { name: 'Leviticus', abbreviation: 'Lev', chapters: 27, testament: 'OT' },
  { name: 'Numbers', abbreviation: 'Num', chapters: 36, testament: 'OT' },
  { name: 'Deuteronomy', abbreviation: 'Deut', chapters: 34, testament: 'OT' },
  { name: 'Joshua', abbreviation: 'Josh', chapters: 24, testament: 'OT' },
  { name: 'Judges', abbreviation: 'Judg', chapters: 21, testament: 'OT' },
  { name: 'Ruth', abbreviation: 'Ruth', chapters: 4, testament: 'OT' },
  { name: '1 Samuel', abbreviation: '1Sam', chapters: 31, testament: 'OT' },
  { name: '2 Samuel', abbreviation: '2Sam', chapters: 24, testament: 'OT' },
  { name: '1 Kings', abbreviation: '1Kgs', chapters: 22, testament: 'OT' },
  { name: '2 Kings', abbreviation: '2Kgs', chapters: 25, testament: 'OT' },
  { name: '1 Chronicles', abbreviation: '1Chr', chapters: 29, testament: 'OT' },
  { name: '2 Chronicles', abbreviation: '2Chr', chapters: 36, testament: 'OT' },
  { name: 'Ezra', abbreviation: 'Ezra', chapters: 10, testament: 'OT' },
  { name: 'Nehemiah', abbreviation: 'Neh', chapters: 13, testament: 'OT' },
  { name: 'Esther', abbreviation: 'Esth', chapters: 10, testament: 'OT' },
  { name: 'Job', abbreviation: 'Job', chapters: 42, testament: 'OT' },
  { name: 'Psalms', abbreviation: 'Ps', chapters: 150, testament: 'OT' },
  { name: 'Proverbs', abbreviation: 'Prov', chapters: 31, testament: 'OT' },
  { name: 'Ecclesiastes', abbreviation: 'Eccl', chapters: 12, testament: 'OT' },
  { name: 'Song of Solomon', abbreviation: 'Song', chapters: 8, testament: 'OT' },
  { name: 'Isaiah', abbreviation: 'Isa', chapters: 66, testament: 'OT' },
  { name: 'Jeremiah', abbreviation: 'Jer', chapters: 52, testament: 'OT' },
  { name: 'Lamentations', abbreviation: 'Lam', chapters: 5, testament: 'OT' },
  { name: 'Ezekiel', abbreviation: 'Ezek', chapters: 48, testament: 'OT' },
  { name: 'Daniel', abbreviation: 'Dan', chapters: 12, testament: 'OT' },
  { name: 'Hosea', abbreviation: 'Hos', chapters: 14, testament: 'OT' },
  { name: 'Joel', abbreviation: 'Joel', chapters: 3, testament: 'OT' },
  { name: 'Amos', abbreviation: 'Amos', chapters: 9, testament: 'OT' },
  { name: 'Obadiah', abbreviation: 'Obad', chapters: 1, testament: 'OT' },
  { name: 'Jonah', abbreviation: 'Jonah', chapters: 4, testament: 'OT' },
  { name: 'Micah', abbreviation: 'Mic', chapters: 7, testament: 'OT' },
  { name: 'Nahum', abbreviation: 'Nah', chapters: 3, testament: 'OT' },
  { name: 'Habakkuk', abbreviation: 'Hab', chapters: 3, testament: 'OT' },
  { name: 'Zephaniah', abbreviation: 'Zeph', chapters: 3, testament: 'OT' },
  { name: 'Haggai', abbreviation: 'Hag', chapters: 2, testament: 'OT' },
  { name: 'Zechariah', abbreviation: 'Zech', chapters: 14, testament: 'OT' },
  { name: 'Malachi', abbreviation: 'Mal', chapters: 4, testament: 'OT' },
  // New Testament
  { name: 'Matthew', abbreviation: 'Matt', chapters: 28, testament: 'NT' },
  { name: 'Mark', abbreviation: 'Mark', chapters: 16, testament: 'NT' },
  { name: 'Luke', abbreviation: 'Luke', chapters: 24, testament: 'NT' },
  { name: 'John', abbreviation: 'John', chapters: 21, testament: 'NT' },
  { name: 'Acts', abbreviation: 'Acts', chapters: 28, testament: 'NT' },
  { name: 'Romans', abbreviation: 'Rom', chapters: 16, testament: 'NT' },
  { name: '1 Corinthians', abbreviation: '1Cor', chapters: 16, testament: 'NT' },
  { name: '2 Corinthians', abbreviation: '2Cor', chapters: 13, testament: 'NT' },
  { name: 'Galatians', abbreviation: 'Gal', chapters: 6, testament: 'NT' },
  { name: 'Ephesians', abbreviation: 'Eph', chapters: 6, testament: 'NT' },
  { name: 'Philippians', abbreviation: 'Phil', chapters: 4, testament: 'NT' },
  { name: 'Colossians', abbreviation: 'Col', chapters: 4, testament: 'NT' },
  { name: '1 Thessalonians', abbreviation: '1Thess', chapters: 5, testament: 'NT' },
  { name: '2 Thessalonians', abbreviation: '2Thess', chapters: 3, testament: 'NT' },
  { name: '1 Timothy', abbreviation: '1Tim', chapters: 6, testament: 'NT' },
  { name: '2 Timothy', abbreviation: '2Tim', chapters: 4, testament: 'NT' },
  { name: 'Titus', abbreviation: 'Titus', chapters: 3, testament: 'NT' },
  { name: 'Philemon', abbreviation: 'Phlm', chapters: 1, testament: 'NT' },
  { name: 'Hebrews', abbreviation: 'Heb', chapters: 13, testament: 'NT' },
  { name: 'James', abbreviation: 'Jas', chapters: 5, testament: 'NT' },
  { name: '1 Peter', abbreviation: '1Pet', chapters: 5, testament: 'NT' },
  { name: '2 Peter', abbreviation: '2Pet', chapters: 3, testament: 'NT' },
  { name: '1 John', abbreviation: '1John', chapters: 5, testament: 'NT' },
  { name: '2 John', abbreviation: '2John', chapters: 1, testament: 'NT' },
  { name: '3 John', abbreviation: '3John', chapters: 1, testament: 'NT' },
  { name: 'Jude', abbreviation: 'Jude', chapters: 1, testament: 'NT' },
  { name: 'Revelation', abbreviation: 'Rev', chapters: 22, testament: 'NT' },
];

export const OT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'OT');
export const NT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'NT');

// ============ Reference Utilities ============

export function getBook(name: string): BibleBook | undefined {
  const lower = name.toLowerCase();
  return BIBLE_BOOKS.find(
    b => b.name.toLowerCase() === lower || b.abbreviation.toLowerCase() === lower
  );
}

export function formatReference(ref: BibleReference): string {
  if (ref.verse && ref.endVerse) {
    return `${ref.book} ${ref.chapter}:${ref.verse}-${ref.endVerse}`;
  }
  if (ref.verse) {
    return `${ref.book} ${ref.chapter}:${ref.verse}`;
  }
  return `${ref.book} ${ref.chapter}`;
}

export function parseReference(input: string): BibleReference | null {
  // Matches patterns like "John 3:16", "1 Corinthians 13", "Genesis 1:1-3"
  const match = input.match(
    /^(\d?\s?[A-Za-z]+(?:\s+of\s+[A-Za-z]+)?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/
  );
  if (!match) return null;

  const bookName = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const verse = match[3] ? parseInt(match[3], 10) : undefined;
  const endVerse = match[4] ? parseInt(match[4], 10) : undefined;

  const book = getBook(bookName);
  if (!book) return null;

  return { book: book.name, chapter, verse, endVerse };
}

// ============ API Config ============

const ESV_API_URL = 'https://api.esv.org/v3/passage/text/';
const ESV_API_KEY = import.meta.env.VITE_ESV_API_KEY as string | undefined;

const HELLOAO_API_URL = 'https://bible.helloao.org/api';
const HELLOAO_TRANSLATION = 'BSB'; // Berean Standard Bible

// Simple in-memory cache
const passageCache = new Map<string, { data: BiblePassage; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCacheKey(ref: BibleReference): string {
  return `${ref.book}:${ref.chapter}:${ref.verse ?? ''}:${ref.endVerse ?? ''}`;
}

// ============ Unified Fetch ============

export async function fetchPassage(ref: BibleReference): Promise<BiblePassage> {
  const cacheKey = getCacheKey(ref);
  const cached = passageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Use ESV when key is available, otherwise fall back to HelloAO (BSB)
  const passage = ESV_API_KEY
    ? await fetchFromEsv(ref)
    : await fetchFromHelloAO(ref);

  passageCache.set(cacheKey, { data: passage, timestamp: Date.now() });
  return passage;
}

// ============ ESV API (primary — requires VITE_ESV_API_KEY) ============

async function fetchFromEsv(ref: BibleReference): Promise<BiblePassage> {
  const query = formatReference(ref);

  const response = await fetch(
    `${ESV_API_URL}?q=${encodeURIComponent(query)}&include-passage-references=true&include-verse-numbers=true&include-footnotes=false&include-headings=true&include-short-copyright=true`,
    {
      headers: {
        Authorization: `Token ${ESV_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`ESV API error: ${response.status}`);
  }

  const data = await response.json();
  return parseEsvResponse(data, ref);
}

function parseEsvResponse(data: Record<string, unknown>, ref: BibleReference): BiblePassage {
  const passages = data.passages as string[] | undefined;
  const rawText = passages?.[0] ?? '';
  const reference = (data.canonical as string) ?? formatReference(ref);

  const verseRegex = /\[(\d+)\]\s*/g;
  const allVerses: BibleVerse[] = [];
  const blocks: PassageBlock[] = [];

  // Split by double newlines to separate headings and verse paragraphs
  const chunks = rawText.split(/\n\n/).map(c => c.trim()).filter(Boolean);

  for (const chunk of chunks) {
    const hasVerseMarkers = /\[\d+\]/.test(chunk);

    if (!hasVerseMarkers) {
      // Section heading (no verse markers)
      // Skip the passage reference line (e.g. "Genesis 1") that ESV prepends
      if (chunk === reference) continue;
      blocks.push({ type: 'heading', text: chunk });
    } else {
      // Paragraph of verses
      const paragraphVerses: BibleVerse[] = [];
      const parts = chunk.split(verseRegex);

      for (let i = 1; i < parts.length; i += 2) {
        const verseNum = parseInt(parts[i], 10);
        const verseText = (parts[i + 1] ?? '').replace(/\n/g, ' ').trim();
        if (verseText) {
          const verse: BibleVerse = { number: verseNum, text: verseText };
          paragraphVerses.push(verse);
          allVerses.push(verse);
        }
      }

      if (paragraphVerses.length > 0) {
        const isFirst = allVerses[0] === paragraphVerses[0];
        blocks.push({
          type: 'paragraph',
          verses: paragraphVerses,
          startsChapter: isFirst && paragraphVerses[0].number === 1,
        });
      }
    }
  }

  const metadata: PassageMetadata = {
    bookName: ref.book,
    chapter: ref.chapter,
    isChapterStart: !ref.verse,
  };

  return {
    reference,
    text: rawText.replace(verseRegex, '').trim(),
    verses: allVerses,
    copyright: '(ESV)',
    blocks,
    metadata,
  };
}

// ============ HelloAO / BSB API (fallback — no key required) ============

const BOOK_TO_USFM: Record<string, string> = {
  'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
  'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
  '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
  '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR', 'Nehemiah': 'NEH',
  'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Proverbs': 'PRO',
  'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Isaiah': 'ISA', 'Jeremiah': 'JER',
  'Lamentations': 'LAM', 'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS',
  'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON',
  'Micah': 'MIC', 'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP',
  'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL',
  'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
  'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
  'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
  '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
  'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
  '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
  '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV',
};

interface HelloAOVerse {
  type: string;
  number?: number;
  content?: (string | { noteId?: number; text?: string; poem?: number; lineBreak?: boolean })[];
}

async function fetchFromHelloAO(ref: BibleReference): Promise<BiblePassage> {
  const usfm = BOOK_TO_USFM[ref.book];
  if (!usfm) {
    throw new Error(`Unknown book: ${ref.book}`);
  }

  const url = `${HELLOAO_API_URL}/${HELLOAO_TRANSLATION}/${usfm}/${ref.chapter}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Bible API error: ${response.status}`);
  }

  const data = await response.json();
  return parseHelloAOResponse(data, ref);
}

function parseHelloAOResponse(data: { chapter?: { content?: HelloAOVerse[] } }, ref: BibleReference): BiblePassage {
  const content = data.chapter?.content ?? [];
  const allVerses: BibleVerse[] = [];
  const blocks: PassageBlock[] = [];
  let currentParagraphVerses: BibleVerse[] = [];

  const flushParagraph = () => {
    if (currentParagraphVerses.length > 0) {
      const isFirst = allVerses.length === currentParagraphVerses.length
        && currentParagraphVerses[0]?.number === 1;
      blocks.push({
        type: 'paragraph',
        verses: [...currentParagraphVerses],
        startsChapter: isFirst,
      });
      currentParagraphVerses = [];
    }
  };

  for (const item of content) {
    if (item.type === 'heading' && item.content) {
      flushParagraph();
      const headingText = item.content
        .map(part => typeof part === 'string' ? part : (part as { text?: string }).text ?? '')
        .join('')
        .trim();
      if (headingText) {
        blocks.push({ type: 'heading', text: headingText });
      }
    } else if (item.type === 'verse' && item.number && item.content) {
      const text = item.content
        .map((part) => {
          if (typeof part === 'string') return part;
          if (typeof part === 'object' && part.text) return part.text;
          return '';
        })
        .join('')
        .trim();

      if (text) {
        const verse: BibleVerse = { number: item.number, text };
        allVerses.push(verse);
        currentParagraphVerses.push(verse);
      }

      // Check for lineBreak on the last content item → paragraph break
      const lastContent = item.content[item.content.length - 1];
      if (typeof lastContent === 'object' && lastContent && 'lineBreak' in lastContent && lastContent.lineBreak) {
        flushParagraph();
      }
    }
  }

  flushParagraph();

  const fullText = allVerses.map((v) => v.text).join(' ');
  const metadata: PassageMetadata = {
    bookName: ref.book,
    chapter: ref.chapter,
    isChapterStart: !ref.verse,
  };

  return {
    reference: formatReference(ref),
    text: fullText,
    verses: allVerses,
    copyright: '(BSB)',
    blocks,
    metadata,
  };
}

// ============ Search (ESV only — HelloAO has no search endpoint) ============

const ESV_SEARCH_URL = 'https://api.esv.org/v3/passage/search/';

export async function searchBible(query: string): Promise<BibleSearchResult[]> {
  if (!ESV_API_KEY) {
    return [];
  }

  const response = await fetch(
    `${ESV_SEARCH_URL}?q=${encodeURIComponent(query)}&page-size=10`,
    {
      headers: {
        Authorization: `Token ${ESV_API_KEY}`,
      },
    }
  );

  if (!response.ok) return [];

  const data = await response.json();
  const results = data.results as Array<{ reference: string; content: string }> | undefined;

  return (results ?? []).map(r => ({
    reference: r.reference,
    text: r.content,
  }));
}

// ============ Reading History ============

const HISTORY_KEY = 'wl-bible-history';
const MAX_HISTORY = 20;

export interface ReadingHistoryEntry {
  book: string;
  chapter: number;
  timestamp: string;
}

export function getReadingHistory(): ReadingHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToReadingHistory(book: string, chapter: number): void {
  const history = getReadingHistory();

  // Remove duplicate if exists
  const filtered = history.filter(e => !(e.book === book && e.chapter === chapter));

  // Add to front
  filtered.unshift({ book, chapter, timestamp: new Date().toISOString() });

  // Trim to max
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_HISTORY)));
}

export function getRecentBooks(): string[] {
  const history = getReadingHistory();
  const seen = new Set<string>();
  const recent: string[] = [];
  for (const entry of history) {
    if (!seen.has(entry.book)) {
      seen.add(entry.book);
      recent.push(entry.book);
      if (recent.length >= 5) break;
    }
  }
  return recent;
}
