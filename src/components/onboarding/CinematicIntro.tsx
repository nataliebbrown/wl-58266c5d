import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type AnimationPhase = 
  | 'initial'
  | 'overlay-fade'
  | 'tagline-appear'
  | 'orb-rise'
  | 'orb-colorize'
  | 'orb-center'
  | 'logo-appear'
  | 'transform-button'
  | 'expand-cta'
  | 'typing'
  | 'complete';

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [typedText, setTypedText] = useState('');
  const fullText = 'Begin Your Journey';

  // Animation sequence timeline
  useEffect(() => {
    const timeline: { phase: AnimationPhase; delay: number }[] = [
      { phase: 'overlay-fade', delay: 300 },
      { phase: 'tagline-appear', delay: 800 },
      { phase: 'orb-rise', delay: 1500 },
      { phase: 'orb-colorize', delay: 2500 },
      { phase: 'orb-center', delay: 3500 },
      { phase: 'logo-appear', delay: 4500 },
      { phase: 'transform-button', delay: 5500 },
      { phase: 'expand-cta', delay: 6300 },
      { phase: 'typing', delay: 6800 },
    ];

    timeline.forEach(({ phase: nextPhase, delay }) => {
      setTimeout(() => setPhase(nextPhase), delay);
    });
  }, []);

  // Typing animation
  useEffect(() => {
    if (phase === 'typing') {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setPhase('complete'), 500);
        }
      }, 60);
      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  const handleCtaClick = () => {
    if (phase === 'complete' || phase === 'typing') {
      onComplete();
    }
  };

  // Calculate orb position and size based on phase
  const getOrbStyles = () => {
    switch (phase) {
      case 'initial':
      case 'overlay-fade':
      case 'tagline-appear':
        return {
          y: '150vh',
          scale: 8,
          opacity: 0,
        };
      case 'orb-rise':
        return {
          y: '30vh',
          scale: 6,
          opacity: 1,
        };
      case 'orb-colorize':
        return {
          y: '10vh',
          scale: 4,
          opacity: 1,
        };
      case 'orb-center':
        return {
          y: '0vh',
          scale: 2,
          opacity: 1,
        };
      case 'logo-appear':
        return {
          y: '-5vh',
          scale: 1,
          opacity: 1,
        };
      default:
        return {
          y: '-5vh',
          scale: 1,
          opacity: 1,
        };
    }
  };

  const showWhiteOrb = ['orb-rise'].includes(phase);
  const showColoredOrb = ['orb-colorize', 'orb-center', 'logo-appear', 'transform-button', 'expand-cta', 'typing', 'complete'].includes(phase);
  const showLogo = ['logo-appear', 'transform-button', 'expand-cta', 'typing', 'complete'].includes(phase);
  const showButton = ['transform-button', 'expand-cta', 'typing', 'complete'].includes(phase);
  const showExpandedCta = ['expand-cta', 'typing', 'complete'].includes(phase);

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background overlay - darkens the page */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/95 to-charcoal"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'initial' ? 0 : 1 
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Ambient glow at bottom during orb rise */}
      <AnimatePresence>
        {(phase === 'orb-rise' || phase === 'orb-colorize') && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[60vh]"
            style={{
              background: 'radial-gradient(ellipse at center bottom, rgba(212, 165, 116, 0.4) 0%, rgba(184, 90, 62, 0.2) 30%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Tagline text */}
      <motion.p
        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-cream/80 text-sm md:text-base tracking-[0.3em] uppercase font-light text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: ['tagline-appear', 'orb-rise', 'orb-colorize', 'orb-center', 'logo-appear'].includes(phase) ? 1 : 0,
          y: ['tagline-appear', 'orb-rise', 'orb-colorize', 'orb-center', 'logo-appear'].includes(phase) ? 0 : 10,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Where ancient wisdom meets modern discovery
      </motion.p>

      {/* White Orb (sunrise phase) */}
      <AnimatePresence>
        {showWhiteOrb && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ y: '150vh', scale: 8 }}
            animate={{ y: '30vh', scale: 6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #faf8f5 60%, #f0ebe0 100%)',
                boxShadow: `
                  0 0 100px 50px rgba(255, 255, 255, 0.5),
                  0 0 200px 100px rgba(212, 165, 116, 0.3),
                  0 0 300px 150px rgba(184, 90, 62, 0.2)
                `,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Colored Sophia Orb */}
      <AnimatePresence>
        {showColoredOrb && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ y: '30vh', scale: 4, opacity: 0 }}
            animate={getOrbStyles()}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Main orb */}
              <motion.div 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,242,255,0.8) 100%)',
                  boxShadow: `
                    0 0 60px rgba(167, 139, 250, 0.25),
                    0 0 100px rgba(96, 165, 250, 0.2),
                    inset 0 0 30px rgba(255, 255, 255, 0.9)
                  `,
                }}
                animate={showButton ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {/* Iridescent inner layers */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 30% 20%, rgba(96, 165, 250, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 60%, rgba(167, 139, 250, 0.6) 0%, transparent 45%),
                      radial-gradient(ellipse at 40% 80%, rgba(244, 114, 182, 0.5) 0%, transparent 40%),
                      radial-gradient(ellipse at 80% 30%, rgba(45, 212, 191, 0.4) 0%, transparent 35%)
                    `,
                    filter: 'blur(12px)',
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Secondary layer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 60% 30%, rgba(45, 212, 191, 0.5) 0%, transparent 40%),
                      radial-gradient(ellipse at 30% 70%, rgba(167, 139, 250, 0.4) 0%, transparent 45%)
                    `,
                    filter: 'blur(14px)',
                  }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Glossy highlight */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 50%),
                      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 30%)
                    `,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scripture AI Logo text */}
      <AnimatePresence>
        {showLogo && !showButton && (
          <motion.h1
            className="absolute left-1/2 -translate-x-1/2 font-spiritual text-4xl md:text-5xl lg:text-6xl text-cream font-medium tracking-wide"
            style={{ top: 'calc(50% + 100px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Scripture AI
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Circular action button (transforms from orb) */}
      <AnimatePresence>
        {showButton && !showExpandedCta && (
          <motion.button
            className="absolute left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream/95 flex items-center justify-center cursor-pointer"
            style={{ 
              top: 'calc(50% - 48px)',
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={handleCtaClick}
          >
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-charcoal" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded CTA button */}
      <AnimatePresence>
        {showExpandedCta && (
          <motion.button
            className="absolute left-1/2 -translate-x-1/2 h-16 md:h-20 px-10 md:px-16 rounded-full bg-cream/95 flex items-center justify-center gap-4 cursor-pointer hover:bg-cream transition-colors"
            style={{ 
              top: 'calc(50% - 40px)',
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.25), 0 12px 48px rgba(0, 0, 0, 0.25)',
            }}
            initial={{ width: 96, borderRadius: 48 }}
            animate={{ width: 'auto', borderRadius: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
          >
            <motion.span 
              className="font-spiritual text-xl md:text-2xl text-charcoal font-medium whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {typedText}
              {phase === 'typing' && (
                <motion.span
                  className="inline-block w-0.5 h-6 md:h-7 bg-primary ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-charcoal" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {onSkip && phase !== 'complete' && (
        <motion.button
          className="absolute bottom-8 right-8 text-cream/60 hover:text-cream/90 text-sm tracking-wide transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onSkip}
        >
          Skip intro
        </motion.button>
      )}
    </motion.div>
  );
}
