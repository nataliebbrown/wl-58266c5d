import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useVoiceOutput } from '@/hooks/useVoiceOutput';
import type { FlashCardDeck as FlashCardDeckType } from '@/types/curriculum';
import { FlashCard } from './FlashCard';

interface FlashCardDeckProps {
  deck: FlashCardDeckType;
}

export function FlashCardDeck({ deck }: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { stop, isSpeaking, hasTTSSupport } = useVoiceOutput();

  const handleSpeak = useCallback((text: string, lang?: string) => {
    if (!hasTTSSupport || !text.trim()) return;
    speechSynthesis.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);

      if (lang) {
        const voices = speechSynthesis.getVoices();
        const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
        if (langVoice) {
          utterance.voice = langVoice;
          utterance.lang = lang;
        }
      }

      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    };

    setTimeout(doSpeak, 50);
  }, [hasTTSSupport]);

  const handlePrev = () => {
    stop();
    setIsFlipped(false);
    setCurrentIndex(i => Math.max(0, i - 1));
  };

  const handleNext = () => {
    stop();
    setIsFlipped(false);
    setCurrentIndex(i => Math.min(deck.cards.length - 1, i + 1));
  };

  const card = deck.cards[currentIndex];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-foreground">{deck.title}</h4>
        <p className="text-xs text-foreground/50 mt-0.5">{deck.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <Progress
          value={((currentIndex + 1) / deck.cards.length) * 100}
          className="h-1.5 flex-1"
        />
        <span className="text-xs text-foreground/40 whitespace-nowrap">
          {currentIndex + 1} of {deck.cards.length}
        </span>
      </div>

      <FlashCard
        card={card}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(prev => !prev)}
        onSpeak={handleSpeak}
        isSpeaking={isSpeaking}
        hasTTS={hasTTSSupport}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === deck.cards.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
