import type { BibleReference } from '@/lib/bibleApi';
import type { LifeTopic } from '@/lib/timewalk/dailyLife';
import { DraftBadge } from './FindCard';
import { ArtFigure } from './ArtGallery';
import { KIND_LABEL, useArt, withDescription } from './useArt';
import { PhotoCredit, PhotoThumb } from './PhotoViewer';

export function LifeCard({ topic, onGoTo }: { topic: LifeTopic; onGoTo?: (r: BibleReference) => void }) {
  const images = useArt().filter(a => a.life === topic.id);
  const [main, ...more] = images;
  return (
    <article className="rounded-2xl border border-border/30 overflow-hidden font-sans">
      {main && <PhotoThumb photo={withDescription(main)} className="rounded-none" aspect="aspect-[16/9]" />}
      <div className="px-4 py-4">
      {main && (
        <p className="text-[11px] text-foreground/50 -mt-1 mb-2">
          {KIND_LABEL[main.kind]}: {main.caption}
          {main.kind === 'photo' && ' — photographed in the early 1900s, not in Bible times'}
        </p>
      )}
      <p className="font-serif text-lg text-foreground/90">
        {topic.title}
        {!topic.reviewed && <DraftBadge />}
      </p>
      <p className="text-sm leading-relaxed text-foreground/75 mt-1.5">{topic.text}</p>
      <p className="text-sm leading-relaxed text-foreground/85 mt-3 rounded-xl bg-hl-green/[0.08] border border-hl-green/25 px-3 py-2.5">
        <span className="block text-[10.5px] uppercase tracking-[0.15em] text-foreground/50 mb-0.5">What it shows about God</span>
        {topic.aboutGod}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {topic.refs.map(r => (
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
      {more.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {more.map(a => (
            <ArtFigure key={a.id} art={a} />
          ))}
        </div>
      )}
      {main && <PhotoCredit photo={main} className="mt-3" prefix={main.kind === 'photo' ? 'Photo: ' : ''} />}
      </div>
    </article>
  );
}
