import { motion } from 'framer-motion';
import { ProgressIndicator } from '../ProgressIndicator';
import { SelectionCard } from '../SelectionCard';
import { NavigationButtons } from '../NavigationButtons';
import { CurrentSeason } from '@/types/onboarding';
import { Heart, HelpCircle, CloudRain, Compass, BookOpen, TrendingUp } from 'lucide-react';

interface CurrentSeasonQuizProps {
  selected: CurrentSeason | null;
  onSelect: (value: CurrentSeason) => void;
  onBack: () => void;
  onContinue: () => void;
}

const options: Array<{
  value: CurrentSeason;
  icon: typeof Heart;
  title: string;
  description: string;
}> = [
  {
    value: 'deeper_relationship',
    icon: Heart,
    title: "Seeking deeper relationship with God",
    description: "Wanting to know Him more intimately",
  },
  {
    value: 'questions_doubts',
    icon: HelpCircle,
    title: "Working through questions or doubts",
    description: "Honest exploration of faith",
  },
  {
    value: 'difficult_situation',
    icon: CloudRain,
    title: "Dealing with a difficult life situation",
    description: "Finding comfort and guidance",
  },
  {
    value: 'ministry_preparation',
    icon: Compass,
    title: "Preparing for ministry or leadership",
    description: "Getting equipped to serve",
  },
  {
    value: 'understand_bible',
    icon: BookOpen,
    title: "Wanting to understand the Bible better",
    description: "Growing in biblical knowledge",
  },
  {
    value: 'spiritual_growth',
    icon: TrendingUp,
    title: "Looking for spiritual growth and formation",
    description: "Becoming more like Christ",
  },
];

export function CurrentSeasonQuiz({
  selected,
  onSelect,
  onBack,
  onContinue,
}: CurrentSeasonQuizProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <ProgressIndicator currentStep={4} totalSteps={4} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-spiritual font-semibold text-center text-foreground mb-2"
        >
          What brings you to explore deeper spiritual formation right now?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground text-center mb-8"
        >
          This helps us personalize your experience
        </motion.p>

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
