import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerseText } from './VerseText';
import { SectionHeading } from './SectionHeading';
import { HighlightBar } from './HighlightBar';
import {
  type BibleReference,
  type BiblePassage,
  type BibleVerse,
  fetchPassage,
  getBook,
  addToReadingHistory,
  OT_BOOKS,
  NT_BOOKS,
} from '@/lib/bibleApi';
import { getHighlightsForChapter, type VerseHighlight } from '@/lib/highlights';

// ============ Types ============

interface ReadingViewProps {
  reference: BibleReference;
  onNavigate: (ref: BibleReference) => void;
  onAskSophia: (verse: BibleVerse, reference: BibleReference) => void;
  compact?: boolean;
}

interface LoadedChapter {
  book: string;
  chapter: number;
  passage: BiblePassage;
  highlights: VerseHighlight[];
}

interface SelectedVerse {
  chapter: number;
  verseNumber: number;
}

type FontSize = 'sm' | 'base' | 'lg' | 'xl';

const FONT_SIZES: Record<FontSize, string> = {
  sm: 'text-sm leading-7',
  base: 'text-base leading-8',
  lg: 'text-lg leading-9',
  xl: 'text-xl leading-10',
};

const FONT_SIZE_ORDER: FontSize[] = ['sm', 'base', 'lg', 'xl'];

// ============ Chapter Block ============

function ChapterBlock({
  chapter,
  isFirst,
  selectedVerse,
  onVerseSelect,
}: {
  chapter: LoadedChapter;
  isFirst: boolean;
  selectedVerse: SelectedVerse | null;
  onVerseSelect: (chapter: number, verseNumber: number) => void;
}) {
  const { passage } = chapter;

  const getHighlight = (verseNumber: number) =>
    chapter.highlights.find(h => h.verse === verseNumber);

  const isSelected = (verseNumber: number) =>
    selectedVerse !== null &&
    selectedVerse.chapter === chapter.chapter &&
    selectedVerse.verseNumber === verseNumber;

  const hasBlocks = passage.blocks && passage.blocks.length > 0;

  return (
    <div data-chapter={chapter.chapter}>
      {/* Book title for chapter 1 */}
      {chapter.chapter === 1 && (
        <h2 className="text-center uppercase tracking-[0.2em] text-sm font-medium text-foreground/50 mb-8 mt-2 font-sans">
          {chapter.book}
        </h2>
      )}

      {/* Chapter divider for chapters after the first loaded */}
      {!isFirst && chapter.chapter > 1 && (
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-border/20" />
          <span className="text-xs text-foreground/30 font-sans uppercase tracking-widest">
            Chapter {chapter.chapter}
          </span>
          <div className="flex-1 h-px bg-border/20" />
        </div>
      )}

      {hasBlocks ? (
        passage.blocks!.map((block, blockIndex) => {
          if (block.type === 'heading') {
            return <SectionHeading key={`${chapter.chapter}-h-${blockIndex}`} text={block.text} />;
          }

          return (
            <p
              key={`${chapter.chapter}-p-${blockIndex}`}
              className={`bible-paragraph ${block.startsChapter ? 'bible-paragraph-first' : ''}`}
            >
              {block.verses.map((verse, verseIndex) => {
                const isDropCap = block.startsChapter && verseIndex === 0;
                return (
                  <VerseText
                    key={`${chapter.chapter}-${verse.number}`}
                    verse={verse}
                    highlight={getHighlight(verse.number)}
                    isSelected={isSelected(verse.number)}
                    onSelect={() => onVerseSelect(chapter.chapter, verse.number)}
                    isDropCap={isDropCap}
                  />
                );
              })}
            </p>
          );
        })
      ) : (
        passage.verses.map(verse => (
          <VerseText
            key={`${chapter.chapter}-${verse.number}`}
            verse={verse}
            highlight={getHighlight(verse.number)}
            isSelected={isSelected(verse.number)}
            onSelect={() => onVerseSelect(chapter.chapter, verse.number)}
          />
        ))
      )}
    </div>
  );
}

// ============ Compact Navigator ============

function CompactNavigator({
  reference,
  onSelect,
}: {
  reference: BibleReference;
  onSelect: (ref: BibleReference) => void;
}) {
  const currentBook = getBook(reference.book);
  const [activeTab, setActiveTab] = useState<'OT' | 'NT'>(
    () => currentBook?.testament ?? 'OT'
  );
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const books = activeTab === 'OT' ? OT_BOOKS : NT_BOOKS;

  const handleBookClick = (bookName: string, chapters: number) => {
    if (chapters === 1) {
      onSelect({ book: bookName, chapter: 1 });
      return;
    }
    setExpandedBook(prev => (prev === bookName ? null : bookName));
  };

  const handleChapterClick = (bookName: string, chapter: number) => {
    onSelect({ book: bookName, chapter });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-30 bg-background/95 backdrop-blur-sm flex flex-col border-b border-border/30"
    >
      {/* OT / NT tabs */}
      <div className="flex border-b border-border/20">
        <button
          onClick={() => { setActiveTab('OT'); setExpandedBook(null); }}
          className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
            activeTab === 'OT'
              ? 'text-foreground border-b-2 border-foreground/60'
              : 'text-foreground/40 hover:text-foreground/60'
          }`}
        >
          Old Testament
        </button>
        <button
          onClick={() => { setActiveTab('NT'); setExpandedBook(null); }}
          className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
            activeTab === 'NT'
              ? 'text-foreground border-b-2 border-foreground/60'
              : 'text-foreground/40 hover:text-foreground/60'
          }`}
        >
          New Testament
        </button>
      </div>

      {/* Book list */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {books.map(b => {
          const isExpanded = expandedBook === b.name;
          const isCurrent = b.name === reference.book;

          return (
            <div key={b.name}>
              <button
                onClick={() => handleBookClick(b.name, b.chapters)}
                className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                  isCurrent
                    ? 'text-foreground font-medium'
                    : 'text-foreground/60 hover:text-foreground/80 hover:bg-foreground/[0.02]'
                }`}
              >
                {b.name}
              </button>

              {/* Chapter grid */}
              <AnimatePresence>
                {isExpanded && b.chapters > 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-6 gap-1 px-5 pb-3">
                      {Array.from({ length: b.chapters }, (_, i) => i + 1).map(ch => {
                        const isCurrentChapter = isCurrent && ch === reference.chapter;
                        return (
                          <button
                            key={ch}
                            onClick={() => handleChapterClick(b.name, ch)}
                            className={`py-1.5 text-sm rounded-md transition-colors ${
                              isCurrentChapter
                                ? 'bg-hl-green/15 text-hl-green font-medium'
                                : 'text-foreground/50 hover:bg-foreground/[0.04] hover:text-foreground/70'
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ============ Main Component ============

export function ReadingView({ reference, onNavigate, onAskSophia, compact }: ReadingViewProps) {
  const [chapters, setChapters] = useState<LoadedChapter[]>([]);
  const [visibleChapter, setVisibleChapter] = useState(reference.chapter);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<SelectedVerse | null>(null);
  const [showNavigator, setShowNavigator] = useState(false);
  const [barTop, setBarTop] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef({ above: false, below: false });
  const scrollRestoreRef = useRef<{ scrollHeight: number; scrollTop: number } | null>(null);
  const lastReferenceRef = useRef(reference);

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('wl-bible-fontsize') as FontSize) || 'base';
  });

  const bookData = getBook(reference.book);
  const totalChapters = bookData?.chapters ?? 1;

  // ---- Helpers ----

  const loadChapter = useCallback(async (book: string, chapter: number): Promise<LoadedChapter> => {
    const passage = await fetchPassage({ book, chapter });
    const highlights = getHighlightsForChapter(book, chapter);
    return { book, chapter, passage, highlights };
  }, []);

  // ---- Initial load / reference change ----

  useEffect(() => {
    let cancelled = false;

    const currentBook = chapters[0]?.book;
    const isSameBook = reference.book === currentBook;

    // Same book, chapter already loaded → scroll to it
    if (isSameBook) {
      const existing = chapters.find(c => c.chapter === reference.chapter);
      if (existing) {
        // Scroll to that chapter
        requestAnimationFrame(() => {
          const el = scrollRef.current?.querySelector(`[data-chapter="${reference.chapter}"]`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        lastReferenceRef.current = reference;
        return;
      }
    }

    // Different book or chapter not loaded → full reset
    setChapters([]);
    setInitialLoading(true);
    setError(null);
    setSelectedVerse(null);
    setVisibleChapter(reference.chapter);

    loadChapter(reference.book, reference.chapter)
      .then(loaded => {
        if (cancelled) return;
        setChapters([loaded]);
        setInitialLoading(false);
        addToReadingHistory(reference.book, reference.chapter);
        lastReferenceRef.current = reference;
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setInitialLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference.book, reference.chapter, loadChapter]);

  // ---- Pre-fetch next chapter after initial load ----

  useEffect(() => {
    if (chapters.length !== 1 || initialLoading) return;
    const ch = chapters[0];
    if (ch.chapter < totalChapters) {
      loadChapter(ch.book, ch.chapter + 1).then(next => {
        setChapters(prev => {
          if (prev.find(c => c.chapter === next.chapter)) return prev;
          return [...prev, next];
        });
      });
    }
  }, [chapters.length, initialLoading, totalChapters, loadChapter, chapters]);

  // ---- Load next chapter (scroll down) ----

  const loadNextChapter = useCallback(async () => {
    if (loadingRef.current.below || chapters.length === 0) return;
    const last = chapters[chapters.length - 1];
    if (last.chapter >= totalChapters) return;

    loadingRef.current.below = true;
    try {
      const next = await loadChapter(last.book, last.chapter + 1);
      setChapters(prev => {
        if (prev.find(c => c.chapter === next.chapter)) return prev;
        return [...prev, next];
      });
    } finally {
      loadingRef.current.below = false;
    }
  }, [chapters, totalChapters, loadChapter]);

  // ---- Load previous chapter (scroll up) ----

  const loadPreviousChapter = useCallback(async () => {
    if (loadingRef.current.above || chapters.length === 0) return;
    const first = chapters[0];
    if (first.chapter <= 1) return;

    loadingRef.current.above = true;
    try {
      const prev = await loadChapter(first.book, first.chapter - 1);

      // Store scroll position before prepend
      if (scrollRef.current) {
        scrollRestoreRef.current = {
          scrollHeight: scrollRef.current.scrollHeight,
          scrollTop: scrollRef.current.scrollTop,
        };
      }

      setChapters(prevChs => {
        if (prevChs.find(c => c.chapter === prev.chapter)) return prevChs;
        return [prev, ...prevChs];
      });
    } finally {
      loadingRef.current.above = false;
    }
  }, [chapters, loadChapter]);

  // ---- Scroll position restoration after prepend ----

  useLayoutEffect(() => {
    if (scrollRestoreRef.current && scrollRef.current) {
      const { scrollHeight: before, scrollTop } = scrollRestoreRef.current;
      const after = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTop = scrollTop + (after - before);
      scrollRestoreRef.current = null;
    }
  }, [chapters]);

  // ---- Sentinel IntersectionObserver (load more on scroll) ----

  useEffect(() => {
    const container = scrollRef.current;
    const topEl = topSentinelRef.current;
    const bottomEl = bottomSentinelRef.current;
    if (!container || !topEl || !bottomEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === topEl) {
            loadPreviousChapter();
          } else if (entry.target === bottomEl) {
            loadNextChapter();
          }
        }
      },
      { root: container, rootMargin: '300px 0px' }
    );

    observer.observe(topEl);
    observer.observe(bottomEl);
    return () => observer.disconnect();
  }, [loadNextChapter, loadPreviousChapter]);

  // ---- Chapter visibility observer (header tracking) ----

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || chapters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find topmost intersecting chapter
        let topChapter: number | null = null;
        let topY = Infinity;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const y = entry.boundingClientRect.top;
            if (y < topY) {
              topY = y;
              topChapter = parseInt((entry.target as HTMLElement).dataset.chapter!, 10);
            }
          }
        }
        if (topChapter !== null) {
          setVisibleChapter(topChapter);
        }
      },
      { root: container, rootMargin: '0px 0px -85% 0px', threshold: 0 }
    );

    const chapterDivs = container.querySelectorAll('[data-chapter]');
    chapterDivs.forEach(div => observer.observe(div));

    return () => observer.disconnect();
  }, [chapters]);

  // ---- Track reading history on visible chapter change ----

  useEffect(() => {
    if (chapters.length > 0) {
      addToReadingHistory(reference.book, visibleChapter);
    }
  }, [visibleChapter, reference.book, chapters.length]);

  // ---- Font size ----

  const cycleFontSize = () => {
    const idx = FONT_SIZE_ORDER.indexOf(fontSize);
    const next = FONT_SIZE_ORDER[(idx + 1) % FONT_SIZE_ORDER.length];
    setFontSize(next);
    localStorage.setItem('wl-bible-fontsize', next);
  };

  // ---- Navigation (header buttons) ----

  const canGoPrev = visibleChapter > 1;
  const canGoNext = visibleChapter < totalChapters;

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    const target = visibleChapter - 1;
    const existing = chapters.find(c => c.chapter === target);
    if (existing && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-chapter="${target}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate({ book: reference.book, chapter: target });
    }
  }, [canGoPrev, visibleChapter, chapters, reference.book, onNavigate]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    const target = visibleChapter + 1;
    const existing = chapters.find(c => c.chapter === target);
    if (existing && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-chapter="${target}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate({ book: reference.book, chapter: target });
    }
  }, [canGoNext, visibleChapter, chapters, reference.book, onNavigate]);

  const handleCompactNavigate = (ref: BibleReference) => {
    setShowNavigator(false);
    onNavigate(ref);
  };

  // ---- Verse selection ----

  const handleVerseSelect = useCallback((chapter: number, verseNumber: number) => {
    setSelectedVerse(prev => {
      if (prev && prev.chapter === chapter && prev.verseNumber === verseNumber) {
        return null;
      }
      return { chapter, verseNumber };
    });
  }, []);

  // ---- Highlight bar positioning ----

  useLayoutEffect(() => {
    if (!selectedVerse || !scrollRef.current) {
      setBarTop(null);
      return;
    }
    const container = scrollRef.current;
    const verseEl = container.querySelector(
      `[data-chapter="${selectedVerse.chapter}"] [data-verse="${selectedVerse.verseNumber}"]`
    );
    if (!verseEl) {
      setBarTop(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const verseRect = verseEl.getBoundingClientRect();
    setBarTop(verseRect.bottom - containerRect.top + container.scrollTop + 8);
  }, [selectedVerse, chapters]);

  // ---- Selected verse data lookup ----

  const selectedChapterData = selectedVerse
    ? chapters.find(c => c.chapter === selectedVerse.chapter)
    : null;

  const selectedVerseData = selectedChapterData
    ? selectedChapterData.passage.verses.find(v => v.number === selectedVerse!.verseNumber)
    : null;

  // ---- Refresh highlights for a specific chapter ----

  const refreshHighlightsForChapter = useCallback((chapter: number) => {
    setChapters(prev => prev.map(ch => {
      if (ch.chapter === chapter) {
        return { ...ch, highlights: getHighlightsForChapter(ch.book, ch.chapter) };
      }
      return ch;
    }));
  }, []);

  // ---- End of book detection ----

  const lastLoadedChapter = chapters[chapters.length - 1]?.chapter ?? 0;
  const isEndOfBook = lastLoadedChapter >= totalChapters;
  const firstLoadedChapter = chapters[0]?.chapter ?? 1;

  // ---- Copyright (from first loaded chapter) ----

  const copyright = chapters[0]?.passage.copyright;

  return (
    <div className="flex flex-col h-full">
      {/* Chapter header */}
      {compact ? (
        <button
          onClick={() => setShowNavigator(prev => !prev)}
          className="flex items-center justify-center gap-1.5 px-6 py-3 border-b border-border/30 hover:bg-foreground/[0.02] transition-colors"
        >
          <h2 className="font-serif text-base font-semibold text-foreground/70">
            {reference.book} {visibleChapter}
          </h2>
          <ChevronDown
            className={`w-4 h-4 text-foreground/40 transition-transform duration-200 ${
              showNavigator ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : (
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
              {reference.book} {visibleChapter}
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
      )}

      {/* Content */}
      <div className="flex-1 min-h-0 relative">
        {/* Compact navigator dropdown — overlays content */}
        <AnimatePresence>
          {compact && showNavigator && (
            <CompactNavigator
              reference={{ book: reference.book, chapter: visibleChapter }}
              onSelect={handleCompactNavigate}
            />
          )}
        </AnimatePresence>

        <div ref={scrollRef} className="h-full overflow-y-auto px-6 py-6 relative">
          {initialLoading ? (
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
                  setInitialLoading(true);
                  setError(null);
                  loadChapter(reference.book, reference.chapter)
                    .then(loaded => {
                      setChapters([loaded]);
                      setInitialLoading(false);
                    })
                    .catch(err => {
                      setError(err.message);
                      setInitialLoading(false);
                    });
                }}
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className={`max-w-[680px] mx-auto font-serif ${FONT_SIZES[fontSize]}`}>
              {/* Top sentinel */}
              <div ref={topSentinelRef} className="h-px" />

              {/* Beginning of book indicator */}
              {firstLoadedChapter <= 1 && chapters.length > 0 && (
                <div className="h-0" />
              )}

              {/* Chapters */}
              {chapters.map((ch, idx) => (
                <ChapterBlock
                  key={`${ch.book}-${ch.chapter}`}
                  chapter={ch}
                  isFirst={idx === 0}
                  selectedVerse={selectedVerse}
                  onVerseSelect={handleVerseSelect}
                />
              ))}

              {/* End of book indicator */}
              {isEndOfBook && chapters.length > 0 && (
                <div className="text-center py-12 text-foreground/25 text-sm font-sans italic">
                  End of {reference.book}
                </div>
              )}

              {/* Copyright */}
              {copyright && (
                <p className="mt-4 mb-8 text-xs text-muted-foreground/40 font-sans text-center">
                  {copyright}
                </p>
              )}

              {/* Bottom sentinel */}
              <div ref={bottomSentinelRef} className="h-px" />
            </div>
          )}

          {/* Highlight bar — positioned below selected verse */}
          <AnimatePresence>
            {selectedVerseData && selectedVerse && barTop !== null && (
              <div
                className="absolute left-1/2 -translate-x-1/2 z-50"
                style={{ top: barTop }}
              >
                <HighlightBar
                  book={reference.book}
                  chapter={selectedVerse.chapter}
                  selectedVerse={selectedVerseData}
                  onClose={() => setSelectedVerse(null)}
                  onAskSophia={(verse) => onAskSophia(verse, { book: reference.book, chapter: selectedVerse.chapter })}
                  onHighlightChange={() => refreshHighlightsForChapter(selectedVerse.chapter)}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
