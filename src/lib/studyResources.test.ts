import { describe, it, expect } from 'vitest';
import { parseTskEntry } from './studyResources';

describe('parseTskEntry', () => {
  it('parses Psalm 23:1 into keyword groups with resolved books', () => {
    const text =
      "1 David's confidence in God's grace.\nmy.\n79:13; 80:1; Isa 40:11; Jer 23:3,4; Eze 34:11,12,23,24; Mic 5:2,4\nJoh 10:11,14,27-30; Heb 13:20; 1Pe 2:25; 5:4; Re 7:17\nI shall.\n34:9,10; 84:11; Mt 6:33";
    const groups = parseTskEntry(text, 'Psalms', 23);
    expect(groups.map(g => g.keyword)).toEqual(['my.', 'I shall.']);

    const my = groups[0].refs;
    // Bare "79:13" is the current book
    expect(my[0]).toMatchObject({ book: 'Psalms', chapter: 79, verse: 13 });
    expect(my.find(r => r.book === 'Isaiah')).toMatchObject({ chapter: 40, verse: 11 });
    // "Jer 23:3,4" expands to two refs
    expect(my.filter(r => r.book === 'Jeremiah').map(r => r.verse)).toEqual([3, 4]);
    // Ranges
    expect(my.find(r => r.book === 'John' && r.verse === 27)).toMatchObject({ endVerse: 30, label: 'John 10:27–30' });
    // "1Pe 2:25; 5:4" — 5:4 inherits 1 Peter
    expect(my.find(r => r.book === '1 Peter' && r.chapter === 5)).toMatchObject({ verse: 4 });
    // New keyword resets to the current book
    expect(groups[1].refs[0]).toMatchObject({ book: 'Psalms', chapter: 34, verse: 9 });
  });

  it('treats bare verse numbers as the current chapter', () => {
    const groups = parseTskEntry('Except.\n5,6; 1:13; Ga 6:15', 'John', 3);
    expect(groups[0].refs.slice(0, 2)).toMatchObject([
      { book: 'John', chapter: 3, verse: 5 },
      { book: 'John', chapter: 3, verse: 6 },
    ]);
    expect(groups[0].refs[2]).toMatchObject({ book: 'John', chapter: 1, verse: 13 });
    expect(groups[0].refs[3]).toMatchObject({ book: 'Galatians', chapter: 6, verse: 15 });
  });

  it('distinguishes Judges (Jud) from Jude', () => {
    const groups = parseTskEntry('came.\nJud 6:27; Jude 1:3', 'John', 3);
    expect(groups[0].refs.map(r => r.book)).toEqual(['Judges', 'Jude']);
  });
});

describe('Tyndale note paragraphs', () => {
  it('splits sub-notes that start with their own reference', async () => {
    const { __test } = await import('./studyResources');
    const paras = __test.toParagraphs(
      "3:16 Because there are no quotation marks, translators debate where it ends; 3:16-21 might be John's commentary. 3:16 The truth that God loved the world is basic. • The Son came to save.",
      3
    );
    expect(paras[0].startsWith('Because')).toBe(true);
    expect(paras.some(p => p.startsWith('3:16 The truth'))).toBe(true);
    expect(paras[paras.length - 1]).toBe('The Son came to save.');
  });
});
