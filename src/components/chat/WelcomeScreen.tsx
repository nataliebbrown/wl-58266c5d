import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Heart, Compass } from 'lucide-react';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';
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
        <div className="chat-sophia-avatar rounded-full">
          <SophiaAvatar size="lg" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">
          {greeting}{userName ? `, ${userName}` : ''}
        </h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
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

          return (
            <motion.button
              key={topic.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              onClick={() => onSelectTopic(topic)}
              className={cn(
                "group flex items-start gap-4 p-5 rounded-xl text-left",
                "bg-card/50 backdrop-blur-sm",
                "border border-border/50",
                "hover:bg-card/80 hover:border-hl-green/30 hover:shadow-lg",
                "transition-all duration-200"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                "bg-hl-green/10 group-hover:bg-hl-green/20 transition-colors"
              )}>
                <Icon className="h-5 w-5 text-hl-green" />
              </div>
              <div>
                <h3 className="font-medium text-foreground group-hover:text-[#B85A3E] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
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
        className="text-sm text-muted-foreground/60 mt-8"
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
