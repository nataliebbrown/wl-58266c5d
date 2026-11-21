import type { BibleReference } from '@/lib/bibleApi';
import type { Find } from '@/lib/timewalk/archaeology';
import type { Photo } from '@/lib/timewalk/data';
import { PhotoCredit, PhotoThumb } from './PhotoViewer';

export function DraftBadge() {
  return <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800 dark:text-amber-200">Draft</span>;
}

export function FindCard({ find, photo, onGoTo, compact }: { find: Find; photo?: Photo; onGoTo?: (r: BibleReference) => void; compact?: boolean }) {
  return (
    <article className="rounded-2xl border border-border/30 overflow-hidden font-sans">
      {photo && (
        <div className="bg-foreground/[0.03]">
          <PhotoThumb photo={photo} className="rounded-none" aspect={compact ? 'aspect-[16/9]' : 'aspect-[4/3]'} />
        </div>
      )}
      <div className="px-4 py-3.5">
        <p className="font-serif text-lg text-foreground/90 leading-snug">
          {find.name}
          {!find.reviewed && <DraftBadge />}
        </p>
        <p className="text-xs text-foreground/50 mt-0.5">
          {find.date} · Found {find.found}
        </p>
        <p className="text-sm leading-relaxed text-foreground/70 mt-2">{find.what}</p>
        <p className="text-sm leading-relaxed text-foreground/80 mt-2">{find.connection}</p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {find.refs.map(r => (
            <button
              key={r.label}
              type="button"
              disabled={!onGoTo}
              onClick={() => onGoTo?.(r.ref)}
              className="rounded-full border border-border/50 px-2.5 py-0.5 text-[11px] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] disabled:cursor-default"
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-foreground/40 mt-2">Today: {find.location}</p>
        {photo && <PhotoCredit photo={photo} className="mt-1.5" />}
      </div>
    </article>
  );
}
