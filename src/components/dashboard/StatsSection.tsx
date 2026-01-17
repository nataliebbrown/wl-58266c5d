import { motion } from 'framer-motion';
import { Flame, MessageCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { UserStats } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  stats: UserStats;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  colorClass: string;
  delay: number;
}

function StatCard({ icon, value, label, colorClass, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClass)}>
              {icon}
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="mb-8" data-tour="stats">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-foreground mb-4 font-spiritual"
      >
        Your Spiritual Formation Journey
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Flame className="w-6 h-6 text-sage-dark" />}
          value={`${stats.daysActive} days`}
          label="Active streak"
          colorClass="bg-sage/20"
          delay={0.25}
        />
        <StatCard
          icon={<MessageCircle className="w-6 h-6 text-primary" />}
          value={stats.conversationCount}
          label="Deep conversations"
          colorClass="bg-primary/15"
          delay={0.3}
        />
        <StatCard
          icon={<Lightbulb className="w-6 h-6 text-ochre-dark" />}
          value={stats.insightsCount}
          label="Insights discovered"
          colorClass="bg-ochre/20"
          delay={0.35}
        />
      </div>
    </section>
  );
}
