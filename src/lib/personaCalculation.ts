import type {
  SpiritualBackground,
  LearningStyle,
  CommunityPreference,
  CurrentSeason,
  OnboardingData,
} from '@/types/onboarding';
import type { PersonaCode } from './personas';
import { getPersonaName, getPersonaKey } from './personaNames';

// ============ Types ============

export interface CalculatedPersona {
  code: PersonaCode;
  /** Modifier derived from learning style (e.g. "Contemplative", "Visual"). */
  modifier: string;
  /** Combined display title from the 750-persona map (e.g. "The Quiet Seeker"). */
  displayTitle: string;
  /** The persona key (e.g. "NEW-READ-SOLO-RELATIONSHIP"). */
  personaKey: string;
  /** Confidence 0-1 — higher means the quiz answers pointed strongly to one persona. */
  confidence: number;
}

// ============ Mappings ============

/** Base persona from spiritual background alone. */
const BACKGROUND_TO_BASE: Record<SpiritualBackground, PersonaCode> = {
  new_to_faith: 'curious-seeker',
  believer_going_deeper: 'devoted-explorer',
  pastor_leader: 'shepherd-guide',
  seminary_student: 'scholar-pilgrim',
  exploring_faith: 'thoughtful-questioner',
};

const LEARNING_MODIFIER: Record<LearningStyle, string> = {
  reading_reflection: 'Contemplative',
  visual_learner: 'Visual',
  conversation_discussion: 'Dialogical',
  hands_on_interactive: 'Experiential',
  connections_patterns: 'Systematic',
};

// ============ Override Rules ============
// Certain season + background combinations override the base persona.

interface OverrideRule {
  season: CurrentSeason;
  backgrounds: SpiritualBackground[] | '*';
  result: PersonaCode;
  boost: number; // additional confidence for this override
}

const OVERRIDE_RULES: OverrideRule[] = [
  // Walking through difficulty → Wounded Healer, regardless of background
  {
    season: 'difficult_situation',
    backgrounds: '*',
    result: 'wounded-healer',
    boost: 0.15,
  },
  // Spiritual growth + new-to-faith stays curious-seeker (no override)
  // Spiritual growth + established believer → formation-seeker
  {
    season: 'spiritual_growth',
    backgrounds: ['believer_going_deeper', 'pastor_leader'],
    result: 'formation-seeker',
    boost: 0.1,
  },
  // Deeper relationship + exploring → formation-seeker
  {
    season: 'deeper_relationship',
    backgrounds: ['exploring_faith', 'believer_going_deeper'],
    result: 'formation-seeker',
    boost: 0.1,
  },
];

// ============ Calculation ============

/**
 * Calculate the user's persona from their quiz answers.
 * Uses a layered approach:
 * 1. Spiritual background sets the base persona.
 * 2. Current season can override if a stronger match exists.
 * 3. Learning style adds a modifier (does not change base persona).
 * 4. Community preference affects confidence weighting.
 */
export function calculatePersonaFromQuiz(data: OnboardingData): CalculatedPersona {
  const background = data.spiritualBackground ?? 'exploring_faith';
  const learningStyle = data.learningStyle ?? 'reading_reflection';
  const season = data.currentSeason ?? 'spiritual_growth';
  const community = data.communityPreference ?? 'both_personal_group';

  // Step 1: Base from spiritual background
  let code: PersonaCode = BACKGROUND_TO_BASE[background];
  let confidence = 0.7; // base confidence

  // Step 2: Check season overrides
  for (const rule of OVERRIDE_RULES) {
    if (rule.season !== season) continue;
    if (rule.backgrounds === '*' || rule.backgrounds.includes(background)) {
      code = rule.result;
      confidence += rule.boost;
      break; // first matching rule wins
    }
  }

  // Step 3: Confidence adjustments from consistency signals
  // If community preference aligns with persona emphasis, boost confidence
  confidence += communityAlignmentBoost(code, community);

  // Cap at 1.0
  confidence = Math.min(1.0, confidence);

  // Step 4: Build display title from 750-persona map
  const modifier = LEARNING_MODIFIER[learningStyle];
  const displayTitle = getPersonaName(background, learningStyle, community, season);
  const personaKey = getPersonaKey(background, learningStyle, community, season);

  return { code, modifier, displayTitle, personaKey, confidence };
}

// ============ Helpers ============

function getBaseTitle(code: PersonaCode): string {
  const titles: Record<PersonaCode, string> = {
    'curious-seeker': 'Curious Seeker',
    'devoted-explorer': 'Devoted Explorer',
    'shepherd-guide': 'Shepherd Guide',
    'scholar-pilgrim': 'Scholar Pilgrim',
    'thoughtful-questioner': 'Thoughtful Questioner',
    'wounded-healer': 'Wounded Healer',
    'formation-seeker': 'Formation Seeker',
  };
  return titles[code];
}

function communityAlignmentBoost(
  code: PersonaCode,
  community: CommunityPreference
): number {
  // Shepherd-guide aligns with group_leader
  if (code === 'shepherd-guide' && community === 'group_leader') return 0.1;
  // Thoughtful-questioner often prefers individual study
  if (code === 'thoughtful-questioner' && community === 'individual_study') return 0.05;
  // Wounded-healer may seek community or individual
  if (code === 'wounded-healer' && community === 'seeking_community') return 0.05;
  // Formation-seeker aligns with both personal and group
  if (code === 'formation-seeker' && community === 'both_personal_group') return 0.05;
  return 0;
}
