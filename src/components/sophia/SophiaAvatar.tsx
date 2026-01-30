import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Lazy load the 3D NoiseOrb
const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface SophiaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
}

export function SophiaAvatar({ size = 'md', isSpeaking = false }: SophiaAvatarProps) {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-20 h-20 md:w-24 md:h-24',
    xl: 'w-28 h-28 md:w-32 md:h-32',
  };

  // CSS fallback orb for when 3D is loading
  const FallbackOrb = () => (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 245, 0.85) 30%, transparent 70%),
          radial-gradient(ellipse at 70% 60%, rgba(212, 160, 48, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 30%, rgba(194, 112, 60, 0.3) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 70%, rgba(156, 174, 166, 0.25) 0%, transparent 40%),
          linear-gradient(145deg, rgba(255, 252, 250, 0.9) 0%, rgba(255, 245, 235, 0.8) 100%)
        `,
        boxShadow: `
          0 0 30px rgba(212, 160, 48, 0.2),
          0 0 50px rgba(194, 112, 60, 0.15),
          inset 0 0 20px rgba(255, 255, 255, 0.6)
        `,
      }}
      animate={{
        scale: isSpeaking ? [1, 1.05, 1] : [1, 1.02, 1],
      }}
      transition={{
        duration: isSpeaking ? 0.8 : 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Outer soft glow - now with Sophia's brand colors */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 160, 48, 0.3) 0%, rgba(194, 112, 60, 0.2) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={isSpeaking ? {
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.9, 0.5],
        } : {
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isSpeaking ? 0.8 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D NoiseOrb */}
      <div className={`${sizeClasses[size]} rounded-full relative overflow-hidden`}>
        <Suspense fallback={<FallbackOrb />}>
          <NoiseOrb 
            size="100%" 
            preset="sophia"
            noiseIntensity={isSpeaking ? 0.6 : 0.35}
            speed={isSpeaking ? 1.2 : 0.6}
          />
        </Suspense>
      </div>

      {/* Speaking indicator - subtle waves */}
      {isSpeaking && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ backgroundColor: 'rgba(212, 160, 48, 0.7)' }}
              animate={{
                height: ['4px', '12px', '4px'],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
