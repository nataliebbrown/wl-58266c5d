import { useState, useEffect, useCallback } from 'react';
import { 
  shouldShowTour, 
  markTourOffered, 
  markTourCompleted, 
  markTourSkipped,
  markFullyOnboarded,
  getOnboardingState,
  resetOnboarding
} from '@/lib/onboardingState';

interface OverlayState {
  showOverlay: boolean;
  showTour: boolean;
  tourStep: number;
  showPathways: boolean;
  isTransitioning: boolean;
}

interface OverlayData {
  firstVisit: boolean;
  tourCompleted: boolean;
  tourSkipped: boolean;
  tourStepReached: number;
  chosenStart: string | null;
  chosenPath: string | null;
  pathSkipped: boolean;
}

const STORAGE_KEY = 'wl_overlay_data';

// Legacy function - kept for backward compatibility but now uses new state
export const initializeOverlayForNewUser = () => {
  // This is now handled by markQuizCompleted in onboardingState
  console.log('[Legacy] initializeOverlayForNewUser called - using new state management');
};

const getStoredData = (): OverlayData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading overlay data:', e);
  }
  return {
    firstVisit: true,
    tourCompleted: false,
    tourSkipped: false,
    tourStepReached: 0,
    chosenStart: null,
    chosenPath: null,
    pathSkipped: false,
  };
};

const saveStoredData = (data: Partial<OverlayData>) => {
  try {
    const current = getStoredData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving overlay data:', e);
  }
};

export function useOnboardingOverlay() {
  const [state, setState] = useState<OverlayState>({
    showOverlay: false,
    showTour: false,
    tourStep: 1,
    showPathways: false,
    isTransitioning: false,
  });

  const [overlayData, setOverlayData] = useState<OverlayData>(getStoredData);

  useEffect(() => {
    const legacyData = getStoredData();
    setOverlayData(legacyData);
    
    // Use the new unified state to determine if tour should show
    const showTourFromNewState = shouldShowTour();
    const showTourFromLegacy = legacyData.firstVisit && !legacyData.tourCompleted && !legacyData.pathSkipped;
    
    // Show tour if either new state or legacy state says so
    if (showTourFromNewState || showTourFromLegacy) {
      markTourOffered(); // Update the new state
      setState(prev => ({
        ...prev,
        showOverlay: true,
        showTour: true,
      }));
    }
  }, []);

  const startTour = useCallback(() => {
    setState(prev => ({
      ...prev,
      showTour: true,
      tourStep: 1,
      showPathways: false,
    }));
    saveStoredData({ tourStepReached: 1 });
  }, []);

  const nextTourStep = useCallback(() => {
    setState(prev => {
      const nextStep = prev.tourStep + 1;
      saveStoredData({ tourStepReached: nextStep });
      return {
        ...prev,
        tourStep: nextStep,
      };
    });
  }, []);

  const prevTourStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      tourStep: Math.max(1, prev.tourStep - 1),
    }));
  }, []);

  const dismissTour = useCallback(() => {
    setState(prev => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showTour: false,
        showPathways: true,
        isTransitioning: false,
      }));
      saveStoredData({ tourSkipped: true });
      // Don't mark as skipped yet - they might still choose a pathway
    }, 400);
  }, []);

  const completeTour = useCallback((chosenStart: string) => {
    setState(prev => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showOverlay: false,
        showTour: false,
        showPathways: false,
        isTransitioning: false,
      }));
      
      // Update legacy storage
      saveStoredData({
        firstVisit: false,
        tourCompleted: true,
        chosenStart,
      });
      setOverlayData(prev => ({
        ...prev,
        firstVisit: false,
        tourCompleted: true,
        chosenStart,
      }));
      
      // Update new unified state
      markTourCompleted();
      markFullyOnboarded();
    }, 600);
  }, []);

  const selectPathway = useCallback((pathId: string) => {
    setState(prev => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showOverlay: false,
        showPathways: false,
        isTransitioning: false,
      }));
      
      // Update legacy storage
      saveStoredData({
        firstVisit: false,
        tourSkipped: true,
        chosenPath: pathId,
      });
      setOverlayData(prev => ({
        ...prev,
        firstVisit: false,
        tourSkipped: true,
        chosenPath: pathId,
      }));
      
      // Update new unified state - pathway selection counts as completing tour
      markTourCompleted();
      markFullyOnboarded();
    }, 600);
  }, []);

  const skipToExplore = useCallback(() => {
    setState(prev => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showOverlay: false,
        showTour: false,
        showPathways: false,
        isTransitioning: false,
      }));
      
      // Update legacy storage
      saveStoredData({
        firstVisit: false,
        tourSkipped: true,
        pathSkipped: true,
      });
      setOverlayData(prev => ({
        ...prev,
        firstVisit: false,
        tourSkipped: true,
        pathSkipped: true,
      }));
      
      // Update new unified state - skipping still marks as onboarded
      markTourSkipped();
      markFullyOnboarded();
    }, 500);
  }, []);

  const resetOverlay = useCallback(() => {
    // Reset legacy storage
    localStorage.removeItem(STORAGE_KEY);
    
    // Reset new unified state
    resetOnboarding();
    
    setOverlayData({
      firstVisit: true,
      tourCompleted: false,
      tourSkipped: false,
      tourStepReached: 0,
      chosenStart: null,
      chosenPath: null,
      pathSkipped: false,
    });
    setState({
      showOverlay: true,
      showTour: true,
      tourStep: 1,
      showPathways: false,
      isTransitioning: false,
    });
  }, []);

  return {
    ...state,
    overlayData,
    startTour,
    nextTourStep,
    prevTourStep,
    dismissTour,
    completeTour,
    selectPathway,
    skipToExplore,
    resetOverlay,
  };
}
