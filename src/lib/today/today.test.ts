import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logActivity, removeActivity, getActivities } from '../activityLog';
import { getPractice, isPracticeDone, daysPracticedThisWeek, orderForTime, checkIn, weekDots } from './practices';
import { getDailySuggestion, parseAnchor } from './suggestions';
import { GUIDED_PRACTICES } from './guided';
import { buildJourneyNodes } from '../journey';
import { choosePlan, setDayComplete } from '../readingPlan';

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
  });
});

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

describe('Today practices', () => {
  it('auto-checks a practice when its activity happens today', () => {
    const scripture = getPractice('scripture')!;
    expect(isPracticeDone(scripture)).toBe(false);
    logActivity({ type: 'reading', label: 'Day 1 · Genesis 1–3' });
    expect(isPracticeDone(scripture)).toBe(true);
  });

  it('check-in practices only count their own check-in, and can be undone', () => {
    const rest = getPractice('rest')!;
    const fast = getPractice('fast')!;
    checkIn(rest);
    expect(isPracticeDone(rest)).toBe(true);
    expect(isPracticeDone(fast)).toBe(false);
    const ref = getActivities()[0].refId!;
    removeActivity(ref);
    expect(isPracticeDone(rest)).toBe(false);
  });

  it('counts days this week gently (distinct days, no streaks)', () => {
    const pray = getPractice('pray')!;
    logActivity({ type: 'prayer', label: 'Pray', at: daysAgo(0) });
    logActivity({ type: 'prayer', label: 'Pray', at: daysAgo(0) });
    logActivity({ type: 'prayer', label: 'Pray', at: daysAgo(3) });
    logActivity({ type: 'prayer', label: 'Pray', at: daysAgo(10) }); // outside the week
    expect(daysPracticedThisWeek(pray)).toBe(2);
    expect(weekDots().filter(d => d.active)).toHaveLength(2);
  });

  it('orders evening practices first in the evening', () => {
    const ids = ['scripture', 'examen', 'meditate'];
    expect(orderForTime(ids, 'morning')[0].id).toBe('scripture');
    expect(orderForTime(ids, 'evening')[0].id).toBe('examen');
  });

  it('every guided practice that reflects on God has a reveals-god or adoration step', () => {
    for (const p of GUIDED_PRACTICES) {
      expect(p.steps.some(s => s.kind === 'reveals-god' || s.kind === 'adore'), p.name).toBe(true);
    }
  });
});

describe('daily suggestion', () => {
  it('is stable for a given day and follows the intention', () => {
    const ctx = { period: 'morning' as const, intention: { text: 'Peace', focus: 'peace' as const, setAt: '' }, portraits: [], hasReadingPlan: true, date: new Date('2026-11-21T09:00:00') };
    const a = getDailySuggestion(ctx);
    const b = getDailySuggestion(ctx);
    expect(a.id).toBe(b.id);
  });

  it('suggests the Examen in the evening when it is not already in the rhythm', () => {
    const s = getDailySuggestion({ period: 'evening', intention: null, portraits: [], hasReadingPlan: true, examenDoneToday: false, examenInRhythm: false });
    expect(s.action).toEqual({ kind: 'practice', practiceId: 'examen' });
  });

  it('suggests stepping into the history behind today’s reading', () => {
    const days = (n: number) => [0, 1, 2].map(i => getDailySuggestion({ period: 'morning', intention: null, portraits: [], hasReadingPlan: true, date: new Date(2026, 10, 21 + i + n) }));
    choosePlan('canonical');
    // Day 1 (Genesis 1–3) is "The Beginning", which TimeWalk doesn't date — no history suggestion
    expect(days(0).some(s => s.id.startsWith('timewalk-'))).toBe(false);
    // Finish days 1–17 so today is day 18 (Exodus 2–4)
    for (let d = 1; d <= 17; d++) setDayComplete('canonical', d, true);
    const hit = days(0).find(s => s.id.startsWith('timewalk-'));
    expect(hit?.action).toEqual({ kind: 'timewalk', eraId: 'exodus' });
    expect(hit?.title).toBe('Step into the world of Exodus');
  });

  it('parses attribute anchors', () => {
    expect(parseAnchor('Psalm 23:1')).toEqual({ book: 'Psalms', chapter: 23, verse: 1 });
    expect(parseAnchor('Lamentations 3:22–23')).toEqual({ book: 'Lamentations', chapter: 3, verse: 22 });
  });
});

describe('journey', () => {
  it('makes one node per active day, oldest first, with the most meaningful label', () => {
    logActivity({ type: 'prayer', label: 'Pray', at: daysAgo(2) });
    logActivity({ type: 'portrait', label: 'Saw God as faithful · Jude 1', at: daysAgo(2) });
    logActivity({ type: 'reading', label: 'Day 1 · Genesis 1–3', at: daysAgo(1) });
    const nodes = buildJourneyNodes(getActivities());
    expect(nodes[0].theme).toBe('Saw God as faithful · Jude 1');
    expect(nodes[1].theme).toBe('Day 1 · Genesis 1–3');
    expect(nodes[nodes.length - 1]).toMatchObject({ isCurrent: true, theme: 'Your next step with God' });
  });
});
