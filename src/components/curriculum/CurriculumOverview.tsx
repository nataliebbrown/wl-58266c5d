import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, PlayCircle } from 'lucide-react';
import { getQuizData } from '@/lib/onboardingState';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import {
  getProgressPercentage,
  getCurrentOrFirstLessonId,
  findLessonPosition,
} from '@/lib/curriculum/curriculumProgress';
import { useSophiaOrbIntercept } from '@/components/sophia/SophiaOrbInterceptContext';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { PhaseSection } from './PhaseSection';
import { LessonView } from './LessonView';

const ContextualSophiaPane = lazy(() =>
  import('@/components/sophia/ContextualSophiaPane').then(m => ({ default: m.ContextualSophiaPane }))
);

export function CurriculumOverview() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSophiaOpen, setIsSophiaOpen] = useState(false);
  const [sophiaPrompt, setSophiaPrompt] = useState<string | undefined>();

  const quizData = getQuizData();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const percentage = getProgressPercentage(curriculum);
  const currentLessonId = getCurrentOrFirstLessonId(curriculum);

  // Determine which phase the current lesson is in (for auto-expand)
  const currentPosition = currentLessonId
    ? findLessonPosition(curriculum, currentLessonId)
    : null;

  // Register orb intercept when on overview (not in a lesson)
  const { register, unregister, setHideOrb } = useSophiaOrbIntercept();

  useEffect(() => {
    if (activeLessonId) return; // LessonView handles its own intercept
    register((prompt?: string) => {
      setIsSophiaOpen(true);
      setHideOrb(true);
      if (prompt) setSophiaPrompt(prompt);
    });
    return () => unregister();
  }, [activeLessonId, register, unregister, setHideOrb]);

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  const handleBackToOverview = () => {
    setActiveLessonId(null);
  };

  const handleContinue = () => {
    if (currentLessonId) {
      setActiveLessonId(currentLessonId);
    }
  };

  const handleDismissSophia = () => {
    setIsSophiaOpen(false);
    setSophiaPrompt(undefined);
    setHideOrb(false);
  };

  // Lesson view mode
  if (activeLessonId) {
    return (
      <LessonView
        curriculum={curriculum}
        lessonId={activeLessonId}
        onBack={handleBackToOverview}
        onNavigate={setActiveLessonId}
      />
    );
  }

  // Overview mode
  return (
    <div className="h-full flex">
      {/* Overview content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-hl-green" />
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                Your Learning Path
              </span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3 leading-tight">
              {curriculum.title}
            </h1>

            <p className="text-base text-foreground/60 leading-relaxed mb-4">
              {curriculum.personaIntro}
            </p>

            <p className="text-sm text-foreground/40 leading-relaxed mb-6 italic">
              {curriculum.learningApproach}
            </p>

            {/* Progress + CTA */}
            <div className="flex items-center gap-4">
              <CurriculumProgressBar
                percentage={percentage}
                showLabel
                height={8}
                className="flex-1"
              />
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-hl-green text-white text-sm font-medium hover:bg-hl-green/80 transition-colors flex-shrink-0"
              >
                <PlayCircle className="w-4 h-4" />
                {percentage > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          </motion.div>

          {/* Phase list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-4 pb-24"
          >
            {curriculum.phases.map((phase, i) => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                phaseIndex={i}
                curriculum={curriculum}
                currentLessonId={currentLessonId}
                defaultExpanded={currentPosition?.phaseIndex === i}
                onLessonClick={handleLessonClick}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contextual Sophia chat pane */}
      <AnimatePresence>
        {isSophiaOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex-shrink-0 border-l border-border/30 overflow-hidden"
          >
            <div className="w-[380px] h-full">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading...</div>}>
                <ContextualSophiaPane
                  onDismiss={handleDismissSophia}
                  initialPrompt={sophiaPrompt}
                  context="learn"
                />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
