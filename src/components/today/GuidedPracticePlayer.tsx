import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, NotebookPen, X } from 'lucide-react';
import { type GuidedPractice, formatGuidedForJournal } from '@/lib/today/guided';
import { logActivity } from '@/lib/activityLog';
import { GOD_ATTRIBUTES, addPortraitEntry, getPortraitEntries } from '@/lib/portraits';
import { saveGeneralJournalEntry } from '@/lib/journalStorage';
import { useDarkMode } from '@/components/layout/DarkModeContext';

interface GuidedPracticePlayerProps {
  practice: GuidedPractice;
  onClose: (completed: boolean) => void;
}

const MAX_ATTRIBUTES = 3;

export function GuidedPracticePlayer({ practice, onClose }: GuidedPracticePlayerProps) {
  const [stepIndex, setStepIndex] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gifts, setGifts] = useState(['', '', '']);
  const [attributeIds, setAttributeIds] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [savedToJournal, setSavedToJournal] = useState(false);
  // Portaled outside AppShell's `.dark` wrapper, so re-apply the theme
  const isDarkMode = useDarkMode();

  // A truth about God for Adoration: prefer one they've seen themselves
  const adoreAttribute = useMemo(() => {
    const seen = getPortraitEntries().flatMap(e => e.attributeIds);
    const pool = seen.length ? GOD_ATTRIBUTES.filter(a => seen.includes(a.id)) : GOD_ATTRIBUTES;
    const day = Math.floor(Date.now() / 86_400_000);
    return pool[day % pool.length];
  }, []);

  const step = stepIndex >= 0 ? practice.steps[stepIndex] : undefined;
  const isLast = stepIndex === practice.steps.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose(done);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, done]);

  const finish = () => {
    const finalAnswers = { ...answers };
    const giftList = gifts.map(g => g.trim()).filter(Boolean);
    if (giftList.length) finalAnswers.gifts = giftList.map((g, i) => `${i + 1}. ${g}`).join('\n');
    setAnswers(finalAnswers);
    logActivity({ type: practice.activity, label: practice.name });
    const godStep = practice.steps.find(s => s.kind === 'reveals-god');
    const godText = godStep ? finalAnswers[godStep.id] : '';
    if (godText?.trim() && attributeIds.length) {
      addPortraitEntry({ attributeIds, text: godText, source: 'journal', reference: practice.name });
    }
    setDone(true);
  };

  const saveToJournal = () => {
    const text = formatGuidedForJournal(practice, answers);
    if (!text) return;
    const now = new Date();
    saveGeneralJournalEntry({
      id: `${practice.id}-${now.getTime()}`,
      title: `${practice.name} · ${now.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`,
      text,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
    setSavedToJournal(true);
  };

  const hasWriting = Object.values(answers).some(a => a?.trim()) || gifts.some(g => g.trim());

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-0 z-[100] flex flex-col bg-background text-foreground font-sans${isDarkMode ? ' dark' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={practice.name}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(var(--foreground) / 0.05), transparent 70%)' }}
      />
      <div className="relative flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40">{practice.name}</span>
        <button
          type="button"
          onClick={() => onClose(done)}
          className="h-9 w-9 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/[0.05]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-8 flex">
        <div className="w-full max-w-lg m-auto">
          {/* Intro */}
          {stepIndex === -1 && !done && (
            <div className="text-center">
              <h2 className="font-serif text-3xl text-foreground/90 mb-3">{practice.name}</h2>
              <p className="text-foreground/60 leading-relaxed mb-8">{practice.intro}</p>
              <button type="button" onClick={() => setStepIndex(0)} className="rounded-full bg-foreground text-background px-7 py-2.5 text-sm font-medium hover:opacity-90">
                Begin
              </button>
            </div>
          )}

          {/* Step */}
          {step && !done && (
            <div>
              <div className="flex items-center gap-1.5 mb-6">
                {practice.steps.map((s, i) => (
                  <span key={s.id} className={`h-1 flex-1 rounded-full ${i <= stepIndex ? 'bg-foreground/55' : 'bg-foreground/10'}`} />
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45 mb-1.5">{step.title}</p>
              <h3 className="font-serif text-2xl sm:text-3xl leading-snug text-foreground/90 mb-2">{step.prompt}</h3>
              {step.hint && <p className="text-sm text-foreground/55 leading-relaxed mb-5">{step.hint}</p>}

              {step.kind === 'adore' && (
                <div className="mb-5 rounded-2xl border border-border/40 bg-foreground/[0.03] px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-1">God is {adoreAttribute.name.toLowerCase()}</p>
                  <p className="font-serif text-lg text-foreground/85">{adoreAttribute.summary}</p>
                  <p className="text-xs text-foreground/45 mt-1">{adoreAttribute.anchor}</p>
                </div>
              )}

              {step.verse && (
                <blockquote className="mb-5 border-l-2 border-hl-green/50 pl-4 font-serif text-[17px] leading-relaxed text-foreground/75">
                  {step.verse.text}
                  <span className="block font-sans text-xs text-foreground/45 mt-1">{step.verse.reference}</span>
                </blockquote>
              )}

              {step.kind === 'pause' && <PauseTimer key={step.id} seconds={step.seconds ?? 30} />}

              {step.kind === 'gifts' && (
                <div className="space-y-2.5">
                  {gifts.map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-serif text-xl text-foreground/40 w-5">{i + 1}</span>
                      <input
                        value={g}
                        onChange={e => setGifts(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
                        placeholder={['Something today…', 'Someone today…', 'A moment today…'][i]}
                        className="flex-1 rounded-xl border border-border/50 bg-card/60 px-4 py-2.5 text-[15px] focus:outline-none focus:border-foreground/30"
                      />
                    </div>
                  ))}
                </div>
              )}

              {(step.kind === 'write' || step.kind === 'adore' || step.kind === 'reveals-god') && (
                <textarea
                  value={answers[step.id] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
                  placeholder={step.placeholder ?? 'Write here, or pray silently…'}
                  rows={5}
                  className="w-full rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-[15px] leading-relaxed placeholder:text-foreground/35 focus:outline-none focus:border-foreground/30 resize-y"
                />
              )}

              {step.kind === 'reveals-god' && (
                <div className="mt-4">
                  <p className="text-xs text-foreground/50 mb-2">
                    Add to your <span className="text-foreground/75">Portraits of God</span> — up to {MAX_ATTRIBUTES} (optional):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {GOD_ATTRIBUTES.map(a => {
                      const on = attributeIds.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          disabled={!on && attributeIds.length >= MAX_ATTRIBUTES}
                          onClick={() => setAttributeIds(on ? attributeIds.filter(id => id !== a.id) : [...attributeIds, a.id])}
                          className={`rounded-full border px-2.5 py-1 text-xs transition-colors disabled:opacity-35 ${
                            on ? 'border-hl-green/60 bg-hl-green/15 text-foreground' : 'border-border/50 text-foreground/60 hover:text-foreground'
                          }`}
                        >
                          {a.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStepIndex(i => i - 1)}
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/55 hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => (isLast ? finish() : setStepIndex(i => i + 1))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90"
                >
                  {isLast ? (
                    <>
                      <Check className="w-4 h-4" /> Amen
                    </>
                  ) : (
                    <>
                      Next <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Closing */}
          {done && (
            <div className="text-center">
              <p className="font-serif text-2xl leading-snug text-foreground/85 mb-8 max-w-md mx-auto">{practice.closing}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {hasWriting &&
                  (savedToJournal ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-hl-green" /> Saved to journal
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={saveToJournal}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/75 hover:bg-foreground/[0.04]"
                    >
                      <NotebookPen className="w-4 h-4" /> Save to journal
                    </button>
                  ))}
                <button type="button" onClick={() => onClose(true)} className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90">
                  Done
                </button>
              </div>
              {hasWriting && !savedToJournal && <p className="mt-4 text-xs text-foreground/40">Your words stay private unless you save them.</p>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return createPortal(content, document.body);
}

function PauseTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);
  return (
    <div className="my-6 flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeOpacity={0.1} strokeWidth={4} />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={4}
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(2 * Math.PI * 45 * remaining) / seconds}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
            className="text-foreground"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xl text-foreground/70">
          {remaining > 0 ? remaining : '✓'}
        </span>
      </div>
      <p className="mt-3 text-sm text-foreground/50">{remaining > 0 ? 'Be still.' : 'Continue when you’re ready.'}</p>
    </div>
  );
}
