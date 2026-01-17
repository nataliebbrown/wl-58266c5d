import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Insight, CATEGORY_LABELS } from '@/types/dashboard';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface InsightsSectionProps {
  insights: Insight[];
}

const categoryColors: Record<Insight['category'], string> = {
  pattern: 'bg-sage/20 text-sage-dark hover:bg-sage/30',
  cultural: 'bg-ochre/20 text-ochre-dark hover:bg-ochre/30',
  personal: 'bg-primary/15 text-primary hover:bg-primary/25',
  theological: 'bg-charcoal-light/20 text-charcoal hover:bg-charcoal-light/30',
};

export function InsightsSection({ insights }: InsightsSectionProps) {
  const handleInsightClick = (insight: Insight) => {
    toast.info('Full insight view coming soon!', {
      description: insight.title,
    });
  };

  const handleViewAll = () => {
    toast.info('Insights library coming in a future phase!');
  };

  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-semibold text-foreground mb-4 font-spiritual"
      >
        Recent Insights & Reflections
      </motion.h2>
      <div className="space-y-3">
        {insights.slice(0, 3).map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + index * 0.05 }}
          >
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => handleInsightClick(insight)}
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {insight.date}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {insight.preview}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "whitespace-nowrap transition-colors self-start",
                      categoryColors[insight.category]
                    )}
                  >
                    {CATEGORY_LABELS[insight.category]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={handleViewAll}
        className="mt-4 text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
      >
        View All Insights →
      </motion.button>
    </section>
  );
}
