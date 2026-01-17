export interface UserProfile {
  id: string;
  name: string;
  email: string;
  persona: {
    code: string;
    title: string;
    description: string;
  };
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface UserStats {
  daysActive: number;
  conversationCount: number;
  insightsCount: number;
}

export interface Insight {
  id: string;
  date: string;
  title: string;
  preview: string;
  category: 'pattern' | 'cultural' | 'personal' | 'theological';
  fullContent?: string;
}

export const CATEGORY_LABELS: Record<Insight['category'], string> = {
  pattern: 'Pattern Discovery',
  cultural: 'Cultural Context',
  personal: 'Personal Growth',
  theological: 'Theological Insight',
};

export const PERSONA_GREETINGS: Record<string, string> = {
  'believer_going_deeper': "Ready to discover deeper insights today?",
  'new_to_faith': "Let's explore together",
  'visual_learner': "What will you discover today?",
  'pastor_leader': "Ready to prepare and equip?",
  'seminary_student': "Let's dive into the depths today",
  'exploring_faith': "Your questions are welcome here",
  default: "Your spiritual formation journey continues",
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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
