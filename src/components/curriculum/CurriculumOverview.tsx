import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, PlayCircle } from 'lucide-react';
import { getQuizData } from '@/lib/onboardingState';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import {
  getProgressPercentage,
  getCurrentOrFirstLessonId,
  findLessonPosition,
} from '@/lib/curriculum/curriculumProgress';
import { CurriculumProgressBar } from './CurriculumProgressBar';
import { PhaseSection } from './PhaseSection';
import { LessonView } from './LessonView';

export function CurriculumOverview() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const quizData = getQuizData();
  const curriculum = useMemo(() => getCurriculumForUser(quizData), [quizData]);
  const percentage = getProgressPercentage(curriculum);
  const currentLessonId = getCurrentOrFirstLessonId(curriculum);

  // Determine which phase the current lesson is in (for auto-expand)
  const currentPosition = currentLessonId
    ? findLessonPosition(curriculum, currentLessonId)
    : null;

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  const handleBackToOverview = () => {
    setActiveLessonId(null);
  };

  const handleContinue = () => {
    if (currentLessonId) {
      setActiveLessonId(currentLessonId);
    }
  };

  // Lesson view mode
  if (activeLessonId) {
    return (
      <LessonView
        curriculum={curriculum}
        lessonId={activeLessonId}
        onBack={handleBackToOverview}
        onNavigate={setActiveLessonId}
      />
    );
  }

  // Overview mode
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-[#87A96B]" />
            <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
              Your Learning Path
            </span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3 leading-tight">
            {curriculum.title}
          </h1>

          <p className="text-base text-foreground/60 leading-relaxed mb-4">
            {curriculum.personaIntro}
          </p>

          <p className="text-sm text-foreground/40 leading-relaxed mb-6 italic">
            {curriculum.learningApproach}
          </p>

          {/* Progress + CTA */}
          <div className="flex items-center gap-4">
            <CurriculumProgressBar
              percentage={percentage}
              showLabel
              height={8}
              className="flex-1"
            />
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#87A96B] text-white text-sm font-medium hover:bg-[#7a9a60] transition-colors flex-shrink-0"
            >
              <PlayCircle className="w-4 h-4" />
              {percentage > 0 ? 'Continue' : 'Start'}
            </button>
          </div>
        </motion.div>

        {/* Phase list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-4 pb-24"
        >
          {curriculum.phases.map((phase, i) => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              phaseIndex={i}
              curriculum={curriculum}
              currentLessonId={currentLessonId}
              defaultExpanded={currentPosition?.phaseIndex === i}
              onLessonClick={handleLessonClick}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
