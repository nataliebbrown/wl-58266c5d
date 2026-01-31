import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FloatingSophiaButton } from './FloatingSophiaButton';
import { SophiaAudioOverlay } from './SophiaAudioOverlay';
import { useSophiaOrbIntercept } from './SophiaOrbInterceptContext';
import { useUserProfile } from '@/hooks/useUserProfile';

export function GlobalSophia() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { handler, hideOrb, contextLabel } = useSophiaOrbIntercept();
  const { getPersonaFromOnboarding } = useUserProfile();
  const location = useLocation();

  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || undefined;

  const handleClick = useCallback(() => {
    if (handler) {
      handler();
    } else {
      setIsOverlayOpen(true);
    }
  }, [handler]);

  const handleSendPrompt = useCallback((prompt: string) => {
    if (handler) {
      handler(prompt);
    } else {
      setIsOverlayOpen(true);
    }
  }, [handler]);

  return (
    <>
      {!hideOrb && (
        <FloatingSophiaButton
          onClick={handleClick}
          onSendPrompt={handleSendPrompt}
          currentPath={location.pathname}
          contextLabel={contextLabel}
        />
      )}
      <SophiaAudioOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        userName={userName}
      />
    </>
  );
}
