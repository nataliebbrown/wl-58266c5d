import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { THEMES } from '@/lib/patterns/themes';
import { PROMISES } from '@/lib/patterns/promises';
import { COVENANTS, REPEATED_PATTERNS } from '@/lib/patterns/stories';
import { getConnections, getQuotes, type Connection, type QuoteEntry } from '@/lib/patterns/data';
import { useDraftPreview } from '@/components/timewalk/useDateSystem';
import { DraftBadge } from '@/components/timewalk/FindCard';

interface Props {
  book: string;
  chapter: number;
  focusVerse: number | null;
  onGoToReference: (ref: BibleReference) => void;
}

const inChapter = (r: BibleReference, book: string, chapter: number) => r.book === book && r.chapter === chapter;

/** Where this chapter fits in the bigger story: strongest links, themes, promises and quotations. */
export function ChapterConnections({ book, chapter, focusVerse, onGoToReference }: Props) {
  const navigate = useNavigate();
  const preview = useDraftPreview();
  const [conns, setConns] = useState<Connection[] | null>(null);
  const [quotes, setQuotes] = useState<QuoteEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    setConns(null);
    getConnections(book, chapter).then(c => !cancelled && setConns(c));
    getQuotes().then(q => !cancelled && setQuotes(q));
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  const strongest = useMemo(() => {
    if (!conns) return [];
    const pool = focusVerse ? conns.filter(c => c.fromVerse === focusVerse) : conns;
    return [...pool].sort((a, b) => b.votes - a.votes).slice(0, 8);
  }, [conns, focusVerse]);

  const curated = useMemo(() => {
    const ok = <T extends { reviewed: boolean }>(x: T) => preview || x.reviewed;
    const items: { key: string; kind: string; title: string; reviewed: boolean; to: string }[] = [];
    THEMES.filter(ok).forEach(t => t.points.some(p => inChapter(p.ref, book, chapter)) && items.push({ key: `t-${t.id}`, kind: 'Theme', title: t.title, reviewed: t.reviewed, to: 'themes' }));
    PROMISES.filter(ok).forEach(
      p => [p.ot, ...p.nt].some(x => inChapter(x.ref, book, chapter)) && items.push({ key: `p-${p.id}`, kind: 'Promise', title: p.title, reviewed: p.reviewed, to: 'promises' })
    );
    REPEATED_PATTERNS.filter(ok).forEach(
      p => p.instances.some(x => inChapter(x.ref, book, chapter)) && items.push({ key: `r-${p.id}`, kind: 'Pattern', title: p.title, reviewed: p.reviewed, to: 'repeated' })
    );
    COVENANTS.filter(ok).forEach(
      c => [c.ref, ...c.fulfillmentRefs].some(x => inChapter(x.ref, book, chapter)) && items.push({ key: `c-${c.id}`, kind: 'Covenant', title: c.name, reviewed: c.reviewed, to: 'covenants' })
    );
    return items;
  }, [book, chapter, preview]);

  const quoting = quotes.filter(q => inChapter(q.nt, book, chapter));
  const quotedBy = quotes.filter(q => q.ot.some(o => inChapter(o.ref, book, chapter)));

  const openPatterns = (tab: string) => {
    try {
      localStorage.setItem('wl-patterns-tab', tab);
    } catch {
      /* ignore */
    }
    navigate('/patterns');
  };

  if (conns === null) return null;
  if (!strongest.length && !curated.length && !quoting.length && !quotedBy.length) return null;

  const chip = (label: string, ref: BibleReference, key: string) => (
    <button
      key={key}
      type="button"
      onClick={() => onGoToReference(ref)}
      className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
    >
      {label}
    </button>
  );

  return (
    <section className="mb-6 rounded-2xl border border-border/30 px-3.5 py-3">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-foreground/45">
        <GitBranch className="w-3.5 h-3.5" /> Connections
      </p>

      {strongest.length > 0 && (
        <div className="mt-2.5">
          <p className="text-xs text-foreground/55 mb-1.5">{focusVerse ? `Strongest links from v. ${focusVerse}` : 'Strongest links from this chapter'}</p>
          <div className="flex flex-wrap gap-1">{strongest.map((c, i) => chip(focusVerse ? c.label : `v.${c.fromVerse} → ${c.label}`, c.ref, `${c.label}-${i}`))}</div>
        </div>
      )}

      {quoting.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-foreground/55 mb-1.5">Quotes the Old Testament</p>
          <div className="flex flex-wrap gap-1">{quoting.flatMap(q => q.ot.map(o => chip(`v.${q.nt.verse} ← ${o.label}`, o.ref, `${q.ntLabel}-${o.label}`)))}</div>
        </div>
      )}

      {quotedBy.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-foreground/55 mb-1.5">Quoted in the New Testament</p>
          <div className="flex flex-wrap gap-1">{quotedBy.slice(0, 16).map(q => chip(q.ntLabel, q.nt, q.ntLabel))}</div>
        </div>
      )}

      {curated.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-foreground/55 mb-1.5">Part of these threads</p>
          <ul className="space-y-1">
            {curated.map(c => (
              <li key={c.key}>
                <button type="button" onClick={() => openPatterns(c.to)} className="text-left text-sm text-foreground/75 hover:text-foreground">
                  <span className="text-[11px] text-foreground/45 mr-1.5">{c.kind}</span>
                  {c.title}
                  {!c.reviewed && <DraftBadge />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-3 text-[10px] text-foreground/35">Links ranked by OpenBible.info reader votes (CC BY 4.0).</p>
    </section>
  );
}
