import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BIBLE_BOOKS } from './bibleApi';
import {
  getPlanSequence,
  getPlanDays,
  formatDay,
  choosePlan,
  setDayComplete,
  getCurrentDay,
  getActivePlan,
  type ReadingPlanId,
} from './readingPlan';

const TOTAL = BIBLE_BOOKS.reduce((n, b) => n + b.chapters, 0);

describe('reading plans', () => {
  // Node 25 ships a partial global localStorage that shadows jsdom's; use an in-memory one
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
    });
  });

  it.each(['canonical', 'chronological'] as ReadingPlanId[])('%s covers all chapters exactly once', planId => {
    const seq = getPlanSequence(planId);
    expect(TOTAL).toBe(1189);
    expect(seq).toHaveLength(TOTAL);
    expect(new Set(seq.map(c => `${c.book} ${c.chapter}`)).size).toBe(TOTAL);
  });

  it('starts at Genesis 1 and labels days compactly', () => {
    const days = getPlanDays('canonical');
    expect(formatDay(days[0])).toBe('Genesis 1–3');
    // Genesis has 50 chapters: day 17 = Genesis 49–50 + Exodus 1
    expect(formatDay(days[16])).toBe('Genesis 49–50 · Exodus 1');
  });

  it('chronological reads Job after Genesis 11', () => {
    const seq = getPlanSequence('chronological');
    const i = seq.findIndex(c => c.book === 'Job' && c.chapter === 1);
    expect(seq[i - 1]).toEqual({ book: 'Genesis', chapter: 11 });
  });

  it('tracks the current day as the first unfinished day', () => {
    choosePlan('canonical');
    expect(getCurrentDay(getActivePlan()!)).toBe(1);
    setDayComplete('canonical', 1, true);
    setDayComplete('canonical', 2, true);
    expect(getCurrentDay(getActivePlan()!)).toBe(3);
    setDayComplete('canonical', 1, false);
    expect(getCurrentDay(getActivePlan()!)).toBe(1);
  });

  it('keeps progress separately for each plan', () => {
    choosePlan('canonical');
    setDayComplete('canonical', 1, true);
    choosePlan('chronological');
    expect(getCurrentDay(getActivePlan()!)).toBe(1);
    choosePlan('canonical');
    expect(getCurrentDay(getActivePlan()!)).toBe(2);
  });
});
