import { useState, useEffect, useCallback } from 'react';
import { UserProfile, UserStats, Insight } from '@/types/dashboard';

const PROFILE_STORAGE_KEY = 'scripture-ai-profile';
const STATS_STORAGE_KEY = 'scripture-ai-stats';
const INSIGHTS_STORAGE_KEY = 'scripture-ai-insights';
const FIRST_ACTION_KEY = 'scripture-ai-first-action-taken';

const DEMO_INSIGHTS: Insight[] = [
  {
    id: '1',
    date: 'January 15',
    title: 'Connection discovered in Romans 8:28',
    preview: "You noticed how 'all things work together' connects to the sovereignty theme we discussed...",
    category: 'pattern',
  },
  {
    id: '2',
    date: 'January 13',
    title: 'Reflection on biblical hospitality',
    preview: 'Your conversation with Sophia about Middle Eastern culture revealed new dimensions...',
    category: 'cultural',
  },
  {
    id: '3',
    date: 'January 11',
    title: 'Personal application breakthrough',
    preview: "You connected the 'firstborn' concept to your own sense of identity and purpose...",
    category: 'personal',
  },
];

// Empty stats for first-time users
const FIRST_TIME_STATS: UserStats = {
  daysActive: 0,
  conversationCount: 0,
  insightsCount: 0,
};

// Demo stats for returning users (or default fallback)
const DEFAULT_STATS: UserStats = {
  daysActive: 7,
  conversationCount: 12,
  insightsCount: 23,
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>(FIRST_TIME_STATS);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
    const savedInsights = localStorage.getItem(INSIGHTS_STORAGE_KEY);
    const firstActionTaken = localStorage.getItem(FIRST_ACTION_KEY);

    // Determine if this is a first-time user
    const hasFirstAction = firstActionTaken === 'true';
    setIsFirstTime(!hasFirstAction);

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse saved profile');
      }
    }

    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse saved stats');
      }
    } else if (hasFirstAction) {
      // If user has taken action but no saved stats, use defaults
      setStats(DEFAULT_STATS);
    }

    if (savedInsights) {
      try {
        setInsights(JSON.parse(savedInsights));
      } catch (e) {
        console.error('Failed to parse saved insights');
      }
    } else if (hasFirstAction) {
      // If user has taken action but no saved insights, use demo insights
      setInsights(DEMO_INSIGHTS);
    }

    setIsLoading(false);
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
  };

  const updateStats = (newStats: Partial<UserStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
  };

  const addInsight = (insight: Omit<Insight, 'id'>) => {
    const newInsight = { ...insight, id: Date.now().toString() };
    const updated = [newInsight, ...insights];
    setInsights(updated);
    localStorage.setItem(INSIGHTS_STORAGE_KEY, JSON.stringify(updated));
  };

  const hasCompletedOnboarding = (): boolean => {
    const onboardingData = localStorage.getItem('scripture-ai-onboarding');
    if (!onboardingData) return false;
    try {
      const parsed = JSON.parse(onboardingData);
      return parsed.data?.spiritualBackground && 
             parsed.data?.learningStyle && 
             parsed.data?.communityPreference && 
             parsed.data?.currentSeason;
    } catch {
      return false;
    }
  };

  const getPersonaFromOnboarding = () => {
    const onboardingData = localStorage.getItem('scripture-ai-onboarding');
    if (!onboardingData) return null;
    try {
      const parsed = JSON.parse(onboardingData);
      return parsed.data;
    } catch {
      return null;
    }
  };

  // Mark that user has taken their first action (transition from first-time to regular view)
  const markFirstActionTaken = useCallback(() => {
    localStorage.setItem(FIRST_ACTION_KEY, 'true');
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({
      daysActive: 1,
      conversationCount: 0,
      insightsCount: 0,
    }));
    setIsFirstTime(false);
    setStats({
      daysActive: 1,
      conversationCount: 0,
      insightsCount: 0,
    });
  }, []);

  // Check if user is first-time (hasn't taken any action yet)
  const checkIsFirstTime = useCallback((): boolean => {
    const firstActionTaken = localStorage.getItem(FIRST_ACTION_KEY);
    return firstActionTaken !== 'true';
  }, []);

  return {
    profile,
    stats,
    insights,
    isLoading,
    isFirstTime,
    saveProfile,
    updateStats,
    addInsight,
    hasCompletedOnboarding,
    getPersonaFromOnboarding,
    markFirstActionTaken,
    checkIsFirstTime,
  };
}
