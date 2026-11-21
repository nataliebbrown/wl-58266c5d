import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { bookFromStep } from '@/lib/originalLanguage';
import { getArcs, type ArcData } from '@/lib/patterns/data';

const W = 1000;
const H = 300;
const BASE = 280;

/**
 * Every chapter of the Bible along a line, with arcs joining chapters that are
 * strongly cross-referenced. Tap a book to highlight its connections.
 */
export function ArcWeb({ onOpen }: { onOpen: (ref: BibleReference) => void }) {
  const [data, setData] = useState<ArcData | null | undefined>(undefined);
  const [book, setBook] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    getArcs().then(setData);
  }, []);

  const geo = useMemo(() => {
    if (!data) return null;
    const n = data.chapters.length;
    const x = (i: number) => (i / (n - 1)) * W;
    const spans = data.books.map(() => ({ start: Infinity, end: -Infinity }));
    data.chapters.forEach(([b], i) => {
      spans[b].start = Math.min(spans[b].start, i);
      spans[b].end = Math.max(spans[b].end, i);
    });
    const maxW = Math.max(...data.links.map(l => l[2]));
    const paths = data.links.map(([a, b, w]) => {
      const x1 = x(Math.min(a, b));
      const x2 = x(Math.max(a, b));
      const rx = (x2 - x1) / 2;
      const ry = Math.min(BASE - 6, rx * 0.55);
      return { d: `M${x1.toFixed(1)} ${BASE}A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${BASE}`, a, b, w: w / maxW };
    });
    return { x, spans, paths };
  }, [data]);

  if (data === undefined) return <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />;
  if (!data || !geo) return <p className="text-sm text-foreground/50">Couldn&rsquo;t load the connections.</p>;

  const active = hover ?? book;
  const bookOf = (ci: number) => data.chapters[ci][0];
  const touches = (p: { a: number; b: number }) => active !== null && (bookOf(p.a) === active || bookOf(p.b) === active);

  const topLinks =
    book === null
      ? []
      : geo.paths
          .filter(touches)
          .sort((p, q) => q.w - p.w)
          .slice(0, 12)
          .map(p => {
            const [from, to] = bookOf(p.a) === book ? [p.a, p.b] : [p.b, p.a];
            return { from: data.chapters[from], to: data.chapters[to], w: p.w };
          });

  const chLabel = ([b, c]: [number, number]) => `${bookFromStep(data.books[b])} ${c}`;

  return (
    <div>
      <div className="rounded-2xl border border-border/30 bg-card/40 p-3 sm:p-4 overflow-x-auto">
        <div className="min-w-[640px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Arc diagram of cross-references between chapters of the Bible">
          <g fill="none" className="stroke-foreground">
            {geo.paths.map((p, i) => {
              const on = touches(p);
              return (
                <path
                  key={i}
                  d={p.d}
                  strokeWidth={on ? 0.9 : 0.5}
                  strokeOpacity={active === null ? 0.05 + p.w * 0.25 : on ? 0.25 + p.w * 0.6 : 0.02}
                />
              );
            })}
          </g>
          {data.books.map((code, b) => {
            const s = geo.spans[b];
            const x1 = geo.x(s.start);
            const x2 = geo.x(s.end) + 0.8;
            const sel = active === b;
            return (
              <g key={code} onMouseEnter={() => setHover(b)} onMouseLeave={() => setHover(null)} onClick={() => setBook(book === b ? null : b)} className="cursor-pointer">
                <title>{bookFromStep(code)}</title>
                <rect x={x1} y={BASE + 2} width={Math.max(1.5, x2 - x1 - 0.8)} height={10} rx={1.5} className={sel ? 'fill-foreground' : b % 2 ? 'fill-foreground/25' : 'fill-foreground/40'} />
                <rect x={x1} y={BASE - 4} width={Math.max(4, x2 - x1)} height={22} fill="transparent" />
              </g>
            );
          })}
        </svg>
        <div className="relative h-4 text-[10px] text-foreground/40 mt-1">
          <span className="absolute left-0">Genesis</span>
          <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${(geo.x(geo.spans[data.books.indexOf('Mat')].start) / W) * 100}%` }}>
            OT | NT
          </span>
          <span className="absolute right-0">Revelation</span>
        </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-foreground/45">
        {active !== null
          ? `${bookFromStep(data.books[active])} — tap again to clear.`
          : 'Each arc joins two chapters that readers most often link together. Tap a book on the line to see its connections.'}
      </p>

      {book !== null && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Strongest links from {bookFromStep(data.books[book])}</h4>
          {topLinks.length === 0 && <p className="text-sm text-foreground/50">No strong links for this book in the top 6,000.</p>}
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {topLinks.map((l, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <button type="button" onClick={() => onOpen({ book: bookFromStep(data.books[l.from[0]])!, chapter: l.from[1] })} className="text-foreground/75 hover:text-foreground hover:underline">
                  {chLabel(l.from)}
                </button>
                <span className="text-foreground/30">↔</span>
                <button type="button" onClick={() => onOpen({ book: bookFromStep(data.books[l.to[0]])!, chapter: l.to[1] })} className="text-foreground/75 hover:text-foreground hover:underline">
                  {chLabel(l.to)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
