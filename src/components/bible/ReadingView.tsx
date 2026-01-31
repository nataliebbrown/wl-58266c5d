import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerseText } from './VerseText';
import { HighlightBar } from './HighlightBar';
import {
  type BibleReference,
  type BiblePassage,
  type BibleVerse,
  fetchPassage,
  getBook,
  addToReadingHistory,
} from '@/lib/bibleApi';
import { getHighlightsForChapter, type VerseHighlight } from '@/lib/highlights';

// ============ Types ============

interface ReadingViewProps {
  reference: BibleReference;
  onNavigate: (ref: BibleReference) => void;
  onAskSophia: (verse: BibleVerse, reference: BibleReference) => void;
}

type FontSize = 'sm' | 'base' | 'lg' | 'xl';

const FONT_SIZES: Record<FontSize, string> = {
  sm: 'text-sm leading-7',
  base: 'text-base leading-8',
  lg: 'text-lg leading-9',
  xl: 'text-xl leading-10',
};

const FONT_SIZE_ORDER: FontSize[] = ['sm', 'base', 'lg', 'xl'];

// ============ Component ============

export function ReadingView({ reference, onNavigate, onAskSophia }: ReadingViewProps) {
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('wl-bible-fontsize') as FontSize) || 'base';
  });

  const book = getBook(reference.book);

  // Load passage
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSelectedVerse(null);

    fetchPassage(reference)
      .then(data => {
        if (!cancelled) {
          setPassage(data);
          setLoading(false);
          addToReadingHistory(reference.book, reference.chapter);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reference]);

  // Load highlights for current chapter
  const refreshHighlights = useCallback(() => {
    setHighlights(getHighlightsForChapter(reference.book, reference.chapter));
  }, [reference.book, reference.chapter]);

  useEffect(() => {
    refreshHighlights();
  }, [refreshHighlights]);

  // Font size
  const cycleFontSize = () => {
    const idx = FONT_SIZE_ORDER.indexOf(fontSize);
    const next = FONT_SIZE_ORDER[(idx + 1) % FONT_SIZE_ORDER.length];
    setFontSize(next);
    localStorage.setItem('wl-bible-fontsize', next);
  };

  // Navigation
  const canGoPrev = reference.chapter > 1;
  const canGoNext = book ? reference.chapter < book.chapters : false;

  const goPrev = () => {
    if (canGoPrev) {
      onNavigate({ ...reference, chapter: reference.chapter - 1 });
    }
  };

  const goNext = () => {
    if (canGoNext) {
      onNavigate({ ...reference, chapter: reference.chapter + 1 });
    }
  };

  // Verse selection
  const handleVerseSelect = (verseNumber: number) => {
    setSelectedVerse(prev => (prev === verseNumber ? null : verseNumber));
  };

  const selectedVerseData =
    selectedVerse !== null ? passage?.verses.find(v => v.number === selectedVerse) : null;

  const getHighlightForVerse = (verseNumber: number) =>
    highlights.find(h => h.verse === verseNumber);

  return (
    <div className="flex flex-col h-full">
      {/* Chapter header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goPrev}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h2 className="font-serif text-lg font-semibold text-foreground">
            {reference.book} {reference.chapter}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goNext}
            disabled={!canGoNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={cycleFontSize}
          title="Change text size"
        >
          <Type className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-hl-green/30 border-t-hl-green rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchPassage(reference)
                  .then(setPassage)
                  .catch(err => setError(err.message))
                  .finally(() => setLoading(false));
              }}
            >
              Retry
            </Button>
          </div>
        ) : passage ? (
          <motion.div
            key={`${reference.book}-${reference.chapter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[680px] mx-auto font-serif ${FONT_SIZES[fontSize]}`}
          >
            {passage.verses.map(verse => (
              <VerseText
                key={verse.number}
                verse={verse}
                highlight={getHighlightForVerse(verse.number)}
                isSelected={selectedVerse === verse.number}
                onSelect={handleVerseSelect}
              />
            ))}

            {passage.copyright && (
              <p className="mt-8 text-xs text-muted-foreground/40 font-sans">
                {passage.copyright}
              </p>
            )}
          </motion.div>
        ) : null}
      </div>

      {/* Chapter navigation footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrev}
          disabled={!canGoPrev}
          className="text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <span className="text-xs text-muted-foreground/50">
          {reference.book} {reference.chapter}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={goNext}
          disabled={!canGoNext}
          className="text-muted-foreground"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Highlight bar */}
      <AnimatePresence>
        {selectedVerseData && (
          <HighlightBar
            book={reference.book}
            chapter={reference.chapter}
            selectedVerse={selectedVerseData}
            onClose={() => setSelectedVerse(null)}
            onAskSophia={(verse) => onAskSophia(verse, reference)}
            onHighlightChange={refreshHighlights}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
