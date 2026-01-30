import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Stars } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';
import {
  getAllInsights,
  getInsightCount,
  getPatternNotice,
  type Insight,
} from '@/lib/insights';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

// ============ Component ============

export function ConstellationCard() {
  const navigate = useNavigate();
  const { expand } = useDrawerExpand();
  const insights = getAllInsights();
  const count = getInsightCount();
  const patternNotice = getPatternNotice();

  // Show max 3 recent insights in the card
  const displayInsights = insights.slice(0, 3);

  const handleExpand = () => expand(
    <div className="max-w-2xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Your Constellation</h2>
        {count > 0 && (
          <span
            className="text-sm px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(222, 209, 186, 0.3)',
              color: '#756653',
            }}
          >
            {count} stars
          </span>
        )}
      </div>
      {insights.length === 0 ? (
        <p className="text-sm italic text-muted-foreground text-center py-12">
          No insights saved yet. Start a conversation with Sophia to discover your first star.
        </p>
      ) : (
        <div className="space-y-0">
          {insights.map((insight, index) => (
            <InsightRow
              key={insight.id}
              insight={insight}
              isLast={index === insights.length - 1}
            />
          ))}
        </div>
      )}
      {patternNotice && (
        <div className="flex items-start gap-2.5 mt-8 pt-6 border-t border-foreground/5">
          <img
            src={sophiaOrb}
            alt=""
            className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60"
          />
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            &ldquo;{patternNotice}&rdquo;
          </p>
        </div>
      )}
    </div>
  );

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5">
        {/* Header — icon + expand */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C5B49B]/15 flex items-center justify-center">
              <Stars className="w-4.5 h-4.5 text-[#C5B49B]" />
            </div>
            {count > 0 && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: 'rgba(222, 209, 186, 0.25)',
                  color: '#756653',
                }}
              >
                {count} stars
              </span>
            )}
          </div>
          <ExpandButton onClick={handleExpand} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          Your Constellation
        </h3>
        <p className="text-sm text-foreground/50 mt-1">
          {count === 0
            ? 'Insights you save become stars'
            : `${count} insight${count !== 1 ? 's' : ''} collected`}
        </p>
      </div>

      {count === 0 ? (
        <EmptyState onStartConversation={() => navigate('/chat')} />
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
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#756653] border border-[#756653]/25 hover:bg-[#756653]/8 transition-colors"
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
  const thumbnailBg = isScripture ? 'rgba(117, 102, 83, 0.08)' : 'rgba(197, 180, 155, 0.12)';
  const starColor = isScripture ? '#756653' : '#C5B49B';
  const glowColor = isScripture
    ? 'rgba(117, 102, 83, 0.1)'
    : 'rgba(197, 180, 155, 0.15)';

  return (
    <div
      className={`flex items-start gap-3 py-2.5 cursor-pointer hover:bg-foreground/[0.03] rounded-lg transition-colors ${
        !isLast ? 'border-b border-foreground/[0.04]' : ''
      }`}
    >
      {/* Star thumbnail */}
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center relative"
        style={{ background: thumbnailBg }}
      >
        {isScripture ? (
          <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-70">
            <path
              d="M4 19V5a2 2 0 012-2h8a2 2 0 012 2v14l-6-3-6 3z"
              fill="none"
              stroke={starColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-70">
            <path
              d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17 19.63 12 16.27l-5 3.36 1.91-6.46-5.09-3.9 6.09-1.01z"
              fill={starColor}
            />
          </svg>
        )}
        {/* Soft glow */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground/80 truncate">
            {insight.theme || insight.title}
          </p>
          {isScripture && insight.source?.reference && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#756653]/10 text-[#756653]/70 flex-shrink-0">
              {insight.source.reference}
            </span>
          )}
        </div>
        <p className="text-[12px] text-foreground/40 line-clamp-2 leading-snug mt-0.5">
          &ldquo;{insight.content}&rdquo;
        </p>
      </div>
    </div>
  );
}

// ============ Empty State ============

function EmptyState({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Decorative faint stars */}
      <div className="relative w-full h-32 mb-4">
        <svg width="100%" height="100%" viewBox="0 0 200 100" className="opacity-[0.12]">
          {/* Scattered decorative star points */}
          <circle cx="45" cy="25" r="2" fill="#C5B49B" />
          <circle cx="120" cy="15" r="1.5" fill="#C5B49B" />
          <circle cx="80" cy="55" r="2.5" fill="#C5B49B" />
          <circle cx="155" cy="40" r="1.5" fill="#C5B49B" />
          <circle cx="30" cy="70" r="2" fill="#C5B49B" />
          {/* Faint connecting lines */}
          <line x1="45" y1="25" x2="80" y2="55" stroke="#C5B49B" strokeWidth="0.5" opacity="0.5" />
          <line x1="80" y1="55" x2="120" y2="15" stroke="#C5B49B" strokeWidth="0.5" opacity="0.5" />
          <line x1="120" y1="15" x2="155" y2="40" stroke="#C5B49B" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <p className="text-sm italic text-muted-foreground text-center leading-relaxed max-w-[220px]">
        "Every insight you save becomes a star. Over time, they'll form patterns you never expected."
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartConversation}
        className="mt-5 text-sm font-medium text-wl-olive hover:underline flex items-center gap-1"
      >
        Start a Conversation to Discover Your First Star
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
