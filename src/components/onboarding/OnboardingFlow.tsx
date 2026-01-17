import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { WelcomeSplash } from './screens/WelcomeSplash';
import { VisionCast } from './screens/VisionCast';
import { SpiritualBackgroundQuiz } from './screens/SpiritualBackgroundQuiz';
import { LearningStyleQuiz } from './screens/LearningStyleQuiz';
import { CommunityPreferenceQuiz } from './screens/CommunityPreferenceQuiz';
import { CurrentSeasonQuiz } from './screens/CurrentSeasonQuiz';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { toast } from 'sonner';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.3,
};

export function OnboardingFlow() {
  const {
    step,
    data,
    persona,
    updateData,
    nextStep,
    prevStep,
    processResults,
    resetOnboarding,
    trackScreen,
  } = useOnboarding();

  // Track screen views
  useEffect(() => {
    const screenNames = [
      'welcome_splash',
      'vision_cast',
      'spiritual_background',
      'learning_style',
      'community_preference',
      'current_season',
      'processing',
      'results',
    ];
    trackScreen(screenNames[step] || 'unknown');
  }, [step, trackScreen]);

  const handleLearnMore = () => {
    toast.info("Learn More", {
      description: "Full information coming soon!",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeSplash key="welcome" onBegin={nextStep} />;
      
      case 1:
        return (
          <VisionCast
            key="vision"
            onContinue={nextStep}
            onLearnMore={handleLearnMore}
          />
        );
      
      case 2:
        return (
          <SpiritualBackgroundQuiz
            key="spiritual"
            selected={data.spiritualBackground}
            onSelect={(value) => updateData('spiritualBackground', value)}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      
      case 3:
        return (
          <LearningStyleQuiz
            key="learning"
            selected={data.learningStyle}
            onSelect={(value) => updateData('learningStyle', value)}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      
      case 4:
        return (
          <CommunityPreferenceQuiz
            key="community"
            selected={data.communityPreference}
            onSelect={(value) => updateData('communityPreference', value)}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      
      case 5:
        return (
          <CurrentSeasonQuiz
            key="season"
            selected={data.currentSeason}
            onSelect={(value) => updateData('currentSeason', value)}
            onBack={prevStep}
            onContinue={() => {
              nextStep();
              processResults();
            }}
          />
        );
      
      case 6:
        return <ProcessingScreen key="processing" onComplete={() => {}} />;
      
      case 7:
        return (
          <ResultsScreen
            key="results"
            persona={persona}
            onEnterDashboard={() => {
              // For Phase 1, just show toast
            }}
            onRestart={resetOnboarding}
          />
        );
      
      default:
        return <WelcomeSplash key="welcome-default" onBegin={nextStep} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}
