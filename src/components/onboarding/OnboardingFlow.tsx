import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import { WelcomeSplash } from './screens/WelcomeSplash';
import { VisionCast } from './screens/VisionCast';
import { SplitOnboarding } from './SplitOnboarding';
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

interface OnboardingFlowProps {
  startAtQuiz?: boolean;
}

export function OnboardingFlow({ startAtQuiz = false }: OnboardingFlowProps) {
  const navigate = useNavigate();
  const {
    step,
    data,
    persona,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    processResults,
    resetOnboarding,
    trackScreen,
  } = useOnboarding();

  // If starting at quiz, use the split view onboarding
  if (startAtQuiz) {
    return <SplitOnboarding onComplete={() => navigate('/dashboard')} />;
  }

  // Track screen views
  useEffect(() => {
    const screenNames = [
      'welcome_splash',
      'vision_cast',
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
        return <ProcessingScreen key="processing" onComplete={() => {}} />;
      
      case 3:
        return (
          <ResultsScreen
            key="results"
            persona={persona}
            onEnterDashboard={() => {
              navigate('/dashboard');
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
