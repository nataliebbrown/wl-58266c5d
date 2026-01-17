import { motion } from 'framer-motion';
import { Flame, MessageSquare, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    icon: Flame,
    value: '0',
    label: 'days',
    sublabel: 'Start your streak today!',
  },
  {
    icon: MessageSquare,
    value: '0',
    label: 'conversations',
    sublabel: 'Begin with your first',
  },
  {
    icon: Lightbulb,
    value: '0',
    label: 'insights',
    sublabel: 'Discover as you explore',
  },
];

export function FirstTimeStatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8"
    >
      <h3 className="text-lg font-medium text-muted-foreground mb-4">
        Your Journey Begins Today
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="bg-muted/30 border-muted">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/70">
                    {stat.sublabel}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
