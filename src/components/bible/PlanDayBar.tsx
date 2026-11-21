import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { formatDay, getActivePlan, getPlanDay, setDayComplete, type PlanDayState } from '@/lib/readingPlan';
import { passageLabel } from '@/lib/studyMethods/sessions';

interface PlanDayBarProps {
  planDay: PlanDayState;
  currentBook?: string;
  currentChapter?: number;
  onGoTo: (ref: BibleReference) => void;
  onDismiss: () => void;
}

/** Shown above the reader when a reading-plan day was opened. */
export function PlanDayBar({ planDay, currentBook, currentChapter, onGoTo, onDismiss }: PlanDayBarProps) {
  const navigate = useNavigate();
  const day = getPlanDay(planDay.planId, planDay.day);
  const [done, setDone] = useState(() => getActivePlan()?.completedDays.includes(planDay.day) ?? false);
  if (!day) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 sm:px-6 py-2.5 border-b border-border/30 bg-foreground/[0.025] font-sans">
      <span className="text-xs uppercase tracking-[0.15em] text-foreground/45">Day {day.day}</span>
      <div className="flex flex-wrap gap-1">
        {day.chapters.map(c => {
          const active = c.book === currentBook && c.chapter === currentChapter;
          return (
            <button
              key={`${c.book}-${c.chapter}`}
              type="button"
              onClick={() => onGoTo({ book: c.book, chapter: c.chapter })}
              className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                active ? 'border-foreground/40 bg-foreground/[0.07] text-foreground' : 'border-border/50 text-foreground/60 hover:text-foreground'
              }`}
            >
              {passageLabel(c)}
            </button>
          );
        })}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {done ? (
          <button
            type="button"
            onClick={() => navigate('/reading')}
            className="inline-flex items-center gap-1 text-xs text-foreground/60 hover:text-foreground"
          >
            <Check className="w-3.5 h-3.5 text-hl-green" /> Day {day.day} read · Next day <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDayComplete(planDay.planId, day.day, true);
              setDone(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1 text-xs font-medium hover:opacity-90"
            title={`Mark ${formatDay(day)} as read`}
          >
            <Check className="w-3.5 h-3.5" /> Mark Day {day.day} as read
          </button>
        )}
        <button
          type="button"
          onClick={onDismiss}
          className="h-7 w-7 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.05]"
          aria-label="Hide reading plan bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
