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
import { PhaseOverview } from './PhaseOverview';
import { ModuleOverview } from './ModuleOverview';
import { LessonView } from './LessonView';

const ContextualSophiaPane = lazy(() =>
  import('@/components/sophia/ContextualSophiaPane').then(m => ({ default: m.ContextualSophiaPane }))
);

export function CurriculumOverview() {
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSophiaOpen, setIsSophiaOpen] = useState(false);
  const [sophiaPrompt, setSophiaPrompt] = useState<string | undefined>();

  const quizData = getQuizData();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const percentage = getProgressPercentage(curriculum);
  const currentLessonId = getCurrentOrFirstLessonId(curriculum);

  // Register orb intercept when on overview (not in a lesson)
  const { register, unregister, setHideOrb } = useSophiaOrbIntercept();

  useEffect(() => {
    if (activeLessonId) return; // LessonView handles its own intercept
    if (activePhaseId) {
      // Phase overview — show orb but don't auto-open Sophia
      setHideOrb(false);
      register((prompt?: string) => {
        setIsSophiaOpen(true);
        setHideOrb(true);
        if (prompt) setSophiaPrompt(prompt);
      });
      return () => unregister();
    }
    // Main overview — show orb so user can open Sophia if they want
    setHideOrb(false);
    register((prompt?: string) => {
      setIsSophiaOpen(true);
      setHideOrb(true);
      if (prompt) setSophiaPrompt(prompt);
    });
    return () => unregister();
  }, [activeLessonId, activePhaseId, register, unregister, setHideOrb]);

  const handlePhaseClick = (phaseId: string) => {
    setActivePhaseId(phaseId);
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleLessonClick = (lessonId: string) => {
    // Ensure phase and module are set for proper back-navigation
    if (!activePhaseId || !activeModuleId) {
      const pos = findLessonPosition(curriculum, lessonId);
      if (pos) {
        if (!activePhaseId) setActivePhaseId(curriculum.phases[pos.phaseIndex].id);
        if (!activeModuleId) setActiveModuleId(curriculum.phases[pos.phaseIndex].modules[pos.moduleIndex].id);
      }
    }
    setActiveLessonId(lessonId);
  };

  const handleBackFromLesson = () => {
    // Return to module overview (activePhaseId and activeModuleId stay set)
    setActiveLessonId(null);
  };

  const handleBackFromModule = () => {
    // Return to phase overview (activePhaseId stays set)
    setActiveModuleId(null);
  };

  const handleBackFromPhase = () => {
    setActivePhaseId(null);
    setActiveModuleId(null);
  };

  const handleContinue = () => {
    if (currentLessonId) {
      // Find the phase and module for proper back-navigation
      const pos = findLessonPosition(curriculum, currentLessonId);
      if (pos) {
        setActivePhaseId(curriculum.phases[pos.phaseIndex].id);
        setActiveModuleId(curriculum.phases[pos.phaseIndex].modules[pos.moduleIndex].id);
      }
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
        onBack={handleBackFromLesson}
        onBackToOverview={() => { setActiveLessonId(null); setActiveModuleId(null); setActivePhaseId(null); }}
        onBackToPhase={() => { setActiveLessonId(null); setActiveModuleId(null); }}
        onNavigate={setActiveLessonId}
      />
    );
  }

  // Module detail mode
  if (activeModuleId && activePhaseId) {
    const phaseIndex = curriculum.phases.findIndex(p => p.id === activePhaseId);
    const phase = curriculum.phases[phaseIndex];
    if (phase) {
      const moduleIndex = phase.modules.findIndex(m => m.id === activeModuleId);
      const mod = phase.modules[moduleIndex];
      if (mod) {
        return (
          <ModuleOverview
            module={mod}
            moduleIndex={moduleIndex}
            phaseId={phase.id}
            phaseTitle={phase.title}
            phaseIndex={phaseIndex}
            curriculum={curriculum}
            currentLessonId={currentLessonId}
            onBack={handleBackFromModule}
            onBackToOverview={handleBackFromPhase}
            onLessonClick={handleLessonClick}
          />
        );
      }
    }
  }

  // Phase detail mode
  if (activePhaseId) {
    const phaseIndex = curriculum.phases.findIndex(p => p.id === activePhaseId);
    const phase = curriculum.phases[phaseIndex];
    if (phase) {
      return (
        <PhaseOverview
          phase={phase}
          phaseIndex={phaseIndex}
          curriculum={curriculum}
          currentLessonId={currentLessonId}
          onBack={handleBackFromPhase}
          onModuleClick={handleModuleClick}
          onLessonClick={handleLessonClick}
        />
      );
    }
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
                onPhaseClick={handlePhaseClick}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contextual Sophia chat pane — hidden on small screens, side panel on lg+ */}
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
              <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading...</div>}>
                <ContextualSophiaPane
                  onDismiss={handleDismissSophia}
                  initialPrompt={sophiaPrompt}
                  context="learn"
                />
              </Suspense>
            </motion.div>

            {/* Desktop: side panel */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:block flex-shrink-0 border-l border-border/30 overflow-hidden"
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
