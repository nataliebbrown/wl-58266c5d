import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface FirstTimeFormationFocusProps {
  spiritualBackground?: string | null;
  onActionTaken?: () => void;
}

interface PersonaSuggestion {
  title: string;
  description: string;
  buttonText: string;
}

const PERSONA_SUGGESTIONS: Record<string, PersonaSuggestion> = {
  'new-to-faith': {
    title: 'Begin with Your Questions',
    description: "You're new to faith, and that means you probably have questions. Start by having a conversation with Sophia about anything you're curious about—there are no wrong questions here.",
    buttonText: 'Ask Sophia Anything',
  },
  'veteran-believer': {
    title: 'Discover Something New',
    description: "After years of studying scripture, it's time to uncover patterns and connections you've never noticed. Let Sophia show you a biblical theme that will surprise you, even in passages you know well.",
    buttonText: 'Discover Hidden Patterns',
  },
  'ministry-leader': {
    title: 'Prepare with Purpose',
    description: "Ministry is demanding—let's make your preparation time more effective. Start by discussing your upcoming teaching, a pastoral challenge, or simply what's on your heart as a leader.",
    buttonText: 'Start Conversation',
  },
  'theology-student': {
    title: 'Explore with Depth',
    description: 'Academic study meets spiritual formation. Begin by exploring how biblical concepts translate across languages and cultures, or dive into a theological question you\'re wrestling with.',
    buttonText: 'Start Deep Dialogue',
  },
  'exploring-faith': {
    title: 'Explore Safely',
    description: 'Faith exploration takes courage, and this is a judgment-free space. Start by sharing what you\'re curious about, what confuses you, or what draws you to explore spiritual things.',
    buttonText: 'Begin Exploring',
  },
  default: {
    title: 'Begin Your Journey',
    description: 'Start a conversation with Sophia, your AI companion for spiritual formation. Ask questions, explore scripture, or simply share what\'s on your mind.',
    buttonText: 'Start Your First Conversation',
  },
};

export function FirstTimeFormationFocus({ spiritualBackground, onActionTaken }: FirstTimeFormationFocusProps) {
  const navigate = useNavigate();
  const suggestion = PERSONA_SUGGESTIONS[spiritualBackground || 'default'] || PERSONA_SUGGESTIONS.default;

  const handleStartConversation = () => {
    onActionTaken?.();
    navigate('/chat');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full max-w-4xl mx-auto"
      data-tour="formation-focus"
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-card to-primary/10 first-time-focus-card">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sage/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-ochre/5 rounded-full" />
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              '0 0 0 0 hsl(var(--primary) / 0)',
              '0 0 20px 4px hsl(var(--primary) / 0.15)',
              '0 0 0 0 hsl(var(--primary) / 0)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <CardContent className="relative p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-sage/20 flex items-center justify-center mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <BookOpen className="w-8 h-8 text-sage-dark" />
            </motion.div>
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Today's Formation Focus
            </motion.div>
            
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4 font-spiritual"
            >
              {suggestion.title}
            </motion.h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground leading-relaxed mb-6 font-spiritual text-lg max-w-2xl"
            >
              {suggestion.description}
            </motion.p>
            
            {/* Duration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Clock className="w-4 h-4" />
              15-20 minute exploration
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleStartConversation} 
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                {suggestion.buttonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
