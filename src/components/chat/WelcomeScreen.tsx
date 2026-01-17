import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Heart, Compass } from 'lucide-react';
import { SophiaAvatar } from '@/components/onboarding-overlay/SophiaAvatar';
import { SuggestedTopic } from '@/types/chat';
import { cn } from '@/lib/utils';

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

const CATEGORY_COLORS = {
  daily: 'text-primary',
  exploration: 'text-secondary',
  growth: 'text-ochre',
  study: 'text-accent'
};

export function WelcomeScreen({ userName, suggestedTopics, onSelectTopic }: WelcomeScreenProps) {
  const greeting = getTimeBasedGreeting();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <SophiaAvatar size="lg" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-2xl md:text-3xl font-spiritual text-foreground mb-2">
          {greeting}{userName ? `, ${userName}` : ''}
        </h1>
        <p className="text-muted-foreground font-spiritual text-lg mb-8">
          I'm Sophia, your companion for exploring Scripture together. 
          What would you like to discover today?
        </p>
      </motion.div>

      {/* Suggested topics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full"
      >
        {suggestedTopics.map((topic, index) => {
          const Icon = CATEGORY_ICONS[topic.category] || Sparkles;
          const colorClass = CATEGORY_COLORS[topic.category] || 'text-primary';

          return (
            <motion.button
              key={topic.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              onClick={() => onSelectTopic(topic)}
              className={cn(
                "group flex items-start gap-4 p-5 rounded-xl",
                "bg-card border border-border",
                "hover:border-primary/30 hover:shadow-md",
                "transition-all duration-200 text-left"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0",
                "group-hover:bg-primary/10 transition-colors"
              )}>
                <Icon className={cn("h-5 w-5", colorClass)} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {topic.prompt}
                </p>
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
        className="text-sm text-muted-foreground mt-8"
      >
        Or simply type your question below...
      </motion.p>
    </div>
  );
}

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}