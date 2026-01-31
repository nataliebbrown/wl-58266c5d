import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Stars } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import {
  getAllInsights,
  getInsightCount,
  getPatternNotice,
  type Insight,
} from '@/lib/insights';
import { getQuizData } from '@/lib/onboardingState';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

// ============ Personalized Content ============

const CONSTELLATION_CONTENT: Record<string, { quote: string; cta: string; subtitle: string }> = {
  new_to_faith: {
    quote: 'Every new discovery becomes a star in your sky. You\'ll be amazed at what you find.',
    cta: 'Ask Sophia a Question to Find Your First Star',
    subtitle: 'Discoveries you make become stars',
  },
  believer_going_deeper: {
    quote: 'Years of faith hold hidden connections. As you explore, watch the patterns emerge.',
    cta: 'Go Deeper with Sophia to Uncover New Stars',
    subtitle: 'Connections waiting to be found',
  },
  pastor_leader: {
    quote: 'Every insight you collect strengthens the wisdom you share. Build your constellation.',
    cta: 'Explore with Sophia to Grow Your Constellation',
    subtitle: 'Wisdom for the journey you lead',
  },
  seminary_student: {
    quote: 'Great theology is a constellation — ideas connected across centuries. Start mapping yours.',
    cta: 'Study with Sophia to Map Your First Star',
    subtitle: 'Mapping your theological landscape',
  },
  exploring_faith: {
    quote: 'Every honest question leads to a discovery. Save what resonates — it becomes a star.',
    cta: 'Start Exploring with Sophia to Find Your First Star',
    subtitle: 'Questions that become constellations',
  },
};

// ============ Component ============

export function ConstellationCard() {
  const navigate = useNavigate();
  const insights = getAllInsights();
  const count = getInsightCount();
  const patternNotice = getPatternNotice();
  const quizData = getQuizData();
  const personalized = CONSTELLATION_CONTENT[quizData.spiritualBackground ?? ''];

  // Show max 3 recent insights in the card
  const displayInsights = insights.slice(0, 3);

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5">
        {/* Header — icon + expand */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-wl-sage/15 dark:bg-wl-olive-300/15 flex items-center justify-center">
              <Stars className="w-4.5 h-4.5 text-wl-sage dark:text-wl-olive-300" />
            </div>
            {count > 0 && (
              <span
                className="text-[10px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider bg-wl-parchment/25 dark:bg-wl-olive-300/15 text-wl-olive dark:text-wl-olive-300"
              >
                {count} stars
              </span>
            )}
          </div>
          <ExpandButton onClick={() => navigate('/insights')} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground dark:text-wl-olive-200 leading-tight">
          Your Constellation
        </h3>
        <p className="text-sm text-foreground/40 mt-1">
          {count === 0
            ? (personalized?.subtitle ?? 'Insights you save become stars')
            : `${count} insight${count !== 1 ? 's' : ''} collected`}
        </p>
      </div>

      {count === 0 ? (
        <EmptyState
          onStartConversation={() => navigate('/chat')}
          quote={personalized?.quote}
          ctaText={personalized?.cta}
        />
      ) : (
        <>
          {/* Insight list */}
          <div className="mt-4 px-5 border-t border-foreground/[0.05] pt-3 flex-1 overflow-y-auto">
            {displayInsights.map((insight, index) => (
              <InsightRow
                key={insight.id}
                insight={insight}
                isLast={index === displayInsights.length - 1}
              />
            ))}
          </div>

          {/* Pattern notice */}
          {patternNotice && (
            <div className="px-5 pt-2">
              <div className="flex items-start gap-2.5">
                <img
                  src={sophiaOrb}
                  alt=""
                  className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60"
                />
                <p className="text-[13px] italic text-muted-foreground leading-snug">
                  &ldquo;{patternNotice}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto px-5 pb-5 pt-3">
            <button
              onClick={() => navigate('/insights')}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-wl-olive dark:text-wl-olive-300 border border-wl-olive/25 dark:border-wl-olive-300/25 hover:bg-wl-olive/10 dark:hover:bg-wl-olive-300/10 hover:border-wl-olive/40 dark:hover:border-wl-olive-300/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-all duration-200"
            >
              {patternNotice ? 'Explore This Connection' : 'View All Insights'}
            </button>
          </div>
        </>
      )}
    </GlassCard>
  );
}

// ============ Insight Row ============

function InsightRow({ insight, isLast }: { insight: Insight; isLast: boolean }) {
  const isScripture = insight.source?.type === 'bible';
  const thumbnailClasses = isScripture
    ? 'bg-wl-olive/[0.08] dark:bg-wl-olive-300/[0.08]'
    : 'bg-wl-sage/[0.12] dark:bg-wl-olive-300/[0.12]';
  const starColorClass = isScripture ? 'text-wl-olive dark:text-wl-olive-300' : 'text-wl-sage dark:text-wl-olive-300';
  const glowClass = isScripture
    ? 'bg-wl-olive/10 dark:bg-wl-olive-300/10'
    : 'bg-wl-sage/15 dark:bg-wl-olive-300/15';

  return (
    <div
      className={`flex items-start gap-3 py-2.5 hover:bg-foreground/[0.05] dark:hover:bg-wl-olive-300/[0.06] rounded-lg transition-colors ${
        !isLast ? 'border-b border-foreground/[0.04]' : ''
      }`}
    >
      {/* Star thumbnail */}
      <div
        className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center relative ${thumbnailClasses}`}
      >
        {isScripture ? (
          <svg width="20" height="20" viewBox="0 0 24 24" className={`opacity-70 ${starColorClass}`}>
            <path
              d="M4 19V5a2 2 0 012-2h8a2 2 0 012 2v14l-6-3-6 3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" className={`opacity-70 ${starColorClass}`}>
            <path
              d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17 19.63 12 16.27l-5 3.36 1.91-6.46-5.09-3.9 6.09-1.01z"
              fill="currentColor"
            />
          </svg>
        )}
        {/* Soft glow */}
        <div
          className={`absolute inset-0 rounded-lg ${glowClass}`}
          style={{ mask: 'radial-gradient(circle, black 0%, transparent 70%)' }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground/80 truncate">
            {insight.theme || insight.title}
          </p>
          {isScripture && insight.source?.reference && (
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-wl-olive/10 dark:bg-wl-olive-300/10 text-wl-olive/70 dark:text-wl-olive-300/70 flex-shrink-0">
              {insight.source.reference}
            </span>
          )}
        </div>
        <p className="text-[11px] text-foreground/40 line-clamp-2 leading-snug mt-0.5">
          &ldquo;{insight.content}&rdquo;
        </p>
      </div>
    </div>
  );
}

// ============ Empty State ============

function EmptyState({ onStartConversation, quote, ctaText }: { onStartConversation: () => void; quote?: string; ctaText?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Decorative faint stars */}
      <div className="relative w-full h-32 mb-4">
        <svg width="100%" height="100%" viewBox="0 0 200 100" className="opacity-[0.12] text-wl-sage dark:text-wl-olive-300">
          {/* Scattered decorative star points */}
          <circle cx="45" cy="25" r="2" fill="currentColor" />
          <circle cx="120" cy="15" r="1.5" fill="currentColor" />
          <circle cx="80" cy="55" r="2.5" fill="currentColor" />
          <circle cx="155" cy="40" r="1.5" fill="currentColor" />
          <circle cx="30" cy="70" r="2" fill="currentColor" />
          {/* Faint connecting lines */}
          <line x1="45" y1="25" x2="80" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="80" y1="55" x2="120" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="120" y1="15" x2="155" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <p className="text-sm italic text-muted-foreground text-center leading-relaxed max-w-[220px]">
        "{quote ?? 'Every insight you save becomes a star. Over time, they\'ll form patterns you never expected.'}"
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartConversation}
        className="mt-5 text-sm font-medium text-wl-olive dark:text-wl-olive-300 hover:underline focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 rounded-lg flex items-center gap-1"
      >
        {ctaText ?? 'Start a Conversation to Discover Your First Star'}
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
