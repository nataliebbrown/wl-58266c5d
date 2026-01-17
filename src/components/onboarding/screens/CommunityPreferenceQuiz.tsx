import { motion } from 'framer-motion';
import { ProgressIndicator } from '../ProgressIndicator';
import { SelectionCard } from '../SelectionCard';
import { NavigationButtons } from '../NavigationButtons';
import { CommunityPreference } from '@/types/onboarding';
import { User, Users, Crown, Search, Blend } from 'lucide-react';

interface CommunityPreferenceQuizProps {
  selected: CommunityPreference | null;
  onSelect: (value: CommunityPreference) => void;
  onBack: () => void;
  onContinue: () => void;
}

const options: Array<{
  value: CommunityPreference;
  icon: typeof User;
  title: string;
  description: string;
}> = [
  {
    value: 'individual_study',
    icon: User,
    title: "I prefer individual, personal study",
    description: "Quiet time alone with God's Word",
  },
  {
    value: 'small_group',
    icon: Users,
    title: "I'm part of a small group or Bible study",
    description: "Growing together with others",
  },
  {
    value: 'group_leader',
    icon: Crown,
    title: "I lead groups and need facilitation help",
    description: "Guiding others in their journey",
  },
  {
    value: 'seeking_community',
    icon: Search,
    title: "I'm looking for spiritual community",
    description: "Wanting to connect with fellow believers",
  },
  {
    value: 'both_personal_group',
    icon: Blend,
    title: "I like both personal and group experiences",
    description: "A blend of individual and communal growth",
  },
];

export function CommunityPreferenceQuiz({
  selected,
  onSelect,
  onBack,
  onContinue,
}: CommunityPreferenceQuizProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <ProgressIndicator currentStep={3} totalSteps={4} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-spiritual font-semibold text-center text-foreground mb-8"
        >
          How do you prefer to grow spiritually?
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
