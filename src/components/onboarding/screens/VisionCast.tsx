import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProgressIndicator } from '../ProgressIndicator';
import { BookOpen, Users, Globe, Lightbulb } from 'lucide-react';

interface VisionCastProps {
  onContinue: () => void;
  onLearnMore: () => void;
}

export function VisionCast({ onContinue, onLearnMore }: VisionCastProps) {
  const features = [
    { icon: Lightbulb, label: "Wise Mentor" },
    { icon: BookOpen, label: "Research Library" },
    { icon: Globe, label: "Time Machine" },
    { icon: Users, label: "Community" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <ProgressIndicator currentStep={1} totalSteps={5} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
        {/* Hero visual suggestion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full aspect-video rounded-2xl bg-gradient-to-br from-ochre/20 via-sage/10 to-terracotta/20 mb-8 flex items-center justify-center overflow-hidden"
        >
          <div className="flex gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-xl bg-card shadow-md flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-spiritual font-semibold text-center text-foreground mb-6"
        >
          Welcome to WL
        </motion.h1>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground text-lg leading-relaxed mb-10 font-spiritual"
        >
          Imagine having a wise mentor, a world-class research library, a time machine to biblical history, 
          and a vibrant spiritual community all in your pocket. We're not just another Bible app. 
          We're your personal guide for deeper spiritual formation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Button size="lg" onClick={onContinue} className="px-10">
            Continue
          </Button>
          <button
            onClick={onLearnMore}
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
}
