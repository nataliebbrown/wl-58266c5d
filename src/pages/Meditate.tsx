import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Wind, X } from 'lucide-react';
import { BreathPlayer } from '@/components/meditation/BreathPlayer';
import {
  MEDITATION_CATALOG,
  formatMeditationReference,
  type MeditationCategory,
} from '@/lib/meditation/catalog';
import {
  type MeditationTarget,
  type SavedMeditationVerse,
  getSavedMeditationVerses,
  saveMeditationVerse,
  removeMeditationVerse,
  splitVerse,
  type MeditateLocationState,
} from '@/lib/meditation/storage';

interface ActiveSession {
  target: MeditationTarget;
  editSplit: boolean;
  /** Save to "Your verses" when the session starts */
  save: boolean;
}

export default function Meditate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<SavedMeditationVerse[]>(() => getSavedMeditationVerses());
  const [filter, setFilter] = useState<string>('all');
  const [session, setSession] = useState<ActiveSession | null>(null);

  // Launched from a verse in the Bible reader
  useEffect(() => {
    const state = location.state as MeditateLocationState | null;
    if (state?.catalogId) {
      for (const category of MEDITATION_CATALOG) {
        const v = category.verses.find(cv => cv.id === state.catalogId);
        if (v) {
          setSession({ target: { ...v, truth: category.truth }, editSplit: false, save: false });
          break;
        }
      }
      navigate(location.pathname, { replace: true, state: null });
      return;
    }
    if (!state?.verse) return;
    const { book, chapter, verse, text, translation } = state.verse;
    const { inhale, exhale } = splitVerse(text);
    setSession({
      target: { book, chapter, verse, inhale, exhale, translation },
      editSplit: true,
      save: true,
    });
    // Clear router state so a refresh/back doesn't relaunch the session
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  const handleStart = useCallback(
    (target: MeditationTarget) => {
      if (session?.save) {
        saveMeditationVerse(target);
        setSaved(getSavedMeditationVerses());
      }
    },
    [session?.save]
  );

  const handleRemove = (id: string) => {
    removeMeditationVerse(id);
    setSaved(getSavedMeditationVerses());
  };

  const visibleCategories: MeditationCategory[] =
    filter === 'all' ? MEDITATION_CATALOG : MEDITATION_CATALOG.filter(c => c.id === filter);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Meditate</h2>
            <p className="text-foreground/55 leading-relaxed max-w-xl">
              Slow down and let God&rsquo;s Word settle in. Breathe in the first half of a verse,
              breathe out the second, and dwell on who He is.
            </p>
          </div>

          {/* Your verses */}
          <section className="mb-12">
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Your verses</h3>
            {saved.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/50 px-5 py-5 text-sm text-foreground/50 flex items-start gap-3">
                <Wind className="w-4 h-4 mt-0.5 shrink-0 text-foreground/35" />
                <span>
                  Tap any verse while reading the Bible and choose <span className="text-foreground/75">Meditate</span>{' '}
                  to bring it here.
                </span>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {saved.map(v => (
                  <VerseCard
                    key={v.id}
                    reference={formatMeditationReference(v)}
                    inhale={v.inhale}
                    exhale={v.exhale}
                    onClick={() => setSession({ target: v, editSplit: false, save: true })}
                    onRemove={() => handleRemove(v.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Catalog */}
          <section>
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">
              What are you carrying today?
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
                All
              </FilterChip>
              {MEDITATION_CATALOG.map(c => (
                <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                  {c.need}
                </FilterChip>
              ))}
            </div>

            <div className="space-y-10">
              {visibleCategories.map(category => (
                <div key={category.id}>
                  <div className="mb-3">
                    <p className="text-sm text-foreground/50">{category.need}</p>
                    <h4 className="font-serif text-xl text-foreground/90">{category.truth}</h4>
                    <p className="text-sm text-foreground/45 mt-0.5">{category.description}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {category.verses.map(v => (
                      <VerseCard
                        key={v.id}
                        reference={formatMeditationReference(v)}
                        inhale={v.inhale}
                        exhale={v.exhale}
                        onClick={() =>
                          setSession({
                            target: { ...v, truth: category.truth },
                            editSplit: false,
                            save: false,
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xs text-foreground/35">
              Catalog verses are from the Berean Standard Bible (BSB). Some are the key phrase of a longer verse.
            </p>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {session && (
          <BreathPlayer
            key={`${session.target.book}-${session.target.chapter}-${session.target.verse}`}
            target={session.target}
            editSplitInitially={session.editSplit}
            onStart={handleStart}
            onClose={() => setSession(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Pieces ============

function VerseCard({
  reference,
  inhale,
  exhale,
  onClick,
  onRemove,
}: {
  reference: string;
  inhale: string;
  exhale: string;
  onClick: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left rounded-2xl border border-border/30 bg-foreground/[0.02] px-4 py-4 hover:bg-foreground/[0.045] hover:border-border/50 transition-colors"
      >
        <p className="text-xs text-foreground/45 mb-1.5 pr-6">{reference}</p>
        <p className="font-serif text-[17px] leading-snug text-foreground/85">{inhale}</p>
        <p className="font-serif text-[17px] leading-snug text-foreground/50">{exhale}</p>
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center text-foreground/30 hover:text-foreground/70 hover:bg-foreground/[0.06] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity"
          aria-label={`Remove ${reference} from your verses`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? 'border-foreground/40 bg-foreground/[0.06] text-foreground'
          : 'border-border/50 text-foreground/55 hover:text-foreground hover:bg-foreground/[0.03]'
      }`}
    >
      {children}
    </button>
  );
}
