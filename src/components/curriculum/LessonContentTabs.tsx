import { useMemo } from 'react';
import { CheckCircle2, Lightbulb, BookOpen, MessageCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';
import type { Lesson } from '@/types/curriculum';
import { ExercisesTabContent } from './ExercisesTabContent';
import { ResourcesTabContent } from './ResourcesTabContent';
import { JournalTabContent } from './JournalTabContent';

interface LessonContentTabsProps {
  lesson: Lesson;
  lessonId: string;
  onScriptureClick: (ref: { label: string; book: string; chapter: number }) => void;
  onAskSophia: (prompt: string) => void;
}

export function LessonContentTabs({ lesson, lessonId, onScriptureClick, onAskSophia }: LessonContentTabsProps) {
  const hasKeyPoints = !!lesson.keyPoints && lesson.keyPoints.length > 0;
  const hasScripture =
    (!!lesson.scriptureRefs && lesson.scriptureRefs.length > 0) ||
    (!!lesson.recommendedReading && lesson.recommendedReading.length > 0);
  const hasReflection = !!lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0;
  const hasExercises = !!lesson.exercises && lesson.exercises.length > 0;
  const hasResources = !!lesson.resources && lesson.resources.length > 0;

  const tabs = useMemo(() => {
    const list: { value: string; label: string }[] = [
      { value: 'overview', label: 'Overview' },
    ];
    if (hasKeyPoints) list.push({ value: 'concepts', label: 'Key Concepts' });
    if (hasScripture) list.push({ value: 'scripture', label: 'Scripture' });
    if (hasReflection) list.push({ value: 'reflection', label: 'Reflection' });
    if (hasExercises) list.push({ value: 'exercises', label: 'Exercises' });
    if (hasResources) list.push({ value: 'resources', label: 'Resources' });
    list.push({ value: 'journal', label: 'Journal' });
    return list;
  }, [hasKeyPoints, hasScripture, hasReflection, hasExercises, hasResources]);

  return (
    <Tabs defaultValue="overview" className="w-full">
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

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-4">
        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="space-y-2.5 mb-6">
            {lesson.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-hl-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/70 leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        )}

        {lesson.teachingContent ? (
          <div className="space-y-0">{renderSophiaMarkdown(lesson.teachingContent)}</div>
        ) : (
          <p className="text-sm text-foreground/70 leading-relaxed">{lesson.description}</p>
        )}

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

      {/* Key Concepts Tab */}
      {hasKeyPoints && (
        <TabsContent value="concepts" className="mt-4">
          <div className="space-y-3">
            {lesson.keyPoints!.map((point, i) => (
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
        </TabsContent>
      )}

      {/* Scripture Tab */}
      {hasScripture && (
        <TabsContent value="scripture" className="mt-4">
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
            <div>
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
        </TabsContent>
      )}

      {/* Reflection Tab */}
      {hasReflection && (
        <TabsContent value="reflection" className="mt-4">
          <div>
            {lesson.reflectionQuestions!.map((q, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-border/10 last:border-0">
                <span className="w-6 h-6 rounded-full bg-hl-green/10 text-hl-green flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-foreground/80 leading-relaxed">{q}</p>
                  <button
                    onClick={() => onAskSophia(q)}
                    className="text-xs text-hl-green/70 hover:text-hl-green mt-1.5 transition-colors"
                  >
                    Discuss with Sophia
                  </button>
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
        <JournalTabContent lessonId={lessonId} />
      </TabsContent>
    </Tabs>
  );
}
