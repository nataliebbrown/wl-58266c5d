import { CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { isLessonComplete, getCurrentModuleInfo } from '@/lib/curriculum/curriculumProgress';
import type { Curriculum } from '@/types/curriculum';
import { CurriculumProgressBar } from './CurriculumProgressBar';

interface LessonSidebarProps {
  curriculum: Curriculum;
  lessonId: string;
  onLessonClick: (id: string) => void;
  onOpenBible: () => void;
}

export function LessonSidebar({
  curriculum,
  lessonId,
  onLessonClick,
  onOpenBible,
}: LessonSidebarProps) {
  const moduleInfo = getCurrentModuleInfo(curriculum, lessonId);

  const completed = moduleInfo?.moduleProgress.completed ?? 0;
  const total = moduleInfo?.moduleProgress.total ?? 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Card 1: Module Progress */}
      {moduleInfo && (
        <div className="rounded-2xl border border-border/20 bg-white/40 dark:bg-wl-olive-300/8 p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {moduleInfo.moduleTitle}
            </h3>
            <p className="text-xs text-foreground/40">
              {moduleInfo.sectionTitle}
            </p>
          </div>

          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-hl-green">{percentage}</span>
              <span className="text-2xl font-bold text-hl-green">%</span>
            </div>
            <span className="text-xs text-foreground/40">
              {completed}/{total} lessons
            </span>
          </div>

          <CurriculumProgressBar percentage={percentage} height={6} />
        </div>
      )}

      {/* Card 2: Section Lesson List */}
      {moduleInfo && (
        <div className="rounded-2xl border border-border/20 bg-white/40 dark:bg-wl-olive-300/8 overflow-hidden">
          <div className="px-5 pt-4 pb-2">
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground/35">
              {moduleInfo.sectionTitle}
            </h4>
          </div>

          <div>
            {moduleInfo.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onLessonClick(lesson.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                  lesson.id === lessonId
                    ? 'bg-hl-green/10'
                    : 'hover:bg-foreground/[0.03]'
                }`}
              >
                <div className="flex-shrink-0">
                  {isLessonComplete(lesson.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-hl-green" />
                  ) : lesson.id === lessonId ? (
                    <div className="w-4 h-4 rounded-full border-2 border-hl-green" />
                  ) : (
                    <Circle className="w-4 h-4 text-foreground/20" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm leading-snug block truncate ${
                      lesson.id === lessonId
                        ? 'font-medium text-foreground'
                        : 'text-foreground/70'
                    }`}
                  >
                    {lesson.title}
                  </span>
                  {lesson.estimatedMinutes && (
                    <span className="text-xs text-foreground/30">
                      {lesson.estimatedMinutes} min
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card 3: Open Bible */}
      <button
        onClick={onOpenBible}
        className="w-full rounded-2xl border border-border/20 bg-white/40 dark:bg-wl-olive-300/8 p-4 text-left hover:bg-foreground/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-hl-green/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-hl-green" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground block">
              Open Bible
            </span>
            <span className="text-xs text-foreground/40">
              Read referenced scriptures
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
