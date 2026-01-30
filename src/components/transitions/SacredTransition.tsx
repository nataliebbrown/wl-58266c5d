import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTimeConfig } from '@/lib/timeAwareness';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

// ============ Phrases ============

const phrases = [
  'Be still.',
  'You are seen.',
  'Grace upon grace.',
  'Come as you are.',
  'The Lord is near.',
  'Rest in Him.',
  'He is faithful.',
  'New mercies.',
  'You are loved.',
  'Breathe.',
];

/** Pick a phrase based on the current date + time period so it rotates daily. */
function getPhrase(): string {
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const index = (day + Math.floor(hour / 5)) % phrases.length;
  return phrases[index];
}

// ============ Component ============

interface SacredTransitionProps {
  onComplete: () => void;
  duration?: number; // auto-advance duration in ms (default 2500)
}

export function SacredTransition({ onComplete, duration = 2500 }: SacredTransitionProps) {
  const [visible, setVisible] = useState(true);
  const config = getTimeConfig();
  const phrase = getPhrase();

  const dismiss = useCallback(() => {
    setVisible(false);
    // Let the exit animation finish before calling onComplete
    setTimeout(onComplete, 500);
  }, [onComplete]);

  // Auto-advance timer
  useEffect(() => {
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [dismiss, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
          style={{ background: config.gradient }}
        >
          {/* Breathing Sophia Orb */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              y: [0, -6, 0],
            }}
            transition={{
              scale: { duration: 4, ease: 'easeInOut', repeat: Infinity },
              y: { duration: 5, ease: 'easeInOut', repeat: Infinity },
            }}
            className="relative"
          >
            {/* Radial glow behind orb */}
            <div
              className="absolute inset-[-50%] rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  config.textColor === '#2D3748'
                    ? 'rgba(138, 115, 86, 0.2)'
                    : 'rgba(197, 180, 155, 0.3)'
                } 0%, transparent 70%)`,
              }}
            />
            <img
              src={sophiaOrb}
              alt=""
              className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
            />
          </motion.div>

          {/* Spiritual phrase */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-xl md:text-2xl font-light tracking-wide"
            style={{
              color: config.textColor,
              fontFamily: '"Libre Bodoni", Georgia, serif',
            }}
          >
            {phrase}
          </motion.p>

          {/* Subtle tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-10 text-xs"
            style={{ color: config.textColor }}
          >
            Tap anywhere to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
