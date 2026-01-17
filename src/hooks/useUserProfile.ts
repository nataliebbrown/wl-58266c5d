import { useState, useEffect } from 'react';
import { UserProfile, UserStats, Insight } from '@/types/dashboard';

const PROFILE_STORAGE_KEY = 'scripture-ai-profile';
const STATS_STORAGE_KEY = 'scripture-ai-stats';
const INSIGHTS_STORAGE_KEY = 'scripture-ai-insights';

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

const DEFAULT_STATS: UserStats = {
  daysActive: 7,
  conversationCount: 12,
  insightsCount: 23,
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [insights, setInsights] = useState<Insight[]>(DEMO_INSIGHTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
    const savedInsights = localStorage.getItem(INSIGHTS_STORAGE_KEY);

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
    }

    if (savedInsights) {
      try {
        setInsights(JSON.parse(savedInsights));
      } catch (e) {
        console.error('Failed to parse saved insights');
      }
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

  return {
    profile,
    stats,
    insights,
    isLoading,
    saveProfile,
    updateStats,
    addInsight,
    hasCompletedOnboarding,
    getPersonaFromOnboarding,
  };
}
