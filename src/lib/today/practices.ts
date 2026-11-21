// ============ Today: practices, rhythm, and intentions ============

import { type ActivityEvent, type ActivityType, activitiesOn, dateKey, getActivities, lastNDays, logActivity } from '@/lib/activityLog';
import type { TimePeriod } from '@/lib/timeAwareness';

export type PracticeKind = 'linked' | 'guided' | 'check';

export interface Practice {
  id: string;
  name: string;
  description: string;
  kind: PracticeKind;
  /** When it fits best — used to order the rhythm by time of day */
  bestTime: 'morning' | 'evening' | 'any';
  /** Activity types that count as doing this practice */
  countsAs: ActivityType[];
}

export const PRACTICES: Practice[] = [
  { id: 'scripture', name: 'Read Scripture', description: 'Today’s reading from your plan', kind: 'linked', bestTime: 'morning', countsAs: ['reading'] },
  { id: 'pray', name: 'Pray', description: 'Adoration, confession, thanksgiving, requests', kind: 'guided', bestTime: 'morning', countsAs: ['prayer'] },
  { id: 'meditate', name: 'Meditate', description: 'Breathe and dwell on a verse', kind: 'linked', bestTime: 'any', countsAs: ['meditation'] },
  { id: 'study', name: 'Study', description: 'Go deeper with a study method', kind: 'linked', bestTime: 'any', countsAs: ['study'] },
  { id: 'gratitude', name: 'Gratitude', description: 'Name three gifts from God today', kind: 'guided', bestTime: 'evening', countsAs: ['gratitude'] },
  { id: 'examen', name: 'Evening Examen', description: 'Look back on the day with God', kind: 'guided', bestTime: 'evening', countsAs: ['examen'] },
  { id: 'rest', name: 'Rest', description: 'Sabbath rest — stop, delight, and trust', kind: 'check', bestTime: 'any', countsAs: ['checkin'] },
  { id: 'fast', name: 'Fast', description: 'Set something aside to seek God', kind: 'check', bestTime: 'any', countsAs: ['checkin'] },
  { id: 'serve', name: 'Serve', description: 'Love someone in a practical way', kind: 'check', bestTime: 'any', countsAs: ['checkin'] },
  { id: 'share', name: 'Share your faith', description: 'Tell someone what God has done', kind: 'check', bestTime: 'any', countsAs: ['checkin'] },
];

export const DEFAULT_RHYTHM = ['scripture', 'pray', 'gratitude', 'examen'];

export function getPractice(id: string): Practice | undefined {
  return PRACTICES.find(p => p.id === id);
}

function matches(practice: Practice, e: ActivityEvent): boolean {
  if (!practice.countsAs.includes(e.type)) return false;
  return practice.kind === 'check' ? e.practiceId === practice.id : true;
}

/** Was this practice done on the given day? */
export function isPracticeDone(practice: Practice, key = dateKey(new Date()), events = getActivities()): boolean {
  return activitiesOn(key, events).some(e => matches(practice, e));
}

/** Gentle weekly view: on how many of the last 7 days was this practiced? (No streaks.) */
export function daysPracticedThisWeek(practice: Practice, events = getActivities()): number {
  const days = new Set(events.filter(e => matches(practice, e)).map(e => dateKey(e.at)));
  return lastNDays(7).filter(k => days.has(k)).length;
}

/** For each of the last 7 days: was anything practiced? */
export function weekDots(events = getActivities()): { key: string; active: boolean }[] {
  const days = new Set(events.filter(e => e.type !== 'portrait').map(e => dateKey(e.at)));
  return lastNDays(7).map(key => ({ key, active: days.has(key) }));
}

export function checkIn(practice: Practice) {
  logActivity({ type: 'checkin', practiceId: practice.id, label: practice.name, refId: `checkin:${practice.id}:${dateKey(new Date())}` });
}

/** Order the rhythm so the practices that fit this time of day come first. */
export function orderForTime(ids: string[], period: TimePeriod): Practice[] {
  const evening = period === 'evening' || period === 'night';
  const score = (p: Practice) => (p.bestTime === 'any' ? 1 : (p.bestTime === 'evening') === evening ? 0 : 2);
  return ids
    .map(getPractice)
    .filter((p): p is Practice => !!p)
    .sort((a, b) => score(a) - score(b));
}

// ---- Rhythm (chosen practices) ----

const RHYTHM_KEY = 'wl-today-rhythm';

export function getRhythm(): string[] {
  try {
    const raw = localStorage.getItem(RHYTHM_KEY);
    const ids: unknown = raw ? JSON.parse(raw) : null;
    if (Array.isArray(ids)) return ids.filter((id): id is string => typeof id === 'string' && !!getPractice(id));
  } catch {
    /* fall through */
  }
  return DEFAULT_RHYTHM;
}

export function saveRhythm(ids: string[]) {
  try {
    localStorage.setItem(RHYTHM_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

// ---- Intention ----

export type IntentionFocus = 'prayer' | 'trust' | 'peace' | 'scripture' | 'gratitude' | 'rest' | 'obedience' | 'knowing-god';

export const INTENTION_FOCUSES: { id: IntentionFocus; label: string; example: string }[] = [
  { id: 'knowing-god', label: 'Knowing God', example: 'To know God more deeply for who He is' },
  { id: 'prayer', label: 'Prayer', example: 'To grow in prayer and talk with God every day' },
  { id: 'trust', label: 'Trust', example: 'To trust God with what I can’t control' },
  { id: 'peace', label: 'Peace', example: 'To find my peace in God instead of my circumstances' },
  { id: 'scripture', label: 'Scripture', example: 'To be rooted in God’s Word' },
  { id: 'gratitude', label: 'Gratitude', example: 'To notice and thank God for His gifts' },
  { id: 'rest', label: 'Rest', example: 'To rest in God and stop striving' },
  { id: 'obedience', label: 'Obedience', example: 'To follow God in the small, everyday things' },
];

export interface Intention {
  text: string;
  focus: IntentionFocus;
  setAt: string;
}

const INTENTION_KEY = 'wl-today-intention';

export function getIntention(): Intention | null {
  try {
    const raw = localStorage.getItem(INTENTION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveIntention(intention: Intention | null) {
  try {
    if (intention) localStorage.setItem(INTENTION_KEY, JSON.stringify(intention));
    else localStorage.removeItem(INTENTION_KEY);
  } catch {
    /* ignore */
  }
}
