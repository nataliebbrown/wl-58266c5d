// ============ Activity log ============
//
// A simple record of spiritual practices as they happen (a reading day
// finished, a meditation, a study, a prayer…). It powers Today's automatic
// check-offs, the gentle weekly summary, and the Journey timeline.

export type ActivityType =
  | 'reading'
  | 'meditation'
  | 'study'
  | 'prayer'
  | 'examen'
  | 'gratitude'
  | 'checkin'
  | 'portrait';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  /** Short description, e.g. "Day 3 · Genesis 7–9" */
  label: string;
  /** For check-in practices (rest, fasting, serving, sharing) */
  practiceId?: string;
  /** Lets a later action undo this event, e.g. "reading:canonical:3" */
  refId?: string;
  at: string;
}

const KEY = 'wl-activity-log';
const MAX_EVENTS = 2000;

export function getActivities(): ActivityEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(events: ActivityEvent[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(events.slice(0, MAX_EVENTS)));
  } catch {
    /* storage unavailable */
  }
}

export function logActivity(event: Omit<ActivityEvent, 'id' | 'at'> & { at?: string }): ActivityEvent {
  const full: ActivityEvent = {
    ...event,
    id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: event.at ?? new Date().toISOString(),
  };
  // Replace any earlier event with the same refId (e.g. re-marking a reading day)
  const rest = event.refId ? getActivities().filter(e => e.refId !== event.refId) : getActivities();
  saveAll([full, ...rest]);
  return full;
}

export function removeActivity(refId: string) {
  saveAll(getActivities().filter(e => e.refId !== refId));
}

/** Local calendar date key, e.g. "2026-11-21" */
export function dateKey(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function activitiesOn(key: string, events = getActivities()): ActivityEvent[] {
  return events.filter(e => dateKey(e.at) === key);
}

/** The last `n` calendar days (oldest first), as date keys. */
export function lastNDays(n: number, today = new Date()): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (n - 1 - i));
    return dateKey(d);
  });
}
