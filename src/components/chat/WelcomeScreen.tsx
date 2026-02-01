import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Heart, Compass } from 'lucide-react';
import { SuggestedTopic } from '@/types/chat';
import { cn } from '@/lib/utils';
import { useTimePeriod } from '@/lib/timeAwareness';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface WelcomeScreenProps {
  userName?: string;
  suggestedTopics: SuggestedTopic[];
  onSelectTopic: (topic: SuggestedTopic) => void;
}

const CATEGORY_ICONS = {
  daily: BookOpen,
  exploration: Compass,
  growth: Heart,
  study: Sparkles
};

export function WelcomeScreen({ userName, suggestedTopics, onSelectTopic }: WelcomeScreenProps) {
  const { config } = useTimePeriod();

  const salutation = (() => {
    switch (config.period) {
      case 'dawn': return 'Good Morning';
      case 'morning': return 'Good Morning';
      case 'midday': return 'Good Afternoon';
      case 'evening': return 'Good Evening';
      case 'night': return 'Good Evening';
    }
  })();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Suspense fallback={<div className="w-24 h-24 rounded-full bg-foreground/[0.04] animate-pulse" />}>
          <NoiseOrb
            size={100}
            preset="white"
            noiseIntensity={0.3}
            speed={0.6}
          />
        </Suspense>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-2xl md:text-3xl leading-snug text-foreground mb-2">
          {salutation}{userName ? `, ${userName}` : ''}
        </h1>
        <p className="text-sm text-foreground/40 italic mb-8 leading-relaxed">
          What would you like to discover today?
        </p>
      </motion.div>

      {/* Suggested topics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full"
      >
        {suggestedTopics.map((topic, index) => {
          const Icon = CATEGORY_ICONS[topic.category] || Sparkles;

          return (
            <motion.button
              key={topic.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              onClick={() => onSelectTopic(topic)}
              className={cn(
                "flex items-start gap-3.5 p-4 rounded-xl text-left",
                "border border-wl-olive/15 dark:border-wl-olive-300/15",
                "hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35",
                "hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5",
                "hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40",
                "transition-all duration-200"
              )}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-wl-olive/20 dark:border-wl-olive-300/20 flex items-center justify-center mt-0.5">
                <Icon className="h-4 w-4 text-wl-olive/50 dark:text-wl-olive-300/50" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[15px] leading-snug font-semibold text-foreground/85 dark:text-wl-olive-200">
                  {topic.title}
                </span>
                <span className="block text-[13px] leading-snug mt-0.5 text-foreground/45 dark:text-wl-olive-300/50 line-clamp-2">
                  {topic.prompt}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Prompt hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-sm text-muted-foreground/60 mt-8"
      >
        Or simply type your question below...
      </motion.p>
    </div>
  );
}
