#!/usr/bin/env node
/**
 * Resolve TimeWalk's hand-picked images (scripts/data/timewalk-art-picks.json) into
 * public/data/timewalk/art.json, verifying each license as it goes.
 *
 *  - Classic art and Matson photos come from Wikimedia Commons. Only public domain,
 *    CC0, CC BY and CC BY-SA files are accepted (license read from Commons metadata).
 *    The G. Eric and Edith Matson Photograph Collection (Library of Congress) has
 *    "no known restrictions on publication".
 *  - Museum objects are the museums' own CC0 open-access images (The Met, Cleveland Museum
 *    of Art), which the museums mirror on Wikimedia Commons. (The Met's own image server
 *    blocks direct linking, so the Commons copies are used.)
 *
 * Images are not copied: the app loads them from upload.wikimedia.org and always shows the
 * artist, license and a source link.
 *
 * Usage: node scripts/fetch-timewalk-art.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const picks = JSON.parse(fs.readFileSync(path.join(root, 'scripts/data/timewalk-art-picks.json'), 'utf8'));
const dest = path.join(root, 'public/data/timewalk/art.json');

const COMMONS = 'https://commons.wikimedia.org/w/api.php';
const HEADERS = { 'User-Agent': 'WL-Bible-app-build/1.0 (educational; image attribution lookup)' };
const OK_LICENSE = /^(public domain|pd\b|pd-|cc0|cc zero|cc[- ]by(-sa)?[- ]\d(\.\d)?)/i;
const strip = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJson(url, attempt = 0) {
  const res = await fetch(url, { headers: HEADERS });
  const text = await res.text();
  try {
    if (!res.ok) throw new Error(String(res.status));
    return JSON.parse(text);
  } catch (err) {
    if (attempt >= 5) throw new Error(`${url}: ${err.message}`);
    await sleep(15000 * (attempt + 1)); // rate limited — back off and retry
    return getJson(url, attempt + 1);
  }
}

/** Wikimedia only serves standard thumbnail widths (250, 330, 500, 960, 1280, 1920) */
function thumbUrl(original, width) {
  const m = original.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/(.\/..)\/(.+)$/);
  if (!m) return original;
  const ext = /\.tiff?$/i.test(m[3]) ? '.jpg' : '';
  return `${m[1]}/thumb/${m[2]}/${m[3]}/${width}px-${m[3]}${ext}`;
}

const out = {};
const failures = [];

// ---- Commons (batched) ----
const commonsPicks = picks;
for (let i = 0; i < commonsPicks.length; i += 20) {
  const batch = commonsPicks.slice(i, i + 20);
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: batch.map(p => `File:${p.commons}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|size|mime',
  });
  const data = await getJson(`${COMMONS}?${params}`);
  const norm = new Map((data.query?.normalized ?? []).map(n => [n.from, n.to]));
  const pages = new Map(Object.values(data.query?.pages ?? {}).map(p => [p.title, p]));
  for (const pick of batch) {
    const title = norm.get(`File:${pick.commons}`) ?? `File:${pick.commons}`;
    const page = pages.get(title);
    const ii = page?.imageinfo?.[0];
    if (!ii) {
      failures.push(`${pick.id}: not found on Commons (${pick.commons})`);
      continue;
    }
    const meta = ii.extmetadata ?? {};
    const url = ii.url.split('?')[0]; // Commons appends tracking parameters
    const license = strip(meta.LicenseShortName?.value);
    if (!OK_LICENSE.test(license) || /\b(nc|nd)\b/i.test(license)) {
      failures.push(`${pick.id}: license not allowed (${license})`);
      continue;
    }
    if (!/image\/(jpeg|png)/.test(ii.mime)) {
      failures.push(`${pick.id}: unsupported type ${ii.mime}`);
      continue;
    }
    out[pick.id] = {
      ...describe(pick),
      title: title.replace(/^File:/, ''),
      thumb: ii.width > 500 ? thumbUrl(url, 500) : url,
      large: ii.width > 1920 ? thumbUrl(url, 1920) : url,
      full: url,
      w: ii.width,
      h: ii.height,
      author: pick.museum ? `${pick.artist} · ${pick.museum}` : pick.artist ?? matson(strip(meta.Artist?.value) || 'Unknown'),
      license,
      licenseUrl: strip(meta.LicenseUrl?.value) || undefined,
      source: ii.descriptionurl.split('?')[0],
      alt: pick.caption,
    };
  }
  await sleep(2000);
}

function matson(author) {
  return author === 'Matson Collection' ? 'Matson Photo Service, c. 1898–1946 (Library of Congress)' : author;
}

function describe(p) {
  return {
    kind: p.kind,
    era: p.era,
    life: p.life,
    caption: p.caption,
    artist: p.artist,
    date: p.date,
    ref: p.ref ? { book: p.ref[0], chapter: p.ref[1], verse: p.ref[2] } : undefined,
  };
}

// Keep the picks' order
const ordered = Object.fromEntries(picks.filter(p => out[p.id]).map(p => [p.id, out[p.id]]));
fs.writeFileSync(dest, JSON.stringify(ordered, null, 1));
for (const f of failures) console.warn(`  ✗ ${f}`);
console.log(`Saved ${Object.keys(ordered).length} of ${picks.length} images to ${path.relative(root, dest)}`);
