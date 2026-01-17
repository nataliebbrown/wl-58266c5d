import { useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { InteractiveTour } from './InteractiveTour';
import { PathwaySelection } from './PathwaySelection';
import { useOnboardingOverlay } from '@/hooks/useOnboardingOverlay';
import type { PathwayOption } from '@/types/onboarding-overlay';
import { toast } from 'sonner';

interface OnboardingOverlayProps {
  userName: string;
  spiritualBackground: string;
}

export function OnboardingOverlay({ userName, spiritualBackground }: OnboardingOverlayProps) {
  const {
    showOverlay,
    showTour,
    showPathways,
    completeTour,
    selectPathway,
    skipToExplore,
    dismissTour,
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

  const handleTourComplete = useCallback((route: string) => {
    completeTour(route);
    toast.success("Welcome to Scripture AI!", {
      description: "Wisdom Guide coming in Phase 3!"
    });
  }, [completeTour]);

  const handleTourSkip = useCallback(() => {
    dismissTour();
  }, [dismissTour]);

  const handlePathwaySelect = useCallback((pathway: PathwayOption) => {
    selectPathway(pathway.id);
    toast.success(`${pathway.name} pathway selected!`, {
      description: "Wisdom Guide coming in Phase 3!"
    });
  }, [selectPathway]);

  if (!showOverlay) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {showTour && (
        <InteractiveTour
          key="tour"
          userName={userName}
          spiritualBackground={spiritualBackground}
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}

      {showPathways && (
        <div key="pathways" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <PathwaySelection
            spiritualBackground={spiritualBackground}
            onSelectPathway={handlePathwaySelect}
            onSkipToExplore={skipToExplore}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
