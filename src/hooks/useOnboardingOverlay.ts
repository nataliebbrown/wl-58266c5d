import { useState, useEffect, useCallback } from 'react';

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

const STORAGE_KEY = 'scripture_ai_overlay_data';

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
    const data = getStoredData();
    setOverlayData(data);
    
    // Show overlay only on first visit
    if (data.firstVisit && !data.tourCompleted && !data.pathSkipped) {
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
    }, 500);
  }, []);

  const resetOverlay = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
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
