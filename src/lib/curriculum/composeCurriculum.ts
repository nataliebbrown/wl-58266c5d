import type { Curriculum, Phase, Module } from '@/types/curriculum';
import type { QuizData } from '@/lib/onboardingState';
import { foundationsCurriculum } from './foundations';
import { deeperWalkCurriculum } from './deeperWalk';
import { pastoralLeadershipCurriculum } from './pastoralLeadership';
import { theologicalStudiesCurriculum } from './theologicalStudies';
import { exploringFaithCurriculum } from './exploringFaith';

// ============ Base Template Selection ============

function getBaseCurriculum(spiritualBackground: string | null): Curriculum {
  switch (spiritualBackground) {
    case 'new_to_faith':
      return foundationsCurriculum;
    case 'believer_going_deeper':
      return deeperWalkCurriculum;
    case 'pastor_leader':
      return pastoralLeadershipCurriculum;
    case 'seminary_student':
      return theologicalStudiesCurriculum;
    case 'exploring_faith':
      return exploringFaithCurriculum;
    default:
      return foundationsCurriculum;
  }
}

// ============ Season-Based Module Reordering ============

// Maps currentSeason to keywords that identify priority modules
const SEASON_PRIORITY_KEYWORDS: Record<string, string[]> = {
  deeper_relationship: [
    'intimate', 'abiding', 'prayer', 'devotional', 'spiritual formation',
    'presence', 'contemplative', 'interior', 'worship',
  ],
  questions_doubts: [
    'apologetics', 'evidence', 'doubt', 'questions', 'worldview',
    'obstacles', 'objections', 'wrestling', 'faith and science',
  ],
  difficult_situation: [
    'suffering', 'grief', 'trials', 'comfort', 'healing', 'crisis',
    'anxiety', 'loss', 'pastoral care', 'navigating',
  ],
  ministry_preparation: [
    'leadership', 'preaching', 'ministry', 'church planting', 'evangelism',
    'discipleship', 'missions', 'teaching', 'pastoral',
  ],
  understand_bible: [
    'bible', 'scripture', 'old testament', 'new testament', 'hermeneutics',
    'exegesis', 'gospel', 'epistle', 'pentateuch', 'prophets',
  ],
  spiritual_growth: [
    'sanctification', 'spiritual disciplines', 'character', 'holiness',
    'fruit of the spirit', 'formation', 'growth', 'maturity',
  ],
};

function moduleMatchesSeason(mod: Module, season: string): boolean {
  const keywords = SEASON_PRIORITY_KEYWORDS[season] || [];
  const searchText = `${mod.title} ${mod.description}`.toLowerCase();
  return keywords.some(kw => searchText.includes(kw));
}

function reorderModulesForSeason(phases: Phase[], season: string | null): Phase[] {
  if (!season) return phases;

  return phases.map(phase => {
    const prioritized: Module[] = [];
    const rest: Module[] = [];

    for (const mod of phase.modules) {
      if (moduleMatchesSeason(mod, season)) {
        prioritized.push(mod);
      } else {
        rest.push(mod);
      }
    }

    return {
      ...phase,
      modules: [...prioritized, ...rest],
    };
  });
}

// ============ Learning Style Adaptations ============

const LEARNING_STYLE_APPROACHES: Record<string, string> = {
  reading_reflection:
    'This curriculum is designed for deep reading and personal reflection. Take time to journal your thoughts on each lesson and meditate on the Scripture passages.',
  visual:
    'This curriculum includes visual aids and diagrams where possible. Look for charts, maps, and visual representations to help you grasp each concept.',
  conversation:
    'This curriculum is best experienced through dialogue. Use the Sophia chat feature to discuss each lesson, ask questions, and think through ideas together.',
  hands_on:
    'This curriculum emphasizes practical application. Each lesson includes actionable steps you can apply to your daily life right away.',
  patterns:
    'This curriculum highlights connections and patterns across Scripture and theology. Look for the threads that tie concepts together across lessons.',
};

const LEARNING_STYLE_PRACTICES: Record<string, string[]> = {
  reading_reflection: [
    'Journal your reflections after each lesson',
    'Read recommended books alongside your study',
    'Meditate on key Scripture passages throughout the week',
  ],
  visual: [
    'Create mind maps connecting concepts from each module',
    'Use the Bible pane to follow along with every reference',
    'Sketch diagrams to visualize theological relationships',
  ],
  conversation: [
    'Discuss each lesson with Sophia to deepen understanding',
    'Share what you are learning with a friend or study partner',
    'Ask follow-up questions whenever something is unclear',
  ],
  hands_on: [
    'Identify one practical application from each lesson',
    'Practice a new spiritual discipline each week',
    'Serve others as an expression of what you are learning',
  ],
  patterns: [
    'Look for recurring themes across lessons and modules',
    'Cross-reference Scripture passages to trace ideas through the Bible',
    'Build a personal theology document as you progress',
  ],
};

// ============ Community Preference Adaptations ============

const COMMUNITY_LABELS: Record<string, string> = {
  individual: 'individual study',
  small_group: 'small group discussion',
  facilitator: 'group facilitation',
  seeking_community: 'community connection',
  mixed: 'flexible study',
};

// ============ Persona Intro Generation ============

function buildPersonaIntro(quizData: QuizData, baseCurriculum: Curriculum): string {
  const name = quizData.name || 'friend';
  const communityLabel = COMMUNITY_LABELS[quizData.communityPreference || 'individual'] || 'personal study';

  const seasonIntros: Record<string, string> = {
    deeper_relationship: `We've prioritized content that will deepen your relationship with God.`,
    questions_doubts: `We've surfaced lessons that address questions and doubts honestly.`,
    difficult_situation: `We've brought comfort-focused and healing-centered lessons to the front.`,
    ministry_preparation: `We've highlighted ministry and leadership content for your calling.`,
    understand_bible: `We've emphasized Bible study and biblical literacy throughout.`,
    spiritual_growth: `We've focused on spiritual growth and character formation.`,
  };

  const seasonNote = seasonIntros[quizData.currentSeason || ''] || '';

  return `Welcome, ${name}. ${baseCurriculum.personaIntro} This curriculum is tailored for ${communityLabel}. ${seasonNote}`.trim();
}

// ============ Main Composition Function ============

export function composeCurriculum(quizData: QuizData): Curriculum {
  const base = getBaseCurriculum(quizData.spiritualBackground);

  // Deep clone to avoid mutating the base
  const curriculum: Curriculum = JSON.parse(JSON.stringify(base));

  // Reorder modules based on current season
  curriculum.phases = reorderModulesForSeason(curriculum.phases, quizData.currentSeason);

  // Set personalized intro
  curriculum.personaIntro = buildPersonaIntro(quizData, base);

  // Set learning approach based on learning style
  curriculum.learningApproach =
    LEARNING_STYLE_APPROACHES[quizData.learningStyle || 'reading_reflection'] ||
    LEARNING_STYLE_APPROACHES.reading_reflection;

  // Add learning-style-specific reflective practices to each module
  const practices =
    LEARNING_STYLE_PRACTICES[quizData.learningStyle || 'reading_reflection'] ||
    LEARNING_STYLE_PRACTICES.reading_reflection;

  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      mod.reflectivePractices = [
        ...(mod.reflectivePractices || []),
        ...practices,
      ];
    }
  }

  return curriculum;
}

// ============ Utility ============

export function getCurriculumForUser(quizData: QuizData): Curriculum {
  return composeCurriculum(quizData);
}
