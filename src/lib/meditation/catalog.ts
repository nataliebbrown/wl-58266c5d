// ============ Scripture Meditation Catalog ============
//
// Key verses for breath-prayer meditation, grouped by what someone is going
// through. Each group is anchored in a truth about God, so the meditation
// keeps God (not the circumstance) at the center.
//
// Text: Berean Standard Bible (BSB), public domain. Many entries are the core
// phrase of a verse (breath prayers are short); `excerpt: true` marks those.

export interface MeditationVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  /** Shown while breathing in */
  inhale: string;
  /** Shown while breathing out */
  exhale: string;
  excerpt?: boolean;
  translation: string;
}

export interface MeditationCategory {
  id: string;
  /** What the person is going through */
  need: string;
  /** The truth about God the verses rest on */
  truth: string;
  description: string;
  verses: MeditationVerse[];
}

const BSB = 'BSB';

function v(
  book: string,
  chapter: number,
  verse: number,
  inhale: string,
  exhale: string,
  excerpt = false
): MeditationVerse {
  return {
    id: `${book}-${chapter}-${verse}`.toLowerCase().replace(/\s+/g, '-'),
    book,
    chapter,
    verse,
    inhale,
    exhale,
    excerpt: excerpt || undefined,
    translation: BSB,
  };
}

export const MEDITATION_CATALOG: MeditationCategory[] = [
  {
    id: 'anxious',
    need: 'Anxious',
    truth: 'God cares for you',
    description: 'For when your mind is racing and your heart is heavy with worry.',
    verses: [
      v('1 Peter', 5, 7, 'Cast all your anxiety on Him,', 'because He cares for you.'),
      v('Psalms', 94, 19, 'When anxiety overwhelms me,', 'Your consolation delights my soul.'),
      v('Isaiah', 26, 3, 'You will keep in perfect peace the steadfast of mind,', 'because he trusts in You.'),
      v('John', 14, 27, 'Peace I leave with you;', 'My peace I give to you.', true),
    ],
  },
  {
    id: 'afraid',
    need: 'Afraid',
    truth: 'God is with you',
    description: 'For when fear feels bigger than you can carry.',
    verses: [
      v('Psalms', 56, 3, 'When I am afraid,', 'I put my trust in You.'),
      v('Isaiah', 41, 10, 'Do not fear, for I am with you;', 'do not be afraid, for I am your God.', true),
      v('Psalms', 27, 1, 'The LORD is my light and my salvation—', 'whom shall I fear?', true),
      v('Joshua', 1, 9, 'Do not be afraid; do not be discouraged,', 'for the LORD your God is with you wherever you go.', true),
      v('Psalms', 23, 4, 'I will fear no evil,', 'for You are with me.', true),
    ],
  },
  {
    id: 'grieving',
    need: 'Grieving',
    truth: 'God is near to the brokenhearted',
    description: 'For seasons of loss, sorrow, and tears.',
    verses: [
      v('Psalms', 34, 18, 'The LORD is near to the brokenhearted;', 'He saves the contrite in spirit.'),
      v('Psalms', 147, 3, 'He heals the brokenhearted', 'and binds up their wounds.'),
      v('Matthew', 5, 4, 'Blessed are those who mourn,', 'for they will be comforted.'),
      v('Revelation', 21, 4, 'He will wipe away every tear from their eyes,', 'and there will be no more death or mourning or crying or pain.', true),
      v('2 Corinthians', 1, 3, 'The Father of compassion', 'and the God of all comfort.', true),
    ],
  },
  {
    id: 'weary',
    need: 'Weary',
    truth: 'God gives rest',
    description: 'For when you are worn out, stretched thin, or running on empty.',
    verses: [
      v('Matthew', 11, 28, 'Come to Me, all you who are weary and burdened,', 'and I will give you rest.'),
      v('Psalms', 46, 10, 'Be still', 'and know that I am God.', true),
      v('Psalms', 62, 1, 'In God alone my soul finds rest;', 'my salvation comes from Him.'),
      v('Psalms', 23, 2, 'He makes me lie down in green pastures;', 'He leads me beside quiet waters.'),
      v('Isaiah', 40, 31, 'Those who wait upon the LORD', 'will renew their strength.', true),
      v('2 Corinthians', 12, 9, 'My grace is sufficient for you,', 'for My power is perfected in weakness.', true),
    ],
  },
  {
    id: 'waiting',
    need: 'Waiting',
    truth: 'God is faithful',
    description: 'For when the answer hasn’t come yet and patience is wearing thin.',
    verses: [
      v('Lamentations', 3, 25, 'The LORD is good to those who wait for Him,', 'to the soul who seeks Him.'),
      v('Psalms', 27, 14, 'Wait patiently for the LORD;', 'be strong and courageous.', true),
      v('Psalms', 130, 5, 'I wait for the LORD; my soul does wait,', 'and in His word I put my hope.'),
      v('Lamentations', 3, 22, 'Because of the loving devotion of the LORD we are not consumed,', 'for His mercies never fail.'),
      v('Romans', 8, 28, 'We know that God works all things together', 'for the good of those who love Him.', true),
    ],
  },
  {
    id: 'uncertain',
    need: 'Uncertain',
    truth: 'God guides His people',
    description: 'For decisions, crossroads, and not knowing what comes next.',
    verses: [
      v('Proverbs', 3, 5, 'Trust in the LORD with all your heart,', 'and lean not on your own understanding.'),
      v('Psalms', 32, 8, 'I will instruct you and teach you the way you should go;', 'I will give you counsel and watch over you.'),
      v('Psalms', 119, 105, 'Your word is a lamp to my feet', 'and a light to my path.'),
      v('Isaiah', 30, 21, 'This is the way.', 'Walk in it.', true),
      v('James', 1, 5, 'If any of you lacks wisdom, he should ask God,', 'who gives generously to all without finding fault.', true),
    ],
  },
  {
    id: 'struggling-with-sin',
    need: 'Struggling with sin',
    truth: 'God is merciful',
    description: 'For guilt, shame, temptation, and coming back to God.',
    verses: [
      v('1 John', 1, 9, 'If we confess our sins,', 'He is faithful and just to forgive us.', true),
      v('Psalms', 51, 10, 'Create in me a clean heart, O God,', 'and renew a right spirit within me.'),
      v('Romans', 8, 1, 'There is now no condemnation', 'for those who are in Christ Jesus.', true),
      v('Hebrews', 4, 16, 'Let us then approach the throne of grace with confidence,', 'so that we may receive mercy and find grace.', true),
    ],
  },
  {
    id: 'alone',
    need: 'Alone or unloved',
    truth: 'God loves you',
    description: 'For loneliness, rejection, and feeling unseen.',
    verses: [
      v('Hebrews', 13, 5, 'Never will I leave you,', 'never will I forsake you.', true),
      v('Jeremiah', 31, 3, 'I have loved you with an everlasting love;', 'therefore I have drawn you with loving devotion.', true),
      v('Romans', 5, 8, 'God proves His love for us in this:', 'While we were still sinners, Christ died for us.', true),
      v('Zephaniah', 3, 17, 'The LORD your God is among you;', 'He is mighty to save.', true),
      v('1 John', 3, 1, 'Behold what manner of love the Father has given to us,', 'that we should be called children of God.', true),
    ],
  },
  {
    id: 'grateful',
    need: 'Grateful',
    truth: 'God is good',
    description: 'For thanksgiving and remembering what God has done.',
    verses: [
      v('Psalms', 107, 1, 'Give thanks to the LORD, for He is good;', 'His loving devotion endures forever.'),
      v('Psalms', 103, 2, 'Bless the LORD, O my soul,', 'and do not forget all His kind deeds.'),
      v('Psalms', 118, 24, 'This is the day that the LORD has made;', 'we will rejoice and be glad in it.'),
      v('James', 1, 17, 'Every good and perfect gift is from above,', 'coming down from the Father of the heavenly lights.', true),
      v('Psalms', 100, 5, 'For the LORD is good, and His loving devotion endures forever;', 'His faithfulness continues to all generations.'),
    ],
  },
  {
    id: 'worship',
    need: 'Wanting to worship',
    truth: 'God is worthy',
    description: 'For simply adoring God for who He is.',
    verses: [
      v('Revelation', 4, 11, 'Worthy are You, our Lord and God,', 'to receive glory and honor and power.', true),
      v('Psalms', 145, 3, 'Great is the LORD and greatly to be praised;', 'His greatness is unsearchable.'),
      v('Psalms', 63, 3, 'Because Your loving devotion is better than life,', 'my lips will glorify You.'),
      v('Psalms', 16, 11, 'You will fill me with joy in Your presence,', 'with eternal pleasures at Your right hand.', true),
    ],
  },
];

export function formatMeditationReference(verse: { book: string; chapter: number; verse: number }): string {
  // A single psalm is "Psalm 23", not "Psalms 23"
  const book = verse.book === 'Psalms' ? 'Psalm' : verse.book;
  return `${book} ${verse.chapter}:${verse.verse}`;
}
