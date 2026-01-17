import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TourCard } from './TourCard';
import { PathwaySelection } from './PathwaySelection';
import { useOnboardingOverlay } from '@/hooks/useOnboardingOverlay';
import type { PathwayOption } from '@/types/onboarding-overlay';
import { toast } from 'sonner';

interface OnboardingOverlayProps {
  userName: string;
  spiritualBackground: string;
}

export function OnboardingOverlay({ userName, spiritualBackground }: OnboardingOverlayProps) {
  const navigate = useNavigate();
  const {
    showOverlay,
    showTour,
    tourStep,
    showPathways,
    isTransitioning,
    nextTourStep,
    prevTourStep,
    dismissTour,
    completeTour,
    selectPathway,
    skipToExplore,
  } = useOnboardingOverlay();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showTour) {
          dismissTour();
        } else if (showPathways) {
          skipToExplore();
        }
      }
    };

    if (showOverlay) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showOverlay, showTour, showPathways, dismissTour, skipToExplore]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (showTour) {
        dismissTour();
      }
    }
  }, [showTour, dismissTour]);

  const handleTourComplete = useCallback((route: string) => {
    completeTour(route);
    toast.success("Wisdom Guide coming in Phase 3!", {
      description: "You'll soon be able to chat with Sophia."
    });
  }, [completeTour]);

  const handlePathwaySelect = useCallback((pathway: PathwayOption) => {
    selectPathway(pathway.id);
    toast.success(`${pathway.name} pathway selected!`, {
      description: "Wisdom Guide coming in Phase 3!"
    });
  }, [selectPathway]);

  if (!showOverlay) {
    return null;
  }

  const blurAmount = showPathways ? 'blur-[2px]' : 'blur-[8px]';
  const overlayOpacity = showPathways ? 'bg-black/30' : 'bg-black/50';

  return (
    <>
      {/* Blur effect on dashboard - applied via CSS class on parent */}
      <style>{`
        .dashboard-blurred {
          filter: ${showPathways ? 'blur(2px)' : 'blur(8px)'};
          pointer-events: none;
          transition: filter 0.4s ease-out;
        }
      `}</style>

      {/* Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed inset-0 ${overlayOpacity} backdrop-blur-sm z-50 flex items-center justify-center p-4`}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={showTour ? "Welcome tour with Sophia" : "Choose your path"}
        >
          <AnimatePresence mode="wait">
            {showTour && !isTransitioning && (
              <TourCard
                key="tour"
                step={tourStep}
                userName={userName}
                spiritualBackground={spiritualBackground}
                onNext={nextTourStep}
                onBack={prevTourStep}
                onDismiss={dismissTour}
                onComplete={handleTourComplete}
              />
            )}

            {showPathways && !isTransitioning && (
              <PathwaySelection
                key="pathways"
                spiritualBackground={spiritualBackground}
                onSelectPathway={handlePathwaySelect}
                onSkipToExplore={skipToExplore}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
