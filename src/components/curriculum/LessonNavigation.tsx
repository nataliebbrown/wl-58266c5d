import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

interface LessonNavigationProps {
  prevId: string | null;
  nextId: string | null;
  completed: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleComplete: () => void;
}

export function LessonNavigation({
  prevId,
  nextId,
  completed,
  onPrev,
  onNext,
  onToggleComplete,
}: LessonNavigationProps) {
  return (
    <div className="space-y-3">
      {/* Completion toggle */}
      <button
        onClick={onToggleComplete}
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

      {/* Previous / Next row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!prevId}
          className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!nextId}
          className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
