import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Pause, Play, Sparkles, Volume2, Loader2 } from 'lucide-react';
import { type StudyMethod, type StudyStep, fillTemplate } from '@/lib/studyMethods/methods';
import type { StudySession } from '@/lib/studyMethods/sessions';
import { GOD_ATTRIBUTES } from '@/lib/portraits';
import { searchBible, type BibleSearchResult } from '@/lib/bibleApi';
import { canReadAloud, play, type Playback } from '@/lib/readAloud';
import { getOccurrences, displayStrong, languageOf, type OriginalWord, type Occurrences } from '@/lib/originalLanguage';
import { fetchVerse } from '@/lib/translations';
import { LexiconCard } from '@/components/original/LexiconCard';
import type { BibleReference } from '@/lib/bibleApi';

interface StudyStepCardProps {
  method: StudyMethod;
  session: StudySession;
  passageLabel: string;
  /** Full passage text, for reading aloud */
  passageText: string;
  onChange: (patch: Partial<StudySession>) => void;
  onBack: () => void;
  onNext: () => void;
  onAskSophia: (step: StudyStep) => void;
  /** Word study: original words that might match the tapped English word */
  candidates?: { verse: number; words: OriginalWord[]; all: OriginalWord[] } | null;
  onChooseOriginal?: (word: OriginalWord, verse: number) => void;
}

const MAX_ATTRIBUTES = 3;

export function StudyStepCard({
  method,
  session,
  passageLabel,
  passageText,
  onChange,
  onBack,
  onNext,
  onAskSophia,
  candidates,
  onChooseOriginal,
}: StudyStepCardProps) {
  const step = method.steps[session.stepIndex];
  const vars = { person: session.person, word: session.word, passage: passageLabel };
  const answer = session.answers[step.id] ?? '';
  const isLast = session.stepIndex === method.steps.length - 1;

  const setAnswer = (text: string) => onChange({ answers: { ...session.answers, [step.id]: text } });

  // Steps that need a selection before moving on
  const blocked =
    (step.kind === 'pick-verse' && !session.verse) || (step.kind === 'pick-word' && !session.word);

  return (
    <div className="font-sans">
      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-5" aria-label={`Step ${session.stepIndex + 1} of ${method.steps.length}`}>
        {method.steps.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < session.stepIndex ? 'bg-foreground/40' : i === session.stepIndex ? 'bg-foreground/70' : 'bg-foreground/10'
            }`}
          />
        ))}
      </div>

      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1.5">
        {method.name} · Step {session.stepIndex + 1} of {method.steps.length} · {step.title}
      </p>
      <h3 className="font-serif text-2xl leading-snug text-foreground/90 mb-2">{fillTemplate(step.prompt, vars)}</h3>
      {step.hint && <p className="text-sm text-foreground/55 leading-relaxed mb-5">{fillTemplate(step.hint, vars)}</p>}

      {/* Read-aloud for Lectio Divina readings */}
      {step.reading && <ListenControl key={`${step.id}-listen`} text={passageText} reading={step.reading} />}

      {/* Step-specific content */}
      {step.kind === 'pick-verse' && (
        <div className="mb-5">
          {session.verse ? (
            <blockquote className="rounded-xl border border-border/40 bg-foreground/[0.03] px-4 py-3 font-serif text-lg leading-relaxed text-foreground/85">
              “{session.verse.text}”
              <span className="block mt-1 font-sans text-xs text-foreground/45">
                {passageLabel}:{session.verse.number}
              </span>
            </blockquote>
          ) : (
            <p className="rounded-xl border border-dashed border-border/60 px-4 py-3 text-sm text-foreground/50">
              No verse chosen yet — tap one in the passage.
            </p>
          )}
        </div>
      )}

      {step.kind === 'pick-word' && (
        <div className="mb-5">
          {session.word ? (
            <div className="rounded-xl border border-border/40 bg-foreground/[0.03] px-4 py-3">
              <span className="text-xs text-foreground/45 block mb-0.5">Your word</span>
              <span className="font-serif text-2xl text-foreground/90">“{session.word}”</span>
              {session.original && (
                <span className="block mt-1 text-sm text-foreground/65">
                  Original:{' '}
                  <span className="font-serif text-lg text-foreground/85" dir={languageOf(session.original.strong) === 'H' ? 'rtl' : 'ltr'}>
                    {session.original.word}
                  </span>{' '}
                  <span className="italic">{session.original.translit}</span> · {displayStrong(session.original.strong)}
                </span>
              )}
              {!session.original && candidates && (
                <div className="mt-3">
                  <p className="text-xs text-foreground/55 mb-1.5">
                    {candidates.words.length > 1 ? 'Which original word did you mean?' : 'Which original word is behind it?'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(candidates.words.length > 1 ? candidates.words : candidates.all).map((w, i) => (
                      <button
                        key={`${w.strong}-${i}`}
                        type="button"
                        onClick={() => onChooseOriginal?.(w, candidates.verse)}
                        className="rounded-lg border border-border/50 px-2.5 py-1.5 text-left hover:bg-foreground/[0.04]"
                      >
                        <span className="block font-serif text-base text-foreground/85">{w.original}</span>
                        <span className="block text-[11px] text-foreground/55">{w.gloss}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border/60 px-4 py-3 text-sm text-foreground/50">
              No word chosen yet — tap one in the passage.
            </p>
          )}
        </div>
      )}

      {step.kind === 'word-occurrences' && session.original && <OriginalOccurrences strong={session.original.strong} />}
      {step.kind === 'word-occurrences' && session.word && !session.original && <WordOccurrences word={session.word} />}

      {step.kind === 'word-original' && session.original && (
        <div className="mb-5">
          <LexiconCard strong={session.original.strong} word={{ original: session.original.word, translit: session.original.translit, gloss: session.original.gloss, strong: session.original.strong, morph: '' }} />
        </div>
      )}

      {step.kind === 'word-original' && session.word && !session.original && (
        <div className="mb-5 flex flex-wrap gap-2">
          <a
            href={`https://www.stepbible.org/?q=reference=${encodeURIComponent(passageLabel)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
          >
            Open {passageLabel} on STEPBible <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-xs text-foreground/45 self-center">Tap “{session.word}” there to see the original word.</span>
        </div>
      )}

      {step.kind === 'rest' && <RestTimer key={step.id} seconds={step.seconds ?? 90} />}

      {/* Writing area (all steps except the pickers) */}
      {step.kind !== 'pick-verse' && step.kind !== 'pick-word' && (
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder={step.placeholder ? fillTemplate(step.placeholder, vars) : 'Write here…'}
          rows={step.kind === 'rest' ? 3 : 6}
          className="w-full rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5 resize-y"
        />
      )}

      {/* Portraits of God tagging */}
      {step.kind === 'reveals-god' && (
        <div className="mt-4">
          <p className="text-xs text-foreground/50 mb-2">
            Add to your <span className="text-foreground/75">Portraits of God</span> — choose up to {MAX_ATTRIBUTES}:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {GOD_ATTRIBUTES.map(a => {
              const on = session.attributeIds.includes(a.id);
              const full = !on && session.attributeIds.length >= MAX_ATTRIBUTES;
              return (
                <button
                  key={a.id}
                  type="button"
                  disabled={full}
                  onClick={() =>
                    onChange({
                      attributeIds: on ? session.attributeIds.filter(id => id !== a.id) : [...session.attributeIds, a.id],
                    })
                  }
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors disabled:opacity-35 ${
                    on
                      ? 'border-hl-green/60 bg-hl-green/15 text-foreground'
                      : 'border-border/50 text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04]'
                  }`}
                >
                  {a.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/55 hover:text-foreground disabled:opacity-30"
          disabled={session.stepIndex === 0}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAskSophia(step)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {step.kind === 'word-original' ? 'Ask Sophia' : 'Ask Sophia for help'}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={blocked}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {isLast ? (
              <>
                <Check className="w-4 h-4" /> Finish
              </>
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Pieces ============

/** Split long text into speakable chunks (ElevenLabs has per-request limits). */
function chunkText(text: string, max = 2500): string[] {
  const sentences = text.match(/[^.!?]+[.!?”’"]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = '';
  for (const s of sentences) {
    if ((current + s).length > max && current) {
      chunks.push(current.trim());
      current = '';
    }
    current += s;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function ListenControl({ text, reading }: { text: string; reading: number }) {
  const [state, setState] = useState<'idle' | 'playing'>('idle');
  const playbackRef = useRef<Playback | null>(null);
  const cancelledRef = useRef(false);

  useEffect(
    () => () => {
      cancelledRef.current = true;
      playbackRef.current?.stop();
    },
    []
  );

  if (!canReadAloud()) return null;

  const start = async () => {
    cancelledRef.current = false;
    setState('playing');
    for (const chunk of chunkText(text)) {
      if (cancelledRef.current) break;
      playbackRef.current = play(chunk, { rate: 0.85 });
      await playbackRef.current.done;
    }
    if (!cancelledRef.current) setState('idle');
  };

  const stop = () => {
    cancelledRef.current = true;
    playbackRef.current?.stop();
    setState('idle');
  };

  return (
    <div className="mb-5 flex items-center gap-3 rounded-xl border border-border/40 bg-foreground/[0.03] px-4 py-3">
      <button
        type="button"
        onClick={state === 'playing' ? stop : start}
        className="h-10 w-10 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90"
        aria-label={state === 'playing' ? 'Stop reading' : 'Read the passage aloud'}
      >
        {state === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      <div className="text-sm">
        <p className="text-foreground/80 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" /> {['First', 'Second', 'Third'][reading - 1] ?? 'Another'} reading
        </p>
        <p className="text-xs text-foreground/45">Listen, or read it slowly yourself.</p>
      </div>
    </div>
  );
}

function RestTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [running, remaining]);

  const done = remaining <= 0;
  const mm = Math.floor(remaining / 60);
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div className="mb-5 flex items-center gap-4 rounded-xl border border-border/40 bg-foreground/[0.03] px-4 py-4">
      <span className="font-serif text-3xl tabular-nums text-foreground/80 w-20">{done ? '✓' : `${mm}:${ss}`}</span>
      <div className="text-sm">
        <p className="text-foreground/75">{done ? 'Take your time before moving on.' : running ? 'Be still.' : 'When you’re ready, begin a quiet minute and a half.'}</p>
        {!done && (
          <button type="button" onClick={() => setRunning(r => !r)} className="mt-1 text-xs text-foreground/55 hover:text-foreground underline underline-offset-2">
            {running ? 'Pause' : 'Begin'}
          </button>
        )}
      </div>
    </div>
  );
}

function WordOccurrences({ word }: { word: string }) {
  const [results, setResults] = useState<BibleSearchResult[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setResults(null);
    setFailed(false);
    searchBible(word)
      .then(r => !cancelled && setResults(r))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [word]);

  const highlight = (text: string) => {
    const parts = text.split(new RegExp(`(\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi'));
    return parts.map((p, i) => (p.toLowerCase() === word.toLowerCase() ? <mark key={i} className="bg-hl-green/25 text-inherit rounded px-0.5">{p}</mark> : p));
  };

  return (
    <div className="mb-5 max-h-64 overflow-y-auto rounded-xl border border-border/40 divide-y divide-border/30">
      {!results && !failed && (
        <p className="px-4 py-3 text-sm text-foreground/45 flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching Scripture…
        </p>
      )}
      {(failed || (results && results.length === 0)) && (
        <p className="px-4 py-3 text-sm text-foreground/50">
          Search isn’t available right now. Try{' '}
          <a
            className="underline underline-offset-2"
            href={`https://www.esv.org/search/?q=${encodeURIComponent(word)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            searching on ESV.org
          </a>
          .
        </p>
      )}
      {results?.map(r => (
        <div key={r.reference} className="px-4 py-2.5">
          <p className="text-xs font-medium text-foreground/50 mb-0.5">{r.reference}</p>
          <p className="font-serif text-sm leading-relaxed text-foreground/80">{highlight(r.text)}</p>
        </div>
      ))}
    </div>
  );
}

/** Verses where the same original word appears (built-in index), with text for the first few. */
function OriginalOccurrences({ strong }: { strong: string }) {
  const [occ, setOcc] = useState<Occurrences | null>(null);
  const [texts, setTexts] = useState<Record<string, string | null>>({});
  const SHOW = 8;

  useEffect(() => {
    let cancelled = false;
    setOcc(null);
    getOccurrences(strong).then(o => {
      if (cancelled) return;
      setOcc(o);
      for (const r of o.refs.slice(0, SHOW)) {
        const key = `${r.book} ${r.chapter}:${r.verse}`;
        fetchVerse('BSB', r.book, r.chapter, r.verse ?? 1)
          .then(t => !cancelled && setTexts(prev => ({ ...prev, [key]: t })))
          .catch(() => {});
      }
    });
    return () => {
      cancelled = true;
    };
  }, [strong]);

  if (!occ) {
    return (
      <p className="mb-5 text-sm text-foreground/45 flex items-center gap-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Finding every place this word appears…
      </p>
    );
  }
  const label = (r: BibleReference) => `${r.book === 'Psalms' ? 'Psalm' : r.book} ${r.chapter}:${r.verse}`;
  return (
    <div className="mb-5">
      <p className="text-xs text-foreground/55 mb-2">
        The same {languageOf(strong) === 'H' ? 'Hebrew' : 'Greek'} word appears in{' '}
        <span className="font-medium text-foreground/80">{occ.count.toLocaleString()}</span> {occ.count === 1 ? 'verse' : 'verses'}. A few of them:
      </p>
      <div className="max-h-64 overflow-y-auto rounded-xl border border-border/40 divide-y divide-border/30">
        {occ.refs.slice(0, SHOW).map(r => {
          const key = `${r.book} ${r.chapter}:${r.verse}`;
          return (
            <div key={key} className="px-4 py-2.5">
              <p className="text-xs font-medium text-foreground/50 mb-0.5">{label(r)}</p>
              <p className="font-serif text-sm leading-relaxed text-foreground/80">{texts[key] ?? '…'}</p>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-foreground/40 mt-1.5">Verse text: Berean Standard Bible. Word index: STEPBible.org (CC BY 4.0).</p>
    </div>
  );
}
