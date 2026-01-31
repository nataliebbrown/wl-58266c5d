import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import type { Phase, Curriculum } from '@/types/curriculum';
import { getPhaseProgress } from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { ModuleCard } from './ModuleCard';

interface PhaseSectionProps {
  phase: Phase;
  phaseIndex: number;
  curriculum: Curriculum;
  currentLessonId: string | null;
  defaultExpanded?: boolean;
  onLessonClick: (lessonId: string) => void;
}

export function PhaseSection({
  phase,
  phaseIndex,
  curriculum,
  currentLessonId,
  defaultExpanded = false,
  onLessonClick,
}: PhaseSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const progress = getPhaseProgress(curriculum, phase.id);
  const isComplete = progress.total > 0 && progress.completed === progress.total;
  const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <div className="border border-border/20 rounded-2xl overflow-hidden bg-white/30">
      {/* Phase header — clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-foreground/[0.02] transition-colors"
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
              {phase.title}
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

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-foreground/30" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {phase.description && (
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {phase.description}
                </p>
              )}
              {phase.modules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  phaseId={phase.id}
                  curriculum={curriculum}
                  currentLessonId={currentLessonId}
                  onLessonClick={onLessonClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
