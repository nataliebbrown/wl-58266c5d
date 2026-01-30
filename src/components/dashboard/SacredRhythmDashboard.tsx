import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useTimePeriod } from '@/lib/timeAwareness';
import { formatDate } from '@/types/wholelicity';
import { DashboardHeader } from './DashboardHeader';
import { JourneyCard } from './JourneyCard';
import { ConstellationCard } from './ConstellationCard';
import { HorizonCard } from './HorizonCard';
import { ContinueReadingCard } from './ContinueReadingCard';
import { DashboardSophiaPanel } from './DashboardSophiaPanel';
import { DrawerExpandContext } from './DrawerExpandContext';
import { getInsightCount } from '@/lib/insights';

// ============ Stagger Animation ============

const stagger = {
  container: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },
};

// ============ Component ============

export function SacredRhythmDashboard() {
  const navigate = useNavigate();
  const { config } = useTimePeriod();
  const [expandedContent, setExpandedContent] = useState<ReactNode>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isExpanded = expandedContent !== null;

  const collapse = useCallback(() => {
    setExpandedContent(null);
    setExpandedId(null);
  }, []);
  const expand = useCallback((content: ReactNode, id?: string) => {
    setExpandedContent(content);
    setExpandedId(id ?? null);
  }, []);

  const contextValue = useMemo(() => ({ expand, collapse, expandedId }), [expand, collapse, expandedId]);

  const hasInsights = getInsightCount() > 0;

  // Determine if we're in a dark time period (evening/night)
  const isDarkMode = config.textColor !== '#2D3748';

  // Drawer background — slightly elevated from the page
  const drawerBg = isDarkMode ? '#262721' : '#F1EDE9';
  const outerBg = isDarkMode ? '#1E1F1A' : '#E3DCD3';
  const drawerTextColor = isDarkMode ? '#F4EFE6' : '#5A4C3A';

  const dateStr = formatDate();
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <DrawerExpandContext.Provider value={contextValue}>
      <div
        className="h-screen lg:overflow-hidden overflow-auto flex flex-col"
        style={{ background: outerBg }}
      >
        {/* Noise overlay for subtle texture */}
        <div className="noise-overlay" />

        {/* Header area — relative for blur overlay positioning */}
        <div className="relative">
          <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
            <DashboardHeader isDarkMode={isDarkMode} />
          </div>

          {/* Blur overlay + dismiss button when expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Blur overlay */}
                <div
                  className="absolute inset-0 backdrop-blur-md"
                  style={{
                    background: isDarkMode
                      ? 'rgba(30, 31, 26, 0.6)'
                      : 'rgba(237, 232, 223, 0.6)',
                  }}
                />
                {/* Dismiss button — top right */}
                <button
                  onClick={collapse}
                  className="absolute top-5 right-6 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDarkMode
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(90, 76, 58, 0.1)',
                  }}
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: isDarkMode ? '#F4EFE6' : '#5A4C3A' }}
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom drawer container — full width */}
        <div
          className="flex-1 min-h-0 rounded-t-[28px] overflow-hidden"
          style={{
            background: drawerBg,
            boxShadow: isDarkMode
              ? '0 -8px 40px rgba(0, 0, 0, 0.5), 0 -2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              : '0 -8px 40px rgba(90, 76, 58, 0.12), 0 -2px 12px rgba(90, 76, 58, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderTop: isDarkMode
              ? '1px solid rgba(255, 255, 255, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              /* ===== Expanded Content ===== */
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-auto"
              >
                {expandedContent}
              </motion.div>
            ) : (
              /* ===== Dashboard Grid ===== */
              <motion.div
                key="grid"
                variants={stagger.container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pt-5 md:pt-6 pb-8 md:pb-10 h-full max-w-[1600px] mx-auto flex flex-col px-4 sm:px-6 lg:px-8"
              >
                {/* Search + Date/Time — top of drawer */}
                <div className="flex items-center justify-between mb-5 md:mb-6 px-1">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/search')}
                  >
                    <Search className="w-4 h-4 flex-shrink-0" style={{ color: drawerTextColor, opacity: 0.5 }} />
                    <span className="text-sm" style={{ color: drawerTextColor, opacity: 0.45 }}>
                      Search...
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: drawerTextColor, opacity: 0.6 }}
                  >
                    <span>{dateStr}</span>
                    <span className="opacity-50">&middot;</span>
                    <span>{timeStr}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 md:gap-8 flex-1 min-h-0">
                  {hasInsights ? (
                    <>
                      {/* Left 2/3 — 2x2 Card Grid */}
                      <motion.div
                        variants={stagger.item}
                        className="flex-1 lg:w-2/3 min-h-0"
                      >
                        <div className="flex flex-col gap-6 md:gap-8 h-full" style={{ minHeight: 0 }}>
                          {/* Row 1: Bible (narrow) + Journey (wide) */}
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 md:gap-8 flex-1 min-h-0">
                            <ContinueReadingCard />
                            <JourneyCard />
                          </div>
                          {/* Row 2: Constellation (wide) + Horizon (narrow) */}
                          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 md:gap-8 flex-1 min-h-0">
                            <ConstellationCard />
                            <HorizonCard />
                          </div>
                        </div>
                      </motion.div>

                      {/* Right 1/3 — Sophia Chat Panel */}
                      <motion.div
                        variants={stagger.item}
                        className="lg:w-1/3 max-h-[500px] lg:max-h-none"
                      >
                        <DashboardSophiaPanel isDarkMode={isDarkMode} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Left 2/3 — Bible Card only */}
                      <motion.div
                        variants={stagger.item}
                        className="flex-1 lg:w-2/3 min-h-0"
                      >
                        <ContinueReadingCard />
                      </motion.div>

                      {/* Right 1/3 — Sophia Chat Panel */}
                      <motion.div
                        variants={stagger.item}
                        className="lg:w-1/3 max-h-[500px] lg:max-h-none"
                      >
                        <DashboardSophiaPanel isDarkMode={isDarkMode} />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DrawerExpandContext.Provider>
  );
}
