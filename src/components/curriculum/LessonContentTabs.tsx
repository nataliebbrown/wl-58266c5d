import { useMemo } from 'react';
import { Lightbulb, BookOpen, MessageCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';
import type { Lesson } from '@/types/curriculum';
import { ExercisesTabContent } from './ExercisesTabContent';
import { PracticeTabContent } from './PracticeTabContent';
import { ResourcesTabContent } from './ResourcesTabContent';
import { JournalTabContent } from './JournalTabContent';
import { FlashCardDeck } from './FlashCardDeck';
import { useReflectionAnswers } from '@/hooks/useReflectionAnswers';

/* ------------------------------------------------------------------ */
/*  Content segment parser – interleave markers within teaching text  */
/* ------------------------------------------------------------------ */

type ContentSegment =
  | { type: 'markdown'; content: string }
  | { type: 'keyPoint'; index: number }
  | { type: 'scripture'; index: number }
  | { type: 'flashcardDeck'; index: number };

const MARKER_REGEX = /\{\{(keyPoint|scripture|flashcardDeck):(\d+)\}\}/g;

function parseStructuredContent(text: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let match;
  const regex = new RegExp(MARKER_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: match[1] as 'keyPoint' | 'scripture' | 'flashcardDeck', index: parseInt(match[2]) });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'markdown', content: text.slice(lastIndex) });
  }
  return segments;
}

/* ------------------------------------------------------------------ */

interface LessonContentTabsProps {
  lesson: Lesson;
  lessonId: string;
  onScriptureClick: (ref: { label: string; book: string; chapter: number; verse?: number; endVerse?: number }) => void;
  onAskSophia: (prompt: string) => void;
}

export function LessonContentTabs({ lesson, lessonId, onScriptureClick, onAskSophia }: LessonContentTabsProps) {
  const hasReflection = !!lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0;
  const hasExercises = !!lesson.exercises && lesson.exercises.length > 0;
  const hasResources = !!lesson.resources && lesson.resources.length > 0;
  const { answers, setAnswer, savingIndex } = useReflectionAnswers(
    lessonId,
    lesson.reflectionQuestions ?? []
  );

  const tabs = useMemo(() => {
    const list: { value: string; label: string }[] = [
      { value: 'lesson', label: 'Lesson' },
    ];
    if (hasReflection) list.push({ value: 'reflection', label: 'Reflection' });
    if (hasExercises) list.push({ value: 'exercises', label: 'Exercises' });
    if (hasResources) list.push({ value: 'resources', label: 'Resources' });
    list.push({ value: 'journal', label: 'Journal' });
    return list;
  }, [hasReflection, hasExercises, hasResources]);

  return (
    <Tabs defaultValue="lesson" className="w-full">
      <TabsList className="bg-transparent border-b border-border/20 rounded-none h-auto p-0 gap-0 w-full justify-start">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-hl-green data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none px-4 py-2.5 text-sm font-medium text-foreground/50 hover:text-foreground/70 transition-colors"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Lesson Tab */}
      <TabsContent value="lesson" className="mt-4">
        {lesson.teachingContent && /\{\{(keyPoint|scripture|flashcardDeck):\d+\}\}/.test(lesson.teachingContent) ? (
          // ---- Interleaved mode: markers control placement ----
          <>
            {parseStructuredContent(lesson.teachingContent).map((segment, i) => {
              if (segment.type === 'markdown') {
                return (
                  <div key={i} className="lesson-prose">
                    {renderSophiaMarkdown(segment.content)}
                  </div>
                );
              }
              if (segment.type === 'keyPoint') {
                const point = lesson.keyPoints?.[segment.index];
                if (!point) return null;
                return (
                  <div key={i} className="my-6">
                    <div className="border border-border/20 rounded-xl p-4 hover:bg-foreground/[0.02] dark:hover:bg-wl-olive-300/5 transition-colors">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-hl-green flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">{point.title}</h4>
                          <p className="text-sm text-foreground/60 leading-relaxed">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (segment.type === 'scripture') {
                const ref = lesson.scriptureRefs?.[segment.index];
                if (!ref) return null;
                return (
                  <div key={i} className="my-4">
                    <button
                      onClick={() => onScriptureClick(ref)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-hl-green bg-hl-green/10 hover:bg-hl-green/20 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {ref.label}
                    </button>
                  </div>
                );
              }
              if (segment.type === 'flashcardDeck') {
                const deck = lesson.flashCardDecks?.[segment.index];
                if (!deck) return null;
                return (
                  <div key={i} className="my-8">
                    <FlashCardDeck deck={deck} />
                  </div>
                );
              }
              return null;
            })}
          </>
        ) : (
          // ---- Fixed-order mode: backwards compatible ----
          <>
            {/* Scripture References */}
            {lesson.scriptureRefs && lesson.scriptureRefs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {lesson.scriptureRefs.map((ref, i) => (
                  <button
                    key={i}
                    onClick={() => onScriptureClick(ref)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-hl-green bg-hl-green/10 hover:bg-hl-green/20 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {ref.label}
                  </button>
                ))}
              </div>
            )}

            {lesson.recommendedReading && lesson.recommendedReading.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Reading</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {lesson.recommendedReading.map((reading, i) => (
                    <li key={i} className="text-sm text-foreground/70 leading-relaxed">
                      {reading}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Concepts */}
            {lesson.keyPoints && lesson.keyPoints.length > 0 && (
              <div className="space-y-3 mb-6">
                {lesson.keyPoints.map((point, i) => (
                  <div
                    key={i}
                    className="border border-border/20 rounded-xl p-4 hover:bg-foreground/[0.02] dark:hover:bg-wl-olive-300/5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-hl-green flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">{point.title}</h4>
                        <p className="text-sm text-foreground/60 leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teaching Content */}
            {lesson.teachingContent ? (
              <div className="lesson-prose">{renderSophiaMarkdown(lesson.teachingContent)}</div>
            ) : (
              <p className="text-sm text-foreground/70 leading-relaxed">{lesson.description}</p>
            )}

            {/* Practice (Flashcard Decks) */}
            {lesson.flashCardDecks && lesson.flashCardDecks.length > 0 && (
              <div className="mt-8">
                <PracticeTabContent decks={lesson.flashCardDecks} />
              </div>
            )}
          </>
        )}

        {/* Practical Application — always at bottom */}
        {lesson.practicalApplication && lesson.practicalApplication.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Practical Application</h3>
            <ul className="space-y-2">
              {lesson.practicalApplication.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <MessageCircle className="w-3.5 h-3.5 text-foreground/40 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </TabsContent>

      {/* Reflection Tab */}
      {hasReflection && (
        <TabsContent value="reflection" className="mt-4">
          <p className="text-xs text-foreground/40 mb-4">
            Your answers are auto-saved and added to your journal.
          </p>
          <div className="space-y-6">
            {lesson.reflectionQuestions!.map((q, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-hl-green/10 text-hl-green flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/80 leading-relaxed">{q}</p>
                    <button
                      onClick={() => onAskSophia(q)}
                      className="text-xs text-hl-green/70 hover:text-hl-green mt-1 transition-colors"
                    >
                      Discuss with Sophia
                    </button>
                  </div>
                </div>
                <div className="pl-9">
                  <textarea
                    value={answers[i] ?? ''}
                    onChange={(e) => setAnswer(i, e.target.value)}
                    placeholder="Type your answer..."
                    rows={3}
                    className="w-full p-3 rounded-lg border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 text-sm text-foreground leading-relaxed placeholder:text-foreground/25 resize-y focus:outline-none focus:ring-1 focus:ring-hl-green/30 focus:border-hl-green/30 transition-colors"
                  />
                  {savingIndex === i && (
                    <span className="text-[10px] text-foreground/30 mt-0.5 block">Saving...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      )}

      {/* Exercises Tab */}
      {hasExercises && (
        <TabsContent value="exercises" className="mt-4">
          <ExercisesTabContent exercises={lesson.exercises!} />
        </TabsContent>
      )}

      {/* Resources Tab */}
      {hasResources && (
        <TabsContent value="resources" className="mt-4">
          <ResourcesTabContent resources={lesson.resources!} />
        </TabsContent>
      )}

      {/* Journal Tab */}
      <TabsContent value="journal" className="mt-4">
        <JournalTabContent lessonId={lessonId} reflectionQuestions={lesson.reflectionQuestions} />
      </TabsContent>
    </Tabs>
  );
}
