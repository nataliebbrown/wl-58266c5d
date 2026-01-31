import {
  getAllInsights,
  getInsightCount,
  getPatternNotice,
  type Insight,
} from '@/lib/insights';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

// ============ Component ============

export default function Insights() {
  const insights = getAllInsights();
  const count = getInsightCount();
  const patternNotice = getPatternNotice();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Your Constellation</h2>
            {count > 0 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-wl-parchment/30 dark:bg-wl-olive-300/15 text-wl-olive dark:text-wl-olive-300">
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
      </div>
    </div>
  );
}

// ============ Insight Row ============

function InsightRow({ insight, isLast }: { insight: Insight; isLast: boolean }) {
  const isScripture = insight.source?.type === 'bible';
  const thumbnailClasses = isScripture
    ? 'bg-wl-olive/[0.08] dark:bg-wl-olive-300/[0.08]'
    : 'bg-wl-sage/[0.12] dark:bg-wl-olive-300/[0.12]';
  const starColor = isScripture ? '#746653' : '#C5B49B';
  const glowColor = isScripture
    ? 'rgba(117, 102, 83, 0.1)'
    : 'rgba(197, 180, 155, 0.15)';

  return (
    <div
      className={`flex items-start gap-3 py-2.5 hover:bg-foreground/[0.03] rounded-lg transition-colors ${
        !isLast ? 'border-b border-foreground/[0.04]' : ''
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center relative ${thumbnailClasses}`}
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
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground/80 truncate">
            {insight.theme || insight.title}
          </p>
          {isScripture && insight.source?.reference && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-wl-olive/10 dark:bg-wl-olive-300/10 text-wl-olive/70 dark:text-wl-olive-300/70 flex-shrink-0">
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
