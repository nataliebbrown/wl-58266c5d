import { type VerseHighlight, HIGHLIGHT_COLORS } from '@/lib/highlights';
import type { BibleVerse } from '@/lib/bibleApi';

interface VerseTextProps {
  verse: BibleVerse;
  highlight?: VerseHighlight;
  isSelected: boolean;
  onSelect: (verseNumber: number) => void;
}

export function VerseText({ verse, highlight, isSelected, onSelect }: VerseTextProps) {
  const bgStyle = highlight
    ? { backgroundColor: HIGHLIGHT_COLORS[highlight.color].bg }
    : isSelected
      ? { backgroundColor: 'rgba(135, 169, 107, 0.12)' }
      : {};

  return (
    <span
      className={`inline cursor-pointer rounded-sm transition-colors duration-150 ${
        isSelected ? 'ring-1 ring-[#87A96B]/30' : ''
      }`}
      style={bgStyle}
      onClick={() => onSelect(verse.number)}
    >
      <sup className="text-xs font-medium text-muted-foreground/50 mr-1 select-none">
        {verse.number}
      </sup>
      <span className="text-foreground/90">{verse.text} </span>
    </span>
  );
}
