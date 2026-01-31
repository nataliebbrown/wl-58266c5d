import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BibleNavigator } from '@/components/bible/BibleNavigator';
import { ReadingView } from '@/components/bible/ReadingView';
import type { BibleReference, BibleVerse } from '@/lib/bibleApi';

export default function Bible({
  embedded,
  initialReference,
  onAskSophia: externalAskSophia,
}: {
  embedded?: boolean;
  initialReference?: BibleReference;
  onAskSophia?: (verse: BibleVerse, ref: BibleReference) => void;
} = {}) {
  const navigate = useNavigate();
  const [reference, setReference] = useState<BibleReference | null>(initialReference ?? null);
  const [showNav, setShowNav] = useState(true);

  const handleSelect = useCallback((ref: BibleReference) => {
    setReference(ref);
    // On mobile, auto-close nav when selecting a chapter
    if (window.innerWidth < 768) {
      setShowNav(false);
    }
  }, []);

  const handleAskSophia = useCallback(
    (verse: BibleVerse, ref: BibleReference) => {
      if (externalAskSophia) {
        externalAskSophia(verse, ref);
      } else {
        const prompt = `Help me understand ${ref.book} ${ref.chapter}:${verse.number} — "${verse.text}"`;
        navigate(`/chat?prompt=${encodeURIComponent(prompt)}`);
      }
    },
    [navigate, externalAskSophia]
  );

  return (
    <div className={`${embedded ? 'h-full' : 'h-screen'} flex flex-col bg-background`}>
      {/* Header */}
      {!embedded && (
        <header className="h-14 flex items-center justify-between px-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2 text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#87A96B]" />
            <h1 className="text-sm font-semibold text-foreground">Scripture</h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground md:hidden"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </Button>
        </header>
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
      </div>
    </div>
  );
}
