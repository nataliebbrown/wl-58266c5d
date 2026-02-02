import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getGeneralJournalEntry,
  saveGeneralJournalEntry,
  type GeneralJournalEntry,
} from '@/lib/journalStorage';

const DEBOUNCE_MS = 500;

export function useGeneralJournal(entryId: string | null) {
  const [entry, setEntry] = useState<GeneralJournalEntry | null>(() => {
    if (!entryId) return null;
    return getGeneralJournalEntry(entryId);
  });
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when entryId changes
  useEffect(() => {
    if (!entryId) {
      setEntry(null);
    } else {
      setEntry(getGeneralJournalEntry(entryId));
    }
    setIsSaving(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [entryId]);

  const save = useCallback(
    (updated: GeneralJournalEntry) => {
      setIsSaving(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveGeneralJournalEntry(updated);
        setIsSaving(false);
      }, DEBOUNCE_MS);
    },
    []
  );

  const setTitle = useCallback(
    (title: string) => {
      setEntry(prev => {
        if (!prev) return prev;
        const updated = { ...prev, title, updatedAt: new Date().toISOString() };
        save(updated);
        return updated;
      });
    },
    [save]
  );

  const setText = useCallback(
    (text: string) => {
      setEntry(prev => {
        if (!prev) return prev;
        const updated = { ...prev, text, updatedAt: new Date().toISOString() };
        save(updated);
        return updated;
      });
    },
    [save]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { entry, setTitle, setText, isSaving };
}
