// ============ Daily Bible reading ============
//
// Read through the whole Bible at your own pace. There are no dates and no
// totals — just "Day 37". Missing a day never puts anyone behind.

import { BIBLE_BOOKS } from './bibleApi';
import { logActivity, removeActivity } from './activityLog';

export type ReadingPlanId = 'canonical' | 'chronological';

export interface ReadingPlanInfo {
  id: ReadingPlanId;
  name: string;
  description: string;
}

export const READING_PLANS: ReadingPlanInfo[] = [
  {
    id: 'canonical',
    name: 'Bible order',
    description: 'Genesis to Revelation, in the order the books appear in your Bible.',
  },
  {
    id: 'chronological',
    name: 'Chronological',
    description:
      'The story in the order events happened — Job alongside the patriarchs, the prophets within the history of the kings, and Paul’s letters woven into Acts.',
  },
];

export interface ChapterRef {
  book: string;
  chapter: number;
}

export interface ReadingDay {
  day: number;
  chapters: ChapterRef[];
}

const CHAPTERS_PER_DAY = 3;

// ---- Chapter sequences ----

function range(book: string, from: number, to?: number): ChapterRef[] {
  const last = to ?? BIBLE_BOOKS.find(b => b.name === book)!.chapters;
  return Array.from({ length: last - from + 1 }, (_, i) => ({ book, chapter: from + i }));
}

const whole = (book: string) => range(book, 1);

function canonicalSequence(): ChapterRef[] {
  return BIBLE_BOOKS.flatMap(b => whole(b.name));
}

/**
 * An approximate chronological order (dates of many books are debated).
 * Psalms are grouped after David's reign, with Psalm 90 (a prayer of Moses)
 * placed after Deuteronomy.
 */
function chronologicalSequence(): ChapterRef[] {
  return [
    ...range('Genesis', 1, 11),
    ...whole('Job'),
    ...range('Genesis', 12, 50),
    ...whole('Exodus'),
    ...whole('Leviticus'),
    ...whole('Numbers'),
    ...whole('Deuteronomy'),
    ...range('Psalms', 90, 90),
    ...whole('Joshua'),
    ...whole('Judges'),
    ...whole('Ruth'),
    ...whole('1 Samuel'),
    ...whole('2 Samuel'),
    ...whole('1 Chronicles'),
    ...range('Psalms', 1, 89),
    ...range('Psalms', 91, 150),
    ...range('1 Kings', 1, 11),
    ...range('2 Chronicles', 1, 9),
    ...whole('Proverbs'),
    ...whole('Song of Solomon'),
    ...whole('Ecclesiastes'),
    ...range('1 Kings', 12, 22),
    ...range('2 Chronicles', 10, 20),
    ...range('2 Kings', 1, 14),
    ...whole('Joel'),
    ...whole('Jonah'),
    ...whole('Amos'),
    ...whole('Hosea'),
    ...range('2 Kings', 15, 17),
    ...range('2 Chronicles', 21, 28),
    ...range('Isaiah', 1, 39),
    ...whole('Micah'),
    ...range('2 Kings', 18, 25),
    ...range('2 Chronicles', 29, 36),
    ...range('Isaiah', 40, 66),
    ...whole('Nahum'),
    ...whole('Zephaniah'),
    ...whole('Habakkuk'),
    ...whole('Jeremiah'),
    ...whole('Lamentations'),
    ...whole('Obadiah'),
    ...whole('Ezekiel'),
    ...whole('Daniel'),
    ...range('Ezra', 1, 6),
    ...whole('Haggai'),
    ...whole('Zechariah'),
    ...whole('Esther'),
    ...range('Ezra', 7, 10),
    ...whole('Nehemiah'),
    ...whole('Malachi'),
    ...whole('Matthew'),
    ...whole('Mark'),
    ...whole('Luke'),
    ...whole('John'),
    ...range('Acts', 1, 14),
    ...whole('James'),
    ...range('Acts', 15, 15),
    ...whole('Galatians'),
    ...range('Acts', 16, 17),
    ...whole('1 Thessalonians'),
    ...whole('2 Thessalonians'),
    ...range('Acts', 18, 19),
    ...whole('1 Corinthians'),
    ...whole('2 Corinthians'),
    ...whole('Romans'),
    ...range('Acts', 20, 28),
    ...whole('Ephesians'),
    ...whole('Philippians'),
    ...whole('Colossians'),
    ...whole('Philemon'),
    ...whole('1 Timothy'),
    ...whole('Titus'),
    ...whole('1 Peter'),
    ...whole('Hebrews'),
    ...whole('2 Timothy'),
    ...whole('2 Peter'),
    ...whole('Jude'),
    ...whole('1 John'),
    ...whole('2 John'),
    ...whole('3 John'),
    ...whole('Revelation'),
  ];
}

export function getPlanSequence(planId: ReadingPlanId): ChapterRef[] {
  return planId === 'chronological' ? chronologicalSequence() : canonicalSequence();
}

const dayCache = new Map<ReadingPlanId, ReadingDay[]>();

export function getPlanDays(planId: ReadingPlanId): ReadingDay[] {
  let days = dayCache.get(planId);
  if (!days) {
    const seq = getPlanSequence(planId);
    days = [];
    for (let i = 0; i < seq.length; i += CHAPTERS_PER_DAY) {
      days.push({ day: days.length + 1, chapters: seq.slice(i, i + CHAPTERS_PER_DAY) });
    }
    dayCache.set(planId, days);
  }
  return days;
}

export function getPlanDay(planId: ReadingPlanId, day: number): ReadingDay | undefined {
  return getPlanDays(planId)[day - 1];
}

// ---- Labels ----

const displayBook = (book: string, single: boolean) => (book === 'Psalms' && single ? 'Psalm' : book);

/** "Genesis 1–3", "Genesis 50 – Exodus 2", "Psalm 90 · Joshua 1–2" */
export function formatDay(day: ReadingDay): string {
  const groups: { book: string; from: number; to: number }[] = [];
  for (const c of day.chapters) {
    const last = groups[groups.length - 1];
    if (last && last.book === c.book && c.chapter === last.to + 1) last.to = c.chapter;
    else groups.push({ book: c.book, from: c.chapter, to: c.chapter });
  }
  return groups
    .map(g => (g.from === g.to ? `${displayBook(g.book, true)} ${g.from}` : `${displayBook(g.book, false)} ${g.from}–${g.to}`))
    .join(' · ');
}

// ---- Progress ----

export interface PlanProgress {
  planId: ReadingPlanId;
  startedAt: string;
  completedDays: number[];
  lastCompletedAt?: string;
}

const PROGRESS_KEY = 'wl-reading-plan';

interface StoredProgress {
  activePlanId: ReadingPlanId | null;
  plans: Partial<Record<ReadingPlanId, PlanProgress>>;
}

function load(): StoredProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through */
  }
  return { activePlanId: null, plans: {} };
}

function store(data: StoredProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function getActivePlan(): PlanProgress | null {
  const data = load();
  return data.activePlanId ? data.plans[data.activePlanId] ?? null : null;
}

/** Start (or switch to) a plan. Progress in each plan is kept separately. */
export function choosePlan(planId: ReadingPlanId): PlanProgress {
  const data = load();
  const existing = data.plans[planId];
  const progress = existing ?? { planId, startedAt: new Date().toISOString(), completedDays: [] };
  store({ activePlanId: planId, plans: { ...data.plans, [planId]: progress } });
  return progress;
}

export function restartPlan(planId: ReadingPlanId): PlanProgress {
  const data = load();
  const progress: PlanProgress = { planId, startedAt: new Date().toISOString(), completedDays: [] };
  store({ activePlanId: planId, plans: { ...data.plans, [planId]: progress } });
  return progress;
}

export function setDayComplete(planId: ReadingPlanId, day: number, complete: boolean): PlanProgress {
  const data = load();
  const current = data.plans[planId] ?? { planId, startedAt: new Date().toISOString(), completedDays: [] };
  const set = new Set(current.completedDays);
  if (complete) set.add(day);
  else set.delete(day);
  const progress: PlanProgress = {
    ...current,
    completedDays: [...set].sort((a, b) => a - b),
    lastCompletedAt: complete ? new Date().toISOString() : current.lastCompletedAt,
  };
  store({ activePlanId: data.activePlanId ?? planId, plans: { ...data.plans, [planId]: progress } });
  const refId = `reading:${planId}:${day}`;
  const readingDay = getPlanDay(planId, day);
  if (complete && readingDay) logActivity({ type: 'reading', label: `Day ${day} · ${formatDay(readingDay)}`, refId });
  else if (!complete) removeActivity(refId);
  return progress;
}

/** The next day to read: the first day not yet completed. */
export function getCurrentDay(progress: PlanProgress): number {
  const done = new Set(progress.completedDays);
  const total = getPlanDays(progress.planId).length;
  for (let d = 1; d <= total; d++) if (!done.has(d)) return d;
  return total + 1; // finished the whole Bible
}

export function isPlanFinished(progress: PlanProgress): boolean {
  return getCurrentDay(progress) > getPlanDays(progress.planId).length;
}

/** Router state for a reading-plan day opened in the Bible reader */
export interface PlanDayState {
  planId: ReadingPlanId;
  day: number;
}
