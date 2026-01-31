import { getTimePeriod, getTimeConfig, TimePeriod } from './timeAwareness';
import { getOnboardingState, getQuizData } from './onboardingState';

// ============ Types ============

export interface UserContext {
  lastVisit: Date | null;
  daysSinceVisit: number;
  recentThemes: string[];
  currentThread: string | null;
  questionsAsked: number;
  insightsSaved: number;
  persona: string | null;
  currentSeason: string | null;
  learningStyle: string | null;
  visitCount: number;
}

export interface CTAConfig {
  label: string;
  icon: string;
  action: 'continue' | 'new' | 'explore' | 'welcome' | 'bible';
}

// ============ Context Builder ============

/** Build a UserContext from localStorage / available data. */
export function getUserContext(): UserContext {
  const onboarding = getOnboardingState();
  const quiz = getQuizData();

  // Parse last visit
  let lastVisit: Date | null = null;
  let daysSinceVisit = 0;
  if (onboarding.lastVisitAt) {
    lastVisit = new Date(onboarding.lastVisitAt);
    daysSinceVisit = Math.floor(
      (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Get recent conversation themes from localStorage
  const recentThemes = getRecentThemes();

  // Get current thread title
  const currentThread = getCurrentThread();

  // Count insights saved
  const insightsSaved = getInsightCount();

  // Count questions asked (approximate from conversation count)
  const questionsAsked = getConversationCount();

  return {
    lastVisit,
    daysSinceVisit,
    recentThemes,
    currentThread,
    questionsAsked,
    insightsSaved,
    persona: quiz.spiritualBackground,
    currentSeason: quiz.currentSeason,
    learningStyle: quiz.learningStyle,
    visitCount: onboarding.visitCount,
  };
}

// ============ Dashboard Message ============

// ============ Persona-aware Messages ============

const PERSONA_MESSAGES: Record<string, string> = {
  new_to_faith: "Welcome to your journey. I'm here whenever you're ready to explore.",
  believer_going_deeper: "Ready to go deeper? I have some things I'd love to show you.",
  pastor_leader: "Let's find something that fuels your ministry today.",
  seminary_student: "What text are you wrestling with? Let's dig in together.",
  exploring_faith: "Bring your questions — there's no wrong place to start.",
};

/** Generate Sophia's contextual dashboard message based on user state. */
export function generateDashboardMessage(context: UserContext): string {
  // Returning after a long absence
  if (context.daysSinceVisit > 7) {
    return "It's been a while! I've missed our conversations...";
  }

  // Has an active thread
  if (context.currentThread) {
    return `Last time we were exploring "${context.currentThread}." Want to continue?`;
  }

  // Has recent themes
  if (context.recentThemes.length > 0) {
    return `You've been thinking about ${context.recentThemes[0]} lately. I see something beautiful forming...`;
  }

  // Persona-aware fallback
  if (context.persona && PERSONA_MESSAGES[context.persona]) {
    return PERSONA_MESSAGES[context.persona];
  }

  // Final fallback — time-based greeting
  const config = getTimeConfig();
  return config.greeting;
}

// ============ Contextual CTAs ============

// ============ Persona-aware CTAs ============

const PERSONA_CTAS: Record<string, { secondary: string; tertiary: string }> = {
  new_to_faith: { secondary: 'Try Something New', tertiary: 'Explore the Bible' },
  believer_going_deeper: { secondary: 'Something Fresh', tertiary: 'Deep Dive' },
  pastor_leader: { secondary: 'Prepare a Teaching', tertiary: 'Personal Study' },
  seminary_student: { secondary: 'New Research', tertiary: 'Exegetical Study' },
  exploring_faith: { secondary: 'Ask a Question', tertiary: 'Browse Scripture' },
};

/** Generate contextual CTA buttons for the hero card. */
export function getContextualCTAs(context: UserContext): CTAConfig[] {
  // Determine primary CTA
  let primary: CTAConfig;

  if (context.currentThread) {
    primary = {
      label: `Continue: ${truncate(context.currentThread, 20)}`,
      icon: '📖',
      action: 'continue',
    };
  } else if (context.daysSinceVisit > 7) {
    primary = {
      label: 'Welcome Back',
      icon: '👋',
      action: 'welcome',
    };
  } else {
    primary = {
      label: 'Continue Our Chat',
      icon: '📖',
      action: 'continue',
    };
  }

  const personaCtas = PERSONA_CTAS[context.persona ?? ''];

  return [
    primary,
    { label: personaCtas?.secondary ?? 'Something New', icon: '✨', action: 'new' },
    { label: personaCtas?.tertiary ?? 'Explore on My Own', icon: '🔍', action: 'explore' },
  ];
}

// ============ Contextual Scripture ============

/** Get a scripture verse that combines time-of-day with user context. */
export function getContextualScripture(
  context: UserContext,
  period?: TimePeriod
): { text: string; ref: string } {
  // For now, use time-based scripture. In the future, this could incorporate
  // user themes and journey stage for deeper personalization.
  const config = getTimeConfig(period ?? getTimePeriod());
  return config.scripture;
}

// ============ Helpers (localStorage readers) ============

function getRecentThemes(): string[] {
  try {
    const stored = localStorage.getItem('wholelicity-recent-themes');
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function getCurrentThread(): string | null {
  try {
    const stored = localStorage.getItem('wholelicity-current-thread');
    if (stored) return stored;
  } catch { /* ignore */ }
  return null;
}

function getInsightCount(): number {
  try {
    const stored = localStorage.getItem('wholelicity-user-profile');
    if (stored) {
      const profile = JSON.parse(stored);
      return profile.insights?.length ?? 0;
    }
  } catch { /* ignore */ }
  return 0;
}

function getConversationCount(): number {
  // This is an approximation — actual count comes from Supabase
  try {
    const stored = localStorage.getItem('wholelicity-conversation-count');
    if (stored) return parseInt(stored, 10) || 0;
  } catch { /* ignore */ }
  return 0;
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str;
}
