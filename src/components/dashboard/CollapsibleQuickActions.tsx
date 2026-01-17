import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Network, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const actions = [
  {
    icon: MessageCircle,
    title: 'Continue Conversation',
    subtitle: 'Ask questions, explore deeper',
    cta: 'Start Chat',
    message: 'Wisdom Guide coming in Phase 3!',
  },
  {
    icon: Network,
    title: 'Discover Connections',
    subtitle: 'Find biblical themes & patterns',
    cta: 'Explore',
    message: 'Pattern Discovery coming in Phase 6!',
  },
  {
    icon: Clock,
    title: 'Step into History',
    subtitle: 'Experience biblical times',
    cta: 'Immerse',
    message: 'Historical Immersion coming in Phase 6!',
  },
  {
    icon: Users,
    title: 'Connect with Others',
    subtitle: 'Group discussions & shared growth',
    cta: 'Join',
    message: 'Community features coming in Phase 6!',
  },
];

export function CollapsibleQuickActions() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-6"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
      >
        <h3 className="text-base font-medium text-muted-foreground">
          More Ways to Explore
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {actions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-muted/20 border-muted hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <action.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-muted-foreground">
                            {action.title}
                          </h4>
                          <p className="text-xs text-muted-foreground/70 mb-2">
                            {action.subtitle}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-3 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => toast.info(action.message)}
                          >
                            {action.cta} →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
