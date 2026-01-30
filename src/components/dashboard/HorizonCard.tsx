import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sunrise } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';

// ============ Types ============

export interface HorizonItem {
  id: string;
  theme: string;
  description: string;
  timeHint: string;
  state: 'near' | 'emerging' | 'distant';
}

interface HorizonCardProps {
  items?: HorizonItem[];
}

// ============ Component ============

const ITEMS_PER_PAGE = 3;

export function HorizonCard({ items = [] }: HorizonCardProps) {
  const navigate = useNavigate();
  const { expand } = useDrawerExpand();
  const isEmpty = items.length === 0;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const displayItems = items.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const handleExpand = () => expand(
    <div className="max-w-2xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-semibold text-foreground mb-8">On Your Horizon</h2>
      {items.length === 0 ? (
        <p className="text-sm italic text-muted-foreground text-center py-12">
          The horizon is forming. As you explore with Sophia, themes will emerge that point to what&apos;s next.
        </p>
      ) : (
        <div className="space-y-0">
          {items.map((item, index) => (
            <HorizonRow
              key={item.id}
              item={item}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5">
        {/* Header — icon + pagination + expand */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#DED1BA]/20 flex items-center justify-center">
            <Sunrise className="w-4.5 h-4.5 text-[#C5B49B]" />
          </div>
          <div className="flex items-center gap-1">
            {!isEmpty && totalPages > 1 && (
              <>
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={!canPrev}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#756653] hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!canNext}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#756653] hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <ExpandButton onClick={handleExpand} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          On Your Horizon
        </h3>
        <p className="text-sm text-foreground/50 mt-1">
          {isEmpty ? 'What\'s emerging ahead' : `${items.length} theme${items.length !== 1 ? 's' : ''} ahead`}
        </p>
      </div>

      {isEmpty ? (
        <EmptyState onExplore={() => navigate('/chat')} />
      ) : (
        <>
          {/* Horizon items */}
          <div className="mt-4 px-5 border-t border-foreground/[0.05] pt-3 flex-1">
            {displayItems.map((item, index) => (
              <HorizonRow
                key={item.id}
                item={item}
                isLast={index === displayItems.length - 1}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto px-5 pb-5 pt-3">
            <button
              onClick={() => navigate('/horizon')}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#756653] border border-[#756653]/25 hover:bg-[#756653]/8 transition-colors"
            >
              Explore Horizon
            </button>
          </div>
        </>
      )}
    </GlassCard>
  );
}

// ============ Horizon Row ============

function HorizonRow({ item, isLast }: { item: HorizonItem; isLast: boolean }) {
  const dotStyle = getDotStyle(item.state);

  return (
    <div
      className={`py-2.5 cursor-pointer hover:bg-foreground/[0.03] rounded-lg transition-colors ${
        !isLast ? 'border-b border-foreground/[0.04]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status dot */}
        <div className="mt-1.5 flex-shrink-0">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={dotStyle}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className="text-sm font-medium text-foreground/80"
              style={{ opacity: item.state === 'distant' ? 0.6 : 1 }}
            >
              &ldquo;{item.theme}&rdquo;
            </p>
            <span className="text-[11px] text-foreground/40 flex-shrink-0">
              {item.timeHint}
            </span>
          </div>
          <p className="text-[12px] text-foreground/40 leading-snug mt-0.5">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ Dot Styles ============

function getDotStyle(state: HorizonItem['state']): React.CSSProperties {
  switch (state) {
    case 'near':
      return { backgroundColor: '#756653' };
    case 'emerging':
      return { backgroundColor: '#C5B49B', opacity: 0.5 };
    case 'distant':
      return {
        backgroundColor: 'transparent',
        border: '2px solid rgba(197, 180, 155, 0.3)',
      };
  }
}

// ============ Empty State ============

function EmptyState({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Soft horizon glow visual */}
      <div className="relative w-full h-24 mb-4 flex items-center justify-center">
        <motion.div
          className="w-40 h-12 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(222, 209, 186, 0.4) 0%, rgba(222, 209, 186, 0.1) 50%, transparent 80%)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>

      <p className="text-sm italic text-muted-foreground text-center leading-relaxed max-w-[240px]">
        "The horizon is forming. As you explore with Sophia, themes will emerge that point to what's next in your journey."
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onExplore}
        className="mt-5 text-sm font-medium text-wl-olive hover:underline flex items-center gap-1"
      >
        Start Exploring
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
