import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Phase, Curriculum } from '@/types/curriculum';
import { getPhaseProgress } from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';

interface PhaseSectionProps {
  phase: Phase;
  phaseIndex: number;
  curriculum: Curriculum;
  onPhaseClick: (phaseId: string) => void;
}

export function PhaseSection({
  phase,
  phaseIndex,
  curriculum,
  onPhaseClick,
}: PhaseSectionProps) {
  const progress = getPhaseProgress(curriculum, phase.id);
  const isComplete = progress.total > 0 && progress.completed === progress.total;
  const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <button
      onClick={() => onPhaseClick(phase.id)}
      className="w-full text-left border border-border/20 rounded-2xl overflow-hidden bg-white/30 dark:bg-wl-olive-300/8 px-5 py-4 flex items-center gap-4 hover:bg-foreground/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hl-green/40 focus-visible:ring-inset"
    >
      {/* Phase number */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
          isComplete
            ? 'bg-hl-green/20 text-hl-green'
            : 'bg-foreground/[0.06] text-foreground/50'
        }`}
      >
        {isComplete ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          phaseIndex + 1
        )}
      </div>

      {/* Title and progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground truncate">
            Phase {phaseIndex + 1}: {phase.title}
          </h3>
          {phase.duration && (
            <span className="text-xs text-foreground/35 flex-shrink-0">
              {phase.duration}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <CurriculumProgressBar percentage={percentage} height={3} className="flex-1" />
          <span className="text-xs text-foreground/40 flex-shrink-0">
            {progress.completed}/{progress.total}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight className="w-5 h-5 text-foreground/30 flex-shrink-0" />
    </button>
  );
}
