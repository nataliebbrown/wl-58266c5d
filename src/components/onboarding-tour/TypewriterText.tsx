import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({ text, speed = 20, delay = 0, onComplete, className }: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(delay === 0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Reset when text changes
  useEffect(() => {
    setDisplayedCount(0);
    if (delay > 0) {
      setStarted(false);
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [text, delay]);

  // Animate character by character
  useEffect(() => {
    if (!started) return;

    if (displayedCount >= text.length) {
      onCompleteRef.current?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedCount((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayedCount, text.length, speed]);

  const isTyping = displayedCount < text.length;

  return (
    <span className={cn('inline', className)}>
      {text.slice(0, displayedCount)}
      {isTyping && (
        <span
          className="inline-block w-[2px] h-[1em] bg-foreground/50 ml-[1px] align-text-bottom animate-cursor-blink"
        />
      )}
    </span>
  );
}
