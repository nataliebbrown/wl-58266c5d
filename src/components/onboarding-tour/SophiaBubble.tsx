import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface BubbleAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface SophiaBubbleProps {
  message: string;
  position: { x: number; y: number };
  actions?: BubbleAction[];
  showActions: boolean;
  onTypingComplete: () => void;
  centered?: boolean;
  arrow?: 'left' | 'right' | 'top' | null;
  dismissButton?: ReactNode;
}

export function SophiaBubble({
  message,
  position,
  actions,
  showActions,
  onTypingComplete,
  centered,
  arrow,
  dismissButton,
}: SophiaBubbleProps) {
  // Fire onTypingComplete after a short delay to allow reading
  useEffect(() => {
    const timer = setTimeout(onTypingComplete, 600);
    return () => clearTimeout(timer);
  }, [message, onTypingComplete]);

  return (
    <motion.div
      layout
      animate={{
        x: centered ? '-50%' : 0,
        y: 0,
        left: centered ? '50%' : position.x,
        top: centered ? undefined : position.y,
        bottom: centered ? 40 : undefined,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.8 }}
      className="fixed z-50"
      style={centered ? {} : { position: 'fixed' }}
    >
      <motion.div
        key={message}
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl max-w-[340px] border border-wl-olive/25 dark:border-wl-olive-300/25 tour-bubble-card"
        style={{
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Dismiss button */}
        {dismissButton}

        {/* Arrow pointing toward the active card */}
        {arrow && (
          <div
            className="absolute w-5 h-5 tour-bubble-card"
            style={{
              transform: 'rotate(45deg)',
              boxShadow: arrow === 'left' ? '-3px 3px 6px rgba(0,0,0,0.1)' : arrow === 'right' ? '3px -3px 6px rgba(0,0,0,0.1)' : '-3px -3px 6px rgba(0,0,0,0.1)',
              ...(arrow === 'left' && { left: -10, top: 22 }),
              ...(arrow === 'right' && { right: -10, top: 22 }),
              ...(arrow === 'top' && { top: -10, left: 28 }),
            }}
          />
        )}
        {/* Small Sophia Orb */}
        <div className="flex-shrink-0 mt-0.5">
          <Suspense
            fallback={
              <div className="w-10 h-10 rounded-full bg-foreground/[0.04] animate-pulse" />
            }
          >
            <NoiseOrb size={40} preset="white" noiseIntensity={0.3} speed={0.6} />
          </Suspense>
        </div>

        {/* Text + Actions */}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-foreground/80">
            {message}
          </p>

          <AnimatePresence>
            {showActions && actions && actions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="flex flex-wrap gap-2 mt-3"
              >
                {actions.map((action) => (
                  <button
                    key={action.label}
                    onClick={action.onClick}
                    className={
                      action.variant === 'secondary'
                        ? 'text-xs text-foreground/45 hover:text-foreground/70 transition-colors'
                        : 'px-4 py-1.5 rounded-full text-xs font-medium bg-foreground text-background hover:bg-foreground/80 hover:scale-105 active:scale-95 transition-all duration-200'
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
