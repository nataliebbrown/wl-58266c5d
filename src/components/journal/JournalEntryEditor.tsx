import { Trash2 } from 'lucide-react';
import { useLessonJournal } from '@/hooks/useLessonJournal';
import { useGeneralJournal } from '@/hooks/useGeneralJournal';
import { getReflectionAnswers } from '@/lib/journalStorage';

// ============ General Entry Editor ============

function GeneralEditor({
  entryId,
  onDelete,
}: {
  entryId: string;
  onDelete: () => void;
}) {
  const { entry, setTitle, setText, isSaving } = useGeneralJournal(entryId);
  if (!entry) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={entry.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title..."
          className="flex-1 text-sm font-medium text-foreground bg-transparent border-none outline-none placeholder:text-foreground/25"
        />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-foreground/30">
            {isSaving ? 'Saving...' : 'Saved'}
          </span>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-destructive/10 text-foreground/25 hover:text-destructive transition-colors"
            title="Delete entry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <textarea
        value={entry.text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        rows={6}
        className="w-full p-3 rounded-lg border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 text-sm text-foreground leading-relaxed placeholder:text-foreground/25 resize-y focus:outline-none focus:ring-1 focus:ring-hl-green/30 focus:border-hl-green/30 transition-colors"
      />
    </div>
  );
}

// ============ Lesson Entry Editor ============

function LessonEditor({
  lessonId,
  lessonTitle,
  reflectionQuestions,
}: {
  lessonId: string;
  lessonTitle: string;
  reflectionQuestions?: string[];
}) {
  const { text, setText, isSaving, lastSaved } = useLessonJournal(lessonId);
  const reflectionAnswers = getReflectionAnswers(lessonId);
  const answeredQuestions = reflectionQuestions
    ? reflectionQuestions
        .map((q, i) => ({ question: q, answer: reflectionAnswers[i] }))
        .filter(item => item.answer && item.answer.trim())
    : [];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
        {lessonTitle}
      </h4>

      {/* Reflection answers (read-only here — edit in the Reflection tab) */}
      {answeredQuestions.length > 0 && (
        <div className="space-y-2.5">
          <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-wider">
            Reflection Answers
          </span>
          {answeredQuestions.map((item, i) => (
            <div key={i} className="pl-3 border-l-2 border-hl-green/20">
              <p className="text-xs text-foreground/40 leading-relaxed">{item.question}</p>
              <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">{item.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Free-form journal */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-wider">
            Notes
          </span>
          <span className="text-[10px] text-foreground/30">
            {isSaving ? 'Saving...' : lastSaved ? 'Saved' : ''}
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your notes..."
          rows={5}
          className="w-full p-3 rounded-lg border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 text-sm text-foreground leading-relaxed placeholder:text-foreground/25 resize-y focus:outline-none focus:ring-1 focus:ring-hl-green/30 focus:border-hl-green/30 transition-colors"
        />
      </div>
    </div>
  );
}

// ============ Unified Editor ============

interface JournalEntryEditorProps {
  type: 'general' | 'lesson' | 'reflection';
  id: string;
  lessonId?: string;
  lessonTitle?: string;
  reflectionQuestions?: string[];
  onDelete?: () => void;
}

export function JournalEntryEditor({
  type,
  id,
  lessonId,
  lessonTitle,
  reflectionQuestions,
  onDelete,
}: JournalEntryEditorProps) {
  if (type === 'general') {
    return <GeneralEditor entryId={id} onDelete={onDelete ?? (() => {})} />;
  }

  // Both 'lesson' and 'reflection' types use the lesson editor
  return (
    <LessonEditor
      lessonId={lessonId ?? id}
      lessonTitle={lessonTitle ?? 'Lesson'}
      reflectionQuestions={reflectionQuestions}
    />
  );
}
