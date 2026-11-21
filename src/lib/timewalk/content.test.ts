import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS } from '../bibleApi';
import { FINDS, findsForChapter } from './archaeology';
import { LIFE_TOPICS, topicsForChapter } from './dailyLife';
import { ERAS } from './eras';

const DATA = path.resolve(__dirname, '../../../public/data/timewalk');
const bookNames = new Set(BIBLE_BOOKS.map(b => b.name));
const chaptersOf = (book: string) => BIBLE_BOOKS.find(b => b.name === book)!.chapters;

describe('TimeWalk content', () => {
  it('finds reference real eras, books, and chapters', () => {
    const eraIds = new Set(ERAS.map(e => e.id));
    for (const f of FINDS) {
      expect(eraIds.has(f.eraId), f.id).toBe(true);
      for (const r of f.refs) {
        expect(bookNames.has(r.ref.book), `${f.id}: ${r.label}`).toBe(true);
        expect(r.ref.chapter).toBeLessThanOrEqual(chaptersOf(r.ref.book));
      }
      for (const c of f.chapters) expect(c.to, `${f.id}: ${c.book}`).toBeLessThanOrEqual(chaptersOf(c.book));
    }
  });

  it('life topics reference real eras and books', () => {
    const eraIds = new Set(ERAS.map(e => e.id));
    for (const t of LIFE_TOPICS) {
      for (const e of t.eras) expect(eraIds.has(e), `${t.id}: ${e}`).toBe(true);
      for (const b of t.books) expect(bookNames.has(b), `${t.id}: ${b}`).toBe(true);
      for (const r of t.refs) expect(r.ref.chapter, `${t.id}: ${r.label}`).toBeLessThanOrEqual(chaptersOf(r.ref.book));
    }
  });

  it('keeps drafts hidden unless preview is on', () => {
    expect(findsForChapter('2 Kings', 18).every(f => f.reviewed)).toBe(true);
    expect(findsForChapter('2 Kings', 18, true).length).toBeGreaterThan(0);
    expect(topicsForChapter('Ruth', 'conquest', true).length).toBeGreaterThan(0);
  });

  it('only uses openly licensed photos, each with attribution', () => {
    const finds = JSON.parse(fs.readFileSync(path.join(DATA, 'find-images.json'), 'utf8'));
    const places = JSON.parse(fs.readFileSync(path.join(DATA, 'place-photos.json'), 'utf8'));
    const ok = /^(public domain|cc0|cc by(-sa)? \d|cc by(-sa)?-\d|attribution|free art license)/i;
    for (const p of [...Object.values(finds), ...Object.values(places)] as { license: string; author: string; source: string; thumb: string }[]) {
      expect(ok.test(p.license), p.license).toBe(true);
      expect(p.author.length).toBeGreaterThan(0);
      expect(p.source).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
      // Wikimedia only serves standard thumbnail widths
      const m = p.thumb.match(/\/(\d+)px-/);
      if (m) expect([250, 330, 500, 960, 1280, 1920]).toContain(Number(m[1]));
    }
  });
});
