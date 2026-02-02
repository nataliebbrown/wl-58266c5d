import { useNavigate } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';
import { useLessonJournal } from '@/hooks/useLessonJournal';
import { getReflectionAnswers } from '@/lib/journalStorage';

interface JournalTabContentProps {
  lessonId: string;
  reflectionQuestions?: string[];
}

export function JournalTabContent({ lessonId, reflectionQuestions }: JournalTabContentProps) {
  const navigate = useNavigate();
  const { text, setText, isSaving, lastSaved } = useLessonJournal(lessonId);
  const reflectionAnswers = getReflectionAnswers(lessonId);
  const answeredQuestions = reflectionQuestions
    ? reflectionQuestions
        .map((q, i) => ({ question: q, answer: reflectionAnswers[i] }))
        .filter(item => item.answer && item.answer.trim())
    : [];

  return (
    <div className="space-y-4">
      {/* Reflection answers summary */}
      {answeredQuestions.length > 0 && (
        <div className="rounded-xl border border-border/20 bg-white/30 dark:bg-wl-olive-300/5 p-4">
          <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3">
            Reflection Answers
          </h4>
          <div className="space-y-3">
            {answeredQuestions.map((item, i) => (
              <div key={i}>
                <p className="text-xs text-foreground/50 leading-relaxed">{item.question}</p>
                <p className="text-sm text-foreground/80 leading-relaxed mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free-form journal */}
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

      {/* Link to full journal */}
      <button
        onClick={() => navigate('/journal')}
        className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/60 transition-colors mt-2"
      >
        <NotebookPen className="w-3 h-3" />
        View all entries in your Journal
      </button>
    </div>
  );
}
