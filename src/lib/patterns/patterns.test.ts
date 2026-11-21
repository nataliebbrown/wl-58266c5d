import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS, type BibleReference } from '../bibleApi';
import { baseStrong, stepCode } from '../originalLanguage';
import { THEMES } from './themes';
import { PROMISES } from './promises';
import { COVENANTS, LINE_MARKERS, NAMES_OF_GOD, REPEATED_PATTERNS, STORY_PLACES } from './stories';
import { parseRangeRef } from './data';

const ROOT = path.resolve(__dirname, '../../../public/data');
const readJson = (rel: string) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

const verseCount = (ref: BibleReference): number => {
  const file = path.join(ROOT, 'original/text', stepCode(ref.book)!, `${ref.chapter}.json`);
  if (!fs.existsSync(file)) return 0;
  return Math.max(...Object.keys(JSON.parse(fs.readFileSync(file, 'utf8'))).map(Number));
};

function expectValid(ref: BibleReference, label: string) {
  const book = BIBLE_BOOKS.find(b => b.name === ref.book);
  expect(book, `unknown book in ${label}`).toBeTruthy();
  expect(ref.chapter, `chapter out of range in ${label}`).toBeLessThanOrEqual(book!.chapters);
  if (ref.verse) expect(ref.verse, `verse out of range in ${label}`).toBeLessThanOrEqual(verseCount(ref));
}

const allRefs: [string, BibleReference][] = [
  ...THEMES.flatMap(t => t.points.map(p => [`${t.id}: ${p.label}`, p.ref] as [string, BibleReference])),
  ...PROMISES.flatMap(p => [p.ot, ...p.nt].map(x => [`${p.id}: ${x.label}`, x.ref] as [string, BibleReference])),
  ...REPEATED_PATTERNS.flatMap(p => p.instances.map(x => [`${p.id}: ${x.label}`, x.ref] as [string, BibleReference])),
  ...COVENANTS.flatMap(c => [c.ref, ...c.fulfillmentRefs].map(x => [`${c.id}: ${x.label}`, x.ref] as [string, BibleReference])),
  ...NAMES_OF_GOD.map(n => [`${n.id}: ${n.firstRef.label}`, n.firstRef.ref] as [string, BibleReference]),
  ...STORY_PLACES.flatMap(p => p.moments.map(m => [`${p.id}: ${m.label}`, m.ref] as [string, BibleReference])),
  ...LINE_MARKERS.map(m => [`line ${m.name}: ${m.ref.label}`, m.ref.ref] as [string, BibleReference]),
];

describe('pattern content', () => {
  it('every curated reference points to a real verse', () => {
    for (const [label, ref] of allRefs) expectValid(ref, label);
  });

  it('labels match their references (book and chapter:verse)', () => {
    for (const [label, ref] of allRefs) {
      const text = label.split(': ').slice(1).join(': ');
      const bookLabel = ref.book === 'Psalms' ? 'Psalm' : ref.book;
      expect(text.startsWith(`${bookLabel} ${ref.chapter}:${ref.verse}`), `${label} vs ${ref.book} ${ref.chapter}:${ref.verse}`).toBe(true);
    }
  });

  it('has unique ids in each collection', () => {
    for (const list of [THEMES, PROMISES, REPEATED_PATTERNS, COVENANTS, NAMES_OF_GOD, STORY_PLACES] as { id: string }[][]) {
      expect(new Set(list.map(x => x.id)).size).toBe(list.length);
    }
  });

  it('keeps drafts hidden until reviewed (all start unreviewed)', () => {
    const all = [...THEMES, ...PROMISES, ...REPEATED_PATTERNS, ...COVENANTS, ...NAMES_OF_GOD, ...STORY_PLACES, ...LINE_MARKERS];
    expect(all.every(x => typeof x.reviewed === 'boolean')).toBe(true);
  });

  it.each(NAMES_OF_GOD.map(n => [n.id, n] as const))('%s: the Strong’s number appears in the cited verse', (_id, n) => {
    const file = path.join(ROOT, 'original/text', stepCode(n.firstRef.ref.book)!, `${n.firstRef.ref.chapter}.json`);
    const words: string[][] = JSON.parse(fs.readFileSync(file, 'utf8'))[String(n.firstRef.ref.verse)] ?? [];
    expect(words.some(w => baseStrong(w[3]) === baseStrong(n.strong)), `${n.strong} not in ${n.firstRef.label}`).toBe(true);
  });

  it('story places use known place ids', () => {
    const index = readJson('timewalk/place-photos.json');
    const known = STORY_PLACES.filter(p => index[p.placeId]).length;
    expect(known).toBeGreaterThanOrEqual(STORY_PLACES.length - 1);
  });
});

describe('pattern data', () => {
  it('the promised line runs from Adam to Jesus in 60 generations', () => {
    const line = readJson('patterns/line.json');
    expect(line).toHaveLength(60);
    expect(line[0].name).toBe('Adam');
    expect(line[line.length - 1].name).toBe('Jesus');
    for (const m of LINE_MARKERS) expect(line.some((p: { name: string }) => p.name === m.name), m.name).toBe(true);
  });

  it('arc links point at real chapters', () => {
    const arcs = readJson('patterns/arcs.json');
    expect(arcs.books).toHaveLength(66);
    expect(arcs.chapters).toHaveLength(1189);
    for (const [a, b] of arcs.links) {
      expect(arcs.chapters[a]).toBeTruthy();
      expect(arcs.chapters[b]).toBeTruthy();
    }
  });

  it('parses ranged references', () => {
    expect(parseRangeRef('Jhn.1.1-3')).toEqual({ ref: { book: 'John', chapter: 1, verse: 1, endVerse: 3 }, label: 'John 1:1–3' });
    expect(parseRangeRef('Psa.23.1')?.label).toBe('Psalm 23:1');
    expect(parseRangeRef('Gen.1.31-Gen.2.3')?.label).toBe('Genesis 1:31–2:3');
  });

  it('every quotation is a New Testament verse quoting Old Testament text', () => {
    const quotes = readJson('patterns/quotes.json') as { nt: string; ot: string[] }[];
    expect(quotes.length).toBeGreaterThan(400);
    const nt = new Set(['Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Php', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev']);
    for (const q of quotes) expect(nt.has(q.nt.split('.')[0])).toBe(true);
  });
});
