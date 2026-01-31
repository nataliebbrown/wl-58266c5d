import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search as SearchIcon,
  BookOpen,
  Compass,
  Stars,
  MessageCircle,
  Clock,
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

// ============ Search Page ============

export default function Search() {
  const [query, setQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { conversations } = useConversations();

  const debouncedQuery = useDebounce(query, 300);
  const recentSearches = useMemo(() => getRecentSearches(), []);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search all sources
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return null;

    const q = debouncedQuery.toLowerCase().trim();

    const scriptureResults = searchScripture(debouncedQuery);
    const curriculumResults = searchCurriculum(debouncedQuery);
    const insightResults = searchInsights(debouncedQuery);

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
      scripture: scriptureResults,
      curriculum: curriculumResults,
      insight: insightResults,
      conversation: conversationResults,
    };
  }, [debouncedQuery, conversations]);

  const totalCount = results
    ? results.scripture.length +
      results.curriculum.length +
      results.insight.length +
      results.conversation.length
    : 0;

  const hasResults = totalCount > 0;

  const handleSelect = useCallback(
    (result: SearchResult) => {
      addRecentSearch(query);
      navigate(
        result.navigateTo,
        result.navigateState ? { state: result.navigateState } : undefined,
      );
    },
    [query, navigate],
  );

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
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-shrink-0 text-foreground/40 hover:text-foreground/70 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-2 rounded-xl bg-foreground/[0.04] px-4 py-3">
            <SearchIcon className="w-4 h-4 text-foreground/35 flex-shrink-0" />
            <label className="sr-only" htmlFor="global-search">
              Search
            </label>
            <input
              id="global-search"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Scripture, lessons, insights..."
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
        </div>

        {/* Results or empty state */}
        {!debouncedQuery.trim() ? (
          <EmptyState
            recentSearches={recentSearches}
            onRecentClick={handleRecentSearch}
          />
        ) : hasResults ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xs text-foreground/35 px-1">
              {totalCount} result{totalCount !== 1 ? 's' : ''}
            </p>

            {(
              ['scripture', 'curriculum', 'insight', 'conversation'] as const
            ).map((cat) => {
              const items = results![cat];
              if (items.length === 0) return null;

              const config = CATEGORY_CONFIG[cat];
              const isExpanded = expandedCategories.has(cat);
              const visibleItems = isExpanded ? items : items.slice(0, 3);

              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <config.icon className={`w-4 h-4 ${config.color}`} />
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
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
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-foreground/[0.04] transition-colors group"
                      >
                        <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="text-[12px] text-foreground/35 line-clamp-1 mt-0.5">
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <SearchIcon className="w-8 h-8 text-foreground/15 mb-3" />
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
  const suggestions = ['Genesis', 'Grace', 'Prayer', 'Covenant'];

  return (
    <div className="py-12">
      {recentSearches.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/35 mb-3 px-1">
            Recent Searches
          </p>
          <div className="space-y-1">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => onRecentClick(term)}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg hover:bg-foreground/[0.04] transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-foreground/25" />
                <span className="text-sm text-foreground/60">{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/35 mb-3 px-1">
          Try Searching
        </p>
        <div className="flex flex-wrap gap-2 px-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onRecentClick(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/70 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
