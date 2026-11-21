#!/usr/bin/env node
/**
 * Build TimeWalk data served from public/data/timewalk/.
 *
 * Sources:
 *  - Theographic Bible Metadata (CC BY-SA 4.0) — https://github.com/robertrouse/theographic-bible-metadata
 *      json/events.json, people.json, places.json, verses.json
 *    Dates in Theographic follow Ussher's traditional chronology; WL shows them as the
 *    "Traditional" option and pairs them with scholarly era dates (see src/lib/timewalk/eras.ts).
 *  - OpenBible.info Bible Geocoding Data (CC BY 4.0) — data/ancient.jsonl, data/image.jsonl
 *      Place photos are referenced on Wikimedia Commons (not copied); only openly licensed
 *      images are kept, with author, license, and source link for attribution.
 *
 * Usage: node scripts/build-timewalk.mjs <theographicDir> <openbibleDir>
 *
 * Output:
 *   events.json                 [{ id, t, y, d, refs, people, places }]
 *   people-index.json           [[id, name, title, born, died, verseCount, gender]]
 *   people/<chunk>.json         id -> { bio, father, mother, siblings, children, partners, refs, events }
 *   chapters/<StepBook>.json    chapter -> { people: [[id, verses]], events: [ids], y: [min, max] }
 *   place-photos.json           OpenBible ancient id -> { thumb, large, full, w, h, author, license, source, alt, near? }
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [theoDir, obDir] = process.argv.slice(2);
if (!obDir) {
  console.error('Usage: node scripts/build-timewalk.mjs <theographicDir> <openbibleDir>');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public/data/timewalk');
// Clear only this script's outputs (find-images.json comes from fetch-timewalk-images.mjs)
for (const name of ['events.json', 'people-index.json', 'place-photos.json', 'people', 'chapters']) {
  fs.rmSync(path.join(out, name), { recursive: true, force: true });
}
const writeJson = (rel, data) => {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
};
const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'));
/** Theographic fields are usually arrays but sometimes a single value or a comma list */
const arr = x => (Array.isArray(x) ? x : x == null || x === '' ? [] : String(x).split(/\s*,\s*/));

// Theographic OSIS book codes -> STEPBible codes used by the app's data files
const OSIS_TO_STEP = {
  Gen: 'Gen', Exod: 'Exo', Lev: 'Lev', Num: 'Num', Deut: 'Deu', Josh: 'Jos', Judg: 'Jdg', Ruth: 'Rut', '1Sam': '1Sa', '2Sam': '2Sa',
  '1Kgs': '1Ki', '2Kgs': '2Ki', '1Chr': '1Ch', '2Chr': '2Ch', Ezra: 'Ezr', Neh: 'Neh', Esth: 'Est', Job: 'Job', Ps: 'Psa', Prov: 'Pro',
  Eccl: 'Ecc', Song: 'Sng', Isa: 'Isa', Jer: 'Jer', Lam: 'Lam', Ezek: 'Ezk', Dan: 'Dan', Hos: 'Hos', Joel: 'Jol', Amos: 'Amo', Obad: 'Oba',
  Jonah: 'Jon', Mic: 'Mic', Nah: 'Nam', Hab: 'Hab', Zeph: 'Zep', Hag: 'Hag', Zech: 'Zec', Mal: 'Mal', Matt: 'Mat', Mark: 'Mrk',
  Luke: 'Luk', John: 'Jhn', Acts: 'Act', Rom: 'Rom', '1Cor': '1Co', '2Cor': '2Co', Gal: 'Gal', Eph: 'Eph', Phil: 'Php', Col: 'Col',
  '1Thess': '1Th', '2Thess': '2Th', '1Tim': '1Ti', '2Tim': '2Ti', Titus: 'Tit', Phlm: 'Phm', Heb: 'Heb', Jas: 'Jas', '1Pet': '1Pe',
  '2Pet': '2Pe', '1John': '1Jn', '2John': '2Jn', '3John': '3Jn', Jude: 'Jud', Rev: 'Rev',
};
const stepRef = osis => {
  const [b, c, v] = osis.split('.');
  const code = OSIS_TO_STEP[b];
  return code ? `${code}.${c}.${v}` : null;
};

const clean = s =>
  String(s ?? '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*/g, '\n\n')
    .trim();

const year = s => {
  if (s == null || s === '') return null;
  const m = String(s).match(/^(-?\d+)/);
  return m ? Number(m[1]) : null;
};

// ---- Load ----
const verses = readJson(path.join(theoDir, 'verses.json'));
const people = readJson(path.join(theoDir, 'people.json'));
const events = readJson(path.join(theoDir, 'events.json'));
const places = readJson(path.join(theoDir, 'places.json'));

const verseRef = new Map(); // record id -> STEP ref
for (const v of verses) {
  const ref = stepRef(v.fields.osisRef);
  if (ref) verseRef.set(v.id, ref);
}
const personId = new Map(); // record id -> slug
for (const p of people) personId.set(p.id, p.fields.slug || p.fields.personLookup || p.id);
const placeOb = new Map(); // record id -> OpenBible ancient id
for (const p of places) {
  const m = String(p.fields.openBibleUri ?? '').match(/\/ancient\/(a[0-9a-f]+)/);
  if (m) placeOb.set(p.id, m[1]);
}

/** Compress sorted refs into ranges: ["Gen.1.1-31", "Gen.2.1"] */
function compress(refs) {
  const keyed = refs.map(r => {
    const [b, c, v] = r.split('.');
    return { b, c: Number(c), v: Number(v) };
  });
  const outRanges = [];
  let start = null;
  let prev = null;
  for (const k of keyed) {
    if (prev && k.b === prev.b && k.c === prev.c && k.v === prev.v + 1) {
      prev = k;
      continue;
    }
    if (start) outRanges.push(start.v === prev.v ? `${start.b}.${start.c}.${start.v}` : `${start.b}.${start.c}.${start.v}-${prev.v}`);
    start = prev = k;
  }
  if (start) outRanges.push(start.v === prev.v ? `${start.b}.${start.c}.${start.v}` : `${start.b}.${start.c}.${start.v}-${prev.v}`);
  return outRanges;
}

// ---- Events ----
const eventOut = events
  .map(e => {
    const f = e.fields;
    const refs = arr(f.verses).map(id => verseRef.get(id)).filter(Boolean);
    return {
      id: String(f.eventID ?? e.id),
      t: f.title,
      y: year(f.startDate),
      d: f.duration ?? undefined,
      s: f.sortKey ?? year(f.startDate),
      refs: compress(refs),
      people: arr(f.participants).map(id => personId.get(id)).filter(Boolean),
      places: arr(f.locations).map(id => placeOb.get(id)).filter(Boolean),
    };
  })
  .sort((a, b) => (a.s ?? 0) - (b.s ?? 0));
writeJson('events.json', eventOut.map(({ s, ...rest }) => rest));
const eventByRecord = new Map(events.map(e => [e.id, String(e.fields.eventID ?? e.id)]));

// ---- People ----
const peopleIndex = [];
const peopleDetail = {};
for (const p of people) {
  const f = p.fields;
  const id = personId.get(p.id);
  const refs = arr(f.verses).map(v => verseRef.get(v)).filter(Boolean);
  peopleIndex.push([id, f.name, f.displayTitle && f.displayTitle !== f.name ? f.displayTitle : '', year(f.birthYear), year(f.deathYear), f.verseCount ?? refs.length, f.gender === 'Female' ? 'f' : f.gender === 'Male' ? 'm' : '']);
  const ids = list => arr(list).map(x => personId.get(x)).filter(Boolean);
  let bio = clean(arr(f.dictText).join('\n\n'));
  if (bio.length > 4000) bio = bio.slice(0, 4000).replace(/\s+\S*$/, '') + ' …';
  peopleDetail[id] = {
    bio: bio || undefined,
    also: f.alsoCalled ?? undefined,
    father: ids(f.father),
    mother: ids(f.mother),
    siblings: ids(f.siblings),
    children: ids(f.children),
    partners: ids(f.partners),
    refs: compress(refs).slice(0, 60),
    events: arr(f.events).map(e => eventByRecord.get(e)).filter(Boolean),
  };
}
peopleIndex.sort((a, b) => b[5] - a[5]);
writeJson('people-index.json', peopleIndex);
const chunkOfPerson = id => {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 64;
};
const peopleChunks = {};
for (const [id, d] of Object.entries(peopleDetail)) (peopleChunks[chunkOfPerson(id)] ??= {})[id] = d;
for (const [c, data] of Object.entries(peopleChunks)) writeJson(`people/${c}.json`, data);

// ---- Chapter index ----
const chapters = {}; // step book -> ch -> { people: Map, events: Set, years }
for (const v of verses) {
  const ref = verseRef.get(v.id);
  if (!ref) continue;
  const [b, c] = ref.split('.');
  const ch = ((chapters[b] ??= {})[c] ??= { people: new Map(), events: new Set(), years: [] });
  for (const pid of v.fields.people ?? []) {
    const id = personId.get(pid);
    if (id) ch.people.set(id, (ch.people.get(id) ?? 0) + 1);
  }
  for (const eid of v.fields.event ?? []) {
    const id = eventByRecord.get(eid);
    if (id) ch.events.add(id);
  }
  if (typeof v.fields.yearNum === 'number') ch.years.push(v.fields.yearNum);
}
for (const [b, chs] of Object.entries(chapters)) {
  const data = {};
  for (const [c, ch] of Object.entries(chs)) {
    data[c] = {
      people: [...ch.people.entries()].sort((a, b2) => b2[1] - a[1]),
      events: [...ch.events],
      y: ch.years.length ? [Math.min(...ch.years), Math.max(...ch.years)] : undefined,
    };
  }
  writeJson(`chapters/${b}.json`, data);
}

// ---- Place photos (Wikimedia Commons, openly licensed only) ----
const ALLOWED = /^(PD|CC-Zero|CC-BY(-SA)?-(2\.0|2\.5|3\.0|4\.0)|attribution|FAL)$/;
const LICENSE_LABEL = l =>
  l === 'PD'
    ? 'Public domain'
    : l === 'CC-Zero'
      ? 'CC0'
      : l === 'attribution'
        ? 'Attribution'
        : l === 'FAL'
          ? 'Free Art License'
          : l.replace(/^CC-BY-SA-/, 'CC BY-SA ').replace(/^CC-BY-/, 'CC BY ');
const LICENSE_URL = l => {
  const m = l.match(/^CC-BY(-SA)?-(\d\.\d)$/);
  if (m) return `https://creativecommons.org/licenses/by${m[1] ? '-sa' : ''}/${m[2]}/`;
  if (l === 'CC-Zero') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (l === 'FAL') return 'https://artlibre.org/licence/lal/en/';
  return undefined;
};
const images = new Map();
for (const line of fs.readFileSync(path.join(obDir, 'image.jsonl'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const img = JSON.parse(line);
  if (!ALLOWED.test(img.license ?? '') || !img.thumbnail_url_pattern || !String(img.file_url ?? '').includes('upload.wikimedia.org')) continue;
  images.set(img.id, img);
}
const modern = new Map();
for (const line of fs.readFileSync(path.join(obDir, 'modern.jsonl'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const m = JSON.parse(line);
  modern.set(m.id, m);
}
/** Candidate images from a media object: [image, description, near?] — exact photos first */
const mediaCandidates = media => {
  if (!media) return [];
  const exact = [media.thumbnail, ...(media.alternate ?? [])].filter(c => c && c.role !== 'satellite');
  const near = (media.near ?? []).filter(Boolean);
  return [...exact.map(c => [c, false]), ...near.map(c => [c, true])];
};
const photos = {};
let photoCount = 0;
for (const line of fs.readFileSync(path.join(obDir, 'ancient.jsonl'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const rec = JSON.parse(line);
  // The place itself, then the modern site it's identified with
  const modernIds = (rec.identifications?.[0]?.resolutions ?? []).map(r => r.modern_basis_id).filter(Boolean);
  const pools = [mediaCandidates(rec.media), ...modernIds.map(id => mediaCandidates(modern.get(id)?.media))];
  // Prefer any exact photo over a "near" photo
  const all = pools.flat();
  const ordered = [...all.filter(([, near]) => !near), ...all.filter(([, near]) => near)];
  for (const [c, near] of ordered) {
    const img = images.get(c.image_id);
    if (!img) continue;
    photos[rec.id] = {
      // Wikimedia only serves standard thumbnail widths (250, 330, 500, 960, 1280, 1920)
      thumb: img.thumbnail_url_pattern.replace('####', '500'),
      large: img.width && img.width <= 1920 ? img.file_url : img.thumbnail_url_pattern.replace('####', '1920'),
      full: img.file_url,
      w: img.width,
      h: img.height,
      author: clean(img.author || img.credit || 'Unknown'),
      license: LICENSE_LABEL(img.license),
      licenseUrl: LICENSE_URL(img.license),
      source: img.credit_url || img.url,
      alt: clean((c.description ?? '').replace(/<[^>]+>/g, '')),
      near: near || undefined,
    };
    photoCount++;
    break;
  }
}
writeJson('place-photos.json', photos);

console.log(
  `events: ${eventOut.length}, people: ${peopleIndex.length}, chapter books: ${Object.keys(chapters).length}, place photos: ${photoCount} (of ${images.size} openly licensed images)`
);
