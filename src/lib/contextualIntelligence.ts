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
    visitCount: onboarding.visitCount,
  };
}

// ============ Dashboard Message ============

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

  // New user or no context — fall back to time-based greeting
  const config = getTimeConfig();
  return config.greeting;
}

// ============ Contextual CTAs ============

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

  return [
    primary,
    { label: 'Something New', icon: '✨', action: 'new' },
    { label: 'Explore on My Own', icon: '🔍', action: 'explore' },
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
