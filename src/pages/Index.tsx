import { useState, useEffect } from 'react';
import { CinematicIntro } from '@/components/onboarding/CinematicIntro';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

const INTRO_COMPLETED_KEY = 'scripture_ai_intro_completed';

const Index = () => {
  const [showCinematicIntro, setShowCinematicIntro] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the cinematic intro
    const hasSeenIntro = localStorage.getItem(INTRO_COMPLETED_KEY);
    if (!hasSeenIntro) {
      setShowCinematicIntro(true);
    } else {
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem(INTRO_COMPLETED_KEY, 'true');
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  const handleIntroSkip = () => {
    localStorage.setItem(INTRO_COMPLETED_KEY, 'true');
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  // Show cinematic intro on first visit
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

  // Loading state
  return null;
};

export default Index;
