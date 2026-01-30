import { lazy, Suspense, useState, useEffect } from 'react';
import { BookOpen, Sparkles, Compass, ChevronRight, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';
import { getReadingHistory, fetchPassage, type BibleReference, type BiblePassage } from '@/lib/bibleApi';
import { getRecommendedReading, getRecommendedReadingPair, type BibleRecommendation } from '@/lib/bibleRecommendations';
import { getQuizData } from '@/lib/onboardingState';

// ============ Topic Tags ============

const TOPIC_TAGS: { label: string; book: string; chapter: number }[] = [
  { label: 'Faith', book: 'Hebrews', chapter: 11 },
  { label: 'Hope', book: 'Romans', chapter: 8 },
  { label: 'Love', book: '1 Corinthians', chapter: 13 },
  { label: 'Peace', book: 'Philippians', chapter: 4 },
  { label: 'Identity', book: 'Ephesians', chapter: 1 },
  { label: 'Wisdom', book: 'Proverbs', chapter: 2 },
  { label: 'Courage', book: 'Joshua', chapter: 1 },
  { label: 'Prayer', book: 'Matthew', chapter: 6 },
];

// ============ Reading Plans ============

interface ReadingPlan {
  name: string;
  duration: string;
  description: string;
  firstBook: string;
  firstChapter: number;
}

const READING_PLANS: Record<string, ReadingPlan> = {
  new_to_faith: {
    name: 'The Story of Jesus',
    duration: '7 days',
    description: 'Walk through the life of Jesus in the Gospel of John — from His first miracle to His final words.',
    firstBook: 'John',
    firstChapter: 1,
  },
  believer_going_deeper: {
    name: 'The Heart of the Gospel',
    duration: '10 days',
    description: 'Journey through Romans and discover the theological foundation that has shaped believers for two thousand years.',
    firstBook: 'Romans',
    firstChapter: 1,
  },
  pastor_leader: {
    name: 'Leading Like Jesus',
    duration: '7 days',
    description: 'Explore how Jesus shaped, challenged, and empowered the people He led — from calling disciples to sending them out.',
    firstBook: 'Mark',
    firstChapter: 1,
  },
  seminary_student: {
    name: 'Christ in All of Scripture',
    duration: '14 days',
    description: 'Trace the thread of redemption from Genesis to Revelation and see how every book points to Jesus.',
    firstBook: 'Genesis',
    firstChapter: 1,
  },
  exploring_faith: {
    name: 'Honest Questions',
    duration: '7 days',
    description: 'Read alongside people who asked hard questions — from a doubting father to a searching philosopher.',
    firstBook: 'Ecclesiastes',
    firstChapter: 1,
  },
};

const Bible = lazy(() => import('@/pages/Bible'));

// ============ Sub-components ============

function RecommendationRow({
  recommendation,
  onClick,
}: {
  recommendation: BibleRecommendation;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left py-3.5 px-2 -mx-2 rounded-xl hover:bg-foreground/[0.03] transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-[#756653]/8 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-[#756653]/70" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground/80 truncate">
          {recommendation.label}
        </p>
        <p className="text-[11px] text-foreground/40">
          {recommendation.reason}
        </p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors flex-shrink-0" />
    </button>
  );
}

function BrowseRow({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left py-2 px-2 -mx-2 rounded-xl hover:bg-foreground/[0.03] transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] flex items-center justify-center flex-shrink-0">
        <Compass className="w-4 h-4 text-foreground/35" />
      </div>
      <p className="text-sm text-foreground/50 font-medium">
        Browse All Books
      </p>
      <ChevronRight className="w-3.5 h-3.5 text-foreground/15 group-hover:text-foreground/35 transition-colors flex-shrink-0 ml-auto" />
    </button>
  );
}

// ============ Expanded Content ============

function ExpandedBible({ initialReference }: { initialReference?: BibleReference }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40">Loading...</div>}>
      <Bible embedded initialReference={initialReference} />
    </Suspense>
  );
}

// ============ Main Component ============

export function ContinueReadingCard() {
  const { expand } = useDrawerExpand();
  const history = getReadingHistory();

  const mostRecent = history[0];
  const recommendation = getRecommendedReading(history, mostRecent?.book);
  const recommendationPair = getRecommendedReadingPair(history, mostRecent?.book);
  const quizData = getQuizData();

  const emptyStateHeadline = (() => {
    switch (quizData.spiritualBackground) {
      case 'new_to_faith': return 'Start Your Bible Journey';
      case 'believer_going_deeper': return 'Go Deeper in Scripture';
      case 'pastor_leader': return 'Fuel Your Ministry';
      case 'seminary_student': return 'Sharpen Your Study';
      case 'exploring_faith': return 'Explore Scripture';
      default: return 'Discover Scripture';
    }
  })();

  const expandBible = (ref?: BibleReference) =>
    expand(<ExpandedBible initialReference={ref} />, 'bible');

  const handleNavigateToRec = () => {
    expandBible({ book: recommendation.book, chapter: recommendation.chapter });
  };

  const handleExpand = () =>
    expandBible(mostRecent ? { book: mostRecent.book, chapter: mostRecent.chapter } : undefined);

  const readingPlan = READING_PLANS[quizData.spiritualBackground ?? ''] ?? READING_PLANS.exploring_faith;

  if (!mostRecent) {
    // Empty state — personalized recommendations, topics, reading plan
    return (
      <GlassCard padding="none" className="flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <ExpandButton onClick={handleExpand} />
        </div>

        {/* Header */}
        <div className="px-5 pt-8 pb-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#756653]/8 flex items-center justify-center mb-2">
            <BookOpen className="w-8 h-8 text-[#756653]/60" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40">
            Recommended For You
          </p>
          <h3 className="text-3xl font-bold text-foreground/80 leading-tight mt-2">
            {emptyStateHeadline}
          </h3>
          <p className="text-sm text-foreground/40 mt-1">
            Curated based on where you are in your faith
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {/* Topic tags */}
          <div className="flex flex-wrap gap-2 justify-center pb-1">
            {TOPIC_TAGS.map((tag) => (
              <button
                key={tag.label}
                onClick={() => expandBible({ book: tag.book, chapter: tag.chapter })}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#756653]/15 text-foreground/60 hover:border-[#756653]/35 hover:bg-[#756653]/5 hover:text-foreground/80 transition-all duration-200"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Two recommendation cards */}
          {recommendationPair.map((rec) => (
            <button
              key={rec.book + rec.chapter}
              onClick={() => expandBible({ book: rec.book, chapter: rec.chapter })}
              className="w-full rounded-xl text-left px-5 py-5 border border-[#756653]/15 hover:border-[#756653]/35 hover:bg-[#756653]/5 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#756653]/60 flex-shrink-0" />
                <span className="text-base font-semibold text-foreground/85">{rec.label}</span>
                <span className="ml-auto text-[9px] font-medium uppercase tracking-wider text-foreground/30">
                  Start Here
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-foreground/55">
                {rec.reason}
              </p>
            </button>
          ))}

          {/* Reading plan card */}
          <button
            onClick={() => expandBible({ book: readingPlan.firstBook, chapter: readingPlan.firstChapter })}
            className="w-full rounded-xl text-left px-5 py-5 border border-foreground/[0.08] hover:border-[#756653]/25 hover:bg-[#756653]/[0.03] hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#756653]/50 flex-shrink-0" />
              <span className="text-base font-semibold text-foreground/80">{readingPlan.name}</span>
            </div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#756653]/60 bg-[#756653]/8 px-2 py-0.5 rounded-full">
                {readingPlan.duration}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/30">
                Reading Plan
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-foreground/50">
              {readingPlan.description}
            </p>
          </button>
        </div>

        {/* Browse all */}
        <div className="px-5 pb-4 pt-2 border-t border-foreground/[0.05]">
          <button
            onClick={() => expandBible()}
            className="flex items-center justify-center gap-1 w-full text-xs font-medium text-foreground/40 hover:text-foreground/60 transition-colors py-1"
          >
            Browse All Books
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </GlassCard>
    );
  }

  return (
    <ActiveReadingCard
      mostRecent={mostRecent}
      recommendation={recommendation}
      expandBible={expandBible}
      handleExpand={handleExpand}
      handleNavigateToRec={handleNavigateToRec}
    />
  );
}

// ============ Active Reading Card (has history) ============

function ActiveReadingCard({
  mostRecent,
  recommendation,
  expandBible,
  handleExpand,
  handleNavigateToRec,
}: {
  mostRecent: { book: string; chapter: number };
  recommendation: BibleRecommendation;
  expandBible: (ref?: BibleReference) => void;
  handleExpand: () => void;
  handleNavigateToRec: () => void;
}) {
  const [preview, setPreview] = useState<BiblePassage | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPassage({ book: mostRecent.book, chapter: mostRecent.chapter }).then(
      (passage) => {
        if (!cancelled) setPreview(passage);
      }
    );
    return () => { cancelled = true; };
  }, [mostRecent.book, mostRecent.chapter]);

  const resumeRef: BibleReference = { book: mostRecent.book, chapter: mostRecent.chapter };

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      {/* Header — label + expand */}
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
          Continue Reading
        </p>
        <ExpandButton onClick={handleExpand} />
      </div>

      {/* Book + Chapter headline */}
      <h3 className="text-lg font-semibold text-foreground leading-tight px-5 mt-2 mb-3">
        {mostRecent.book} <span className="text-foreground/50 font-normal">{mostRecent.chapter}</span>
      </h3>

      {/* Passage preview */}
      <button
        onClick={() => expandBible(resumeRef)}
        className="mx-5 flex-1 min-h-0 rounded-xl relative overflow-hidden text-left transition-colors"
        style={{ backgroundColor: '#F5F2ED' }}
      >
        <div className="px-4 pt-3 pb-6">
          {preview ? (
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {preview.verses.map((v) => (
                <span key={v.number}>
                  <sup className="text-[9px] text-foreground/30 mr-0.5">{v.number}</sup>
                  {v.text}{' '}
                </span>
              ))}
            </p>
          ) : (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-foreground/[0.06] rounded w-full" />
              <div className="h-3 bg-foreground/[0.06] rounded w-[90%]" />
              <div className="h-3 bg-foreground/[0.06] rounded w-[75%]" />
            </div>
          )}
        </div>
        {/* Fade-out gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,242,237,0), #F5F2ED)',
          }}
        />
      </button>

      {/* Resume CTA */}
      <div className="px-5 pt-4 pb-4 border-b border-foreground/[0.06]">
        <button
          onClick={() => expandBible(resumeRef)}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-[#756653] border border-[#756653]/25 hover:bg-[#756653]/10 hover:border-[#756653]/40 hover:shadow-sm transition-all duration-200"
        >
          Resume Reading
        </button>
      </div>

      {/* Recommended Reading */}
      <div className="px-5 pt-4 pb-4 border-b border-foreground/[0.06]">
        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40 mb-1 px-2">
          Recommended Reading
        </p>
        <RecommendationRow
          recommendation={recommendation}
          onClick={handleNavigateToRec}
        />
      </div>

      {/* Browse All Books */}
      <div className="px-5 pt-3 pb-4">
        <BrowseRow onClick={() => expandBible()} />
      </div>
    </GlassCard>
  );
}
