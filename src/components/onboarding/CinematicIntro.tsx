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
  | 'orb-shrink'
  | 'logo-reveal'
  | 'logo-settle'
  | 'cta-appear'
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
    if (img.complete) setImageLoaded(true);
  }, []);

  // Animation sequence timeline
  useEffect(() => {
    if (!imageLoaded) return;

    const timeline: { phase: AnimationPhase; delay: number }[] = [
      { phase: 'overlay-fade', delay: 800 },
      { phase: 'tagline-appear', delay: 1500 },
      { phase: 'orb-rise', delay: 3500 },
      { phase: 'orb-shrink', delay: 5500 }, // Orb starts shrinking as it nears center
      { phase: 'logo-reveal', delay: 6500 }, // Text reveals as orb shrinks
      { phase: 'logo-settle', delay: 7500 }, // Both settle into final position
      { phase: 'cta-appear', delay: 8500 }, // CTA button appears below logo
      { phase: 'typing', delay: 9000 },
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

  // Phase-based visibility flags
  const showInitialLogo = ['initial', 'overlay-fade'].includes(phase);
  const showOrb = ['orb-rise', 'orb-shrink', 'logo-reveal', 'logo-settle', 'cta-appear', 'typing', 'complete'].includes(phase);
  const isOrbShrinking = ['orb-shrink', 'logo-reveal', 'logo-settle', 'cta-appear', 'typing', 'complete'].includes(phase);
  const showLogoText = ['logo-reveal', 'logo-settle', 'cta-appear', 'typing', 'complete'].includes(phase);
  const isLogoSettled = ['logo-settle', 'cta-appear', 'typing', 'complete'].includes(phase);
  const showCta = ['cta-appear', 'typing', 'complete'].includes(phase);

  // Calculate orb position and scale based on phase
  const getOrbY = () => {
    if (!showOrb) return 400; // Off-screen below
    if (phase === 'orb-rise') return 50; // Rising, still below center
    return 0; // At center
  };

  const getOrbScale = () => {
    if (!showOrb) return 4;
    if (phase === 'orb-rise') return 3;
    if (phase === 'orb-shrink') return 1.5;
    return 1; // Final logo size
  };

  // Don't render anything until image is loaded
  if (!imageLoaded) {
    return (
      <div className="fixed inset-0 z-50 bg-[#C4A77D]" />
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Abstract background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${introBackground})` }}
      />

      {/* Large Scripture AI logo on initial background */}
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

      {/* Background overlay */}
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
        {(phase === 'orb-rise') && (
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

      {/* Tagline */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: phase === 'tagline-appear' ? 1 : 0,
          y: phase === 'tagline-appear' ? 0 : 10,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="text-cream/80 text-sm md:text-base tracking-[0.3em] uppercase font-light text-center px-4">
          Where ancient wisdom<br />meets modern discovery
        </p>
      </motion.div>

      {/* Logo Lockup Container - Orb + Text together, centered */}
      <AnimatePresence>
        {showOrb && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            initial={{ y: 400 }}
            animate={{ y: getOrbY() }}
            transition={{ 
              duration: phase === 'orb-rise' ? 2 : 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Orb */}
            <motion.div
              className="relative"
              initial={{ scale: 4, opacity: 0 }}
              animate={{ 
                scale: getOrbScale(),
                opacity: 1,
              }}
              transition={{ 
                scale: { 
                  duration: phase === 'orb-rise' ? 2 : 1,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: { duration: 0.6, ease: 'easeOut' }
              }}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                {/* White orb with subtle iridescence */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #faf8f5 40%, #f0ebe0 70%, #e8e0d5 100%)',
                    boxShadow: isOrbShrinking 
                      ? '0 0 60px 20px rgba(255, 255, 255, 0.4), 0 0 100px 40px rgba(167, 139, 250, 0.15)'
                      : `
                        0 0 100px 50px rgba(255, 255, 255, 0.5),
                        0 0 200px 100px rgba(212, 165, 116, 0.3),
                        0 0 300px 150px rgba(184, 90, 62, 0.2)
                      `,
                  }}
                  animate={{ 
                    boxShadow: isOrbShrinking 
                      ? '0 0 40px 15px rgba(255, 255, 255, 0.3), 0 0 80px 30px rgba(167, 139, 250, 0.1)'
                      : '0 0 100px 50px rgba(255, 255, 255, 0.5), 0 0 200px 100px rgba(212, 165, 116, 0.3)'
                  }}
                  transition={{ duration: 1 }}
                />
                
                {/* Iridescent overlay */}
                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOrbShrinking ? 0.6 : 0.3 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 20%, rgba(96, 165, 250, 0.5) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 60%, rgba(167, 139, 250, 0.4) 0%, transparent 45%),
                        radial-gradient(ellipse at 40% 80%, rgba(244, 114, 182, 0.3) 0%, transparent 40%)
                      `,
                      filter: 'blur(8px)',
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>

                {/* Glossy highlight */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%),
                      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 30%)
                    `,
                  }}
                />
              </div>
            </motion.div>

            {/* Scripture AI Text - reveals as orb shrinks */}
            <motion.h1
              className="font-spiritual text-2xl md:text-3xl lg:text-4xl text-cream font-medium tracking-wide mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: showLogoText ? 1 : 0,
                y: showLogoText ? 0 : -20,
              }}
              transition={{ 
                duration: 0.8, 
                ease: 'easeOut',
                delay: showLogoText ? 0.2 : 0,
              }}
            >
              Scripture AI
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Button - appears below the centered logo */}
      <AnimatePresence>
        {showCta && (
          <motion.button
            className="absolute left-1/2 -translate-x-1/2 h-14 md:h-16 rounded-full bg-cream/95 flex items-center justify-center gap-3 cursor-pointer hover:bg-cream transition-colors overflow-hidden pointer-events-auto"
            style={{ 
              top: '65%',
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              paddingLeft: phase === 'typing' || phase === 'complete' ? 32 : 24,
              paddingRight: phase === 'typing' || phase === 'complete' ? 32 : 24,
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={handleCtaClick}
          >
            <motion.span 
              className="font-spiritual text-lg md:text-xl text-charcoal font-medium whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: phase === 'typing' || phase === 'complete' ? 1 : 0, 
                width: phase === 'typing' || phase === 'complete' ? 'auto' : 0 
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {typedText}
              {phase === 'typing' && (
                <motion.span
                  className="inline-block w-0.5 h-5 md:h-6 bg-primary ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-charcoal" />
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
