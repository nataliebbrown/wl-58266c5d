import { lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { addToReadingHistory } from '@/lib/bibleApi';
import type { BibleReference } from '@/lib/bibleApi';

const Bible = lazy(() => import('@/pages/Bible'));

interface CurriculumBiblePaneProps {
  reference: BibleReference;
  onDismiss: () => void;
}

export function CurriculumBiblePane({ reference, onDismiss }: CurriculumBiblePaneProps) {
  // Update reading history so the dashboard Bible card stays in sync
  addToReadingHistory(reference.book, reference.chapter);

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-colors"
      >
        <X className="w-4 h-4 text-foreground/60" />
      </button>

      {/* Bible reader */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
            Loading Scripture...
          </div>
        }
      >
        <Bible embedded initialReference={reference} />
      </Suspense>
    </div>
  );
}
