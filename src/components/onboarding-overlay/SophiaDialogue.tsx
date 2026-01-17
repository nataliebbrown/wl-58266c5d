import { motion, AnimatePresence } from 'framer-motion';
import { SophiaAvatar } from './SophiaAvatar';
import { TypewriterText } from './TypewriterText';
import { Button } from '@/components/ui/button';
import { ChevronRight, SkipForward } from 'lucide-react';

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
  center: 'fixed inset-0 flex items-center justify-center p-4',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`${positionClasses[position]} z-50`}
    >
      <div className={`
        bg-cream/95 backdrop-blur-lg rounded-2xl shadow-2xl
        border border-terracotta/20
        ${isCenter ? 'p-8 md:p-12 max-w-lg w-full' : 'p-6'}
      `}>
        <div className={`flex ${isCenter ? 'flex-col items-center text-center' : 'items-start gap-4'}`}>
          {/* Avatar */}
          <div className={isCenter ? 'mb-6' : ''}>
            <SophiaAvatar size={isCenter ? 'xl' : 'md'} isSpeaking={isSpeaking} />
          </div>

          {/* Dialogue content */}
          <div className={`flex-1 ${isCenter ? '' : ''}`}>
            {!isCenter && (
              <p className="text-xs text-terracotta font-medium mb-1">Sophia</p>
            )}
            <div className={`
              text-charcoal leading-relaxed
              ${isCenter ? 'text-lg md:text-xl font-spiritual' : 'text-base'}
            `}>
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
              className={`
                mt-6 flex gap-3
                ${isCenter ? 'flex-col sm:flex-row justify-center' : 'justify-end'}
              `}
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
