import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SophiaBubble } from './SophiaBubble';
import { TypewriterText } from './TypewriterText';
import { getGreeting, getStepMessage, getFinale, TOUR_STEP_ORDER } from './tourContent';
import type { TourStepId } from './tourContent';
import { useVoiceOutput } from '@/hooks/useVoiceOutput';
import { useDarkMode } from '@/components/layout/DarkModeContext';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Types ============

interface DashboardTourProps {
  userName: string;
  spiritualBackground: string;
  onComplete: (action: string) => void;
  onSkip: () => void;
  onClosing?: () => void;
}

// step: -1 = welcome overlay, 0–2 = tour steps, 3 = closing
type TourStep = -1 | 0 | 1 | 2 | 3;

// ============ Helpers ============

function getElementRect(selector: string): DOMRect | null {
  const el = document.querySelector(`[data-tour="${selector}"]`);
  return el ? el.getBoundingClientRect() : null;
}

type ArrowSide = 'left' | 'right' | 'top' | null;

// Map finale action to the data-tour selector for positioning
const ACTION_TO_SELECTOR: Record<string, TourStepId> = {
  sophia: 'sophia-panel',
  scripture: 'scripture-card',
  curriculum: 'curriculum-card',
};

function getBubblePosition(stepId: TourStepId): { x: number; y: number; arrow: ArrowSide } {
  const rect = getElementRect(stepId);
  if (!rect) return { x: window.innerWidth / 2 - 170, y: window.innerHeight / 2, arrow: null };

  const bubbleWidth = 340;
  const gap = 16;

  // 1. Try to the right of the card — arrow points left toward card
  const rightSpace = window.innerWidth - rect.right;
  if (rightSpace > bubbleWidth + gap + 20) {
    return { x: rect.right + gap, y: rect.top + 20, arrow: 'left' };
  }

  // 2. Try to the left of the card — arrow points right toward card
  if (rect.left > bubbleWidth + gap + 20) {
    return { x: rect.left - bubbleWidth - gap, y: rect.top + 20, arrow: 'right' };
  }

  // 3. Below the card (only if it fits in the viewport) — arrow points up
  const bottomSpace = window.innerHeight - rect.bottom;
  if (bottomSpace > 200) {
    return { x: rect.left + (rect.width / 2) - bubbleWidth / 2, y: rect.bottom + gap, arrow: 'top' };
  }

  // 4. Fallback: to the left of the card — arrow points right
  return { x: Math.max(16, rect.left - bubbleWidth - gap), y: Math.max(80, rect.top + 20), arrow: 'right' };
}

// ============ Tour Card CSS Management ============

function applyCardClasses(activeSelector: string | null) {
  document.querySelectorAll('[data-tour]').forEach((el) => {
    const id = el.getAttribute('data-tour');
    if (activeSelector === null) {
      // Closing or inactive — remove all tour classes
      el.classList.remove('tour-active', 'tour-dimmed');
    } else {
      el.classList.toggle('tour-active', id === activeSelector);
      el.classList.toggle('tour-dimmed', id !== activeSelector);
    }
  });
}

function clearCardClasses() {
  document.querySelectorAll('[data-tour]').forEach((el) => {
    el.classList.remove('tour-active', 'tour-dimmed');
  });
}

// ============ Progress Dots ============

function ProgressDots({
  current,
  total,
  onPrev,
  onNext,
  onDotClick,
  onSkip,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2.5 rounded-full border border-wl-olive/25 dark:border-wl-olive-300/25 tour-bubble-card"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="p-1 rounded-full text-foreground/60 dark:text-foreground/70 hover:text-foreground hover:bg-foreground/10 disabled:opacity-25 disabled:pointer-events-none transition-all"
        aria-label="Previous step"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-wl-stone dark:bg-wl-olive-300'
                : i < current
                ? 'w-2 bg-wl-olive/50 dark:bg-wl-olive-300/50'
                : 'w-2 bg-foreground/20'
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="p-1 rounded-full text-foreground/60 dark:text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-all"
        aria-label="Next step"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-foreground/15" />
      <button
        onClick={onSkip}
        className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground/90 dark:hover:text-foreground/90 transition-colors"
      >
        Skip tour
      </button>
    </motion.div>
  );
}

// ============ Main Component ============

export function DashboardTour({
  userName,
  spiritualBackground,
  onComplete,
  onSkip,
  onClosing,
}: DashboardTourProps) {
  const [step, setStep] = useState<TourStep>(-1);
  const [showActions, setShowActions] = useState(false);
  const [showWelcomeButtons, setShowWelcomeButtons] = useState(false);
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number; arrow: ArrowSide }>({ x: 0, y: 0, arrow: null });
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { speak, stop: stopSpeaking, isSpeaking } = useVoiceOutput();
  const isDarkMode = useDarkMode();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // Ensure portal target is set after mount so document.body is available
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const greeting = getGreeting(spiritualBackground);
  const introText = `I'm Sophia. ${greeting.intro}`;
  const tourPromptText = greeting.tourPrompt;
  const fullGreeting = `${introText} ${tourPromptText}`;
  const finale = getFinale(spiritualBackground);

  const [showTourPrompt, setShowTourPrompt] = useState(false);

  // Speak greeting — try auto-play, fall back to first click on overlay
  const hasSpokeRef = useRef(false);

  const triggerSpeech = useCallback(() => {
    if (!hasSpokeRef.current) {
      speak(fullGreeting);
      hasSpokeRef.current = true;
    }
  }, [speak, fullGreeting]);

  // Attempt auto-play on mount
  useEffect(() => {
    if (step === -1) {
      triggerSpeech();
    }
  }, [step, triggerSpeech]);

  // Stop speech when leaving welcome
  useEffect(() => {
    if (step !== -1) {
      stopSpeaking();
    }
  }, [step, stopSpeaking]);

  // ---- Card glow/dim management ----

  // Selector for the finale card (based on persona recommendation)
  const finaleSelector = ACTION_TO_SELECTOR[finale.action] ?? 'sophia-panel';

  useEffect(() => {
    if (step >= 0 && step <= 2) {
      const stepId = TOUR_STEP_ORDER[step];
      applyCardClasses(stepId);
      setBubblePos(getBubblePosition(stepId));
    } else if (step === 3) {
      // Closing: no dim/glow — full dashboard visible, bubble next to recommended card
      clearCardClasses();
      onClosing?.();
      // Defer position calculation so the orientation banner renders first and shifts layout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBubblePos(getBubblePosition(finaleSelector));
        });
      });
    } else {
      clearCardClasses();
    }

    return () => {
      clearCardClasses();
    };
  }, [step, finaleSelector]);

  // Reposition bubble on resize
  useEffect(() => {
    if (step < 0) return;

    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        if (step >= 0 && step <= 2) {
          setBubblePos(getBubblePosition(TOUR_STEP_ORDER[step]));
        } else if (step === 3) {
          setBubblePos(getBubblePosition(finaleSelector));
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [step, finaleSelector]);

  // Lock body scroll during tour (release during closing step)
  useEffect(() => {
    if (step === 3) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [step]);

  // ---- Handlers ----

  const handleTypingComplete = useCallback(() => {
    setShowActions(true);
  }, []);

  const handleStartTour = useCallback(() => {
    setStep(0);
    setShowActions(false);
    setShowWelcomeButtons(false);
    setShowTourPrompt(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (step > 0) {
      setShowActions(false);
      setStep((prev) => (prev - 1) as TourStep);
    }
  }, [step]);

  const handleNext = useCallback(() => {
    setShowActions(false);
    if (step < 2) {
      setStep((prev) => (prev + 1) as TourStep);
    } else {
      // Move to closing
      setStep(3);
    }
  }, [step]);

  const handleDotClick = useCallback((index: number) => {
    setShowActions(false);
    setStep(index as TourStep);
  }, []);

  const handleFinale = useCallback(
    (action: string) => {
      clearCardClasses();
      onComplete(action);
    },
    [onComplete]
  );

  const handleSkip = useCallback(() => {
    stopSpeaking();
    clearCardClasses();
    onSkip();
  }, [onSkip, stopSpeaking]);

  // ---- Current step message ----
  const currentMessage =
    step >= 0 && step <= 2
      ? getStepMessage(spiritualBackground, TOUR_STEP_ORDER[step])
      : '';

  if (!portalTarget) return null;

  return createPortal(
    <div className={isDarkMode ? 'dark' : ''}>
      {/* ========== Step -1: Welcome Overlay ========== */}
      <AnimatePresence>
        {step === -1 && (
          <motion.div
            key="welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={triggerSpeech}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
            style={{
              background: 'color-mix(in srgb, var(--background) 92%, transparent)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* Large Orb with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: isSpeaking ? [1, 1.06, 1] : 1,
              }}
              transition={isSpeaking
                ? { scale: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.2, type: 'spring', stiffness: 180, damping: 20 } }
                : { delay: 0.2, type: 'spring', stiffness: 180, damping: 20 }
              }
              className="-mb-6 relative"
            >
              {/* Ambient glow behind orb */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 160, 48, 0.25) 0%, rgba(194, 112, 60, 0.15) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.5)',
                }}
                animate={isSpeaking ? {
                  opacity: [0.6, 1, 0.6],
                } : {
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: isSpeaking ? 0.8 : 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <Suspense
                fallback={
                  <div className="w-48 h-48 rounded-full bg-foreground/[0.04] animate-pulse" />
                }
              >
                <NoiseOrb
                  size={260}
                  preset="white"
                  noiseIntensity={isSpeaking ? 0.55 : 0.3}
                  speed={isSpeaking ? 1.2 : 0.6}
                />
              </Suspense>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-center max-w-lg"
            >
              <h2 className="text-4xl leading-relaxed text-foreground mb-3 font-spiritual">
                Welcome{userName ? `, ${userName}` : ''}.
              </h2>
              <p className="text-base leading-relaxed text-foreground/60 dark:text-foreground/80 mb-4">
                <TypewriterText
                  text={introText}
                  speed={40}
                  onComplete={() => setShowTourPrompt(true)}
                />
              </p>
              {showTourPrompt && (
                <p className="text-base leading-relaxed text-foreground/60 dark:text-foreground/80 mb-8">
                  <TypewriterText
                    text={tourPromptText}
                    speed={40}
                    onComplete={() => setShowWelcomeButtons(true)}
                  />
                </p>
              )}

              <AnimatePresence>
                {showWelcomeButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <button
                      onClick={handleStartTour}
                      className="px-6 py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/80 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg dark:shadow-[0_0_20px_rgba(241,237,233,0.15)]"
                    >
                      Show me around
                    </button>
                    <button
                      onClick={handleSkip}
                      className="text-sm text-foreground/50 dark:text-foreground/60 hover:text-foreground/70 dark:hover:text-foreground/80 transition-colors"
                    >
                      I'll explore on my own
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== Steps 0–2: Tour with floating bubble ========== */}
      <AnimatePresence>
        {step >= 0 && step <= 2 && (
          <>
            {/* Blurred backdrop — blurs everything behind the active card */}
            <motion.div
              key="tour-shield"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[45]"
              style={{
                pointerEvents: 'auto',
                background: 'color-mix(in srgb, var(--background) 40%, transparent)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />

            <SophiaBubble
              key="tour-bubble"
              message={currentMessage}
              position={bubblePos}
              arrow={bubblePos.arrow}
              showActions={showActions}
              onTypingComplete={handleTypingComplete}
              actions={[
                {
                  label: step < 2 ? 'Continue' : 'Finish',
                  onClick: handleNext,
                  variant: 'primary',
                },
              ]}
            />

            <ProgressDots
              current={step}
              total={3}
              onPrev={handlePrev}
              onNext={handleNext}
              onDotClick={handleDotClick}
              onSkip={handleSkip}
            />
          </>
        )}
      </AnimatePresence>

      {/* ========== Step 3: Closing — no overlay, bubble next to recommended card ========== */}
      <AnimatePresence>
        {step === 3 && (
          <div className="fixed z-50" style={{ pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }}>
              <SophiaBubble
                key="closing-bubble"
                message={finale.text}
                position={bubblePos}
                arrow={bubblePos.arrow}
                showActions={showActions}
                onTypingComplete={handleTypingComplete}
                actions={[
                  {
                    label: finale.cta,
                    onClick: () => handleFinale(finale.action),
                    variant: 'primary',
                  },
                ]}
                dismissButton={
                  <button
                    onClick={handleSkip}
                    className="absolute top-2 right-2 p-1 rounded-lg text-foreground/30 hover:text-foreground/60 hover:bg-foreground/[0.06] transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                }
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>,
    portalTarget
  );
}
