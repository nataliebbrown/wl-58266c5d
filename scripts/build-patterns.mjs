#!/usr/bin/env node
/**
 * Build Pattern Explorer data served from public/data/patterns/.
 *
 * Sources:
 *  - OpenBible.info cross-references (CC BY 4.0) — https://www.openbible.info/labs/cross-references/
 *      cross_references.txt: from verse, to verse (or range), reader votes
 *  - Free Use Bible API "Scripture Passages Quoting Scripture" commentary (bible.helloao.org)
 *      — where the New Testament quotes or alludes to the Old
 *  - Theographic Bible Metadata (CC BY-SA 4.0) — people per verse (who appears with whom)
 *      and family links (the promised line)
 *
 * Usage: node scripts/build-patterns.mjs <cross_references.txt> <theographicDir>
 *
 * Output:
 *   arcs.json                  { books: [...], chapters: [[book, ch]...], links: [[fromIdx, toIdx, weight]] }
 *   connections/<Book>.json    chapter -> [[fromVerse, toRef, votes]] (strongest ~24 per chapter)
 *   quotes.json                [{ nt, ot: [refs] }]
 *   people-web.json            id -> [[otherId, sharedVerses]]
 *   line.json                  [{ id, name }] Adam -> Jesus
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [crPath, theoDir] = process.argv.slice(2);
if (!theoDir) {
  console.error('Usage: node scripts/build-patterns.mjs <cross_references.txt> <theographicDir>');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public/data/patterns');
fs.rmSync(out, { recursive: true, force: true });
const writeJson = (rel, data) => {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

// OSIS (OpenBible/Theographic) -> STEPBible codes used by the app's data files
const OSIS_TO_STEP = {
  Gen: 'Gen', Exod: 'Exo', Lev: 'Lev', Num: 'Num', Deut: 'Deu', Josh: 'Jos', Judg: 'Jdg', Ruth: 'Rut', '1Sam': '1Sa', '2Sam': '2Sa',
  '1Kgs': '1Ki', '2Kgs': '2Ki', '1Chr': '1Ch', '2Chr': '2Ch', Ezra: 'Ezr', Neh: 'Neh', Esth: 'Est', Job: 'Job', Ps: 'Psa', Prov: 'Pro',
  Eccl: 'Ecc', Song: 'Sng', Isa: 'Isa', Jer: 'Jer', Lam: 'Lam', Ezek: 'Ezk', Dan: 'Dan', Hos: 'Hos', Joel: 'Jol', Amos: 'Amo', Obad: 'Oba',
  Jonah: 'Jon', Mic: 'Mic', Nah: 'Nam', Hab: 'Hab', Zeph: 'Zep', Hag: 'Hag', Zech: 'Zec', Mal: 'Mal', Matt: 'Mat', Mark: 'Mrk',
  Luke: 'Luk', John: 'Jhn', Acts: 'Act', Rom: 'Rom', '1Cor': '1Co', '2Cor': '2Co', Gal: 'Gal', Eph: 'Eph', Phil: 'Php', Col: 'Col',
  '1Thess': '1Th', '2Thess': '2Th', '1Tim': '1Ti', '2Tim': '2Ti', Titus: 'Tit', Phlm: 'Phm', Heb: 'Heb', Jas: 'Jas', '1Pet': '1Pe',
  '2Pet': '2Pe', '1John': '1Jn', '2John': '2Jn', '3John': '3Jn', Jude: 'Jud', Rev: 'Rev',
};
const STEP_BOOKS = Object.values(OSIS_TO_STEP);
// Chapter counts in canonical order (for the arc diagram's axis)
const CHAPTERS = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22];

const toStep = osis => {
  const [b, c, v] = osis.split('.');
  const code = OSIS_TO_STEP[b];
  return code ? `${code}.${c}.${v}` : null;
};

// ---- Cross-references ----
const rows = [];
for (const line of fs.readFileSync(crPath, 'utf8').split('\n').slice(1)) {
  const [from, to, votesStr] = line.split('\t');
  const votes = Number(votesStr);
  if (!from || !to || !(votes > 0)) continue;
  const f = toStep(from);
  const [toStart, toEnd] = to.split('-');
  const t = toStep(toStart);
  if (!f || !t) continue;
  // Ranges within one chapter become "Book.ch.v-v2"
  let toRef = t;
  if (toEnd) {
    const e = toStep(toEnd);
    if (e && e.split('.').slice(0, 2).join('.') === t.split('.').slice(0, 2).join('.')) toRef = `${t}-${e.split('.')[2]}`;
  }
  rows.push({ f, t: toRef, votes });
}
rows.sort((a, b) => b.votes - a.votes);
const strongest = rows.slice(0, 60000);

// Per-chapter connections (strongest first)
const perChapter = {};
for (const r of strongest) {
  const [b, c, v] = r.f.split('.');
  const list = ((perChapter[b] ??= {})[c] ??= []);
  if (list.length < 24) list.push([Number(v), r.t, r.votes]);
}
for (const [b, chs] of Object.entries(perChapter)) writeJson(`connections/${b}.json`, chs);

// Arc diagram: chapter-to-chapter links (undirected), summed votes, strongest 6,000
const chapterIndex = new Map();
const chapters = [];
STEP_BOOKS.forEach((b, i) => {
  for (let c = 1; c <= CHAPTERS[i]; c++) {
    chapterIndex.set(`${b}.${c}`, chapters.length);
    chapters.push([i, c]);
  }
});
const pair = new Map();
for (const r of strongest) {
  const a = chapterIndex.get(r.f.split('.').slice(0, 2).join('.'));
  const b = chapterIndex.get(r.t.split('.').slice(0, 2).join('.'));
  if (a === undefined || b === undefined || a === b) continue;
  const key = a < b ? `${a}|${b}` : `${b}|${a}`;
  pair.set(key, (pair.get(key) ?? 0) + r.votes);
}
const links = [...pair.entries()]
  .map(([k, w]) => [...k.split('|').map(Number), w])
  .sort((x, y) => y[2] - x[2])
  .slice(0, 6000);
writeJson('arcs.json', { books: STEP_BOOKS, chapters, links });

// ---- Old Testament quotations in the New Testament ----
const ABBR_TO_STEP = {
  Gen: 'Gen', Exod: 'Exo', Lev: 'Lev', Num: 'Num', Deut: 'Deu', Josh: 'Jos', Judg: 'Jdg', Ruth: 'Rut', '1Sam': '1Sa', '2Sam': '2Sa',
  '1Kgs': '1Ki', '2Kgs': '2Ki', '1Chr': '1Ch', '2Chr': '2Ch', Ezra: 'Ezr', Neh: 'Neh', Esth: 'Est', Job: 'Job', Ps: 'Psa', Prov: 'Pro',
  Eccl: 'Ecc', Song: 'Sng', Isa: 'Isa', Jer: 'Jer', Lam: 'Lam', Ezek: 'Ezk', Dan: 'Dan', Hos: 'Hos', Joel: 'Jol', Amos: 'Amo', Obad: 'Oba',
  Jonah: 'Jon', Mic: 'Mic', Nah: 'Nam', Hab: 'Hab', Zeph: 'Zep', Hag: 'Hag', Zech: 'Zec', Mal: 'Mal',
};
const NT = [
  ['MAT', 'Mat', 28], ['MRK', 'Mrk', 16], ['LUK', 'Luk', 24], ['JHN', 'Jhn', 21], ['ACT', 'Act', 28], ['ROM', 'Rom', 16], ['1CO', '1Co', 16],
  ['2CO', '2Co', 13], ['GAL', 'Gal', 6], ['EPH', 'Eph', 6], ['PHP', 'Php', 4], ['COL', 'Col', 4], ['1TH', '1Th', 5], ['2TH', '2Th', 3],
  ['1TI', '1Ti', 6], ['2TI', '2Ti', 4], ['TIT', 'Tit', 3], ['PHM', 'Phm', 1], ['HEB', 'Heb', 13], ['JAS', 'Jas', 5], ['1PE', '1Pe', 5],
  ['2PE', '2Pe', 3], ['1JN', '1Jn', 5], ['2JN', '2Jn', 1], ['3JN', '3Jn', 1], ['JUD', 'Jud', 1], ['REV', 'Rev', 22],
];
/** "2Sam 5:2; Mic 5:2, 4" -> ["2Sa.5.2", "Mic.5.2", "Mic.5.4"] (OT refs only) */
function parseRefs(text) {
  const refs = [];
  for (const part of text.replace(/Refs:/g, ';').split(';')) {
    const m = part.trim().match(/^([1-3]?[A-Za-z]+)\s+(\d+):([\d,\s-]+)/);
    if (!m) continue;
    const code = ABBR_TO_STEP[m[1]];
    if (!code) continue; // NT-to-NT references are skipped
    for (const v of m[3].split(',')) {
      const [a, b] = v.trim().split('-');
      if (!a) continue;
      refs.push(b ? `${code}.${m[2]}.${a}-${b}` : `${code}.${m[2]}.${a}`);
    }
  }
  return [...new Set(refs)];
}
const quotes = [];
for (const [api, step, count] of NT) {
  for (let c = 1; c <= count; c++) {
    let data = null;
    for (let attempt = 0; attempt < 4 && !data; attempt++) {
      const res = await fetch(`https://bible.helloao.org/api/c/quotingpassages/${api}/${c}.json`);
      if (res.status === 404) break;
      if (res.ok) data = await res.json();
      else await sleep(3000 * (attempt + 1));
    }
    for (const item of data?.chapter?.content ?? []) {
      if (item.type !== 'verse') continue;
      const text = (item.content ?? []).filter(x => typeof x === 'string').join(' ');
      const ot = parseRefs(text);
      if (ot.length) quotes.push({ nt: `${step}.${c}.${item.number}`, ot });
    }
    await sleep(80);
  }
}
writeJson('quotes.json', quotes);

// ---- Theographic: who appears with whom, and the promised line ----
const verses = JSON.parse(fs.readFileSync(path.join(theoDir, 'verses.json'), 'utf8'));
const people = JSON.parse(fs.readFileSync(path.join(theoDir, 'people.json'), 'utf8'));
const slug = new Map(people.map(p => [p.id, p.fields.slug || p.id]));
const arr = x => (Array.isArray(x) ? x : x == null || x === '' ? [] : String(x).split(/\s*,\s*/));
const HIDE = /^(god|holy_spirit)_/;

const together = new Map(); // id -> Map(other -> count)
for (const v of verses) {
  const ids = [...new Set(arr(v.fields.people).map(id => slug.get(id)).filter(id => id && !HIDE.test(id)))];
  if (ids.length < 2 || ids.length > 12) continue; // long lists (genealogies) would swamp the web
  for (const a of ids) {
    const m = together.get(a) ?? new Map();
    for (const b of ids) if (a !== b) m.set(b, (m.get(b) ?? 0) + 1);
    together.set(a, m);
  }
}
const web = {};
for (const [id, m] of together) {
  const top = [...m.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, 12);
  if (top.length) web[id] = top;
}
writeJson('people-web.json', web);

// Follow children from Adam through the names of the line (Luke 3 / Matthew 1)
const LINE = [
  'Adam', 'Seth', 'Enos', 'Cainan', 'Mahalaleel', 'Jared', 'Enoch', 'Methuselah', 'Lamech', 'Noah', 'Shem', 'Arphaxad', 'Salah',
  'Eber', 'Peleg', 'Reu', 'Serug', 'Nahor', 'Terah', 'Abraham', 'Isaac', 'Jacob', 'Judah', 'Perez', 'Hezron', 'Ram', 'Amminadab',
  'Nahshon', 'Salmon', 'Boaz', 'Obed', 'Jesse', 'David', 'Solomon', 'Rehoboam', 'Abijah', 'Asa', 'Jehoshaphat', 'Jehoram', 'Uzziah',
  'Jotham', 'Ahaz', 'Hezekiah', 'Manasseh', 'Amon', 'Josiah', 'Jeconiah', 'Shealtiel', 'Zerubbabel', 'Abiud', 'Eliakim', 'Azor',
  'Zadok', 'Achim', 'Eliud', 'Eleazar', 'Matthan', 'Jacob', 'Joseph', 'Jesus',
];
const byId = new Map(people.map(p => [p.id, p]));
const norm = s => String(s ?? '').toLowerCase().replace(/[^a-z]/g, '');
const nameMatches = (p, name) => {
  const f = p.fields;
  const names = [f.name, f.displayTitle, ...(String(f.alsoCalled ?? '').split(/[,;]\s*/))].map(norm);
  const alts = { mahalaleel: ['mahalalel'], ram: ['aram'], nahshon: ['naasson'], jehoram: ['joram'], uzziah: ['azariah', 'ozias'], jeconiah: ['jehoiachin', 'jechonias'], abijah: ['abijam'], salah: ['shelah'], enos: ['enosh'], cainan: ['kenan'], zadok: ['sadoc'], achim: ['achim'], eliud: ['eliud'] }[norm(name)] ?? [];
  return [norm(name), ...alts].some(n => names.some(x => x === n || x.startsWith(n)));
};
const genealogyIds = new Set(
  verses.filter(v => /^(Matt\.1\.|Luke\.3\.(2[3-9]|3\d))/.test(v.fields.osisRef)).flatMap(v => arr(v.fields.people))
);
const genealogyPeople = [...genealogyIds].map(id => byId.get(id)).filter(Boolean);
const start = people.find(p => p.fields.name === 'Adam' && arr(p.fields.children).length);
const line = [];
let current = start;
for (let i = 0; i < LINE.length && current; i++) {
  line.push({ id: slug.get(current.id), name: LINE[i] });
  if (i === LINE.length - 1) break;
  const kids = arr(current.fields.children).map(id => byId.get(id)).filter(Boolean);
  let next = kids.find(k => nameMatches(k, LINE[i + 1]));
  // Matthew skips generations in the kings' list; search grandchildren and great-grandchildren too
  if (!next) {
    const queue = kids.flatMap(k => arr(k.fields.children).map(id => byId.get(id)).filter(Boolean));
    for (let depth = 0; depth < 3 && !next; depth++) {
      next = queue.find(k => nameMatches(k, LINE[i + 1]));
      if (!next) queue.splice(0, queue.length, ...queue.flatMap(k => arr(k.fields.children).map(id => byId.get(id)).filter(Boolean)));
    }
  }
  // Matthew 1:12 calls Zerubbabel Shealtiel's son; 1 Chronicles 3:19 lists him under Pedaiah,
  // Shealtiel's brother — so also look among nephews
  if (!next) {
    const nephews = arr(current.fields.siblings)
      .map(id => byId.get(id))
      .filter(Boolean)
      .flatMap(sib => arr(sib.fields.children).map(id => byId.get(id)).filter(Boolean));
    next = nephews.find(k => nameMatches(k, LINE[i + 1]));
    if (next) line[line.length - 1].note = 'nephew';
  }
  // The later names appear only in the genealogies themselves, often without family links:
  // fall back to the person of that name listed in Matthew 1 or Luke 3
  if (!next) next = genealogyPeople.find(k => nameMatches(k, LINE[i + 1]) && !line.some(l => l.id === slug.get(k.id)));
  if (!next) {
    console.warn(`Line broken after ${LINE[i]} (looking for ${LINE[i + 1]})`);
    break;
  }
  current = next;
}
writeJson('line.json', line);

console.log(`cross-refs kept: ${strongest.length} of ${rows.length}; arc links: ${links.length}; quotes: ${quotes.length}; web people: ${Object.keys(web).length}; line: ${line.length} of ${LINE.length}`);
