import { motion } from 'framer-motion';
import { PathwayCard } from './PathwayCard';
import { PERSONA_PATHWAYS, type PathwayOption } from '@/types/onboarding-overlay';

interface PathwaySelectionProps {
  spiritualBackground: string;
  onSelectPathway: (pathway: PathwayOption) => void;
  onSkipToExplore: () => void;
}

export function PathwaySelection({
  spiritualBackground,
  onSelectPathway,
  onSkipToExplore,
}: PathwaySelectionProps) {
  const pathways = PERSONA_PATHWAYS[spiritualBackground] || PERSONA_PATHWAYS.default;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">
          Choose Your Path
        </h2>
        <p className="text-cream/80 max-w-lg mx-auto">
          Not sure where to start? Pick what resonates most right now—all paths lead to deeper spiritual formation.
        </p>
      </motion.div>

      {/* Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {pathways.map((pathway, index) => (
          <PathwayCard
            key={pathway.id}
            pathway={pathway}
            index={index}
            onSelect={onSelectPathway}
          />
        ))}
      </div>

      {/* Skip link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <button
          onClick={onSkipToExplore}
          className="text-cream/70 hover:text-cream text-sm underline-offset-2 hover:underline transition-colors"
        >
          Or explore the full dashboard
        </button>
      </motion.div>
    </motion.div>
  );
}
