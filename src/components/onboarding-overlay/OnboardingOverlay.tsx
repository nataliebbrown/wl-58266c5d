import { useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { InteractiveTour } from './InteractiveTour';
import { PathwaySelection } from './PathwaySelection';
import type { PathwayOption } from '@/types/onboarding-overlay';
import { toast } from 'sonner';

// Type for the overlay state from useOnboardingOverlay hook
interface OverlayState {
  showOverlay: boolean;
  showTour: boolean;
  tourStep: number;
  showPathways: boolean;
  isTransitioning: boolean;
  completeTour: (chosenStart: string) => void;
  selectPathway: (pathId: string) => void;
  skipToExplore: () => void;
  dismissTour: () => void;
  resetOverlay: () => void;
}

interface OnboardingOverlayProps {
  userName: string;
  spiritualBackground: string;
  overlayState: OverlayState;
}

export function OnboardingOverlay({ userName, spiritualBackground, overlayState }: OnboardingOverlayProps) {
  const {
    showOverlay,
    showTour,
    showPathways,
    completeTour,
    selectPathway,
    skipToExplore,
    dismissTour,
  } = overlayState;

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
