import { useState, useEffect } from 'react';
import { CinematicIntro } from '@/components/onboarding/CinematicIntro';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

const ONBOARDING_COMPLETED_KEY = 'scripture_ai_onboarding_completed';

const Index = () => {
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already completed the full onboarding
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    if (hasCompletedOnboarding) {
      // Skip both intro and onboarding - user has completed everything
      setShowCinematicIntro(false);
      setIntroCompleted(true);
    }
    setIsLoading(false);
  }, []);

  const handleIntroComplete = () => {
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  const handleIntroSkip = () => {
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  // Loading state
  if (isLoading) {
    return null;
  }

  // Show cinematic intro first (every time until onboarding is complete)
  if (showCinematicIntro) {
    return (
      <CinematicIntro 
        onComplete={handleIntroComplete} 
        onSkip={handleIntroSkip}
      />
    );
  }

  // After intro, show onboarding flow starting at the quiz
  if (introCompleted) {
    return <OnboardingFlow startAtQuiz />;
  }

  return null;
};

export default Index;
