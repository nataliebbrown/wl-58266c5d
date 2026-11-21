// ============ TimeWalk data loading ============
//
// Built by scripts/build-timewalk.mjs (Theographic CC BY-SA 4.0; OpenBible CC BY 4.0)
// and scripts/fetch-timewalk-images.mjs (Wikimedia Commons, openly licensed only).

import type { BibleReference } from '@/lib/bibleApi';
import { parseStepRef, stepCode } from '@/lib/originalLanguage';
import { EVENT_SCHOLARLY_DATES, eraForChapter, formatYear, getEra, type DateSystem } from './eras';

export interface TimelineEvent {
  id: string;
  title: string;
  /** Traditional (Ussher) year, astronomical numbering */
  year: number | null;
  refs: string[];
  people: string[];
  places: string[];
}

export interface PersonSummary {
  id: string;
  name: string;
  title: string;
  born: number | null;
  died: number | null;
  verseCount: number;
  gender: 'm' | 'f' | '';
}

export interface PersonDetail {
  bio?: string;
  also?: string;
  father: string[];
  mother: string[];
  siblings: string[];
  children: string[];
  partners: string[];
  refs: string[];
  events: string[];
}

export interface ChapterSetting {
  people: [string, number][];
  events: string[];
  y?: [number, number];
}

export interface Photo {
  thumb: string;
  large: string;
  full: string;
  w?: number;
  h?: number;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string;
  alt: string;
  near?: boolean;
  title?: string;
  /** Where the source link goes (default: Wikimedia Commons) */
  sourceName?: string;
}

/** A hand-picked artwork, historical photo, or museum object (scripts/fetch-timewalk-art.mjs) */
export interface ArtImage extends Photo {
  id: string;
  /** art = an artist's interpretation; photo = historical photograph; artifact = museum object */
  kind: 'art' | 'photo' | 'artifact';
  era?: string;
  life?: string;
  caption: string;
  artist?: string;
  date?: string;
  ref?: BibleReference;
}

export const TIMEWALK_ATTRIBUTION = {
  people: 'People, events, and family data: Theographic Bible Metadata (CC BY-SA 4.0); biographies from Easton’s Bible Dictionary (1897, public domain)',
  photos: 'Photos: Wikimedia Commons contributors, used under the license shown with each image',
};

const BASE = `${import.meta.env.BASE_URL}data/timewalk`;
const cache = new Map<string, Promise<unknown>>();

function load<T>(rel: string): Promise<T | null> {
  let p = cache.get(rel) as Promise<T | null> | undefined;
  if (!p) {
    p = fetch(`${BASE}/${rel}`).then(r => (r.ok ? (r.json() as Promise<T>) : null));
    p.catch(() => cache.delete(rel));
    cache.set(rel, p);
  }
  return p;
}

// ---- Events ----

type RawEvent = { id: string; t: string; y: number | null; refs: string[]; people: string[]; places: string[] };

export async function getEvents(): Promise<TimelineEvent[]> {
  const raw = (await load<RawEvent[]>('events.json')) ?? [];
  return raw.map(e => ({ id: e.id, title: e.t, year: e.y, refs: e.refs, people: e.people, places: e.places }));
}

export async function getEventsById(): Promise<Map<string, TimelineEvent>> {
  return new Map((await getEvents()).map(e => [e.id, e]));
}

/** "Gen.1.1-31" -> reference to the first verse */
export function refFromRange(range: string): BibleReference | null {
  const [first] = range.split('-');
  return parseStepRef(first);
}

export function labelForRange(range: string): string {
  const r = refFromRange(range);
  if (!r) return range;
  const end = range.includes('-') ? `–${range.split('-')[1]}` : '';
  return `${r.book === 'Psalms' ? 'Psalm' : r.book} ${r.chapter}:${r.verse}${end}`;
}

/** The era an event belongs to (from its first passage). */
export function eraOfEvent(e: TimelineEvent) {
  const r = e.refs.length ? refFromRange(e.refs[0]) : null;
  return r ? eraForChapter(r.book, r.chapter) : undefined;
}

/** Date label for an event in the chosen system, plus the other system's label. */
export function eventDates(e: TimelineEvent, system: DateSystem): { primary: string; secondary: string; caveat?: string } {
  const traditional = e.year !== null ? formatYear(e.year) : '';
  const known = EVENT_SCHOLARLY_DATES[e.title];
  const era = eraOfEvent(e);
  const scholarly = known?.label ?? (era ? (era.scholarly === 'Not dated' ? 'Not dated' : `During ${era.name.toLowerCase()} (${era.scholarly})`) : '');
  const caveat = known?.caveat ?? era?.caveats[0];
  return system === 'scholarly'
    ? { primary: scholarly, secondary: traditional ? `Traditional: ${traditional}` : '', caveat }
    : { primary: traditional || scholarly, secondary: scholarly ? `Scholarly: ${scholarly}` : '', caveat };
}

// ---- People ----

type RawPerson = [string, string, string, number | null, number | null, number, 'm' | 'f' | ''];

let peopleIndex: Promise<PersonSummary[]> | null = null;
export function getPeopleIndex(): Promise<PersonSummary[]> {
  peopleIndex ??= load<RawPerson[]>('people-index.json').then(rows =>
    (rows ?? []).map(([id, name, title, born, died, verseCount, gender]) => ({ id, name, title, born, died, verseCount, gender }))
  );
  return peopleIndex;
}

export async function getPeopleById(): Promise<Map<string, PersonSummary>> {
  return new Map((await getPeopleIndex()).map(p => [p.id, p]));
}

const chunkOfPerson = (id: string) => {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 64;
};

export async function getPerson(id: string): Promise<PersonDetail | null> {
  const data = await load<Record<string, PersonDetail>>(`people/${chunkOfPerson(id)}.json`);
  return data?.[id] ?? null;
}

export async function searchPeople(query: string, limit = 40): Promise<PersonSummary[]> {
  const q = query.trim().toLowerCase();
  const all = await getPeopleIndex();
  if (!q) return all.slice(0, limit);
  return all.filter(p => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)).slice(0, limit);
}

/** "c. 1085–1015 BC" in the traditional chronology */
export function lifespan(p: PersonSummary): string {
  if (p.born === null && p.died === null) return '';
  if (p.born !== null && p.died !== null) return `${formatYear(p.born)} – ${formatYear(p.died)}`;
  return p.born !== null ? `born ${formatYear(p.born)}` : `died ${formatYear(p.died)}`;
}

// ---- Chapters ----

export async function getChapterSetting(book: string, chapter: number): Promise<ChapterSetting | null> {
  const code = stepCode(book);
  if (!code) return null;
  const data = await load<Record<string, ChapterSetting>>(`chapters/${code}.json`);
  return data?.[String(chapter)] ?? null;
}

// ---- Photos ----

export async function getPlacePhotos(): Promise<Record<string, Photo>> {
  return (await load<Record<string, Photo>>('place-photos.json')) ?? {};
}

export async function getArt(): Promise<ArtImage[]> {
  const data = (await load<Record<string, Omit<ArtImage, 'id'>>>('art.json')) ?? {};
  return Object.entries(data).map(([id, a]) => ({ id, ...a }));
}

export async function getFindImages(): Promise<Record<string, Photo>> {
  return (await load<Record<string, Photo>>('find-images.json')) ?? {};
}

export { getEra };
