import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function FirstTimeInsightsSection() {
  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="text-lg font-semibold text-muted-foreground mb-3 font-spiritual"
      >
        Recent Insights & Reflections
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05 }}
      >
        <Card className="border border-dashed border-border/50 bg-card/30">
          <CardContent className="py-12 px-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-muted-foreground/40" />
            </div>
            
            <h3 className="text-muted-foreground font-medium mb-2 font-spiritual">
              Your insights will appear here
            </h3>
            
            <p className="text-sm text-muted-foreground/70 max-w-sm leading-relaxed">
              As you have conversations with Sophia, you can save meaningful discoveries and reflections. 
              They'll show up here for easy review.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
