import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SpotlightOverlayProps {
  targetSelector: string | null;
  isActive: boolean;
  padding?: number;
  borderRadius?: number;
}

interface SpotlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function SpotlightOverlay({ 
  targetSelector, 
  isActive,
  padding = 16,
  borderRadius = 16
}: SpotlightOverlayProps) {
  const [position, setPosition] = useState<SpotlightPosition | null>(null);

  useEffect(() => {
    if (!targetSelector || !isActive) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetSelector, isActive, padding]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse ${position.width + 100}px ${position.height + 100}px at ${position.left + position.width / 2}px ${position.top + position.height / 2}px,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.7) 100%
            )`,
          }}
        >
          {/* Spotlight border glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute border-2 border-terracotta/50 shadow-lg"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              height: position.height,
              borderRadius: borderRadius,
              boxShadow: '0 0 30px rgba(184, 90, 62, 0.3), inset 0 0 30px rgba(184, 90, 62, 0.1)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
