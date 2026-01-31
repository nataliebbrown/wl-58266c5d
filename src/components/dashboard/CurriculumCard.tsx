import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ChevronRight, Circle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { getQuizData } from '@/lib/onboardingState';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import {
  getProgressPercentage,
  getCurrentOrFirstLessonId,
  findLessonPosition,
  getTotalLessonCount,
} from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from '@/components/curriculum/CurriculumProgressBar';
import type { Curriculum, Lesson } from '@/types/curriculum';

// ============ Persona-Aware Headlines ============

const HEADLINES: Record<string, string> = {
  new_to_faith: 'Your First Steps in Faith',
  believer_going_deeper: 'Deepen Your Walk',
  pastor_leader: 'Strengthen Your Ministry',
  seminary_student: 'Your Theological Journey',
  exploring_faith: 'Explore at Your Own Pace',
};

// ============ Season-Aware CTA Text ============

const CTA_TEXT: Record<string, string> = {
  deeper_relationship: 'Begin the Journey',
  questions_doubts: 'Start Exploring',
  difficult_situation: 'Find Your Path',
  ministry_preparation: 'Dive In',
  understand_bible: 'Open the Word',
  spiritual_growth: 'Take the First Step',
};

// ============ Helpers ============

function getFirstLessons(curriculum: Curriculum, count: number): Lesson[] {
  const lessons: Lesson[] = [];
  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      for (const section of mod.sections) {
        for (const lesson of section.lessons) {
          lessons.push(lesson);
          if (lessons.length >= count) return lessons;
        }
      }
    }
  }
  return lessons;
}

// ============ Component ============

export function CurriculumCard() {
  const navigate = useNavigate();
  const quizData = getQuizData();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const percentage = getProgressPercentage(curriculum);
  const hasStarted = percentage > 0;
  const currentLessonId = getCurrentOrFirstLessonId(curriculum);
  const position = currentLessonId
    ? findLessonPosition(curriculum, currentLessonId)
    : null;

  const currentPhase = position ? curriculum.phases[position.phaseIndex] : curriculum.phases[0];
  const currentModule = position
    ? currentPhase?.modules[position.moduleIndex]
    : currentPhase?.modules[0];
  const currentLesson = position
    ? currentModule?.sections[position.sectionIndex]?.lessons[position.lessonIndex]
    : null;

  const totalLessons = getTotalLessonCount(curriculum);
  const previewLessons = useMemo(() => getFirstLessons(curriculum, 3), [curriculum]);

  const headline = HEADLINES[quizData.spiritualBackground || ''] || 'Your Learning Path';
  const ctaLabel = hasStarted
    ? 'Continue Learning'
    : CTA_TEXT[quizData.currentSeason || ''] || 'Begin Your Journey';

  const openLearn = () => navigate('/learn');

  // ===== Active state (has progress) =====
  if (hasStarted) {
    return (
      <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
        {/* Header label */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-wl-olive/10 dark:bg-wl-olive-300/10 flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4 text-wl-olive/70 dark:text-wl-olive-300/70" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40 dark:text-wl-olive-300">
              Your Learning Path
            </p>
          </div>
          <ExpandButton onClick={() => openLearn()} />
        </div>

        {/* Phase + Module headline */}
        <h3 className="text-lg font-semibold text-foreground dark:text-wl-olive-200 leading-tight px-5 mt-2 mb-3">
          {currentModule?.title || 'Get Started'}{' '}
          <span className="text-foreground/40 font-normal text-sm">
            {currentPhase?.title}
          </span>
        </h3>

        {/* Progress section */}
        <div className="mx-5 rounded-xl px-4 py-3 bg-wl-stone-50 dark:bg-wl-earth-800">
          <CurriculumProgressBar percentage={percentage} height={6} className="mb-2" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/50">{percentage}% complete</span>
            <span className="text-[10px] text-foreground/30 uppercase tracking-wider font-medium">
              {totalLessons} lessons
            </span>
          </div>
        </div>

        {/* Next lesson */}
        {currentLesson && (
          <div className="px-5 pt-4 pb-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40 mb-1 px-2">
              Up Next
            </p>
            <button
              onClick={() => openLearn()}
              className="flex items-center gap-3 w-full text-left py-3 px-2 -mx-2 rounded-xl hover:bg-foreground/[0.03] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-wl-olive/10 dark:bg-wl-olive-300/10 flex items-center justify-center flex-shrink-0">
                <Compass className="w-4 h-4 text-wl-olive/70 dark:text-wl-olive-300/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/80 truncate">
                  {currentLesson.title}
                </p>
                {currentLesson.description && (
                  <p className="text-[11px] text-foreground/40 truncate">
                    {currentLesson.description}
                  </p>
                )}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors flex-shrink-0" />
            </button>
          </div>
        )}

        {/* Resume CTA */}
        <div className="px-5 pt-2 pb-4 mt-auto">
          <button
            onClick={() => openLearn()}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-wl-olive dark:text-wl-olive-300 border border-wl-olive/25 dark:border-wl-olive-300/25 hover:bg-wl-olive/10 dark:hover:bg-wl-olive-300/10 hover:border-wl-olive/40 dark:hover:border-wl-olive-300/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-all duration-200"
          >
            {ctaLabel}
          </button>
        </div>
      </GlassCard>
    );
  }

  // ===== Default state (first-time visitor) — "Ad" style =====
  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10">
        <ExpandButton onClick={() => openLearn()} />
      </div>

      {/* Hero header */}
      <div className="px-5 pt-8 pb-4 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-wl-olive/10 dark:bg-wl-olive-300/10 flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 text-wl-olive/60 dark:text-wl-olive-300/60" />
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 dark:text-wl-olive-300">
          Curriculum
        </p>
        <h3 className="text-2xl leading-snug mt-2 text-wl-earth dark:text-wl-olive-200">
          {headline}
        </h3>
        <p className="text-sm text-foreground/40 mt-1">
          Start learning at your own pace
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* Lesson count + self-paced */}
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-wl-olive/60 dark:text-wl-olive-300/60 bg-wl-olive/10 dark:bg-wl-olive-300/10 px-2.5 py-0.5 rounded-full">
            {totalLessons} lessons
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/30">
            Self-paced
          </span>
        </div>

        {/* Lesson preview cards */}
        {previewLessons.map((lesson, i) => (
          <button
            key={lesson.id}
            onClick={() => openLearn()}
            className="w-full rounded-xl text-left px-5 py-5 border border-wl-olive/15 dark:border-wl-olive-300/15 hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35 hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <Circle
                className="w-4 h-4 text-wl-olive/60 dark:text-wl-olive-300/60 flex-shrink-0"
                strokeWidth={2}
                style={{ opacity: 1 - i * 0.2 }}
              />
              <span className="text-base font-semibold text-foreground/85">
                {lesson.title}
              </span>
              {i === 0 && (
                <span className="ml-auto text-[9px] font-medium uppercase tracking-wider text-foreground/30 flex-shrink-0">
                  Start Here
                </span>
              )}
            </div>
            {lesson.description && (
              <p className="text-[13px] leading-relaxed text-foreground/55 line-clamp-2">
                {lesson.description}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-3 border-t border-foreground/[0.05]">
        <button
          onClick={() => openLearn()}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white dark:text-wl-olive-900 bg-wl-olive dark:bg-wl-olive-300 hover:bg-wl-olive-600 dark:hover:bg-wl-olive-200 transition-all duration-200 shadow-sm"
        >
          {ctaLabel}
        </button>
      </div>
    </GlassCard>
  );
}
