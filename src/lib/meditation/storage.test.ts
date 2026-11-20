import { describe, it, expect } from 'vitest';
import { splitVerse, suggestBreak, toWords } from './storage';
import { MEDITATION_CATALOG } from './catalog';

describe('splitVerse', () => {
  it('breaks at the punctuation nearest the middle', () => {
    expect(splitVerse('Cast all your anxiety on Him, because He cares for you.')).toEqual({
      inhale: 'Cast all your anxiety on Him,',
      exhale: 'because He cares for you.',
    });
  });

  it('prefers a strong pause (;) over a comma', () => {
    const { inhale } = splitVerse('The LORD is near to the brokenhearted; He saves the contrite in spirit.');
    expect(inhale).toBe('The LORD is near to the brokenhearted;');
  });

  it('breaks before a conjunction when there is no punctuation mid-verse', () => {
    const { inhale, exhale } = splitVerse(
      'Now to him who is able to keep you from stumbling and to present you blameless before the presence of his glory with great joy,'
    );
    expect(inhale).toBe('Now to him who is able to keep you from stumbling');
    expect(exhale.startsWith('and to present')).toBe(true);
  });

  it('strips quotation marks', () => {
    expect(toWords('“Be still and know”')).toEqual(['Be', 'still', 'and', 'know']);
  });

  it('never produces an empty half for multi-word verses', () => {
    for (const text of ['Jesus wept.', 'Rejoice always.', 'Pray without ceasing.']) {
      const words = toWords(text);
      const i = suggestBreak(words);
      expect(i).toBeGreaterThan(0);
      expect(i).toBeLessThan(words.length);
    }
  });
});

describe('MEDITATION_CATALOG', () => {
  it('has unique verse ids and non-empty halves', () => {
    const ids = new Set<string>();
    for (const c of MEDITATION_CATALOG) {
      expect(c.truth.length).toBeGreaterThan(0);
      for (const v of c.verses) {
        expect(v.inhale.trim()).not.toBe('');
        expect(v.exhale.trim()).not.toBe('');
        expect(ids.has(v.id)).toBe(false);
        ids.add(v.id);
      }
    }
  });
});
