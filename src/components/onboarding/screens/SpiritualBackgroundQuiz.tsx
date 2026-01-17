import { motion } from 'framer-motion';
import { ProgressIndicator } from '../ProgressIndicator';
import { SelectionCard } from '../SelectionCard';
import { NavigationButtons } from '../NavigationButtons';
import { SpiritualBackground } from '@/types/onboarding';
import { Sprout, Heart, Users, GraduationCap, HelpCircle } from 'lucide-react';

interface SpiritualBackgroundQuizProps {
  selected: SpiritualBackground | null;
  onSelect: (value: SpiritualBackground) => void;
  onBack: () => void;
  onContinue: () => void;
}

const options: Array<{
  value: SpiritualBackground;
  icon: typeof Sprout;
  title: string;
  description: string;
}> = [
  {
    value: 'new_to_faith',
    icon: Sprout,
    title: "I'm new to faith and the Bible",
    description: "Just beginning to explore Christianity and Scripture",
  },
  {
    value: 'believer_going_deeper',
    icon: Heart,
    title: "I've been a believer for years but want to go deeper",
    description: "Looking to grow beyond the basics",
  },
  {
    value: 'pastor_leader',
    icon: Users,
    title: "I'm a pastor/ministry leader looking for better tools",
    description: "Serving others and need robust resources",
  },
  {
    value: 'seminary_student',
    icon: GraduationCap,
    title: "I'm studying theology or in seminary",
    description: "Academic pursuit of biblical knowledge",
  },
  {
    value: 'exploring_faith',
    icon: HelpCircle,
    title: "I'm exploring faith and have questions",
    description: "Curious and seeking answers",
  },
];

export function SpiritualBackgroundQuiz({
  selected,
  onSelect,
  onBack,
  onContinue,
}: SpiritualBackgroundQuizProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <ProgressIndicator currentStep={2} totalSteps={5} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-spiritual font-semibold text-center text-foreground mb-8"
        >
          Where are you in your spiritual journey?
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
