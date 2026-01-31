import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Compass,
  Stars,
  MessageCircle,
  Clock,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  searchScripture,
  searchCurriculum,
  searchInsights,
  getRecentSearches,
  addRecentSearch,
  type SearchResult,
} from '@/lib/search';
import {
  parseReference,
  fetchPassage,
  searchBible,
  formatReference,
  type BibleReference,
  type BibleVerse,
  type BibleSearchResult,
} from '@/lib/bibleApi';
import { useConversations } from '@/hooks/useConversations';

// ============ Debounce Hook ============

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ============ Reference + Keyword Extraction ============

function extractReferenceAndKeywords(query: string): {
  ref: BibleReference | null;
  keywords: string;
} {
  const trimmed = query.trim();
  if (!trimmed) return { ref: null, keywords: '' };

  // Try the full query first, then progressively shorter prefixes
  const words = trimmed.split(/\s+/);
  for (let i = words.length; i >= 2; i--) {
    const prefix = words.slice(0, i).join(' ');
    const ref = parseReference(prefix);
    if (ref) {
      return { ref, keywords: words.slice(i).join(' ').trim() };
    }
  }

  return { ref: null, keywords: trimmed };
}

// ============ Category Config ============

const CATEGORY_CONFIG = {
  scripture: {
    icon: BookOpen,
    label: 'Scripture',
    color: 'text-wl-olive dark:text-wl-olive-300',
  },
  curriculum: {
    icon: Compass,
    label: 'Curriculum',
    color: 'text-wl-olive dark:text-wl-olive-300',
  },
  insight: {
    icon: Stars,
    label: 'Insights',
    color: 'text-wl-sage dark:text-wl-olive-300',
  },
  conversation: {
    icon: MessageCircle,
    label: 'Conversations',
    color: 'text-wl-olive dark:text-wl-olive-300',
  },
} as const;

const SUGGESTIONS = ['Genesis', 'Grace', 'Prayer', 'Covenant'];

// ============ Component ============

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { conversations } = useConversations();

  const debouncedQuery = useDebounce(query, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const recentSearches = useMemo(() => getRecentSearches(), [isOpen]);

  // Passage preview state
  const [passagePreview, setPassagePreview] = useState<BibleVerse[] | null>(null);
  const [passageRef, setPassageRef] = useState<BibleReference | null>(null);
  const [passageKeywords, setPassageKeywords] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  // Reset state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setExpandedCategories(new Set());
      setPassagePreview(null);
      setPassageRef(null);
      setPassageKeywords('');
      setPreviewLoading(false);
      setVerseResults([]);
      setVerseSearchLoading(false);
    }
  }, [isOpen]);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock background scroll when overlay is open
  useEffect(() => {
    if (!isOpen) return;
    const scrollParent = document.querySelector('[data-dashboard-scroll]') as HTMLElement | null;
    if (scrollParent) {
      scrollParent.style.overflow = 'hidden';
      return () => { scrollParent.style.overflow = ''; };
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch passage preview when query looks like a Bible reference
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setPassagePreview(null);
      setPassageRef(null);
      setPassageKeywords('');
      setPreviewLoading(false);
      return;
    }

    const { ref, keywords } = extractReferenceAndKeywords(debouncedQuery);

    if (!ref) {
      setPassagePreview(null);
      setPassageRef(null);
      setPassageKeywords('');
      setPreviewLoading(false);
      return;
    }

    let cancelled = false;
    setPreviewLoading(true);
    setPassageRef(ref);
    setPassageKeywords(keywords);

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setPreviewLoading(false);
        setPassagePreview(null);
      }
    }, 5000);

    fetchPassage(ref)
      .then((passage) => {
        if (!cancelled) {
          clearTimeout(timeout);
          setPassagePreview(passage.verses);
          setPreviewLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearTimeout(timeout);
          setPassagePreview(null);
          setPreviewLoading(false);
        }
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [debouncedQuery]);

  // Full-text Bible verse search (for keyword queries that aren't references)
  const [verseResults, setVerseResults] = useState<BibleSearchResult[]>([]);
  const [verseSearchLoading, setVerseSearchLoading] = useState(false);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed || trimmed.length < 3) {
      setVerseResults([]);
      setVerseSearchLoading(false);
      return;
    }

    // Skip if the query is a Bible reference (passage preview handles that)
    const { ref } = extractReferenceAndKeywords(trimmed);
    if (ref) {
      setVerseResults([]);
      setVerseSearchLoading(false);
      return;
    }

    let cancelled = false;
    setVerseSearchLoading(true);

    searchBible(trimmed)
      .then((results) => {
        if (!cancelled) {
          setVerseResults(results);
          setVerseSearchLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVerseResults([]);
          setVerseSearchLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Search all sources
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return null;

    const q = debouncedQuery.toLowerCase().trim();

    const conversationResults: SearchResult[] = conversations
      .filter((c) => c.title.toLowerCase().includes(q))
      .map((c) => ({
        type: 'conversation' as const,
        title: c.title,
        subtitle: new Date(c.updatedAt).toLocaleDateString(),
        id: c.id,
        navigateTo: '/chat',
      }));

    return {
      scripture: searchScripture(debouncedQuery),
      curriculum: searchCurriculum(debouncedQuery),
      insight: searchInsights(debouncedQuery),
      conversation: conversationResults,
    };
  }, [debouncedQuery, conversations]);

  const totalCount = results
    ? results.scripture.length +
      results.curriculum.length +
      results.insight.length +
      results.conversation.length
    : 0;

  const hasResults = totalCount > 0 || verseResults.length > 0 || verseSearchLoading;
  const hasPassagePreview = passageRef && (previewLoading || passagePreview);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (query.trim()) addRecentSearch(query.trim());
      onClose();
      navigate(
        result.navigateTo,
        result.navigateState ? { state: result.navigateState } : undefined,
      );
    },
    [query, navigate, onClose],
  );

  const handlePassageNavigate = useCallback(() => {
    if (!passageRef) return;
    if (query.trim()) addRecentSearch(query.trim());
    onClose();
    navigate('/bible', {
      state: { initialReference: passageRef },
    });
  }, [passageRef, query, navigate, onClose]);

  const handleRecentSearch = useCallback((term: string) => {
    setQuery(term);
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 z-20 backdrop-blur-lg bg-background/70 dark:bg-wl-earth-800/70 flex flex-col overflow-hidden"
        >
          {/* Match dashboard layout: same max-width, padding, and top spacing */}
          <div className="flex-1 flex flex-col min-h-0 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 md:pt-6">
            {/* Search input — same position as the dashboard trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="flex items-center justify-between mb-5 md:mb-6 px-1"
            >
              <div className="flex items-center gap-2 flex-1 mr-3">
                <Search className="w-4 h-4 flex-shrink-0 text-foreground/50" />
                <label className="sr-only" htmlFor="search-overlay-input">
                  Search
                </label>
                <input
                  id="search-overlay-input"
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-foreground/35"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-foreground/30 hover:text-foreground/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-sm text-foreground/45 hover:text-foreground/70 transition-colors"
              >
                Cancel
              </button>
            </motion.div>

            {/* Results area */}
            <div className="flex-1 overflow-y-auto min-h-0 px-1">
              {!debouncedQuery.trim() ? (
                <EmptyState
                  recentSearches={recentSearches}
                  onRecentClick={handleRecentSearch}
                />
              ) : hasResults || hasPassagePreview ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 pb-6"
                >
                  {/* Passage preview — shown when query is a Bible reference */}
                  {hasPassagePreview && (
                    <PassagePreview
                      reference={passageRef!}
                      verses={passagePreview}
                      keywords={passageKeywords}
                      loading={previewLoading}
                      onNavigate={handlePassageNavigate}
                    />
                  )}

                  {/* Category results */}
                  {hasResults && (
                    <>
                      {/* Verse search results — keyword matches across the Bible */}
                      {(verseResults.length > 0 || verseSearchLoading) && !hasPassagePreview && (
                        <VerseSearchResults
                          verses={verseResults}
                          loading={verseSearchLoading}
                          keyword={debouncedQuery.trim()}
                          expanded={expandedCategories.has('verse-search')}
                          onToggleExpand={() => toggleCategory('verse-search')}
                          onNavigate={(ref) => {
                            if (query.trim()) addRecentSearch(query.trim());
                            onClose();
                            navigate('/bible', { state: { initialReference: ref } });
                          }}
                        />
                      )}

                      {(
                        ['scripture', 'curriculum', 'insight', 'conversation'] as const
                      ).map((cat) => {
                        const items = results?.[cat];
                        if (!items || items.length === 0) return null;

                        // Skip book-level scripture if verse results or passage preview are showing
                        if (cat === 'scripture' && (verseResults.length > 0 || verseSearchLoading || hasPassagePreview)) return null;

                        const config = CATEGORY_CONFIG[cat];
                        const isExpanded = expandedCategories.has(cat);
                        const visibleItems = isExpanded
                          ? items
                          : items.slice(0, 3);

                        return (
                          <div key={cat}>
                            <div className="flex items-center gap-2 mb-2">
                              <config.icon
                                className={`w-4 h-4 ${config.color}`}
                              />
                              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
                                {config.label}
                              </span>
                              <span className="text-[10px] text-foreground/25 ml-1">
                                {items.length}
                              </span>
                            </div>

                            <div className="space-y-1">
                              {visibleItems.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleSelect(item)}
                                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-foreground/[0.06] focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-colors group"
                                >
                                  <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                    {item.title}
                                  </p>
                                  {item.subtitle && (
                                    <p className="text-[11px] text-foreground/35 line-clamp-1 mt-0.5">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </button>
                              ))}
                            </div>

                            {items.length > 3 && !isExpanded && (
                              <button
                                onClick={() => toggleCategory(cat)}
                                className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors mt-1 px-3 py-1"
                              >
                                Show all {items.length} results
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <Search className="w-8 h-8 text-foreground/15 mb-3" />
                  <p className="text-sm text-foreground/40">
                    No results for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                  <p className="text-xs text-foreground/25 mt-1">
                    Try a book name, topic, or lesson title
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ Passage Preview ============

function PassagePreview({
  reference,
  verses,
  keywords,
  loading,
  onNavigate,
}: {
  reference: BibleReference;
  verses: BibleVerse[] | null;
  keywords: string;
  loading: boolean;
  onNavigate: () => void;
}) {
  const refLabel = formatReference(reference);

  // Pick which verses to show: keyword-matching ones, or first 4
  const displayVerses = useMemo(() => {
    if (!verses) return [];

    const kw = keywords.toLowerCase().trim();

    if (kw) {
      // Show verses that contain the keyword(s)
      const matching = verses.filter((v) =>
        v.text.toLowerCase().includes(kw),
      );
      if (matching.length > 0) return matching.slice(0, 4);
    }

    // If specific verse requested, show from that verse
    if (reference.verse) {
      const startIdx = verses.findIndex((v) => v.number === reference.verse);
      if (startIdx >= 0) {
        const endIdx = reference.endVerse
          ? verses.findIndex((v) => v.number === reference.endVerse)
          : startIdx;
        return verses.slice(startIdx, (endIdx >= 0 ? endIdx : startIdx) + 1).slice(0, 4);
      }
    }

    // Default: first 4 verses
    return verses.slice(0, 4);
  }, [verses, keywords, reference.verse, reference.endVerse]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-wl-olive dark:text-wl-olive-300" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
          Passage
        </span>
      </div>

      <button
        onClick={onNavigate}
        className="w-full text-left rounded-xl px-4 py-4 bg-wl-stone-50 dark:bg-wl-earth-800 hover:bg-wl-stone-100 dark:hover:bg-wl-earth-700 focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-colors group"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground/85 dark:text-wl-olive-200">
            {refLabel}
          </h4>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors flex-shrink-0" />
        </div>

        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-full" />
            <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-[90%]" />
            <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-[75%]" />
          </div>
        ) : displayVerses.length > 0 ? (
          <p className="text-[13px] leading-relaxed text-foreground/55 dark:text-wl-olive-300/80 line-clamp-4">
            {displayVerses.map((v) => (
              <span key={v.number}>
                <sup className="text-[9px] text-foreground/30 dark:text-wl-olive-300/40 mr-0.5">
                  {v.number}
                </sup>
                {keywords ? (
                  <HighlightedText text={v.text} keyword={keywords} />
                ) : (
                  v.text
                )}{' '}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-[13px] text-foreground/40 italic">
            Tap to read this passage
          </p>
        )}
      </button>
    </div>
  );
}

// ============ Keyword Highlighting ============

function HighlightedText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <>{text}</>;

  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-wl-sage/30 dark:bg-wl-olive-300/20 text-foreground/80 dark:text-wl-olive-200 rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// ============ Verse Search Results ============

function VerseSearchResults({
  verses,
  loading,
  keyword,
  expanded,
  onToggleExpand,
  onNavigate,
}: {
  verses: BibleSearchResult[];
  loading: boolean;
  keyword: string;
  expanded: boolean;
  onToggleExpand: () => void;
  onNavigate: (ref: { book: string; chapter: number }) => void;
}) {
  const visibleVerses = expanded ? verses : verses.slice(0, 3);

  const handleVerseClick = (reference: string) => {
    const ref = parseReference(reference);
    if (ref) {
      onNavigate({ book: ref.book, chapter: ref.chapter });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-wl-olive dark:text-wl-olive-300" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
          Scripture
        </span>
        {verses.length > 0 && (
          <span className="text-[10px] text-foreground/25 ml-1">
            {verses.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-2 px-3 py-2">
          <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-[40%] animate-pulse" />
          <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-full animate-pulse" />
          <div className="h-3 bg-foreground/[0.06] dark:bg-foreground/[0.12] rounded w-[85%] animate-pulse" />
        </div>
      ) : (
        <>
          <div className="space-y-1">
            {visibleVerses.map((verse, i) => (
              <button
                key={`${verse.reference}-${i}`}
                onClick={() => handleVerseClick(verse.reference)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-foreground/[0.06] focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-colors group"
              >
                <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {verse.reference}
                </p>
                <p className="text-[11px] text-foreground/40 line-clamp-2 mt-0.5 leading-snug">
                  <HighlightedText text={verse.text} keyword={keyword} />
                </p>
              </button>
            ))}
          </div>

          {verses.length > 3 && !expanded && (
            <button
              onClick={onToggleExpand}
              className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors mt-1 px-3 py-1"
            >
              Show all {verses.length} results
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ============ Empty State ============

function EmptyState({
  recentSearches,
  onRecentClick,
}: {
  recentSearches: string[];
  onRecentClick: (term: string) => void;
}) {
  return (
    <div className="py-4">
      {recentSearches.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/35 mb-3">
            Recent Searches
          </p>
          <div className="space-y-1">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => onRecentClick(term)}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg hover:bg-foreground/[0.04] focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-foreground/25" />
                <span className="text-sm text-foreground/60">{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/35 mb-3">
          Try Searching
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onRecentClick(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/70 focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
