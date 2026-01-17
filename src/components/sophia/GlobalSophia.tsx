import { useState } from 'react';
import { FloatingSophiaButton } from './FloatingSophiaButton';
import { SophiaAudioOverlay } from './SophiaAudioOverlay';
import { useUserProfile } from '@/hooks/useUserProfile';

export function GlobalSophia() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { getPersonaFromOnboarding } = useUserProfile();
  
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || undefined;

  return (
    <>
      <FloatingSophiaButton onClick={() => setIsOverlayOpen(true)} />
      <SophiaAudioOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)}
        userName={userName}
      />
    </>
  );
}
