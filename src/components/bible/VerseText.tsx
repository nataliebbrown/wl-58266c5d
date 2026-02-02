import { type VerseHighlight, HIGHLIGHT_COLORS } from '@/lib/highlights';
import type { BibleVerse } from '@/lib/bibleApi';

interface VerseTextProps {
  verse: BibleVerse;
  highlight?: VerseHighlight;
  isSelected: boolean;
  isHighlighted?: boolean;
  onSelect: (verseNumber: number) => void;
  isDropCap?: boolean;
}

export function VerseText({ verse, highlight, isSelected, isHighlighted, onSelect, isDropCap }: VerseTextProps) {
  const bgStyle = highlight
    ? { backgroundColor: HIGHLIGHT_COLORS[highlight.color].bg }
    : isHighlighted
      ? { backgroundColor: 'rgba(135, 169, 107, 0.18)' }
      : isSelected
        ? { backgroundColor: 'rgba(135, 169, 107, 0.12)' }
        : {};

  return (
    <span
      data-verse={verse.number}
      className={`inline cursor-pointer rounded-sm transition-colors duration-150 ${
        isHighlighted ? 'ring-1 ring-hl-green/40' : isSelected ? 'ring-1 ring-hl-green/30' : ''
      }`}
      style={bgStyle}
      onClick={() => onSelect(verse.number)}
    >
      {isDropCap ? (
        <span
          className="bible-drop-cap font-serif text-foreground/80 select-none"
          aria-hidden="true"
        >
          {verse.number}
        </span>
      ) : (
        <sup className="text-xs font-medium text-muted-foreground/50 mr-1 select-none">
          {verse.number}
        </sup>
      )}
      <span className="text-foreground/90">{verse.text} </span>
    </span>
  );
}
