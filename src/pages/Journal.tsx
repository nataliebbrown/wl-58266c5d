import { useState, useMemo, useCallback } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { getCurriculumForUser } from '@/lib/curriculum';
import { getQuizData } from '@/lib/onboardingState';
import {
  getAllLessonJournalEntries,
  getAllReflectionEntries,
  getGeneralJournalEntries,
  saveGeneralJournalEntry,
  deleteGeneralJournalEntry,
  type GeneralJournalEntry,
} from '@/lib/journalStorage';
import { JournalEntryRow, type JournalActivityItem } from '@/components/journal/JournalEntryRow';
import { JournalEntryEditor } from '@/components/journal/JournalEntryEditor';
import { JournalByLessonView } from '@/components/journal/JournalByLessonView';
import type { Curriculum, Lesson } from '@/types/curriculum';

// ============ Helpers ============

function buildLessonMap(curriculum: Curriculum): Map<string, Lesson> {
  const map = new Map<string, Lesson>();
  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      for (const section of mod.sections) {
        for (const lesson of section.lessons) {
          map.set(lesson.id, lesson);
        }
      }
    }
  }
  return map;
}

function buildActivityList(
  lessonMap: Map<string, Lesson>
): JournalActivityItem[] {
  const items: JournalActivityItem[] = [];

  // General journal entries
  for (const entry of getGeneralJournalEntries()) {
    items.push({
      type: 'general',
      id: entry.id,
      title: entry.title || 'Untitled',
      preview: entry.text.slice(0, 120).replace(/\n/g, ' '),
      updatedAt: entry.updatedAt,
    });
  }

  // Lesson journal entries
  for (const entry of getAllLessonJournalEntries()) {
    // Strip the synced reflection block from preview
    const cleanText = entry.text.replace(/--- Reflection Answers ---[\s\S]*$/, '').trim();
    if (!cleanText) continue;

    const lesson = lessonMap.get(entry.lessonId);
    items.push({
      type: 'lesson',
      id: `lesson-${entry.lessonId}`,
      lessonId: entry.lessonId,
      title: lesson?.title ?? entry.lessonId,
      preview: cleanText.slice(0, 120).replace(/\n/g, ' '),
      updatedAt: entry.updatedAt,
    });
  }

  // Reflection entries (only if they don't already have a lesson journal entry)
  const lessonJournalIds = new Set(
    getAllLessonJournalEntries().map(e => e.lessonId)
  );
  for (const entry of getAllReflectionEntries()) {
    // If there's already a lesson journal row, reflections show inside it
    if (lessonJournalIds.has(entry.lessonId)) continue;

    const answeredCount = Object.values(entry.answers).filter(a => a.trim()).length;
    const firstAnswer = Object.values(entry.answers).find(a => a.trim()) ?? '';
    const lesson = lessonMap.get(entry.lessonId);

    items.push({
      type: 'reflection',
      id: `reflection-${entry.lessonId}`,
      lessonId: entry.lessonId,
      title: lesson?.title ?? entry.lessonId,
      preview: `${answeredCount} reflection${answeredCount !== 1 ? 's' : ''} — ${firstAnswer.slice(0, 80)}`.replace(/\n/g, ' '),
      updatedAt: new Date().toISOString(), // reflections don't store timestamps
    });
  }

  // Sort by updatedAt desc
  items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return items;
}

// ============ Component ============

type Tab = 'all' | 'by-lesson';

export default function Journal() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const curriculum = useMemo(() => getCurriculumForUser(getQuizData()), []);
  const lessonMap = useMemo(() => buildLessonMap(curriculum), [curriculum]);

  const allItems = useMemo(
    () => buildActivityList(lessonMap),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessonMap, refreshKey]
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.preview.toLowerCase().includes(q)
    );
  }, [allItems, searchQuery]);

  const totalCount = allItems.length;

  const handleNewEntry = useCallback(() => {
    const now = new Date().toISOString();
    const entry: GeneralJournalEntry = {
      id: crypto.randomUUID(),
      title: '',
      text: '',
      createdAt: now,
      updatedAt: now,
    };
    saveGeneralJournalEntry(entry);
    setRefreshKey(k => k + 1);
    setExpandedId(entry.id);
    setActiveTab('all');
  }, []);

  const handleDeleteEntry = useCallback(
    (id: string) => {
      deleteGeneralJournalEntry(id);
      setRefreshKey(k => k + 1);
      if (expandedId === id) setExpandedId(null);
    },
    [expandedId]
  );

  const getLessonData = (lessonId?: string) => {
    if (!lessonId) return {};
    const lesson = lessonMap.get(lessonId);
    return {
      lessonTitle: lesson?.title,
      reflectionQuestions: lesson?.reflectionQuestions,
    };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">Your Journal</h2>
              {totalCount > 0 && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-foreground/[0.05] text-foreground/40">
                  {totalCount} {totalCount === 1 ? 'entry' : 'entries'}
                </span>
              )}
            </div>
            <button
              onClick={handleNewEntry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-hl-green/10 text-hl-green hover:bg-hl-green/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-border/20 mb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-foreground/60 text-foreground'
                  : 'border-transparent text-foreground/40 hover:text-foreground/60'
              }`}
            >
              All Entries
            </button>
            <button
              onClick={() => setActiveTab('by-lesson')}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'by-lesson'
                  ? 'border-foreground/60 text-foreground'
                  : 'border-transparent text-foreground/40 hover:text-foreground/60'
              }`}
            >
              By Lesson
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-1 focus:ring-hl-green/30 focus:border-hl-green/30 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-foreground/5 text-foreground/30"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Content */}
          {activeTab === 'all' ? (
            filteredItems.length === 0 ? (
              <p className="text-sm italic text-muted-foreground text-center py-12">
                {searchQuery
                  ? 'No entries match your search.'
                  : 'Your journal is waiting. Tap "New Entry" to write your first thought, or visit a lesson to start reflecting.'}
              </p>
            ) : (
              <div className="rounded-xl border border-border/20 overflow-hidden">
                {filteredItems.map(item => (
                  <div key={item.id}>
                    <JournalEntryRow
                      item={item}
                      isExpanded={expandedId === item.id}
                      onToggle={() =>
                        setExpandedId(prev => (prev === item.id ? null : item.id))
                      }
                    />
                    {expandedId === item.id && (
                      <div className="px-4 pb-4 pt-2 bg-foreground/[0.01] border-b border-foreground/[0.04]">
                        <JournalEntryEditor
                          type={item.type}
                          id={item.type === 'general' ? item.id : item.lessonId ?? item.id}
                          lessonId={item.lessonId}
                          {...getLessonData(item.lessonId)}
                          onDelete={
                            item.type === 'general'
                              ? () => handleDeleteEntry(item.id)
                              : undefined
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <JournalByLessonView
              curriculum={curriculum}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </div>
  );
}
