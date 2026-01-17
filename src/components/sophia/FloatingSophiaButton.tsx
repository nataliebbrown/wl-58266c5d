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
      className="fixed bottom-6 right-6 z-50 focus:outline-none focus:ring-2 focus:ring-[#87A96B] focus:ring-offset-2 rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Talk to Sophia"
    >
      {/* Outer soft glow */}
      <motion.div
        className="absolute inset-0 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(96, 165, 250, 0.3) 50%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main orb container */}
      <motion.div 
        className="relative w-16 h-16 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.8) 100%)',
          boxShadow: isHovered
            ? `0 0 50px rgba(167, 139, 250, 0.4), 0 0 80px rgba(96, 165, 250, 0.25), inset 0 0 25px rgba(255, 255, 255, 0.9)`
            : `0 0 40px rgba(167, 139, 250, 0.25), 0 0 60px rgba(96, 165, 250, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.8)`,
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 50px rgba(167, 139, 250, 0.4), 0 0 80px rgba(96, 165, 250, 0.25), inset 0 0 25px rgba(255, 255, 255, 0.9)`
            : `0 0 40px rgba(167, 139, 250, 0.25), 0 0 60px rgba(96, 165, 250, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.8)`,
        }}
      >
        {/* Iridescent inner orb */}
        <motion.div
          className="absolute inset-0 m-auto w-12 h-12 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(96, 165, 250, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(167, 139, 250, 0.7) 0%, transparent 45%),
              radial-gradient(ellipse at 40% 80%, rgba(244, 114, 182, 0.6) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 30%, rgba(45, 212, 191, 0.5) 0%, transparent 35%),
              radial-gradient(ellipse at 50% 50%, rgba(129, 140, 248, 0.4) 0%, transparent 60%)
            `,
            filter: 'blur(6px)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Secondary color layer */}
        <motion.div
          className="absolute inset-0 m-auto w-12 h-12 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 60% 30%, rgba(45, 212, 191, 0.6) 0%, transparent 40%),
              radial-gradient(ellipse at 30% 70%, rgba(167, 139, 250, 0.5) 0%, transparent 45%),
              radial-gradient(ellipse at 70% 80%, rgba(96, 165, 250, 0.4) 0%, transparent 35%)
            `,
            filter: 'blur(8px)',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Glossy highlight overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 30%)
            `,
          }}
        />

        {/* Subtle rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: 'inset 0 0 15px rgba(167, 139, 250, 0.25)',
          }}
        />
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none border border-border/50"
      >
        Talk to Sophia
      </motion.div>
    </motion.button>
  );
}
