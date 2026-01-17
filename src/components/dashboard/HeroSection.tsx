import { motion } from 'framer-motion';
import { getTimeBasedGreeting, formatDate, PERSONA_GREETINGS } from '@/types/dashboard';

interface HeroSectionProps {
  userName: string;
  spiritualBackground?: string | null;
}

export function HeroSection({ userName, spiritualBackground }: HeroSectionProps) {
  const greeting = getTimeBasedGreeting();
  const personalizedSubtitle = spiritualBackground 
    ? PERSONA_GREETINGS[spiritualBackground] || PERSONA_GREETINGS.default
    : PERSONA_GREETINGS.default;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <p className="text-sm text-muted-foreground mb-2">{formatDate()}</p>
      <h1 className="text-3xl md:text-4xl font-spiritual font-semibold text-foreground mb-2">
        {greeting}, {userName}
      </h1>
      <p className="text-lg text-muted-foreground font-spiritual">
        {personalizedSubtitle}
      </p>
    </motion.section>
  );
}
