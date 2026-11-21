import type { BibleReference } from '@/lib/bibleApi';
import type { ArtImage } from '@/lib/timewalk/data';
import { KIND_LABEL, withDescription } from './useArt';
import { PhotoCredit, PhotoThumb } from './PhotoViewer';

const refLabel = (r: BibleReference) => `${r.book === 'Psalms' ? 'Psalm' : r.book} ${r.chapter}:${r.verse}`;

/** One image with its caption, label and credit. */
export function ArtFigure({ art, onGoTo, aspect = 'aspect-[4/3]' }: { art: ArtImage; onGoTo?: (r: BibleReference) => void; aspect?: string }) {
  return (
    <figure>
      <PhotoThumb photo={withDescription(art)} aspect={aspect} />
      <figcaption className="mt-1.5">
        <span className="block text-[10px] uppercase tracking-[0.14em] text-foreground/40">{KIND_LABEL[art.kind]}</span>
        <span className="block text-sm leading-snug text-foreground/80">{art.caption}</span>
        {art.kind !== 'photo' && (art.artist || art.date) && (
          <span className="block text-xs text-foreground/50">{[art.artist, art.date].filter(Boolean).join(', ')}</span>
        )}
        {art.ref && onGoTo && (
          <button type="button" onClick={() => onGoTo(art.ref!)} className="text-xs text-foreground/55 underline underline-offset-2 hover:text-foreground">
            {refLabel(art.ref)}
          </button>
        )}
        <PhotoCredit photo={art} className="mt-1" prefix={art.kind === 'photo' ? 'Photo: ' : ''} />
      </figcaption>
    </figure>
  );
}

/** A horizontally scrolling strip of artworks and objects. */
export function ArtGallery({ items, onGoTo, title = 'In art and artifacts' }: { items: ArtImage[]; onGoTo?: (r: BibleReference) => void; title?: string }) {
  if (!items.length) return null;
  const hasArt = items.some(a => a.kind === 'art');
  return (
    <section>
      <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-1">{title}</h4>
      {hasArt && (
        <p className="text-xs text-foreground/50 mb-3 max-w-2xl">
          Paintings and drawings show how artists imagined these events, often centuries later — they are interpretations, not historical records.
        </p>
      )}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
        {items.map(a => (
          <div key={a.id} className="snap-start shrink-0 w-56">
            <ArtFigure art={a} onGoTo={onGoTo} />
          </div>
        ))}
      </div>
    </section>
  );
}
