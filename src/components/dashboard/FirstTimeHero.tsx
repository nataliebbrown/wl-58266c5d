import { motion } from 'framer-motion';
import { formatDate } from '@/types/dashboard';
import { PERSONA_SUBTITLES } from '@/types/firstTimeExperience';
import { SpiritualBackground } from '@/types/onboarding';

interface FirstTimeHeroProps {
  userName: string;
  spiritualBackground?: SpiritualBackground | null;
}

export function FirstTimeHero({ userName, spiritualBackground }: FirstTimeHeroProps) {
  const subtitle = spiritualBackground 
    ? PERSONA_SUBTITLES[spiritualBackground] 
    : "Your spiritual formation journey begins";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <p className="text-sm text-muted-foreground mb-2">{formatDate()}</p>
      <h1 className="text-3xl md:text-4xl font-spiritual font-semibold text-foreground mb-2">
        Welcome, {userName}!
      </h1>
      <p className="text-lg text-muted-foreground font-spiritual">
        {subtitle}
      </p>
    </motion.section>
  );
}
