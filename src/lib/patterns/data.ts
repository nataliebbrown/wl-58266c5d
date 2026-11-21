// ============ Pattern Explorer: data loaders ============
//
// Static data in public/data/patterns, built by scripts/build-patterns.mjs:
//  - arcs.json          strongest cross-reference links between chapters (OpenBible.info, CC BY)
//  - connections/*.json strongest voted cross-references per verse
//  - quotes.json        New Testament verses quoting the Old (Free Use Bible API)
//  - people-web.json    people named in the same verses (Theographic, CC BY-SA)
//  - line.json          the promised line from Adam to Jesus (Theographic)

import type { BibleReference } from '@/lib/bibleApi';
import { bookFromStep, isOldTestament, parseStepRef, stepCode } from '@/lib/originalLanguage';

export const PATTERNS_ATTRIBUTION = {
  crossRefs: 'Cross-references: OpenBible.info (CC BY 4.0), ranked by reader votes',
  quotes: 'Old Testament quotations: Free Use Bible API (public domain data)',
  people: 'People data: Theographic Bible Metadata (CC BY-SA 4.0)',
};

export interface ArcData {
  /** STEPBible book codes, canonical order */
  books: string[];
  /** [bookIndex, chapter] for each chapter, canonical order */
  chapters: [number, number][];
  /** [chapterIndexA, chapterIndexB, weight] */
  links: [number, number, number][];
}

export interface Connection {
  fromVerse: number;
  ref: BibleReference;
  label: string;
  votes: number;
}

export interface QuoteEntry {
  nt: BibleReference;
  ntLabel: string;
  ot: { ref: BibleReference; label: string; book: string }[];
}

export interface LinePerson {
  id: string;
  name: string;
  note?: string;
}

const BASE = `${import.meta.env.BASE_URL}data/patterns`;
const cache = new Map<string, Promise<unknown>>();

function load<T>(rel: string): Promise<T | null> {
  let p = cache.get(rel) as Promise<T | null> | undefined;
  if (!p) {
    p = fetch(`${BASE}/${rel}`)
      .then(r => (r.ok ? (r.json() as Promise<T>) : null))
      .catch(() => {
        cache.delete(rel);
        return null;
      });
    cache.set(rel, p);
  }
  return p;
}

const short = (book: string) => (book === 'Psalms' ? 'Psalm' : book);

/** "Jhn.1.1-3" -> reference with endVerse, plus a readable label */
export function parseRangeRef(raw: string): { ref: BibleReference; label: string } | null {
  const [start, end] = raw.split('-');
  const ref = parseStepRef(start);
  if (!ref) return null;
  let label = `${short(ref.book)} ${ref.chapter}:${ref.verse}`;
  if (end) {
    const parts = end.split('.');
    if (parts.length === 1) {
      ref.endVerse = Number(parts[0]);
      label += `–${parts[0]}`;
    } else if (parts.length === 3 && parts[0] === start.split('.')[0] && Number(parts[1]) === ref.chapter) {
      ref.endVerse = Number(parts[2]);
      label += `–${parts[2]}`;
    } else if (parts.length === 3) {
      label += `–${parts[1]}:${parts[2]}`;
    }
  }
  return { ref, label };
}

export function refLabel(ref: BibleReference): string {
  return `${short(ref.book)} ${ref.chapter}${ref.verse ? `:${ref.verse}` : ''}${ref.endVerse ? `–${ref.endVerse}` : ''}`;
}

export function getArcs(): Promise<ArcData | null> {
  return load<ArcData>('arcs.json');
}

export async function getConnections(book: string, chapter: number): Promise<Connection[]> {
  const code = stepCode(book);
  if (!code) return [];
  const data = await load<Record<string, [number, string, number][]>>(`connections/${code}.json`);
  const rows = data?.[String(chapter)] ?? [];
  return rows.flatMap(([fromVerse, raw, votes]) => {
    const parsed = parseRangeRef(raw);
    return parsed ? [{ fromVerse, votes, ...parsed }] : [];
  });
}

export async function getQuotes(): Promise<QuoteEntry[]> {
  const data = await load<{ nt: string; ot: string[] }[]>('quotes.json');
  return (data ?? []).flatMap(q => {
    const nt = parseRangeRef(q.nt);
    if (!nt) return [];
    const ot = q.ot.flatMap(o => {
      const p = parseRangeRef(o);
      return p && isOldTestament(p.ref.book) ? [{ ...p, book: p.ref.book }] : [];
    });
    return ot.length ? [{ nt: nt.ref, ntLabel: nt.label, ot }] : [];
  });
}

export async function getPeopleWeb(): Promise<Record<string, [string, number][]>> {
  return (await load<Record<string, [string, number][]>>('people-web.json')) ?? {};
}

export async function getLine(): Promise<LinePerson[]> {
  return (await load<LinePerson[]>('line.json')) ?? [];
}

/** Book name for a STEPBible code, falling back to the code itself */
export function bookName(code: string): string {
  return bookFromStep(code) ?? code;
}
