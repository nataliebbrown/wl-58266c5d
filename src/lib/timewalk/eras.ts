// ============ TimeWalk: eras, dating, and caveats ============
//
// Two dating systems are shown side by side:
//  - Scholarly: approximate dates as most evangelical scholars hold them today
//  - Traditional: Archbishop James Ussher's chronology (1650), which Theographic's data follows
// Wherever scholars disagree, a caveat explains the views. Caveats are shown to users
// (they make the dates more honest) and are listed in docs/timewalk-review.md.

export type DateSystem = 'scholarly' | 'traditional';

export interface Caveat {
  id: string;
  title: string;
  text: string;
}

export interface Era {
  id: string;
  name: string;
  /** Scholarly date label, e.g. "c. 1010–970 BC" */
  scholarly: string;
  /** Traditional (Ussher) date label */
  traditional: string;
  /** Sort position on the timeline (approximate scholarly midpoint year; negative = BC) */
  sort: number;
  /** Approximate scholarly range in years (negative = BC), for world context */
  range?: [number, number];
  summary: string;
  /** One line on what God was doing in this era */
  godAtWork: string;
  /** The world power(s) of the day */
  empire: string;
  caveats: string[];
  /** Books (and chapter ranges) in this era */
  books: { book: string; from?: number; to?: number }[];
}

export const CAVEATS: Record<string, Caveat> = {
  'genesis-dates': {
    id: 'genesis-dates',
    title: 'Dating Genesis 1–11',
    text:
      'WL does not put scholarly dates on Genesis 1–11. Christians hold different views on the age of the earth and on how to read these chapters — as straightforward chronology, as true history told with gaps in the genealogies, or as a theological account with a literary structure. The traditional dates (Creation in 4004/4003 BC, the Flood in 2348 BC) come from Archbishop James Ussher, who added up the genealogies in 1650. Many Christians today do not hold to those dates, and many do.',
  },
  'patriarch-dates': {
    id: 'patriarch-dates',
    title: 'When did Abraham live?',
    text:
      'Dates for Abraham, Isaac, Jacob, and Joseph are approximate. They depend on the date of the Exodus and on how the 430 years of Exodus 12:40 are counted (the Greek Old Testament and Galatians 3:17 count them from Abraham, not from Jacob’s move to Egypt). Most scholars place the patriarchs somewhere around 2100–1800 BC.',
  },
  'exodus-date': {
    id: 'exodus-date',
    title: 'Early or late Exodus?',
    text:
      'Evangelical scholars hold two main dates. The early date, about 1446 BC, comes from 1 Kings 6:1, which says Solomon began the temple 480 years after the Exodus (around 966 BC). The late date, about 1260 BC, comes from Exodus 1:11 (the store city of Rameses) and from how some read the archaeology of Canaan. Some take the 480 years as a symbolic number (twelve generations of forty). Both views are held by people who trust the Bible.',
  },
  'judges-overlap': {
    id: 'judges-overlap',
    title: 'The judges probably overlapped',
    text:
      'If you add up every judge’s years in sequence, the total is longer than the time available. Most scholars think several judges led different regions at the same time, so the period is shorter than the sum — roughly 1380–1050 BC on the early Exodus date, or 1200–1050 BC on the late date.',
  },
  'kings-chronology': {
    id: 'kings-chronology',
    title: 'Dates of the kings',
    text:
      'Kings and Chronicles give reign lengths for every king, but working them into exact years is complicated by co-regencies (a son ruling alongside his father) and different ways of counting a king’s first year. Scholars differ by a few years (Edwin Thiele’s chronology is widely used). Ussher’s traditional dates for this period run about 40 years earlier than most scholars’ today.',
  },
  'jerusalem-fall': {
    id: 'jerusalem-fall',
    title: '587 or 586 BC?',
    text:
      'Jerusalem fell to Babylon in either 587 or 586 BC. The difference comes from how the years of the Judean and Babylonian kings are counted. Both dates appear in reputable sources.',
  },
  'job-date': {
    id: 'job-date',
    title: 'When did Job live?',
    text:
      'Job’s story feels like the time of the patriarchs — wealth counted in flocks, a father offering sacrifices for his family, very long life — so it is often placed there. But the book does not say when Job lived, and its date of writing is unknown.',
  },
  'psalms-span': {
    id: 'psalms-span',
    title: 'The Psalms span centuries',
    text:
      'The Psalms were written over about a thousand years, from Moses (Psalm 90) to after the exile (Psalm 137). They are grouped with David here because he wrote about half of them.',
  },
  'daniel-date': {
    id: 'daniel-date',
    title: 'When was Daniel written?',
    text:
      'Daniel is set in Babylon and Persia in the 6th century BC, and conservative scholars date the book there. Many critical scholars date its writing to the 2nd century BC, around the Maccabean revolt, partly because its prophecies describe that period so precisely. WL follows the book’s own setting.',
  },
  ahasuerus: {
    id: 'ahasuerus',
    title: 'Who was Ahasuerus?',
    text:
      'Most scholars identify King Ahasuerus in Esther with Xerxes I of Persia (486–465 BC), which places Esther around 483–473 BC. Ussher’s traditional chronology identified him with a different king, so its dates for Esther are earlier.',
  },
  'ezra-date': {
    id: 'ezra-date',
    title: 'When did Ezra arrive?',
    text:
      'Ezra 7 says Ezra came to Jerusalem in “the seventh year of King Artaxerxes.” Most scholars take this as Artaxerxes I, giving 458 BC (before Nehemiah in 445 BC). Some argue for Artaxerxes II, which would be 398 BC.',
  },
  'jesus-birth': {
    id: 'jesus-birth',
    title: 'Why “BC” for Jesus’ birth?',
    text:
      'Herod the Great died in about 4 BC, and Jesus was born while Herod was alive (Matthew 2), so Jesus was likely born around 6–4 BC. The calendar that counts years from Jesus’ birth was worked out in AD 525, and its starting point was off by a few years.',
  },
  crucifixion: {
    id: 'crucifixion',
    title: 'AD 30 or AD 33?',
    text:
      'Most scholars date the crucifixion to Passover in either AD 30 or AD 33. Both fit the years Pontius Pilate governed Judea (AD 26–36) and the calendar of that Passover. The difference depends partly on whether Jesus’ ministry lasted about two or three years.',
  },
  'epistle-dates': {
    id: 'epistle-dates',
    title: 'Dates of the letters',
    text:
      'The New Testament letters can usually be dated only approximately, from details in the letters and in Acts. Scholars differ by a few years for most of them.',
  },
  'revelation-date': {
    id: 'revelation-date',
    title: 'When was Revelation written?',
    text:
      'Most scholars date Revelation to about AD 95, during the reign of the emperor Domitian, as early church writers said. Some argue for the late AD 60s, under Nero, before the temple was destroyed in AD 70.',
  },
};

export const ERAS: Era[] = [
  {
    id: 'beginning',
    name: 'The Beginning',
    scholarly: 'Not dated',
    traditional: '4004–1921 BC',
    sort: -3000,
    summary: 'Creation, the fall, the flood, and the tower of Babel — the world’s story before Abraham.',
    godAtWork: 'God creates all things good, and when humanity falls, He promises a Rescuer (Genesis 3:15).',
    empire: 'The first cities of Mesopotamia and Egypt',
    caveats: ['genesis-dates'],
    books: [{ book: 'Genesis', from: 1, to: 11 }],
  },
  {
    id: 'patriarchs',
    name: 'The Patriarchs',
    scholarly: 'c. 2100–1800 BC',
    traditional: '1921–1635 BC',
    sort: -1950,
    range: [-2100, -1800],
    summary: 'Abraham, Isaac, Jacob, and Joseph — one family through whom God will bless the world.',
    godAtWork: 'God chooses Abraham and promises to bless all nations through his family.',
    empire: 'Middle Kingdom Egypt; city-states of Mesopotamia and Canaan',
    caveats: ['patriarch-dates', 'job-date'],
    books: [{ book: 'Genesis', from: 12, to: 50 }, { book: 'Job' }],
  },
  {
    id: 'exodus',
    name: 'Exodus and Wilderness',
    scholarly: 'c. 1446 BC (early date) or c. 1260 BC (late date)',
    traditional: '1491–1451 BC',
    sort: -1350,
    range: [-1550, -1220],
    summary: 'Slavery in Egypt, the ten plagues, the exodus, the law at Sinai, and forty years in the wilderness.',
    godAtWork: 'God redeems His people from slavery and makes them His own at Sinai.',
    empire: 'New Kingdom Egypt',
    caveats: ['exodus-date'],
    books: [{ book: 'Exodus' }, { book: 'Leviticus' }, { book: 'Numbers' }, { book: 'Deuteronomy' }],
  },
  {
    id: 'conquest',
    name: 'Conquest and Judges',
    scholarly: 'c. 1400–1050 BC (early) or c. 1220–1050 BC (late)',
    traditional: '1451–1095 BC',
    sort: -1225,
    range: [-1406, -1050],
    summary: 'Israel enters Canaan under Joshua, then cycles of rebellion and rescue under the judges.',
    godAtWork: 'God keeps His promise of land — and rescues His people again and again when they cry out to Him.',
    empire: 'Egypt in decline; Philistines and Canaanite city-states',
    caveats: ['exodus-date', 'judges-overlap'],
    books: [{ book: 'Joshua' }, { book: 'Judges' }, { book: 'Ruth' }],
  },
  {
    id: 'united',
    name: 'The United Kingdom',
    scholarly: 'c. 1050–930 BC',
    traditional: '1095–975 BC',
    sort: -990,
    range: [-1050, -930],
    summary: 'Saul (c. 1050–1010 BC), David (c. 1010–970 BC), and Solomon (c. 970–930 BC) rule all twelve tribes; the temple is built.',
    godAtWork: 'God gives Israel a king after His own heart and promises David an everlasting throne.',
    empire: 'A window between empires — Egypt and Assyria both weak',
    caveats: ['kings-chronology', 'psalms-span'],
    books: [
      { book: '1 Samuel' },
      { book: '2 Samuel' },
      { book: '1 Kings', from: 1, to: 11 },
      { book: '1 Chronicles' },
      { book: '2 Chronicles', from: 1, to: 9 },
      { book: 'Psalms' },
      { book: 'Proverbs' },
      { book: 'Ecclesiastes' },
      { book: 'Song of Solomon' },
    ],
  },
  {
    id: 'divided',
    name: 'The Divided Kingdom',
    scholarly: 'c. 930–722 BC',
    traditional: '975–721 BC',
    sort: -826,
    range: [-930, -722],
    summary: 'The kingdom splits into Israel (north) and Judah (south). Prophets like Elijah, Elisha, Amos, Hosea, and Isaiah call the people back. Assyria destroys Samaria in 722 BC.',
    godAtWork: 'God sends prophet after prophet, patiently calling a divided people to return to Him.',
    empire: 'The rise of Assyria',
    caveats: ['kings-chronology'],
    books: [
      { book: '1 Kings', from: 12, to: 22 },
      { book: '2 Kings', from: 1, to: 17 },
      { book: '2 Chronicles', from: 10, to: 28 },
      { book: 'Joel' },
      { book: 'Jonah' },
      { book: 'Amos' },
      { book: 'Hosea' },
      { book: 'Isaiah', from: 1, to: 39 },
      { book: 'Micah' },
    ],
  },
  {
    id: 'judah',
    name: 'Judah Alone',
    scholarly: '722–586 BC',
    traditional: '721–588 BC',
    sort: -654,
    range: [-722, -586],
    summary: 'Judah survives Assyria under Hezekiah and is renewed under Josiah, but finally falls to Babylon. Jeremiah weeps and warns.',
    godAtWork: 'God warns, waits, and promises a coming King and a new covenant even as judgment nears.',
    empire: 'Assyria, then Babylon',
    caveats: ['kings-chronology', 'jerusalem-fall'],
    books: [
      { book: '2 Kings', from: 18, to: 25 },
      { book: '2 Chronicles', from: 29, to: 36 },
      { book: 'Isaiah', from: 40, to: 66 },
      { book: 'Nahum' },
      { book: 'Zephaniah' },
      { book: 'Habakkuk' },
      { book: 'Jeremiah' },
    ],
  },
  {
    id: 'exile',
    name: 'Exile in Babylon',
    scholarly: '586–538 BC',
    traditional: '588–536 BC',
    sort: -562,
    range: [-586, -538],
    summary: 'Jerusalem and the temple are destroyed. In Babylon, Daniel and Ezekiel serve God far from home.',
    godAtWork: 'God disciplines His people, yet stays with them in Babylon and promises to bring them home.',
    empire: 'Babylon, then Persia (539 BC)',
    caveats: ['jerusalem-fall', 'daniel-date'],
    books: [{ book: 'Lamentations' }, { book: 'Ezekiel' }, { book: 'Daniel' }, { book: 'Obadiah' }],
  },
  {
    id: 'return',
    name: 'Return and Restoration',
    scholarly: '538–c. 430 BC',
    traditional: '536–397 BC',
    sort: -484,
    range: [-538, -430],
    summary: 'Cyrus lets the exiles go home. The temple is rebuilt (516 BC), Esther saves her people, Ezra teaches the law, and Nehemiah rebuilds the walls.',
    godAtWork: 'God brings His people home and rebuilds His house, keeping every word He promised.',
    empire: 'Persia',
    caveats: ['ahasuerus', 'ezra-date'],
    books: [{ book: 'Ezra' }, { book: 'Nehemiah' }, { book: 'Esther' }, { book: 'Haggai' }, { book: 'Zechariah' }, { book: 'Malachi' }],
  },
  {
    id: 'between',
    name: 'Between the Testaments',
    scholarly: 'c. 430–5 BC',
    traditional: '397–5 BC',
    sort: -218,
    range: [-430, -5],
    summary:
      'No books of the Protestant Bible were written in these four centuries, but much happened: Alexander the Great, Greek culture spreading everywhere, the Old Testament translated into Greek, the Maccabean revolt, and finally Roman rule under Herod.',
    godAtWork: 'Through four quiet centuries, God prepares the world for His Son — a common language, Roman roads, and a people waiting.',
    empire: 'Persia, then Greece (Ptolemies and Seleucids), then Rome (63 BC)',
    caveats: [],
    books: [],
  },
  {
    id: 'jesus',
    name: 'The Life of Jesus',
    scholarly: 'c. 6/4 BC – AD 30/33',
    traditional: '5 BC – AD 30',
    sort: 15,
    range: [-6, 33],
    summary: 'Jesus is born in Bethlehem, grows up in Nazareth, teaches and heals in Galilee and Judea, dies on a cross, and rises again.',
    godAtWork: 'God Himself comes in Jesus — to live, die, and rise again for us.',
    empire: 'Rome (Augustus, then Tiberius); Herod and his sons',
    caveats: ['jesus-birth', 'crucifixion'],
    books: [{ book: 'Matthew' }, { book: 'Mark' }, { book: 'Luke' }, { book: 'John' }],
  },
  {
    id: 'church',
    name: 'The Early Church',
    scholarly: 'AD 30/33 – c. 68',
    traditional: 'AD 30 – c. 68',
    sort: 49,
    range: [30, 68],
    summary: 'The Spirit comes at Pentecost, the church spreads from Jerusalem to Rome, and Paul and others write letters to the young churches.',
    godAtWork: 'God pours out His Spirit, and the good news spreads from Jerusalem to the nations.',
    empire: 'Rome (Tiberius, Caligula, Claudius, Nero)',
    caveats: ['crucifixion', 'epistle-dates'],
    books: [
      'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
      '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
      '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude',
    ].map(book => ({ book })),
  },
  {
    id: 'revelation',
    name: 'Revelation and the Hope Ahead',
    scholarly: 'c. AD 95 (some say late 60s)',
    traditional: 'c. AD 96',
    sort: 95,
    range: [64, 100],
    summary: 'John, exiled on Patmos, sees the risen Christ and the end of the story: a new heaven and a new earth.',
    godAtWork: 'God reveals the end of the story: Jesus reigns, and He will make all things new.',
    empire: 'Rome (Domitian, or Nero on the earlier date)',
    caveats: ['revelation-date'],
    books: [{ book: 'Revelation' }],
  },
];

/** The era a chapter belongs to. */
export function eraForChapter(book: string, chapter: number): Era | undefined {
  return ERAS.find(e => e.books.some(b => b.book === book && (b.from === undefined || (chapter >= b.from && chapter <= (b.to ?? Infinity)))));
}

export function getEra(id: string): Era | undefined {
  return ERAS.find(e => e.id === id);
}

// ---- Scholarly dates for key events (matched to Theographic event titles) ----

export const EVENT_SCHOLARLY_DATES: Record<string, { label: string; caveat?: string }> = {
  'Abraham enters Canaan': { label: 'c. 2100–1900 BC', caveat: 'patriarch-dates' },
  'Joseph sold to Egypt': { label: 'c. 1900–1700 BC', caveat: 'patriarch-dates' },
  'Exodus from Egypt': { label: 'c. 1446 BC or c. 1260 BC', caveat: 'exodus-date' },
  'Ten Commandments Given': { label: 'c. 1446 BC or c. 1260 BC', caveat: 'exodus-date' },
  'Tabernacle Built': { label: 'c. 1445 BC or c. 1259 BC', caveat: 'exodus-date' },
  'Crossing the Jordan into Canaan': { label: 'c. 1406 BC or c. 1220 BC', caveat: 'exodus-date' },
  'Reign of Saul': { label: 'c. 1050–1010 BC', caveat: 'kings-chronology' },
  'Reign of David': { label: 'c. 1010–970 BC', caveat: 'kings-chronology' },
  'Reign of Solomon': { label: 'c. 970–930 BC', caveat: 'kings-chronology' },
  "Construction of Solomon's Temple": { label: 'begun c. 966 BC', caveat: 'kings-chronology' },
  'Death of Solomon': { label: 'c. 930 BC — the kingdom divides', caveat: 'kings-chronology' },
  'Reign of Ahab': { label: 'c. 874–853 BC', caveat: 'kings-chronology' },
  'Prophecies of Elijah': { label: 'c. 860–850 BC', caveat: 'kings-chronology' },
  'Reign of Jeroboam II': { label: 'c. 793–753 BC', caveat: 'kings-chronology' },
  'Prophecies of Jonah': { label: 'c. 785–760 BC' },
  'Prophecies of Amos': { label: 'c. 760 BC' },
  'Prophecies of Hosea': { label: 'c. 755–715 BC' },
  'Prophecies of Isaiah': { label: 'c. 740–700 BC' },
  'Prophecies of Micah': { label: 'c. 735–700 BC' },
  'Reign of Hezekiah': { label: 'c. 715–686 BC', caveat: 'kings-chronology' },
  'Reign of Josiah': { label: 'c. 640–609 BC', caveat: 'kings-chronology' },
  'Prophecies of Jeremiah': { label: 'c. 627–580 BC' },
  'First deportation to Babylon': { label: '605 BC' },
  'Second deportation to Babylon': { label: '597 BC' },
  'Fall of Jerusalem': { label: '586 BC (or 587)', caveat: 'jerusalem-fall' },
  'Prophecies of Ezekiel': { label: 'c. 593–571 BC' },
  'Fall of Babylon': { label: '539 BC' },
  'Cyrus decrees the rebuilding of the Temple': { label: '538 BC' },
  'Exiles return with Zerubbabel': { label: 'c. 538–537 BC' },
  'Prophecies of Haggai': { label: '520 BC' },
  'Prophecies of Zechariah': { label: 'c. 520–518 BC' },
  'Second Temple dedicated': { label: '516/515 BC' },
  'Esther is made queen': { label: 'c. 479 BC', caveat: 'ahasuerus' },
  'Ezra leads exiles to Jerusalem': { label: '458 BC (or 398)', caveat: 'ezra-date' },
  'Nehemiah arrives at Jerusalem': { label: '445/444 BC' },
  'Prophecies of Malachi': { label: 'c. 430 BC' },
  'Birth of Jesus': { label: 'c. 6–4 BC', caveat: 'jesus-birth' },
  'Herod slays male children': { label: 'c. 5–4 BC', caveat: 'jesus-birth' },
  'John the Baptist Begins Ministry': { label: 'c. AD 28–29 (Luke 3:1)' },
  'Crucifixion and Burial': { label: 'AD 30 or 33', caveat: 'crucifixion' },
  'Resurrection and Ascension': { label: 'AD 30 or 33', caveat: 'crucifixion' },
  'The Holy Spirit comes': { label: 'AD 30 or 33', caveat: 'crucifixion' },
  'Saul is converted': { label: 'c. AD 33–36' },
  'Herod dies': { label: 'AD 44 (Herod Agrippa I)' },
  'First missionary journey begins': { label: 'c. AD 46–48' },
};

// ---- World context ----

export interface WorldPower {
  name: string;
  /** Approximate scholarly years (negative = BC) */
  from: number;
  to: number;
}

export const WORLD_POWERS: WorldPower[] = [
  { name: 'Middle Kingdom Egypt', from: -2055, to: -1650 },
  { name: 'New Kingdom Egypt', from: -1550, to: -1070 },
  { name: 'Hittite Empire', from: -1650, to: -1180 },
  { name: 'Assyria', from: -911, to: -609 },
  { name: 'Babylon', from: -626, to: -539 },
  { name: 'Persia', from: -550, to: -330 },
  { name: 'Greece (Alexander and successors)', from: -336, to: -63 },
  { name: 'Rome', from: -63, to: 100 },
];

export interface WorldEvent {
  year: number;
  label: string;
}

export const WORLD_EVENTS: WorldEvent[] = [
  { year: -2560, label: 'Great Pyramid of Giza built (c. 2560 BC)' },
  { year: -1754, label: 'Code of Hammurabi in Babylon (c. 1754 BC)' },
  { year: -1330, label: 'Tutankhamun rules Egypt (c. 1332–1323 BC)' },
  { year: -776, label: 'First recorded Olympic Games (776 BC)' },
  { year: -753, label: 'Traditional founding of Rome (753 BC)' },
  { year: -722, label: 'Assyria destroys Samaria (722 BC)' },
  { year: -551, label: 'Confucius born in China (551 BC)' },
  { year: -490, label: 'Greeks defeat Persia at Marathon (490 BC)' },
  { year: -399, label: 'Death of Socrates in Athens (399 BC)' },
  { year: -331, label: 'Alexander the Great conquers Persia (331 BC)' },
  { year: -250, label: 'Old Testament translated into Greek — the Septuagint (c. 250 BC)' },
  { year: -167, label: 'Maccabean revolt against Antiochus IV (167–164 BC)' },
  { year: -63, label: 'Pompey takes Jerusalem for Rome (63 BC)' },
  { year: -44, label: 'Julius Caesar assassinated (44 BC)' },
  { year: -27, label: 'Augustus becomes Rome’s first emperor (27 BC)' },
  { year: -19, label: 'Herod begins rebuilding the temple (c. 20/19 BC)' },
  { year: 26, label: 'Pontius Pilate governs Judea (AD 26–36)' },
  { year: 49, label: 'Claudius expels Jews from Rome (c. AD 49; Acts 18:2)' },
  { year: 64, label: 'Great Fire of Rome; Nero persecutes Christians (AD 64)' },
  { year: 70, label: 'Romans destroy Jerusalem and the temple (AD 70)' },
  { year: 79, label: 'Mount Vesuvius buries Pompeii (AD 79)' },
];

/**
 * "1015 BC" / "AD 30" from a Theographic (Ussher) year. Theographic uses astronomical
 * numbering, where year 0 = 1 BC and -1014 = 1015 BC.
 */
export function formatYear(y: number | null | undefined): string {
  if (y === null || y === undefined) return '';
  return y <= 0 ? `${1 - y} BC` : `AD ${y}`;
}

const DATES_KEY = 'wl-timewalk-dates';

export function getDateSystem(): DateSystem {
  try {
    return localStorage.getItem(DATES_KEY) === 'traditional' ? 'traditional' : 'scholarly';
  } catch {
    return 'scholarly';
  }
}

export function saveDateSystem(system: DateSystem) {
  try {
    localStorage.setItem(DATES_KEY, system);
  } catch {
    /* ignore */
  }
}
