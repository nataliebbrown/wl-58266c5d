// ============ Character study: people and their key passages ============

export interface CharacterPassage {
  book: string;
  chapter: number;
  /** What happens here, in a few words */
  title: string;
}

export interface BibleCharacter {
  id: string;
  name: string;
  summary: string;
  passages: CharacterPassage[];
}

export const BIBLE_CHARACTERS: BibleCharacter[] = [
  {
    id: 'abraham',
    name: 'Abraham',
    summary: 'Called by God to leave everything, and counted righteous by faith.',
    passages: [
      { book: 'Genesis', chapter: 12, title: 'The call and the promise' },
      { book: 'Genesis', chapter: 15, title: 'The covenant under the stars' },
      { book: 'Genesis', chapter: 16, title: 'Taking matters into his own hands' },
      { book: 'Genesis', chapter: 21, title: 'Isaac, the promised son' },
      { book: 'Genesis', chapter: 22, title: 'God will provide' },
    ],
  },
  {
    id: 'joseph',
    name: 'Joseph',
    summary: 'Betrayed, enslaved, and raised up — God meant it for good.',
    passages: [
      { book: 'Genesis', chapter: 37, title: 'Dreams and betrayal' },
      { book: 'Genesis', chapter: 39, title: 'The Lord was with Joseph' },
      { book: 'Genesis', chapter: 41, title: 'From prison to palace' },
      { book: 'Genesis', chapter: 45, title: 'Revealed to his brothers' },
      { book: 'Genesis', chapter: 50, title: 'God meant it for good' },
    ],
  },
  {
    id: 'moses',
    name: 'Moses',
    summary: 'A reluctant leader through whom God rescued His people.',
    passages: [
      { book: 'Exodus', chapter: 2, title: 'Drawn from the water' },
      { book: 'Exodus', chapter: 3, title: 'The burning bush' },
      { book: 'Exodus', chapter: 14, title: 'Crossing the sea' },
      { book: 'Exodus', chapter: 32, title: 'The golden calf and intercession' },
      { book: 'Exodus', chapter: 33, title: 'Show me Your glory' },
      { book: 'Deuteronomy', chapter: 34, title: 'Seeing the promised land' },
    ],
  },
  {
    id: 'ruth',
    name: 'Ruth',
    summary: 'A foreign widow folded into God’s redemption story.',
    passages: [
      { book: 'Ruth', chapter: 1, title: 'Your God will be my God' },
      { book: 'Ruth', chapter: 2, title: 'Gleaning in Boaz’s field' },
      { book: 'Ruth', chapter: 3, title: 'At the threshing floor' },
      { book: 'Ruth', chapter: 4, title: 'The redeemer' },
    ],
  },
  {
    id: 'hannah',
    name: 'Hannah',
    summary: 'A woman who poured out her heart and praised the God who lifts the lowly.',
    passages: [
      { book: '1 Samuel', chapter: 1, title: 'A prayer from deep anguish' },
      { book: '1 Samuel', chapter: 2, title: 'Hannah’s song' },
    ],
  },
  {
    id: 'david',
    name: 'David',
    summary: 'Shepherd, king, sinner, and worshiper — a man after God’s heart.',
    passages: [
      { book: '1 Samuel', chapter: 16, title: 'The Lord looks at the heart' },
      { book: '1 Samuel', chapter: 17, title: 'The battle is the Lord’s' },
      { book: '1 Samuel', chapter: 24, title: 'Sparing Saul' },
      { book: '2 Samuel', chapter: 7, title: 'God’s covenant with David' },
      { book: '2 Samuel', chapter: 11, title: 'David and Bathsheba' },
      { book: 'Psalms', chapter: 51, title: 'Create in me a clean heart' },
    ],
  },
  {
    id: 'elijah',
    name: 'Elijah',
    summary: 'A prophet who saw God’s fire — and heard His whisper.',
    passages: [
      { book: '1 Kings', chapter: 17, title: 'Fed by ravens' },
      { book: '1 Kings', chapter: 18, title: 'Fire on Mount Carmel' },
      { book: '1 Kings', chapter: 19, title: 'The gentle whisper' },
    ],
  },
  {
    id: 'esther',
    name: 'Esther',
    summary: 'God’s hidden hand saving His people through a courageous queen.',
    passages: [
      { book: 'Esther', chapter: 2, title: 'Made queen' },
      { book: 'Esther', chapter: 4, title: 'For such a time as this' },
      { book: 'Esther', chapter: 5, title: 'Approaching the king' },
      { book: 'Esther', chapter: 7, title: 'The plot exposed' },
    ],
  },
  {
    id: 'daniel',
    name: 'Daniel',
    summary: 'Faithful in exile, trusting the God who rules over kings.',
    passages: [
      { book: 'Daniel', chapter: 1, title: 'Faithful in Babylon' },
      { book: 'Daniel', chapter: 2, title: 'The God who reveals mysteries' },
      { book: 'Daniel', chapter: 6, title: 'The lions’ den' },
      { book: 'Daniel', chapter: 9, title: 'A prayer of confession' },
    ],
  },
  {
    id: 'jonah',
    name: 'Jonah',
    summary: 'A runaway prophet and the relentless mercy of God.',
    passages: [
      { book: 'Jonah', chapter: 1, title: 'Running from God' },
      { book: 'Jonah', chapter: 2, title: 'Prayer from the fish' },
      { book: 'Jonah', chapter: 3, title: 'Nineveh repents' },
      { book: 'Jonah', chapter: 4, title: 'God’s compassion' },
    ],
  },
  {
    id: 'mary',
    name: 'Mary, mother of Jesus',
    summary: 'The Lord’s servant who treasured His work in her heart.',
    passages: [
      { book: 'Luke', chapter: 1, title: 'Let it be to me' },
      { book: 'Luke', chapter: 2, title: 'The birth of Jesus' },
      { book: 'John', chapter: 2, title: 'Do whatever He tells you' },
      { book: 'John', chapter: 19, title: 'At the cross' },
    ],
  },
  {
    id: 'peter',
    name: 'Peter',
    summary: 'Bold, impulsive, broken, and restored by Jesus.',
    passages: [
      { book: 'Matthew', chapter: 14, title: 'Walking on water' },
      { book: 'Matthew', chapter: 16, title: 'You are the Christ' },
      { book: 'Matthew', chapter: 26, title: 'Denial' },
      { book: 'John', chapter: 21, title: 'Do you love Me?' },
      { book: 'Acts', chapter: 2, title: 'Pentecost' },
      { book: 'Acts', chapter: 10, title: 'God shows no partiality' },
    ],
  },
  {
    id: 'paul',
    name: 'Paul',
    summary: 'From persecutor to apostle — grace that changes everything.',
    passages: [
      { book: 'Acts', chapter: 9, title: 'The Damascus road' },
      { book: 'Acts', chapter: 16, title: 'Singing in prison' },
      { book: 'Acts', chapter: 27, title: 'Shipwrecked' },
      { book: 'Philippians', chapter: 3, title: 'Knowing Christ' },
      { book: '2 Timothy', chapter: 4, title: 'Finishing the race' },
    ],
  },
];

export function getCharacter(id: string): BibleCharacter | undefined {
  return BIBLE_CHARACTERS.find(c => c.id === id);
}
