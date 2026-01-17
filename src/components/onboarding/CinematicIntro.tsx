import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type AnimationPhase = 
  | 'brand-hold'           // Full-screen image + ScriptureAI logo
  | 'overlay-tagline'      // Overlay fades + tagline simultaneously
  | 'light-rise'           // White circle rises from bottom
  | 'orb-transform'        // Circle becomes gradient orb
  | 'logo-resolve'         // Orb moves to center, becomes logo mark
  | 'button-morph'         // Logo morphs to action button
  | 'button-expand'        // Button expands into rectangular shape
  | 'typing'               // Text types in
  | 'ready';               // Functional ready state

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [phase, setPhase] = useState<AnimationPhase>('brand-hold');
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Begin Your Journey';

  // Animation sequence timeline
  useEffect(() => {
    const timeline: { phase: AnimationPhase; delay: number }[] = [
      { phase: 'overlay-tagline', delay: 1500 },    // Hold brand, then overlay + tagline together
      { phase: 'light-rise', delay: 3500 },         // White circle rises
      { phase: 'orb-transform', delay: 5000 },      // Becomes gradient orb
      { phase: 'logo-resolve', delay: 6200 },       // Orb becomes logo
      { phase: 'button-morph', delay: 7400 },       // Logo becomes button
      { phase: 'button-expand', delay: 8200 },      // Button expands
      { phase: 'typing', delay: 8700 },             // Start typing
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
          setTimeout(() => setShowCursor(false), 400);
          setTimeout(() => setPhase('ready'), 700);
        }
      }, 55);
      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  const handleCtaClick = () => {
    if (['ready', 'typing', 'button-expand'].includes(phase)) {
      onComplete();
    }
  };

  // Phase order for comparison
  const phases: AnimationPhase[] = [
    'brand-hold', 'overlay-tagline', 'light-rise', 'orb-transform',
    'logo-resolve', 'button-morph', 'button-expand', 'typing', 'ready'
  ];
  const phaseIndex = phases.indexOf(phase);

  // Visibility flags
  const showOverlay = phaseIndex >= 1;
  const showTagline = phaseIndex >= 1 && phaseIndex <= 4;
  const showLightCircle = phaseIndex === 2;
  const showGradientOrb = phaseIndex >= 3 && phaseIndex <= 4;
  const showLogoMark = phaseIndex === 4;
  const showCircleButton = phaseIndex === 5;
  const showExpandedButton = phaseIndex >= 6;

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Full-screen image background with warm texture */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #1a1614 0%, #2d2420 40%, #1f1a17 100%)
          `,
        }}
      >
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(212, 165, 116, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.08) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Centered ScriptureAI logo (one word, horizontal) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: phaseIndex >= 2 ? 0 : 1,
          scale: phaseIndex >= 2 ? 0.95 : 1,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="font-spiritual text-4xl md:text-5xl lg:text-6xl text-cream font-medium tracking-wide whitespace-nowrap">
          ScriptureAI
        </h1>
      </motion.div>

      {/* Dark semi-transparent overlay - fades in gradually */}
      <motion.div 
        className="absolute inset-0 z-15"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,22,20,0.85) 0%, rgba(26,22,20,0.9) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showOverlay ? (phaseIndex >= 8 ? 0.75 : 1) : 0 
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Tagline - fades in simultaneously with overlay */}
      <motion.p
        className="absolute top-[35%] left-1/2 -translate-x-1/2 text-cream/90 text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase font-light text-center z-20 px-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ 
          opacity: showTagline ? 1 : 0,
          y: showTagline ? 0 : 15,
        }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: showTagline ? 0.3 : 0 }}
      >
        When Ancient Wisdom Meets Modern Discovery
      </motion.p>

      {/* Ambient glow at bottom during light rise */}
      <AnimatePresence>
        {(phaseIndex >= 2 && phaseIndex <= 3) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[60vh] z-18"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* White circle rising from bottom edge */}
      <AnimatePresence>
        {showLightCircle && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-25"
            initial={{ bottom: '-200px', opacity: 0 }}
            animate={{ bottom: '25%', opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.5) 70%, transparent 100%)',
                boxShadow: `
                  0 0 80px 40px rgba(255, 255, 255, 0.5),
                  0 0 150px 80px rgba(139, 92, 246, 0.2),
                  0 0 200px 100px rgba(96, 165, 250, 0.15)
                `,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient orb with blue-purple/sunset colors */}
      <AnimatePresence>
        {showGradientOrb && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-30"
            initial={{ bottom: '25%', scale: 1.5 }}
            animate={{ 
              bottom: showLogoMark ? '45%' : '30%',
              scale: showLogoMark ? 0.6 : 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="w-36 h-36 md:w-44 md:h-44 rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(
                  145deg, 
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(200, 180, 255, 0.9) 20%,
                  rgba(139, 92, 246, 0.85) 40%,
                  rgba(168, 85, 247, 0.8) 55%,
                  rgba(236, 72, 153, 0.75) 70%,
                  rgba(251, 146, 60, 0.7) 85%,
                  rgba(234, 179, 8, 0.65) 100%
                )`,
                boxShadow: `
                  0 0 60px 25px rgba(139, 92, 246, 0.4),
                  0 0 100px 50px rgba(168, 85, 247, 0.25),
                  0 0 140px 70px rgba(236, 72, 153, 0.15),
                  inset 0 0 40px rgba(255, 255, 255, 0.5)
                `,
              }}
              animate={showLogoMark ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: showLogoMark ? 0.4 : 0 }}
            >
              {/* Glossy highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 45%),
                    radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.5) 0%, transparent 30%)
                  `,
                }}
              />
              
              {/* Subtle shimmer */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)',
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo mark resolving from orb */}
      <AnimatePresence>
        {showLogoMark && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <h1 className="font-spiritual text-3xl md:text-4xl lg:text-5xl text-cream font-medium tracking-wide">
              ScriptureAI
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular action button (morphed from logo) */}
      <AnimatePresence>
        {showCircleButton && (
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream flex items-center justify-center cursor-pointer z-50"
            style={{ 
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.35), 0 10px 50px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-charcoal" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded rectangular button with nested arrow */}
      <AnimatePresence>
        {showExpandedButton && (
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 md:h-20 rounded-full bg-cream flex items-center cursor-pointer z-50 hover:bg-cream/95 transition-colors overflow-hidden"
            style={{ 
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 15px 60px rgba(0, 0, 0, 0.35)',
            }}
            initial={{ width: 96, paddingLeft: 0, paddingRight: 0 }}
            animate={{ 
              width: typedText ? 'auto' : 96,
              paddingLeft: typedText ? 40 : 0,
              paddingRight: typedText ? 24 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Typed text */}
            <motion.span 
              className="font-spiritual text-xl md:text-2xl text-charcoal font-medium whitespace-nowrap flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: typedText ? 1 : 0 }}
            >
              {typedText}
              {/* Blinking cursor */}
              <AnimatePresence>
                {showCursor && phase === 'typing' && (
                  <motion.span
                    className="inline-block w-0.5 h-6 md:h-7 bg-charcoal/60 ml-0.5"
                    animate={{ opacity: [1, 0, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </motion.span>

            {/* Arrow button nested inside */}
            <motion.div
              className="flex items-center justify-center ml-3"
              style={{ minWidth: typedText ? 'auto' : 96, minHeight: typedText ? 'auto' : 80 }}
            >
              <div 
                className={`flex items-center justify-center ${typedText ? 'w-10 h-10 md:w-12 md:h-12 bg-charcoal/10 rounded-full' : ''}`}
              >
                <ArrowRight 
                  className={`text-charcoal ${typedText ? 'w-5 h-5 md:w-6 md:h-6' : 'w-8 h-8 md:w-10 md:h-10'}`} 
                  strokeWidth={2.5} 
                />
              </div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {onSkip && phase !== 'ready' && (
        <motion.button
          className="absolute bottom-8 right-8 text-cream/40 hover:text-cream/70 text-sm tracking-wider transition-colors z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          onClick={onSkip}
        >
          Skip
        </motion.button>
      )}
    </motion.div>
  );
}
