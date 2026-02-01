import { motion } from 'framer-motion';
import type { Lesson } from '@/types/curriculum';

interface LessonHeroProps {
  lesson: Lesson;
}

export function LessonHero({ lesson }: LessonHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-wl-sage-200 via-wl-parchment-100 to-wl-linen dark:from-wl-olive-700 dark:via-wl-olive-600 dark:to-wl-earth-700"
    >
      {/* Title overlay */}
      <div className="relative z-10 flex items-end h-full px-6 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bodoni font-semibold text-foreground/90 dark:text-wl-parchment-200 leading-tight">
          {lesson.title}
        </h1>
      </div>
    </motion.div>
  );
}
