import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { formatDay, getActivePlan, getCurrentDay, getPlanDay, isPlanFinished, type PlanDayState } from '@/lib/readingPlan';

/** Slim "Today's reading" strip for the dashboard. */
export function TodaysReadingStrip() {
  const navigate = useNavigate();
  const progress = getActivePlan();

  if (!progress) {
    return (
      <button
        type="button"
        onClick={() => navigate('/reading')}
        className="group w-full flex items-center gap-3 rounded-xl border border-border/40 bg-white/50 dark:bg-foreground/[0.03] px-4 py-3 text-left hover:bg-white/70 dark:hover:bg-foreground/[0.05] transition-colors"
      >
        <BookOpen className="w-4 h-4 text-foreground/45 shrink-0" />
        <span className="flex-1 text-sm text-foreground/65">
          <span className="font-medium text-foreground/80">Read through the Bible</span> — at your own pace, a little each day
        </span>
        <ChevronRight className="w-4 h-4 text-foreground/35 group-hover:text-foreground/60" />
      </button>
    );
  }

  const finished = isPlanFinished(progress);
  const day = finished ? undefined : getPlanDay(progress.planId, getCurrentDay(progress));

  const openReader = () => {
    if (!day) return navigate('/reading');
    const first = day.chapters[0];
    const planDay: PlanDayState = { planId: progress.planId, day: day.day };
    navigate('/bible', { state: { initialReference: { book: first.book, chapter: first.chapter }, planDay } });
  };

  return (
    <div className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-white/50 dark:bg-foreground/[0.03] px-4 py-3">
      <BookOpen className="w-4 h-4 text-foreground/45 shrink-0" />
      <button type="button" onClick={() => navigate('/reading')} className="flex-1 min-w-0 text-left">
        <span className="text-xs uppercase tracking-[0.15em] text-foreground/45 mr-2">Today’s reading</span>
        <span className="text-sm text-foreground/80">
          {day ? (
            <>
              <span className="font-medium">Day {day.day}</span> · {formatDay(day)}
            </>
          ) : (
            'You’ve read the whole Bible'
          )}
        </span>
      </button>
      {day && (
        <button
          type="button"
          onClick={openReader}
          className="shrink-0 rounded-full bg-foreground text-background px-3.5 py-1.5 text-xs font-medium hover:opacity-90"
        >
          Read
        </button>
      )}
    </div>
  );
}
