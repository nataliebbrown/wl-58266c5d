import { getPersonaName, getPersonaKey } from '@/lib/personaNames';

export type SpiritualBackground =
  | 'new_to_faith'
  | 'believer_going_deeper'
  | 'pastor_leader'
  | 'seminary_student'
  | 'exploring_faith';

export type LearningStyle = 
  | 'reading_reflection'
  | 'visual_learner'
  | 'conversation_discussion'
  | 'hands_on_interactive'
  | 'connections_patterns';

export type CommunityPreference = 
  | 'individual_study'
  | 'small_group'
  | 'group_leader'
  | 'seeking_community'
  | 'both_personal_group';

export type CurrentSeason = 
  | 'deeper_relationship'
  | 'questions_doubts'
  | 'difficult_situation'
  | 'ministry_preparation'
  | 'understand_bible'
  | 'spiritual_growth';

export interface OnboardingData {
  spiritualBackground: SpiritualBackground | null;
  learningStyle: LearningStyle | null;
  communityPreference: CommunityPreference | null;
  currentSeason: CurrentSeason | null;
}

export interface PersonaResult {
  code: string;
  title: string;
  description: string;
}

export const PERSONA_TITLES: Record<SpiritualBackground, string> = {
  new_to_faith: 'The Curious Seeker',
  believer_going_deeper: 'The Devoted Explorer',
  pastor_leader: 'The Shepherd Guide',
  seminary_student: 'The Scholar Pilgrim',
  exploring_faith: 'The Thoughtful Questioner',
};

export const LEARNING_MODIFIERS: Record<LearningStyle, string> = {
  reading_reflection: 'Contemplative',
  visual_learner: 'Visual',
  conversation_discussion: 'Dialogical',
  hands_on_interactive: 'Experiential',
  connections_patterns: 'Systematic',
};

/** Sensible defaults used when a user skips quiz questions. */
export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  spiritualBackground: 'exploring_faith',
  learningStyle: 'reading_reflection',
  communityPreference: 'both_personal_group',
  currentSeason: 'spiritual_growth',
};

export function calculatePersona(data: OnboardingData): PersonaResult | null {
  if (!data.spiritualBackground || !data.learningStyle) {
    return null;
  }

  // Use defaults for any missing dimensions
  const bg = data.spiritualBackground;
  const ls = data.learningStyle;
  const cp = data.communityPreference ?? DEFAULT_ONBOARDING_DATA.communityPreference!;
  const cs = data.currentSeason ?? DEFAULT_ONBOARDING_DATA.currentSeason!;

  const code = getPersonaKey(bg, ls, cp, cs);
  const title = getPersonaName(bg, ls, cp, cs);

  return {
    code,
    title,
    description: getPersonaDescription(data),
  };
}

function getPersonaDescription(data: OnboardingData): string {
  const descriptions: Record<SpiritualBackground, string> = {
    new_to_faith: "You're beginning an exciting journey of faith discovery. WL will be your patient guide, introducing you to the richness of Scripture in accessible, meaningful ways.",
    believer_going_deeper: "You've walked with God for years and hunger for more. WL will help you uncover fresh insights and deeper connections in familiar passages.",
    pastor_leader: "As a shepherd of God's people, you need robust tools. WL will enhance your sermon preparation, counseling, and teaching with scholarly resources.",
    seminary_student: "Your academic pursuit of theology is noble. WL will support your studies with original language tools, historical context, and theological connections.",
    exploring_faith: "Your questions are welcome here. WL will create a safe space to explore, investigate, and discover truth at your own pace.",
  };

  return descriptions[data.spiritualBackground!];
}
