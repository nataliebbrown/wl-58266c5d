import { useEffect, useState } from 'react';
import { BookOpenCheck, Loader2, X } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import {
  type BriefEntry,
  type FullEntry,
  type LexiconLevel,
  type Occurrences,
  type OriginalWord,
  LEXICON_LEVELS,
  ORIGINAL_ATTRIBUTION,
  describeMorph,
  displayStrong,
  formatTranslit,
  getLexiconLevel,
  getOccurrences,
  languageOf,
  lookupBrief,
  lookupFull,
  saveLexiconLevel,
} from '@/lib/originalLanguage';

interface LexiconCardProps {
  strong: string;
  /** The word as it appears in the verse (adds grammar and the in-context form) */
  word?: OriginalWord;
  onGoTo?: (ref: BibleReference) => void;
  onClose?: () => void;
  /** Start a word study of this word */
  onStudy?: () => void;
}

const refLabel = (r: BibleReference) => `${r.book === 'Psalms' ? 'Ps' : r.book.replace(/^(\d) /, '$1')} ${r.chapter}:${r.verse}`;

export function LexiconCard({ strong, word, onGoTo, onClose, onStudy }: LexiconCardProps) {
  const lang = languageOf(strong);
  const [level, setLevel] = useState<LexiconLevel>(() => getLexiconLevel());
  const [brief, setBrief] = useState<BriefEntry | null | undefined>(undefined);
  const [full, setFull] = useState<FullEntry | null | undefined>(undefined);
  const [occ, setOcc] = useState<Occurrences | null>(null);
  const [grammar, setGrammar] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setBrief(undefined);
    setFull(undefined);
    setOcc(null);
    setShowAll(false);
    lookupBrief(strong).then(e => !cancelled && setBrief(e)).catch(() => !cancelled && setBrief(null));
    getOccurrences(strong).then(o => !cancelled && setOcc(o)).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [strong]);

  useEffect(() => {
    if (level !== 'full' || full !== undefined) return;
    let cancelled = false;
    lookupFull(strong).then(e => !cancelled && setFull(e)).catch(() => !cancelled && setFull(null));
    return () => {
      cancelled = true;
    };
  }, [level, strong, full]);

  useEffect(() => {
    let cancelled = false;
    if (word?.morph) describeMorph(word.morph).then(d => !cancelled && setGrammar(d));
    else setGrammar('');
    return () => {
      cancelled = true;
    };
  }, [word?.morph]);

  const lemma = brief?.w || full?.w || word?.original || '';
  const translit = formatTranslit(brief?.t || full?.t || word?.translit || '');
  const gloss = brief?.g || word?.gloss || '';
  const refs = occ?.refs ?? [];
  const shownRefs = showAll ? refs : refs.slice(0, 24);

  const changeLevel = (l: LexiconLevel) => {
    setLevel(l);
    saveLexiconLevel(l);
  };

  return (
    <div className="rounded-2xl border border-border/40 bg-card/70 px-4 py-4 font-sans">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-3xl leading-tight text-foreground/90 ${lang === 'H' ? 'font-serif' : 'font-serif'}`} dir={lang === 'H' ? 'rtl' : 'ltr'} lang={lang === 'H' ? 'he' : 'grc'}>
            {lemma}
          </p>
          <p className="text-sm text-foreground/60 mt-1">
            <span className="italic">{translit}</span>
            {gloss && <> · {gloss}</>}
            <span className="text-foreground/35"> · {displayStrong(strong)}</span>
          </p>
          {word && word.original !== lemma && (
            <p className="text-xs text-foreground/45 mt-1">
              In this verse: <span dir={lang === 'H' ? 'rtl' : 'ltr'}>{word.original}</span> — “{word.gloss}”
            </p>
          )}
          {grammar && <p className="text-xs text-foreground/45 mt-0.5">{grammar}</p>}
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.05]" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Brief / In-depth */}
      <div className="mt-4 flex items-center gap-2">
        <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs" role="group" aria-label="Dictionary detail">
          {LEXICON_LEVELS.map(l => (
            <button
              key={l.id}
              type="button"
              onClick={() => changeLevel(l.id)}
              aria-pressed={level === l.id}
              title={l.description}
              className={`rounded-full px-3 py-1 transition-colors ${level === l.id ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-foreground/40 truncate">{level === 'brief' ? 'Translator’s definition' : lang === 'G' ? 'Liddell-Scott-Jones' : 'Strong’s + BDB outline'}</span>
      </div>

      <div className="mt-3 text-sm leading-relaxed text-foreground/75 whitespace-pre-line max-h-80 overflow-y-auto pr-1">
        {level === 'brief' ? (
          brief === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
          ) : brief?.d ? (
            brief.d
          ) : (
            <span className="text-foreground/50">No brief definition for this word.</span>
          )
        ) : full === undefined ? (
          <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
        ) : !full ? (
          <span className="text-foreground/50">No in-depth entry for this word.</span>
        ) : lang === 'G' ? (
          full.d
        ) : (
          <>
            {full.bdb && full.bdb.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/45 mb-1">Brown-Driver-Briggs (outline)</p>
                {full.bdb.map((b, i) => (
                  <p key={i} className="mb-2">
                    {b}
                  </p>
                ))}
              </div>
            )}
            {full.strongs && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/45 mb-1">Strong’s Hebrew Dictionary (1890)</p>
                <p>{full.strongs}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Occurrences */}
      {occ && occ.count > 0 && (
        <div className="mt-4">
          <p className="text-xs text-foreground/55 mb-1.5">
            Appears in <span className="text-foreground/80 font-medium">{occ.count.toLocaleString()}</span> {occ.count === 1 ? 'verse' : 'verses'}
          </p>
          <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
            {shownRefs.map((r, i) => (
              <button
                key={`${r.book}-${r.chapter}-${r.verse}-${i}`}
                type="button"
                disabled={!onGoTo}
                onClick={() => onGoTo?.(r)}
                className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04] disabled:cursor-default"
              >
                {refLabel(r)}
              </button>
            ))}
            {!showAll && refs.length > shownRefs.length && (
              <button type="button" onClick={() => setShowAll(true)} className="px-2 py-0.5 text-[11px] text-foreground/55 underline underline-offset-2">
                Show {refs.length - shownRefs.length} more
              </button>
            )}
          </div>
          {occ.count > refs.length && showAll && <p className="text-[11px] text-foreground/40 mt-1">Showing the first {refs.length}.</p>}
        </div>
      )}

      {onStudy && (
        <button
          type="button"
          onClick={onStudy}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/75 hover:bg-foreground/[0.04]"
        >
          <BookOpenCheck className="w-3.5 h-3.5" /> Study this word
        </button>
      )}

      <p className="mt-4 text-[10.5px] leading-relaxed text-foreground/35">
        {level === 'brief' ? ORIGINAL_ATTRIBUTION.brief[lang] : ORIGINAL_ATTRIBUTION.full[lang]}
      </p>
    </div>
  );
}
