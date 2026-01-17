import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SophiaAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

export function SophiaAvatar({ size = 'md' }: SophiaAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-20 h-20 md:w-24 md:h-24',
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-terracotta to-ochre flex items-center justify-center shadow-lg relative`}
      animate={{
        boxShadow: [
          '0 0 20px rgba(184, 90, 62, 0.3)',
          '0 0 40px rgba(184, 90, 62, 0.5)',
          '0 0 20px rgba(184, 90, 62, 0.3)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Sparkles 
        size={iconSizes[size]} 
        className="text-cream"
        strokeWidth={1.5}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cream/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
