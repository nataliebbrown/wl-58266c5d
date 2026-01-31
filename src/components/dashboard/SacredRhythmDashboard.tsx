import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { formatDate } from '@/types/wholelicity';
import { ContinueReadingCard } from './ContinueReadingCard';
import { CurriculumCard } from './CurriculumCard';
import { ConstellationCard } from './ConstellationCard';
import { DashboardSophiaPanel } from './DashboardSophiaPanel';
import { getInsightCount } from '@/lib/insights';
import { getReadingHistory } from '@/lib/bibleApi';
import { getProgressPercentage } from '@/lib/curriculum/curriculumProgress';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import { getQuizData } from '@/lib/onboardingState';
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
      <span className="px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-wl-stone dark:bg-wl-olive-300 text-white dark:text-wl-earth-900 shadow-sm">
        Start Here
      </span>
    </div>
  );
}

// ============ Component ============

export function SacredRhythmDashboard() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hasInsights = getInsightCount() > 0;
  const quizData = getQuizData();
  const readingHistory = getReadingHistory();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const isFirstVisit = readingHistory.length === 0 && getProgressPercentage(curriculum) === 0;

  // Persona-based starting card recommendation (shown on first visit only)
  const startCard = isFirstVisit
    ? (PERSONA_START_CARD[quizData.spiritualBackground ?? ''] ?? 'sophia')
    : null;

  const dateStr = formatDate();
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="relative h-full">
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="pt-5 md:pt-6 pb-8 md:pb-10 h-full max-w-[1600px] mx-auto flex flex-col px-4 sm:px-6 lg:px-8"
      >
        {/* Search + Date/Time — top of drawer */}
        <div className="flex items-center justify-between mb-5 md:mb-6 px-1">
          {!isFirstVisit ? (
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="w-4 h-4 flex-shrink-0 text-foreground/50" />
              <span className="text-sm text-foreground/45">
                Search...
              </span>
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
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
              {/* Row 2: Constellation (shown once user has insights) */}
              {hasInsights && (
                <div className="flex-1 min-h-0">
                  <ConstellationCard />
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
            <DashboardSophiaPanel />
          </motion.div>
        </div>
      </motion.div>

      {/* Search overlay — fills drawer with blurred backdrop */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
