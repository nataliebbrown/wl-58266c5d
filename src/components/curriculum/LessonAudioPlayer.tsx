import { useState, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Headphones, X } from 'lucide-react';
import { useLessonAudio } from '@/hooks/useLessonAudio';

// ============ Helpers ============

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ============ Animated Equalizer ============

function Equalizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = [0.4, 0.7, 1, 0.6, 0.8];
  return (
    <div className="flex items-end gap-[2px] h-4">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-hl-green/70 transition-all duration-300"
          style={{
            height: isPlaying ? `${height * 100}%` : '20%',
            animation: isPlaying
              ? `eq-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate`
              : 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes eq-bar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

// ============ Progress Bar ============

function ProgressBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (p: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const calcProgress = useCallback(
    (clientX: number) => {
      if (!barRef.current) return 0;
      const rect = barRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onSeek(calcProgress(e.clientX));
    },
    [calcProgress, onSeek]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      onSeek(calcProgress(e.clientX));
    },
    [calcProgress, onSeek]
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  return (
    <div
      ref={barRef}
      className="relative w-full h-6 flex items-center cursor-pointer group"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Track */}
      <div className="absolute w-full h-[3px] rounded-full bg-border/30" />
      {/* Fill */}
      <div
        className="absolute h-[3px] rounded-full bg-hl-green transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
      {/* Thumb */}
      <div
        className="absolute w-3 h-3 rounded-full bg-hl-green shadow-sm shadow-hl-green/30 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
}

// ============ Main Component ============

interface LessonAudioPlayerProps {
  title: string;
  content: string;
}

export function LessonAudioPlayer({ title, content }: LessonAudioPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const audio = useLessonAudio(content);

  if (!audio.hasTTS) return null;

  const isPlaying = audio.status === 'playing';
  const isActive = audio.status !== 'idle';

  const handlePlayFromCollapsed = () => {
    setIsExpanded(true);
    audio.play();
  };

  const handleClose = () => {
    audio.stop();
    setIsExpanded(false);
  };

  // Collapsed state
  if (!isExpanded && !isActive) {
    return (
      <button
        onClick={handlePlayFromCollapsed}
        className="w-full mt-4 mb-2 flex items-center justify-between px-4 py-3 rounded-xl border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 hover:bg-foreground/[0.02] transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-hl-green/10 flex items-center justify-center">
            <Headphones className="w-4 h-4 text-hl-green" />
          </div>
          <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
            Listen to this lesson
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-foreground/[0.06] flex items-center justify-center">
          <Play className="w-3.5 h-3.5 text-foreground/50 ml-0.5" />
        </div>
      </button>
    );
  }

  // Expanded player
  return (
    <div className="mt-4 mb-2 rounded-xl border border-border/20 bg-white/50 dark:bg-wl-olive-300/5 px-4 py-3">
      {/* Top row: controls + title + equalizer */}
      <div className="flex items-center gap-2">
        {/* Skip back */}
        <button
          onClick={audio.skipBack}
          className="p-1.5 rounded-full hover:bg-foreground/[0.04] text-foreground/40 hover:text-foreground/60 transition-colors"
          title="Previous section"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={audio.toggle}
          className="w-9 h-9 rounded-full bg-foreground/[0.08] dark:bg-foreground/[0.12] flex items-center justify-center hover:bg-foreground/[0.12] transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-foreground/70" />
          ) : (
            <Play className="w-4 h-4 text-foreground/70 ml-0.5" />
          )}
        </button>

        {/* Skip forward */}
        <button
          onClick={audio.skipForward}
          className="p-1.5 rounded-full hover:bg-foreground/[0.04] text-foreground/40 hover:text-foreground/60 transition-colors"
          title="Next section"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Title */}
        <span className="flex-1 text-sm font-medium text-foreground/60 truncate mx-2">
          {title}
        </span>

        {/* Equalizer */}
        <Equalizer isPlaying={isPlaying} />

        {/* Close */}
        <button
          onClick={handleClose}
          className="p-1 rounded-full hover:bg-foreground/[0.04] text-foreground/25 hover:text-foreground/50 transition-colors ml-1"
          title="Close player"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-1">
        <ProgressBar progress={audio.progress} onSeek={audio.seekTo} />
      </div>

      {/* Time */}
      <div className="flex items-center justify-between -mt-1">
        <span className="text-[10px] text-foreground/30 tabular-nums">
          {formatTime(audio.elapsedSeconds)}
        </span>
        <span className="text-[10px] text-foreground/30 tabular-nums">
          {formatTime(audio.totalSeconds)}
        </span>
      </div>
    </div>
  );
}
