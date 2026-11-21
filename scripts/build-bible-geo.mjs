#!/usr/bin/env node
/**
 * Build the Bible map data served from public/data/bible-geo/.
 *
 * Sources (download them first; see "Usage"):
 *  - OpenBible.info Bible Geocoding Data — CC BY 4.0
 *      https://github.com/openbibleinfo/Bible-Geocoding-Data  (data/ancient.jsonl)
 *  - Theographic Bible Metadata — CC BY-SA 4.0 (place descriptions from
 *    Easton's Bible Dictionary, 1897, public domain)
 *      https://github.com/robertrouse/theographic-bible-metadata  (json/places.json)
 *  - Natural Earth — public domain (basemap; pre-clipped with mapshaper)
 *      https://github.com/nvkelso/natural-earth-vector
 *        ne_10m_land, ne_10m_lakes, ne_10m_rivers_lake_centerlines
 *      clipped to bbox -12,8,66,50, e.g.:
 *        mapshaper ne_10m_land.geojson -clip bbox=-12,8,66,50 -simplify 35% keep-shapes \
 *          -o precision=0.005 land.json format=geojson
 *        (lakes: -simplify 40% keep-shapes; rivers: -filter 'scalerank <= 7' -simplify 20%)
 *
 * Usage:
 *   node scripts/build-bible-geo.mjs <ancient.jsonl> <theographic places.json> <land.json> <lakes.json> <rivers.json> \
 *     [<land-detail.json> <lakes-detail.json> <rivers-detail.json>]   (detail: -simplify 90%/80%, precision=0.001)
 *
 * Output:
 *   public/data/bible-geo/basemap.json        { land, lakes, rivers } GeoJSON
 *   public/data/bible-geo/places/<Osis>.json  per-book places + chapter index
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [ancientPath, theoPlacesPath, landPath, lakesPath, riversPath, landDetail, lakesDetail, riversDetail] = process.argv.slice(2);
if (!riversPath) {
  console.error('Usage: node scripts/build-bible-geo.mjs <ancient.jsonl> <places.json> <land.json> <lakes.json> <rivers.json>');
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public/data/bible-geo');
const placesDir = path.join(outDir, 'places');
fs.mkdirSync(placesDir, { recursive: true });

// ---- Easton descriptions from Theographic, keyed by OpenBible ancient id ----

function cleanDictText(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [Num. 33:13](/num#...) -> Num. 33:13
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = cut.lastIndexOf('. ');
  return (lastStop > max * 0.5 ? cut.slice(0, lastStop + 1) : cut.trimEnd() + '…');
}

const descriptions = new Map();
/** Disambiguated display names, e.g. "Antioch (Pisidia)" */
const displayNames = new Map();
for (const rec of JSON.parse(fs.readFileSync(theoPlacesPath, 'utf8'))) {
  const f = rec.fields ?? {};
  const m = typeof f.openBibleUri === 'string' && f.openBibleUri.match(/\/ancient\/(a[0-9a-f]+)/);
  if (!m) continue;
  if (typeof f.displayTitle === 'string' && /\(.+\)$/.test(f.displayTitle)) displayNames.set(m[1], f.displayTitle);
  if (!Array.isArray(f.dictText) || !f.dictText.length) continue;
  const text = truncate(cleanDictText(f.dictText.join(' ')), 700);
  // Skip entries that are only a cross-reference, e.g. "(Gen. 10:4)."
  const prose = text.replace(/\([^)]*\)/g, '').replace(/[^A-Za-z]/g, '');
  if (prose.length >= 40) descriptions.set(m[1], text);
}

// ---- Places from OpenBible ----

const OSIS_BOOKS = [
  'Gen', 'Exod', 'Lev', 'Num', 'Deut', 'Josh', 'Judg', 'Ruth', '1Sam', '2Sam', '1Kgs', '2Kgs',
  '1Chr', '2Chr', 'Ezra', 'Neh', 'Esth', 'Job', 'Ps', 'Prov', 'Eccl', 'Song', 'Isa', 'Jer', 'Lam',
  'Ezek', 'Dan', 'Hos', 'Joel', 'Amos', 'Obad', 'Jonah', 'Mic', 'Nah', 'Hab', 'Zeph', 'Hag', 'Zech',
  'Mal', 'Matt', 'Mark', 'Luke', 'John', 'Acts', 'Rom', '1Cor', '2Cor', 'Gal', 'Eph', 'Phil', 'Col',
  '1Thess', '2Thess', '1Tim', '2Tim', 'Titus', 'Phlm', 'Heb', 'Jas', '1Pet', '2Pet', '1John',
  '2John', '3John', 'Jude', 'Rev',
];

/** books[osis] = { places: {id: place}, chapters: {ch: Map(id -> Set(verse))} } */
const books = Object.fromEntries(OSIS_BOOKS.map(b => [b, { places: {}, chapters: {} }]));
let placeCount = 0;
let skipped = 0;

for (const line of fs.readFileSync(ancientPath, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const rec = JSON.parse(line);
  if (!Array.isArray(rec.verses) || !rec.verses.length) { skipped++; continue; }

  // Identifications are sorted best-first; take the best one that has a point
  let best = null;
  for (const ident of rec.identifications ?? []) {
    const res = (ident.resolutions ?? []).find(r => typeof r.lonlat === 'string');
    if (res) { best = { ident, res }; break; }
  }
  if (!best) { skipped++; continue; }

  const [lon, lat] = best.res.lonlat.split(',').map(Number);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) { skipped++; continue; }

  const place = {
    // "Ai 2" -> "Ai" (OpenBible disambiguates same-named places with a number)
    n: (() => {
      const base = rec.friendly_id.replace(/\s+\d+$/, '');
      const display = displayNames.get(rec.id);
      // Only adopt Theographic's name when it just adds a region, so the
      // name still matches the Bible text
      return display && display.startsWith(`${base} (`) ? display : base;
    })(),
    t: (rec.types ?? [])[0] ?? 'place',
    c: [Math.round(lon * 1e4) / 1e4, Math.round(lat * 1e4) / 1e4],
    q: best.ident.score?.time_total ?? 0, // 0–1000 scholarly confidence in the location
    w: best.res.land_or_water === 'water' ? 1 : undefined,
    d: descriptions.get(rec.id),
    u: `https://www.openbible.info/geo/ancient/${rec.id}/${rec.url_slug ?? ''}`.replace(/\/$/, ''),
  };
  placeCount++;

  for (const v of rec.verses) {
    const [osis, ch, vs] = v.osis.split('.');
    const book = books[osis];
    if (!book) continue;
    book.places[rec.id] = place;
    const chapter = (book.chapters[ch] ??= new Map());
    if (!chapter.has(rec.id)) chapter.set(rec.id, new Set());
    chapter.get(rec.id).add(Number(vs));
  }
}

let fileCount = 0;
for (const [osis, book] of Object.entries(books)) {
  const chapters = {};
  for (const [ch, idMap] of Object.entries(book.chapters)) {
    // Order places by first mention within the chapter
    chapters[ch] = [...idMap.entries()]
      .map(([id, verses]) => [id, [...verses].sort((a, b) => a - b)])
      .sort((a, b) => a[1][0] - b[1][0]);
  }
  fs.writeFileSync(path.join(placesDir, `${osis}.json`), JSON.stringify({ places: book.places, chapters }));
  fileCount++;
}

// ---- Basemap ----

/**
 * mapshaper writes RFC 7946 winding (exterior rings counter-clockwise), but
 * d3-geo uses spherical winding where exterior rings are clockwise — otherwise
 * a polygon is read as "the whole globe except this shape". Reverse every ring.
 */
function rewindForD3(geometry) {
  if (!geometry) return geometry;
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.map(ring => [...ring].reverse()) };
  }
  if (geometry.type === 'MultiPolygon') {
    return { ...geometry, coordinates: geometry.coordinates.map(poly => poly.map(ring => [...ring].reverse())) };
  }
  return geometry;
}

function stripProps(fc, keep = []) {
  return {
    type: 'FeatureCollection',
    features: fc.features.map(f => ({
      type: 'Feature',
      properties: Object.fromEntries(keep.filter(k => f.properties?.[k] != null).map(k => [k, f.properties[k]])),
      geometry: rewindForD3(f.geometry),
    })),
  };
}

const basemap = {
  land: stripProps(JSON.parse(fs.readFileSync(landPath, 'utf8'))),
  lakes: stripProps(JSON.parse(fs.readFileSync(lakesPath, 'utf8')), ['name']),
  rivers: stripProps(JSON.parse(fs.readFileSync(riversPath, 'utf8')), ['name']),
};
fs.writeFileSync(path.join(outDir, 'basemap.json'), JSON.stringify(basemap));

// Optional high-detail layers, loaded by the app only when zoomed in
if (riversDetail) {
  const detail = {
    land: stripProps(JSON.parse(fs.readFileSync(landDetail, 'utf8'))),
    lakes: stripProps(JSON.parse(fs.readFileSync(lakesDetail, 'utf8')), ['name']),
    rivers: stripProps(JSON.parse(fs.readFileSync(riversDetail, 'utf8')), ['name']),
  };
  fs.writeFileSync(path.join(outDir, 'basemap-detail.json'), JSON.stringify(detail));
}

console.log(`Places: ${placeCount} (skipped ${skipped}); descriptions: ${descriptions.size}; book files: ${fileCount}`);
