#!/usr/bin/env node
/**
 * Build the original-language data served from public/data/original/.
 *
 * Sources (download into one folder first):
 *  STEPBible Data (Tyndale House, Cambridge) — CC BY 4.0
 *  https://github.com/STEPBible/STEPBible-Data
 *    - TAHOT *.txt  Translators Amalgamated Hebrew OT (4 files)
 *    - TAGNT *.txt  Translators Amalgamated Greek NT (2 files)
 *    - TBESH / TBESG  Translators Brief lexicons (Hebrew / Greek)
 *    - TFLSJ *.txt  Formatted full LSJ Greek lexicon (2 files)
 *    - TEHMC / TEGMC  Morphology code expansions
 *  Open Scriptures Hebrew Lexicon — https://github.com/openscriptures/HebrewLexicon
 *    - HebrewStrong.xml  Strong's Hebrew Dictionary (1890, public domain; corrected by OSHB)
 *    - BrownDriverBriggs.xml + LexicalIndex.xml  BDB outline (work in progress)
 *
 * Expected file names in <srcDir> (prefix match): TAHOT_*, TAGNT_*, TBESH*, TBESG*, TFLSJ*,
 * TEHMC*, TEGMC*, HebrewStrong.xml, BDB.xml, LexicalIndex.xml
 *
 * Usage: node scripts/build-original-language.mjs <srcDir>
 *
 * Output (public/data/original/):
 *   text/<Book>/<chapter>.json   { "<verse>": [[original, translit, gloss, strong, morph], …] }  (English versification)
 *   lexicon/brief/<H|G><chunk>.json   dStrong -> { w, t, g, d }
 *   lexicon/full/<H|G><chunk>.json    Greek: LSJ; Hebrew: Strong's + BDB outline
 *   occurrences/<H|G><chunk>.json     dStrong -> { n, r: ["Gen.1.1", …] (first 400) }
 *   morph.json                        grammar code -> plain-English description
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('Usage: node scripts/build-original-language.mjs <srcDir>');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public/data/original');
fs.rmSync(out, { recursive: true, force: true });

const files = fs.readdirSync(srcDir);
const pick = prefix => files.filter(f => f.startsWith(prefix)).map(f => path.join(srcDir, f)).sort();
const read = f => fs.readFileSync(f, 'utf8');
const writeJson = (rel, data) => {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
};

// STEPBible book codes, in canonical order (matches the app's book list order)
const STEP_BOOKS = [
  'Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rut', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est',
  'Job', 'Psa', 'Pro', 'Ecc', 'Sng', 'Isa', 'Jer', 'Lam', 'Ezk', 'Dan', 'Hos', 'Jol', 'Amo', 'Oba', 'Jon', 'Mic', 'Nam',
  'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Php', 'Col',
  '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev',
];

const chunkOf = strong => {
  const m = strong.match(/^([HG])(\d+)/);
  return m ? `${m[1]}${Math.floor(Number(m[2]) / 200)}` : null;
};
const baseStrong = s => {
  const m = s.match(/^([HG])0*(\d+)/);
  return m ? `${m[1]}${m[2].padStart(4, '0')}` : s;
};

// ---- Morphology ----

function expandMorph(desc) {
  // "Function=Verb ; Stem=Qal (hence Action=Simple; Voice=Active); Form=Perfect (hence …); Person=Third; …"
  const parts = [];
  for (const raw of desc.split(/;(?![^(]*\))/)) {
    const m = raw.trim().match(/^[A-Za-z ]+=\s*(.+)$/);
    if (!m) continue;
    let value = m[1].trim();
    value = value.replace(/\(hence ([^)]*)\)/, (_, inner) =>
      `(${inner.split(';').map(s => s.split('=')[1]?.trim().toLowerCase()).filter(Boolean).join(', ')})`
    );
    if (/^Either gender$/i.test(value) || /^Unknown|^none$/i.test(value)) continue;
    parts.push(value);
  }
  return parts.join(' · ');
}

const morph = {};
for (const f of [...pick('TEHMC'), ...pick('TEGMC')]) {
  for (const line of read(f).split('\n')) {
    const m = line.match(/^([A-Z][A-Za-z0-9-]+)\t(Function=.+?)\s*(\t|$)/);
    if (m && !morph[m[1]]) morph[m[1]] = expandMorph(m[2]);
  }
}

// ---- Tagged texts ----

/** text[book][chapter][verse] = words */
const text = {};
/** occurrences[dStrong] = refs */
const occ = new Map();
const addWord = (book, chapter, verse, word) => {
  const b = (text[book] ??= {});
  const c = (b[chapter] ??= {});
  (c[verse] ??= []).push(word);
  const strong = word[3];
  if (strong && !/^H9\d{3}/.test(strong)) {
    // skip particles/punctuation (H9xxx) from the occurrence index
    const ref = `${book}.${chapter}.${verse}`;
    let list = occ.get(strong);
    if (!list) occ.set(strong, (list = []));
    if (list[list.length - 1] !== ref) list.push(ref);
  }
};

let hebrewWords = 0;
for (const f of pick('TAHOT')) {
  for (const line of read(f).split('\n')) {
    // Gen.1.1#01=L  or  Mal.4.1(3.19)#01=L — English ref first
    const m = line.match(/^([1-3]?[A-Za-z]{2,3})\.(\d+)\.(\d+)(?:\([\d.]+\))?#\d+=([^\t]+)\t/);
    if (!m) continue;
    const [, book, ch, vs, type] = m;
    if (!/^[LQR]/.test(type)) continue; // skip Ketiv-only and extra lines
    const cols = line.split('\t');
    const [, hebrew, translit, gloss, dStrongs, grammar] = cols;
    const segs = (dStrongs ?? '').split('/');
    let mainIdx = segs.findIndex(s => s.includes('{'));
    if (mainIdx < 0) mainIdx = segs.length - 1;
    // The main word's number is in braces; anything after a backslash is punctuation (e.g. \\H9016 sof pasuq)
    const braced = (dStrongs ?? '').match(/\{([^}]+)\}/);
    const strong = (braced ? braced[1] : (segs[mainIdx] ?? '').split('\\')[0]).replace(/[{}]/g, '').trim();
    const gram = (grammar ?? '').split('/');
    const lang = gram[0]?.[0] ?? 'H';
    let code = gram[mainIdx] ?? '';
    if (mainIdx > 0) code = lang + code;
    addWord(book, ch, vs, [
      hebrew.replace(/[\/\\]/g, '').trim(),
      translit.replace(/[\/\\]/g, '').replace(/\./g, '·').toLowerCase().trim(),
      gloss.replace(/\s*\/\s*/g, ' ').replace(/[<>]/g, '').trim(),
      strong,
      code.trim(),
    ]);
    hebrewWords++;
  }
}

let greekWords = 0;
for (const f of pick('TAGNT')) {
  for (const line of read(f).split('\n')) {
    const m = line.match(/^([1-3]?[A-Za-z]{2,3})\.(\d+)\.(\d+)#\d+=([^\t]+)\t/);
    if (!m) continue;
    const [, book, ch, vs, type] = m;
    if (!/N/.test(type)) continue; // words in the Nestle-Aland text
    const cols = line.split('\t');
    const gm = (cols[1] ?? '').match(/^(.*?)\s*\((.*)\)\s*$/);
    const [strongPart, codePart] = (cols[3] ?? '').split('=');
    addWord(book, ch, vs, [
      (gm ? gm[1] : cols[1]).trim(),
      (gm ? gm[2] : '').trim(),
      (cols[2] ?? '').replace(/[<>[\]]/g, '').trim(),
      (strongPart ?? '').trim(),
      (codePart ?? '').trim(),
    ]);
    greekWords++;
  }
}

let chapterFiles = 0;
for (const [book, chapters] of Object.entries(text)) {
  if (!STEP_BOOKS.includes(book)) console.warn('Unknown book code', book);
  for (const [ch, verses] of Object.entries(chapters)) {
    writeJson(`text/${book}/${ch}.json`, verses);
    chapterFiles++;
  }
}

// ---- Lexicons ----

/** Strip HTML to readable text, keeping line breaks. */
function toText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<ref='([^']+)'>(.*?)<\/ref>/gi, '$2')
    .replace(/<a [^>]*title="[^"]*"[^>]*>(.*?)<\/a>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/__/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function chunked(entries) {
  const byChunk = {};
  for (const [key, value] of Object.entries(entries)) {
    const c = chunkOf(key);
    if (!c) continue;
    (byChunk[c] ??= {})[key] = value;
  }
  return byChunk;
}

/** TBESH/TBESG/TFLSJ line: eStrong \t dStrong = \t uStrong \t word \t translit \t morph \t gloss \t meaning */
function parseLexicon(fileList, maxLen) {
  const entries = {};
  for (const f of fileList) {
    for (const line of read(f).split('\n')) {
      if (!/^[HG]\d{4}/.test(line)) continue;
      const c = line.split('\t');
      const dStrong = (c[1] ?? '').replace(/\s*=.*$/, '').trim() || c[0].trim();
      const key = /^[HG]\d{4}[A-Za-z]?$/.test(dStrong) ? dStrong : c[0].trim();
      if (entries[key]) continue;
      let d = toText(c[7] ?? '');
      if (maxLen && d.length > maxLen) d = d.slice(0, maxLen).replace(/\s+\S*$/, '') + ' …';
      entries[key] = { w: (c[3] ?? '').trim(), t: (c[4] ?? '').trim(), g: (c[6] ?? '').trim(), d };
    }
  }
  return entries;
}

const brief = parseLexicon([...pick('TBESH'), ...pick('TBESG')], 6000);
for (const [c, data] of Object.entries(chunked(brief))) writeJson(`lexicon/brief/${c}.json`, data);

// Full: Greek LSJ
const lsj = parseLexicon(pick('TFLSJ'), 20000);

// Full: Hebrew Strong's + BDB outline
const hebFull = {};
{
  const strongXml = read(path.join(srcDir, 'HebrewStrong.xml'));
  for (const m of strongXml.matchAll(/<entry id="H(\d+)">([\s\S]*?)<\/entry>/g)) {
    const body = m[2];
    const w = body.match(/<w [^>]*>([^<]+)<\/w>/);
    const pron = body.match(/pron="([^"]+)"/);
    const source = body.match(/<source>([\s\S]*?)<\/source>/);
    const meaning = body.match(/<meaning>([\s\S]*?)<\/meaning>/);
    const usage = body.match(/<usage>([\s\S]*?)<\/usage>/);
    const key = `H${m[1].padStart(4, '0')}`;
    hebFull[key] = {
      w: w ? w[1] : '',
      t: pron ? pron[1] : '',
      strongs: [source && `Origin: ${toText(source[1])}`, meaning && `Meaning: ${toText(meaning[1])}`, usage && `KJV renders: ${toText(usage[1])}`]
        .filter(Boolean)
        .join('\n'),
    };
  }
  // BDB entries by id, then attach via the lexical index (strong -> bdb ids)
  const bdbXml = read(path.join(srcDir, 'BDB.xml'));
  const bdbById = new Map();
  for (const m of bdbXml.matchAll(/<entry id="([^"]+)"[^>]*>([\s\S]*?)<\/entry>/g)) {
    const t = toText(m[2].replace(/<status[^>]*>[\s\S]*?<\/status>/g, ''));
    if (t.length > 20) bdbById.set(m[1], t);
  }
  const indexXml = read(path.join(srcDir, 'LexicalIndex.xml'));
  for (const m of indexXml.matchAll(/<xref ([^>]*)\/>/g)) {
    const attrs = m[1];
    const strong = attrs.match(/strong="(\d+)"/);
    const bdb = attrs.match(/bdb="([^"]+)"/);
    if (!strong || !bdb || !bdbById.has(bdb[1])) continue;
    const key = `H${strong[1].padStart(4, '0')}`;
    const entry = (hebFull[key] ??= { w: '', t: '', strongs: '' });
    entry.bdb ??= [];
    const txt = bdbById.get(bdb[1]);
    if (!entry.bdb.includes(txt) && entry.bdb.length < 4) entry.bdb.push(txt.length > 6000 ? txt.slice(0, 6000) + ' …' : txt);
  }
}

const full = { ...lsj };
for (const [k, v] of Object.entries(hebFull)) full[k] = v;
for (const [c, data] of Object.entries(chunked(full))) writeJson(`lexicon/full/${c}.json`, data);

// ---- Occurrences ----
const occEntries = {};
// Source files aren't in canonical order (e.g. "Act-Rev" sorts before "Mat-Jhn"), so sort refs
const refKey = ref => {
  const [b, c, v] = ref.split('.');
  return STEP_BOOKS.indexOf(b) * 1e6 + Number(c) * 1e3 + Number(v);
};
for (const [strong, refs] of occ) {
  const sorted = [...new Set(refs)].sort((a, b) => refKey(a) - refKey(b));
  occEntries[strong] = { n: sorted.length, r: sorted.slice(0, 400) };
}
for (const [c, data] of Object.entries(chunked(occEntries))) writeJson(`occurrences/${c}.json`, data);

writeJson('morph.json', morph);
writeJson('books.json', STEP_BOOKS);

console.log(
  `Hebrew words: ${hebrewWords}, Greek words: ${greekWords}, chapter files: ${chapterFiles}, ` +
    `morph codes: ${Object.keys(morph).length}, brief entries: ${Object.keys(brief).length}, ` +
    `full entries: ${Object.keys(full).length}, strongs with occurrences: ${occ.size}`
);
void baseStrong;
