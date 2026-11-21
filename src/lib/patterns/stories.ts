// ============ Pattern Explorer: repeated patterns, covenants, names of God, places ============
//
// DRAFT content, hidden until reviewed (set `reviewed: true`). Review list: docs/patterns-review.md.

import type { BibleReference } from '@/lib/bibleApi';

type Ref = { label: string; ref: BibleReference };
const r = (label: string, book: string, chapter: number, verse: number): Ref => ({ label, ref: { book, chapter, verse } });

// ---- Repeated patterns ----

export interface RepeatedPattern {
  id: string;
  title: string;
  summary: string;
  aboutGod: string;
  instances: (Ref & { who: string })[];
  caveat?: string;
  reviewed: boolean;
}

const i = (who: string, label: string, book: string, chapter: number, verse: number) => ({ who, ...r(label, book, chapter, verse) });

export const REPEATED_PATTERNS: RepeatedPattern[] = [
  {
    id: 'barren',
    title: 'Barren women who give birth',
    summary: 'Again and again, God brings a key child from a woman who could not have children.',
    aboutGod: 'God brings life where there is none. His plan advances by His power, not human strength — preparing us for a virgin birth and an empty tomb.',
    instances: [
      i('Sarah', 'Genesis 21:1–2', 'Genesis', 21, 1),
      i('Rebekah', 'Genesis 25:21', 'Genesis', 25, 21),
      i('Rachel', 'Genesis 30:22', 'Genesis', 30, 22),
      i('Samson’s mother', 'Judges 13:3', 'Judges', 13, 3),
      i('Hannah', '1 Samuel 1:20', '1 Samuel', 1, 20),
      i('Elizabeth', 'Luke 1:13', 'Luke', 1, 13),
    ],
    reviewed: false,
  },
  {
    id: 'younger',
    title: 'The younger over the older',
    summary: 'In a world where the firstborn ranked first, God repeatedly chooses the younger.',
    aboutGod: 'God’s choice rests on grace, not status. He delights to lift up the overlooked.',
    instances: [
      i('Abel over Cain', 'Genesis 4:4', 'Genesis', 4, 4),
      i('Isaac over Ishmael', 'Genesis 17:19', 'Genesis', 17, 19),
      i('Jacob over Esau', 'Genesis 25:23', 'Genesis', 25, 23),
      i('Joseph over his brothers', 'Genesis 37:5–8', 'Genesis', 37, 5),
      i('Ephraim over Manasseh', 'Genesis 48:19', 'Genesis', 48, 19),
      i('David over his brothers', '1 Samuel 16:11–12', '1 Samuel', 16, 11),
    ],
    reviewed: false,
  },
  {
    id: 'forty',
    title: 'Forty days and forty years',
    summary: 'Forty often marks a time of testing, waiting, or preparation.',
    aboutGod: 'God is patient and purposeful in seasons of waiting. He shapes His people through them — and Jesus succeeded where Israel failed.',
    instances: [
      i('The flood rains', 'Genesis 7:12', 'Genesis', 7, 12),
      i('Moses on the mountain', 'Exodus 24:18', 'Exodus', 24, 18),
      i('Israel in the wilderness', 'Numbers 14:34', 'Numbers', 14, 34),
      i('Elijah’s journey to Horeb', '1 Kings 19:8', '1 Kings', 19, 8),
      i('Nineveh’s warning', 'Jonah 3:4', 'Jonah', 3, 4),
      i('Jesus in the wilderness', 'Matthew 4:2', 'Matthew', 4, 2),
      i('Jesus appears after rising', 'Acts 1:3', 'Acts', 1, 3),
    ],
    caveat: 'Biblical writers use numbers for meaning as well as counting, but WL avoids reading hidden codes into numbers. Forty is significant because Scripture keeps returning to it in times of testing — not because of any special power in the number.',
    reviewed: false,
  },
  {
    id: 'third-day',
    title: 'On the third day',
    summary: 'The third day is often a day of decisive deliverance or meeting with God.',
    aboutGod: 'God acts at the right time. The pattern reaches its climax when Jesus rises on the third day.',
    instances: [
      i('Abraham sees the mountain', 'Genesis 22:4', 'Genesis', 22, 4),
      i('God descends on Sinai', 'Exodus 19:11', 'Exodus', 19, 11),
      i('Esther goes to the king', 'Esther 5:1', 'Esther', 5, 1),
      i('Hosea’s hope', 'Hosea 6:2', 'Hosea', 6, 2),
      i('Jonah’s three days', 'Jonah 1:17', 'Jonah', 1, 17),
      i('Jesus rises', '1 Corinthians 15:4', '1 Corinthians', 15, 4),
    ],
    reviewed: false,
  },
  {
    id: 'wells',
    title: 'Meetings at a well',
    summary: 'A traveler meets a woman at a well, and a marriage follows — a pattern Jesus surprises in John 4.',
    aboutGod: 'The pattern sets up John 4: at a well, Jesus meets an outsider woman and offers her living water — God seeking His bride among the unexpected.',
    instances: [
      i('Abraham’s servant meets Rebekah', 'Genesis 24:15', 'Genesis', 24, 15),
      i('Jacob meets Rachel', 'Genesis 29:10', 'Genesis', 29, 10),
      i('Moses meets Zipporah', 'Exodus 2:16–17', 'Exodus', 2, 16),
      i('Jesus meets a Samaritan woman', 'John 4:7', 'John', 4, 7),
    ],
    reviewed: false,
  },
  {
    id: 'mountains',
    title: 'Mountain encounters with God',
    summary: 'God repeatedly reveals Himself on mountains.',
    aboutGod: 'The God who is high and holy comes down to meet His people.',
    instances: [
      i('Abraham on Moriah', 'Genesis 22:14', 'Genesis', 22, 14),
      i('Moses at the burning bush', 'Exodus 3:1–2', 'Exodus', 3, 1),
      i('The law at Sinai', 'Exodus 19:20', 'Exodus', 19, 20),
      i('Elijah on Carmel', '1 Kings 18:38–39', '1 Kings', 18, 38),
      i('Elijah at Horeb', '1 Kings 19:11–12', '1 Kings', 19, 11),
      i('The Sermon on the Mount', 'Matthew 5:1', 'Matthew', 5, 1),
      i('The Transfiguration', 'Matthew 17:1–2', 'Matthew', 17, 1),
    ],
    reviewed: false,
  },
  {
    id: 'lowly-lifted',
    title: 'God lifts the lowly',
    summary: 'Songs and stories celebrate God humbling the proud and raising the humble.',
    aboutGod: 'God turns the world’s values upside down — and does it supremely in Jesus, who humbled Himself and was exalted.',
    instances: [
      i('Hannah’s song', '1 Samuel 2:7–8', '1 Samuel', 2, 7),
      i('David the shepherd', 'Psalm 78:70–71', 'Psalms', 78, 70),
      i('Nebuchadnezzar humbled', 'Daniel 4:37', 'Daniel', 4, 37),
      i('Mary’s song', 'Luke 1:52', 'Luke', 1, 52),
      i('Christ exalted', 'Philippians 2:8–9', 'Philippians', 2, 8),
    ],
    reviewed: false,
  },
  {
    id: 'water-crossings',
    title: 'Passing through the waters',
    summary: 'God brings His people through water into a new beginning.',
    aboutGod: 'God makes a way where there is no way — and baptism draws on the same pattern of dying and rising.',
    instances: [
      i('Noah through the flood', 'Genesis 8:1', 'Genesis', 8, 1),
      i('Israel through the sea', 'Exodus 14:21–22', 'Exodus', 14, 21),
      i('Israel across the Jordan', 'Joshua 3:17', 'Joshua', 3, 17),
      i('Elijah and Elisha cross the Jordan', '2 Kings 2:8', '2 Kings', 2, 8),
      i('Jesus is baptized', 'Matthew 3:16', 'Matthew', 3, 16),
      i('Baptized into Christ', 'Romans 6:4', 'Romans', 6, 4),
    ],
    reviewed: false,
  },
];

// ---- Covenants ----

export interface Covenant {
  id: string;
  name: string;
  with: string;
  ref: Ref;
  promise: string;
  sign: string;
  fulfillment: string;
  fulfillmentRefs: Ref[];
  reviewed: boolean;
}

export const COVENANTS: Covenant[] = [
  {
    id: 'noah',
    name: 'The covenant with Noah',
    with: 'Noah, his descendants, and every living creature',
    ref: r('Genesis 9:8–17', 'Genesis', 9, 8),
    promise: 'God will never again destroy the earth by flood; the seasons will continue as long as the earth remains.',
    sign: 'The rainbow',
    fulfillment: 'God’s patience preserves the world for His saving plan — and points to a final judgment and renewal in Christ.',
    fulfillmentRefs: [r('2 Peter 3:9', '2 Peter', 3, 9)],
    reviewed: false,
  },
  {
    id: 'abraham',
    name: 'The covenant with Abraham',
    with: 'Abraham and his offspring',
    ref: r('Genesis 15:18', 'Genesis', 15, 18),
    promise: 'A land, countless descendants, God as their God, and blessing for all nations through Abraham’s offspring (Genesis 12:1–3; 17).',
    sign: 'Circumcision (Genesis 17:11)',
    fulfillment: 'Christ is Abraham’s promised offspring; all who belong to Him, Jew and Gentile, are Abraham’s children and heirs.',
    fulfillmentRefs: [r('Galatians 3:16', 'Galatians', 3, 16), r('Galatians 3:29', 'Galatians', 3, 29)],
    reviewed: false,
  },
  {
    id: 'sinai',
    name: 'The covenant at Sinai',
    with: 'Israel, through Moses',
    ref: r('Exodus 19:5–6', 'Exodus', 19, 5),
    promise: 'Israel will be God’s treasured possession, a kingdom of priests and a holy nation, living by His law.',
    sign: 'The Sabbath (Exodus 31:13)',
    fulfillment: 'Christ fulfills the law, and His new covenant writes God’s law on the heart.',
    fulfillmentRefs: [r('Matthew 5:17', 'Matthew', 5, 17), r('Hebrews 8:6', 'Hebrews', 8, 6)],
    reviewed: false,
  },
  {
    id: 'david',
    name: 'The covenant with David',
    with: 'David and his house',
    ref: r('2 Samuel 7:12–16', '2 Samuel', 7, 12),
    promise: 'A son of David will build God’s house, and his throne and kingdom will last forever.',
    sign: 'No outward sign — a sworn promise (Psalm 89:3–4)',
    fulfillment: 'Jesus, the Son of David, reigns forever over a kingdom that will never end.',
    fulfillmentRefs: [r('Luke 1:32–33', 'Luke', 1, 32), r('Acts 2:30', 'Acts', 2, 30)],
    reviewed: false,
  },
  {
    id: 'new',
    name: 'The new covenant',
    with: 'God’s people, sealed in Christ’s blood',
    ref: r('Jeremiah 31:31–34', 'Jeremiah', 31, 31),
    promise: 'God will write His law on their hearts, all will know Him, and He will remember their sins no more.',
    sign: 'The Lord’s Supper (“the new covenant in My blood”), with the gift of the Spirit',
    fulfillment: 'Established by Jesus’ death; every earlier covenant promise finds its “yes” in Him.',
    fulfillmentRefs: [r('Luke 22:20', 'Luke', 22, 20), r('2 Corinthians 1:20', '2 Corinthians', 1, 20)],
    reviewed: false,
  },
];

export const COVENANT_CAVEAT =
  'Christian traditions describe the relationship between the covenants in different ways (for example, covenant theology and dispensationalism differ on how Israel and the church relate). All agree the covenants are fulfilled in Christ; this overview stays with what the texts say.';

// ---- Names of God ----

export interface DivineName {
  id: string;
  name: string;
  original: string;
  meaning: string;
  /** Strong's number of the distinctive word (for compound names like YHWH Yireh, the second word), checked against the verse in tests */
  strong: string;
  firstRef: Ref;
  context: string;
  aboutGod: string;
  reviewed: boolean;
}

export const NAMES_OF_GOD: DivineName[] = [
  { id: 'elohim', name: 'Elohim', original: 'אֱלֹהִים', meaning: 'God, the Mighty One', strong: 'H0430', firstRef: r('Genesis 1:1', 'Genesis', 1, 1), context: 'The Bible’s first name for God, in the account of creation.', aboutGod: 'God is the all-powerful Creator of everything.', reviewed: false },
  { id: 'yhwh', name: 'YHWH (the LORD)', original: 'יהוה', meaning: 'The self-existent One, “I AM”', strong: 'H3068', firstRef: r('Exodus 3:15', 'Exodus', 3, 15), context: 'Revealed to Moses at the burning bush as God’s name forever.', aboutGod: 'God is personal, eternal, unchanging, and committed to His people.', reviewed: false },
  { id: 'adonai', name: 'Adonai', original: 'אֲדֹנָי', meaning: 'Lord, Master', strong: 'H0136', firstRef: r('Genesis 15:2', 'Genesis', 15, 2), context: 'Abraham addresses God as his Lord when asking about the promised heir.', aboutGod: 'God is the rightful Master of His servants — and a good one.', reviewed: false },
  { id: 'el-elyon', name: 'El Elyon', original: 'אֵל עֶלְיוֹן', meaning: 'God Most High', strong: 'H5945', firstRef: r('Genesis 14:18', 'Genesis', 14, 18), context: 'Melchizedek, priest of God Most High, blesses Abraham.', aboutGod: 'God is above every power, ruler, and so-called god.', reviewed: false },
  { id: 'el-roi', name: 'El Roi', original: 'אֵל רֳאִי', meaning: 'The God who sees me', strong: 'H7210', firstRef: r('Genesis 16:13', 'Genesis', 16, 13), context: 'Hagar, a runaway slave woman, names God after He finds her in the desert.', aboutGod: 'God sees the overlooked and mistreated, and cares for them.', reviewed: false },
  { id: 'el-shaddai', name: 'El Shaddai', original: 'אֵל שַׁדַּי', meaning: 'God Almighty', strong: 'H7706', firstRef: r('Genesis 17:1', 'Genesis', 17, 1), context: 'God renews His covenant with Abraham, then 99 years old.', aboutGod: 'Nothing is too hard for God; He keeps His promises even when they seem impossible.', reviewed: false },
  { id: 'yhwh-yireh', name: 'YHWH Yireh', original: 'יְהוָה יִרְאֶה', meaning: 'The LORD will provide (or, will see)', strong: 'H7200', firstRef: r('Genesis 22:14', 'Genesis', 22, 14), context: 'Abraham names the mountain after God provides a ram in Isaac’s place.', aboutGod: 'God provides what we need — supremely the sacrifice of His Son.', reviewed: false },
  { id: 'yhwh-rapha', name: 'YHWH Rapha', original: 'יְהוָה רֹפְאֶךָ', meaning: 'The LORD who heals you', strong: 'H7495', firstRef: r('Exodus 15:26', 'Exodus', 15, 26), context: 'After bitter water is made sweet in the wilderness.', aboutGod: 'God is the healer of bodies, hearts, and nations.', reviewed: false },
  { id: 'yhwh-nissi', name: 'YHWH Nissi', original: 'יְהוָה נִסִּי', meaning: 'The LORD is my banner', strong: 'H5251', firstRef: r('Exodus 17:15', 'Exodus', 17, 15), context: 'Moses builds an altar after God gives victory over Amalek.', aboutGod: 'God fights for His people; victory belongs to Him.', reviewed: false },
  { id: 'yhwh-shalom', name: 'YHWH Shalom', original: 'יְהוָה שָׁלוֹם', meaning: 'The LORD is peace', strong: 'H7965', firstRef: r('Judges 6:24', 'Judges', 6, 24), context: 'Gideon builds an altar after meeting the angel of the LORD and not dying.', aboutGod: 'God gives peace to the fearful and makes His enemies His friends.', reviewed: false },
  { id: 'yhwh-tsebaoth', name: 'YHWH Tsebaoth', original: 'יְהוָה צְבָאוֹת', meaning: 'The LORD of hosts (armies)', strong: 'H6635', firstRef: r('1 Samuel 1:3', '1 Samuel', 1, 3), context: 'The name first appears in Hannah’s story, at the worship center in Shiloh.', aboutGod: 'God commands all the armies of heaven — no enemy is beyond His power.', reviewed: false },
  { id: 'yhwh-roi', name: 'YHWH Roi', original: 'יְהוָה רֹעִי', meaning: 'The LORD is my shepherd', strong: 'H7462', firstRef: r('Psalm 23:1', 'Psalms', 23, 1), context: 'David’s best-loved psalm.', aboutGod: 'God guides, provides for, and protects His people personally.', reviewed: false },
  { id: 'yhwh-tsidkenu', name: 'YHWH Tsidkenu', original: 'יְהוָה צִדְקֵנוּ', meaning: 'The LORD our righteousness', strong: 'H6664', firstRef: r('Jeremiah 23:6', 'Jeremiah', 23, 6), context: 'The name of the coming righteous Branch from David’s line.', aboutGod: 'God gives His own righteousness to His people through the promised King.', reviewed: false },
  { id: 'immanuel', name: 'Immanuel', original: 'עִמָּנוּאֵל', meaning: 'God with us', strong: 'H6005', firstRef: r('Isaiah 7:14', 'Isaiah', 7, 14), context: 'The sign promised to King Ahaz, fulfilled in Jesus (Matthew 1:23).', aboutGod: 'God does not stay far away — He comes to be with us.', reviewed: false },
  { id: 'abba', name: 'Abba, Father', original: 'ἀββά', meaning: 'Father (Aramaic, a family word)', strong: 'G0005', firstRef: r('Mark 14:36', 'Mark', 14, 36), context: 'Jesus’ prayer in Gethsemane; the Spirit lets believers pray the same way (Romans 8:15).', aboutGod: 'In Christ, the holy God becomes our Father.', reviewed: false },
];

// ---- Places through the story ----

export interface StoryPlace {
  id: string;
  name: string;
  /** OpenBible ancient place id (for the map pin and photo) */
  placeId: string;
  summary: string;
  aboutGod: string;
  moments: (Ref & { what: string })[];
  reviewed: boolean;
}

const m = (what: string, label: string, book: string, chapter: number, verse: number) => ({ what, ...r(label, book, chapter, verse) });

export const STORY_PLACES: StoryPlace[] = [
  {
    id: 'bethlehem',
    name: 'Bethlehem',
    placeId: 'a112427',
    summary: 'A small town south of Jerusalem that keeps showing up at turning points.',
    aboutGod: 'God works through the small and overlooked — and brings His King from the least of the clans.',
    moments: [
      m('Rachel is buried on the way', 'Genesis 35:19', 'Genesis', 35, 19),
      m('Ruth arrives with Naomi', 'Ruth 1:22', 'Ruth', 1, 22),
      m('Samuel anoints David', '1 Samuel 16:4', '1 Samuel', 16, 4),
      m('Micah promises a ruler from here', 'Micah 5:2', 'Micah', 5, 2),
      m('Jesus is born', 'Luke 2:4–7', 'Luke', 2, 4),
    ],
    reviewed: false,
  },
  {
    id: 'bethel',
    name: 'Bethel',
    placeId: 'a64f355',
    summary: '“House of God” — a place of meeting God that later became a center of false worship.',
    aboutGod: 'God meets people by grace — and will not share His worship with idols.',
    moments: [
      m('Abraham builds an altar', 'Genesis 12:8', 'Genesis', 12, 8),
      m('Jacob’s dream of the ladder', 'Genesis 28:19', 'Genesis', 28, 19),
      m('Jacob returns to worship', 'Genesis 35:7', 'Genesis', 35, 7),
      m('Jeroboam sets up a golden calf', '1 Kings 12:29', '1 Kings', 12, 29),
      m('Amos is told to leave', 'Amos 7:13', 'Amos', 7, 13),
    ],
    reviewed: false,
  },
  {
    id: 'moriah',
    name: 'Mount Moriah',
    placeId: 'aac1fcf',
    summary: 'The mountain of Isaac’s near-sacrifice later became the site of the temple.',
    aboutGod: 'Where God provided a substitute for Isaac, sacrifices were offered for centuries — all pointing to the Lamb He would provide.',
    moments: [
      m('Abraham offers Isaac', 'Genesis 22:2', 'Genesis', 22, 2),
      m('David buys a threshing floor', '2 Samuel 24:24–25', '2 Samuel', 24, 24),
      m('Solomon builds the temple', '2 Chronicles 3:1', '2 Chronicles', 3, 1),
    ],
    reviewed: false,
  },
  {
    id: 'jerusalem',
    name: 'Jerusalem',
    placeId: 'a15257a',
    summary: 'The city God chose for His name — loved, lost, rebuilt, wept over, and made new.',
    aboutGod: 'God’s faithfulness to a city that often rejected Him shows His relentless love — and His plan to make all things new.',
    moments: [
      m('Melchizedek, king of Salem', 'Genesis 14:18', 'Genesis', 14, 18),
      m('David captures Zion', '2 Samuel 5:7', '2 Samuel', 5, 7),
      m('The temple is dedicated', '1 Kings 8:1', '1 Kings', 8, 1),
      m('The city falls to Babylon', '2 Kings 25:9', '2 Kings', 25, 9),
      m('Nehemiah rebuilds the walls', 'Nehemiah 6:15', 'Nehemiah', 6, 15),
      m('Jesus weeps over the city', 'Luke 19:41', 'Luke', 19, 41),
      m('The Spirit comes at Pentecost', 'Acts 2:5', 'Acts', 2, 5),
      m('The new Jerusalem', 'Revelation 21:2', 'Revelation', 21, 2),
    ],
    reviewed: false,
  },
  {
    id: 'egypt',
    name: 'Egypt',
    placeId: 'af301ca',
    summary: 'A place of refuge, then slavery, then rescue — again and again.',
    aboutGod: 'God protects His people even in foreign lands, and is mighty to bring them out.',
    moments: [
      m('Abraham goes down in a famine', 'Genesis 12:10', 'Genesis', 12, 10),
      m('Joseph rises to power', 'Genesis 41:41', 'Genesis', 41, 41),
      m('Israel is enslaved', 'Exodus 1:13', 'Exodus', 1, 13),
      m('The exodus', 'Exodus 12:41', 'Exodus', 12, 41),
      m('Jesus’ family takes refuge', 'Matthew 2:14–15', 'Matthew', 2, 14),
    ],
    reviewed: false,
  },
  {
    id: 'jordan',
    name: 'The Jordan River',
    placeId: 'ae686c9',
    summary: 'The river that marks the edge of the promised land and the start of new things.',
    aboutGod: 'God brings His people across into new beginnings, and Jesus begins His ministry in the same waters.',
    moments: [
      m('Israel crosses on dry ground', 'Joshua 3:17', 'Joshua', 3, 17),
      m('Elijah and Elisha cross', '2 Kings 2:8', '2 Kings', 2, 8),
      m('Naaman is healed', '2 Kings 5:14', '2 Kings', 5, 14),
      m('Jesus is baptized', 'Matthew 3:13', 'Matthew', 3, 13),
    ],
    reviewed: false,
  },
  {
    id: 'shechem',
    name: 'Shechem',
    placeId: 'adf74d4',
    summary: 'A crossroads in the hill country where promises were made, renewed, and broken.',
    aboutGod: 'God keeps His promises across centuries — and Jesus meets a Samaritan woman at Jacob’s well nearby.',
    moments: [
      m('God promises Abraham the land', 'Genesis 12:6–7', 'Genesis', 12, 6),
      m('Joseph’s bones are buried', 'Joshua 24:32', 'Joshua', 24, 32),
      m('Joshua renews the covenant', 'Joshua 24:1', 'Joshua', 24, 1),
      m('The kingdom splits', '1 Kings 12:1', '1 Kings', 12, 1),
      m('Jesus at Jacob’s well (Sychar)', 'John 4:5–6', 'John', 4, 5),
    ],
    reviewed: false,
  },
  {
    id: 'babylon',
    name: 'Babylon',
    placeId: 'a217d18',
    summary: 'From the tower of Babel to the fall of “Babylon the great,” the city stands for human pride against God.',
    aboutGod: 'God humbles proud empires and keeps His people even in exile.',
    moments: [
      m('The tower of Babel', 'Genesis 11:9', 'Genesis', 11, 9),
      m('Judah is carried into exile', '2 Kings 25:11', '2 Kings', 25, 11),
      m('Daniel serves in the court', 'Daniel 1:1–6', 'Daniel', 1, 1),
      m('The writing on the wall', 'Daniel 5:30', 'Daniel', 5, 30),
      m('“Fallen is Babylon the great”', 'Revelation 18:2', 'Revelation', 18, 2),
    ],
    reviewed: false,
  },
  {
    id: 'sinai',
    name: 'Mount Sinai (Horeb)',
    placeId: 'abfba2a',
    summary: 'The mountain of God where Moses met Him, the law was given, and Elijah heard the whisper.',
    aboutGod: 'The holy God speaks to His people and binds Himself to them.',
    moments: [
      m('The burning bush', 'Exodus 3:1–2', 'Exodus', 3, 1),
      m('The law is given', 'Exodus 19:20', 'Exodus', 19, 20),
      m('Elijah hears the gentle whisper', '1 Kings 19:8–12', '1 Kings', 19, 8),
      m('Paul’s contrast of Sinai and the new covenant', 'Galatians 4:24–26', 'Galatians', 4, 24),
    ],
    reviewed: false,
  },
];

// ---- The promised line: where the promise narrows ----

export interface LineMarker {
  /** Name as it appears in line.json */
  name: string;
  promise: string;
  ref: Ref;
  reviewed: boolean;
}

export const LINE_MARKERS: LineMarker[] = [
  { name: 'Adam', promise: 'The woman’s offspring will crush the serpent (a traditional Christian reading of Genesis 3:15).', ref: r('Genesis 3:15', 'Genesis', 3, 15), reviewed: false },
  { name: 'Noah', promise: 'God preserves a family through judgment and blesses Shem (Genesis 9:26).', ref: r('Genesis 9:26', 'Genesis', 9, 26), reviewed: false },
  { name: 'Abraham', promise: 'In you all the families of the earth will be blessed.', ref: r('Genesis 12:3', 'Genesis', 12, 3), reviewed: false },
  { name: 'Isaac', promise: 'Through Isaac your offspring will be named.', ref: r('Genesis 21:12', 'Genesis', 21, 12), reviewed: false },
  { name: 'Jacob', promise: 'In you and your offspring all families will be blessed.', ref: r('Genesis 28:14', 'Genesis', 28, 14), reviewed: false },
  { name: 'Judah', promise: 'The scepter will not depart from Judah.', ref: r('Genesis 49:10', 'Genesis', 49, 10), reviewed: false },
  { name: 'David', promise: 'I will raise up your offspring and establish his kingdom forever.', ref: r('2 Samuel 7:12–13', '2 Samuel', 7, 12), reviewed: false },
  { name: 'Jesus', promise: 'The offspring the promise was about all along.', ref: r('Galatians 3:16', 'Galatians', 3, 16), reviewed: false },
];

/** Shown with the promised line (factual notes, not interpretation) */
export const LINE_NOTES = [
  'This follows Matthew 1 from Abraham to Jesus, and Genesis 5 and 11 (with Luke 3) before Abraham.',
  'Matthew groups the generations in three sets of fourteen and leaves some names out — for example, three kings between Jehoram (Joram) and Uzziah. Shortened genealogies like this were common in the ancient world.',
  'Luke 3 traces Jesus’ ancestry from David through Nathan rather than Solomon. Christians have explained the difference in several ways — for example, that one list follows Joseph’s legal line and the other Mary’s family.',
  'Zerubbabel is called the son of Shealtiel (Matthew 1:12; Ezra 3:2), but 1 Chronicles 3:19 lists him as the son of Pedaiah, Shealtiel’s brother — possibly through adoption or a levirate marriage.',
];
