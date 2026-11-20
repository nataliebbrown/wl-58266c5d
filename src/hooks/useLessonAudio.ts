import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { synthesizeSpeech, isElevenLabsAvailable } from '@/lib/elevenLabs';

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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunkRef = useRef(0);
  const statusRef = useRef<AudioStatus>('idle');

  const hasTTS = isElevenLabsAvailable();

  // Progress as 0–1
  const progress = totalSeconds > 0 ? Math.min(elapsedSeconds / totalSeconds, 1) : 0;

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

  // Speak a specific chunk via ElevenLabs, chain to next on end
  const speakChunk = useCallback(
    async (index: number) => {
      if (!hasTTS || index >= chunks.length) {
        // Finished all chunks
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        stopTimer();
        setStatus('idle');
        statusRef.current = 'idle';
        setCurrentChunk(0);
        chunkRef.current = 0;
        setElapsedSeconds(0);
        return;
      }

      try {
        const url = await synthesizeSpeech(chunks[index]);

        // Check if we were stopped while fetching
        if (statusRef.current !== 'playing') return;

        // Stop previous audio
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          if (statusRef.current === 'playing') {
            const next = chunkRef.current + 1;
            chunkRef.current = next;
            setCurrentChunk(next);
            const wordsRead = cumWords[Math.min(next, chunks.length)];
            setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));
            speakChunk(next);
          }
        };

        audio.onerror = () => {
          if (statusRef.current === 'playing') {
            const next = chunkRef.current + 1;
            chunkRef.current = next;
            setCurrentChunk(next);
            speakChunk(next);
          }
        };

        await audio.play();
      } catch (error) {
        console.error('ElevenLabs lesson audio error:', error);
        if (statusRef.current === 'playing') {
          const next = chunkRef.current + 1;
          chunkRef.current = next;
          setCurrentChunk(next);
          speakChunk(next);
        }
      }
    },
    [hasTTS, chunks, cumWords, stopTimer]
  );

  const play = useCallback(() => {
    if (!hasTTS) return;

    if (statusRef.current === 'paused' && audioRef.current) {
      // Resume paused audio
      audioRef.current.play();
      setStatus('playing');
      statusRef.current = 'playing';
      startTimer();
      return;
    }

    // Start from current chunk
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setStatus('playing');
    statusRef.current = 'playing';
    startTimer();
    speakChunk(chunkRef.current);
  }, [hasTTS, speakChunk, startTimer]);

  const pause = useCallback(() => {
    if (!hasTTS) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    chunkRef.current = next;
    setCurrentChunk(next);
    const wordsRead = cumWords[next];
    setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));

    if (statusRef.current === 'playing') {
      speakChunk(next);
    }
  }, [hasTTS, chunks.length, cumWords, speakChunk]);

  const skipBack = useCallback(() => {
    if (!hasTTS || chunks.length === 0) return;
    const prev = Math.max(chunkRef.current - 1, 0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    chunkRef.current = prev;
    setCurrentChunk(prev);
    const wordsRead = cumWords[prev];
    setElapsedSeconds(Math.round((wordsRead / WORDS_PER_MINUTE) * 60));

    if (statusRef.current === 'playing') {
      speakChunk(prev);
    }
  }, [hasTTS, chunks.length, cumWords, speakChunk]);

  const seekTo = useCallback(
    (targetProgress: number) => {
      if (!hasTTS || chunks.length === 0) return;
      const targetWord = Math.round(targetProgress * totalWords);
      let chunkIndex = 0;
      for (let i = 1; i < cumWords.length; i++) {
        if (cumWords[i] > targetWord) break;
        chunkIndex = i;
      }
      chunkIndex = Math.min(chunkIndex, chunks.length - 1);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      chunkRef.current = chunkIndex;
      setCurrentChunk(chunkIndex);
      setElapsedSeconds(Math.round(targetProgress * totalSeconds));

      if (statusRef.current === 'playing') {
        speakChunk(chunkIndex);
      }
    },
    [hasTTS, chunks.length, totalWords, totalSeconds, cumWords, speakChunk]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
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
