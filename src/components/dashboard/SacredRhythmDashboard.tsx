import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTimePeriod } from '@/lib/timeAwareness';
import { formatDate } from '@/types/wholelicity';
import { DashboardHeader } from './DashboardHeader';
import { ContinueReadingCard } from './ContinueReadingCard';
import { CurriculumCard } from './CurriculumCard';
import { JourneyCard } from './JourneyCard';
import { ConstellationCard } from './ConstellationCard';
import { HorizonCard } from './HorizonCard';
import { DashboardSophiaPanel } from './DashboardSophiaPanel';
import { DrawerExpandContext } from './DrawerExpandContext';
import { getInsightCount } from '@/lib/insights';
import { getReadingHistory } from '@/lib/bibleApi';
import { getProgressPercentage } from '@/lib/curriculum/curriculumProgress';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import { getQuizData } from '@/lib/onboardingState';
import { GlobalSophia } from '@/components/sophia/GlobalSophia';

// ============ Persona → Starting Card ============

const PERSONA_START_CARD: Record<string, 'scripture' | 'curriculum' | 'sophia'> = {
  new_to_faith: 'sophia',
  believer_going_deeper: 'scripture',
  pastor_leader: 'curriculum',
  seminary_student: 'scripture',
  exploring_faith: 'sophia',
};

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

// ============ Start Here Badge ============

function StartHereBadge() {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
      <span className="px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#8A7356] dark:bg-[#A5A597] text-white dark:text-[#171714] shadow-sm">
        Start Here
      </span>
    </div>
  );
}

// ============ Component ============

export function SacredRhythmDashboard() {
  const navigate = useNavigate();
  const { config } = useTimePeriod();
  const [expandedContent, setExpandedContent] = useState<ReactNode>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dismissedStartHint, setDismissedStartHint] = useState(false);
  const isExpanded = expandedContent !== null;

  const collapse = useCallback(() => {
    setExpandedContent(null);
    setExpandedId(null);
  }, []);
  const expand = useCallback((content: ReactNode, id?: string) => {
    setExpandedContent(content);
    setExpandedId(id ?? null);
    setDismissedStartHint(true);
  }, []);

  const contextValue = useMemo(() => ({ expand, collapse, expandedId }), [expand, collapse, expandedId]);

  const hasInsights = getInsightCount() > 0;
  const quizData = getQuizData();
  const readingHistory = getReadingHistory();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const isFirstVisit = readingHistory.length === 0 && getProgressPercentage(curriculum) === 0;

  // Persona-based starting card recommendation (dismissed after first interaction)
  const startCard = isFirstVisit && !dismissedStartHint
    ? (PERSONA_START_CARD[quizData.spiritualBackground ?? ''] ?? 'sophia')
    : null;

  // Dark mode: defaults to time-based (evening/night = dark), with manual override
  const timeBasedDark = config.textColor !== '#2D3748';
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);
  const isDarkMode = darkOverride !== null ? darkOverride : timeBasedDark;
  const toggleDarkMode = useCallback(() => {
    setDarkOverride(prev => prev !== null ? !prev : !timeBasedDark);
  }, [timeBasedDark]);

  // Drawer background — slightly elevated from the page
  const drawerBg = isDarkMode ? '#21211D' : '#F1EDE9';
  const outerBg = isDarkMode ? '#171714' : '#E3DCD3';
  const drawerTextColor = isDarkMode ? '#F1F1EF' : '#5A4C3A';

  const dateStr = formatDate();
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <DrawerExpandContext.Provider value={contextValue}>
      <div
        className={`h-screen lg:overflow-hidden overflow-auto flex flex-col${isDarkMode ? ' dark' : ''}`}
        style={{ background: outerBg }}
      >
        {/* Noise overlay for subtle texture */}
        <div className="noise-overlay" />

        {/* Header */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <DashboardHeader isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        </div>

        {/* Bottom drawer container — full width */}
        <div
          className="flex-1 min-h-0 rounded-t-[28px] overflow-hidden"
          style={{
            background: drawerBg,
            boxShadow: isDarkMode
              ? '0 -8px 40px rgba(12, 12, 10, 0.6), 0 -2px 12px rgba(12, 12, 10, 0.4), inset 0 1px 0 rgba(241, 241, 239, 0.06)'
              : '0 -8px 40px rgba(90, 76, 58, 0.12), 0 -2px 12px rgba(90, 76, 58, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderTop: isDarkMode
              ? '1px solid rgba(241, 241, 239, 0.06)'
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
                  {!isFirstVisit ? (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate('/search')}
                    >
                      <Search className="w-4 h-4 flex-shrink-0" style={{ color: drawerTextColor, opacity: 0.5 }} />
                      <span className="text-sm" style={{ color: drawerTextColor, opacity: 0.45 }}>
                        Search...
                      </span>
                    </div>
                  ) : (
                    <div />
                  )}
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
                  {/* Left 2/3 — two rows of cards */}
                  <motion.div
                    variants={stagger.item}
                    className="flex-1 lg:w-2/3 min-h-0 max-h-[500px] lg:max-h-none"
                  >
                    <div className="flex flex-col gap-6 md:gap-8 h-full" style={{ minHeight: 0 }}>
                      {/* Row 1: Bible | Curriculum (equal width) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 flex-1 min-h-0">
                        <div className={`min-h-0 relative ${startCard === 'scripture' ? 'animate-card-glow' : ''}`}>
                          {startCard === 'scripture' && <StartHereBadge />}
                          <ContinueReadingCard />
                        </div>
                        <div className={`min-h-0 relative ${startCard === 'curriculum' ? 'animate-card-glow' : ''}`}>
                          {startCard === 'curriculum' && <StartHereBadge />}
                          <CurriculumCard />
                        </div>
                      </div>
                      {/* Row 2: Constellation | Journey | Horizon (shown once user has insights) */}
                      {hasInsights && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 flex-1 min-h-0">
                          <ConstellationCard />
                          <JourneyCard />
                          <HorizonCard />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Right 1/3 — Sophia Chat Panel (fixed) */}
                  <motion.div
                    variants={stagger.item}
                    className={`lg:w-1/3 max-h-[500px] lg:max-h-none relative ${startCard === 'sophia' ? 'animate-card-glow' : ''}`}
                  >
                    {startCard === 'sophia' && <StartHereBadge />}
                    <DashboardSophiaPanel isDarkMode={isDarkMode} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Sophia orb — visible when expanded to non-chat/bible content */}
      {isExpanded && expandedId !== 'chat' && expandedId !== 'bible' && <GlobalSophia />}
    </DrawerExpandContext.Provider>
  );
}
