import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, ChevronDown, ChevronRight, Clock, NotebookPen, Trash2, User } from 'lucide-react';
import { BIBLE_BOOKS, fetchPassage, type BiblePassage } from '@/lib/bibleApi';
import { STUDY_METHODS, getMethod, fillTemplate, type StudyStep } from '@/lib/studyMethods/methods';
import { BIBLE_CHARACTERS, type BibleCharacter } from '@/lib/studyMethods/characters';
import {
  type StudyPassageRef,
  type StudySession,
  createSession,
  deleteSession,
  getSession,
  getSessions,
  passageLabel,
  saveSession,
  saveSessionToJournal,
} from '@/lib/studyMethods/sessions';
import { addPortraitEntry, getAttribute } from '@/lib/portraits';
import { logActivity } from '@/lib/activityLog';
import { StudyPassageView, type PassagePickMode } from '@/components/study/StudyPassageView';
import { StudyStepCard } from '@/components/study/StudyStepCard';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ContextualSophiaPane = lazy(() =>
  import('@/components/sophia/ContextualSophiaPane').then(m => ({ default: m.ContextualSophiaPane }))
);

/** Router state for opening the Study page */
export interface StudyLocationState {
  passage?: StudyPassageRef;
  methodId?: string;
  sessionId?: string;
}

type View = 'home' | 'character' | 'session' | 'summary';

export default function Study() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkMode = useDarkMode();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const incoming = (location.state as StudyLocationState | null) ?? {};

  const [passageRef, setPassageRef] = useState<StudyPassageRef | null>(incoming.passage ?? null);
  const [session, setSession] = useState<StudySession | null>(() =>
    incoming.sessionId ? getSession(incoming.sessionId) ?? null : null
  );
  const [view, setView] = useState<View>(() => {
    const s = incoming.sessionId ? getSession(incoming.sessionId) : undefined;
    if (s) return s.status === 'complete' ? 'summary' : 'session';
    return incoming.methodId === 'character' ? 'character' : 'home';
  });
  const [sessions, setSessions] = useState<StudySession[]>(() => getSessions());
  const [sophia, setSophia] = useState<{ prompt: string; key: number } | null>(null);
  const [passageOpen, setPassageOpen] = useState(true);

  // Opened with a method and passage (e.g. from Today): start right away
  useEffect(() => {
    if (!session && incoming.methodId && incoming.methodId !== 'character' && incoming.passage && getMethod(incoming.methodId)) {
      start(incoming.methodId, incoming.passage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL state in sync so a refresh resumes the same session
  useEffect(() => {
    if (session) navigate(location.pathname, { replace: true, state: { sessionId: session.id } satisfies StudyLocationState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id]);

  // ---- Passage text ----
  const activePassage = session?.passage ?? passageRef;
  const [passage, setPassage] = useState<{ data: BiblePassage | null; loading: boolean; error: boolean }>({
    data: null,
    loading: false,
    error: false,
  });
  useEffect(() => {
    if (!activePassage || (view !== 'session' && view !== 'summary')) return;
    let cancelled = false;
    setPassage({ data: null, loading: true, error: false });
    fetchPassage({ book: activePassage.book, chapter: activePassage.chapter })
      .then(data => !cancelled && setPassage({ data, loading: false, error: false }))
      .catch(() => !cancelled && setPassage({ data: null, loading: false, error: true }));
    return () => {
      cancelled = true;
    };
  }, [activePassage?.book, activePassage?.chapter, view]); // eslint-disable-line react-hooks/exhaustive-deps

  const passageText = useMemo(() => passage.data?.verses.map(v => v.text).join(' ') ?? '', [passage.data]);

  // ---- Session updates ----
  const update = useCallback((patch: Partial<StudySession>) => {
    setSession(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveSession(next);
      return next;
    });
  }, []);

  const start = (methodId: string, ref: StudyPassageRef, extra: { person?: string; characterId?: string } = {}) => {
    const s = createSession(methodId, ref, extra);
    saveSession(s);
    setSession(s);
    setSessions(getSessions());
    setPassageOpen(true);
    setView('session');
  };

  const resume = (s: StudySession) => {
    setSession(s);
    setView(s.status === 'complete' ? 'summary' : 'session');
  };

  const finish = () => {
    if (!session) return;
    const completedAt = new Date().toISOString();
    let finished: StudySession = { ...session, status: 'complete', completedAt };
    const journalEntryId = saveSessionToJournal(finished);
    finished = { ...finished, journalEntryId };
    // Portraits of God: the reveals-god answer + chosen attributes
    const godStep = getMethod(session.methodId)?.steps.find(s => s.kind === 'reveals-god');
    const godAnswer = godStep ? session.answers[godStep.id] : '';
    if (godAnswer?.trim() && session.attributeIds.length && session.status !== 'complete') {
      addPortraitEntry({
        attributeIds: session.attributeIds,
        text: godAnswer,
        reference: session.verse ? `${passageLabel(session.passage)}:${session.verse.number}` : passageLabel(session.passage),
        source: 'study',
      });
    }
    saveSession(finished);
    logActivity({
      type: 'study',
      label: `${getMethod(session.methodId)?.name ?? 'Study'} · ${session.person ? `${session.person} · ` : ''}${passageLabel(session.passage)}`,
      refId: `study:${session.id}`,
    });
    setSession(finished);
    setSessions(getSessions());
    setView('summary');
  };

  const askSophia = (step: StudyStep) => {
    if (!session) return;
    const method = getMethod(session.methodId)!;
    const label = passageLabel(session.passage);
    const vars = { person: session.person, word: session.word, passage: label };
    const prompt =
      step.kind === 'word-original'
        ? `I'm doing a word study of “${session.word}” in ${label}. What is the original Hebrew or Greek word behind it, and what does it mean? Please mention if translations differ.`
        : `I'm doing a ${method.name} study of ${label}${session.person ? ` focused on ${session.person}` : ''}. I'm on the “${step.title}” step: “${fillTemplate(step.prompt, vars)}” Please don't give me the answer — help me with a guiding question or a hint so I can see it in the text myself.`;
    setSophia({ prompt, key: Date.now() });
  };

  const method = session ? getMethod(session.methodId) : undefined;
  const step = method && session ? method.steps[session.stepIndex] : undefined;
  const pickMode: PassagePickMode = step?.kind === 'pick-verse' ? 'verse' : step?.kind === 'pick-word' ? 'word' : 'none';

  // ============ Views ============

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        {view === 'home' && (
          <StudyHome
            passageRef={passageRef}
            onPassageChange={setPassageRef}
            sessions={sessions}
            onChooseMethod={id => {
              if (id === 'character') setView('character');
              else if (passageRef) start(id, passageRef);
            }}
            onResume={resume}
            onDelete={id => {
              deleteSession(id);
              setSessions(getSessions());
            }}
          />
        )}

        {view === 'character' && (
          <CharacterPicker
            passageRef={passageRef}
            sessions={sessions}
            onBack={() => setView('home')}
            onStart={(ref, person, characterId) => start('character', ref, { person, characterId })}
          />
        )}

        {view === 'session' && session && method && step && (
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
            <button
              type="button"
              onClick={() => {
                setSessions(getSessions());
                setView('home');
              }}
              className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> All studies
            </button>
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,460px)] items-start">
              {/* Passage */}
              <div className="lg:sticky lg:top-0 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto rounded-2xl border border-border/30 bg-card/40 px-5 py-5">
                {!isDesktop && (
                  <button
                    type="button"
                    onClick={() => setPassageOpen(o => !o)}
                    className="w-full flex items-center justify-between text-sm text-foreground/60 mb-2"
                  >
                    {passageOpen ? 'Hide passage' : `Show ${passageLabel(session.passage)}`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${passageOpen ? 'rotate-180' : ''}`} />
                  </button>
                )}
                {(isDesktop || passageOpen || pickMode !== 'none') && (
                  <div className={!isDesktop ? 'max-h-[45vh] overflow-y-auto' : undefined}>
                    <StudyPassageView
                      passage={passage.data}
                      title={`${passageLabel(session.passage)}${session.person ? ` · ${session.person}` : ''}`}
                      loading={passage.loading}
                      error={passage.error}
                      pickMode={pickMode}
                      selectedVerse={session.verse?.number}
                      highlightWord={session.word}
                      onPickVerse={(number, text) => update({ verse: { number, text: text.trim().replace(/^[“”"‘’']+|[“”"‘’']+$/g, '') } })}
                      onPickWord={word => update({ word })}
                    />
                  </div>
                )}
              </div>

              {/* Step */}
              <div className="rounded-2xl border border-border/30 bg-background px-5 py-6 sm:px-6">
                <StudyStepCard
                  method={method}
                  session={session}
                  passageLabel={passageLabel(session.passage)}
                  passageText={passageText}
                  onChange={update}
                  onBack={() => update({ stepIndex: Math.max(0, session.stepIndex - 1) })}
                  onNext={() => (session.stepIndex >= method.steps.length - 1 ? finish() : update({ stepIndex: session.stepIndex + 1 }))}
                  onAskSophia={askSophia}
                />
              </div>
            </div>
          </div>
        )}

        {view === 'summary' && session && method && (
          <StudySummary
            session={session}
            onStudyAgain={() => {
              setPassageRef(session.passage);
              setSession(null);
              setSessions(getSessions());
              setView('home');
            }}
            onOpenJournal={() => navigate('/journal')}
            onOpenBible={() => navigate('/bible', { state: { initialReference: { book: session.passage.book, chapter: session.passage.chapter } } })}
            onOpenPortraits={() => navigate('/journal', { state: { tab: 'portraits' } })}
          />
        )}
      </div>

      {/* Sophia helper */}
      <Sheet open={!!sophia} onOpenChange={open => !open && setSophia(null)}>
        <SheetContent
          side={isDesktop ? 'right' : 'bottom'}
          className={`p-0 ${isDesktop ? 'w-full sm:max-w-[420px]' : 'h-[85vh] rounded-t-2xl'} [&>button]:hidden${isDarkMode ? ' dark' : ''}`}
        >
          <SheetTitle className="sr-only">Ask Sophia</SheetTitle>
          {sophia && session && (
            <div className="h-full">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading…</div>}>
                <ContextualSophiaPane
                  key={sophia.key}
                  onDismiss={() => setSophia(null)}
                  initialPrompt={sophia.prompt}
                  context="bible"
                  bibleReference={{ book: session.passage.book, chapter: session.passage.chapter }}
                />
              </Suspense>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ============ Home: choose a method ============

function StudyHome({
  passageRef,
  onPassageChange,
  sessions,
  onChooseMethod,
  onResume,
  onDelete,
}: {
  passageRef: StudyPassageRef | null;
  onPassageChange: (ref: StudyPassageRef) => void;
  sessions: StudySession[];
  onChooseMethod: (methodId: string) => void;
  onResume: (s: StudySession) => void;
  onDelete: (id: string) => void;
}) {
  const inProgress = sessions.filter(s => s.status === 'in-progress');
  const recent = sessions.filter(s => s.status === 'complete').slice(0, 6);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
      <h2 className="text-2xl font-semibold text-foreground mb-2">Study</h2>
      <p className="text-foreground/55 leading-relaxed max-w-xl mb-8">
        Choose a way to study. Every method walks you through the passage step by step — and always asks what it reveals about God.
      </p>

      <PassageChooser value={passageRef} onChange={onPassageChange} />

      <div className="grid gap-3 sm:grid-cols-2 mb-12">
        {STUDY_METHODS.map(m => {
          const needsPassage = m.id !== 'character' && !passageRef;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChooseMethod(m.id)}
              disabled={needsPassage}
              className="group text-left rounded-2xl border border-border/30 bg-foreground/[0.02] px-4 py-4 hover:bg-foreground/[0.045] hover:border-border/50 transition-colors disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg text-foreground/90">{m.name}</p>
                  <p className="text-xs text-foreground/45 mt-0.5">{m.tagline}</p>
                </div>
                <ChevronRight className="w-4 h-4 mt-1 text-foreground/30 group-hover:text-foreground/60" />
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mt-2.5">{m.about}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-foreground/45">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {m.minutes}
                </span>
                <span>Best for: {m.bestFor}</span>
              </div>
            </button>
          );
        })}
      </div>

      {inProgress.length > 0 && (
        <SessionList title="Continue" sessions={inProgress} onResume={onResume} onDelete={onDelete} />
      )}
      {recent.length > 0 && <SessionList title="Recent studies" sessions={recent} onResume={onResume} />}
    </div>
  );
}

function PassageChooser({ value, onChange }: { value: StudyPassageRef | null; onChange: (ref: StudyPassageRef) => void }) {
  const [book, setBook] = useState(value?.book ?? '');
  const [chapter, setChapter] = useState(value?.chapter ?? 1);
  const bookInfo = BIBLE_BOOKS.find(b => b.name === book);

  useEffect(() => {
    if (value) {
      setBook(value.book);
      setChapter(value.chapter);
    }
  }, [value]);

  const commit = (b: string, c: number) => {
    if (b) onChange({ book: b, chapter: c });
  };

  return (
    <div className="mb-6 rounded-2xl border border-border/40 px-4 py-3 flex flex-wrap items-center gap-3">
      <BookOpen className="w-4 h-4 text-foreground/40" />
      <span className="text-sm text-foreground/55">Passage</span>
      <select
        value={book}
        onChange={e => {
          setBook(e.target.value);
          setChapter(1);
          commit(e.target.value, 1);
        }}
        className="rounded-lg border border-border/50 bg-card/60 px-2.5 py-1.5 text-sm text-foreground"
        aria-label="Book"
      >
        <option value="" disabled>
          Choose a book
        </option>
        {BIBLE_BOOKS.map(b => (
          <option key={b.name} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <select
        value={chapter}
        disabled={!bookInfo}
        onChange={e => {
          const c = Number(e.target.value);
          setChapter(c);
          commit(book, c);
        }}
        className="rounded-lg border border-border/50 bg-card/60 px-2.5 py-1.5 text-sm text-foreground disabled:opacity-40"
        aria-label="Chapter"
      >
        {Array.from({ length: bookInfo?.chapters ?? 1 }, (_, i) => i + 1).map(n => (
          <option key={n} value={n}>
            Chapter {n}
          </option>
        ))}
      </select>
      {!value && <span className="text-xs text-foreground/40">Choose a passage to begin (character study picks its own).</span>}
    </div>
  );
}

function SessionList({
  title,
  sessions,
  onResume,
  onDelete,
}: {
  title: string;
  sessions: StudySession[];
  onResume: (s: StudySession) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <section className="mb-10">
      <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">{title}</h3>
      <ul className="divide-y divide-border/30 rounded-2xl border border-border/30">
        {sessions.map(s => {
          const m = getMethod(s.methodId);
          return (
            <li key={s.id} className="flex items-center gap-2 px-4 py-3">
              <button type="button" onClick={() => onResume(s)} className="flex-1 text-left min-w-0">
                <p className="text-sm text-foreground/85 truncate">
                  {m?.name} · {s.person ? `${s.person} · ` : ''}
                  {passageLabel(s.passage)}
                </p>
                <p className="text-xs text-foreground/45">
                  {s.status === 'complete'
                    ? `Finished ${new Date(s.completedAt ?? s.updatedAt).toLocaleDateString()}`
                    : `Step ${s.stepIndex + 1} of ${m?.steps.length ?? '?'}`}
                </p>
              </button>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(s.id)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/30 hover:text-foreground/70 hover:bg-foreground/[0.05]"
                  aria-label="Delete this study"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ============ Character study: choose a person ============

function CharacterPicker({
  passageRef,
  sessions,
  onBack,
  onStart,
}: {
  passageRef: StudyPassageRef | null;
  sessions: StudySession[];
  onBack: () => void;
  onStart: (ref: StudyPassageRef, person: string, characterId?: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const done = (c: BibleCharacter, book: string, chapter: number) =>
    sessions.some(
      s => s.characterId === c.id && s.status === 'complete' && s.passage.book === book && s.passage.chapter === chapter
    );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-5">
        <ArrowLeft className="w-4 h-4" /> All methods
      </button>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Character study</h2>
      <p className="text-foreground/55 leading-relaxed max-w-xl mb-8">
        Follow a person through Scripture and watch what God does in their story. Study one passage at a time — your progress is saved.
      </p>

      {passageRef && (
        <div className="mb-8 rounded-2xl border border-border/40 px-4 py-4">
          <p className="text-sm text-foreground/70 mb-2">Someone in {passageLabel(passageRef)}</p>
          <form
            className="flex flex-wrap gap-2"
            onSubmit={e => {
              e.preventDefault();
              if (customName.trim()) onStart(passageRef, customName.trim());
            }}
          >
            <input
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder="Name, e.g. Nicodemus"
              className="flex-1 min-w-[180px] rounded-lg border border-border/50 bg-card/60 px-3 py-1.5 text-sm"
            />
            <button type="submit" disabled={!customName.trim()} className="rounded-full bg-foreground text-background px-4 py-1.5 text-sm disabled:opacity-40">
              Start
            </button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {BIBLE_CHARACTERS.map(c => {
          const completed = c.passages.filter(p => done(c, p.book, p.chapter)).length;
          const isOpen = open === c.id;
          return (
            <div key={c.id} className="rounded-2xl border border-border/30">
              <button type="button" onClick={() => setOpen(isOpen ? null : c.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left">
                <span className="h-9 w-9 shrink-0 rounded-full bg-foreground/[0.05] flex items-center justify-center">
                  <User className="w-4 h-4 text-foreground/45" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-serif text-lg text-foreground/90">{c.name}</span>
                  <span className="block text-xs text-foreground/50 truncate">{c.summary}</span>
                </span>
                <span className="text-xs text-foreground/45 shrink-0">
                  {completed}/{c.passages.length}
                </span>
                <ChevronDown className={`w-4 h-4 text-foreground/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <ul className="border-t border-border/30 px-2 py-2">
                  {c.passages.map(p => {
                    const isDone = done(c, p.book, p.chapter);
                    return (
                      <li key={`${p.book}-${p.chapter}`}>
                        <button
                          type="button"
                          onClick={() => onStart({ book: p.book, chapter: p.chapter }, c.name, c.id)}
                          className="w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-foreground/[0.03]"
                        >
                          <span
                            className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isDone ? 'bg-hl-green/80 border-hl-green text-white' : 'border-border/70'
                            }`}
                          >
                            {isDone && <Check className="w-3 h-3" />}
                          </span>
                          <span className="flex-1 text-sm text-foreground/80">{p.title}</span>
                          <span className="text-xs text-foreground/45">{passageLabel(p)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Summary ============

function StudySummary({
  session,
  onStudyAgain,
  onOpenJournal,
  onOpenBible,
  onOpenPortraits,
}: {
  session: StudySession;
  onStudyAgain: () => void;
  onOpenJournal: () => void;
  onOpenBible: () => void;
  onOpenPortraits: () => void;
}) {
  const method = getMethod(session.methodId)!;
  const label = passageLabel(session.passage);
  const vars = { person: session.person, word: session.word, passage: label };
  const attributes = session.attributeIds.map(id => getAttribute(id)?.name).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1.5">Study complete</p>
      <h2 className="font-serif text-3xl text-foreground/90 mb-1">
        {method.name} · {session.person ? `${session.person} · ` : ''}
        {label}
      </h2>
      <p className="text-sm text-foreground/55 mb-6 flex items-center gap-1.5">
        <NotebookPen className="w-3.5 h-3.5" /> Saved to your journal
        {attributes.length > 0 && <> · added to Portraits of God ({attributes.join(', ')})</>}
      </p>

      {session.verse && (
        <blockquote className="mb-6 rounded-xl border border-border/40 bg-foreground/[0.03] px-4 py-3 font-serif text-lg leading-relaxed text-foreground/85">
          “{session.verse.text}” <span className="font-sans text-xs text-foreground/45">{label}:{session.verse.number}</span>
        </blockquote>
      )}
      {session.word && <p className="mb-6 font-serif text-xl text-foreground/85">Word: “{session.word}”</p>}

      <div className="space-y-5 mb-10">
        {method.steps.map(step => {
          const answer = session.answers[step.id]?.trim();
          if (!answer) return null;
          return (
            <div key={step.id}>
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/45 mb-1">{step.title}</p>
              <p className="text-sm text-foreground/55 mb-1">{fillTemplate(step.prompt, vars)}</p>
              <p className="text-[15px] leading-relaxed text-foreground/85 whitespace-pre-line">{answer}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onStudyAgain} className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90">
          Start another study
        </button>
        <button type="button" onClick={onOpenJournal} className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]">
          Open journal
        </button>
        {attributes.length > 0 && (
          <button type="button" onClick={onOpenPortraits} className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]">
            See Portraits of God
          </button>
        )}
        <button type="button" onClick={onOpenBible} className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]">
          Back to {label}
        </button>
      </div>
    </div>
  );
}
