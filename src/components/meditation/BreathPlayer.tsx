import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pause, Play, RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import { canReadAloud, play, prepare, type Playback } from '@/lib/readAloud';
import { formatMeditationReference } from '@/lib/meditation/catalog';
import { PortraitCaptureForm } from '@/components/portraits/PortraitCaptureForm';
import { logActivity } from '@/lib/activityLog';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import {
  type MeditationTarget,
  type SessionMinutes,
  type VoiceMode,
  BREATH_PACES,
  VOICE_MODES,
  GUIDED_BREATHS,
  SESSION_MINUTES,
  getMeditationSettings,
  saveMeditationSettings,
  getPace,
  toWords,
  suggestBreak,
  splitAt,
} from '@/lib/meditation/storage';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

type Stage = 'setup' | 'settle' | 'breathing' | 'complete';
type BreathPhase = 'in' | 'out';

interface BreathPlayerProps {
  target: MeditationTarget;
  onClose: () => void;
  /** Called with the (possibly re-split) verse when a session starts */
  onStart?: (target: MeditationTarget) => void;
  /** Open the "adjust the pause" editor on the setup screen */
  editSplitInitially?: boolean;
}

const SETTLE_SECONDS = 3;
const ORB_MIN = 0.62;
const ORB_MAX = 1;

// Smooth in-out curve so the orb eases at the top and bottom of each breath
const easeInOut = (t: number) => 0.5 - Math.cos(Math.PI * Math.min(Math.max(t, 0), 1)) / 2;

export function BreathPlayer({ target, onClose, onStart, editSplitInitially }: BreathPlayerProps) {
  const initialSettings = useMemo(() => getMeditationSettings(), []);
  // Portaled outside AppShell's `.dark` wrapper, so re-apply the theme
  const isDarkMode = useDarkMode();
  const [paceId, setPaceId] = useState(initialSettings.paceId);
  const [minutes, setMinutes] = useState<SessionMinutes>(initialSettings.minutes);
  const voiceAvailable = useMemo(() => canReadAloud(), []);
  const [voice, setVoice] = useState<VoiceMode>(voiceAvailable ? initialSettings.voice : 'off');
  const pace = getPace(paceId);

  // Split editing
  const words = useMemo(() => toWords(`${target.inhale} ${target.exhale}`), [target]);
  const [breakIndex, setBreakIndex] = useState(() => {
    const n = toWords(target.inhale).length;
    return n > 0 && n < words.length ? n : suggestBreak(words);
  });
  const [editingSplit, setEditingSplit] = useState(!!editSplitInitially);
  const { inhale, exhale } = splitAt(words, breakIndex);

  const [stage, setStage] = useState<Stage>('setup');
  const [phase, setPhase] = useState<BreathPhase>('in');
  const [paused, setPaused] = useState(false);
  const [settleCount, setSettleCount] = useState(SETTLE_SECONDS);
  const [remainingSec, setRemainingSec] = useState(minutes * 60);

  const orbRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const reference = formatMeditationReference(target);
  const cycleSec = pace.inhaleSec + pace.exhaleSec;
  const totalCycles = Math.max(1, Math.ceil((minutes * 60) / cycleSec));
  const totalSec = totalCycles * cycleSec;

  // ---- Start ----
  const begin = useCallback(() => {
    saveMeditationSettings({ paceId, minutes, voice });
    // Generate narration during the settle countdown so it starts on the breath
    if (voice !== 'off') {
      void prepare(inhale);
      void prepare(exhale);
    }
    onStart?.({ ...target, inhale, exhale });
    elapsedRef.current = 0;
    setRemainingSec(totalSec);
    setPhase('in');
    setPaused(false);
    setSettleCount(SETTLE_SECONDS);
    setEditingSplit(false);
    setStage('settle');
  }, [paceId, minutes, voice, onStart, target, inhale, exhale, totalSec]);

  // ---- Settle countdown ----
  useEffect(() => {
    if (stage !== 'settle') return;
    if (settleCount <= 0) {
      setStage('breathing');
      return;
    }
    const t = setTimeout(() => setSettleCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, settleCount]);

  // ---- Narration: speak each half as its breath begins ----
  const playbackRef = useRef<Playback | null>(null);
  const narrateRef = useRef<(phase: BreathPhase, breath: number) => void>(() => {});
  narrateRef.current = (phase, breath) => {
    if (voice === 'off' || pausedRef.current) return;
    if (voice === 'guide' && breath >= GUIDED_BREATHS) return;
    playbackRef.current?.stop();
    playbackRef.current = play(phase === 'in' ? inhale : exhale, { rate: 0.8 });
  };
  const stopNarration = useCallback(() => {
    playbackRef.current?.stop();
    playbackRef.current = null;
  }, []);
  // Stop speaking when paused, finished, or closed
  useEffect(() => {
    if (paused || stage !== 'breathing') stopNarration();
  }, [paused, stage, stopNarration]);
  useEffect(() => stopNarration, [stopNarration]);

  // ---- Breathing loop (time-based, pausable) ----
  useEffect(() => {
    if (stage !== 'breathing') return;
    let raf = 0;
    let last: number | null = null;
    let lastPhase: BreathPhase | null = null;
    let lastRemaining = -1;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const range = reduceMotion ? 0.12 : ORB_MAX - ORB_MIN;

    const tick = (now: number) => {
      if (last !== null && !pausedRef.current) {
        elapsedRef.current += (now - last) / 1000;
      }
      last = now;
      const elapsed = elapsedRef.current;

      if (elapsed >= totalSec) {
        setStage('complete');
        return;
      }

      const t = elapsed % cycleSec;
      const nextPhase: BreathPhase = t < pace.inhaleSec ? 'in' : 'out';
      const progress =
        nextPhase === 'in'
          ? easeInOut(t / pace.inhaleSec)
          : 1 - easeInOut((t - pace.inhaleSec) / pace.exhaleSec);
      if (orbRef.current) {
        orbRef.current.style.transform = `scale(${ORB_MAX - range + range * progress})`;
      }
      if (nextPhase !== lastPhase) {
        lastPhase = nextPhase;
        setPhase(nextPhase);
        narrateRef.current(nextPhase, Math.floor(elapsed / cycleSec));
      }
      const remaining = Math.ceil(totalSec - elapsed);
      if (remaining !== lastRemaining) {
        lastRemaining = remaining;
        setRemainingSec(remaining);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, totalSec, cycleSec, pace.inhaleSec, pace.exhaleSec]);

  // ---- Log a finished meditation ----
  useEffect(() => {
    if (stage === 'complete') logActivity({ type: 'meditation', label: `Meditated on ${reference}` });
  }, [stage, reference]);

  // ---- Keyboard: Esc closes, Space pauses ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && stage === 'breathing') {
        e.preventDefault();
        setPaused(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, stage]);

  const mm = Math.floor(remainingSec / 60);
  const ss = String(remainingSec % 60).padStart(2, '0');

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-[100] flex flex-col bg-background text-foreground${isDarkMode ? ' dark' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Meditate on ${reference}`}
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 42%, hsl(var(--foreground) / 0.05), transparent 70%)',
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
          {stage === 'breathing' ? `${mm}:${ss}` : 'Meditate'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
          aria-label="Close meditation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-10 overflow-y-auto">
        {/* Orb — shown for settle / breathing / complete */}
        {stage !== 'setup' && (
          <div className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] mb-10 flex items-center justify-center">
            <div
              ref={orbRef}
              className="h-full w-full will-change-transform"
              // While breathing, the rAF loop owns the transform; React must not touch it.
              style={stage === 'breathing' ? undefined : { transform: `scale(${ORB_MIN})`, transition: 'transform 1.2s ease' }}
            >
              <Suspense fallback={<div className="h-full w-full rounded-full bg-foreground/10" />}>
                <NoiseOrb size="100%" preset="white" noiseIntensity={0.25} speed={0.35} />
              </Suspense>
            </div>
          </div>
        )}

        {stage === 'setup' && (
          <SetupScreen
            reference={reference}
            translation={target.translation}
            truth={target.truth}
            words={words}
            breakIndex={breakIndex}
            onBreakChange={setBreakIndex}
            editingSplit={editingSplit}
            onToggleEditSplit={() => setEditingSplit(e => !e)}
            inhale={inhale}
            exhale={exhale}
            paceId={paceId}
            onPaceChange={setPaceId}
            minutes={minutes}
            onMinutesChange={setMinutes}
            voice={voiceAvailable ? voice : undefined}
            onVoiceChange={setVoice}
            onBegin={begin}
          />
        )}

        {stage === 'settle' && (
          <div className="text-center font-sans">
            <p className="text-foreground/60 text-lg">Settle in. Breathe naturally.</p>
            <p className="text-foreground/30 text-sm mt-2">Beginning in {settleCount}…</p>
          </div>
        )}

        {stage === 'breathing' && (
          <div className="text-center max-w-xl min-h-[150px] flex flex-col items-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40 font-sans mb-4">
              {paused ? 'Paused' : phase === 'in' ? 'Breathe in' : 'Breathe out'}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="font-serif text-2xl sm:text-3xl leading-snug text-foreground/85"
              >
                {phase === 'in' ? inhale : exhale}
              </motion.p>
            </AnimatePresence>
            <p className="mt-5 text-xs text-foreground/35 font-sans">{reference}</p>
          </div>
        )}

        {stage === 'complete' && (
          <div className="text-center max-w-md font-sans">
            {target.truth && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mb-3">{target.truth}</p>
            )}
            <p className="font-serif text-2xl text-foreground/85 leading-snug mb-2">
              What did this verse show you about God?
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed mb-5">
              Take a moment before you move on. Thank Him for who He is.
            </p>
            <div className="text-left mb-7">
              <PortraitCaptureForm source="meditation" reference={reference} placeholder="God is…" compact />
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={begin}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
              >
                <Check className="w-3.5 h-3.5" />
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pause control */}
      {stage === 'breathing' && (
        <div className="relative flex justify-center pb-8">
          <button
            type="button"
            onClick={() => setPaused(p => !p)}
            className="h-11 w-11 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
            aria-label={paused ? 'Resume' : 'Pause'}
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      )}
    </motion.div>
  );

  return createPortal(content, document.body);
}

// ============ Setup screen ============

function SetupScreen({
  reference,
  translation,
  truth,
  words,
  breakIndex,
  onBreakChange,
  editingSplit,
  onToggleEditSplit,
  inhale,
  exhale,
  paceId,
  onPaceChange,
  minutes,
  onMinutesChange,
  voice,
  onVoiceChange,
  onBegin,
}: {
  reference: string;
  translation?: string;
  truth?: string;
  words: string[];
  breakIndex: number;
  onBreakChange: (i: number) => void;
  editingSplit: boolean;
  onToggleEditSplit: () => void;
  inhale: string;
  exhale: string;
  paceId: string;
  onPaceChange: (id: (typeof BREATH_PACES)[number]['id']) => void;
  minutes: SessionMinutes;
  onMinutesChange: (m: SessionMinutes) => void;
  /** Undefined when read-aloud isn't available in this browser */
  voice?: VoiceMode;
  onVoiceChange: (v: VoiceMode) => void;
  onBegin: () => void;
}) {
  return (
    <div className="w-full max-w-lg font-sans">
      <div className="text-center mb-8">
        {truth && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mb-2">{truth}</p>
        )}
        <p className="text-sm text-foreground/50">
          {reference}
          {translation ? ` · ${translation}` : ''}
        </p>
      </div>

      {/* Verse halves */}
      {!editingSplit ? (
        <div className="space-y-5 mb-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/35 mb-1.5">Breathe in</p>
            <p className="font-serif text-xl sm:text-2xl leading-snug text-foreground/85">{inhale}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/35 mb-1.5">Breathe out</p>
            <p className="font-serif text-xl sm:text-2xl leading-snug text-foreground/85">{exhale}</p>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <p className="text-sm text-foreground/55 mb-3">
            Tap the word where your in-breath should end.
          </p>
          <p className="font-serif text-xl leading-relaxed">
            {words.map((w, i) => {
              const isInhale = i < breakIndex;
              const canBreak = i < words.length - 1;
              return (
                <span key={i}>
                  <button
                    type="button"
                    disabled={!canBreak}
                    onClick={() => onBreakChange(i + 1)}
                    className={`rounded px-0.5 transition-colors ${
                      isInhale ? 'text-foreground/90' : 'text-foreground/40'
                    } ${canBreak ? 'hover:bg-foreground/[0.06]' : 'cursor-default'}`}
                  >
                    {w}
                  </button>
                  {i === breakIndex - 1 && (
                    <span aria-hidden className="mx-1 inline-block h-5 w-[2px] translate-y-[3px] rounded bg-hl-green" />
                  )}{' '}
                </span>
              );
            })}
          </p>
          <div className="mt-3 flex gap-4 text-xs text-foreground/45">
            <span><span className="text-foreground/80">Dark</span> = breathe in</span>
            <span><span className="text-foreground/40">Light</span> = breathe out</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onToggleEditSplit}
        className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground/80 transition-colors mb-8"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        {editingSplit ? 'Done adjusting' : 'Adjust where the breath changes'}
      </button>

      {/* Settings */}
      <div className="space-y-4 mb-9">
        <OptionRow label="Pace">
          {BREATH_PACES.map(p => (
            <Chip key={p.id} active={paceId === p.id} onClick={() => onPaceChange(p.id)}>
              {p.label}
              <span className="ml-1 text-foreground/35">
                {p.inhaleSec}s / {p.exhaleSec}s
              </span>
            </Chip>
          ))}
        </OptionRow>
        <OptionRow label="Length">
          {SESSION_MINUTES.map(m => (
            <Chip key={m} active={minutes === m} onClick={() => onMinutesChange(m)}>
              {m} min
            </Chip>
          ))}
        </OptionRow>
        {voice !== undefined && (
          <OptionRow label="Voice">
            {VOICE_MODES.map(v => (
              <Chip key={v.id} active={voice === v.id} onClick={() => onVoiceChange(v.id)}>
                {v.label}
              </Chip>
            ))}
          </OptionRow>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onBegin}
          className="rounded-full bg-foreground text-background px-7 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Begin
        </button>
      </div>
    </div>
  );
}

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 text-xs uppercase tracking-[0.15em] text-foreground/40">{label}</span>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? 'border-foreground/40 bg-foreground/[0.06] text-foreground'
          : 'border-border/50 text-foreground/55 hover:text-foreground hover:bg-foreground/[0.03]'
      }`}
    >
      {children}
    </button>
  );
}
