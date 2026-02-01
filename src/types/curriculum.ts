// ============ Curriculum Data Model ============

export interface KeyPoint {
  title: string;
  description: string;
}

export type ExerciseType = 'reflection' | 'translation' | 'analysis' | 'application' | 'discussion' | 'research';
export type ResourceType = 'book' | 'article' | 'video' | 'website' | 'podcast';

export interface Exercise {
  title: string;
  type: ExerciseType;
  instructions: string;
}

export interface Resource {
  title: string;
  type: ResourceType;
  author?: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  scriptureRefs?: ScriptureRef[];
  recommendedReading?: string[];
  estimatedMinutes?: number;
  objectives?: string[];
  keyPoints?: KeyPoint[];
  teachingContent?: string;
  reflectionQuestions?: string[];
  practicalApplication?: string[];
  exercises?: Exercise[];
  resources?: Resource[];
}

export interface ScriptureRef {
  label: string;   // e.g. "John 15:1-17"
  book: string;    // e.g. "John"
  chapter: number; // e.g. 15
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration?: string; // e.g. "Months 1-2"
  sections: Section[];
  reflectivePractices?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PhaseOverviewData {
  overviewDescription: string;
  expectations: string[];
  skillLevel: string;
  faq: FAQ[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  duration?: string; // e.g. "Foundation Year"
  modules: Module[];
  overview?: PhaseOverviewData;
}

export interface Curriculum {
  id: string;
  title: string;
  description: string;
  personaIntro: string;
  learningApproach: string;
  phases: Phase[];
}

// ============ Progress Tracking ============

export interface CurriculumProgress {
  completedLessons: string[]; // lesson IDs
  currentLessonId: string | null;
  lastAccessedAt: string;
  startedAt: string;
}

// ============ Composition ============

export type SpiritualBackground =
  | 'new_to_faith'
  | 'believer_going_deeper'
  | 'pastor_leader'
  | 'seminary_student'
  | 'exploring_faith';

export type LearningStyle =
  | 'reading_reflection'
  | 'visual'
  | 'conversation'
  | 'hands_on'
  | 'patterns';

export type CommunityPreference =
  | 'individual'
  | 'small_group'
  | 'facilitator'
  | 'seeking_community'
  | 'mixed';

export type CurrentSeason =
  | 'deeper_relationship'
  | 'questions_doubts'
  | 'difficult_situation'
  | 'ministry_preparation'
  | 'understand_bible'
  | 'spiritual_growth';
