import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import introBackground from "@/assets/intro-background.png";
import wholelicityLogo from "@/assets/logo_white.svg";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load the 3D orb component
const AnimatedOrb = lazy(() => import("@/components/AnimatedOrb"));

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type AnimationPhase = 
  | 'initial'
  | 'logo-fade'
  | 'overlay-fade'
  | 'orb-rise'
  | 'orb-shrink'
  | 'logo-appear'
  | 'transform-button'
  | 'expand-cta'
  | 'typing'
  | 'cursor-blink'
  | 'complete';

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
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
      { phase: 'logo-fade', delay: 100 }, // Logo starts fading out
      { phase: 'overlay-fade', delay: 800 }, // Logo gone, overlay/tagline/glow start (0% opacity)
      { phase: 'orb-rise', delay: 4000 }, // Sophia rises at 5x
      { phase: 'orb-shrink', delay: 4800 }, // ** Sophia starts shrinking while still rising (600ms overlap) **
      { phase: 'logo-appear', delay: 8400 }, // Shrink done, show Scripture AI text
      { phase: 'transform-button', delay: 9900 }, // Sophia becomes transparent arrow button
      { phase: 'expand-cta', delay: 10600 }, // Pill expands, arrow slides right
      { phase: 'typing', delay: 11400 }, // Cursor appears and starts typing
      { phase: 'cursor-blink', delay: 13400 }, // Typing done, cursor blinks
      { phase: 'complete', delay: 14900 }, // Cursor disappears, done
    ];

    const timeoutIds = timeline.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase), delay)
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, [imageLoaded]);

  // Typing effect - types one character at a time
  useEffect(() => {
    if (phase === 'typing') {
      setShowCursor(true);
      setTypedText('');
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80); // 80ms per character
      return () => clearInterval(typingInterval);
    }
  }, [phase]);

  // Cursor blinking effect
  useEffect(() => {
    if (phase === 'cursor-blink') {
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        setShowCursor(prev => !prev);
        blinkCount++;
        if (blinkCount >= 6) { // 3 blinks (on-off-on-off-on-off)
          clearInterval(blinkInterval);
          setShowCursor(false);
        }
      }, 400);
      return () => clearInterval(blinkInterval);
    }
  }, [phase]);

  // Hide cursor when complete
  useEffect(() => {
    if (phase === 'complete') {
      setShowCursor(false);
      setTypedText(fullText);
    }
  }, [phase]);

  const handleCtaClick = () => {
    if (['complete', 'expand-cta', 'typing', 'cursor-blink'].includes(phase)) {
      onComplete();
    }
  };

  // Sophia is always visible, but changes position based on phase
  const sophiaHasRisen = ['orb-rise', 'orb-shrink', 'logo-appear', 'transform-button'].includes(phase);
  // Sophia only reaches center during shrink phase (like Dia animation)
  const sophiaAtCenter = ['orb-shrink', 'logo-appear', 'transform-button', 'expand-cta', 'typing', 'cursor-blink', 'complete'].includes(phase);
  
  // Glow is attached to Sophia - shows at 5x scale, starts fading when shrinking begins
  const showSophiaGlow = ['overlay-fade', 'orb-rise'].includes(phase);
  // Glow intensity decreases as Sophia shrinks
  const sophiaGlowIntensity = ['overlay-fade', 'orb-rise'].includes(phase) ? 1 : 0;

  // Logo only shows during initial phase, starts fading at 100ms
  const showInitialLogo = phase === 'initial';
  // Sophia is always rendered - stays visible throughout entire animation
  const showOrb = true;
  // Scripture AI text reveals AS Sophia shrinks (during orb-shrink phase)
  const showLogo = ['orb-shrink', 'logo-appear'].includes(phase);
  // Logo is fully settled after logo-appear phase - locks in place
  const logoSettled = ['logo-appear', 'transform-button'].includes(phase);
  const showButton = ['transform-button', 'expand-cta', 'typing', 'cursor-blink', 'complete'].includes(phase);
  const showExpandedCta = ['expand-cta', 'typing', 'cursor-blink', 'complete'].includes(phase);
  const isTyping = ['typing', 'cursor-blink', 'complete'].includes(phase);
  // Arrow slides right when pill expands
  const arrowSlidRight = ['expand-cta', 'typing', 'cursor-blink', 'complete'].includes(phase);

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

      {/* Large Wholelicity logo on initial background - fades out from 100ms to 800ms */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: showInitialLogo ? 1 : 0,
          scale: showInitialLogo ? 1 : 1.02,
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <img 
          src={wholelicityLogo} 
          alt="Wholelicity" 
          className="h-[72px] md:h-24 lg:h-[120px]" 
          style={{ filter: 'drop-shadow(0 4px 24px rgba(0, 0, 0, 0.3))' }}
        />
      </motion.div>

      {/* Background overlay - starts at 800ms (0%), fades in smoothly to 100% */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(37, 37, 28, 0.5) 0%, rgba(37, 37, 28, 0.85) 50%, rgba(37, 37, 28, 0.95) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: ['initial', 'logo-fade'].includes(phase) ? 0 : 1 
        }}
        transition={{ 
          duration: 3.2, 
          ease: 'linear'
        }}
      />

      {/* Ambient glow at bottom - emanates from Sophia, fades as she shrinks */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300vw] h-[80vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(194, 112, 60, 0.5) 0%, rgba(212, 160, 48, 0.3) 20%, rgba(156, 174, 166, 0.15) 40%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showSophiaGlow ? 1 : 0,
        }}
        transition={{ 
          duration: 3.2, 
          ease: 'linear'
        }}
      />

      {/* Tagline: "Where ancient wisdom meets modern discovery" - starts at 800ms (0%), reaches 100% by 3000ms */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: phase === 'overlay-fade' ? 1 : 0,
          y: phase === 'overlay-fade' ? 0 : 10,
        }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <p className="text-cream/80 text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase font-light text-center px-4">
          Where ancient<br />wisdom meets<br />modern discovery
        </p>
      </motion.div>

      {/* Small Wholelicity logo at top - appears when button mode starts */}
      <motion.div
        className="absolute top-12 left-0 right-0 flex justify-center z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: showButton ? 1 : 0,
          y: showButton ? 0 : -20,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={wholelicityLogo} alt="Wholelicity" className="h-6 md:h-8" />
      </motion.div>

      {/* Unified orb + text container - moves together as one logo */}
      <AnimatePresence>
        {showOrb && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 20 }}
          >
            {/* Container - Sophia stays at fixed position, text positioned below */}
            <motion.div
              className="relative"
              animate={{
                x: arrowSlidRight ? 186 : 0, // Half of 500px minus half of button (128px) = 186px
                marginTop: showButton ? 0 : -40, // No offset in button mode
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* The orb itself - always present, starts peeking from bottom */}
              <motion.div
                className="pointer-events-auto relative"
                style={{ zIndex: 10 }}
                initial={{ scale: 5, opacity: 1, y: 'calc(100vh - 40px)' }}
                animate={{ 
                  scale: phase === 'initial' ? 5
                       : phase === 'logo-fade' ? 5
                       : phase === 'overlay-fade' ? 5
                       : phase === 'orb-rise' ? 5
                       : phase === 'orb-shrink' ? 1
                       : phase === 'logo-appear' ? 1
                       : phase === 'transform-button' ? 1
                       : 1,
                  opacity: 1,
                  y: sophiaAtCenter ? 0 
                     : sophiaHasRisen ? 'calc(35vh)' 
                     : 'calc(100vh - 40px)',
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  scale: { 
                    duration: 3.5,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  y: {
                    duration: 3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Sophia orb - 3D animated version */}
                  <motion.div 
                    className="absolute inset-0 rounded-full overflow-hidden cursor-pointer"
                    animate={{ 
                      boxShadow: showSophiaGlow 
                        ? `
                          0 0 100px 50px rgba(194, 112, 60, 0.4),
                          0 0 200px 100px rgba(212, 160, 48, 0.3),
                          0 0 300px 150px rgba(156, 174, 166, 0.2)
                        `
                        : showButton 
                          ? '0 0 40px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)'
                          : `
                            0 0 60px rgba(194, 112, 60, 0.25),
                            0 0 100px rgba(212, 160, 48, 0.2)
                          `,
                    }}
                    whileHover={showButton ? { 
                      scale: 1.05,
                      boxShadow: '0 0 50px rgba(255, 255, 255, 0.5), 0 12px 40px rgba(0, 0, 0, 0.25)',
                    } : {}}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    onClick={showButton ? handleCtaClick : undefined}
                  >
                    {/* 3D Animated Orb with fallback */}
                    <ErrorBoundary
                      fallback={
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `
                              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 245, 0.9) 30%, rgba(255, 245, 240, 0.7) 50%, transparent 75%),
                              radial-gradient(ellipse 120% 100% at 85% 60%, rgba(245, 166, 35, 0.45) 0%, rgba(255, 167, 38, 0.3) 30%, transparent 60%),
                              radial-gradient(ellipse 100% 80% at 75% 85%, rgba(245, 166, 35, 0.35) 0%, transparent 50%),
                              radial-gradient(ellipse 80% 100% at 25% 25%, rgba(255, 181, 160, 0.4) 0%, rgba(255, 154, 139, 0.25) 30%, transparent 55%),
                              radial-gradient(ellipse 60% 80% at 15% 40%, rgba(255, 181, 160, 0.25) 0%, transparent 45%),
                              linear-gradient(145deg, rgba(255, 252, 250, 0.95) 0%, rgba(255, 248, 244, 0.9) 50%, rgba(255, 250, 248, 0.95) 100%)
                            `,
                            boxShadow: `
                              inset 0 0 80px rgba(255, 255, 255, 0.6),
                              inset 30px 40px 60px rgba(255, 181, 160, 0.12),
                              inset -30px -30px 70px rgba(245, 166, 35, 0.15),
                              0 0 40px rgba(255, 212, 168, 0.25),
                              0 0 80px rgba(245, 166, 35, 0.15)
                            `,
                          }}
                          animate={{ opacity: showButton ? 0 : 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      }
                    >
                      <Suspense
                        fallback={
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `
                                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 245, 0.9) 30%, rgba(255, 245, 240, 0.7) 50%, transparent 75%),
                                radial-gradient(ellipse 120% 100% at 85% 60%, rgba(245, 166, 35, 0.45) 0%, rgba(255, 167, 38, 0.3) 30%, transparent 60%),
                                radial-gradient(ellipse 100% 80% at 75% 85%, rgba(245, 166, 35, 0.35) 0%, transparent 50%),
                                radial-gradient(ellipse 80% 100% at 25% 25%, rgba(255, 181, 160, 0.4) 0%, rgba(255, 154, 139, 0.25) 30%, transparent 55%),
                                radial-gradient(ellipse 60% 80% at 15% 40%, rgba(255, 181, 160, 0.25) 0%, transparent 45%),
                                linear-gradient(145deg, rgba(255, 252, 250, 0.95) 0%, rgba(255, 248, 244, 0.9) 50%, rgba(255, 250, 248, 0.95) 100%)
                              `,
                              boxShadow: `
                                inset 0 0 80px rgba(255, 255, 255, 0.6),
                                inset 30px 40px 60px rgba(255, 181, 160, 0.12),
                                inset -30px -30px 70px rgba(245, 166, 35, 0.15),
                                0 0 40px rgba(255, 212, 168, 0.25),
                                0 0 80px rgba(245, 166, 35, 0.15)
                              `,
                            }}
                            animate={{ opacity: showButton ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        }
                      >
                        <motion.div
                          className="absolute inset-0"
                          animate={{ opacity: showButton ? 0 : 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <AnimatedOrb />
                        </motion.div>
                      </Suspense>
                    </ErrorBoundary>

                    {/* White background for button state */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f8f6ff 100%)' }}
                      animate={{ opacity: showButton ? 1 : 0 }}
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
                      <ArrowRight className="w-12 h-12 md:w-14 md:h-14 text-charcoal" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Wholelicity text - positioned absolutely below Sophia */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ zIndex: 0, top: 'calc(100% + 40px)' }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showLogo ? 1 : 0,
                }}
                transition={{
                  opacity: { duration: 0.8, ease: 'easeOut' },
                }}
              >
                <img src={wholelicityLogo} alt="Wholelicity" className="w-[400px] md:w-[500px] h-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded CTA pill - appears BEHIND Sophia/arrow button */}
      <AnimatePresence>
        {showExpandedCta && (
          <motion.button
            className="absolute left-1/2 top-1/2 h-32 md:h-40 rounded-full bg-cream/95 flex items-center cursor-pointer hover:bg-cream transition-colors overflow-hidden"
            style={{ 
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.25), 0 12px 48px rgba(0, 0, 0, 0.25)',
              transform: 'translate(-50%, -50%)',
              zIndex: 15, // Behind Sophia (z-index 20)
            }}
            initial={{ width: 128, opacity: 0 }}
            animate={{ width: 500, opacity: 1 }}
            transition={{ 
              width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2 }
            }}
            onClick={handleCtaClick}
          >
            {/* Text area with cursor - left side of pill */}
            <motion.div
              className="flex-1 flex items-center justify-start pl-12 pr-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTyping ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span className="font-spiritual text-2xl md:text-3xl text-charcoal font-medium whitespace-nowrap">
                {typedText}
              </span>
              {/* Typing cursor */}
              <motion.span
                className="inline-block w-0.5 h-8 md:h-9 bg-blue-500 ml-1"
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
            
            {/* Spacer for where Sophia/arrow will be (on the right) */}
            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0" />
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
