import { useState, useEffect, useMemo, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronDown, X } from 'lucide-react';
import type { Curriculum } from '@/types/curriculum';
import type { BibleReference, BibleVerse } from '@/lib/bibleApi';
import {
  isLessonComplete,
  markLessonComplete,
  markLessonIncomplete,
  setCurrentLesson,
  getNextLessonId,
  getPreviousLessonId,
  findLessonPosition,
} from '@/lib/curriculum/curriculumProgress';
import { useSophiaOrbIntercept } from '@/components/sophia/SophiaOrbInterceptContext';
import { LessonHero } from './LessonHero';
import { LessonContentTabs } from './LessonContentTabs';
import { LessonSidebar } from './LessonSidebar';
import { LessonNavigation } from './LessonNavigation';

const CurriculumSophiaPanel = lazy(() =>
  import('./CurriculumSophiaPanel').then(m => ({ default: m.CurriculumSophiaPanel }))
);

const ReadingView = lazy(() =>
  import('@/components/bible/ReadingView').then(m => ({ default: m.ReadingView }))
);

// ============ Expandable Description ============

const LINE_CLAMP_CLASS = 'line-clamp-3';

function getDescriptionText(description: string, teachingContent?: string): string {
  if (teachingContent) {
    // Strip markdown headings and extract plain text for description
    const cleaned = teachingContent
      .replace(/^#{1,6}\s+.*$/gm, '') // remove headings
      .replace(/\*\*/g, '')            // remove bold markers
      .replace(/\n{2,}/g, '\n\n')     // normalize whitespace
      .trim();
    // Take first paragraph
    const firstPara = cleaned.split('\n\n')[0]?.trim();
    if (firstPara && firstPara.length > 80) return firstPara;
  }
  return description;
}

function ExpandableDescription({
  description,
  teachingContent,
  estimatedMinutes,
}: {
  description: string;
  teachingContent?: string;
  estimatedMinutes?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const displayText = getDescriptionText(description, teachingContent);

  const checkClamped = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    setClamped(el.scrollHeight > el.clientHeight + 1);
  }, []);

  useEffect(() => {
    checkClamped();
    window.addEventListener('resize', checkClamped);
    return () => window.removeEventListener('resize', checkClamped);
  }, [checkClamped, displayText]);

  return (
    <div className="mt-4 mb-6">
      {estimatedMinutes && (
        <span className="inline-flex items-center gap-1.5 text-xs text-foreground/40 mb-2">
          <Clock className="w-3.5 h-3.5" />
          {estimatedMinutes} min
        </span>
      )}
      <p
        ref={textRef}
        className={`text-sm text-foreground/60 leading-relaxed ${!expanded ? LINE_CLAMP_CLASS : ''}`}
      >
        {displayText}
      </p>
      {(clamped || expanded) && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="flex items-center gap-1 mt-1.5 text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          {expanded ? 'Show less' : 'Read more'}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}

// ============ Lesson View ============

interface LessonViewProps {
  curriculum: Curriculum;
  lessonId: string;
  onBack: () => void;
  onBackToOverview?: () => void;
  onBackToPhase?: () => void;
  onNavigate: (lessonId: string) => void;
}

export function LessonView({ curriculum, lessonId, onBack, onBackToOverview, onBackToPhase, onNavigate }: LessonViewProps) {
  const [isSophiaOpen, setIsSophiaOpen] = useState(true);
  const [isBibleOpen, setIsBibleOpen] = useState(false);
  const [bibleReference, setBibleReference] = useState<BibleReference | null>(null);
  const [bibleWidth, setBibleWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ startX: number; startWidth: number }>({ startX: 0, startWidth: 480 });
  const [completed, setCompleted] = useState(() => isLessonComplete(lessonId));
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();
  const [sophiaKey, setSophiaKey] = useState(0);

  // Drag-to-resize for Bible panel
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { startX: e.clientX, startWidth: bibleWidth };
    setIsResizing(true);
  }, [bibleWidth]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = resizeRef.current.startX - e.clientX;
      setBibleWidth(Math.min(800, Math.max(280, resizeRef.current.startWidth + delta)));
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Register orb intercept so floating Sophia orb opens the lesson chat pane
  const { register, unregister, setHideOrb } = useSophiaOrbIntercept();

  useEffect(() => {
    // Hide orb since Sophia pane starts open on lesson pages
    setHideOrb(true);
    register((prompt?: string) => {
      setIsSophiaOpen(true);
      setHideOrb(true);
      if (prompt) setInitialPrompt(prompt);
    });
    return () => unregister();
  }, [register, unregister, setHideOrb]);

  // Find the lesson in the curriculum
  const lesson = useMemo(() => {
    for (const phase of curriculum.phases) {
      for (const mod of phase.modules) {
        for (const section of mod.sections) {
          const found = section.lessons.find(l => l.id === lessonId);
          if (found) return found;
        }
      }
    }
    return null;
  }, [curriculum, lessonId]);

  // Location context
  const position = useMemo(() => findLessonPosition(curriculum, lessonId), [curriculum, lessonId]);
  const phaseTitle = position ? curriculum.phases[position.phaseIndex]?.title : '';
  const moduleTitle = position
    ? curriculum.phases[position.phaseIndex]?.modules[position.moduleIndex]?.title
    : '';

  const nextId = getNextLessonId(curriculum, lessonId);
  const prevId = getPreviousLessonId(curriculum, lessonId);

  // Set as current lesson and sync completion state when lessonId changes
  useEffect(() => {
    setCurrentLesson(lessonId);
    setCompleted(isLessonComplete(lessonId));
    // Reset bible panel when navigating to a new lesson
    setIsBibleOpen(false);
    setBibleReference(null);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full text-foreground/40">
        Lesson not found.
      </div>
    );
  }

  const handleScriptureClick = (ref: { label: string; book: string; chapter: number }) => {
    setBibleReference({ book: ref.book, chapter: ref.chapter });
    setIsBibleOpen(true);
  };

  const handleOpenBible = () => {
    if (!bibleReference) {
      const ref = lesson.scriptureRefs?.[0];
      setBibleReference(ref
        ? { book: ref.book, chapter: ref.chapter }
        : { book: 'Genesis', chapter: 1 }
      );
    }
    setIsBibleOpen(true);
  };

  const handleCloseBible = () => {
    setIsBibleOpen(false);
  };

  const handleToggleComplete = () => {
    if (completed) {
      markLessonIncomplete(lessonId);
      setCompleted(false);
    } else {
      markLessonComplete(lessonId);
      setCompleted(true);
    }
  };

  const handleNext = () => {
    if (nextId) onNavigate(nextId);
  };

  const handlePrev = () => {
    if (prevId) onNavigate(prevId);
  };

  const handleOpenSophia = (prompt?: string) => {
    setIsSophiaOpen(true);
    setHideOrb(true);
    if (prompt) setInitialPrompt(prompt);
  };

  const handleBibleAskSophia = (verse: BibleVerse, ref: BibleReference) => {
    const prompt = `Help me understand ${ref.book} ${ref.chapter}:${verse.number} — "${verse.text}"`;
    setSophiaKey(k => k + 1);
    setInitialPrompt(prompt);
    setIsSophiaOpen(true);
    setHideOrb(true);
  };

  const handleDismissSophia = () => {
    setIsSophiaOpen(false);
    setInitialPrompt(undefined);
    setHideOrb(false);
  };

  return (
    <div className="h-full flex" key={lessonId}>
      {/* Main content */}
      <motion.div
        className="flex-1 min-w-0 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Back button + Breadcrumb */}
          <div className="mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-xs text-foreground/35 flex flex-wrap items-center gap-0">
              {onBackToOverview && (
                <>
                  <button onClick={onBackToOverview} className="hover:text-foreground/60 transition-colors">
                    {curriculum.title}
                  </button>
                  <span className="mx-1.5">&rsaquo;</span>
                </>
              )}
              {onBackToPhase && (
                <>
                  <button onClick={onBackToPhase} className="hover:text-foreground/60 transition-colors">
                    {position ? `Phase ${position.phaseIndex + 1}: ${phaseTitle}` : phaseTitle}
                  </button>
                  <span className="mx-1.5">&rsaquo;</span>
                </>
              )}
              <button onClick={onBack} className="hover:text-foreground/60 transition-colors">
                {moduleTitle}
              </button>
              <span className="mx-1.5">&rsaquo;</span>
              <span className="truncate">{lesson?.title}</span>
            </div>
          </div>

          {/* Two-column layout (sidebar hidden when Bible panel is open) */}
          <div className={`lg:grid lg:gap-6 ${isBibleOpen ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_340px]'}`}>
            {/* Left column: main content */}
            <div className="min-w-0">
              {/* Hero banner */}
              <LessonHero lesson={lesson} />

              {/* Description */}
              <ExpandableDescription
                description={lesson.description}
                teachingContent={lesson.teachingContent}
                estimatedMinutes={lesson.estimatedMinutes}
              />

              {/* Tabbed content */}
              <LessonContentTabs
                lesson={lesson}
                lessonId={lessonId}
                onScriptureClick={handleScriptureClick}
                onAskSophia={(prompt) => handleOpenSophia(prompt)}
              />

              {/* Navigation */}
              <div className="mt-8 mb-8">
                <LessonNavigation
                  prevId={prevId}
                  nextId={nextId}
                  completed={completed}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onToggleComplete={handleToggleComplete}
                />
              </div>

              {/* Mobile sidebar (below content on small screens) */}
              <div className="lg:hidden mb-8">
                <LessonSidebar
                  curriculum={curriculum}
                  lessonId={lessonId}
                  onLessonClick={onNavigate}
                  onOpenBible={handleOpenBible}
                />
              </div>
            </div>

            {/* Right column: sidebar (desktop only, hidden when Bible is open) */}
            {!isBibleOpen && (
              <div className="hidden lg:block">
                <div className="sticky top-6">
                  <LessonSidebar
                    curriculum={curriculum}
                    lessonId={lessonId}
                    onLessonClick={onNavigate}
                    onOpenBible={handleOpenBible}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Resize handle between lesson and Bible (desktop only) */}
      {isBibleOpen && bibleReference && (
        <div className="hidden lg:block relative flex-shrink-0" style={{ width: 0 }}>
          <div
            onMouseDown={handleResizeStart}
            className="absolute inset-y-0 -left-3 -right-3 z-20 cursor-col-resize flex items-center justify-center group"
          >
            <div
              className={`w-1 h-10 rounded-full transition-opacity duration-150 ${
                isResizing
                  ? 'bg-foreground/30 opacity-100'
                  : 'bg-foreground/20 opacity-0 group-hover:opacity-100'
              }`}
            />
          </div>
        </div>
      )}

      {/* Bible reading pane — full-screen on mobile, side panel on desktop */}
      <AnimatePresence>
        {isBibleOpen && bibleReference && (
          <>
            {/* Mobile/tablet: full-screen overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/20 flex-shrink-0">
                <button
                  onClick={handleCloseBible}
                  className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to lesson
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
                      Loading...
                    </div>
                  }
                >
                  <ReadingView
                    reference={bibleReference}
                    onNavigate={setBibleReference}
                    onAskSophia={handleBibleAskSophia}
                    compact
                  />
                </Suspense>
              </div>
            </motion.div>

            {/* Desktop: in-page side panel */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: bibleWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={isResizing ? { duration: 0 } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:flex flex-shrink-0 border-l border-border/30 overflow-hidden relative"
            >
              <div style={{ width: bibleWidth }} className="h-full">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
                      Loading...
                    </div>
                  }
                >
                  <ReadingView
                    reference={bibleReference}
                    onNavigate={setBibleReference}
                    onAskSophia={handleBibleAskSophia}
                    compact
                  />
                </Suspense>
              </div>
              <button
                onClick={handleCloseBible}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sophia chat pane — full-screen on mobile, side panel on desktop */}
      <AnimatePresence>
        {isSophiaOpen && (
          <>
            {/* Mobile/tablet: full-screen overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-background"
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
                    Loading...
                  </div>
                }
              >
                <CurriculumSophiaPanel
                  key={sophiaKey}
                  lesson={lesson}
                  onDismiss={handleDismissSophia}
                  initialPrompt={initialPrompt}
                />
              </Suspense>
            </motion.div>

            {/* Desktop: in-page side panel */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:block flex-shrink-0 border-l border-border/30 overflow-hidden"
            >
              <div className="w-[380px] h-full">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
                      Loading...
                    </div>
                  }
                >
                  <CurriculumSophiaPanel
                    key={sophiaKey}
                    lesson={lesson}
                    onDismiss={handleDismissSophia}
                    initialPrompt={initialPrompt}
                  />
                </Suspense>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
