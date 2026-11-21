// ============ Portraits of God ============
//
// What a person learns about God — collected from study sessions, chapter
// reflections, and meditation — grouped by attribute into a growing portrait.

import { logActivity } from './activityLog';

export interface GodAttribute {
  id: string;
  name: string;
  /** Short line describing the attribute */
  summary: string;
  /** A verse that names it */
  anchor: string;
}

export const GOD_ATTRIBUTES: GodAttribute[] = [
  { id: 'faithful', name: 'Faithful', summary: 'He keeps every promise.', anchor: 'Lamentations 3:22–23' },
  { id: 'loving', name: 'Loving', summary: 'His love is steadfast and everlasting.', anchor: '1 John 4:16' },
  { id: 'holy', name: 'Holy', summary: 'He is set apart, pure, and perfect.', anchor: 'Isaiah 6:3' },
  { id: 'merciful', name: 'Merciful', summary: 'He does not treat us as our sins deserve.', anchor: 'Psalm 103:10' },
  { id: 'gracious', name: 'Gracious', summary: 'He gives what we could never earn.', anchor: 'Ephesians 2:8' },
  { id: 'just', name: 'Just', summary: 'He always does what is right.', anchor: 'Deuteronomy 32:4' },
  { id: 'sovereign', name: 'Sovereign', summary: 'He rules over all things.', anchor: 'Psalm 103:19' },
  { id: 'good', name: 'Good', summary: 'Everything He does is good.', anchor: 'Psalm 34:8' },
  { id: 'wise', name: 'Wise', summary: 'His understanding has no limit.', anchor: 'Romans 11:33' },
  { id: 'present', name: 'Present', summary: 'He is near and never leaves.', anchor: 'Psalm 139:7' },
  { id: 'patient', name: 'Patient', summary: 'He is slow to anger.', anchor: '2 Peter 3:9' },
  { id: 'powerful', name: 'Powerful', summary: 'Nothing is too hard for Him.', anchor: 'Jeremiah 32:17' },
  { id: 'provider', name: 'Provider', summary: 'He supplies every need.', anchor: 'Philippians 4:19' },
  { id: 'redeemer', name: 'Redeemer', summary: 'He rescues and restores His people.', anchor: 'Isaiah 44:24' },
  { id: 'shepherd', name: 'Shepherd', summary: 'He leads, guards, and cares for His own.', anchor: 'Psalm 23:1' },
  { id: 'unchanging', name: 'Unchanging', summary: 'He is the same yesterday, today, and forever.', anchor: 'Hebrews 13:8' },
];

export type PortraitSource = 'study' | 'reflection' | 'meditation' | 'journal';

export interface PortraitEntry {
  id: string;
  attributeIds: string[];
  /** What the person saw of God, in their own words */
  text: string;
  /** e.g. "John 3:16" or "John 3" */
  reference?: string;
  source: PortraitSource;
  createdAt: string;
}

const KEY = 'wl-portraits-of-god';

export function getPortraitEntries(): PortraitEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(entries: PortraitEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable */
  }
}

export function addPortraitEntry(entry: Omit<PortraitEntry, 'id' | 'createdAt'>): PortraitEntry | null {
  const text = entry.text.trim();
  if (!text || entry.attributeIds.length === 0) return null;
  const full: PortraitEntry = {
    ...entry,
    text,
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  saveAll([full, ...getPortraitEntries()]);
  const names = full.attributeIds.map(id => GOD_ATTRIBUTES.find(a => a.id === id)?.name).filter(Boolean).join(', ');
  logActivity({ type: 'portrait', label: `Saw God as ${names.toLowerCase()}${full.reference ? ` · ${full.reference}` : ''}`, refId: `portrait:${full.id}` });
  return full;
}

export function deletePortraitEntry(id: string) {
  saveAll(getPortraitEntries().filter(e => e.id !== id));
}

export function getAttribute(id: string): GodAttribute | undefined {
  return GOD_ATTRIBUTES.find(a => a.id === id);
}

/** Count of entries per attribute id. */
export function countByAttribute(entries: PortraitEntry[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of entries) for (const id of e.attributeIds) counts[id] = (counts[id] ?? 0) + 1;
  return counts;
}
