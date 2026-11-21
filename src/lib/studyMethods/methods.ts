// ============ Study methods ============
//
// Each method is a short list of steps. A single study-session screen walks
// through whichever method is chosen, so adding a method is just data.
// Every method includes a "reveals-god" step (WL's God-centered lens), whose
// answers can be added to Portraits of God.

export type StepKind =
  /** Free writing */
  | 'write'
  /** What does this reveal about God? — writing + attribute tags for Portraits */
  | 'reveals-god'
  /** Tap one verse in the passage (SOAP "Scripture") */
  | 'pick-verse'
  /** Tap one word in the passage (Word study) */
  | 'pick-word'
  /** Other places the chosen word appears (Word study) */
  | 'word-occurrences'
  /** Original-language lookup for the chosen word (Word study) */
  | 'word-original'
  /** Passage read aloud, then a short response (Lectio Divina) */
  | 'listen'
  /** Quiet, timed rest with an optional note (Lectio Divina) */
  | 'rest';

export interface StudyStep {
  id: string;
  kind: StepKind;
  title: string;
  /** The question for this step. "{person}", "{word}", "{passage}" are filled in. */
  prompt: string;
  /** Guidance shown under the question */
  hint?: string;
  placeholder?: string;
  /** For 'listen' (which reading) and 'rest' (seconds) */
  reading?: number;
  seconds?: number;
}

export interface StudyMethod {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  minutes: string;
  /** What the method is and how it works */
  about: string;
  steps: StudyStep[];
}

const REVEALS_GOD_HINT =
  'Look for His character (faithful, holy, merciful…), His promises, His actions, and how He is revealed in Christ.';

export const STUDY_METHODS: StudyMethod[] = [
  {
    id: 'soap',
    name: 'SOAP',
    tagline: 'Scripture · Observation · Application · Prayer',
    bestFor: 'a focused daily time with one verse',
    minutes: '10–15 min',
    about:
      'SOAP slows you down to sit with one verse. Choose a verse that stands out, notice what it says, see what it shows you about God, consider how to respond, and close in prayer.',
    steps: [
      {
        id: 'scripture',
        kind: 'pick-verse',
        title: 'Scripture',
        prompt: 'Read {passage}. Which verse stands out to you?',
        hint: 'Tap a verse in the passage to choose it.',
      },
      {
        id: 'observation',
        kind: 'write',
        title: 'Observation',
        prompt: 'What do you notice in this verse?',
        hint: 'Key words, who is speaking, what is happening, and how it connects to the verses around it.',
        placeholder: 'I notice…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'What it shows about God',
        prompt: 'What does this verse reveal about God?',
        hint: REVEALS_GOD_HINT,
        placeholder: 'God is…',
      },
      {
        id: 'application',
        kind: 'write',
        title: 'Application',
        prompt: 'In light of who God is here, how will you respond?',
        hint: 'Think trust, worship, obedience, or repentance — something concrete for today.',
        placeholder: 'Today I will…',
      },
      {
        id: 'prayer',
        kind: 'write',
        title: 'Prayer',
        prompt: 'Write a short prayer in response.',
        hint: 'Praise Him for who He is, then ask for His help to respond.',
        placeholder: 'Lord…',
      },
    ],
  },
  {
    id: 'inductive',
    name: 'Inductive',
    tagline: 'Observe · Interpret · Respond',
    bestFor: 'really understanding a passage',
    minutes: '20–30 min',
    about:
      'The inductive method studies a passage carefully on its own terms: first observe what it says, then interpret what it meant to its first readers, then see what it reveals about God, and finally respond.',
    steps: [
      {
        id: 'observe',
        kind: 'write',
        title: 'Observe',
        prompt: 'What does {passage} say?',
        hint: 'Who? What? Where? When? Look for repeated words, contrasts, commands, and promises.',
        placeholder: 'Who: …\nWhat happens: …\nRepeated words: …',
      },
      {
        id: 'interpret',
        kind: 'write',
        title: 'Interpret',
        prompt: 'What did this mean to its original audience?',
        hint: 'Consider the historical setting and the surrounding chapters. Study mode’s notes and cross-references can help.',
        placeholder: 'For the first readers, this meant…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'What it reveals about God',
        prompt: 'What does this passage reveal about God?',
        hint: REVEALS_GOD_HINT,
        placeholder: 'God is…',
      },
      {
        id: 'respond',
        kind: 'write',
        title: 'Respond',
        prompt: 'How will you respond to this God?',
        hint: 'Let your response flow from who He is — worship, trust, obedience, or repentance.',
        placeholder: 'I will…',
      },
    ],
  },
  {
    id: 'lectio',
    name: 'Lectio Divina',
    tagline: 'Read · Reflect · Pray · Rest',
    bestFor: 'slowing down and listening to God',
    minutes: '~15 min',
    about:
      'Lectio Divina ("divine reading") is an ancient, unhurried way of reading. You hear the passage three times — listening for what God is saying — then respond in prayer and rest quietly in His presence.',
    steps: [
      {
        id: 'read',
        kind: 'listen',
        reading: 1,
        title: 'Read',
        prompt: 'Listen to {passage}. What word or phrase stands out?',
        hint: 'Listen slowly. Don’t analyze yet — just notice what draws your attention.',
        placeholder: 'A word or phrase…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'Reflect',
        prompt: 'Listen again. What does this word or phrase show you about God?',
        hint: 'Stay with the words. What is God saying about Himself here?',
        placeholder: 'God is…',
        reading: 2,
      },
      {
        id: 'pray',
        kind: 'listen',
        reading: 3,
        title: 'Pray',
        prompt: 'Listen a third time, then respond to God in prayer.',
        hint: 'Speak to Him honestly — thanks, praise, confession, or a request.',
        placeholder: 'Lord…',
      },
      {
        id: 'rest',
        kind: 'rest',
        seconds: 90,
        title: 'Rest',
        prompt: 'Rest quietly in God’s presence.',
        hint: 'No words needed. When your mind wanders, return to the phrase that stood out.',
        placeholder: 'Anything you want to remember (optional)',
      },
    ],
  },
  {
    id: 'character',
    name: 'Character study',
    tagline: 'God at work in a life',
    bestFor: 'following a person through Scripture',
    minutes: '15–20 min per passage',
    about:
      'Follow one person through key passages. The focus stays on God as the hero of their story: what He did in and through them, and how He stayed faithful even when they failed.',
    steps: [
      {
        id: 'who',
        kind: 'write',
        title: 'Who',
        prompt: 'What do you learn about {person} in {passage}?',
        hint: 'Their situation, choices, words, and relationships.',
        placeholder: '{person} is…',
      },
      {
        id: 'god-at-work',
        kind: 'write',
        title: 'God at work',
        prompt: 'What does God do in and through {person} here?',
        hint: 'Look for God’s initiative — His calling, provision, protection, correction, or promises.',
        placeholder: 'God…',
      },
      {
        id: 'faithfulness',
        kind: 'write',
        title: 'Weakness & faithfulness',
        prompt: 'Where does {person} struggle or fail, and how is God faithful anyway?',
        hint: 'Every character in Scripture is flawed except Jesus. Notice how God’s faithfulness carries the story.',
        placeholder: '{person} struggles with… yet God…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'What it reveals about God',
        prompt: 'What does this part of {person}’s story reveal about God?',
        hint: REVEALS_GOD_HINT,
        placeholder: 'God is…',
      },
      {
        id: 'respond',
        kind: 'write',
        title: 'Respond',
        prompt: 'How does this move you to trust or follow God?',
        placeholder: 'I will…',
      },
    ],
  },
  {
    id: 'word',
    name: 'Word study',
    tagline: 'One word, traced through Scripture',
    bestFor: 'going deep on a key term',
    minutes: '10–20 min',
    about:
      'Pick one important word, see where else it appears, look up its original Hebrew or Greek meaning, and consider what it reveals about God.',
    steps: [
      {
        id: 'pick',
        kind: 'pick-word',
        title: 'Choose a word',
        prompt: 'Which word in {passage} do you want to study?',
        hint: 'Tap a word in the passage. Words about God, salvation, or covenant are good places to start.',
      },
      {
        id: 'occurrences',
        kind: 'word-occurrences',
        title: 'Where else it appears',
        prompt: 'Where else does “{word}” appear? What do you notice?',
        hint: 'Look at a few of the passages below. How is the word used?',
        placeholder: 'Across these passages, “{word}”…',
      },
      {
        id: 'original',
        kind: 'word-original',
        title: 'Original meaning',
        prompt: 'What does the original Hebrew or Greek word mean?',
        hint: 'Look it up below, or ask Sophia. Note the meaning in your own words.',
        placeholder: 'The original word means…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'What it reveals about God',
        prompt: 'What does “{word}” reveal about God?',
        hint: REVEALS_GOD_HINT,
        placeholder: 'God is…',
      },
      {
        id: 'respond',
        kind: 'write',
        title: 'Respond',
        prompt: 'How will this word shape how you trust or follow God?',
        placeholder: 'I will…',
      },
    ],
  },
  {
    id: 'discovery',
    name: 'Discovery Bible Study',
    tagline: 'God · People · Obey · Share',
    bestFor: 'simple, practical study (great for groups)',
    minutes: '15–20 min',
    about:
      'Discovery Bible Study asks a few simple questions of every passage, starting with what it teaches about God. It works just as well alone as it does in a group.',
    steps: [
      {
        id: 'retell',
        kind: 'write',
        title: 'Retell',
        prompt: 'Retell {passage} in your own words.',
        hint: 'Imagine explaining it to a friend who has never read it.',
        placeholder: 'In this passage…',
      },
      {
        id: 'god',
        kind: 'reveals-god',
        title: 'About God',
        prompt: 'What does this passage teach about God?',
        hint: REVEALS_GOD_HINT,
        placeholder: 'God is…',
      },
      {
        id: 'people',
        kind: 'write',
        title: 'About people',
        prompt: 'What does this passage teach about people?',
        placeholder: 'People…',
      },
      {
        id: 'obey',
        kind: 'write',
        title: 'Obey',
        prompt: 'How will you obey God in response?',
        hint: 'Make it specific — “I will…”',
        placeholder: 'I will…',
      },
      {
        id: 'share',
        kind: 'write',
        title: 'Share',
        prompt: 'Who will you share this with this week?',
        placeholder: 'I’ll share it with…',
      },
    ],
  },
];

export function getMethod(id: string): StudyMethod | undefined {
  return STUDY_METHODS.find(m => m.id === id);
}

/** Fill "{person}", "{word}", "{passage}" placeholders. */
export function fillTemplate(text: string, vars: { person?: string; word?: string; passage?: string }): string {
  return text
    .replace(/\{person\}/g, vars.person || 'this person')
    .replace(/\{word\}/g, vars.word || 'this word')
    .replace(/\{passage\}/g, vars.passage || 'the passage');
}
