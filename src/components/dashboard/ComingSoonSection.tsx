import { motion } from 'framer-motion';
import { Sparkles, Network, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const comingSoonItems = [
  { icon: <Network className="w-5 h-5" />, title: 'Pattern Discovery', description: 'Find connections across Scripture' },
  { icon: <Clock className="w-5 h-5" />, title: 'Historical Immersion', description: 'Step into biblical times' },
  { icon: <Users className="w-5 h-5" />, title: 'Community', description: 'Grow together with others' },
];

export function ComingSoonSection() {
  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-2 mb-4"
      >
        <Sparkles className="w-5 h-5 text-ochre" />
        <h2 className="text-xl font-semibold text-foreground font-spiritual">Coming Soon</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {comingSoonItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 + index * 0.05 }}
          >
            <Card className="border border-dashed border-border bg-muted/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                  {item.icon}
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-center text-sm text-muted-foreground mt-4"
      >
        Stay tuned — more features are on the way!
      </motion.p>
    </section>
  );
}
