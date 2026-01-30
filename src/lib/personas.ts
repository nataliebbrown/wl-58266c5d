import type { ModuleType } from '@/types/wholelicity';

// ============ Types ============

export type PersonaCode =
  | 'curious-seeker'
  | 'devoted-explorer'
  | 'shepherd-guide'
  | 'scholar-pilgrim'
  | 'thoughtful-questioner'
  | 'wounded-healer'
  | 'formation-seeker';

export interface PersonaConfig {
  code: PersonaCode;
  title: string;
  subtitle: string;
  description: string;

  /** Tone Sophia should adopt for this persona. */
  sophiaTone: string;
  /** Primary CTA label on dashboard. */
  primaryActionLabel: string;
  /** Suggested modules in priority order. */
  suggestedModules: ModuleType[];
  /** Dashboard emphasis drives card ordering / highlight. */
  dashboardEmphasis: 'exploration' | 'depth' | 'community' | 'leadership' | 'healing';
  /** Scripture-reading starting point suggestion. */
  bibleStartingPoint: { book: string; chapter: number; label: string };
  /** Short spiritual encouragement. */
  encouragement: string;
}

// ============ Persona Definitions ============

const PERSONAS: Record<PersonaCode, PersonaConfig> = {
  'curious-seeker': {
    code: 'curious-seeker',
    title: 'The Curious Seeker',
    subtitle: 'Beginning a faith journey',
    description:
      "You're at the start of something beautiful. Sophia will walk alongside you patiently, introducing Scripture and faith without pressure.",
    sophiaTone: 'warm, patient, uses everyday language, avoids jargon',
    primaryActionLabel: 'Ask Sophia Anything',
    suggestedModules: ['wisdom', 'formation', 'community'],
    dashboardEmphasis: 'exploration',
    bibleStartingPoint: { book: 'John', chapter: 1, label: 'The Gospel of John' },
    encouragement: 'Every great journey starts with a single step. Yours has already begun.',
  },

  'devoted-explorer': {
    code: 'devoted-explorer',
    title: 'The Devoted Explorer',
    subtitle: 'Going deeper in faith',
    description:
      'You have a rich foundation and hunger for more. Sophia will help you uncover fresh insights and deeper connections in familiar passages.',
    sophiaTone: 'thoughtful, challenges gently, connects concepts, draws out patterns',
    primaryActionLabel: 'Explore with Sophia',
    suggestedModules: ['patterns', 'wisdom', 'translation'],
    dashboardEmphasis: 'depth',
    bibleStartingPoint: { book: 'Romans', chapter: 8, label: 'Romans 8 \u2014 Life in the Spirit' },
    encouragement: 'The same passage can reveal something new every time you return to it.',
  },

  'shepherd-guide': {
    code: 'shepherd-guide',
    title: 'The Shepherd Guide',
    subtitle: 'Leading and shepherding others',
    description:
      "As a shepherd of God's people, you carry a unique weight. Sophia will support your sermon preparation, counseling, and personal renewal.",
    sophiaTone: 'collaborative, resource-rich, respects calling, offers ministry-relevant application',
    primaryActionLabel: 'Start Conversation',
    suggestedModules: ['wisdom', 'community', 'patterns'],
    dashboardEmphasis: 'leadership',
    bibleStartingPoint: { book: 'Ezekiel', chapter: 34, label: 'Ezekiel 34 \u2014 The Shepherd Chapter' },
    encouragement: 'You pour out for others. Let God pour into you today.',
  },

  'scholar-pilgrim': {
    code: 'scholar-pilgrim',
    title: 'The Scholar Pilgrim',
    subtitle: 'Pursuing theological depth',
    description:
      'Your academic pursuit of theology is a form of worship. Sophia will support your studies with original languages, historical context, and theological connections.',
    sophiaTone: 'precise, engages with original languages, cites scholarship, explores nuance',
    primaryActionLabel: 'Deep Dialogue',
    suggestedModules: ['patterns', 'translation', 'wisdom'],
    dashboardEmphasis: 'depth',
    bibleStartingPoint: { book: 'Hebrews', chapter: 1, label: 'Hebrews \u2014 Christ in the Old Testament' },
    encouragement: 'Knowledge and devotion are not opposites \u2014 they are companions on the pilgrim road.',
  },

  'thoughtful-questioner': {
    code: 'thoughtful-questioner',
    title: 'The Thoughtful Questioner',
    subtitle: 'Exploring with honest questions',
    description:
      'Your questions are welcome here. Sophia will create a safe, no-agenda space for you to explore, investigate, and discover truth at your own pace.',
    sophiaTone: 'non-judgmental, honest, welcomes doubt, never pushy, presents evidence fairly',
    primaryActionLabel: 'Begin Exploring',
    suggestedModules: ['wisdom', 'formation', 'timewalk'],
    dashboardEmphasis: 'exploration',
    bibleStartingPoint: { book: 'Ecclesiastes', chapter: 1, label: 'Ecclesiastes \u2014 Honest Questions' },
    encouragement: 'Honest questions are not the enemy of faith \u2014 they are the doorway.',
  },

  'wounded-healer': {
    code: 'wounded-healer',
    title: 'The Wounded Healer',
    subtitle: 'Walking through a difficult season',
    description:
      "You're navigating pain or hardship. Sophia will be a gentle presence \u2014 not rushing to fix, but sitting with you in the tension and pointing toward hope.",
    sophiaTone: 'gentle, empathetic, validates emotions, sits with pain before pointing to hope',
    primaryActionLabel: 'Talk to Sophia',
    suggestedModules: ['wisdom', 'formation', 'community'],
    dashboardEmphasis: 'healing',
    bibleStartingPoint: { book: 'Psalms', chapter: 23, label: 'Psalm 23 \u2014 The Lord is My Shepherd' },
    encouragement: 'Even in the valley, you are not walking alone.',
  },

  'formation-seeker': {
    code: 'formation-seeker',
    title: 'The Formation Seeker',
    subtitle: 'Pursuing intentional spiritual growth',
    description:
      'You want to grow with intention. Sophia will help you build spiritual disciplines, connect insights across conversations, and notice patterns in your journey.',
    sophiaTone: 'encouraging, structured, celebrates progress, offers next-step suggestions',
    primaryActionLabel: 'Continue Growing',
    suggestedModules: ['formation', 'patterns', 'wisdom'],
    dashboardEmphasis: 'depth',
    bibleStartingPoint: { book: 'Philippians', chapter: 1, label: 'Philippians \u2014 Growing in Christ' },
    encouragement: 'Spiritual growth is not a race. It is a rhythm, and you are finding yours.',
  },
};

// ============ Accessors ============

export function getPersona(code: PersonaCode): PersonaConfig {
  return PERSONAS[code];
}

export function getAllPersonas(): PersonaConfig[] {
  return Object.values(PERSONAS);
}

export function getPersonaByTitle(title: string): PersonaConfig | undefined {
  return Object.values(PERSONAS).find(p => p.title === title);
}
