import { useState, useRef, useCallback, useEffect } from 'react';

const PREFERRED_VOICES = [
  'Samantha',
  'Google UK English Female',
  'Microsoft Zira',
  'Google US English',
];

export function selectVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Try preferred voices first
  for (const name of PREFERRED_VOICES) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  // Fallback: first English voice
  const english = voices.find((v) => v.lang.startsWith('en'));
  return english || voices[0] || null;
}

export function useVoiceOutput() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const hasTTSSupport =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load voices (they may load asynchronously)
  useEffect(() => {
    if (!hasTTSSupport) return;

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = selectVoice(voices);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      speechSynthesis.cancel();
    };
  }, [hasTTSSupport]);

  const speak = useCallback(
    (text: string) => {
      if (!hasTTSSupport || !text.trim()) return;

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Ensure voices are loaded before speaking
      const doSpeak = () => {
        // Re-select voice if not yet loaded
        if (!voiceRef.current) {
          const voices = speechSynthesis.getVoices();
          if (voices.length > 0) {
            voiceRef.current = selectVoice(voices);
          }
        }

        const utterance = new SpeechSynthesisUtterance(text);
        if (voiceRef.current) {
          utterance.voice = voiceRef.current;
        }
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
      };

      // Small delay after cancel to avoid Chrome bug where
      // cancel() immediately before speak() silently fails
      setTimeout(doSpeak, 50);
    },
    [hasTTSSupport],
  );

  const stop = useCallback(() => {
    if (!hasTTSSupport) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [hasTTSSupport]);

  return { speak, stop, isSpeaking, hasTTSSupport };
}
