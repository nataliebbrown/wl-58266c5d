// ============ Journey: a timeline of your walk with God ============

import type { JourneyNode } from '@/components/dashboard/JourneyCard';
import { dateKey, type ActivityEvent, type ActivityType } from './activityLog';
import { getPractice } from './today/practices';

const MAX_DAYS = 30;

// Most meaningful first: what they saw of God, then studies, reading, practices
const PRIORITY: ActivityType[] = ['portrait', 'study', 'reading', 'meditation', 'examen', 'prayer', 'gratitude', 'checkin'];

const TYPE_NAMES: Record<ActivityType, string> = {
  portrait: 'Portraits of God',
  study: 'Study',
  reading: 'Scripture',
  meditation: 'Meditation',
  examen: 'Examen',
  prayer: 'Prayer',
  gratitude: 'Gratitude',
  checkin: 'Practice',
};

function typeName(e: ActivityEvent): string {
  return e.type === 'checkin' ? getPractice(e.practiceId ?? '')?.name ?? 'Practice' : TYPE_NAMES[e.type];
}

/** One node per day with activity (oldest first), the last one marked as now. */
export function buildJourneyNodes(events: ActivityEvent[]): JourneyNode[] {
  const byDay = new Map<string, ActivityEvent[]>();
  for (const e of events) {
    const k = dateKey(e.at);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(e);
  }
  const todayKey = dateKey(new Date());
  const days = [...byDay.keys()].sort().slice(-MAX_DAYS);
  const nodes: JourneyNode[] = days.map(k => {
    const dayEvents = byDay.get(k)!;
    const top = [...dayEvents].sort((a, b) => PRIORITY.indexOf(a.type) - PRIORITY.indexOf(b.type))[0];
    const kinds = [...new Set(dayEvents.map(typeName))];
    const date = new Date(`${k}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return { id: k, theme: top.label, timeLabel: `${date} · ${kinds.join(', ')}` };
  });
  if (nodes.length) {
    const last = nodes[nodes.length - 1];
    if (last.id === todayKey) last.isCurrent = true;
    else nodes.push({ id: 'now', theme: 'Your next step with God', timeLabel: 'Today', isCurrent: true });
  }
  return nodes;
}

