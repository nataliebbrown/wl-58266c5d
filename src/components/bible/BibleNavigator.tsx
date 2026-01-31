import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  OT_BOOKS,
  NT_BOOKS,
  type BibleBook,
  type BibleReference,
  getRecentBooks,
  getBook,
  parseReference,
} from '@/lib/bibleApi';

// ============ Types ============

interface BibleNavigatorProps {
  onSelect: (ref: BibleReference) => void;
  currentRef?: BibleReference | null;
}

type NavStep = 'books' | 'chapters';
type Testament = 'OT' | 'NT';

// ============ Component ============

export function BibleNavigator({ onSelect, currentRef }: BibleNavigatorProps) {
  const [step, setStep] = useState<NavStep>('books');
  const [testament, setTestament] = useState<Testament>('NT');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBookScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  }, []);

  const recentBooks = useMemo(() => getRecentBooks(), []);

  const books = testament === 'OT' ? OT_BOOKS : NT_BOOKS;

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const q = searchQuery.toLowerCase();
    return books.filter(
      b =>
        b.name.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q)
    );
  }, [books, searchQuery]);

  // Handle search submit (e.g. "John 3:16")
  const handleSearchSubmit = () => {
    const ref = parseReference(searchQuery.trim());
    if (ref) {
      onSelect(ref);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleBookSelect = (book: BibleBook) => {
    if (book.chapters === 1) {
      // Single-chapter books go directly
      onSelect({ book: book.name, chapter: 1 });
    } else {
      setSelectedBook(book);
      setStep('chapters');
    }
  };

  const handleChapterSelect = (chapter: number) => {
    if (!selectedBook) return;
    onSelect({ book: selectedBook.name, chapter });
    setStep('books');
    setSelectedBook(null);
  };

  const handleBack = () => {
    setStep('books');
    setSelectedBook(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb / Search */}
      <div className="relative flex items-center gap-1 px-4 py-3 text-sm border-b border-border/30 overflow-hidden">
        <AnimatePresence mode="wait">
          {showSearch ? (
            <motion.form
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1 flex items-center gap-2"
              onSubmit={e => {
                e.preventDefault();
                handleSearchSubmit();
              }}
            >
              <Search className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search (e.g. John 3:16, Romans 8)"
                className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
                onClick={() => { setShowSearch(false); setSearchQuery(''); }}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="breadcrumb"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1 flex items-center gap-1"
            >
              {currentRef && (
                <span className="text-muted-foreground/60 mr-2 flex items-center gap-1">
                  <span className="font-medium text-foreground/80">{currentRef.book}</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="font-medium text-foreground/80">Chapter {currentRef.chapter}</span>
                </span>
              )}
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setShowSearch(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {step === 'books' ? (
            <motion.div
              key="books"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 min-h-0"
            >
              {/* Scrollable area */}
              <div className="flex-1 overflow-y-auto" onScroll={handleBookScroll}>
                {/* Sticky header: Recent + Toggle */}
                <div
                  className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm transition-shadow duration-200"
                  style={{ boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none' }}
                >
                  {/* Recent books */}
                  {recentBooks.length > 0 && !searchQuery && (
                    <div className="px-4 py-3 border-b border-border/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground/50" />
                        <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                          Recent
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentBooks.map(name => {
                          const book = getBook(name);
                          if (!book) return null;
                          return (
                            <button
                              key={name}
                              onClick={() => handleBookSelect(book)}
                              className="px-3 py-1.5 text-sm rounded-full bg-card/60 dark:bg-[#2E2E28] border border-border/30 dark:border-[#A5A597]/15 hover:bg-card/90 dark:hover:bg-[#35352F] hover:border-[#87A96B]/30 dark:hover:border-[#A5A597]/30 transition-colors"
                            >
                              {name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Testament toggle */}
                  {!searchQuery && (
                    <div className="relative flex py-2 px-4 bg-foreground/[0.06]">
                      {/* Sliding indicator */}
                      <motion.div
                        className="absolute top-2 bottom-2 rounded-md bg-white dark:bg-[#2E2E28] shadow-sm dark:shadow-none"
                        style={{ width: 'calc(50% - 20px)', left: 16 }}
                        animate={{ x: testament === 'OT' ? 0 : 'calc(100% + 8px)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                      <button
                        onClick={() => setTestament('OT')}
                        className={`relative z-10 flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          testament === 'OT'
                            ? 'text-foreground/80'
                            : 'text-muted-foreground/50 hover:text-foreground/70'
                        }`}
                      >
                        Old Testament
                      </button>
                      <button
                        onClick={() => setTestament('NT')}
                        className={`relative z-10 flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          testament === 'NT'
                            ? 'text-foreground/80'
                            : 'text-muted-foreground/50 hover:text-foreground/70'
                        }`}
                      >
                        New Testament
                      </button>
                    </div>
                  )}
                </div>

                {/* Book list */}
                <div className="px-4 py-2">
                {filteredBooks.length === 0 && searchQuery ? (
                  <p className="text-sm text-muted-foreground/50 py-4 text-center">
                    No books found
                  </p>
                ) : (
                  <div className="flex">
                    {[0, 1].map(col => (
                      <div key={col} className={`flex-1 flex flex-col gap-0.5 min-w-0 ${col === 0 ? 'pr-4' : 'pl-4'}`}>
                        {filteredBooks
                          .filter((_, i) => i % 2 === col)
                          .map(book => (
                            <button
                              key={book.name}
                              onClick={() => handleBookSelect(book)}
                              title={book.name}
                              className="px-3 py-2.5 text-sm rounded-lg hover:bg-card/60 transition-colors text-left group min-w-0 truncate text-foreground/80 group-hover:text-foreground"
                            >
                              {book.name}
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 min-h-0 overflow-y-auto"
            >
              {/* Back + book name */}
              <div className="px-4 py-3 border-b border-border/20">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back</span>
                </button>
                <h3 className="text-lg font-semibold mt-2 text-foreground">
                  {selectedBook?.name}
                </h3>
              </div>

              {/* Chapter grid */}
              <div className="px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
                  Select Chapter
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {selectedBook &&
                    Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => {
                      const isActive =
                        currentRef?.book === selectedBook.name && currentRef?.chapter === ch;
                      return (
                        <button
                          key={ch}
                          onClick={() => handleChapterSelect(ch)}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-[#87A96B] text-white'
                              : 'bg-card/40 hover:bg-card/80 text-foreground/70 hover:text-foreground'
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
