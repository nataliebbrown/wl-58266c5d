import { motion, AnimatePresence } from 'framer-motion';
import { SophiaAvatar } from './SophiaAvatar';
import { TypewriterText } from './TypewriterText';
import { Button } from '@/components/ui/button';
import { ChevronRight, SkipForward } from 'lucide-react';
import { lazy, Suspense } from 'react';

// Lazy load the NoiseOrb for performance
const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface SophiaDialogueProps {
  message: string;
  isSpeaking: boolean;
  onMessageComplete: () => void;
  showActions?: boolean;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  position?: 'center' | 'bottom-left' | 'bottom-right' | 'top-right';
  skipAction?: {
    label: string;
    onClick: () => void;
  };
}

const positionClasses = {
  center: 'fixed inset-0 flex flex-col items-center justify-center p-4',
  'bottom-left': 'fixed bottom-6 left-6 max-w-md',
  'bottom-right': 'fixed bottom-6 right-6 max-w-md',
  'top-right': 'fixed top-24 right-6 max-w-md',
};

export function SophiaDialogue({
  message,
  isSpeaking,
  onMessageComplete,
  showActions = false,
  primaryAction,
  secondaryAction,
  position = 'center',
  skipAction,
}: SophiaDialogueProps) {
  const isCenter = position === 'center';

  // Immersive fullscreen layout for center position
  if (isCenter) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex flex-col"
      >
        {/* Large NoiseOrb in center */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Glow effect behind orb */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-60"
              style={{
                background: 'radial-gradient(circle, #C5B49B 0%, #8A7356 40%, transparent 70%)',
                transform: 'scale(1.3)',
              }}
            />
            <Suspense fallback={
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #C5B49B, #8A7356, #DED1BA)',
                }}
              />
            }>
              <NoiseOrb 
                size="100%" 
                preset="sophia" 
                noiseIntensity={isSpeaking ? 1.0 : 0.5} 
                speed={isSpeaking ? 8.0 : 2.5} 
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Text and buttons at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="pb-12 md:pb-16 px-6 md:px-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            {/* Sophia's message in white text */}
            <div className="text-white text-sm md:text-base lg:text-lg font-light leading-relaxed tracking-wide">
              <TypewriterText
                text={message}
                speed={25}
                onComplete={onMessageComplete}
                delay={300}
              />
            </div>

            {/* Actions */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                >
                  {secondaryAction && (
                    <Button
                      variant="outline"
                      onClick={secondaryAction.onClick}
                      className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button
                      onClick={primaryAction.onClick}
                      className="bg-[#C5B49B] hover:bg-[#8A7356] text-[#120F0C]"
                    >
                      {primaryAction.label}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Skip button - top right */}
        {skipAction && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={skipAction.onClick}
            className="absolute top-6 right-6 text-white/50 hover:text-white/80 transition-colors flex items-center gap-1 text-sm"
          >
            <SkipForward className="w-4 h-4" />
            {skipAction.label}
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Original card-based layout for non-center positions
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`${positionClasses[position]} z-50`}
    >
      <div className="bg-cream/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-terracotta/20 p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <SophiaAvatar size="md" isSpeaking={isSpeaking} />

          {/* Dialogue content */}
          <div className="flex-1">
            <p className="text-xs text-terracotta font-medium mb-1">Sophia</p>
            <div className="text-charcoal leading-relaxed text-base">
              <TypewriterText
                text={message}
                speed={25}
                onComplete={onMessageComplete}
                delay={300}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex gap-3 justify-end"
            >
              {secondaryAction && (
                <Button
                  variant="outline"
                  onClick={secondaryAction.onClick}
                  className="border-charcoal/20 text-charcoal hover:bg-cream"
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  onClick={primaryAction.onClick}
                  className="bg-terracotta hover:bg-terracotta/90 text-white"
                >
                  {primaryAction.label}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button */}
        {skipAction && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={skipAction.onClick}
            className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal/70 transition-colors flex items-center gap-1 text-sm"
          >
            <SkipForward className="w-4 h-4" />
            {skipAction.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
