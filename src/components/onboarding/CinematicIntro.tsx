import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type AnimationPhase = 
  | 'frame1-brand-hold'        // Brand image + logo visible
  | 'frame2-overlay-fade'      // Dark overlay fades in
  | 'frame3-tagline'           // Tagline appears (overlapping with overlay)
  | 'frame4-light-emerge'      // White glow rises from bottom
  | 'frame5-orb-form'          // Circle becomes sunset orb
  | 'frame6-brand-resolve'     // Orb travels to center, becomes logo mark
  | 'frame7-control-reveal'    // Logo morphs to action button
  | 'frame8-button-expand'     // Button expands into rectangle
  | 'frame9-typing'            // Cursor types text
  | 'frame10-ready';           // Functional ready state

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [phase, setPhase] = useState<AnimationPhase>('frame1-brand-hold');
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Begin Your Journey';

  // Animation sequence timeline
  useEffect(() => {
    const timeline: { phase: AnimationPhase; delay: number }[] = [
      { phase: 'frame2-overlay-fade', delay: 1200 },      // Hold brand for 1.2s
      { phase: 'frame3-tagline', delay: 1800 },           // Start tagline while overlay still fading
      { phase: 'frame4-light-emerge', delay: 3200 },      // White glow rises
      { phase: 'frame5-orb-form', delay: 4400 },          // Orb forms
      { phase: 'frame6-brand-resolve', delay: 5600 },     // Orb becomes logo
      { phase: 'frame7-control-reveal', delay: 6800 },    // Logo becomes button
      { phase: 'frame8-button-expand', delay: 7600 },     // Button expands
      { phase: 'frame9-typing', delay: 8100 },            // Start typing
    ];

    timeline.forEach(({ phase: nextPhase, delay }) => {
      setTimeout(() => setPhase(nextPhase), delay);
    });
  }, []);

  // Typing animation
  useEffect(() => {
    if (phase === 'frame9-typing') {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          // Fade out cursor after typing completes
          setTimeout(() => setShowCursor(false), 300);
          setTimeout(() => setPhase('frame10-ready'), 600);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  const handleCtaClick = () => {
    if (phase === 'frame10-ready' || phase === 'frame9-typing' || phase === 'frame8-button-expand') {
      onComplete();
    }
  };

  // Phase checks for visibility
  const phaseIndex = [
    'frame1-brand-hold',
    'frame2-overlay-fade',
    'frame3-tagline',
    'frame4-light-emerge',
    'frame5-orb-form',
    'frame6-brand-resolve',
    'frame7-control-reveal',
    'frame8-button-expand',
    'frame9-typing',
    'frame10-ready'
  ].indexOf(phase);

  const isOverlayVisible = phaseIndex >= 1;
  const isTaglineVisible = phaseIndex >= 2 && phaseIndex <= 5;
  const isLightEmerging = phaseIndex >= 3 && phaseIndex <= 4;
  const isOrbForming = phaseIndex >= 4 && phaseIndex <= 5;
  const isBrandResolving = phaseIndex === 5;
  const isButtonRevealing = phaseIndex === 6;
  const isButtonExpanded = phaseIndex >= 7;

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Frame 1: Brand Image Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 20%, rgba(212, 165, 116, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(184, 90, 62, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Frame 1: Scripture AI Logo (horizontal, centered) - stays visible but dims with overlay */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: phaseIndex >= 3 ? 0 : 1,
          scale: phaseIndex >= 3 ? 0.9 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-spiritual text-4xl md:text-5xl lg:text-6xl text-cream font-medium tracking-wide whitespace-nowrap">
          Scripture AI
        </h1>
      </motion.div>

      {/* Frame 2: Dark overlay that fades in over the image */}
      <motion.div 
        className="absolute inset-0 bg-charcoal/80"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isOverlayVisible ? (phaseIndex >= 9 ? 0.7 : 0.85) : 0 
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Frame 3: Tagline - fades up while overlay is still fading */}
      <motion.p
        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-cream/80 text-sm md:text-base tracking-[0.25em] uppercase font-light text-center z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isTaglineVisible ? 1 : 0,
          y: isTaglineVisible ? 0 : 20,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Where ancient wisdom meets modern discovery
      </motion.p>

      {/* Frame 4: Light Emergence - white glow rises from bottom */}
      <AnimatePresence>
        {isLightEmerging && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '20%', opacity: 1 }}
            exit={{ opacity: 0, y: '-20%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Large white glow/circle */}
            <div 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 60%, transparent 80%)',
                boxShadow: `
                  0 0 120px 60px rgba(255, 255, 255, 0.4),
                  0 0 200px 100px rgba(212, 165, 116, 0.2),
                  0 0 300px 150px rgba(184, 90, 62, 0.1)
                `,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow at bottom during light emergence */}
      <AnimatePresence>
        {isLightEmerging && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[50vh] z-10"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.15) 0%, rgba(212,165,116,0.1) 30%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Frame 5: Orb Formation - sunset-like gradient orb */}
      <AnimatePresence>
        {(isOrbForming || isBrandResolving) && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-30"
            initial={{ y: '30vh', scale: 2 }}
            animate={{ 
              y: isBrandResolving ? '0vh' : '10vh',
              scale: isBrandResolving ? 0.8 : 1.5,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(
                  145deg, 
                  rgba(255, 220, 180, 0.95) 0%, 
                  rgba(255, 180, 120, 0.9) 25%,
                  rgba(230, 130, 90, 0.85) 50%,
                  rgba(180, 100, 80, 0.8) 75%,
                  rgba(120, 70, 70, 0.75) 100%
                )`,
                boxShadow: `
                  0 0 80px 30px rgba(255, 180, 120, 0.4),
                  0 0 120px 50px rgba(230, 130, 90, 0.3),
                  inset 0 0 40px rgba(255, 255, 255, 0.4)
                `,
              }}
              animate={isBrandResolving ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: isBrandResolving ? 0.5 : 0 }}
            >
              {/* Glossy highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%),
                    radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 25%)
                  `,
                }}
              />
              
              {/* Subtle inner glow animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame 6: Brand Resolve - Scripture AI logo mark appears */}
      <AnimatePresence>
        {isBrandResolving && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <h1 className="font-spiritual text-3xl md:text-4xl lg:text-5xl text-cream font-medium tracking-wide">
              Scripture AI
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame 7: Control Reveal - right-facing action button */}
      <AnimatePresence>
        {isButtonRevealing && (
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream/95 flex items-center justify-center cursor-pointer z-50"
            style={{ 
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.35), 0 10px 40px rgba(0, 0, 0, 0.25)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-charcoal" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Frames 8-10: Expanded CTA button with typing */}
      <AnimatePresence>
        {isButtonExpanded && (
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 md:h-20 rounded-full bg-cream/95 flex items-center justify-center gap-3 md:gap-4 cursor-pointer z-50 hover:bg-cream transition-colors"
            style={{ 
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 15px 50px rgba(0, 0, 0, 0.3)',
              paddingLeft: typedText ? '2.5rem' : '0',
              paddingRight: typedText ? '2rem' : '0',
            }}
            initial={{ width: 96 }}
            animate={{ width: typedText ? 'auto' : 96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleCtaClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="font-spiritual text-xl md:text-2xl text-charcoal font-medium whitespace-nowrap flex items-center"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: typedText ? 1 : 0, width: typedText ? 'auto' : 0 }}
              transition={{ duration: 0.2 }}
            >
              {typedText}
              {/* Cursor */}
              <AnimatePresence>
                {showCursor && phase === 'frame9-typing' && (
                  <motion.span
                    className="inline-block w-0.5 h-6 md:h-7 bg-charcoal/70 ml-0.5"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.6, repeat: Infinity },
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.span>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-charcoal" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {onSkip && phase !== 'frame10-ready' && (
        <motion.button
          className="absolute bottom-8 right-8 text-cream/50 hover:text-cream/80 text-sm tracking-wide transition-colors z-50"
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
