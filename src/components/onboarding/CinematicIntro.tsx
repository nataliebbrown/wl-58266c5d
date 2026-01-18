import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import introBackground from '@/assets/intro-background.jpg';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText = 'Begin Your Journey';

  // Preload the background image before starting animations
  useEffect(() => {
    const img = new Image();
    img.src = introBackground;
    img.onload = () => setImageLoaded(true);
    // If image is already cached, it loads immediately
    if (img.complete) setImageLoaded(true);
  }, []);

  // Animation sequence timeline - only starts after image is loaded
  useEffect(() => {
    if (!imageLoaded) return;

    const timeline: { phase: AnimationPhase; delay: number }[] = [
      { phase: 'overlay-fade', delay: 800 }, // Give more time to see initial logo
      { phase: 'tagline-appear', delay: 1500 },
      { phase: 'orb-rise', delay: 2200 },
      { phase: 'orb-colorize', delay: 3200 },
      { phase: 'orb-center', delay: 4200 },
      { phase: 'logo-appear', delay: 5200 },
      { phase: 'transform-button', delay: 6200 },
      { phase: 'expand-cta', delay: 7000 },
      { phase: 'typing', delay: 7500 },
    ];

    const timeoutIds = timeline.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase), delay)
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, [imageLoaded]);

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
  // y is relative to center (0 = center, positive = down, negative = up)
  const getOrbStyles = () => {
    switch (phase) {
      case 'initial':
      case 'overlay-fade':
      case 'tagline-appear':
        return {
          y: 400, // Start below screen
          scale: 3,
          opacity: 0,
        };
      case 'orb-rise':
        return {
          y: 150, // Rising from bottom
          scale: 2.5,
          opacity: 1,
        };
      case 'orb-colorize':
        return {
          y: 80, // Continuing to rise
          scale: 1.8,
          opacity: 1,
        };
      case 'orb-center':
        return {
          y: 0, // At center
          scale: 1.2,
          opacity: 1,
        };
      case 'logo-appear':
        return {
          y: -30, // Slightly above center to make room for logo
          scale: 1,
          opacity: 1,
        };
      case 'transform-button':
        return {
          y: 0, // Move to center for button
          scale: 0.6, // Shrink to button size
          opacity: 1,
        };
      default:
        return {
          y: 0,
          scale: 0.6,
          opacity: 1,
        };
    }
  };

  const showInitialLogo = ['initial', 'overlay-fade'].includes(phase);
  const showOrb = ['orb-rise', 'orb-colorize', 'orb-center', 'logo-appear', 'transform-button'].includes(phase);
  const isColorized = ['orb-colorize', 'orb-center', 'logo-appear', 'transform-button', 'expand-cta', 'typing', 'complete'].includes(phase);
  const showLogo = ['logo-appear'].includes(phase); // Only show during logo-appear, hide when button appears
  const showButton = ['transform-button', 'expand-cta', 'typing', 'complete'].includes(phase);
  const showExpandedCta = ['expand-cta', 'typing', 'complete'].includes(phase);

  // Don't render anything until image is loaded - prevents white flash
  if (!imageLoaded) {
    return (
      <div className="fixed inset-0 z-50 bg-[#C4A77D]" /> // Match dominant color of background
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Abstract background - always visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${introBackground})` }}
      />

      {/* Large Scripture AI logo on initial background - fades out smoothly */}
      <AnimatePresence>
        {showInitialLogo && (
          <motion.h1
            className="absolute inset-0 flex items-center justify-center font-spiritual text-6xl md:text-7xl lg:text-8xl text-charcoal font-medium tracking-wide text-center z-10"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Scripture AI
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Background overlay - darkens the page after initial */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/90 to-charcoal"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: ['initial', 'overlay-fade'].includes(phase) ? 0 : 1 
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
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: ['tagline-appear', 'orb-rise', 'orb-colorize', 'orb-center', 'logo-appear'].includes(phase) ? 1 : 0,
          y: ['tagline-appear', 'orb-rise', 'orb-colorize', 'orb-center', 'logo-appear'].includes(phase) ? 0 : 10,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-cream/80 text-sm md:text-base tracking-[0.3em] uppercase font-light text-center px-4">
          Where ancient wisdom meets modern discovery
        </p>
      </motion.div>

      {/* Single unified orb that transitions from white to colored, then morphs to button */}
      <AnimatePresence>
        {showOrb && !showExpandedCta && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ y: 400, scale: 3 }}
            animate={getOrbStyles()}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Base white orb layer */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #faf8f5 60%, #f0ebe0 100%)',
                  boxShadow: `
                    0 0 100px 50px rgba(255, 255, 255, 0.5),
                    0 0 200px 100px rgba(212, 165, 116, 0.3),
                    0 0 300px 150px rgba(184, 90, 62, 0.2)
                  `,
                }}
                animate={{ opacity: isColorized ? 0 : 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              
              {/* Colored iridescent orb layer - becomes solid cream for button */}
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden cursor-pointer"
                style={{
                  boxShadow: showButton 
                    ? '0 0 40px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)'
                    : `
                      0 0 60px rgba(167, 139, 250, 0.25),
                      0 0 100px rgba(96, 165, 250, 0.2),
                      inset 0 0 30px rgba(255, 255, 255, 0.9)
                    `,
                }}
                animate={{ 
                  opacity: isColorized ? 1 : 0,
                  background: showButton 
                    ? 'linear-gradient(145deg, rgba(250,248,245,0.98) 0%, rgba(245,242,240,0.95) 100%)'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,242,255,0.8) 100%)',
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                onClick={showButton ? handleCtaClick : undefined}
              >
                {/* Iridescent inner layers - fade out for button */}
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
                  animate={{ 
                    rotate: [0, 360],
                    opacity: showButton ? 0 : 1,
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 0.5 }
                  }}
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
                  animate={{ 
                    rotate: [360, 0],
                    opacity: showButton ? 0 : 1,
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 0.5 }
                  }}
                />

                {/* Glossy highlight - fade out for button */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 50%),
                      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 30%)
                    `,
                  }}
                  animate={{ opacity: showButton ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Arrow icon - appears when becoming button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: showButton ? 1 : 0,
                    scale: showButton ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4, delay: showButton ? 0.2 : 0 }}
                >
                  <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-charcoal" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scripture AI Logo text */}
      <AnimatePresence>
        {showLogo && !showButton && (
          <motion.h1
            className="absolute left-1/2 top-1/2 -translate-x-1/2 font-spiritual text-4xl md:text-5xl lg:text-6xl text-cream font-medium tracking-wide"
            style={{ marginTop: '80px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Scripture AI
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Expanded CTA button - morphs from circular orb/button */}
      <AnimatePresence>
        {showExpandedCta && (
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 md:h-20 rounded-full bg-cream/95 flex items-center justify-center gap-4 cursor-pointer hover:bg-cream transition-colors overflow-hidden"
            style={{ 
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.25), 0 12px 48px rgba(0, 0, 0, 0.25)',
            }}
            initial={{ width: 80, paddingLeft: 0, paddingRight: 0 }}
            animate={{ width: 'auto', paddingLeft: 40, paddingRight: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
          >
            <motion.span 
              className="font-spiritual text-xl md:text-2xl text-charcoal font-medium whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ delay: 0.1, duration: 0.3 }}
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
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
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
