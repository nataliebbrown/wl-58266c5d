import { motion } from 'framer-motion';
import type { Module, Curriculum } from '@/types/curriculum';
import { getModuleProgress } from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { LessonRow } from './LessonRow';

interface ModuleCardProps {
  module: Module;
  phaseId: string;
  curriculum: Curriculum;
  currentLessonId: string | null;
  onLessonClick: (lessonId: string) => void;
}

export function ModuleCard({
  module,
  phaseId,
  curriculum,
  currentLessonId,
  onLessonClick,
}: ModuleCardProps) {
  const progress = getModuleProgress(curriculum, phaseId, module.id);
  const isComplete = progress.total > 0 && progress.completed === progress.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/20 overflow-hidden"
      style={{
        background: isComplete
          ? 'rgba(135, 169, 107, 0.04)'
          : 'rgba(255, 255, 255, 0.4)',
      }}
    >
      {/* Module header */}
      <div className="px-5 py-4 border-b border-border/10">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-foreground">{module.title}</h4>
          <span className="text-xs text-foreground/40">
            {progress.completed}/{progress.total}
          </span>
        </div>
        {module.description && (
          <p className="text-xs text-foreground/50 mb-2 leading-relaxed">
            {module.description}
          </p>
        )}
        <CurriculumProgressBar
          percentage={progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}
          height={4}
        />
      </div>

      {/* Sections and lessons */}
      <div className="py-1">
        {module.sections.map((section) => (
          <div key={section.id}>
            {/* Show section title if there are multiple sections in the module */}
            {module.sections.length > 1 && (
              <div className="px-5 pt-3 pb-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/35">
                  {section.title}
                </p>
              </div>
            )}
            <div className="space-y-0.5 px-1.5">
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
        ))}
      </div>

      {/* Reflective practices */}
      {module.reflectivePractices && module.reflectivePractices.length > 0 && (
        <div className="px-5 py-3 border-t border-border/10 bg-foreground/[0.02]">
          <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/35 mb-2">
            Reflective Practices
          </p>
          <ul className="space-y-1">
            {module.reflectivePractices.map((practice, i) => (
              <li key={i} className="text-xs text-foreground/50 flex items-start gap-1.5">
                <span className="text-foreground/20 mt-0.5">&#x2022;</span>
                {practice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
