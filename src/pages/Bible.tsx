import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BibleNavigator } from '@/components/bible/BibleNavigator';
import { ReadingView } from '@/components/bible/ReadingView';
import { useSophiaOrbIntercept } from '@/components/sophia/SophiaOrbInterceptContext';
import type { BibleReference, BibleVerse } from '@/lib/bibleApi';

const ContextualSophiaPane = lazy(() =>
  import('@/components/sophia/ContextualSophiaPane').then(m => ({ default: m.ContextualSophiaPane }))
);

interface BibleProps {
  embedded?: boolean;
  initialReference?: BibleReference;
}

export default function Bible({ embedded, initialReference }: BibleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = !embedded
    ? (location.state as { initialReference?: BibleReference; conversationId?: string } | null)
    : null;
  const stateRef = locationState?.initialReference;
  const incomingConversationId = locationState?.conversationId ?? null;
  const [reference, setReference] = useState<BibleReference | null>(
    initialReference ?? stateRef ?? null
  );
  const [showNav, setShowNav] = useState(true);
  const [isSophiaOpen, setIsSophiaOpen] = useState(false);
  const [sophiaPrompt, setSophiaPrompt] = useState<string | undefined>();
  const [resumeConversationId, setResumeConversationId] = useState<string | null>(incomingConversationId);

  // Register orb intercept (only when not embedded)
  const { register, unregister, setHideOrb, setContextLabel } = useSophiaOrbIntercept();

  useEffect(() => {
    if (embedded) return;
    register((prompt?: string) => {
      setIsSophiaOpen(true);
      setHideOrb(true);
      if (prompt) setSophiaPrompt(prompt);
    });
    return () => unregister();
  }, [embedded, register, unregister, setHideOrb]);

  // Broadcast current passage to the orb so hover prompts are passage-aware
  useEffect(() => {
    if (embedded) return;
    setContextLabel(reference ? `${reference.book} ${reference.chapter}` : null);
  }, [embedded, reference, setContextLabel]);

  // Auto-open Sophia pane when arriving with a conversation to resume
  useEffect(() => {
    if (incomingConversationId) {
      setIsSophiaOpen(true);
      setHideOrb(true);
      // Clear location state to prevent re-opening on back/forward
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [incomingConversationId, setHideOrb, navigate, location.pathname]);

  // Update reference when initialReference prop changes (for embedded usage)
  useEffect(() => {
    if (initialReference) {
      setReference(initialReference);
    }
  }, [initialReference]);

  const handleSelect = useCallback((ref: BibleReference) => {
    setReference(ref);
    // On mobile, auto-close nav when selecting a chapter
    if (window.innerWidth < 768) {
      setShowNav(false);
    }
  }, []);

  const handleAskSophia = useCallback(
    (verse: BibleVerse, ref: BibleReference) => {
      if (embedded) return;
      const prompt = `Help me understand ${ref.book} ${ref.chapter}:${verse.number} — "${verse.text}"`;
      setIsSophiaOpen(true);
      setHideOrb(true);
      setSophiaPrompt(prompt);
    },
    [embedded, setHideOrb]
  );

  const handleDismissSophia = useCallback(() => {
    setIsSophiaOpen(false);
    setSophiaPrompt(undefined);
    setResumeConversationId(null);
    setHideOrb(false);
  }, [setHideOrb]);

  // Handle passage navigation from within the Sophia pane (in-page, no route change)
  const handlePassageNavigate = useCallback((ref: BibleReference) => {
    setReference(ref);
  }, []);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Mobile navigator toggle (hidden when embedded) */}
      {!embedded && (
        <div className="flex items-center gap-2 px-4 py-2 md:hidden flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Navigator sidebar */}
        <motion.div
          className={`border-r border-border/30 bg-card/30 overflow-hidden ${
            showNav ? 'w-72' : 'w-0'
          } transition-all duration-300 flex-shrink-0`}
        >
          <div className="w-72 h-full">
            <BibleNavigator onSelect={handleSelect} currentRef={reference} />
          </div>
        </motion.div>

        {/* Reading area */}
        <div className="flex-1 min-w-0">
          {reference ? (
            <ReadingView
              reference={reference}
              onNavigate={setReference}
              onAskSophia={handleAskSophia}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <BookOpen className="w-12 h-12 text-muted-foreground/20 mb-4" />
              <h2 className="text-lg font-semibold text-foreground/60 mb-2">
                Select a Book and Chapter
              </h2>
              <p className="text-sm text-muted-foreground/50 max-w-[300px]">
                Choose from the navigator on the left to begin reading Scripture.
              </p>
            </div>
          )}
        </div>

        {/* Contextual Sophia chat pane — desktop sidebar */}
        {!embedded && (
          <AnimatePresence>
            {isSophiaOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex-shrink-0 border-l border-border/30 overflow-hidden hidden lg:block"
              >
                <div className="w-[380px] h-full">
                  <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading...</div>}>
                    <ContextualSophiaPane
                      onDismiss={handleDismissSophia}
                      initialPrompt={sophiaPrompt}
                      context="bible"
                      bibleReference={reference}
                      existingConversationId={resumeConversationId}
                      onNavigateToPassage={handlePassageNavigate}
                    />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Contextual Sophia chat pane — mobile overlay within page bounds */}
      {!embedded && (
        <AnimatePresence>
          {isSophiaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-20 bg-background lg:hidden"
            >
              <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40 text-sm">Loading...</div>}>
                <ContextualSophiaPane
                  onDismiss={handleDismissSophia}
                  initialPrompt={sophiaPrompt}
                  context="bible"
                  bibleReference={reference}
                  existingConversationId={resumeConversationId}
                  onNavigateToPassage={handlePassageNavigate}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
