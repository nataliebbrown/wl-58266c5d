import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicIntro } from '@/components/onboarding/CinematicIntro';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { 
  getOnboardingState, 
  hasCompletedQuiz, 
  isReturningUser,
  markIntroSeen,
  migrateFromLegacyStorage 
} from '@/lib/onboardingState';

const Index = () => {
  const navigate = useNavigate();
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Migrate any legacy storage on first load
    migrateFromLegacyStorage();
    
    const state = getOnboardingState();
    
    // If returning user, redirect to dashboard
    if (isReturningUser()) {
      navigate('/dashboard');
      return;
    }
    
    // If quiz was completed but tour not done, go straight to dashboard for tour
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
