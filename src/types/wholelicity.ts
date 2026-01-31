// Wholelicity Design System Types

export interface PersonaData {
  spiritualBackground: string;
  learningStyle: string;
  communityPreference: string;
  currentSeason: string;
}

export interface SpiritualJourney {
  currentPhase: string;
  milestones: Milestone[];
  streak: number;
  totalDays: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completedAt?: string;
  icon: string;
}

export interface SophiaMessage {
  id: string;
  content: string;
  type: 'greeting' | 'insight' | 'prompt' | 'reflection';
  timestamp: string;
}

export interface FormationSuggestion {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'conversation' | 'reflection' | 'exploration' | 'community';
  relatedModule: ModuleType;
}

export type ModuleType = 
  | 'formation' 
  | 'wisdom' 
  | 'community' 
  | 'patterns' 
  | 'timewalk' 
  | 'translation';

export interface ModuleActivity {
  module: ModuleType;
  lastActive: string;
  recentInsight?: string;
  progress?: number;
}

export interface RecentInsight {
  id: string;
  title: string;
  preview: string;
  source: ModuleType;
  timestamp: string;
  category: 'pattern' | 'cultural' | 'personal' | 'theological';
}

// Persona-specific dashboard configurations
export const PERSONA_CONFIGS: Record<string, {
  name: string;
  greeting: string;
  primaryAction: string;
  primaryActionLabel: string;
  suggestedModules: ModuleType[];
  dashboardEmphasis: 'exploration' | 'depth' | 'community' | 'leadership';
}> = {
  'new_to_faith': {
    name: 'The Curious Explorer',
    greeting: "Let's explore together at your own pace",
    primaryAction: '/chat',
    primaryActionLabel: 'Ask Sophia Anything',
    suggestedModules: ['wisdom', 'formation', 'community'],
    dashboardEmphasis: 'exploration',
  },
  'believer_going_deeper': {
    name: 'The Holistic Veteran',
    greeting: 'Ready to discover deeper insights today?',
    primaryAction: '/chat',
    primaryActionLabel: 'Explore with Sophia',
    suggestedModules: ['patterns', 'wisdom', 'translation'],
    dashboardEmphasis: 'depth',
  },
  'pastor_leader': {
    name: 'The Ministry Leader',
    greeting: 'Ready to prepare and equip?',
    primaryAction: '/chat',
    primaryActionLabel: 'Start Conversation',
    suggestedModules: ['wisdom', 'community', 'patterns'],
    dashboardEmphasis: 'leadership',
  },
  'seminary_student': {
    name: 'The Scholar',
    greeting: "Let's dive into the depths today",
    primaryAction: '/chat',
    primaryActionLabel: 'Deep Dialogue',
    suggestedModules: ['patterns', 'translation', 'wisdom'],
    dashboardEmphasis: 'depth',
  },
  'exploring_faith': {
    name: 'The Seeker',
    greeting: 'Your questions are welcome here',
    primaryAction: '/chat',
    primaryActionLabel: 'Begin Exploring',
    suggestedModules: ['wisdom', 'formation', 'timewalk'],
    dashboardEmphasis: 'exploration',
  },
  default: {
    name: 'Friend',
    greeting: 'Your spiritual formation journey continues',
    primaryAction: '/chat',
    primaryActionLabel: 'Continue with Sophia',
    suggestedModules: ['wisdom', 'formation', 'patterns'],
    dashboardEmphasis: 'exploration',
  },
};

export const MODULE_INFO: Record<ModuleType, {
  name: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
}> = {
  formation: {
    name: 'Formation Hub',
    description: 'Your spiritual growth command center',
    icon: 'compass',
    color: '#746653', // Olive Wood
    available: true,
  },
  wisdom: {
    name: 'Wisdom Guide',
    description: 'Conversations with Sophia',
    icon: 'sparkles',
    color: '#8A7356', // Faded Copper
    available: true,
  },
  community: {
    name: 'Community',
    description: 'Grow together with others',
    icon: 'users',
    color: '#5A4C3A', // Stone Brown
    available: false,
  },
  patterns: {
    name: 'Pattern Explorer',
    description: 'Discover biblical connections',
    icon: 'network',
    color: '#C5B49B', // Khaki Beige
    available: false,
  },
  timewalk: {
    name: 'TimeWalk',
    description: 'Experience biblical history',
    icon: 'clock',
    color: '#746653', // Olive Wood
    available: false,
  },
  translation: {
    name: 'Translation Bridge',
    description: 'Cross-cultural understanding',
    icon: 'globe',
    color: '#8A7356', // Faded Copper
    available: false,
  },
};

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
