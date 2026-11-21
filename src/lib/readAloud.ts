// ============ Read aloud ============
//
// Speaks text with ElevenLabs when a key is configured, otherwise with the
// browser's built-in speech synthesis. Audio can be prepared ahead of time so
// playback starts instantly (used by meditation breaths).

import { isElevenLabsAvailable, synthesizeSpeech } from './elevenLabs';

export interface Playback {
  /** Resolves when playback finishes (or is stopped) */
  done: Promise<void>;
  stop: () => void;
}

export function canReadAloud(): boolean {
  return isElevenLabsAvailable() || (typeof window !== 'undefined' && 'speechSynthesis' in window);
}

/** Fetch/cached ElevenLabs audio so a later play() starts immediately. No-op for browser speech. */
export async function prepare(text: string): Promise<void> {
  if (isElevenLabsAvailable()) {
    try {
      await synthesizeSpeech(text);
    } catch {
      /* fall back to browser speech at play time */
    }
  }
}

function speakWithBrowser(text: string, rate: number): Playback {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  let resolve!: () => void;
  const done = new Promise<void>(r => (resolve = r));
  utterance.onend = () => resolve();
  utterance.onerror = () => resolve();
  synth.cancel();
  synth.speak(utterance);
  return {
    done,
    stop: () => {
      synth.cancel();
      resolve();
    },
  };
}

/** Speak text. `rate` applies to browser speech (ElevenLabs uses its natural pace). */
export function play(text: string, { rate = 0.9 }: { rate?: number } = {}): Playback {
  if (!text.trim()) return { done: Promise.resolve(), stop: () => {} };

  if (!isElevenLabsAvailable()) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) return speakWithBrowser(text, rate);
    return { done: Promise.resolve(), stop: () => {} };
  }

  let audio: HTMLAudioElement | null = null;
  let stopped = false;
  let fallback: Playback | null = null;
  let resolve!: () => void;
  const done = new Promise<void>(r => (resolve = r));

  synthesizeSpeech(text)
    .then(url => {
      if (stopped) return resolve();
      audio = new Audio(url);
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      return audio.play().catch(() => resolve());
    })
    .catch(() => {
      // ElevenLabs failed — use the browser voice instead
      if (stopped || typeof window === 'undefined' || !('speechSynthesis' in window)) return resolve();
      fallback = speakWithBrowser(text, rate);
      fallback.done.then(resolve);
    });

  return {
    done,
    stop: () => {
      stopped = true;
      audio?.pause();
      fallback?.stop();
      resolve();
    },
  };
}
