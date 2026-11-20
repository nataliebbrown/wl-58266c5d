import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  /** Milliseconds per character */
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({ text, speed = 20, delay = 0, onComplete, className }: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Time-based reveal driven by requestAnimationFrame: the number of visible
  // characters is derived from elapsed time, so the pace stays steady and
  // smooth even at fast speeds (no per-character timer drift or jitter).
  useEffect(() => {
    setDisplayedCount(0);
    let rafId = 0;
    let startTime: number | null = null;
    let lastCount = 0;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const count = Math.min(text.length, Math.floor((now - startTime) / speed) + 1);
      if (count !== lastCount) {
        lastCount = count;
        setDisplayedCount(count);
      }
      if (count < text.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        onCompleteRef.current?.();
      }
    };

    const delayTimer = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [text, speed, delay]);

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
