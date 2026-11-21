// ============ TimeWalk: daily life in the biblical world ============
//
// DRAFT articles, hidden from users until reviewed (set `reviewed: true` to publish).
// Review list: docs/timewalk-review.md.

import type { BibleReference } from '@/lib/bibleApi';

export interface LifeTopic {
  id: string;
  title: string;
  /** Eras where this topic matters most (see eras.ts) */
  eras: string[];
  /** Books where the topic comes up often (boosts relevance) */
  books: string[];
  text: string;
  /** What this aspect of life helps us see about God */
  aboutGod: string;
  refs: { label: string; ref: BibleReference }[];
  reviewed: boolean;
}

const ref = (label: string, book: string, chapter: number, verse?: number) => ({ label, ref: { book, chapter, verse } });

export const LIFE_TOPICS: LifeTopic[] = [
  {
    id: 'shepherds',
    title: 'Shepherds and sheep',
    eras: ['patriarchs', 'exodus', 'united', 'jesus'],
    books: ['Genesis', 'Psalms', 'Ezekiel', 'Luke', 'John', '1 Samuel'],
    text:
      'Sheep and goats were the wealth of many families. Shepherds led their flocks — walking in front, not driving from behind — to grass and water, often over long distances. They knew each animal, guarded them at night in stone folds, and fought off lions, bears, and thieves. It was humble, dangerous work; shepherds were often young, poor, or looked down on.',
    aboutGod: 'God calls Himself the Shepherd of His people, and Jesus is the Good Shepherd who knows His sheep by name and lays down His life for them.',
    refs: [ref('Psalm 23:1', 'Psalms', 23, 1), ref('John 10:11', 'John', 10, 11), ref('Ezekiel 34:11', 'Ezekiel', 34, 11)],
    reviewed: false,
  },
  {
    id: 'farming-year',
    title: 'The farming year',
    eras: ['conquest', 'united', 'divided', 'judah', 'jesus'],
    books: ['Ruth', 'Deuteronomy', 'Joel', 'Matthew', 'Mark', 'Leviticus'],
    text:
      'Life followed the rains. The early rains (October–November) softened the ground for plowing and sowing; the late rains (March–April) ripened the crops. Barley was harvested in spring, wheat in early summer, then grapes, figs, and olives in late summer and fall. A failed rain meant hunger, so harvest was a time of joy — and the law told farmers to leave the edges of their fields for the poor.',
    aboutGod: 'Every harvest was a gift from the God who sends rain, and the gleaning laws show His care for the poor and the foreigner.',
    refs: [ref('Deuteronomy 11:14', 'Deuteronomy', 11, 14), ref('Ruth 2:2', 'Ruth', 2, 2), ref('Leviticus 19:9–10', 'Leviticus', 19, 9)],
    reviewed: false,
  },
  {
    id: 'bread-meals',
    title: 'Bread and meals',
    eras: ['patriarchs', 'exodus', 'united', 'jesus', 'church'],
    books: ['Genesis', 'Exodus', 'Luke', 'John', 'Acts'],
    text:
      'Bread was the center of every meal — usually barley or wheat, ground by hand each morning and baked in flat loaves. With it came olive oil, lentils, cheese, fruit, and occasionally fish; meat was mostly for feasts. Eating together created a bond, which is why sharing a table with someone was a sign of acceptance, and why it mattered so much who Jesus ate with.',
    aboutGod: 'God fed Israel with manna in the wilderness, and Jesus calls Himself the Bread of Life — then welcomes sinners to His table.',
    refs: [ref('Exodus 16:15', 'Exodus', 16, 15), ref('John 6:35', 'John', 6, 35), ref('Luke 15:2', 'Luke', 15, 2)],
    reviewed: false,
  },
  {
    id: 'water-wells',
    title: 'Water and wells',
    eras: ['patriarchs', 'exodus', 'jesus'],
    books: ['Genesis', 'Exodus', 'Numbers', 'John'],
    text:
      'In a dry land, water meant life. Families depended on springs, cisterns cut into rock to catch winter rain, and deep wells — which were often places of meeting (and of conflict). Drawing water was daily work, usually done by women in the cool of morning or evening. A spring that flowed all year was called “living water.”',
    aboutGod: 'God provided water from the rock in the wilderness, and Jesus offers “living water” that satisfies forever.',
    refs: [ref('Genesis 24:11', 'Genesis', 24, 11), ref('Exodus 17:6', 'Exodus', 17, 6), ref('John 4:10', 'John', 4, 10)],
    reviewed: false,
  },
  {
    id: 'homes',
    title: 'Houses and homes',
    eras: ['conquest', 'united', 'divided', 'jesus'],
    books: ['Judges', 'Mark', 'Luke', 'Acts'],
    text:
      'Most families lived in small houses of stone or mud brick around a shared courtyard, often with relatives next door. Animals might be kept in the lower part of the house at night. A flat roof, reached by a ladder or stairs, was used for drying crops, sleeping in summer, and praying. Homes were dim, crowded, and shared — privacy was rare, and hospitality was expected.',
    aboutGod: 'Friends carried a paralyzed man up onto such a roof and lowered him to Jesus — who forgave his sins and healed him.',
    refs: [ref('Mark 2:4', 'Mark', 2, 4), ref('Acts 10:9', 'Acts', 10, 9), ref('Luke 2:7', 'Luke', 2, 7)],
    reviewed: false,
  },
  {
    id: 'family',
    title: 'Family, inheritance, and the firstborn',
    eras: ['patriarchs', 'conquest', 'united'],
    books: ['Genesis', 'Numbers', 'Ruth', 'Deuteronomy'],
    text:
      'Family meant the extended household, not just parents and children, and land was passed down within the family so that its name would continue. The firstborn son usually received a double share of the inheritance and responsibility for the family. Keeping land in the family was so important that relatives were expected to buy it back if it had to be sold.',
    aboutGod: 'Again and again God overturns expectations — choosing younger sons like Jacob, Joseph, and David — to show that His grace, not birth order, decides.',
    refs: [ref('Genesis 25:23', 'Genesis', 25, 23), ref('Deuteronomy 21:17', 'Deuteronomy', 21, 17), ref('Ruth 4:9–10', 'Ruth', 4, 9)],
    reviewed: false,
  },
  {
    id: 'weddings',
    title: 'Betrothal and weddings',
    eras: ['patriarchs', 'jesus'],
    books: ['Genesis', 'Matthew', 'John', 'Song of Solomon'],
    text:
      'Marriages were usually arranged between families. Betrothal was a binding commitment — ending it required a divorce — and could last a year while the groom prepared a home, often by adding a room to his father’s house. Then the groom came, often at night, to bring his bride home with a procession and a feast that could last a week.',
    aboutGod: 'Scripture pictures God as a faithful husband to His people, and Jesus as the Bridegroom who goes to prepare a place and will come back for His bride.',
    refs: [ref('Matthew 1:18–19', 'Matthew', 1, 18), ref('John 2:1–2', 'John', 2, 1), ref('John 14:2–3', 'John', 14, 2)],
    reviewed: false,
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    eras: ['patriarchs', 'jesus', 'church'],
    books: ['Genesis', 'Luke', 'Hebrews', 'Romans'],
    text:
      'Welcoming strangers was a sacred duty, especially for travelers who had no inns to rely on. A host offered water to wash dusty feet, food, and shelter, and was responsible for the guest’s safety. Failing to show hospitality was shameful.',
    aboutGod: 'Abraham welcomed three visitors and found the LORD among them. God, who welcomed us when we were strangers, calls His people to welcome others.',
    refs: [ref('Genesis 18:1–5', 'Genesis', 18, 1), ref('Luke 7:44', 'Luke', 7, 44), ref('Hebrews 13:2', 'Hebrews', 13, 2)],
    reviewed: false,
  },
  {
    id: 'honor-shame',
    title: 'Honor and shame',
    eras: ['patriarchs', 'united', 'jesus', 'church'],
    books: ['Luke', 'Matthew', 'Philippians', 'Hebrews'],
    text:
      'In the ancient Mediterranean world, a person’s honor — their standing in the eyes of the community — mattered enormously. Seating at meals, public praise, and family reputation all showed honor. Being publicly humiliated was one of the worst things that could happen.',
    aboutGod: 'Jesus took the place of deepest shame on a cross, “despising the shame,” and God has highly exalted Him — and He gives honor to those the world overlooks.',
    refs: [ref('Luke 14:8–11', 'Luke', 14, 8), ref('Hebrews 12:2', 'Hebrews', 12, 2), ref('Philippians 2:8–9', 'Philippians', 2, 8)],
    reviewed: false,
  },
  {
    id: 'travel',
    title: 'Travel and roads',
    eras: ['patriarchs', 'jesus', 'church'],
    books: ['Genesis', 'Luke', 'Acts'],
    text:
      'Most people walked — about 20 miles (30 km) on a good day. Donkeys carried goods; camels crossed deserts; wealthier people might ride. In New Testament times, Roman roads and relative peace made travel safer, and ships carried passengers between ports in the sailing season (roughly spring to fall). Paul traveled thousands of miles this way.',
    aboutGod: 'God used Roman roads and ships to carry the good news across the empire, exactly as Jesus said it would spread “to the ends of the earth.”',
    refs: [ref('Acts 1:8', 'Acts', 1, 8), ref('Acts 27:9', 'Acts', 27, 9), ref('Luke 2:4', 'Luke', 2, 4)],
    reviewed: false,
  },
  {
    id: 'fishing',
    title: 'Fishing on the Sea of Galilee',
    eras: ['jesus'],
    books: ['Matthew', 'Mark', 'Luke', 'John'],
    text:
      'The Sea of Galilee is a freshwater lake about 13 miles (21 km) long, known for sudden storms. Fishermen like Peter, Andrew, James, and John worked in family businesses with hired help, often at night, using large dragnets and cast nets from wooden boats. Fish were salted and dried and sold across the region.',
    aboutGod: 'Jesus called fishermen to follow Him and promised to make them “fishers of people” — and He showed His power over the sea that frightened them.',
    refs: [ref('Mark 1:16–17', 'Mark', 1, 16), ref('Luke 5:4–6', 'Luke', 5, 4), ref('Mark 4:39', 'Mark', 4, 39)],
    reviewed: false,
  },
  {
    id: 'money-taxes',
    title: 'Money, taxes, and tax collectors',
    eras: ['jesus'],
    books: ['Matthew', 'Mark', 'Luke'],
    text:
      'Under Rome, people in Judea and Galilee paid several taxes: a poll tax, land taxes, tolls on goods, and the temple tax. Tax collectors bought the right to collect tolls and could keep whatever they took above the required amount, so many grew rich by overcharging. Because they worked for the occupying power, they were seen as traitors and grouped with “sinners.”',
    aboutGod: 'Jesus called Matthew, a tax collector, to follow Him and went to Zacchaeus’ house — showing that no one is beyond God’s grace.',
    refs: [ref('Matthew 9:9', 'Matthew', 9, 9), ref('Luke 19:8–10', 'Luke', 19, 8), ref('Mark 12:17', 'Mark', 12, 17)],
    reviewed: false,
  },
  {
    id: 'temple',
    title: 'The temple and sacrifices',
    eras: ['united', 'divided', 'judah', 'return', 'jesus'],
    books: ['Leviticus', '1 Kings', '2 Chronicles', 'Ezra', 'Luke', 'Hebrews'],
    text:
      'The temple in Jerusalem was the one place where sacrifices were offered to the LORD. Priests offered animals and grain for sin, thanksgiving, and fellowship, and once a year the high priest entered the Most Holy Place on the Day of Atonement. Solomon’s temple was destroyed in 586 BC; the second temple, rebuilt after the exile and greatly expanded by Herod, stood in Jesus’ day.',
    aboutGod: 'The sacrifices taught that sin is serious and that God provides a way to come near. They pointed to Jesus, the final sacrifice, whose death tore the temple curtain in two.',
    refs: [ref('Leviticus 16:30', 'Leviticus', 16, 30), ref('Hebrews 10:12', 'Hebrews', 10, 12), ref('Mark 15:38', 'Mark', 15, 38)],
    reviewed: false,
  },
  {
    id: 'feasts',
    title: 'The festivals',
    eras: ['exodus', 'united', 'return', 'jesus'],
    books: ['Exodus', 'Leviticus', 'Deuteronomy', 'John', 'Acts'],
    text:
      'Israel’s year was marked by feasts. Passover remembered the rescue from Egypt; Pentecost (the Feast of Weeks) celebrated the wheat harvest; the Feast of Tabernacles (Booths) remembered the wilderness years. Three times a year men were to go up to Jerusalem, and in Jesus’ day the city filled with pilgrims.',
    aboutGod: 'The feasts retell what God has done. Jesus died at Passover as the true Lamb, and the Spirit came at Pentecost.',
    refs: [ref('Leviticus 23:4–6', 'Leviticus', 23, 4), ref('1 Corinthians 5:7', '1 Corinthians', 5, 7), ref('Acts 2:1', 'Acts', 2, 1)],
    reviewed: false,
  },
  {
    id: 'synagogue',
    title: 'The synagogue',
    eras: ['jesus', 'church'],
    books: ['Luke', 'Mark', 'Acts'],
    text:
      'Synagogues — local gathering places for prayer, reading the Scriptures, and teaching — probably developed after the exile and were found in towns across the Jewish world by Jesus’ day. On the Sabbath, the Law and Prophets were read, and visiting teachers might be invited to speak. Paul usually began in the synagogue when he arrived in a new city.',
    aboutGod: 'In the Nazareth synagogue, Jesus read Isaiah’s promise of good news for the poor and said, “Today this Scripture has been fulfilled.”',
    refs: [ref('Luke 4:16–21', 'Luke', 4, 16), ref('Acts 17:2', 'Acts', 17, 2), ref('Mark 1:21', 'Mark', 1, 21)],
    reviewed: false,
  },
  {
    id: 'jewish-groups',
    title: 'Pharisees, Sadducees, and other groups',
    eras: ['between', 'jesus', 'church'],
    books: ['Matthew', 'Mark', 'Luke', 'John', 'Acts'],
    text:
      'In Jesus’ day, Pharisees were respected teachers devoted to keeping the law and its traditions in everyday life. Sadducees were priestly aristocrats who controlled the temple and rejected belief in the resurrection. Essenes withdrew to live in pure communities (probably including Qumran), and Zealots wanted to drive out Rome by force. Samaritans worshiped the God of Israel on Mount Gerizim and were bitterly divided from the Jews.',
    aboutGod: 'Jesus confronted the pride of the religious, crossed the divide to a Samaritan woman, and called a Zealot and a tax collector into the same band of disciples.',
    refs: [ref('Acts 23:8', 'Acts', 23, 8), ref('John 4:9', 'John', 4, 9), ref('Luke 6:15', 'Luke', 6, 15)],
    reviewed: false,
  },
  {
    id: 'roman-rule',
    title: 'Life under Rome',
    eras: ['jesus', 'church', 'revelation'],
    books: ['Matthew', 'Luke', 'John', 'Acts', 'Romans', 'Revelation'],
    text:
      'Rome took control of Judea in 63 BC and ruled through client kings like Herod and his sons, and later through governors like Pontius Pilate. Roman soldiers kept order, and the “peace of Rome” made trade and travel easier. But taxes, foreign troops, and pagan symbols were hated, and revolts were crushed — ending in the destruction of Jerusalem in AD 70.',
    aboutGod: 'Caesar Augustus ordered a census — and God used it to bring Jesus to be born in Bethlehem, as promised. The true King was born under an empire that thought it ruled the world.',
    refs: [ref('Luke 2:1–4', 'Luke', 2, 1), ref('John 19:15', 'John', 19, 15), ref('Romans 13:1', 'Romans', 13, 1)],
    reviewed: false,
  },
  {
    id: 'crucifixion',
    title: 'Crucifixion',
    eras: ['jesus'],
    books: ['Matthew', 'Mark', 'Luke', 'John', 'Galatians'],
    text:
      'Rome reserved crucifixion for slaves, rebels, and the worst criminals. It was designed to be slow, public, and humiliating — a warning to everyone passing by. Roman citizens were generally exempt. To Jews, anyone hung on a tree was under God’s curse; to Romans, the cross was too shameful to mention in polite company.',
    aboutGod: 'That is how far God’s love went: Christ became a curse for us, so that we could be redeemed.',
    refs: [ref('Galatians 3:13', 'Galatians', 3, 13), ref('Philippians 2:8', 'Philippians', 2, 8), ref('Mark 15:24', 'Mark', 15, 24)],
    reviewed: false,
  },
  {
    id: 'burial',
    title: 'Burial customs',
    eras: ['patriarchs', 'jesus'],
    books: ['Genesis', 'John', 'Mark'],
    text:
      'The dead were buried quickly, usually the same day. Wealthier families used tombs cut into rock, closed with a large stone; bodies were wrapped in linen with spices. In Jesus’ day, after about a year, the bones were often gathered into a stone box (an ossuary) so the tomb could be reused. Mourning was loud and public, sometimes with hired mourners.',
    aboutGod: 'Abraham bought a tomb in the land God promised — an act of faith. And Jesus’ tomb, sealed with a stone, could not hold Him.',
    refs: [ref('Genesis 23:19–20', 'Genesis', 23, 19), ref('John 11:38–39', 'John', 11, 38), ref('Mark 16:4–6', 'Mark', 16, 4)],
    reviewed: false,
  },
  {
    id: 'scrolls',
    title: 'Writing, scrolls, and letters',
    eras: ['judah', 'return', 'jesus', 'church'],
    books: ['Jeremiah', 'Nehemiah', 'Luke', 'Romans', '2 Timothy'],
    text:
      'Scriptures were copied by hand on scrolls of leather or papyrus — expensive and precious, so most people heard Scripture read aloud rather than owning it. Letters were often dictated to a trained scribe (Romans names Tertius) and carried by a trusted friend, who might read the letter aloud to the church and explain it.',
    aboutGod: 'God preserved His Word through generations of careful copying — and He spoke through letters written to real churches with real problems.',
    refs: [ref('Nehemiah 8:8', 'Nehemiah', 8, 8), ref('Romans 16:22', 'Romans', 16, 22), ref('2 Timothy 4:13', '2 Timothy', 4, 13)],
    reviewed: false,
  },
];

/** Topics most relevant to a chapter: same book first, then same era. */
export function topicsForChapter(book: string, eraId: string | undefined, includeUnreviewed = false, limit = 4): LifeTopic[] {
  const pool = LIFE_TOPICS.filter(t => includeUnreviewed || t.reviewed);
  const score = (t: LifeTopic) => (t.books.includes(book) ? 2 : 0) + (eraId && t.eras.includes(eraId) ? 1 : 0);
  return pool
    .map(t => ({ t, s: score(t) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(x => x.t);
}
