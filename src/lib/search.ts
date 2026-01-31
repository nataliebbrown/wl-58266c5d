import { BIBLE_BOOKS } from '@/lib/bibleApi';
import { getAllInsights } from '@/lib/insights';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import { getQuizData } from '@/lib/onboardingState';
import type { Curriculum, Lesson } from '@/types/curriculum';

// ============ Types ============

export interface SearchResult {
  type: 'scripture' | 'curriculum' | 'insight' | 'conversation';
  title: string;
  subtitle?: string;
  id: string;
  navigateTo: string;
  navigateState?: Record<string, unknown>;
}

// ============ Helpers ============

function matchScore(text: string, query: string): number {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  if (lower === q) return 3;
  if (lower.startsWith(q)) return 2;
  if (lower.includes(q)) return 1;
  return 0;
}

function getAllLessons(curriculum: Curriculum): Lesson[] {
  const lessons: Lesson[] = [];
  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      for (const section of mod.sections) {
        for (const lesson of section.lessons) {
          lessons.push(lesson);
        }
      }
    }
  }
  return lessons;
}

// ============ Search Functions ============

export function searchScripture(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return BIBLE_BOOKS
    .filter(
      (book) =>
        book.name.toLowerCase().includes(q) ||
        book.abbreviation.toLowerCase().includes(q),
    )
    .sort((a, b) => matchScore(b.name, q) - matchScore(a.name, q))
    .map((book) => ({
      type: 'scripture' as const,
      title: book.name,
      subtitle: `${book.chapters} chapters · ${book.testament === 'OT' ? 'Old Testament' : 'New Testament'}`,
      id: book.name,
      navigateTo: '/bible',
      navigateState: { initialReference: { book: book.name, chapter: 1 } },
    }));
}

export function searchCurriculum(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const quizData = getQuizData();
  const curriculum = getCurriculumForUser(quizData);
  const lessons = getAllLessons(curriculum);

  return lessons
    .filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(q) ||
        (lesson.description && lesson.description.toLowerCase().includes(q)),
    )
    .map((lesson) => ({
      type: 'curriculum' as const,
      title: lesson.title,
      subtitle: lesson.description,
      id: lesson.id,
      navigateTo: '/learn',
    }));
}

export function searchInsights(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const insights = getAllInsights();

  return insights
    .filter(
      (insight) =>
        insight.title.toLowerCase().includes(q) ||
        insight.content.toLowerCase().includes(q) ||
        insight.theme.toLowerCase().includes(q) ||
        insight.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    .map((insight) => ({
      type: 'insight' as const,
      title: insight.theme || insight.title,
      subtitle:
        insight.content.slice(0, 80) +
        (insight.content.length > 80 ? '...' : ''),
      id: insight.id,
      navigateTo: '/insights',
    }));
}

// ============ Recent Searches ============

const RECENT_SEARCHES_KEY = 'wholelicity-recent-searches';
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  const recent = getRecentSearches().filter((s) => s !== query);
  recent.unshift(query);
  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT)),
  );
}
