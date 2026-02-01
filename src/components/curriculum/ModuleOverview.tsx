import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, PlayCircle } from 'lucide-react';
import type { Module, Curriculum } from '@/types/curriculum';
import { getModuleProgress, getCurriculumProgress } from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { LessonRow } from './LessonRow';

interface ModuleOverviewProps {
  module: Module;
  moduleIndex: number;
  phaseId: string;
  phaseTitle: string;
  phaseIndex: number;
  curriculum: Curriculum;
  currentLessonId: string | null;
  onBack: () => void;
  onBackToOverview: () => void;
  onLessonClick: (lessonId: string) => void;
}

function getFirstIncompleteLessonInModule(module: Module): string | null {
  const progress = getCurriculumProgress();
  for (const section of module.sections) {
    for (const lesson of section.lessons) {
      if (!progress.completedLessons.includes(lesson.id)) {
        return lesson.id;
      }
    }
  }
  // All complete — return last lesson
  const allLessons = module.sections.flatMap(s => s.lessons);
  return allLessons.length > 0 ? allLessons[allLessons.length - 1].id : null;
}

function getModuleTotalMinutes(module: Module): number {
  let total = 0;
  for (const section of module.sections) {
    for (const lesson of section.lessons) {
      total += lesson.estimatedMinutes ?? 0;
    }
  }
  return total;
}

function formatDuration(minutes: number): string {
  if (minutes === 0) return 'Self-paced';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function ModuleOverview({
  module,
  moduleIndex,
  phaseId,
  phaseTitle,
  phaseIndex,
  curriculum,
  currentLessonId,
  onBack,
  onBackToOverview,
  onLessonClick,
}: ModuleOverviewProps) {
  const progress = getModuleProgress(curriculum, phaseId, module.id);
  const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const totalMinutes = getModuleTotalMinutes(module);
  const lessonCount = module.sections.reduce((sum, s) => sum + s.lessons.length, 0);

  const handleStartContinue = () => {
    const lessonId = getFirstIncompleteLessonInModule(module);
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
            Back
          </button>
          <div className="text-xs text-foreground/35">
            <button onClick={onBackToOverview} className="hover:text-foreground/60 transition-colors">
              {curriculum.title}
            </button>
            <span className="mx-1.5">&rsaquo;</span>
            <button onClick={onBack} className="hover:text-foreground/60 transition-colors">
              Phase {phaseIndex + 1}: {phaseTitle}
            </button>
            <span className="mx-1.5">&rsaquo;</span>
            <span>{module.title}</span>
          </div>
        </div>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative h-32 sm:h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-wl-sage-200/80 via-wl-parchment-100/80 to-wl-linen dark:from-wl-olive-700 dark:via-wl-olive-600 dark:to-wl-earth-700"
        >
          <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-5">
            <span className="text-xs font-medium uppercase tracking-wider text-foreground/40 mb-1">
              Module {moduleIndex + 1}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bodoni font-semibold text-foreground/90 dark:text-wl-parchment-200 leading-tight">
              {module.title}
            </h1>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mt-4">
          <CurriculumProgressBar percentage={percentage} height={6} className="flex-1" />
          <span className="text-xs text-foreground/40 flex-shrink-0">
            {progress.completed}/{progress.total} lessons
          </span>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-4 mt-4 text-xs text-foreground/40">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lessonCount} lesson{lessonCount !== 1 ? 's' : ''}</span>
          </div>
          {totalMinutes > 0 && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(totalMinutes)}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {module.description && (
          <div className="mt-6">
            <p className="text-sm text-foreground/60 leading-relaxed">
              {module.description}
            </p>
          </div>
        )}

        {/* Start / Continue CTA */}
        <div className="mt-6">
          <button
            onClick={handleStartContinue}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-hl-green text-white text-sm font-medium hover:bg-hl-green/80 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            {progress.completed > 0 ? 'Continue' : 'Start'}
          </button>
        </div>

        {/* Sections and lessons */}
        <div className="mt-8 pb-24">
          <h2 className="text-lg font-bodoni font-semibold text-foreground mb-4">Lessons</h2>
          {module.sections.map((section) => (
            <div key={section.id} className="mb-4">
              {module.sections.length > 1 && (
                <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/35 px-1 mb-2">
                  {section.title}
                </p>
              )}
              <div className="rounded-2xl border border-border/20 overflow-hidden bg-white/40 dark:bg-wl-olive-300/8">
                <div className="space-y-0.5 px-2 sm:px-3 py-1">
                  {section.lessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      isCurrent={lesson.id === currentLessonId}
                      onClick={() => onLessonClick(lesson.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
