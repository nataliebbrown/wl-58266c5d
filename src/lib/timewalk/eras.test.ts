import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS } from '../bibleApi';
import { CAVEATS, ERAS, EVENT_SCHOLARLY_DATES, eraForChapter, formatYear } from './eras';

const events: { t: string }[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../public/data/timewalk/events.json'), 'utf8')
);

describe('TimeWalk eras', () => {
  it('puts every chapter of the Bible in exactly one era', () => {
    for (const b of BIBLE_BOOKS) {
      for (let c = 1; c <= b.chapters; c++) {
        const matches = ERAS.filter(e => e.books.some(x => x.book === b.name && (x.from === undefined || (c >= x.from && c <= (x.to ?? Infinity)))));
        expect(matches.length, `${b.name} ${c}`).toBe(1);
      }
    }
    expect(eraForChapter('Genesis', 11)?.id).toBe('beginning');
    expect(eraForChapter('Genesis', 12)?.id).toBe('patriarchs');
    expect(eraForChapter('1 Kings', 12)?.id).toBe('divided');
  });

  it('only references caveats that exist', () => {
    for (const e of ERAS) for (const c of e.caveats) expect(CAVEATS[c], `${e.id}: ${c}`).toBeTruthy();
    for (const [title, d] of Object.entries(EVENT_SCHOLARLY_DATES)) if (d.caveat) expect(CAVEATS[d.caveat], title).toBeTruthy();
  });

  it('dates key events that exist in the event data', () => {
    const titles = new Set(events.map(e => e.t));
    for (const title of Object.keys(EVENT_SCHOLARLY_DATES)) expect(titles.has(title), title).toBe(true);
  });

  it('formats astronomical years as BC/AD', () => {
    expect(formatYear(-1014)).toBe('1015 BC');
    expect(formatYear(-3)).toBe('4 BC');
    expect(formatYear(0)).toBe('1 BC');
    expect(formatYear(30)).toBe('AD 30');
  });
});
