import { useState, useEffect, useRef, useCallback } from 'react';
import { getJournalEntry, saveJournalEntry, getJournalUpdatedAt } from '@/lib/journalStorage';

const DEBOUNCE_MS = 500;

export function useLessonJournal(lessonId: string) {
  const [text, setTextState] = useState(() => getJournalEntry(lessonId));
  const [lastSaved, setLastSaved] = useState<string | null>(() => getJournalUpdatedAt(lessonId));
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when lessonId changes
  useEffect(() => {
    setTextState(getJournalEntry(lessonId));
    setLastSaved(getJournalUpdatedAt(lessonId));
    setIsSaving(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [lessonId]);

  const setText = useCallback(
    (newText: string) => {
      setTextState(newText);
      setIsSaving(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveJournalEntry(lessonId, newText);
        setLastSaved(new Date().toISOString());
        setIsSaving(false);
      }, DEBOUNCE_MS);
    },
    [lessonId],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { text, setText, lastSaved, isSaving };
}
