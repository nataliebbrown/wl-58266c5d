import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BookOpenCheck, Check, ChevronRight, RotateCcw, Undo2 } from 'lucide-react';
import {
  READING_PLANS,
  type PlanProgress,
  type ReadingDay,
  type PlanDayState,
  choosePlan,
  formatDay,
  getActivePlan,
  getCurrentDay,
  getPlanDay,
  getPlanDays,
  isPlanFinished,
  restartPlan,
  setDayComplete,
} from '@/lib/readingPlan';
import { passageLabel } from '@/lib/studyMethods/sessions';

export default function ReadingPlan() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<PlanProgress | null>(() => getActivePlan());
  const [changing, setChanging] = useState(false);

  const openDay = (day: ReadingDay, index = 0) => {
    if (!progress) return;
    const first = day.chapters[index];
    const planDay: PlanDayState = { planId: progress.planId, day: day.day };
    navigate('/bible', { state: { initialReference: { book: first.book, chapter: first.chapter }, planDay } });
  };

  const studyDay = (day: ReadingDay) => {
    const first = day.chapters[0];
    navigate('/study', { state: { passage: { book: first.book, chapter: first.chapter } } });
  };

  // ---- No plan yet / changing plans ----
  if (!progress || changing) {
    return (
      <div className="h-full overflow-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Read through the Bible</h2>
          <p className="text-foreground/55 leading-relaxed max-w-xl mb-8">
            At your own pace. There are no dates and no deadlines — each time you sit down, you simply pick up with the next day’s reading.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {READING_PLANS.map(plan => {
              const isCurrent = progress?.planId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    setProgress(choosePlan(plan.id));
                    setChanging(false);
                  }}
                  className="text-left rounded-2xl border border-border/30 bg-foreground/[0.02] px-5 py-5 hover:bg-foreground/[0.045] hover:border-border/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xl text-foreground/90">{plan.name}</p>
                    {isCurrent ? (
                      <span className="text-xs text-foreground/45">Current plan</span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-foreground/35" />
                    )}
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed mt-2">{plan.description}</p>
                  <p className="text-xs text-foreground/45 mt-3">Day 1: {formatDay(getPlanDays(plan.id)[0])}</p>
                </button>
              );
            })}
          </div>
          {changing && (
            <button type="button" onClick={() => setChanging(false)} className="mt-6 text-sm text-foreground/50 hover:text-foreground">
              Cancel
            </button>
          )}
          <p className="mt-8 text-xs text-foreground/40">You can switch plans any time — your place in each plan is kept.</p>
        </div>
      </div>
    );
  }

  const plan = READING_PLANS.find(p => p.id === progress.planId)!;
  const finished = isPlanFinished(progress);
  const currentDay = getCurrentDay(progress);
  const today = getPlanDay(progress.planId, currentDay);
  const upcoming = Array.from({ length: 4 }, (_, i) => getPlanDay(progress.planId, currentDay + 1 + i)).filter(
    (d): d is ReadingDay => !!d && !progress.completedDays.includes(d.day)
  );
  const recent = [...progress.completedDays].reverse().slice(0, 5);

  const toggle = (day: number, complete: boolean) => setProgress(setDayComplete(progress.planId, day, complete));

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Daily Bible reading</h2>
            <p className="text-sm text-foreground/50 mt-1">{plan.name} · at your own pace</p>
          </div>
          <button
            type="button"
            onClick={() => setChanging(true)}
            className="rounded-full border border-border/60 px-3.5 py-1.5 text-sm text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04]"
          >
            Change plan
          </button>
        </div>

        {/* Today */}
        {finished || !today ? (
          <div className="rounded-3xl border border-border/40 bg-foreground/[0.025] px-6 py-8 text-center mb-10">
            <p className="font-serif text-3xl text-foreground/90 mb-2">You’ve read the whole Bible</p>
            <p className="text-foreground/55 max-w-md mx-auto mb-6">
              From Genesis to Revelation, God has been revealing Himself on every page. Thank Him for what you’ve seen of Him.
            </p>
            <button
              type="button"
              onClick={() => setProgress(restartPlan(progress.planId))}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Start again
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-border/40 bg-foreground/[0.025] px-6 py-7 mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45 mb-1">Today’s reading</p>
            <p className="font-serif text-5xl text-foreground/90 leading-none mb-3">Day {today.day}</p>
            <p className="font-serif text-xl text-foreground/75 mb-5">{formatDay(today)}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {today.chapters.map((c, i) => (
                <button
                  key={`${c.book}-${c.chapter}`}
                  type="button"
                  onClick={() => openDay(today, i)}
                  className="rounded-full border border-border/60 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                >
                  {passageLabel(c)}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openDay(today)}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                <BookOpen className="w-4 h-4" /> Read
              </button>
              <button
                type="button"
                onClick={() => studyDay(today)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]"
              >
                <BookOpenCheck className="w-4 h-4" /> Study
              </button>
              <button
                type="button"
                onClick={() => toggle(today.day, true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]"
              >
                <Check className="w-4 h-4" /> Mark as read
              </button>
            </div>
            <p className="mt-5 text-xs text-foreground/40">As you read, ask: what does this show me about God?</p>
          </div>
        )}

        {/* Coming up */}
        {upcoming.length > 0 && (
          <section className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Coming up</h3>
            <ul className="divide-y divide-border/30 rounded-2xl border border-border/30">
              {upcoming.map(d => (
                <li key={d.day}>
                  <button type="button" onClick={() => openDay(d)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-foreground/[0.02]">
                    <span className="text-sm text-foreground/50 w-16 shrink-0">Day {d.day}</span>
                    <span className="flex-1 text-sm text-foreground/80">{formatDay(d)}</span>
                    <ChevronRight className="w-4 h-4 text-foreground/30" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recently read */}
        {recent.length > 0 && (
          <section>
            <h3 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Recently read</h3>
            <ul className="divide-y divide-border/30 rounded-2xl border border-border/30">
              {recent.map(n => {
                const d = getPlanDay(progress.planId, n);
                if (!d) return null;
                return (
                  <li key={n} className="flex items-center gap-3 px-4 py-3">
                    <span className="h-5 w-5 rounded-full bg-hl-green/80 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm text-foreground/50 w-14 shrink-0">Day {n}</span>
                    <span className="flex-1 text-sm text-foreground/70">{formatDay(d)}</span>
                    <button
                      type="button"
                      onClick={() => toggle(n, false)}
                      className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-foreground/70"
                      aria-label={`Mark day ${n} as unread`}
                    >
                      <Undo2 className="w-3.5 h-3.5" /> Undo
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

