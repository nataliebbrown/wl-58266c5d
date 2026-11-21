#!/usr/bin/env node
/**
 * Find openly licensed photos for TimeWalk's archaeology entries on Wikimedia Commons
 * and record their attribution in public/data/timewalk/find-images.json.
 *
 * Only images whose Commons license metadata is public domain, CC0, CC BY, or CC BY-SA
 * are accepted (no NC/ND, no "fair use", no unknown licenses). Images are not copied:
 * the app loads them from upload.wikimedia.org and always shows author + license + link.
 *
 * Usage: node scripts/fetch-timewalk-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'src/lib/timewalk/archaeology.ts'), 'utf8');
const finds = [...src.matchAll(/id: '([^']+)',\s*name: '((?:[^'\\]|\\.)*)'[\s\S]*?commonsSearch: '((?:[^'\\]|\\.)*)'/g)].map(m => ({
  id: m[1],
  name: m[2],
  search: m[3],
}));

const API = 'https://commons.wikimedia.org/w/api.php';
const HEADERS = { 'User-Agent': 'WL-Bible-app-build/1.0 (educational; image attribution lookup)' };
const OK_LICENSE = /^(public domain|pd\b|pd-|cc0|cc zero|cc[- ]by(-sa)?[- ]\d(\.\d)?)/i;
const strip = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function search(query, attempt = 0) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '10',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime|size',
    iiurlwidth: '1920', // Wikimedia only serves standard widths (250, 330, 500, 960, 1280, 1920)
  });
  const res = await fetch(`${API}?${params}`, { headers: HEADERS });
  if (res.status === 429 && attempt < 5) {
    await sleep(15000 * (attempt + 1)); // rate limited — back off and retry
    return search(query, attempt + 1);
  }
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  const data = await res.json();
  return Object.values(data.query?.pages ?? {}).sort((a, b) => a.index - b.index);
}

// Resume: keep images already found in a previous run
const dest = path.join(root, 'public/data/timewalk/find-images.json');
const out = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, 'utf8')) : {};
const wanted = new Set(finds.filter(f => f.search).map(f => f.id));
for (const id of Object.keys(out)) if (!wanted.has(id)) delete out[id];
for (const f of finds) {
  if (!f.search || out[f.id]) continue;
  try {
    const pages = await search(f.search);
    const pick = pages.find(p => {
      const ii = p.imageinfo?.[0];
      const meta = ii?.extmetadata ?? {};
      const license = strip(meta.LicenseShortName?.value);
      return ii && /image\/(jpeg|png)/.test(ii.mime) && ii.width >= 600 && OK_LICENSE.test(license) && !/nc|nd/i.test(license.replace(/^public domain/i, ''));
    });
    if (!pick) {
      console.warn(`No openly licensed image for ${f.id}`);
      continue;
    }
    const ii = pick.imageinfo[0];
    const meta = ii.extmetadata ?? {};
    const thumb = ii.width > 500 ? ii.thumburl.replace(/\/\d+px-/, '/500px-') : ii.url;
    out[f.id] = {
      title: pick.title.replace(/^File:/, ''),
      thumb,
      large: ii.thumburl,
      full: ii.url,
      w: ii.width,
      h: ii.height,
      author: strip(meta.Artist?.value) || 'Unknown',
      license: strip(meta.LicenseShortName?.value),
      licenseUrl: strip(meta.LicenseUrl?.value) || undefined,
      source: ii.descriptionurl,
      alt: strip(meta.ImageDescription?.value).slice(0, 200) || f.name,
    };
    console.log(`${f.id}: ${out[f.id].title} (${out[f.id].license})`);
  } catch (err) {
    console.warn(`Failed for ${f.id}:`, err.message);
  }
  await sleep(2500); // be polite to the API
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 1));
console.log(`Saved ${Object.keys(out).length} of ${finds.length} images`);
