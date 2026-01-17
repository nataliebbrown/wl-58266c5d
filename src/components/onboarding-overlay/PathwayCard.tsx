import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, Compass, BookOpen, Network, MessageCircle, Users,
  Presentation, Heart, Languages, BookMarked, Search, MessageSquare,
  Book, Scale, Sparkles
} from 'lucide-react';
import type { PathwayOption } from '@/types/onboarding-overlay';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle,
  Compass,
  BookOpen,
  Network,
  MessageCircle,
  Users,
  Presentation,
  Heart,
  Languages,
  BookMarked,
  Search,
  MessageSquare,
  Book,
  Scale,
  Sparkles,
};

interface PathwayCardProps {
  pathway: PathwayOption;
  index: number;
  onSelect: (pathway: PathwayOption) => void;
}

const colorStyles = {
  terracotta: {
    bg: 'bg-gradient-to-br from-terracotta/10 to-terracotta/5',
    icon: 'bg-terracotta/20 text-terracotta',
    border: 'border-terracotta/20 hover:border-terracotta/40',
    button: 'bg-terracotta hover:bg-terracotta/90',
  },
  sage: {
    bg: 'bg-gradient-to-br from-sage/10 to-sage/5',
    icon: 'bg-sage/20 text-sage',
    border: 'border-sage/20 hover:border-sage/40',
    button: 'bg-sage hover:bg-sage/90',
  },
  ochre: {
    bg: 'bg-gradient-to-br from-ochre/10 to-ochre/5',
    icon: 'bg-ochre/20 text-ochre',
    border: 'border-ochre/20 hover:border-ochre/40',
    button: 'bg-ochre hover:bg-ochre/90',
  },
};

export function PathwayCard({ pathway, index, onSelect }: PathwayCardProps) {
  const Icon = iconMap[pathway.icon] || Sparkles;
  const styles = colorStyles[pathway.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
      className={`
        ${styles.bg} ${styles.border}
        rounded-2xl p-6 border-2 cursor-pointer
        transition-all duration-300
        flex flex-col items-center text-center
        bg-white/80 backdrop-blur-sm
      `}
      onClick={() => onSelect(pathway)}
    >
      <div className={`w-14 h-14 rounded-full ${styles.icon} flex items-center justify-center mb-4`}>
        <Icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-lg font-serif font-semibold text-charcoal mb-2">
        {pathway.name}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {pathway.description}
      </p>
      
      <p className="text-xs text-charcoal/60 mb-4">
        <span className="font-medium">Best for:</span> {pathway.bestFor}
      </p>
      
      <Button 
        className={`${styles.button} text-white w-full mt-auto`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(pathway);
        }}
      >
        Start This Path
      </Button>
    </motion.div>
  );
}
