import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Pencil, Sparkles, X } from 'lucide-react';
import { useTimePeriod } from '@/lib/timeAwareness';
import { getQuizData } from '@/lib/onboardingState';
import { getActivities, removeActivity, dateKey } from '@/lib/activityLog';
import { getPortraitEntries, getAttribute } from '@/lib/portraits';
import { formatDay, getActivePlan, getCurrentDay, getPlanDay, type PlanDayState } from '@/lib/readingPlan';
import {
  INTENTION_FOCUSES,
  PRACTICES,
  checkIn,
  daysPracticedThisWeek,
  getIntention,
  getPractice,
  getRhythm,
  isPracticeDone,
  orderForTime,
  saveIntention,
  saveRhythm,
  weekDots,
  type Intention,
  type IntentionFocus,
  type Practice,
} from '@/lib/today/practices';
import { getDailySuggestion, type Suggestion } from '@/lib/today/suggestions';
import { getGuidedPractice, type GuidedPractice } from '@/lib/today/guided';
import { GuidedPracticePlayer } from '@/components/today/GuidedPracticePlayer';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ContextualSophiaPane = lazy(() =>
  import('@/components/sophia/ContextualSophiaPane').then(m => ({ default: m.ContextualSophiaPane }))
);

const GREETINGS: Record<string, { hello: string; line: string }> = {
  dawn: { hello: 'Good morning', line: 'Begin the day with God.' },
  morning: { hello: 'Good morning', line: 'Begin the day with God.' },
  midday: { hello: 'Good afternoon', line: 'Pause and turn your attention to Him.' },
  evening: { hello: 'Good evening', line: 'End the day with Him.' },
  night: { hello: 'Good evening', line: 'Rest in Him tonight.' },
};

export default function Today() {
  const navigate = useNavigate();
  const isDarkMode = useDarkMode();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { period } = useTimePeriod();
  const quiz = getQuizData();

  // Bump to re-read storage after any action
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion(v => v + 1), []);
  useEffect(() => {
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  const [rhythmIds, setRhythmIds] = useState<string[]>(() => getRhythm());
  const [editingRhythm, setEditingRhythm] = useState(false);
  const [intention, setIntention] = useState<Intention | null>(() => getIntention());
  const [editingIntention, setEditingIntention] = useState(false);
  const [guided, setGuided] = useState<GuidedPractice | null>(null);
  const [sophiaPrompt, setSophiaPrompt] = useState<string | null>(null);

  const events = useMemo(() => getActivities(), [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const portraits = useMemo(() => getPortraitEntries(), [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const plan = useMemo(() => getActivePlan(), [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const todayDay = plan ? getPlanDay(plan.planId, getCurrentDay(plan)) : undefined;
  const practices = orderForTime(rhythmIds, period);
  const examen = getPractice('examen')!;

  const suggestion = useMemo(
    () =>
      getDailySuggestion({
        period,
        intention,
        season: quiz.currentSeason,
        portraits,
        hasReadingPlan: !!plan,
        examenDoneToday: isPracticeDone(examen, undefined, events),
        examenInRhythm: rhythmIds.includes('examen'),
      }),
    [period, intention, quiz.currentSeason, portraits, plan, events, rhythmIds, examen]
  );

  const greeting = GREETINGS[period] ?? GREETINGS.morning;
  const doneCount = practices.filter(p => isPracticeDone(p, undefined, events)).length;

  // ---- Actions ----
  const openReading = () => {
    if (!plan || !todayDay) return navigate('/reading');
    const first = todayDay.chapters[0];
    const planDay: PlanDayState = { planId: plan.planId, day: todayDay.day };
    navigate('/bible', { state: { initialReference: { book: first.book, chapter: first.chapter }, planDay } });
  };

  const startPractice = (p: Practice) => {
    if (p.kind === 'guided') return setGuided(getGuidedPractice(p.id) ?? null);
    if (p.kind === 'check') {
      if (isPracticeDone(p, undefined, events)) removeActivity(`checkin:${p.id}:${dateKey(new Date())}`);
      else checkIn(p);
      return refresh();
    }
    if (p.id === 'scripture') return openReading();
    if (p.id === 'meditate') return navigate('/meditate');
    if (p.id === 'study') {
      const first = todayDay?.chapters[0];
      return navigate('/study', first ? { state: { passage: { book: first.book, chapter: first.chapter } } } : undefined);
    }
  };

  const runSuggestion = (s: Suggestion) => {
    const a = s.action;
    if (a.kind === 'meditate') navigate('/meditate', { state: { catalogId: a.catalogId } });
    else if (a.kind === 'read') navigate('/bible', { state: { initialReference: a.reference } });
    else if (a.kind === 'study') navigate('/study', { state: { passage: { book: a.reference.book, chapter: a.reference.chapter }, methodId: a.methodId } });
    else if (a.kind === 'reading-plan') navigate('/reading');
    else if (a.kind === 'practice') {
      const p = getPractice(a.practiceId);
      if (p) startPractice(p);
    }
  };

  const practiceDetail = (p: Practice) => {
    if (p.id === 'scripture') return todayDay ? `Day ${todayDay.day} · ${formatDay(todayDay)}` : 'Choose a reading plan';
    return p.description;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
          {/* Header */}
          <p className="text-sm text-foreground/45 mb-1">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            {greeting.hello}
            {quiz.name ? `, ${quiz.name}` : ''}
          </h2>
          <p className="text-foreground/55 mt-1 mb-8">{greeting.line}</p>

          {/* Intention */}
          <section className="mb-8">
            {editingIntention ? (
              <IntentionEditor
                current={intention}
                onSave={next => {
                  saveIntention(next);
                  setIntention(next);
                  setEditingIntention(false);
                }}
                onCancel={() => setEditingIntention(false)}
              />
            ) : intention ? (
              <div className="rounded-2xl border border-border/40 bg-foreground/[0.025] px-5 py-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1">What God is inviting you into</p>
                  <p className="font-serif text-xl text-foreground/90 leading-snug">{intention.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingIntention(true)}
                  className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/80 hover:bg-foreground/[0.05]"
                  aria-label="Edit intention"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditingIntention(true)}
                className="w-full text-left rounded-2xl border border-dashed border-border/60 px-5 py-4 hover:bg-foreground/[0.02]"
              >
                <p className="font-serif text-lg text-foreground/80">What is God inviting you into?</p>
                <p className="text-sm text-foreground/50">Set an intention for this season — Today will lean toward it.</p>
              </button>
            )}
          </section>

          {/* Rhythm */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45">
                Your rhythm {practices.length > 0 && <span className="normal-case tracking-normal">· {doneCount} of {practices.length} today</span>}
              </h3>
              <button type="button" onClick={() => setEditingRhythm(e => !e)} className="text-xs text-foreground/50 hover:text-foreground">
                {editingRhythm ? 'Done' : 'Edit'}
              </button>
            </div>

            {editingRhythm ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {PRACTICES.map(p => {
                  const on = rhythmIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        const next = on ? rhythmIds.filter(id => id !== p.id) : [...rhythmIds, p.id];
                        setRhythmIds(next);
                        saveRhythm(next);
                      }}
                      className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                        on ? 'border-hl-green/60 bg-hl-green/10' : 'border-border/40 hover:bg-foreground/[0.03]'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-sm text-foreground/85">{p.name}</span>
                        {on && <Check className="w-4 h-4 text-hl-green" />}
                      </span>
                      <span className="block text-xs text-foreground/50 mt-0.5">{p.description}</span>
                    </button>
                  );
                })}
              </div>
            ) : practices.length === 0 ? (
              <p className="text-sm text-foreground/50">Your rhythm is empty. Tap Edit to choose a few practices.</p>
            ) : (
              <ul className="divide-y divide-border/30 rounded-2xl border border-border/30">
                {practices.map(p => {
                  const done = isPracticeDone(p, undefined, events);
                  return (
                    <li key={p.id}>
                      <button type="button" onClick={() => startPractice(p)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-foreground/[0.02]">
                        <span
                          className={`h-6 w-6 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                            done ? 'bg-hl-green/80 border-hl-green text-white' : 'border-border/70'
                          }`}
                        >
                          {done && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className={`block text-[15px] ${done ? 'text-foreground/55' : 'text-foreground/90'}`}>{p.name}</span>
                          <span className="block text-xs text-foreground/45 truncate">{practiceDetail(p)}</span>
                        </span>
                        {p.kind === 'check' ? (
                          <span className="text-xs text-foreground/40">{done ? 'Undo' : 'Mark done'}</span>
                        ) : (
                          !done && <ChevronRight className="w-4 h-4 text-foreground/30" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Sophia's suggestion */}
          <section className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">A suggestion from Sophia</h3>
            <div className="rounded-2xl border border-border/40 bg-foreground/[0.025] px-5 py-5">
              <p className="font-serif text-xl text-foreground/90 mb-1.5">{suggestion.title}</p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">{suggestion.body}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => runSuggestion(suggestion)} className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90">
                  {suggestion.actionLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setSophiaPrompt(suggestion.sophiaPrompt)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Ask Sophia
                </button>
              </div>
            </div>
          </section>

          {/* This week (gentle) */}
          <section className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">This week</h3>
            <div className="rounded-2xl border border-border/30 px-5 py-4">
              <div className="flex justify-between max-w-sm mb-4">
                {weekDots(events).map(d => {
                  const date = new Date(`${d.key}T12:00:00`);
                  const isToday = d.key === dateKey(new Date());
                  return (
                    <div key={d.key} className="flex flex-col items-center gap-1.5">
                      <span className={`text-[11px] ${isToday ? 'text-foreground/80 font-medium' : 'text-foreground/40'}`}>
                        {date.toLocaleDateString(undefined, { weekday: 'narrow' })}
                      </span>
                      <span
                        className={`h-3 w-3 rounded-full ${d.active ? 'bg-hl-green/80' : 'bg-foreground/10'} ${isToday ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground/15' : ''}`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                {practices
                  .map(p => ({ p, n: daysPracticedThisWeek(p, events) }))
                  .filter(x => x.n > 0)
                  .map(({ p, n }) => (
                    <span key={p.id} className="text-foreground/65">
                      {p.name} · <span className="text-foreground/45">{n} {n === 1 ? 'day' : 'days'}</span>
                    </span>
                  ))}
              </div>
              <p className="text-xs text-foreground/40 mt-3">No streaks here — every day is a fresh start with Him.</p>
            </div>
          </section>

          {/* What God has been showing you */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45">What God has been showing you</h3>
              <button type="button" onClick={() => navigate('/journey')} className="text-xs text-foreground/50 hover:text-foreground">
                Your journey →
              </button>
            </div>
            {portraits.length === 0 ? (
              <p className="text-sm text-foreground/50 leading-relaxed">
                As you study, reflect, and pray, what you see of God will gather here and in your{' '}
                <button type="button" onClick={() => navigate('/journal', { state: { tab: 'portraits' } })} className="underline underline-offset-2 hover:text-foreground">
                  Portraits of God
                </button>
                .
              </p>
            ) : (
              <ul className="space-y-2.5">
                {portraits.slice(0, 3).map(e => (
                  <li key={e.id} className="rounded-2xl border border-border/30 px-4 py-3">
                    <p className="font-serif text-[16px] leading-relaxed text-foreground/85">{e.text}</p>
                    <p className="text-xs text-foreground/45 mt-1">
                      {e.attributeIds.map(id => getAttribute(id)?.name).filter(Boolean).join(' · ')}
                      {e.reference ? ` · ${e.reference}` : ''}
                    </p>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => navigate('/journal', { state: { tab: 'portraits' } })} className="text-sm text-foreground/55 hover:text-foreground">
                    See your Portraits of God →
                  </button>
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>

      <AnimatePresence>
        {guided && (
          <GuidedPracticePlayer
            key={guided.id}
            practice={guided}
            onClose={() => {
              setGuided(null);
              refresh();
            }}
          />
        )}
      </AnimatePresence>

      <Sheet open={!!sophiaPrompt} onOpenChange={open => !open && setSophiaPrompt(null)}>
        <SheetContent
          side={isDesktop ? 'right' : 'bottom'}
          className={`p-0 ${isDesktop ? 'w-full sm:max-w-[420px]' : 'h-[85vh] rounded-t-2xl'} [&>button]:hidden${isDarkMode ? ' dark' : ''}`}
        >
          <SheetTitle className="sr-only">Ask Sophia</SheetTitle>
          {sophiaPrompt && (
            <div className="h-full">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading…</div>}>
                <ContextualSophiaPane key={sophiaPrompt} onDismiss={() => setSophiaPrompt(null)} initialPrompt={sophiaPrompt} />
              </Suspense>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ============ Intention editor ============

function IntentionEditor({
  current,
  onSave,
  onCancel,
}: {
  current: Intention | null;
  onSave: (i: Intention | null) => void;
  onCancel: () => void;
}) {
  const [focus, setFocus] = useState<IntentionFocus>(current?.focus ?? 'knowing-god');
  const [text, setText] = useState(current?.text ?? '');
  const example = INTENTION_FOCUSES.find(f => f.id === focus)?.example ?? '';

  return (
    <div className="rounded-2xl border border-border/40 px-5 py-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-serif text-lg text-foreground/85">What is God inviting you into?</p>
        <button type="button" onClick={onCancel} className="h-7 w-7 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/70" aria-label="Cancel">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-foreground/50 mb-2">Choose a focus</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {INTENTION_FOCUSES.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFocus(f.id)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              focus === f.id ? 'border-foreground/40 bg-foreground/[0.06] text-foreground' : 'border-border/50 text-foreground/60 hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-foreground/50 mb-1.5">In your words</p>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={example}
        className="w-full rounded-xl border border-border/50 bg-card/60 px-4 py-2.5 text-[15px] focus:outline-none focus:border-foreground/30"
      />
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSave({ focus, text: text.trim() || example, setAt: new Date().toISOString() })}
          className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Save intention
        </button>
        {current && (
          <button type="button" onClick={() => onSave(null)} className="text-sm text-foreground/50 hover:text-foreground">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
