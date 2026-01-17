import { motion } from 'framer-motion';
import { Flame, MessageCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FirstTimeStatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  colorClass: string;
  delay: number;
}

function FirstTimeStatCard({ icon, value, label, colorClass, delay }: FirstTimeStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border border-dashed border-border/50 shadow-sm bg-card/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center opacity-60", colorClass)}>
              {icon}
            </div>
            <div>
              <p className="text-xl font-semibold text-muted-foreground">{value}</p>
              <p className="text-xs text-muted-foreground/70">{label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FirstTimeStatsSection() {
  return (
    <section className="mb-8" data-tour="stats">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg font-semibold text-muted-foreground mb-3 font-spiritual"
      >
        Your Journey Begins Today
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FirstTimeStatCard
          icon={<Flame className="w-5 h-5 text-sage-dark" />}
          value="0 days"
          label="Start your streak!"
          colorClass="bg-sage/10"
          delay={0.85}
        />
        <FirstTimeStatCard
          icon={<MessageCircle className="w-5 h-5 text-primary" />}
          value="0"
          label="Begin your first"
          colorClass="bg-primary/10"
          delay={0.9}
        />
        <FirstTimeStatCard
          icon={<Lightbulb className="w-5 h-5 text-ochre-dark" />}
          value="0"
          label="Discover as you grow"
          colorClass="bg-ochre/10"
          delay={0.95}
        />
      </div>
    </section>
  );
}
