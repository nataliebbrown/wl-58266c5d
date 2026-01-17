import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingSophiaButtonProps {
  onClick: () => void;
}

export function FloatingSophiaButton({ onClick }: FloatingSophiaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Talk to Sophia"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-accent/40"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ filter: 'blur(8px)' }}
      />

      {/* Second glow layer */}
      <motion.div
        className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-secondary/30"
        animate={{
          scale: [1.05, 1.25, 1.05],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{ filter: 'blur(12px)' }}
      />

      {/* Main avatar circle */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center overflow-hidden shadow-xl"
        animate={{
          boxShadow: isHovered
            ? '0 0 30px hsl(var(--primary) / 0.5)'
            : '0 0 20px hsl(var(--primary) / 0.3)',
        }}
      >
        {/* Face elements */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute flex gap-3" style={{ top: '35%' }}>
            <motion.div
              className="w-2 h-2 rounded-full bg-cream"
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-cream"
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 4,
                delay: 0.05,
              }}
            />
          </div>

          {/* Mouth - smile */}
          <div
            className="absolute bg-cream/90 rounded-full"
            style={{ bottom: '28%', width: '14px', height: '6px' }}
          />

          {/* Cheek blush */}
          <div className="absolute flex gap-8" style={{ top: '45%' }}>
            <div className="w-2 h-1.5 rounded-full bg-cream/30" />
            <div className="w-2 h-1.5 rounded-full bg-cream/30" />
          </div>
        </div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute top-2 right-2 w-1.5 h-1.5 bg-cream rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none"
      >
        Talk to Sophia
      </motion.div>
    </motion.button>
  );
}
