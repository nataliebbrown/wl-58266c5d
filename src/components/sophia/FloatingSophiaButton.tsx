import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, History, Sparkles } from 'lucide-react';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

interface FloatingSophiaButtonProps {
  onClick: () => void;
  onOpenHistory?: () => void;
  onLearnToday?: () => void;
}

interface ActionBubble {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: 'chat' | 'history' | 'learn';
}

const actionBubbles: ActionBubble[] = [
  { id: 'history', label: 'Open chat history', icon: <History className="w-4 h-4" />, action: 'history' },
  { id: 'learn', label: 'What can I learn today?', icon: <Sparkles className="w-4 h-4" />, action: 'learn' },
  { id: 'chat', label: 'Talk to Sophia', icon: <MessageCircle className="w-4 h-4" />, action: 'chat' },
];

export function FloatingSophiaButton({ onClick, onOpenHistory, onLearnToday }: FloatingSophiaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAction = (action: 'chat' | 'history' | 'learn') => {
    switch (action) {
      case 'chat':
        onClick();
        break;
      case 'history':
        if (onOpenHistory) onOpenHistory();
        else onClick();
        break;
      case 'learn':
        if (onLearnToday) onLearnToday();
        else onClick();
        break;
    }
    setIsHovered(false);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Action bubbles */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-3 flex flex-col gap-2">
            {actionBubbles.map((bubble, index) => (
              <motion.button
                key={bubble.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ 
                  duration: 0.2, 
                  delay: (actionBubbles.length - 1 - index) * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
                onClick={() => handleAction(bubble.action)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:bg-card transition-all duration-200 whitespace-nowrap group"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(167, 139, 250, 0.1)',
                }}
              >
                <span className="text-muted-foreground group-hover:text-[#87A96B] transition-colors">
                  {bubble.icon}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-foreground/90">
                  {bubble.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main orb button */}
      <motion.button
        onClick={onClick}
        className="relative focus:outline-none focus:ring-2 focus:ring-[#87A96B] focus:ring-offset-2 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -6, 0],
        }}
        transition={{ 
          scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 },
          opacity: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Talk to Sophia"
      >
        {/* Outer soft glow */}
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220, 215, 205, 0.5) 0%, rgba(200, 195, 185, 0.3) 50%, transparent 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            scale: isHovered ? [1.1, 1.3, 1.1] : [1, 1.2, 1],
            opacity: isHovered ? [0.6, 0.9, 0.6] : [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: isHovered ? 1.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main orb container — same SVG as cinematic intro */}
        <motion.div
          className="relative w-16 h-16 rounded-full overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? `0 0 50px rgba(220, 215, 205, 0.5), 0 0 80px rgba(200, 195, 185, 0.3)`
              : `0 0 40px rgba(220, 215, 205, 0.3), 0 0 60px rgba(200, 195, 185, 0.2)`,
          }}
        >
          <img
            src={sophiaOrb}
            alt="Sophia"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
