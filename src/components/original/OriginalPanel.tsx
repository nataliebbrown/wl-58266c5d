import { useEffect, useRef, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { HAS_ESV, type BibleReference } from '@/lib/bibleApi';
import { type OriginalWord, ORIGINAL_ATTRIBUTION, getChapterWords, isOldTestament } from '@/lib/originalLanguage';
import {
  APPROACH_LABELS,
  ENGLISH_TRANSLATIONS,
  FEATURED_LANGUAGES,
  MORE_LANGUAGES,
  fetchVerse,
  type WorldTranslation,
} from '@/lib/translations';
import { LexiconCard } from './LexiconCard';

type View = 'words' | 'versions' | 'languages';

interface OriginalPanelProps {
  book: string;
  chapter: number;
  /** Verse to show; defaults to verse 1 */
  verse: number | null;
  onGoTo: (ref: BibleReference) => void;
  onAskSophia?: (prompt: string) => void;
  /** Start a word study of an original word */
  onStudyWord?: (word: OriginalWord, verse: number) => void;
}

export function OriginalPanel({ book, chapter, verse, onGoTo, onAskSophia, onStudyWord }: OriginalPanelProps) {
  const [view, setView] = useState<View>('words');
  const v = verse ?? 1;
  const ot = isOldTestament(book);
  const label = `${book === 'Psalms' ? 'Psalm' : book} ${chapter}:${v}`;

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs" role="tablist">
          {([
            ['words', ot ? 'Hebrew' : 'Greek'],
            ['versions', 'Versions'],
            ['languages', 'Languages'],
          ] as [View, string][]).map(([id, text]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`rounded-full px-3 py-1 transition-colors ${view === id ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              {text}
            </button>
          ))}
        </div>
        <span className="text-xs text-foreground/45">{label}</span>
      </div>
      {!verse && <p className="text-xs text-foreground/45 -mt-2 mb-4">Tap any verse in the text to look at it here.</p>}

      {view === 'words' && <WordsView book={book} chapter={chapter} verse={v} ot={ot} onGoTo={onGoTo} onStudyWord={onStudyWord} />}
      {view === 'versions' && <VersionsView book={book} chapter={chapter} verse={v} label={label} onAskSophia={onAskSophia} />}
      {view === 'languages' && <LanguagesView book={book} chapter={chapter} verse={v} label={label} onAskSophia={onAskSophia} />}
    </div>
  );
}

// ============ Words (interlinear) ============

function WordsView({
  book,
  chapter,
  verse,
  ot,
  onGoTo,
  onStudyWord,
}: {
  book: string;
  chapter: number;
  verse: number;
  ot: boolean;
  onGoTo: (ref: BibleReference) => void;
  onStudyWord?: (word: OriginalWord, verse: number) => void;
}) {
  const [words, setWords] = useState<OriginalWord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Bring the dictionary card into view when a word is chosen
  useEffect(() => {
    if (selected !== null) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selected]);

  useEffect(() => {
    let cancelled = false;
    setWords(null);
    setFailed(false);
    setSelected(null);
    getChapterWords(book, chapter)
      .then(ch => !cancelled && setWords(ch[verse] ?? []))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [book, chapter, verse]);

  if (failed) return <p className="text-sm text-foreground/50">The original text couldn’t be loaded.</p>;
  if (!words) return <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />;
  if (words.length === 0) return <p className="text-sm text-foreground/50">No original-language text for this verse.</p>;

  const chosen = selected !== null ? words[selected] : null;

  return (
    <div>
      <p className="text-xs text-foreground/45 mb-3">
        {ot ? 'Hebrew reads right to left.' : 'Greek reads left to right.'} Tap a word to see what it means.
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4" dir={ot ? 'rtl' : 'ltr'}>
        {words.map((w, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(selected === i ? null : i)}
            className={`rounded-xl border px-2.5 py-2 text-center transition-colors ${
              selected === i ? 'border-hl-green/60 bg-hl-green/10' : 'border-border/40 hover:bg-foreground/[0.03]'
            }`}
          >
            <span className="block font-serif text-xl leading-tight text-foreground/90" lang={ot ? 'he' : 'grc'}>
              {w.original}
            </span>
            <span className="block text-[10.5px] italic text-foreground/45 mt-0.5" dir="ltr">
              {w.translit}
            </span>
            <span className="block text-[11px] text-foreground/70" dir="ltr">
              {w.gloss}
            </span>
          </button>
        ))}
      </div>
      {chosen && (
        <div ref={cardRef} className="scroll-mt-2">
        <LexiconCard
          strong={chosen.strong}
          word={chosen}
          onGoTo={onGoTo}
          onClose={() => setSelected(null)}
          onStudy={onStudyWord ? () => onStudyWord(chosen, verse) : undefined}
        />
        </div>
      )}
      <p className="mt-5 text-[10.5px] leading-relaxed text-foreground/35">{ORIGINAL_ATTRIBUTION.text}</p>
    </div>
  );
}

// ============ Versions (compare translations) ============

function VersionsView({
  book,
  chapter,
  verse,
  label,
  onAskSophia,
}: {
  book: string;
  chapter: number;
  verse: number;
  label: string;
  onAskSophia?: (prompt: string) => void;
}) {
  const translations = ENGLISH_TRANSLATIONS.filter(t => t.source !== 'esv' || HAS_ESV);
  const [texts, setTexts] = useState<Record<string, string | null | undefined>>({});

  useEffect(() => {
    let cancelled = false;
    setTexts({});
    for (const t of translations) {
      fetchVerse(t.id, book, chapter, verse)
        .then(text => !cancelled && setTexts(prev => ({ ...prev, [t.id]: text })))
        .catch(() => !cancelled && setTexts(prev => ({ ...prev, [t.id]: null })));
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter, verse]);

  return (
    <div>
      {/* Spectrum */}
      <div className="mb-4">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-foreground/40 via-foreground/20 to-hl-green/50" />
        <div className="flex justify-between text-[10.5px] text-foreground/45 mt-1">
          <span>Word for word</span>
          <span>Thought for thought</span>
        </div>
      </div>

      <ul className="space-y-3">
        {translations.map(t => {
          const text = texts[t.id];
          return (
            <li key={t.id} className="rounded-xl border border-border/30 px-3.5 py-3">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-foreground/80" title={t.name}>
                  {t.abbr} <span className="font-normal text-foreground/45">· {t.name}</span>
                </span>
                <span className="shrink-0 text-[10.5px] text-foreground/45">{APPROACH_LABELS[t.approach]}</span>
              </div>
              {text === undefined ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground/40" />
              ) : text === null ? (
                <p className="text-sm text-foreground/45 italic">Not included in this translation.</p>
              ) : (
                <p className="font-serif text-[15px] leading-relaxed text-foreground/85">{text}</p>
              )}
            </li>
          );
        })}
      </ul>

      {onAskSophia && (
        <button
          type="button"
          onClick={() =>
            onAskSophia(
              `Why do English translations of ${label} differ? Compare a literal translation like YLT or ESV with a meaning-based one like T4T, and explain what the original Hebrew or Greek is saying — and what it shows about God.`
            )
          }
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/75 hover:bg-foreground/[0.04]"
        >
          <Sparkles className="w-3.5 h-3.5" /> Why do these differ?
        </button>
      )}
      <p className="mt-4 text-[10.5px] leading-relaxed text-foreground/35">
        Translations via the Free Use Bible API (bible.helloao.org); ESV via the ESV API. More translations (NIV, NLT, CSB, NKJV, The Message) need publisher permission and may be added later.
      </p>
    </div>
  );
}

// ============ Languages (across cultures) ============

function LanguagesView({
  book,
  chapter,
  verse,
  label,
  onAskSophia,
}: {
  book: string;
  chapter: number;
  verse: number;
  label: string;
  onAskSophia?: (prompt: string) => void;
}) {
  const [extra, setExtra] = useState<WorldTranslation[]>([]);
  const list = [...FEATURED_LANGUAGES, ...extra];
  const [texts, setTexts] = useState<Record<string, string | null | undefined>>({});

  useEffect(() => {
    let cancelled = false;
    for (const t of list) {
      if (texts[`${t.id}:${verse}`] !== undefined) continue;
      fetchVerse(t.id, book, chapter, verse)
        .then(text => !cancelled && setTexts(prev => ({ ...prev, [`${t.id}:${verse}`]: text })))
        .catch(() => !cancelled && setTexts(prev => ({ ...prev, [`${t.id}:${verse}`]: null })));
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter, verse, extra.length]);

  useEffect(() => setTexts({}), [book, chapter]);

  const available = MORE_LANGUAGES.filter(m => !extra.some(e => e.id === m.id));

  return (
    <div>
      <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
        God’s Word is for every nation, tribe, and language (Revelation 7:9). See how {label} reads around the world.
      </p>
      <ul className="space-y-3">
        {list.map(t => {
          const text = texts[`${t.id}:${verse}`];
          return (
            <li key={t.id} className="rounded-xl border border-border/30 px-3.5 py-3">
              <p className="text-xs font-medium text-foreground/80 mb-1">
                {t.language} <span className="font-normal text-foreground/45">· {t.name}</span>
              </p>
              {text === undefined ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground/40" />
              ) : text === null ? (
                <p className="text-sm text-foreground/45 italic">Not available for this verse.</p>
              ) : (
                <p className="text-[15px] leading-relaxed text-foreground/85" dir={t.rtl ? 'rtl' : 'ltr'}>
                  {text}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      {available.length > 0 && (
        <select
          value=""
          onChange={e => {
            const add = MORE_LANGUAGES.find(m => m.id === e.target.value);
            if (add) setExtra(prev => [...prev, add]);
          }}
          className="mt-3 rounded-lg border border-border/50 bg-card/60 px-2.5 py-1.5 text-xs text-foreground/70"
          aria-label="Add a language"
        >
          <option value="">+ Add a language</option>
          {available.map(m => (
            <option key={m.id} value={m.id}>
              {m.language} — {m.name}
            </option>
          ))}
        </select>
      )}
      {onAskSophia && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() =>
              onAskSophia(
                `How might ${label} be understood in cultures different from mine? Are there words or images in it that translators find hard to carry into other languages, and how do they handle them?`
              )
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/75 hover:bg-foreground/[0.04]"
          >
            <Sparkles className="w-3.5 h-3.5" /> How is this understood in other cultures?
          </button>
        </div>
      )}
      <p className="mt-4 text-[10.5px] leading-relaxed text-foreground/35">Translations via the Free Use Bible API (bible.helloao.org).</p>
    </div>
  );
}
