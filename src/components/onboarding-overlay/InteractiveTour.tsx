import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SophiaDialogue } from './SophiaDialogue';
import { SpotlightOverlay } from './SpotlightOverlay';
import { 
  SOPHIA_GREETINGS, 
  TOUR_RECOMMENDATIONS,
  TOUR_STEP_CONTENT 
} from '@/types/onboarding-overlay';

interface TourStep {
  id: string;
  targetSelector: string | null;
  message: string;
  position: 'center' | 'bottom-left' | 'bottom-right' | 'top-right';
}

interface InteractiveTourProps {
  userName: string;
  spiritualBackground: string;
  onComplete: (action: string) => void;
  onSkip: () => void;
}

export function InteractiveTour({
  userName,
  spiritualBackground,
  onComplete,
  onSkip,
}: InteractiveTourProps) {
  const [phase, setPhase] = useState<'intro' | 'choice' | 'tour' | 'finale'>('intro');
  const [tourStep, setTourStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const greeting = SOPHIA_GREETINGS[spiritualBackground] || SOPHIA_GREETINGS.default;
  const recommendation = TOUR_RECOMMENDATIONS[spiritualBackground] || TOUR_RECOMMENDATIONS.default;
  const stepContent = TOUR_STEP_CONTENT[spiritualBackground] || TOUR_STEP_CONTENT.default;

  const introMessage = `Welcome, ${userName}! I'm Sophia, your spiritual formation guide. ${greeting}`;
  
  const choiceMessage = "Would you like me to show you around? I'll walk you through how WL can serve your journey. It'll only take a minute!";

  const tourSteps: TourStep[] = [
    {
      id: 'hero',
      targetSelector: '[data-tour="hero"]',
      message: "This is your personal dashboard. I'll greet you here each day with encouragement tailored to where you are in your spiritual journey.",
      position: 'bottom-right',
    },
    {
      id: 'formation',
      targetSelector: '[data-tour="formation-focus"]',
      message: "Your daily formation focus appears here—a personalized suggestion for your spiritual growth today. Each one is designed for about 15-20 minutes of meaningful reflection.",
      position: 'bottom-right',
    },
    {
      id: 'stats',
      targetSelector: '[data-tour="stats"]',
      message: "Track your spiritual formation journey here. You'll see your active streak, conversations we've had, and insights you've discovered along the way.",
      position: 'top-right',
    },
    {
      id: 'insights',
      targetSelector: '[data-tour="insights"]',
      message: "Every meaningful discovery from our conversations gets saved here. Over time, you'll build a beautiful record of your spiritual growth.",
      position: 'top-right',
    },
    {
      id: 'actions',
      targetSelector: '[data-tour="quick-actions"]',
      message: `When you're ready to go deeper, these are your pathways. ${stepContent.description}—that's what makes our conversations transformative.`,
      position: 'top-right',
    },
  ];

  const finaleMessage = recommendation.text;

  const handleMessageComplete = useCallback(() => {
    setIsSpeaking(false);
    setShowActions(true);
  }, []);

  const handleStartTour = useCallback(() => {
    setPhase('tour');
    setTourStep(0);
    setIsSpeaking(true);
    setShowActions(false);
  }, []);

  const handleSkipTour = useCallback(() => {
    onSkip();
  }, [onSkip]);

  const handleNextStep = useCallback(() => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(prev => prev + 1);
      setIsSpeaking(true);
      setShowActions(false);
    } else {
      setPhase('finale');
      setIsSpeaking(true);
      setShowActions(false);
    }
  }, [tourStep, tourSteps.length]);

  const handlePrevStep = useCallback(() => {
    if (tourStep > 0) {
      setTourStep(prev => prev - 1);
      setIsSpeaking(true);
      setShowActions(false);
    }
  }, [tourStep]);

  const handleComplete = useCallback(() => {
    onComplete(recommendation.route);
  }, [onComplete, recommendation.route]);

  // Transition from intro to choice
  useEffect(() => {
    if (phase === 'intro' && showActions) {
      const timer = setTimeout(() => {
        setPhase('choice');
        setIsSpeaking(true);
        setShowActions(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, showActions]);

  const currentTourStep = tourSteps[tourStep];

  return (
    <>
      {/* Spotlight overlay for tour */}
      <SpotlightOverlay
        targetSelector={phase === 'tour' ? currentTourStep?.targetSelector : null}
        isActive={phase === 'tour'}
      />

      {/* Dark overlay for intro/choice/finale */}
      <AnimatePresence>
        {(phase === 'intro' || phase === 'choice' || phase === 'finale') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Intro phase */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <SophiaDialogue
            key="intro"
            message={introMessage}
            isSpeaking={isSpeaking}
            onMessageComplete={handleMessageComplete}
            position="center"
          />
        )}

        {/* Choice phase */}
        {phase === 'choice' && (
          <SophiaDialogue
            key="choice"
            message={choiceMessage}
            isSpeaking={isSpeaking}
            onMessageComplete={handleMessageComplete}
            showActions={showActions}
            primaryAction={{
              label: "Yes, show me around",
              onClick: handleStartTour,
            }}
            secondaryAction={{
              label: "I'll explore myself",
              onClick: handleSkipTour,
            }}
            position="center"
          />
        )}

        {/* Tour phase */}
        {phase === 'tour' && currentTourStep && (
          <SophiaDialogue
            key={`tour-${tourStep}`}
            message={currentTourStep.message}
            isSpeaking={isSpeaking}
            onMessageComplete={handleMessageComplete}
            showActions={showActions}
            primaryAction={{
              label: tourStep < tourSteps.length - 1 ? "Next" : "Finish tour",
              onClick: handleNextStep,
            }}
            secondaryAction={tourStep > 0 ? {
              label: "Back",
              onClick: handlePrevStep,
            } : undefined}
            position={currentTourStep.position}
            skipAction={{
              label: "Skip tour",
              onClick: handleSkipTour,
            }}
          />
        )}

        {/* Finale phase */}
        {phase === 'finale' && (
          <SophiaDialogue
            key="finale"
            message={finaleMessage}
            isSpeaking={isSpeaking}
            onMessageComplete={handleMessageComplete}
            showActions={showActions}
            primaryAction={{
              label: recommendation.cta,
              onClick: handleComplete,
            }}
            secondaryAction={{
              label: "Explore pathways first",
              onClick: handleSkipTour,
            }}
            position="center"
          />
        )}
      </AnimatePresence>

      {/* Tour progress indicator */}
      {phase === 'tour' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-cream/90 backdrop-blur px-4 py-2 rounded-full shadow-lg"
        >
          {tourSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTourStep(i);
                setIsSpeaking(true);
                setShowActions(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === tourStep
                  ? 'bg-terracotta w-6'
                  : i < tourStep
                  ? 'bg-sage'
                  : 'bg-charcoal/20'
              }`}
            />
          ))}
          <span className="text-xs text-charcoal/60 ml-2">
            {tourStep + 1} of {tourSteps.length}
          </span>
        </motion.div>
      )}
    </>
  );
}
