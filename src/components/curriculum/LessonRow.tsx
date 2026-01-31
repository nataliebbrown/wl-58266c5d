import { motion } from 'framer-motion';
import { CheckCircle2, Circle, BookOpen } from 'lucide-react';
import type { Lesson } from '@/types/curriculum';
import { isLessonComplete } from '@/lib/curriculum/curriculumProgress';

interface LessonRowProps {
  lesson: Lesson;
  isCurrent: boolean;
  onClick: () => void;
}

export function LessonRow({ lesson, isCurrent, onClick }: LessonRowProps) {
  const completed = isLessonComplete(lesson.id);
  const hasScripture = lesson.scriptureRefs && lesson.scriptureRefs.length > 0;

  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl transition-colors ${
        isCurrent
          ? 'bg-[#87A96B]/10 ring-1 ring-[#87A96B]/30'
          : 'hover:bg-foreground/[0.03]'
      }`}
      whileTap={{ scale: 0.99 }}
    >
      {/* Completion indicator */}
      <div className="flex-shrink-0 mt-0.5">
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-[#87A96B]" />
        ) : (
          <Circle className="w-5 h-5 text-foreground/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium leading-snug ${
              completed ? 'text-foreground/50' : 'text-foreground'
            }`}
          >
            {lesson.title}
          </span>
          {hasScripture && (
            <BookOpen className="w-3.5 h-3.5 text-[#87A96B]/60 flex-shrink-0" />
          )}
        </div>
        {lesson.description && (
          <p className="text-xs text-foreground/40 mt-0.5 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>
        )}
      </div>
    </motion.button>
  );
}
