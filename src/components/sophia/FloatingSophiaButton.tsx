import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, Sparkles, BookOpen, Compass, Heart, Eye, Lightbulb, HelpCircle } from 'lucide-react';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

interface FloatingSophiaButtonProps {
  onClick: () => void;
  onSendPrompt?: (prompt: string) => void;
  currentPath?: string;
  contextLabel?: string | null;
}

interface ActionBubble {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: 'chat' | 'prompt';
  prompt?: string;
}

const defaultBubbles: ActionBubble[] = [
  { id: 'learn', label: 'What can I learn today?', icon: <Sparkles className="w-4 h-4" />, action: 'prompt', prompt: 'What can I learn today?' },
  { id: 'guide', label: 'Guide me, Sophia', icon: <Compass className="w-4 h-4" />, action: 'prompt', prompt: "I'm not sure where to start. Can you guide me?" },
  { id: 'chat', label: 'Talk to Sophia', icon: <MessageCircle className="w-4 h-4" />, action: 'chat' },
];

function getBibleBubbles(passage: string | null): ActionBubble[] {
  if (passage) {
    return [
      { id: 'understand', label: `What is ${passage} about?`, icon: <BookOpen className="w-4 h-4" />, action: 'prompt', prompt: `What is ${passage} about? Help me understand the key themes and message.` },
      { id: 'context', label: `Context of ${passage}`, icon: <Eye className="w-4 h-4" />, action: 'prompt', prompt: `What is the historical and cultural context of ${passage}?` },
      { id: 'chat', label: 'Ask Sophia anything', icon: <MessageCircle className="w-4 h-4" />, action: 'chat' },
    ];
  }
  return [
    { id: 'suggest', label: 'Where should I start reading?', icon: <Compass className="w-4 h-4" />, action: 'prompt', prompt: "I'm not sure where to start reading the Bible today. Can you suggest a passage?" },
    { id: 'explore', label: 'Explore a theme in Scripture', icon: <Sparkles className="w-4 h-4" />, action: 'prompt', prompt: 'Can you help me explore a meaningful theme across Scripture?' },
    { id: 'chat', label: 'Ask Sophia anything', icon: <MessageCircle className="w-4 h-4" />, action: 'chat' },
  ];
}

const pageBubbles: Record<string, ActionBubble[]> = {
  '/learn': [
    { id: 'guide', label: 'Guide me through this lesson', icon: <BookOpen className="w-4 h-4" />, action: 'prompt', prompt: 'Can you guide me through this lesson and help me understand the key concepts?' },
    { id: 'apply', label: 'How does this apply to my life?', icon: <Heart className="w-4 h-4" />, action: 'prompt', prompt: 'How can I apply what I\'m learning here to my daily life?' },
    { id: 'next', label: 'What should I study next?', icon: <Compass className="w-4 h-4" />, action: 'prompt', prompt: 'Based on what I\'ve been learning, what should I study next?' },
  ],
  '/journey': [
    { id: 'reflect', label: 'Reflect on my progress', icon: <Sparkles className="w-4 h-4" />, action: 'prompt', prompt: 'Can you help me reflect on my spiritual growth and progress so far?' },
    { id: 'next-step', label: 'What\'s my next step?', icon: <Compass className="w-4 h-4" />, action: 'prompt', prompt: 'What do you think my next step should be on my spiritual journey?' },
    { id: 'encourage', label: 'Encourage me today', icon: <Heart className="w-4 h-4" />, action: 'prompt', prompt: 'I could use some encouragement today. Can you share something uplifting?' },
  ],
  '/horizon': [
    { id: 'themes', label: 'Tell me about these themes', icon: <Eye className="w-4 h-4" />, action: 'prompt', prompt: 'Can you tell me more about the themes emerging on my horizon?' },
    { id: 'explore', label: 'Help me explore a topic', icon: <Lightbulb className="w-4 h-4" />, action: 'prompt', prompt: "I'd like to explore one of these emerging topics more deeply." },
    { id: 'scripture', label: 'Connect this to Scripture', icon: <BookOpen className="w-4 h-4" />, action: 'prompt', prompt: 'Can you connect these themes to relevant Scripture passages?' },
  ],
  '/insights': [
    { id: 'patterns', label: 'Help me see patterns', icon: <Sparkles className="w-4 h-4" />, action: 'prompt', prompt: 'Can you help me see patterns and connections across my saved insights?' },
    { id: 'deepen', label: 'Deepen an insight', icon: <Lightbulb className="w-4 h-4" />, action: 'prompt', prompt: "I'd like to go deeper on one of my saved insights. Can you help?" },
    { id: 'apply', label: 'How do I apply these?', icon: <Heart className="w-4 h-4" />, action: 'prompt', prompt: 'How can I practically apply these insights to my life?' },
  ],
  '/search': [
    { id: 'help-find', label: 'Help me find what I need', icon: <HelpCircle className="w-4 h-4" />, action: 'prompt', prompt: "I'm looking for something but not sure how to find it. Can you help?" },
    { id: 'suggest', label: 'Suggest topics to explore', icon: <Compass className="w-4 h-4" />, action: 'prompt', prompt: 'Can you suggest some meaningful topics for me to explore?' },
    { id: 'chat', label: 'Talk to Sophia', icon: <MessageCircle className="w-4 h-4" />, action: 'chat' },
  ],
};

function getBubblesForPath(path: string, contextLabel: string | null): ActionBubble[] {
  // Bible page gets dynamic passage-aware bubbles
  if (path === '/bible' || path.startsWith('/bible/')) {
    return getBibleBubbles(contextLabel);
  }
  if (pageBubbles[path]) return pageBubbles[path];
  for (const [route, bubbles] of Object.entries(pageBubbles)) {
    if (path.startsWith(route + '/')) return bubbles;
  }
  return defaultBubbles;
}

export function FloatingSophiaButton({ onClick, onSendPrompt, currentPath = '', contextLabel = null }: FloatingSophiaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const actionBubbles = getBubblesForPath(currentPath, contextLabel);

  const handleBubbleClick = (bubble: ActionBubble) => {
    if (bubble.action === 'prompt' && bubble.prompt && onSendPrompt) {
      onSendPrompt(bubble.prompt);
    } else {
      onClick();
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
                onClick={() => handleBubbleClick(bubble)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:bg-card transition-all duration-200 whitespace-nowrap group"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(167, 139, 250, 0.1)',
                }}
              >
                <span className="text-muted-foreground group-hover:text-hl-green transition-colors">
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
        className="relative focus:outline-none focus:ring-2 focus:ring-hl-green focus:ring-offset-2 rounded-full"
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
