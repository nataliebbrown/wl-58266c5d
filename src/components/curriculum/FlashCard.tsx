import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import type { FlashCard as FlashCardType } from '@/types/curriculum';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
  onSpeak: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  hasTTS: boolean;
}

export function FlashCard({ card, isFlipped, onFlip, onSpeak, isSpeaking, hasTTS }: FlashCardProps) {
  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.pronunciation) {
      onSpeak(card.pronunciation, card.audioLang);
    }
  };

  return (
    <div
      className="w-full h-64 cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-2xl border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 flex flex-col items-center justify-center p-6"
        >
          <span className="text-7xl mb-6" dir="rtl">{card.front}</span>
          <span className="text-xs text-foreground/30">Tap to flip</span>
          {hasTTS && card.pronunciation && (
            <button
              onClick={handleAudio}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isSpeaking
                  ? 'bg-hl-green/20 text-hl-green'
                  : 'bg-foreground/5 text-foreground/40 hover:bg-foreground/10 hover:text-foreground/60'
              }`}
              aria-label="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Back face */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-2xl border border-hl-green/30 bg-hl-green/5 dark:bg-hl-green/10 flex flex-col items-center justify-center p-6"
        >
          <div className="text-center whitespace-pre-line text-base text-foreground/80 leading-relaxed">
            {card.back}
          </div>
          {hasTTS && card.pronunciation && (
            <button
              onClick={handleAudio}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isSpeaking
                  ? 'bg-hl-green/20 text-hl-green'
                  : 'bg-foreground/5 text-foreground/40 hover:bg-foreground/10 hover:text-foreground/60'
              }`}
              aria-label="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
