import { useState, useCallback, useEffect } from 'react';
import { OnboardingData, PersonaResult, calculatePersona } from '@/types/onboarding';

const STORAGE_KEY = 'scripture-ai-onboarding';

const initialData: OnboardingData = {
  spiritualBackground: null,
  learningStyle: null,
  communityPreference: null,
  currentSeason: null,
};

export function useOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState<PersonaResult | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.data || initialData);
        // Don't restore step - always start fresh
      } catch (e) {
        console.error('Failed to parse saved onboarding data');
      }
    }
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
  }, [data, step]);

  const updateData = useCallback(<K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(0, prev - 1));
  }, []);

  const goToStep = useCallback((targetStep: number) => {
    setStep(targetStep);
  }, []);

  const processResults = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result = calculatePersona(data);
    setPersona(result);
    setIsLoading(false);
    
    // Move to results screen
    setStep(7);
  }, [data]);

  const resetOnboarding = useCallback(() => {
    setData(initialData);
    setStep(0);
    setPersona(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Analytics tracking
  const trackScreen = useCallback((screenName: string) => {
    console.log(`[Analytics] Screen view: ${screenName}`);
    // In production, this would send to analytics service
  }, []);

  return {
    step,
    data,
    isLoading,
    persona,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    processResults,
    resetOnboarding,
    trackScreen,
  };
}
