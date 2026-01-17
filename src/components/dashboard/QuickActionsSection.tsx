import { motion } from 'framer-motion';
import { MessageCircle, Network, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  colorClass: string;
  phase: string;
}

const quickActions: QuickAction[] = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Continue Conversation',
    subtitle: 'Ask questions, explore deeper',
    cta: 'Start Chat',
    colorClass: 'text-primary',
    phase: 'Phase 3',
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'Discover Connections',
    subtitle: 'Find biblical themes & patterns',
    cta: 'Explore',
    colorClass: 'text-sage-dark',
    phase: 'Phase 6',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Step into History',
    subtitle: 'Experience biblical times',
    cta: 'Immerse',
    colorClass: 'text-ochre-dark',
    phase: 'Phase 6',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Connect with Others',
    subtitle: 'Group discussions & shared growth',
    cta: 'Join',
    colorClass: 'text-charcoal-light',
    phase: 'Phase 6',
  },
];

export function QuickActionsSection() {
  const handleActionClick = (action: QuickAction) => {
    toast.info(`${action.title} coming in ${action.phase}!`, {
      description: "We're building something amazing for you.",
    });
  };

  return (
    <section className="mb-8" data-tour="quick-actions">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-xl font-semibold text-foreground mb-4 font-spiritual"
      >
        Continue Your Formation
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full group">
              <CardContent className="p-5 flex flex-col h-full">
                <div className={cn("w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-105 transition-transform", action.colorClass)}>
                  {action.icon}
                </div>
                <h3 className="font-medium text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{action.subtitle}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleActionClick(action)}
                  className="w-full"
                >
                  {action.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
