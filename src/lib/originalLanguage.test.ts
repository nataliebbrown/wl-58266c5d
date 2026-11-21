import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS } from './bibleApi';
import { stepCode, parseStepRef, baseStrong, displayStrong, matchWordsByGloss, type OriginalWord } from './originalLanguage';

const DATA = path.resolve(__dirname, '../../public/data/original');

describe('original language data', () => {
  it('has a text file for every chapter of every book', () => {
    for (const b of BIBLE_BOOKS) {
      const code = stepCode(b.name)!;
      expect(code, b.name).toBeTruthy();
      for (let c = 1; c <= b.chapters; c++) {
        expect(fs.existsSync(path.join(DATA, 'text', code, `${c}.json`)), `${b.name} ${c}`).toBe(true);
      }
    }
  });

  it('tags John 3:16 with agapaō (G25) for "loved"', () => {
    const verses = JSON.parse(fs.readFileSync(path.join(DATA, 'text/Jhn/3.json'), 'utf8'));
    const loved = verses['16'].find((w: string[]) => w[2] === 'loved');
    expect(loved[3]).toBe('G0025');
    expect(loved[4]).toBe('V-AAI-3S');
  });

  it('counts hesed (H2617A) as one word across its uses', () => {
    const occ = JSON.parse(fs.readFileSync(path.join(DATA, 'occurrences/H13.json'), 'utf8'));
    expect(occ.H2617A.n).toBeGreaterThan(200);
    expect(Object.keys(occ).some(k => /H9\d{3}/.test(k) && k.startsWith('H2617'))).toBe(false);
  });

  it('converts references and numbers', () => {
    expect(parseStepRef('Jhn.3.16')).toEqual({ book: 'John', chapter: 3, verse: 16 });
    expect(parseStepRef('Psa.23.1')).toEqual({ book: 'Psalms', chapter: 23, verse: 1 });
    expect(baseStrong('H2617A')).toBe('H2617');
    expect(baseStrong('G26')).toBe('G0026');
    expect(displayStrong('G0026')).toBe('G26');
  });

  it('matches an English word to the original word by gloss', () => {
    const words: OriginalWord[] = [
      { original: 'οὕτως', translit: 'houtōs', gloss: 'Thus', strong: 'G3779', morph: 'ADV' },
      { original: 'ἠγάπησεν', translit: 'ēgapēsen', gloss: 'loved', strong: 'G0025', morph: 'V-AAI-3S' },
    ];
    expect(matchWordsByGloss(words, 'loved')[0].strong).toBe('G0025');
    expect(matchWordsByGloss(words, 'love')[0].strong).toBe('G0025');
  });
});
