import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { selectVoice } from './useVoiceOutput';

// ============ Text Processing ============

function markdownToSpeechText(md: string): string {
  return md
    .replace(/\{\{[^}]+\}\}/g, '')           // remove {{markers}}
    .replace(/^#{1,6}\s+(.+)$/gm, '$1.')     // headings → sentences
    .replace(/\*\*(.+?)\*\*/g, '$1')         // bold
    .replace(/\*(.+?)\*/g, '$1')             // italic
    .replace(/^[-•*]\s+/gm, '')              // list bullets
    .replace(/^\d+[.)]\s+/gm, '')            // numbered lists
    .replace(/>\s*/gm, '')                    // blockquote markers
    .replace(/\n{2,}/g, '\n\n')              // normalize breaks
    .trim();
}

function splitIntoChunks(text: string): string[] {
  return text
    .split('\n\n')
    .map(c => c.trim())
    .filter(c => c.length > 0);
}

function countWords(chunks: string[]): number {
  return chunks.reduce((sum, c) => sum + c.split(/\s+/).length, 0);
}

// Cumulative word counts for each chunk boundary (for seeking)
function cumulativeWords(chunks: string[]): number[] {
  const cumulative: number[] = [0];
  for (const chunk of chunks) {
    cumulative.push(cumulative[cumulative.length - 1] + chunk.split(/\s+/).length);
  }
  return cumulative;
}

const WORDS_PER_MINUTE = 155;

// ============ Hook ============

export type AudioStatus = 'idle' | 'playing' | 'paused';

export function useLessonAudio(content: string) {
  const chunks = useMemo(() => splitIntoChunks(markdownToSpeechText(content)), [content]);
  const totalWords = useMemo(() => countWords(chunks), [chunks]);
  const cumWords = useMemo(() => cumulativeWords(chunks), [chunks]);
  const totalSeconds = useMemo(() => Math.round((totalWords / WORDS_PER_MINUTE) * 60), [totalWords]);

  const [status, setStatus] = useState<AudioStatus>('idle');
  const [currentChunk, setCurrentChunk] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunkRef = useRef(0); // mutable ref for callbacks
  const statusRef = useRef<AudioStatus>('idle');

  const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Progress as 0–1
  const progress = totalSeconds > 0 ? Math.min(elapsedSeconds / totalSeconds, 1) : 0;

  // Load voice
  useEffect(() => {
    if (!hasTTS) return;
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) voiceRef.current = selectVoice(voices);
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [hasTTS]);

  // Elapsed timer
  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Speak a specific chunk, chain to next on end
  const speakChunk = useCallback(
    (index: number) => {
      if (!hasTTS || index >= chunks.length) {
        // Finished all chunks
        speechSynthesis.cancel();
        stopTimer();
        setStatus('idle');
        statusRef.current = 'idle';
        setCurrentChunk(0);
        chunkRef.current = 0;
        setElapsedSeconds(0);
        return;
      }

      // Ensure voice loaded
      if (!voiceRef.current) {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) voiceRef.current = selectVoice(voices);
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        // Only continue if still playing (not stopped/paused externally)
        if (statusRef.current === 'playing') {
          const next = chunkRef.current + 1;
          chunkRef.current = next;
          setCurrentChunk(next);
          // Estimate elapsed based on words read so far
          const wordsRead = cumWords[Math.min(next, chunks.length)];
          setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));
          speakChunk(next);
        }
      };

      utterance.onerror = () => {
        // On error, try to continue with next chunk
        if (statusRef.current === 'playing') {
          const next = chunkRef.current + 1;
          chunkRef.current = next;
          setCurrentChunk(next);
          speakChunk(next);
        }
      };

      speechSynthesis.speak(utterance);
    },
    [hasTTS, chunks, cumWords, stopTimer]
  );

  const play = useCallback(() => {
    if (!hasTTS) return;

    if (statusRef.current === 'paused') {
      // Resume
      speechSynthesis.resume();
      setStatus('playing');
      statusRef.current = 'playing';
      startTimer();
      return;
    }

    // Start from current chunk
    speechSynthesis.cancel();
    setStatus('playing');
    statusRef.current = 'playing';
    startTimer();

    // Small delay after cancel (Chrome bug workaround)
    setTimeout(() => speakChunk(chunkRef.current), 50);
  }, [hasTTS, speakChunk, startTimer]);

  const pause = useCallback(() => {
    if (!hasTTS) return;
    speechSynthesis.pause();
    setStatus('paused');
    statusRef.current = 'paused';
    stopTimer();
  }, [hasTTS, stopTimer]);

  const toggle = useCallback(() => {
    if (status === 'playing') pause();
    else play();
  }, [status, play, pause]);

  const stop = useCallback(() => {
    if (!hasTTS) return;
    speechSynthesis.cancel();
    stopTimer();
    setStatus('idle');
    statusRef.current = 'idle';
    setCurrentChunk(0);
    chunkRef.current = 0;
    setElapsedSeconds(0);
  }, [hasTTS, stopTimer]);

  const skipForward = useCallback(() => {
    if (!hasTTS || chunks.length === 0) return;
    const next = Math.min(chunkRef.current + 1, chunks.length - 1);
    speechSynthesis.cancel();
    chunkRef.current = next;
    setCurrentChunk(next);
    const wordsRead = cumWords[next];
    setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));

    if (statusRef.current === 'playing') {
      setTimeout(() => speakChunk(next), 50);
    }
  }, [hasTTS, chunks.length, cumWords, speakChunk]);

  const skipBack = useCallback(() => {
    if (!hasTTS || chunks.length === 0) return;
    const prev = Math.max(chunkRef.current - 1, 0);
    speechSynthesis.cancel();
    chunkRef.current = prev;
    setCurrentChunk(prev);
    const wordsRead = cumWords[prev];
    setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));

    if (statusRef.current === 'playing') {
      setTimeout(() => speakChunk(prev), 50);
    }
  }, [hasTTS, chunks.length, cumWords, speakChunk]);

  const seekTo = useCallback(
    (targetProgress: number) => {
      if (!hasTTS || chunks.length === 0) return;
      const targetWord = Math.round(targetProgress * totalWords);
      // Find the chunk that contains this word
      let chunkIndex = 0;
      for (let i = 1; i < cumWords.length; i++) {
        if (cumWords[i] > targetWord) break;
        chunkIndex = i;
      }
      chunkIndex = Math.min(chunkIndex, chunks.length - 1);

      speechSynthesis.cancel();
      chunkRef.current = chunkIndex;
      setCurrentChunk(chunkIndex);
      setElapsedSeconds(Math.round(targetProgress * totalSeconds));

      if (statusRef.current === 'playing') {
        setTimeout(() => speakChunk(chunkIndex), 50);
      }
    },
    [hasTTS, chunks.length, totalWords, totalSeconds, cumWords, speakChunk]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    status,
    progress,
    elapsedSeconds,
    totalSeconds,
    currentChunk,
    totalChunks: chunks.length,
    hasTTS,
    play,
    pause,
    toggle,
    stop,
    skipForward,
    skipBack,
    seekTo,
  };
}
