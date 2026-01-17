import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const DAILY_SUGGESTIONS = [
  {
    heading: "Today's Formation Focus",
    suggestion: "Explore the theme of 'firstborn' in Romans 8:29 and how it connects to your spiritual identity",
    duration: "15-20 minute reflection",
  },
  {
    heading: "Today's Formation Focus",
    suggestion: "Reflect on how cultural context shapes your understanding of biblical hospitality",
    duration: "15-20 minute reflection",
  },
  {
    heading: "Today's Formation Focus",
    suggestion: "Consider the pattern of divine reversal in Scripture - when God chooses the unexpected",
    duration: "15-20 minute reflection",
  },
];

export function FormationFocusCard() {
  // Get a consistent daily suggestion based on the date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const dailySuggestion = DAILY_SUGGESTIONS[dayOfYear % DAILY_SUGGESTIONS.length];

  const handleStartExploration = () => {
    toast.info('Wisdom Guide coming in Phase 3!', {
      description: "We're building your AI-powered exploration experience.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card to-sage/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sage/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <CardContent className="relative p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-sage-dark" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-3 font-spiritual">
                {dailySuggestion.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-spiritual">
                {dailySuggestion.suggestion}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {dailySuggestion.duration}
                </div>
                <Button onClick={handleStartExploration} className="sm:ml-auto">
                  Start Exploration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
