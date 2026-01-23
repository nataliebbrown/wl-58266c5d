// Unified onboarding state management
// This file consolidates all onboarding-related localStorage operations

const KEYS = {
  QUIZ_DATA: 'wholelicity-quiz-data',
  ONBOARDING_STATE: 'wholelicity-onboarding-state',
  USER_JOURNEY: 'wholelicity-user-journey',
  DARK_MODE: 'wholelicity-dark-mode',
} as const;

// Onboarding phases in order
export type OnboardingPhase = 
  | 'not-started'      // Never visited
  | 'intro-seen'       // Saw cinematic intro
  | 'quiz-completed'   // Completed the quiz
  | 'tour-offered'     // Sophia tour was offered
  | 'tour-completed'   // Completed full tour
  | 'tour-skipped'     // Skipped the tour
  | 'fully-onboarded'; // Completed everything, is now a "returning user"

export interface OnboardingState {
  phase: OnboardingPhase;
  quizCompletedAt?: string;
  tourCompletedAt?: string;
  firstActionAt?: string;
  lastVisitAt: string;
  visitCount: number;
}

export interface QuizData {
  spiritualBackground: string | null;
  learningStyle: string | null;
  communityPreference: string | null;
  currentSeason: string | null;
}

const defaultState: OnboardingState = {
  phase: 'not-started',
  lastVisitAt: new Date().toISOString(),
  visitCount: 0,
};

const defaultQuizData: QuizData = {
  spiritualBackground: null,
  learningStyle: null,
  communityPreference: null,
  currentSeason: null,
};

// ============ State Management ============

export function getOnboardingState(): OnboardingState {
  try {
    const stored = localStorage.getItem(KEYS.ONBOARDING_STATE);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading onboarding state:', e);
  }
  return { ...defaultState };
}

export function setOnboardingState(updates: Partial<OnboardingState>): OnboardingState {
  const current = getOnboardingState();
  const updated: OnboardingState = {
    ...current,
    ...updates,
    lastVisitAt: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.ONBOARDING_STATE, JSON.stringify(updated));
  return updated;
}

export function incrementVisitCount(): OnboardingState {
  const current = getOnboardingState();
  return setOnboardingState({
    visitCount: current.visitCount + 1,
  });
}

// ============ Quiz Data ============

export function getQuizData(): QuizData {
  try {
    const stored = localStorage.getItem(KEYS.QUIZ_DATA);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading quiz data:', e);
  }
  return { ...defaultQuizData };
}

export function setQuizData(data: QuizData): void {
  localStorage.setItem(KEYS.QUIZ_DATA, JSON.stringify(data));
}

export function clearQuizData(): void {
  localStorage.removeItem(KEYS.QUIZ_DATA);
}

// ============ Phase Transitions ============

export function markIntroSeen(): OnboardingState {
  return setOnboardingState({ phase: 'intro-seen' });
}

export function markQuizCompleted(quizData: QuizData): OnboardingState {
  setQuizData(quizData);
  return setOnboardingState({
    phase: 'quiz-completed',
    quizCompletedAt: new Date().toISOString(),
  });
}

export function markTourOffered(): OnboardingState {
  return setOnboardingState({ phase: 'tour-offered' });
}

export function markTourCompleted(): OnboardingState {
  return setOnboardingState({
    phase: 'tour-completed',
    tourCompletedAt: new Date().toISOString(),
  });
}

export function markTourSkipped(): OnboardingState {
  return setOnboardingState({
    phase: 'tour-skipped',
    tourCompletedAt: new Date().toISOString(),
  });
}

export function markFullyOnboarded(): OnboardingState {
  return setOnboardingState({
    phase: 'fully-onboarded',
    firstActionAt: new Date().toISOString(),
  });
}

// ============ Status Checks ============

export function isFirstTimeUser(): boolean {
  const state = getOnboardingState();
  return state.phase === 'not-started' || 
         state.phase === 'intro-seen' || 
         state.phase === 'quiz-completed' ||
         state.phase === 'tour-offered';
}

export function hasCompletedQuiz(): boolean {
  const state = getOnboardingState();
  const completedPhases: OnboardingPhase[] = [
    'quiz-completed', 
    'tour-offered', 
    'tour-completed', 
    'tour-skipped', 
    'fully-onboarded'
  ];
  return completedPhases.includes(state.phase);
}

export function shouldShowTour(): boolean {
  const state = getOnboardingState();
  return state.phase === 'quiz-completed' || state.phase === 'tour-offered';
}

export function isReturningUser(): boolean {
  const state = getOnboardingState();
  return state.phase === 'fully-onboarded' || 
         state.phase === 'tour-completed' || 
         state.phase === 'tour-skipped';
}

export function shouldShowWelcomeDashboard(): boolean {
  const state = getOnboardingState();
  // Show welcome dashboard if tour was just completed/skipped but first action not taken
  return (state.phase === 'tour-completed' || state.phase === 'tour-skipped') && 
         !state.firstActionAt;
}

// ============ Reset (for testing) ============

export function resetOnboarding(): void {
  localStorage.removeItem(KEYS.ONBOARDING_STATE);
  localStorage.removeItem(KEYS.QUIZ_DATA);
  localStorage.removeItem(KEYS.USER_JOURNEY);
}

// ============ Migration from old keys ============

export function migrateFromLegacyStorage(): void {
  // Check if we have old data and new data doesn't exist
  const newState = localStorage.getItem(KEYS.ONBOARDING_STATE);
  if (newState) return; // Already migrated

  // Check for legacy quiz data
  const legacyQuiz = localStorage.getItem('wl-onboarding');
  const legacyOverlay = localStorage.getItem('wl_overlay_data');
  const legacyFirstAction = localStorage.getItem('wl-first-action-taken');

  if (legacyQuiz || legacyOverlay || legacyFirstAction) {
    let phase: OnboardingPhase = 'not-started';
    let quizData: QuizData = { ...defaultQuizData };

    // Parse legacy quiz data
    if (legacyQuiz) {
      try {
        const parsed = JSON.parse(legacyQuiz);
        if (parsed.data) {
          quizData = parsed.data;
          phase = 'quiz-completed';
        }
      } catch (e) {
        console.error('Error parsing legacy quiz data:', e);
      }
    }

    // Parse legacy overlay data
    if (legacyOverlay) {
      try {
        const parsed = JSON.parse(legacyOverlay);
        if (parsed.tourCompleted) {
          phase = 'tour-completed';
        } else if (parsed.tourSkipped || parsed.pathSkipped) {
          phase = 'tour-skipped';
        }
      } catch (e) {
        console.error('Error parsing legacy overlay data:', e);
      }
    }

    // Check for first action
    if (legacyFirstAction === 'true') {
      phase = 'fully-onboarded';
    }

    // Save migrated data
    setOnboardingState({ phase, visitCount: 1 });
    if (quizData.spiritualBackground) {
      setQuizData(quizData);
    }

    console.log('[Migration] Migrated legacy onboarding data to new format');
  }
}
