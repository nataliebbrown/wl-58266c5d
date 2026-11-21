// ============ Translations: compare and across cultures ============

import { BOOK_TO_USFM, fetchPassage } from './bibleApi';

export type TranslationApproach = 'word-for-word' | 'essentially literal' | 'balanced' | 'simplified' | 'meaning-based';

export interface EnglishTranslation {
  id: string;
  abbr: string;
  name: string;
  approach: TranslationApproach;
  note: string;
  /** Where the text comes from */
  source: 'helloao' | 'esv';
}

/** Ordered from most literal to most meaning-based. */
export const ENGLISH_TRANSLATIONS: EnglishTranslation[] = [
  { id: 'eng_ylt', abbr: 'YLT', name: 'Young’s Literal Translation (1862)', approach: 'word-for-word', note: 'Follows the Hebrew and Greek word order and tenses as closely as English allows — sometimes awkward, always revealing.', source: 'helloao' },
  { id: 'eng_kjv', abbr: 'KJV', name: 'King James Version (1611/1769)', approach: 'word-for-word', note: 'Formal, majestic English that has shaped the language for four centuries.', source: 'helloao' },
  { id: 'ESV', abbr: 'ESV', name: 'English Standard Version', approach: 'essentially literal', note: 'Word-for-word where possible, readable modern English.', source: 'esv' },
  { id: 'BSB', abbr: 'BSB', name: 'Berean Standard Bible', approach: 'essentially literal', note: 'A modern, accurate translation released into the public domain.', source: 'helloao' },
  { id: 'eng_net', abbr: 'NET', name: 'New English Translation', approach: 'balanced', note: 'Balances accuracy and readability; known for its extensive translators’ notes.', source: 'helloao' },
  { id: 'eng_bbe', abbr: 'BBE', name: 'Bible in Basic English (1965)', approach: 'simplified', note: 'Uses a vocabulary of about 1,000 everyday English words.', source: 'helloao' },
  { id: 'eng_t4t', abbr: 'T4T', name: 'Translation for Translators', approach: 'meaning-based', note: 'Written to help translators in other cultures: spells out implied meaning and explains figures of speech.', source: 'helloao' },
];

export const APPROACH_LABELS: Record<TranslationApproach, string> = {
  'word-for-word': 'Word for word',
  'essentially literal': 'Essentially literal',
  balanced: 'Balanced',
  simplified: 'Simplified',
  'meaning-based': 'Thought for thought',
};

/**
 * Popular copyrighted translations that need publisher permission before they can be shown.
 * Not displayed yet — kept here (and in docs/licensed-translations.md) to come back to.
 */
export const LICENSED_TRANSLATIONS = [
  { abbr: 'NKJV', name: 'New King James Version', publisher: 'Thomas Nelson (HarperCollins Christian Publishing)', route: 'API.Bible (American Bible Society) — publisher approval required' },
  { abbr: 'NIV', name: 'New International Version', publisher: 'Biblica / Zondervan', route: 'Biblica licensing or API.Bible — publisher approval required' },
  { abbr: 'CSB', name: 'Christian Standard Bible', publisher: 'Holman Bible Publishers (Lifeway)', route: 'API.Bible or direct permission from Holman' },
  { abbr: 'NLT', name: 'New Living Translation', publisher: 'Tyndale House Publishers', route: 'Tyndale’s NLT API (developer key + terms) or API.Bible' },
  { abbr: 'MSG', name: 'The Message', publisher: 'NavPress (Tyndale)', route: 'Direct permission from NavPress/Tyndale' },
] as const;

export interface WorldTranslation {
  id: string;
  language: string;
  name: string;
  rtl?: boolean;
}

/** Shown by default in "Across cultures" */
export const FEATURED_LANGUAGES: WorldTranslation[] = [
  { id: 'spa_r09', language: 'Spanish', name: 'Reina-Valera 1909' },
  { id: 'fra_lsg', language: 'French', name: 'Louis Segond 1910' },
  { id: 'por_blj', language: 'Portuguese', name: 'Bíblia Livre' },
  { id: 'swh_bib', language: 'Swahili', name: 'Kiswahili Contemporary Version' },
  { id: 'arb_vdv', language: 'Arabic', name: 'Van Dyck', rtl: true },
  { id: 'HINIRV', language: 'Hindi', name: 'Indian Revised Version' },
  { id: 'cmn_cu1', language: 'Chinese', name: 'Chinese Union Version (Simplified)' },
  { id: 'kor_old', language: 'Korean', name: 'Korean Bible 1910' },
];

export const MORE_LANGUAGES: WorldTranslation[] = [
  { id: 'deu_l12', language: 'German', name: 'Luther 1912' },
  { id: 'rus_syn', language: 'Russian', name: 'Synodal' },
  { id: 'ind_ayt', language: 'Indonesian', name: 'AYT' },
  { id: 'tgl_bib', language: 'Tagalog', name: 'Open Tagalog Contemporary Bible' },
  { id: 'vie_vcb', language: 'Vietnamese', name: 'Vietnamese Contemporary Bible' },
  { id: 'jpn_kou', language: 'Japanese', name: 'Kougo-yaku (1955)' },
  { id: 'amh_amh', language: 'Amharic', name: 'Amharic Bible (1962)' },
  { id: 'yor_bib', language: 'Yoruba', name: 'Yoruba Bible' },
];

// ---- Fetching a verse ----

interface HelloAOChapter {
  chapter: { content: { type: string; number?: number; content?: unknown[] }[] };
}

const chapterCache = new Map<string, Promise<HelloAOChapter | null>>();

function loadChapter(translationId: string, book: string, chapter: number): Promise<HelloAOChapter | null> {
  const usfm = BOOK_TO_USFM[book];
  if (!usfm) return Promise.resolve(null);
  const key = `${translationId}/${usfm}/${chapter}`;
  let p = chapterCache.get(key);
  if (!p) {
    p = fetch(`https://bible.helloao.org/api/${key}.json`).then(r => (r.ok ? (r.json() as Promise<HelloAOChapter>) : null));
    p.catch(() => chapterCache.delete(key));
    chapterCache.set(key, p);
  }
  return p;
}

function verseText(content: unknown[] | undefined): string {
  return (content ?? [])
    .map(c => {
      if (typeof c === 'string') return c;
      if (c && typeof c === 'object' && 'text' in c) return String((c as { text: unknown }).text);
      return ''; // footnote markers, line breaks
    })
    .join(' ')
    .replace(/¶/g, '') // paragraph marks (KJV)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?’”])/g, '$1')
    .trim();
}

/** One verse in a translation (null if that translation doesn't have it). */
export async function fetchVerse(translationId: string, book: string, chapter: number, verse: number): Promise<string | null> {
  if (translationId === 'ESV') {
    const passage = await fetchPassage({ book, chapter });
    return passage.verses.find(v => v.number === verse)?.text ?? null;
  }
  const data = await loadChapter(translationId, book, chapter);
  const item = data?.chapter.content.find(c => c.type === 'verse' && c.number === verse);
  return item ? verseText(item.content) || null : null;
}
