import { motion } from 'framer-motion';
import { MessageCircle, Network, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  colorClass: string;
  isPrimary?: boolean;
  comingSoon?: boolean;
}

const quickActions: QuickAction[] = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Talk with Sophia',
    subtitle: 'Your AI spiritual companion',
    cta: 'Start Chat',
    colorClass: 'text-primary',
    isPrimary: true,
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: 'Explore Patterns',
    subtitle: 'Find biblical themes & patterns',
    cta: 'Explore',
    colorClass: 'text-sage-dark',
    comingSoon: true,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Step into History',
    subtitle: 'Experience biblical times',
    cta: 'Immerse',
    colorClass: 'text-ochre-dark',
    comingSoon: true,
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Join Community',
    subtitle: 'Group discussions & shared growth',
    cta: 'Join',
    colorClass: 'text-charcoal-light',
    comingSoon: true,
  },
];

interface FirstTimeQuickActionsProps {
  onActionTaken?: () => void;
}

export function FirstTimeQuickActions({ onActionTaken }: FirstTimeQuickActionsProps) {
  const navigate = useNavigate();

  const handleActionClick = (action: QuickAction) => {
    if (action.isPrimary) {
      onActionTaken?.();
      navigate('/chat');
    } else {
      toast.info(`${action.title} coming soon!`, {
        description: "We're building something amazing for you.",
      });
    }
  };

  return (
    <section className="mb-8" data-tour="quick-actions">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-lg font-semibold text-muted-foreground mb-3 font-spiritual"
      >
        More Ways to Explore
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 + index * 0.05 }}
          >
            <Card 
              className={cn(
                "border shadow-sm transition-all h-full group",
                action.isPrimary 
                  ? "border-primary/20 hover:shadow-md hover:border-primary/40" 
                  : "border-border/50 bg-card/50 hover:bg-card/80"
              )}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-transform group-hover:scale-105",
                      action.colorClass,
                      action.comingSoon && "opacity-50"
                    )}
                  >
                    {action.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={cn(
                        "font-medium text-sm",
                        action.comingSoon ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {action.title}
                      </h3>
                      {action.comingSoon && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-muted text-muted-foreground">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <p className={cn(
                      "text-xs",
                      action.comingSoon ? "text-muted-foreground/60" : "text-muted-foreground"
                    )}>
                      {action.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant={action.isPrimary ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleActionClick(action)}
                  className={cn(
                    "w-full mt-auto",
                    action.comingSoon && "opacity-60"
                  )}
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
