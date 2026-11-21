import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpenCheck, ChevronRight, Search, X } from 'lucide-react';
import { KEY_WORDS, wordOfTheDay, type KeyWord } from '@/lib/translationBridge/keyWords';
import { getPublishedNote } from '@/lib/translationBridge/culturalNotes';
import { baseStrong, displayStrong, formatTranslit, getOccurrences, searchLexicon, type LexiconHit } from '@/lib/originalLanguage';
import { APPROACH_LABELS, ENGLISH_TRANSLATIONS, fetchVerse } from '@/lib/translations';
import { LexiconCard } from '@/components/original/LexiconCard';
import type { BibleReference } from '@/lib/bibleApi';

type Filter = 'all' | 'Hebrew' | 'Greek';

export default function TranslationBridge() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<KeyWord | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<LexiconHit[] | null>(null);
  const [lookup, setLookup] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const today = wordOfTheDay();

  const openBible = (ref: BibleReference) => navigate('/bible', { state: { initialReference: ref } });

  // Debounced look-up
  useEffect(() => {
    if (!query.trim()) {
      setHits(null);
      return;
    }
    const t = setTimeout(() => {
      searchLexicon(query).then(setHits).catch(() => setHits([]));
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  const shown = useMemo(() => KEY_WORDS.filter(k => filter === 'all' || k.language === filter), [filter]);

  const select = (k: KeyWord) => {
    setSelected(k);
    setLookup(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="h-full overflow-auto">
      <div ref={topRef} className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
        <button type="button" onClick={() => navigate('/learn')} className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-5">
          <ArrowLeft className="w-4 h-4" /> Learn
        </button>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Translation Bridge</h2>
        <p className="text-foreground/55 leading-relaxed max-w-xl mb-8">
          See beneath the English — the Hebrew and Greek words of Scripture, what they mean, and why translations put them differently. Especially, what they reveal about God.
        </p>

        {selected ? (
          <KeyWordDetail word={selected} onBack={() => setSelected(null)} onOpenBible={openBible} navigate={navigate} />
        ) : lookup ? (
          <div className="mb-10">
            <button type="button" onClick={() => setLookup(null)} className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-3">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <LexiconCard strong={lookup} onGoTo={openBible} />
          </div>
        ) : (
          <>
            {/* Word of the day */}
            <section className="mb-10">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2">Word of the day</p>
              <button type="button" onClick={() => select(today)} className="w-full text-left rounded-3xl border border-border/40 bg-foreground/[0.025] px-6 py-6 hover:bg-foreground/[0.04] transition-colors">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif text-4xl text-foreground/90" dir={today.language === 'Hebrew' ? 'rtl' : 'ltr'}>
                    {today.original}
                  </span>
                  <span className="italic text-foreground/60">{today.translit}</span>
                  <span className="text-sm text-foreground/45">{today.language}</span>
                </div>
                <p className="font-serif text-lg text-foreground/80 mt-1">{today.english}</p>
                <p className="text-sm text-foreground/60 leading-relaxed mt-3">{today.aboutGod}</p>
                <span className="inline-flex items-center gap-1 text-sm text-foreground/60 mt-4">
                  Explore this word <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </section>

            {/* Look up */}
            <section className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Look up a word</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="An English word (grace), a transliteration (hesed), or a number (H2617, G26)"
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-border/40 bg-card/60 text-sm focus:outline-none focus:border-foreground/30"
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-foreground/70" aria-label="Clear">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {hits && (
                <ul className="mt-2 rounded-xl border border-border/30 divide-y divide-border/30 max-h-80 overflow-y-auto">
                  {hits.length === 0 && <li className="px-4 py-3 text-sm text-foreground/50">No matches.</li>}
                  {hits.map(h => (
                    <li key={h.strong}>
                      <button type="button" onClick={() => setLookup(h.strong)} className="w-full text-left px-4 py-2.5 flex items-baseline gap-3 hover:bg-foreground/[0.03]">
                        <span className="font-serif text-lg text-foreground/85 min-w-[4.5rem]" dir={h.strong.startsWith('H') ? 'rtl' : 'ltr'}>
                          {h.lemma}
                        </span>
                        <span className="text-sm text-foreground/75 flex-1">
                          <span className="italic text-foreground/55">{formatTranslit(h.translit)}</span> · {h.gloss}
                        </span>
                        <span className="text-xs text-foreground/35">{displayStrong(h.strong)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Key words */}
            <section className="mb-12">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45">Key words of the faith</h3>
                <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs">
                  {(['all', 'Hebrew', 'Greek'] as Filter[]).map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1 transition-colors ${filter === f ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
                    >
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {shown.map(k => (
                  <button key={k.id} type="button" onClick={() => select(k)} className="text-left rounded-xl border border-border/30 px-4 py-3 hover:bg-foreground/[0.03] transition-colors">
                    <span className="flex items-baseline gap-2">
                      <span className="font-serif text-xl text-foreground/90" dir={k.language === 'Hebrew' ? 'rtl' : 'ltr'}>
                        {k.original}
                      </span>
                      <span className="italic text-sm text-foreground/55">{k.translit}</span>
                    </span>
                    <span className="block text-sm text-foreground/65 mt-0.5 truncate">{k.english}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Why so many translations */}
            <WhyTranslations onCompare={() => navigate('/bible', { state: { initialReference: { book: 'John', chapter: 3, verse: 16 } } })} />
          </>
        )}
      </div>
    </div>
  );
}

// ============ Key word detail ============

function KeyWordDetail({
  word,
  onBack,
  onOpenBible,
  navigate,
}: {
  word: KeyWord;
  onBack: () => void;
  onOpenBible: (ref: BibleReference) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [texts, setTexts] = useState<Record<string, string | null>>({});
  const note = getPublishedNote(word.id);

  useEffect(() => {
    let cancelled = false;
    setCount(null);
    setTexts({});
    const occStrong = word.occurrenceStrong ? baseStrong(word.occurrenceStrong) : word.strong;
    getOccurrences(occStrong).then(o => !cancelled && setCount(o.count));
    for (const v of word.verses) {
      fetchVerse('BSB', v.ref.book, v.ref.chapter, v.ref.verse ?? 1)
        .then(t => !cancelled && setTexts(prev => ({ ...prev, [v.label]: t })))
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [word]);

  const first = word.verses[0].ref;

  return (
    <div className="mb-10">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> All key words
      </button>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-serif text-5xl text-foreground/90" dir={word.language === 'Hebrew' ? 'rtl' : 'ltr'}>
          {word.original}
        </span>
        <span className="italic text-lg text-foreground/60">{word.translit}</span>
      </div>
      <p className="font-serif text-xl text-foreground/80 mt-1">{word.english}</p>
      <p className="text-xs text-foreground/45 mt-1">
        {word.language} · {displayStrong(word.strong)}
        {count !== null && <> · appears in {count.toLocaleString()} verses</>}
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1">What it means</p>
          <p className="text-[15px] leading-relaxed text-foreground/80">{word.meaning}</p>
        </div>
        <div className="rounded-2xl border border-hl-green/30 bg-hl-green/[0.07] px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 mb-1">What it shows about God</p>
          <p className="font-serif text-lg leading-relaxed text-foreground/85">{word.aboutGod}</p>
        </div>
        {note && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1">Across cultures</p>
            <p className="text-[15px] leading-relaxed text-foreground/75">{note.text}</p>
          </div>
        )}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2">Key verses</p>
          <ul className="space-y-2">
            {word.verses.map(v => (
              <li key={v.label}>
                <button type="button" onClick={() => onOpenBible(v.ref)} className="w-full text-left rounded-xl border border-border/30 px-4 py-3 hover:bg-foreground/[0.03]">
                  <span className="text-xs font-medium text-foreground/55">{v.label}</span>
                  <span className="block font-serif text-[15px] leading-relaxed text-foreground/80 mt-0.5">{texts[v.label] ?? '…'}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-foreground/35 mt-1.5">Berean Standard Bible</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2">Dictionary</p>
          <LexiconCard
            strong={word.strong}
            onGoTo={onOpenBible}
            onStudy={() =>
              navigate('/study', {
                state: {
                  passage: { book: first.book, chapter: first.chapter },
                  methodId: 'word',
                  word: { strong: word.strong, original: word.original, translit: word.translit, gloss: word.english.split(',')[0], verse: first.verse ?? 1 },
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

// ============ Why so many translations? ============

function WhyTranslations({ onCompare }: { onCompare: () => void }) {
  return (
    <section className="mb-6">
      <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Why are there so many translations?</h3>
      <div className="rounded-2xl border border-border/30 px-5 py-5">
        <p className="text-[15px] leading-relaxed text-foreground/75 mb-4">
          The Bible was written in Hebrew, Aramaic, and Greek. Every translation has to choose between staying close to the original words and making the meaning plain in today’s language. Neither is “right” on its own — each helps you see something.
        </p>
        <div className="h-1.5 rounded-full bg-gradient-to-r from-foreground/40 via-foreground/20 to-hl-green/50" />
        <div className="flex justify-between text-[10.5px] text-foreground/45 mt-1 mb-4">
          <span>Word for word</span>
          <span>Thought for thought</span>
        </div>
        <ul className="space-y-2 mb-4">
          {ENGLISH_TRANSLATIONS.map(t => (
            <li key={t.id} className="text-sm leading-relaxed">
              <span className="font-medium text-foreground/80">{t.abbr}</span>{' '}
              <span className="text-foreground/45">({APPROACH_LABELS[t.approach].toLowerCase()})</span>{' '}
              <span className="text-foreground/65">— {t.note}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-foreground/60 leading-relaxed mb-4">
          A helpful habit: read a word-for-word translation to see what the text says, and a thought-for-thought translation to hear what it means. When they differ, that’s often where the richest study is.
        </p>
        <button type="button" onClick={onCompare} className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]">
          <BookOpenCheck className="w-4 h-4" /> Compare translations of John 3:16
        </button>
        <p className="text-xs text-foreground/40 mt-3">
          In the Bible reader, switch to Study and open <span className="text-foreground/60">Original → Versions</span> to compare any verse.
        </p>
      </div>
    </section>
  );
}

