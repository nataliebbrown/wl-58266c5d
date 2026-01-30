import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTimePeriod } from '@/lib/timeAwareness';
import {
  getUserContext,
  generateDashboardMessage,
  getContextualCTAs,
  getContextualScripture,
  CTAConfig,
} from '@/lib/contextualIntelligence';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';
import { formatDate } from '@/types/wholelicity';

export function HeroCard() {
  const navigate = useNavigate();
  const { config } = useTimePeriod();
  const context = getUserContext();
  const message = generateDashboardMessage(context);
  const ctas = getContextualCTAs(context);
  const scripture = getContextualScripture(context);

  const handleCTA = (cta: CTAConfig) => {
    switch (cta.action) {
      case 'continue':
      case 'new':
      case 'welcome':
        navigate('/chat');
        break;
      case 'explore':
        navigate('/chat');
        break;
      case 'bible':
        navigate('/bible');
        break;
    }
  };

  const dateStr = formatDate();
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <GlassCard padding="md" innerGradient={config.gradient} innerPadding="lg">
      <div className="relative min-h-[180px] sm:min-h-[220px] flex flex-col justify-between">
        {/* Top: Greeting + Scripture */}
        <div className="pr-20 sm:pr-28 md:pr-36">
          {/* Time greeting */}
          <h2
            className="text-xl sm:text-[28px] font-light leading-tight mb-3 sm:mb-4"
            style={{ color: config.textColor }}
          >
            {message}
          </h2>

          {/* Scripture verse — tappable to open Bible reader */}
          <button
            onClick={() => navigate(`/bible?ref=${encodeURIComponent(scripture.ref)}`)}
            className="text-left group cursor-pointer"
          >
            <p
              className="font-spiritual italic text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ color: config.textColor }}
            >
              {scripture.text}
            </p>
            <p
              className="text-sm font-medium mt-1 opacity-70 text-right group-hover:opacity-90 group-hover:underline transition-opacity"
              style={{ color: config.textColor }}
            >
              {scripture.ref}
            </p>
          </button>
        </div>

        {/* Breathing Sophia Orb — right-aligned, vertically centered */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.03, 1],
            y: [0, -4, 0],
          }}
          transition={{
            scale: { duration: 5, ease: 'easeInOut', repeat: Infinity },
            y: { duration: 6, ease: 'easeInOut', repeat: Infinity },
          }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative">
            {/* Soft radial glow */}
            <div
              className="absolute inset-[-30%] rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${config.textColor === '#F8F6F0' || config.textColor === '#F4EFE6' ? 'rgba(197, 180, 155, 0.4)' : 'rgba(138, 115, 86, 0.3)'} 0%, transparent 70%)`,
              }}
            />
            <img
              src={sophiaOrb}
              alt="Sophia"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </motion.div>

        {/* Bottom: Date pill + CTAs */}
        <div className="mt-6 space-y-4">
          {/* Date/time pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
            style={{
              background: config.textColor === '#2D3748'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              color: config.textColor,
            }}
          >
            <span>{dateStr}</span>
            <span className="opacity-50">•</span>
            <span>{timeStr}</span>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {ctas.map((cta, index) => (
              <button
                key={index}
                onClick={() => handleCTA(cta)}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: config.textColor === '#2D3748'
                    ? 'rgba(255, 255, 255, 0.45)'
                    : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  color: config.textColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = config.textColor === '#2D3748'
                    ? 'rgba(255, 255, 255, 0.55)'
                    : 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = config.textColor === '#2D3748'
                    ? 'rgba(255, 255, 255, 0.45)'
                    : 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <span>{cta.icon}</span>
                <span className="truncate">{cta.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
