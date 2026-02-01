import type { Exercise, ExerciseType } from '@/types/curriculum';

const typeMeta: Record<ExerciseType, { label: string; color: string }> = {
  reflection: { label: 'Reflection', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  translation: { label: 'Translation', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  analysis: { label: 'Analysis', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  application: { label: 'Application', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  discussion: { label: 'Discussion', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  research: { label: 'Research', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
};

interface ExercisesTabContentProps {
  exercises: Exercise[];
}

export function ExercisesTabContent({ exercises }: ExercisesTabContentProps) {
  if (exercises.length === 0) {
    return (
      <p className="text-sm text-foreground/40 py-6 text-center">
        No exercises for this lesson.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise, i) => {
        const meta = typeMeta[exercise.type];
        return (
          <div
            key={i}
            className="border border-border/20 rounded-xl p-4 hover:bg-foreground/[0.02] dark:hover:bg-wl-olive-300/5 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                >
                  {meta.label}
                </span>
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1.5">
                  {exercise.title}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed whitespace-pre-line">
                  {exercise.instructions}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
