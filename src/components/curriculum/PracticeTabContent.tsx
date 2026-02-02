import type { FlashCardDeck as FlashCardDeckType } from '@/types/curriculum';
import { FlashCardDeck } from './FlashCardDeck';

interface PracticeTabContentProps {
  decks: FlashCardDeckType[];
}

export function PracticeTabContent({ decks }: PracticeTabContentProps) {
  if (decks.length === 0) {
    return (
      <p className="text-sm text-foreground/40 py-6 text-center">
        No practice materials for this lesson.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {decks.map((deck) => (
        <FlashCardDeck key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
