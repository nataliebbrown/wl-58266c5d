const STORAGE_KEY = 'wholelicity-journal';
const REFLECTION_KEY = 'wholelicity-reflections';

interface JournalEntry {
  text: string;
  updatedAt: string;
}

interface JournalStore {
  [lessonId: string]: JournalEntry;
}

function getStore(): JournalStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading journal store:', e);
  }
  return {};
}

function saveStore(store: JournalStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getJournalEntry(lessonId: string): string {
  const store = getStore();
  return store[lessonId]?.text ?? '';
}

export function getJournalUpdatedAt(lessonId: string): string | null {
  const store = getStore();
  return store[lessonId]?.updatedAt ?? null;
}

export function saveJournalEntry(lessonId: string, text: string): void {
  const store = getStore();
  if (text.trim() === '') {
    delete store[lessonId];
  } else {
    store[lessonId] = { text, updatedAt: new Date().toISOString() };
  }
  saveStore(store);
}

// ============ Reflection Answers ============

interface ReflectionAnswers {
  [questionIndex: number]: string;
}

interface ReflectionStore {
  [lessonId: string]: ReflectionAnswers;
}

function getReflectionStore(): ReflectionStore {
  try {
    const stored = localStorage.getItem(REFLECTION_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading reflection store:', e);
  }
  return {};
}

function saveReflectionStore(store: ReflectionStore): void {
  localStorage.setItem(REFLECTION_KEY, JSON.stringify(store));
}

export function getReflectionAnswers(lessonId: string): ReflectionAnswers {
  return getReflectionStore()[lessonId] ?? {};
}

export function saveReflectionAnswer(lessonId: string, questionIndex: number, answer: string): void {
  const store = getReflectionStore();
  if (!store[lessonId]) store[lessonId] = {};
  if (answer.trim() === '') {
    delete store[lessonId][questionIndex];
    if (Object.keys(store[lessonId]).length === 0) delete store[lessonId];
  } else {
    store[lessonId][questionIndex] = answer;
  }
  saveReflectionStore(store);
}

// ============ General Journal Entries ============

const GENERAL_KEY = 'wholelicity-general-journal';

export interface GeneralJournalEntry {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

function getGeneralStore(): GeneralJournalEntry[] {
  try {
    const stored = localStorage.getItem(GENERAL_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading general journal store:', e);
  }
  return [];
}

function saveGeneralStore(entries: GeneralJournalEntry[]): void {
  localStorage.setItem(GENERAL_KEY, JSON.stringify(entries));
}

export function getGeneralJournalEntries(): GeneralJournalEntry[] {
  return getGeneralStore().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getGeneralJournalEntry(id: string): GeneralJournalEntry | null {
  return getGeneralStore().find(e => e.id === id) ?? null;
}

export function saveGeneralJournalEntry(entry: GeneralJournalEntry): void {
  const store = getGeneralStore();
  const idx = store.findIndex(e => e.id === entry.id);
  if (idx >= 0) {
    store[idx] = entry;
  } else {
    store.push(entry);
  }
  saveGeneralStore(store);
}

export function deleteGeneralJournalEntry(id: string): void {
  const store = getGeneralStore().filter(e => e.id !== id);
  saveGeneralStore(store);
}

// ============ Aggregation Helpers ============

export function getAllLessonJournalEntries(): { lessonId: string; text: string; updatedAt: string }[] {
  const store = getStore();
  return Object.entries(store)
    .filter(([, entry]) => entry.text.trim() !== '')
    .map(([lessonId, entry]) => ({ lessonId, text: entry.text, updatedAt: entry.updatedAt }));
}

export function getAllReflectionEntries(): { lessonId: string; answers: ReflectionAnswers }[] {
  const store = getReflectionStore();
  return Object.entries(store)
    .filter(([, answers]) => Object.values(answers).some(a => a.trim() !== ''))
    .map(([lessonId, answers]) => ({ lessonId, answers }));
}
