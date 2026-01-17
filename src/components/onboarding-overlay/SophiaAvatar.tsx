import { motion } from 'framer-motion';

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

  const innerSizes = {
    sm: 'w-7 h-7',
    md: 'w-12 h-12 md:w-16 md:h-16',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-28 md:h-28',
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Outer soft glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(96, 165, 250, 0.2) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={isSpeaking ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isSpeaking ? 1 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main orb container */}
      <div 
        className={`${sizeClasses[size]} rounded-full relative overflow-hidden`}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.7) 100%)',
          boxShadow: `
            0 0 40px rgba(167, 139, 250, 0.2),
            0 0 60px rgba(96, 165, 250, 0.15),
            inset 0 0 20px rgba(255, 255, 255, 0.8)
          `,
        }}
      >
        {/* Iridescent inner orb */}
        <motion.div
          className={`absolute inset-0 m-auto ${innerSizes[size]} rounded-full`}
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(96, 165, 250, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(167, 139, 250, 0.7) 0%, transparent 45%),
              radial-gradient(ellipse at 40% 80%, rgba(244, 114, 182, 0.6) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 30%, rgba(45, 212, 191, 0.5) 0%, transparent 35%),
              radial-gradient(ellipse at 50% 50%, rgba(129, 140, 248, 0.4) 0%, transparent 60%)
            `,
            filter: 'blur(8px)',
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

        {/* Secondary color layer - moves opposite direction */}
        <motion.div
          className={`absolute inset-0 m-auto ${innerSizes[size]} rounded-full`}
          style={{
            background: `
              radial-gradient(ellipse at 60% 30%, rgba(45, 212, 191, 0.6) 0%, transparent 40%),
              radial-gradient(ellipse at 30% 70%, rgba(167, 139, 250, 0.5) 0%, transparent 45%),
              radial-gradient(ellipse at 70% 80%, rgba(96, 165, 250, 0.4) 0%, transparent 35%)
            `,
            filter: 'blur(10px)',
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

        {/* Pulsing core when speaking */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Glossy highlight overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 30%)
            `,
          }}
        />

        {/* Subtle rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'transparent',
            boxShadow: 'inset 0 0 15px rgba(167, 139, 250, 0.2)',
          }}
        />
      </div>

      {/* Speaking indicator - subtle waves */}
      {isSpeaking && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ backgroundColor: 'rgba(167, 139, 250, 0.7)' }}
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
