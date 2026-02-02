import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getReflectionAnswers,
  saveReflectionAnswer,
  saveJournalEntry,
  getJournalEntry,
} from '@/lib/journalStorage';

const DEBOUNCE_MS = 600;

/**
 * Manages reflection answers for a lesson with debounced auto-save.
 * Also syncs answered reflections into the journal entry.
 */
export function useReflectionAnswers(lessonId: string, questions: string[]) {
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    getReflectionAnswers(lessonId)
  );
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  // Reset when lessonId changes
  useEffect(() => {
    setAnswers(getReflectionAnswers(lessonId));
    setSavingIndex(null);
    // Clear pending timers
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
  }, [lessonId]);

  const syncToJournal = useCallback(
    (updatedAnswers: Record<number, string>) => {
      // Build a formatted reflection section
      const lines: string[] = [];
      questions.forEach((q, i) => {
        const answer = updatedAnswers[i];
        if (answer && answer.trim()) {
          lines.push(`Q: ${q}`);
          lines.push(`A: ${answer.trim()}`);
          lines.push('');
        }
      });

      if (lines.length === 0) return;

      const reflectionBlock = `--- Reflection Answers ---\n${lines.join('\n')}`;
      const existingJournal = getJournalEntry(lessonId);

      // Replace existing reflection block or append
      const marker = '--- Reflection Answers ---';
      if (existingJournal.includes(marker)) {
        const before = existingJournal.slice(0, existingJournal.indexOf(marker)).trimEnd();
        const updated = before ? `${before}\n\n${reflectionBlock}` : reflectionBlock;
        saveJournalEntry(lessonId, updated);
      } else {
        const updated = existingJournal.trim()
          ? `${existingJournal.trim()}\n\n${reflectionBlock}`
          : reflectionBlock;
        saveJournalEntry(lessonId, updated);
      }
    },
    [lessonId, questions]
  );

  const setAnswer = useCallback(
    (questionIndex: number, text: string) => {
      setAnswers(prev => ({ ...prev, [questionIndex]: text }));
      setSavingIndex(questionIndex);

      // Clear existing timer for this question
      if (timersRef.current[questionIndex]) {
        clearTimeout(timersRef.current[questionIndex]);
      }

      timersRef.current[questionIndex] = setTimeout(() => {
        saveReflectionAnswer(lessonId, questionIndex, text);
        // Sync all answers to journal
        setAnswers(current => {
          const latest = { ...current, [questionIndex]: text };
          syncToJournal(latest);
          return current; // no state change, just reading
        });
        setSavingIndex(null);
        delete timersRef.current[questionIndex];
      }, DEBOUNCE_MS);
    },
    [lessonId, syncToJournal]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return { answers, setAnswer, savingIndex };
}
