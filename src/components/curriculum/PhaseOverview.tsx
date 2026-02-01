import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  BarChart3,
  Layers,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import type { Curriculum, Phase } from '@/types/curriculum';
import {
  getPhaseProgress,
  getPhaseLessonCount,
  getPhaseTotalMinutes,
  getCurriculumProgress,
} from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { ModuleCard } from './ModuleCard';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// ============ Helpers ============

function formatDuration(minutes: number): string {
  if (minutes === 0) return 'Self-paced';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function getFirstIncompleteLessonInPhase(phase: Phase): string | null {
  const progress = getCurriculumProgress();
  for (const mod of phase.modules) {
    for (const section of mod.sections) {
      for (const lesson of section.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return lesson.id;
        }
      }
    }
  }
  // All complete — return last lesson
  const allLessons = phase.modules.flatMap(m => m.sections.flatMap(s => s.lessons));
  return allLessons.length > 0 ? allLessons[allLessons.length - 1].id : null;
}

// ============ Sub-components ============

function CourseDetailCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/20 bg-white/40 dark:bg-wl-olive-300/8 p-4">
      <span className="text-xs text-foreground/40 block mb-1.5">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-foreground/40">{icon}</span>
        <span className="text-base font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}

// ============ Main Component ============

interface PhaseOverviewProps {
  phase: Phase;
  phaseIndex: number;
  curriculum: Curriculum;
  currentLessonId: string | null;
  onBack: () => void;
  onModuleClick: (moduleId: string) => void;
  onLessonClick: (lessonId: string) => void;
}

export function PhaseOverview({
  phase,
  phaseIndex,
  curriculum,
  currentLessonId,
  onBack,
  onModuleClick,
  onLessonClick,
}: PhaseOverviewProps) {
  const progress = getPhaseProgress(curriculum, phase.id);
  const percentage =
    progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const lessonCount = getPhaseLessonCount(phase);
  const totalMinutes = getPhaseTotalMinutes(phase);
  const overview = phase.overview;

  const handleStartContinue = () => {
    const lessonId = getFirstIncompleteLessonInPhase(phase);
    if (lessonId) onLessonClick(lessonId);
  };

  return (
    <motion.div
      className="h-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Back + breadcrumb */}
        <div className="mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to curriculum
          </button>
          <div className="text-xs text-foreground/35">
            <button onClick={onBack} className="hover:text-foreground/60 transition-colors">
              {curriculum.title}
            </button>
            <span className="mx-1.5">&rsaquo;</span>
            <span>Phase {phaseIndex + 1}: {phase.title}</span>
          </div>
        </div>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-wl-sage-200 via-wl-parchment-100 to-wl-linen dark:from-wl-olive-700 dark:via-wl-olive-600 dark:to-wl-earth-700"
        >
          <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-5">
            <span className="text-xs font-medium uppercase tracking-wider text-foreground/40 mb-1">
              Phase {phaseIndex + 1}
              {phase.duration ? ` \u00B7 ${phase.duration}` : ''}
            </span>
            <div className="flex items-end justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bodoni font-semibold text-foreground/90 dark:text-wl-parchment-200 leading-tight">
                {phase.title}
              </h1>
              <button
                onClick={handleStartContinue}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-hl-green text-white text-sm font-medium hover:bg-hl-green/80 transition-colors flex-shrink-0"
              >
                <PlayCircle className="w-4 h-4" />
                {progress.completed > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mt-4">
          <CurriculumProgressBar percentage={percentage} height={6} className="flex-1" />
          <span className="text-xs text-foreground/40 flex-shrink-0">
            {progress.completed}/{progress.total} lessons
          </span>
        </div>

        {/* Course details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <CourseDetailCard
            icon={<BookOpen className="w-4 h-4" />}
            label="Lessons"
            value={`${lessonCount}`}
          />
          <CourseDetailCard
            icon={<Clock className="w-4 h-4" />}
            label="Duration"
            value={totalMinutes > 0 ? formatDuration(totalMinutes) : 'Self-paced'}
          />
          <CourseDetailCard
            icon={<BarChart3 className="w-4 h-4" />}
            label="Skill Level"
            value={overview?.skillLevel ?? 'All Levels'}
          />
          <CourseDetailCard
            icon={<Layers className="w-4 h-4" />}
            label="Modules"
            value={`${phase.modules.length}`}
          />
        </div>

        {/* About this phase */}
        <div className="mt-8">
          <h2 className="text-lg font-bodoni font-semibold text-foreground mb-3">
            About This Phase
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed whitespace-pre-line">
            {overview?.overviewDescription ?? phase.description}
          </p>
        </div>

        {/* What to expect */}
        {overview?.expectations && overview.expectations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bodoni font-semibold text-foreground mb-3">
              What to Expect
            </h2>
            <div className="space-y-2.5">
              {overview.expectations.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hl-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modules */}
        <div className="mt-8">
          <h2 className="text-lg font-bodoni font-semibold text-foreground mb-4">Modules</h2>
          <div className="space-y-4">
            {phase.modules.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                phaseId={phase.id}
                curriculum={curriculum}
                currentLessonId={currentLessonId}
                onModuleClick={onModuleClick}
                onLessonClick={onLessonClick}
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        {overview?.faq && overview.faq.length > 0 && (
          <div className="mt-8 pb-24">
            <h2 className="text-lg font-bodoni font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {overview.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/20 rounded-2xl overflow-hidden bg-white/30 dark:bg-wl-olive-300/8 px-5 !border-b"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/60 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </motion.div>
  );
}
