import { motion } from 'framer-motion';
import { formatDate, getTimeBasedGreeting } from '@/types/dashboard';

interface FirstTimeHeroSectionProps {
  userName: string;
}

export function FirstTimeHeroSection({ userName }: FirstTimeHeroSectionProps) {
  const greeting = getTimeBasedGreeting();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
      data-tour="hero"
    >
      <p className="text-sm text-muted-foreground mb-2">{formatDate()}</p>
      <h1 className="text-3xl md:text-4xl font-spiritual font-semibold text-foreground mb-2">
        {greeting}, {userName}!
      </h1>
      <p className="text-lg text-muted-foreground font-spiritual">
        Welcome to your spiritual formation journey
      </p>
    </motion.section>
  );
}
