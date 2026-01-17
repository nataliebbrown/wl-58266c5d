import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface WelcomeSplashProps {
  onBegin: () => void;
}

export function WelcomeSplash({ onBegin }: WelcomeSplashProps) {
  return (
    <div className="min-h-screen gradient-radial-warm flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-spiritual font-semibold text-foreground tracking-tight">
            Scripture AI
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground font-spiritual italic mb-12"
        >
          Where ancient wisdom meets modern discovery
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            size="lg"
            onClick={onBegin}
            className="px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Begin Your Journey
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 text-sm text-muted-foreground"
      >
        A new way to explore God's Word
      </motion.div>
    </div>
  );
}
