import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { KEY_WORDS, wordOfTheDay } from './keyWords';
import { stepCode, baseStrong } from '../originalLanguage';

const DATA = path.resolve(__dirname, '../../../public/data/original');

describe('key words', () => {
  it('has unique ids', () => {
    expect(new Set(KEY_WORDS.map(k => k.id)).size).toBe(KEY_WORDS.length);
  });

  it.each(KEY_WORDS.map(k => [k.id, k] as const))('%s: every cited verse contains the word in the original text', (_id, k) => {
    const base = baseStrong(k.occurrenceStrong ?? k.strong);
    for (const v of k.verses) {
      const file = path.join(DATA, 'text', stepCode(v.ref.book)!, `${v.ref.chapter}.json`);
      const verses = JSON.parse(fs.readFileSync(file, 'utf8'));
      const words: string[][] = verses[String(v.ref.verse)] ?? [];
      const found = words.some(w => baseStrong(w[3]) === base);
      expect(found, `${k.translit} not found in ${v.label}`).toBe(true);
    }
  });

  it('rotates the word of the day', () => {
    const a = wordOfTheDay(new Date('2026-11-21T10:00:00'));
    const b = wordOfTheDay(new Date('2026-11-22T10:00:00'));
    expect(a.id).not.toBe(b.id);
  });
});
