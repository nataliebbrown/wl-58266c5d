const STORAGE_KEY = 'wholelicity-journal';

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
