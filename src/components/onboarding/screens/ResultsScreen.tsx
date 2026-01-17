import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PersonaResult } from '@/types/onboarding';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface ResultsScreenProps {
  persona: PersonaResult | null;
  onEnterDashboard: () => void;
  onRestart: () => void;
}

export function ResultsScreen({ persona, onEnterDashboard, onRestart }: ResultsScreenProps) {
  const navigate = useNavigate();

  const handleEnterDashboard = () => {
    onEnterDashboard();
    navigate('/dashboard');
  };

  if (!persona) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Something went wrong generating your results.</p>
          <Button onClick={onRestart} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-radial-warm flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Celebration icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        {/* Congratulations */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sage font-medium uppercase tracking-wider text-sm mb-4"
        >
          Your Spiritual Formation Path
        </motion.p>

        {/* Persona title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-spiritual font-semibold text-foreground mb-6"
        >
          {persona.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed mb-10 font-spiritual"
        >
          {persona.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="lg"
            onClick={handleEnterDashboard}
            className="px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <button
            onClick={onRestart}
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            Retake Quiz
          </button>
        </motion.div>

        {/* Persona code (for debugging/reference) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-xs text-muted-foreground font-mono"
        >
          Persona: {persona.code}
        </motion.p>
      </motion.div>
    </div>
  );
}
