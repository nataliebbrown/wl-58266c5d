import { useState, useMemo } from 'react';
import { ChevronRight, BookOpen, MessageCircle } from 'lucide-react';
import type { Curriculum } from '@/types/curriculum';
import {
  getJournalEntry,
  getReflectionAnswers,
} from '@/lib/journalStorage';
import { JournalEntryEditor } from './JournalEntryEditor';

interface LessonWithContent {
  id: string;
  title: string;
  journalText: string;
  reflectionCount: number;
  reflectionQuestions?: string[];
}

interface ModuleGroup {
  moduleTitle: string;
  lessons: LessonWithContent[];
}

interface JournalByLessonViewProps {
  curriculum: Curriculum;
  searchQuery: string;
}

export function JournalByLessonView({ curriculum, searchQuery }: JournalByLessonViewProps) {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const modules = useMemo(() => {
    const groups: ModuleGroup[] = [];

    for (const phase of curriculum.phases) {
      for (const mod of phase.modules) {
        const lessons: LessonWithContent[] = [];
        for (const section of mod.sections) {
          for (const lesson of section.lessons) {
            const journalText = getJournalEntry(lesson.id);
            const reflectionAnswers = getReflectionAnswers(lesson.id);
            const reflectionCount = Object.values(reflectionAnswers).filter(a => a.trim()).length;

            if (!journalText && reflectionCount === 0) continue;

            // Search filter
            if (searchQuery) {
              const q = searchQuery.toLowerCase();
              const matchesTitle = lesson.title.toLowerCase().includes(q);
              const matchesJournal = journalText.toLowerCase().includes(q);
              const matchesReflections = Object.values(reflectionAnswers).some(
                a => a.toLowerCase().includes(q)
              );
              if (!matchesTitle && !matchesJournal && !matchesReflections) continue;
            }

            lessons.push({
              id: lesson.id,
              title: lesson.title,
              journalText,
              reflectionCount,
              reflectionQuestions: lesson.reflectionQuestions,
            });
          }
        }
        if (lessons.length > 0) {
          groups.push({ moduleTitle: mod.title, lessons });
        }
      }
    }

    return groups;
  }, [curriculum, searchQuery]);

  if (modules.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground text-center py-12">
        {searchQuery
          ? 'No lesson entries match your search.'
          : 'No lesson entries yet. Start writing in a lesson\'s Journal tab to see your entries here.'}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {modules.map(group => (
        <div key={group.moduleTitle}>
          <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2 px-1">
            {group.moduleTitle}
          </h3>
          <div className="rounded-xl border border-border/20 overflow-hidden">
            {group.lessons.map((lesson, i) => {
              const isExpanded = expandedLesson === lesson.id;
              return (
                <div key={lesson.id}>
                  <button
                    onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-foreground/[0.02] transition-colors ${
                      i > 0 ? 'border-t border-foreground/[0.04]' : ''
                    } ${isExpanded ? 'bg-foreground/[0.02]' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-0.5">
                          {lesson.journalText && (
                            <span className="flex items-center gap-1 text-[10px] text-foreground/30">
                              <BookOpen className="w-3 h-3" />
                              Notes
                            </span>
                          )}
                          {lesson.reflectionCount > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-foreground/30">
                              <MessageCircle className="w-3 h-3" />
                              {lesson.reflectionCount} reflection{lesson.reflectionCount !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-foreground/20 shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-foreground/[0.04]">
                      <JournalEntryEditor
                        type="lesson"
                        id={lesson.id}
                        lessonId={lesson.id}
                        lessonTitle={lesson.title}
                        reflectionQuestions={lesson.reflectionQuestions}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
