import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Compass, Sparkles } from 'lucide-react';
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
import { getQuizData, shouldShowWelcomeDashboard, markFullyOnboarded } from '@/lib/onboardingState';
import { DashboardTour } from '@/components/onboarding-tour/DashboardTour';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tourActive, setTourActive] = useState(() => shouldShowWelcomeDashboard());
  const [tourClosing, setTourClosing] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem('wl_dashboard_banner_dismissed') === 'true',
  );

  const hasInsights = getInsightCount() > 0;
  const quizData = getQuizData();
  const readingHistory = getReadingHistory();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const isFirstVisit = readingHistory.length === 0 && getProgressPercentage(curriculum) === 0;

  const dateStr = formatDate();
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={`relative h-full ${tourActive && !tourClosing ? 'max-h-screen overflow-hidden' : ''}`}>
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

        {/* Orientation banner — shown once for first-time users */}
        <AnimatePresence>
          {isFirstVisit && !bannerDismissed && (!tourActive || tourClosing) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
              transition={{ duration: 0.25 }}
              className="mb-5 md:mb-6"
            >
              <div className="relative rounded-xl border border-wl-olive/15 dark:border-wl-olive-300/15 bg-white/60 dark:bg-wl-olive-300/[0.06] px-5 py-4" style={{ backdropFilter: 'blur(8px)' }}>
                <button
                  onClick={() => {
                    localStorage.setItem('wl_dashboard_banner_dismissed', 'true');
                    setBannerDismissed(true);
                  }}
                  className="absolute top-3 right-3 p-1 rounded-lg text-foreground/30 hover:text-foreground/60 hover:bg-foreground/[0.05] transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-sm font-medium text-foreground/70 dark:text-wl-olive-200 mb-3 pr-6">
                  Your dashboard has three ways to get started:
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-wl-olive/50 dark:text-wl-olive-300/50 flex-shrink-0" />
                    <p className="text-[13px] text-foreground/55 dark:text-wl-olive-300/70">
                      <span className="font-medium text-foreground/70 dark:text-wl-olive-200">Read the Bible</span> — Explore Scripture with personalized passages
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-wl-olive/50 dark:text-wl-olive-300/50 flex-shrink-0" />
                    <p className="text-[13px] text-foreground/55 dark:text-wl-olive-300/70">
                      <span className="font-medium text-foreground/70 dark:text-wl-olive-200">Take a Course</span> — Follow step-by-step lessons tailored to you
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-wl-olive/50 dark:text-wl-olive-300/50 flex-shrink-0" />
                    <p className="text-[13px] text-foreground/55 dark:text-wl-olive-300/70">
                      <span className="font-medium text-foreground/70 dark:text-wl-olive-200">Chat with Sophia</span> — Ask questions, get guidance, grow at your own pace
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="flex flex-col lg:flex-row lg:items-stretch gap-6 md:gap-8 flex-1 min-h-0"
          onClick={() => {
            if (!bannerDismissed) {
              localStorage.setItem('wl_dashboard_banner_dismissed', 'true');
              setBannerDismissed(true);
            }
          }}
        >
          {/* Left 2/3 — two rows of cards */}
          <motion.div
            variants={stagger.item}
            className="flex-1 lg:w-2/3 min-h-0 max-h-[500px] lg:max-h-none"
          >
            <div className="flex flex-col gap-6 md:gap-8 h-full" style={{ minHeight: 0 }}>
              {/* Row 1: Bible | Curriculum (equal width) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 flex-1 min-h-0">
                <div data-tour="scripture-card" className="min-h-0 relative">
                  <ContinueReadingCard />
                </div>
                <div data-tour="curriculum-card" className="min-h-0 relative">
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
            data-tour="sophia-panel"
            variants={stagger.item}
            className="lg:w-1/3 max-h-[500px] lg:max-h-none relative"
          >
            <DashboardSophiaPanel />
          </motion.div>
        </div>
      </motion.div>

      {/* Search overlay — fills drawer with blurred backdrop */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Interactive tour — shown once after onboarding quiz */}
      {tourActive && (
        <DashboardTour
          userName={quizData.name || ''}
          spiritualBackground={quizData.spiritualBackground || ''}
          onClosing={() => setTourClosing(true)}
          onComplete={(action) => {
            markFullyOnboarded();
            setTourActive(false);
            const routes: Record<string, string> = {
              sophia: '/chat',
              scripture: '/bible',
              curriculum: '/learn',
            };
            const route = routes[action];
            if (route) navigate(route);
          }}
          onSkip={() => {
            markFullyOnboarded();
            setTourActive(false);
          }}
        />
      )}
    </div>
  );
}
