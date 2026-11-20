import { useState, useRef, useCallback, useEffect } from 'react';
import { synthesizeSpeech, isElevenLabsAvailable } from '@/lib/elevenLabs';

function stripMarkdown(text: string): string {
  return text
    .replace(/\{\{[^}]+\}\}/g, '')          // remove {{markers}}
    .replace(/#{1,6}\s+(.+)/g, '$1.')       // headings → sentences
    .replace(/\*\*(.+?)\*\*/g, '$1')        // bold
    .replace(/\*(.+?)\*/g, '$1')            // italic
    .replace(/`(.+?)`/g, '$1')              // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')     // links → text only
    .replace(/^[-*]\s/gm, '')               // list bullets
    .replace(/^\d+[.)]\s/gm, '')            // numbered lists
    .replace(/>\s*/gm, '')                   // blockquote markers
    .replace(/\n{2,}/g, '\n\n')             // normalize breaks
    .trim();
}

export function useVoiceOutput() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasTTSSupport = isElevenLabsAvailable();

  const speak = useCallback(
    async (text: string) => {
      if (!hasTTSSupport || !text.trim()) return;

      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      try {
        const cleanText = stripMarkdown(text);
        const url = await synthesizeSpeech(cleanText);
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);

        await audio.play();
      } catch (error) {
        console.error('ElevenLabs TTS error:', error);
        setIsSpeaking(false);
      }
    },
    [hasTTSSupport]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return { speak, stop, isSpeaking, hasTTSSupport };
}
