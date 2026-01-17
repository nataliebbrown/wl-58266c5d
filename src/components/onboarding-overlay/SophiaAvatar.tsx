import { motion } from 'framer-motion';

interface SophiaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
}

export function SophiaAvatar({ size = 'md', isSpeaking = false }: SophiaAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-20 h-20 md:w-24 md:h-24',
    xl: 'w-28 h-28 md:w-32 md:h-32',
  };

  return (
    <div className="relative">
      {/* Outer glow ring - pulses when speaking */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-terracotta/40 to-ochre/40`}
        animate={isSpeaking ? {
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        } : {
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isSpeaking ? 1 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ filter: 'blur(8px)' }}
      />

      {/* Second glow layer */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-ochre/30 to-sage/30`}
        animate={{
          scale: [1.05, 1.2, 1.05],
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
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-terracotta via-ochre to-terracotta flex items-center justify-center relative overflow-hidden shadow-xl`}
        animate={isSpeaking ? {
          boxShadow: [
            '0 0 20px rgba(184, 90, 62, 0.4)',
            '0 0 40px rgba(184, 90, 62, 0.6)',
            '0 0 20px rgba(184, 90, 62, 0.4)',
          ],
        } : {}}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Animated face elements */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute flex gap-3 md:gap-4" style={{ top: '35%' }}>
            <motion.div
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cream"
              animate={{
                scaleY: [1, 0.2, 1],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            <motion.div
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cream"
              animate={{
                scaleY: [1, 0.2, 1],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 0.05,
              }}
            />
          </div>

          {/* Mouth - animates when speaking */}
          <motion.div
            className="absolute bg-cream/90 rounded-full"
            style={{ bottom: '28%' }}
            animate={isSpeaking ? {
              width: ['12px', '16px', '10px', '14px', '12px'],
              height: ['6px', '10px', '4px', '8px', '6px'],
              borderRadius: ['50%', '40%', '50%', '45%', '50%'],
            } : {
              width: '14px',
              height: '6px',
            }}
            transition={isSpeaking ? {
              duration: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            } : {}}
          />

          {/* Cheek blush */}
          <div className="absolute flex gap-8 md:gap-10" style={{ top: '45%' }}>
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
            delay: 0,
          }}
        />
        <motion.div
          className="absolute bottom-3 left-3 w-1 h-1 bg-cream rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.7,
          }}
        />
      </motion.div>

      {/* Speaking indicator waves */}
      {isSpeaking && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-terracotta rounded-full"
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
