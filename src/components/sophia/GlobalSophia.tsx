import { useState } from 'react';
import { FloatingSophiaButton } from './FloatingSophiaButton';
import { SophiaAudioOverlay } from './SophiaAudioOverlay';

export function GlobalSophia() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <FloatingSophiaButton onClick={() => setIsOverlayOpen(true)} />
      <SophiaAudioOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
    </>
  );
}
