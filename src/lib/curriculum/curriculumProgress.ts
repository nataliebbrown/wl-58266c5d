import type { Curriculum, Lesson, Phase } from '@/types/curriculum';

const STORAGE_KEY = 'wholelicity-curriculum-progress';

export interface CurriculumProgress {
  completedLessons: string[];
  currentLessonId: string | null;
  lastAccessedAt: string;
  startedAt: string;
}

const defaultProgress: CurriculumProgress = {
  completedLessons: [],
  currentLessonId: null,
  lastAccessedAt: new Date().toISOString(),
  startedAt: new Date().toISOString(),
};

// ============ CRUD ============

export function getCurriculumProgress(): CurriculumProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading curriculum progress:', e);
  }
  return { ...defaultProgress };
}

function saveCurriculumProgress(progress: CurriculumProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonComplete(lessonId: string): void {
  const progress = getCurriculumProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  progress.lastAccessedAt = new Date().toISOString();
  saveCurriculumProgress(progress);
}

export function markLessonIncomplete(lessonId: string): void {
  const progress = getCurriculumProgress();
  progress.completedLessons = progress.completedLessons.filter(id => id !== lessonId);
  progress.lastAccessedAt = new Date().toISOString();
  saveCurriculumProgress(progress);
}

export function setCurrentLesson(lessonId: string): void {
  const progress = getCurriculumProgress();
  progress.currentLessonId = lessonId;
  progress.lastAccessedAt = new Date().toISOString();
  saveCurriculumProgress(progress);
}

export function initializeProgress(): void {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    saveCurriculumProgress({
      ...defaultProgress,
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    });
  }
}

// ============ Queries ============

export function isLessonComplete(lessonId: string): boolean {
  const progress = getCurriculumProgress();
  return progress.completedLessons.includes(lessonId);
}

export function getTotalLessonCount(curriculum: Curriculum): number {
  let count = 0;
  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      for (const section of mod.sections) {
        count += section.lessons.length;
      }
    }
  }
  return count;
}

export function getProgressPercentage(curriculum: Curriculum): number {
  const total = getTotalLessonCount(curriculum);
  if (total === 0) return 0;
  const progress = getCurriculumProgress();
  return Math.round((progress.completedLessons.length / total) * 100);
}

export function getPhaseProgress(
  curriculum: Curriculum,
  phaseId: string
): { completed: number; total: number } {
  const phase = curriculum.phases.find(p => p.id === phaseId);
  if (!phase) return { completed: 0, total: 0 };

  const progress = getCurriculumProgress();
  let total = 0;
  let completed = 0;

  for (const mod of phase.modules) {
    for (const section of mod.sections) {
      for (const lesson of section.lessons) {
        total++;
        if (progress.completedLessons.includes(lesson.id)) {
          completed++;
        }
      }
    }
  }

  return { completed, total };
}

export function getModuleProgress(
  curriculum: Curriculum,
  phaseId: string,
  moduleId: string
): { completed: number; total: number } {
  const phase = curriculum.phases.find(p => p.id === phaseId);
  if (!phase) return { completed: 0, total: 0 };

  const mod = phase.modules.find(m => m.id === moduleId);
  if (!mod) return { completed: 0, total: 0 };

  const progress = getCurriculumProgress();
  let total = 0;
  let completed = 0;

  for (const section of mod.sections) {
    for (const lesson of section.lessons) {
      total++;
      if (progress.completedLessons.includes(lesson.id)) {
        completed++;
      }
    }
  }

  return { completed, total };
}

export interface LessonPosition {
  phaseIndex: number;
  moduleIndex: number;
  sectionIndex: number;
  lessonIndex: number;
}

export function findLessonPosition(
  curriculum: Curriculum,
  lessonId: string
): LessonPosition | null {
  for (let pi = 0; pi < curriculum.phases.length; pi++) {
    const phase = curriculum.phases[pi];
    for (let mi = 0; mi < phase.modules.length; mi++) {
      const mod = phase.modules[mi];
      for (let si = 0; si < mod.sections.length; si++) {
        const section = mod.sections[si];
        for (let li = 0; li < section.lessons.length; li++) {
          if (section.lessons[li].id === lessonId) {
            return { phaseIndex: pi, moduleIndex: mi, sectionIndex: si, lessonIndex: li };
          }
        }
      }
    }
  }
  return null;
}

export function getAllLessonsFlat(curriculum: Curriculum): string[] {
  const ids: string[] = [];
  for (const phase of curriculum.phases) {
    for (const mod of phase.modules) {
      for (const section of mod.sections) {
        for (const lesson of section.lessons) {
          ids.push(lesson.id);
        }
      }
    }
  }
  return ids;
}

export function getNextLessonId(
  curriculum: Curriculum,
  currentLessonId: string
): string | null {
  const allIds = getAllLessonsFlat(curriculum);
  const idx = allIds.indexOf(currentLessonId);
  if (idx === -1 || idx === allIds.length - 1) return null;
  return allIds[idx + 1];
}

export function getPreviousLessonId(
  curriculum: Curriculum,
  currentLessonId: string
): string | null {
  const allIds = getAllLessonsFlat(curriculum);
  const idx = allIds.indexOf(currentLessonId);
  if (idx <= 0) return null;
  return allIds[idx - 1];
}

export function getCurrentOrFirstLessonId(curriculum: Curriculum): string | null {
  const progress = getCurriculumProgress();
  if (progress.currentLessonId) return progress.currentLessonId;

  const allIds = getAllLessonsFlat(curriculum);
  // Find the first incomplete lesson
  for (const id of allIds) {
    if (!progress.completedLessons.includes(id)) {
      return id;
    }
  }

  // All completed — return the last lesson
  return allIds.length > 0 ? allIds[allIds.length - 1] : null;
}

export function resetCurriculumProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getPhaseLessonCount(phase: Phase): number {
  let count = 0;
  for (const mod of phase.modules) {
    for (const section of mod.sections) {
      count += section.lessons.length;
    }
  }
  return count;
}

export function getPhaseTotalMinutes(phase: Phase): number {
  let total = 0;
  for (const mod of phase.modules) {
    for (const section of mod.sections) {
      for (const lesson of section.lessons) {
        total += lesson.estimatedMinutes ?? 0;
      }
    }
  }
  return total;
}

export interface ModuleInfo {
  moduleTitle: string;
  sectionTitle: string;
  lessons: Lesson[];
  currentIndex: number;
  moduleProgress: { completed: number; total: number };
}

export function getCurrentModuleInfo(
  curriculum: Curriculum,
  lessonId: string
): ModuleInfo | null {
  const pos = findLessonPosition(curriculum, lessonId);
  if (!pos) return null;

  const phase = curriculum.phases[pos.phaseIndex];
  const mod = phase.modules[pos.moduleIndex];
  const section = mod.sections[pos.sectionIndex];
  const progress = getModuleProgress(curriculum, phase.id, mod.id);

  return {
    moduleTitle: mod.title,
    sectionTitle: section.title,
    lessons: section.lessons,
    currentIndex: pos.lessonIndex,
    moduleProgress: progress,
  };
}
