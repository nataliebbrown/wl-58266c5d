import { motion } from 'framer-motion';
import { Highlighter, MessageCircle, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  type HighlightColor,
  HIGHLIGHT_COLORS,
  saveHighlight,
  removeHighlight,
  getHighlightForVerse,
} from '@/lib/highlights';
import { toast } from 'sonner';
import type { BibleVerse } from '@/lib/bibleApi';

interface HighlightBarProps {
  book: string;
  chapter: number;
  selectedVerse: BibleVerse;
  onClose: () => void;
  onAskSophia: (verse: BibleVerse) => void;
  onHighlightChange: () => void;
}

export function HighlightBar({
  book,
  chapter,
  selectedVerse,
  onClose,
  onAskSophia,
  onHighlightChange,
}: HighlightBarProps) {
  const existing = getHighlightForVerse(book, chapter, selectedVerse.number);

  const handleHighlight = (color: HighlightColor) => {
    if (existing?.color === color) {
      removeHighlight(book, chapter, selectedVerse.number);
      toast.success('Highlight removed');
    } else {
      saveHighlight(book, chapter, selectedVerse.number, color);
      toast.success('Verse highlighted');
    }
    onHighlightChange();
  };

  const handleCopy = async () => {
    const text = `${book} ${chapter}:${selectedVerse.number} — ${selectedVerse.text}`;
    await navigator.clipboard.writeText(text);
    toast.success('Verse copied');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-lg">
        {/* Verse reference */}
        <span className="text-xs font-medium text-muted-foreground/70 mr-1">
          {book} {chapter}:{selectedVerse.number}
        </span>

        <div className="w-px h-6 bg-border/30" />

        {/* Highlight colors */}
        {(Object.entries(HIGHLIGHT_COLORS) as [HighlightColor, typeof HIGHLIGHT_COLORS[HighlightColor]][]).map(
          ([color, config]) => (
            <button
              key={color}
              onClick={() => handleHighlight(color)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                existing?.color === color ? 'ring-2 ring-offset-1 ring-foreground/30' : ''
              }`}
              style={{ backgroundColor: config.text }}
              title={config.label}
            >
              {existing?.color === color && (
                <Highlighter className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          )
        )}

        <div className="w-px h-6 bg-border/30" />

        {/* Ask Sophia */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-hl-green hover:text-hl-green hover:bg-hl-green/10"
          onClick={() => {
            onAskSophia(selectedVerse);
            onClose();
          }}
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">Ask Sophia</span>
        </Button>

        {/* Copy */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4" />
        </Button>

        {/* Close */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
