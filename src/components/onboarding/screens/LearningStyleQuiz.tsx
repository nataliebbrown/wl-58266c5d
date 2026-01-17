import { motion } from 'framer-motion';
import { ProgressIndicator } from '../ProgressIndicator';
import { SelectionCard } from '../SelectionCard';
import { NavigationButtons } from '../NavigationButtons';
import { LearningStyle } from '@/types/onboarding';
import { BookOpen, Eye, MessageCircle, Hand, GitBranch } from 'lucide-react';

interface LearningStyleQuizProps {
  selected: LearningStyle | null;
  onSelect: (value: LearningStyle) => void;
  onBack: () => void;
  onContinue: () => void;
}

const options: Array<{
  value: LearningStyle;
  icon: typeof BookOpen;
  title: string;
  description: string;
}> = [
  {
    value: 'reading_reflection',
    icon: BookOpen,
    title: "I learn best by reading and reflection",
    description: "Deep study and contemplation",
  },
  {
    value: 'visual_learner',
    icon: Eye,
    title: "I'm a visual learner who loves maps, images, and diagrams",
    description: "Pictures help me understand",
  },
  {
    value: 'conversation_discussion',
    icon: MessageCircle,
    title: "I learn through conversation and discussion",
    description: "Talking it through with others",
  },
  {
    value: 'hands_on_interactive',
    icon: Hand,
    title: "I prefer hands-on, interactive experiences",
    description: "Learning by doing and exploring",
  },
  {
    value: 'connections_patterns',
    icon: GitBranch,
    title: "I like discovering connections and patterns",
    description: "Seeing how everything fits together",
  },
];

export function LearningStyleQuiz({
  selected,
  onSelect,
  onBack,
  onContinue,
}: LearningStyleQuizProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <ProgressIndicator currentStep={2} totalSteps={4} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-spiritual font-semibold text-center text-foreground mb-8"
        >
          How do you learn best?
        </motion.h2>

        <div className="flex-1 space-y-3">
          {options.map((option, index) => (
            <SelectionCard
              key={option.value}
              icon={option.icon}
              title={option.title}
              description={option.description}
              isSelected={selected === option.value}
              onSelect={() => onSelect(option.value)}
              index={index}
            />
          ))}
        </div>

        <NavigationButtons
          onBack={onBack}
          onContinue={onContinue}
          canContinue={selected !== null}
        />
      </div>
    </div>
  );
}
