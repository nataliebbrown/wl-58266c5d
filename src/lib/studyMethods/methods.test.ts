import { describe, it, expect } from 'vitest';
import { STUDY_METHODS, fillTemplate } from './methods';
import { BIBLE_CHARACTERS } from './characters';
import { BIBLE_BOOKS } from '../bibleApi';
import { createSession, formatSessionForJournal } from './sessions';

describe('study methods', () => {
  it('every method includes a "reveals God" step (WL’s God-centered lens)', () => {
    for (const m of STUDY_METHODS) {
      expect(m.steps.some(s => s.kind === 'reveals-god'), m.name).toBe(true);
    }
  });

  it('has unique step ids within each method', () => {
    for (const m of STUDY_METHODS) {
      expect(new Set(m.steps.map(s => s.id)).size, m.name).toBe(m.steps.length);
    }
  });

  it('fills template placeholders', () => {
    expect(fillTemplate('What does {person} do in {passage}?', { person: 'Ruth', passage: 'Ruth 1' })).toBe('What does Ruth do in Ruth 1?');
    expect(fillTemplate('“{word}”', {})).toBe('“this word”');
  });

  it('character passages point at real chapters', () => {
    for (const c of BIBLE_CHARACTERS) {
      for (const p of c.passages) {
        const book = BIBLE_BOOKS.find(b => b.name === p.book);
        expect(book, `${c.name}: ${p.book}`).toBeTruthy();
        expect(p.chapter).toBeLessThanOrEqual(book!.chapters);
      }
    }
  });

  it('formats a finished study for the journal', () => {
    const s = createSession('soap', { book: 'Psalms', chapter: 23 });
    s.verse = { number: 1, text: 'The LORD is my shepherd; I shall not want.' };
    s.answers = { observation: 'David speaks personally.', god: 'God cares for His own.' };
    const { title, text } = formatSessionForJournal(s);
    expect(title).toBe('SOAP · Psalm 23');
    expect(text).toContain('Verse: Psalm 23:1');
    expect(text).toContain('God cares for His own.');
    expect(text).not.toContain('Prayer'); // unanswered steps are left out
  });
});
