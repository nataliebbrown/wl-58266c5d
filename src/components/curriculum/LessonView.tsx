import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen, MessageCircle } from 'lucide-react';
import type { Curriculum, Lesson } from '@/types/curriculum';
import type { BibleReference } from '@/lib/bibleApi';
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
import { ResizablePanelLayout } from './ResizablePanelLayout';
import { CurriculumBiblePane } from './CurriculumBiblePane';
import { CurriculumSophiaPanel } from './CurriculumSophiaPanel';

interface LessonViewProps {
  curriculum: Curriculum;
  lessonId: string;
  onBack: () => void;
  onNavigate: (lessonId: string) => void;
}

function parseScriptureRef(label: string, book: string, chapter: number): BibleReference {
  return { book, chapter };
}

export function LessonView({ curriculum, lessonId, onBack, onNavigate }: LessonViewProps) {
  const [isBibleOpen, setIsBibleOpen] = useState(false);
  const [isSophiaOpen, setIsSophiaOpen] = useState(false);
  const [bibleRef, setBibleRef] = useState<BibleReference | null>(null);
  const [completionToggle, setCompletionToggle] = useState(0); // trigger re-render
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();

  // Register orb intercept so floating Sophia orb opens the lesson chat pane
  const { register, unregister, setHideOrb } = useSophiaOrbIntercept();

  useEffect(() => {
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
  const moduleTitle = position ? curriculum.phases[position.phaseIndex]?.modules[position.moduleIndex]?.title : '';

  const nextId = getNextLessonId(curriculum, lessonId);
  const prevId = getPreviousLessonId(curriculum, lessonId);
  const completed = isLessonComplete(lessonId);

  // Set as current lesson
  setCurrentLesson(lessonId);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full text-foreground/40">
        Lesson not found.
      </div>
    );
  }

  const handleScriptureClick = (ref: { label: string; book: string; chapter: number }) => {
    const bibleReference = parseScriptureRef(ref.label, ref.book, ref.chapter);
    setBibleRef(bibleReference);
    setIsBibleOpen(true);
  };

  const handleToggleComplete = () => {
    if (completed) {
      markLessonIncomplete(lessonId);
    } else {
      markLessonComplete(lessonId);
    }
    setCompletionToggle(prev => prev + 1);
  };

  const handleNext = () => {
    if (nextId) onNavigate(nextId);
  };

  const handlePrev = () => {
    if (prevId) onNavigate(prevId);
  };

  // Build panels
  const lessonPanel = (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to curriculum
        </button>

        {/* Breadcrumb */}
        <div className="text-xs text-foreground/35 mb-2">
          {phaseTitle} &rsaquo; {moduleTitle}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-3 leading-snug">
          {lesson.title}
        </h1>

        {/* Description */}
        {lesson.description && (
          <p className="text-base text-foreground/70 leading-relaxed mb-6">
            {lesson.description}
          </p>
        )}

        {/* Scripture references */}
        {lesson.scriptureRefs && lesson.scriptureRefs.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/35 mb-2">
              Scripture References
            </p>
            <div className="flex flex-wrap gap-2">
              {lesson.scriptureRefs.map((ref, i) => (
                <button
                  key={i}
                  onClick={() => handleScriptureClick(ref)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-hl-green bg-hl-green/10 hover:bg-hl-green/20 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {ref.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recommended reading */}
        {lesson.recommendedReading && lesson.recommendedReading.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/35 mb-2">
              Recommended Reading
            </p>
            <ul className="space-y-1">
              {lesson.recommendedReading.map((book, i) => (
                <li key={i} className="text-sm text-foreground/60 flex items-start gap-1.5">
                  <span className="text-foreground/20 mt-0.5">&#x2022;</span>
                  {book}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ask Sophia button */}
        <div className="mb-8">
          <button
            onClick={() => { setIsSophiaOpen(true); setHideOrb(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask Sophia about this lesson
          </button>
        </div>

        {/* Completion toggle */}
        <div className="border-t border-border/20 pt-6 mb-6">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-colors w-full ${
              completed
                ? 'bg-hl-green/10 text-hl-green'
                : 'bg-foreground/[0.04] text-foreground/70 hover:bg-foreground/[0.08]'
            }`}
          >
            {completed ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {completed ? 'Completed' : 'Mark as Complete'}
            </span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={handlePrev}
            disabled={!prevId}
            className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!nextId}
            className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const handleDismissSophia = () => {
    setIsSophiaOpen(false);
    setInitialPrompt(undefined);
    setHideOrb(false);
  };

  const sophiaPanel = isSophiaOpen ? (
    <CurriculumSophiaPanel
      lesson={lesson}
      onDismiss={handleDismissSophia}
      initialPrompt={initialPrompt}
    />
  ) : undefined;

  const biblePanel = isBibleOpen && bibleRef ? (
    <CurriculumBiblePane reference={bibleRef} onDismiss={() => setIsBibleOpen(false)} />
  ) : undefined;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      key={completionToggle}
    >
      <ResizablePanelLayout
        leftPanel={lessonPanel}
        middlePanel={sophiaPanel}
        rightPanel={biblePanel}
      />
    </motion.div>
  );
}
