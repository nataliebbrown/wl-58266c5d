import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicIntro } from '@/components/onboarding/CinematicIntro';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { SacredTransition } from '@/components/transitions/SacredTransition';
import {
  getOnboardingState,
  hasCompletedQuiz,
  isReturningUser,
  markIntroSeen,
  incrementVisitCount,
  migrateFromLegacyStorage,
} from '@/lib/onboardingState';

const Index = () => {
  const navigate = useNavigate();
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showSacredTransition, setShowSacredTransition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Migrate any legacy storage on first load
    migrateFromLegacyStorage();

    const state = getOnboardingState();

    // If returning user, show sacred transition before dashboard
    if (isReturningUser()) {
      incrementVisitCount();
      setShowSacredTransition(true);
      setIsLoading(false);
      return;
    }

    // If quiz was completed, go straight to dashboard
    if (hasCompletedQuiz()) {
      navigate('/dashboard');
      return;
    }

    // Otherwise show the intro for first-time users
    setIsLoading(false);
  }, [navigate]);

  const handleIntroComplete = () => {
    markIntroSeen();
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  const handleIntroSkip = () => {
    markIntroSeen();
    setShowCinematicIntro(false);
    setIntroCompleted(true);
  };

  // Loading state
  if (isLoading) {
    return null;
  }

  // Sacred transition for returning users
  if (showSacredTransition) {
    return (
      <SacredTransition
        onComplete={() => navigate('/dashboard')}
      />
    );
  }

  // Show cinematic intro first
  if (showCinematicIntro) {
    return (
      <CinematicIntro 
        onComplete={handleIntroComplete} 
        onSkip={handleIntroSkip}
      />
    );
  }

  // After intro, show onboarding quiz
  if (introCompleted) {
    return <OnboardingFlow startAtQuiz />;
  }

  return null;
};

export default Index;
