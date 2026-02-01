import { useLessonJournal } from '@/hooks/useLessonJournal';

interface JournalTabContentProps {
  lessonId: string;
}

export function JournalTabContent({ lessonId }: JournalTabContentProps) {
  const { text, setText, isSaving, lastSaved } = useLessonJournal(lessonId);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-foreground/40">
          Your personal notes for this lesson. Auto-saved as you type.
        </p>
        <span className="text-[10px] text-foreground/30">
          {isSaving ? 'Saving...' : lastSaved ? 'Saved' : ''}
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes, reflections, and insights..."
        className="w-full min-h-[240px] p-4 rounded-xl border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 text-sm text-foreground leading-relaxed placeholder:text-foreground/30 resize-y focus:outline-none focus:ring-1 focus:ring-hl-green/30 focus:border-hl-green/30 transition-colors"
      />
    </div>
  );
}
