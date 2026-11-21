import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { THEMES } from '@/lib/patterns/themes';
import { PROMISES, type PromisePair } from '@/lib/patterns/promises';
import {
  COVENANTS,
  COVENANT_CAVEAT,
  LINE_MARKERS,
  LINE_NOTES,
  NAMES_OF_GOD,
  REPEATED_PATTERNS,
  STORY_PLACES,
} from '@/lib/patterns/stories';
import { PATTERNS_ATTRIBUTION, getLine, getQuotes, type LinePerson, type QuoteEntry } from '@/lib/patterns/data';
import { KEY_WORDS } from '@/lib/translationBridge/keyWords';
import { bookFromStep, displayStrong, formatTranslit, getOccurrences, searchLexicon, stepCode, type LexiconHit, type Occurrences } from '@/lib/originalLanguage';
import { getPlacePhotos, type Photo } from '@/lib/timewalk/data';
import { ArcWeb } from '@/components/patterns/ArcWeb';
import { BookBars } from '@/components/patterns/BookBars';
import { PeopleWeb } from '@/components/patterns/PeopleWeb';
import { LexiconCard } from '@/components/original/LexiconCard';
import { PersonCard } from '@/components/timewalk/PersonCard';
import { PhotoCredit, PhotoThumb } from '@/components/timewalk/PhotoViewer';
import { DraftBadge } from '@/components/timewalk/FindCard';
import { useDraftPreview } from '@/components/timewalk/useDateSystem';

type Tab = 'arcs' | 'themes' | 'promises' | 'repeated' | 'quotes' | 'line' | 'places' | 'covenants' | 'names' | 'words' | 'people';

const TABS: { id: Tab; label: string; blurb: string }[] = [
  { id: 'arcs', label: 'Connections', blurb: 'Every chapter of the Bible, joined by the cross-references readers find most often.' },
  { id: 'themes', label: 'Themes', blurb: 'Threads that run from Genesis to Revelation, and what each shows about God.' },
  { id: 'promises', label: 'Promises', blurb: 'Old Testament promises and pictures, and how they are fulfilled in Christ.' },
  { id: 'repeated', label: 'Patterns', blurb: 'Things God does again and again across the story.' },
  { id: 'quotes', label: 'OT in the NT', blurb: 'Where the New Testament quotes the Old — and which books it quotes most.' },
  { id: 'line', label: 'Promised line', blurb: 'The family line from Adam to Jesus, through which God kept His promise.' },
  { id: 'places', label: 'Places', blurb: 'Places that return at turning points in the story.' },
  { id: 'covenants', label: 'Covenants', blurb: 'The great promises God bound Himself to, and how they meet in Christ.' },
  { id: 'names', label: 'Names of God', blurb: 'The names God is known by, each revealing something about Him.' },
  { id: 'words', label: 'Word threads', blurb: 'Follow a Hebrew or Greek word through the whole Bible.' },
  { id: 'people', label: 'People web', blurb: 'Who appears with whom — the people most often named in the same verses.' },
];

const PENDING = 'These notes are being reviewed and will appear here soon. The data-driven views (Connections, OT in the NT, Promised line, Word threads, People web) are ready now.';

export default function Patterns() {
  const navigate = useNavigate();
  const preview = useDraftPreview();
  const [tab, setTab] = useState<Tab>(() => {
    try {
      const saved = localStorage.getItem('wl-patterns-tab') as Tab | null;
      return saved && TABS.some(t => t.id === saved) ? saved : 'arcs';
    } catch {
      return 'arcs';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wl-patterns-tab', tab);
    } catch {
      /* ignore */
    }
  }, [tab]);

  const openBible = (ref: BibleReference) => navigate('/bible', { state: { initialReference: ref } });
  const current = TABS.find(t => t.id === tab)!;

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
        <h2 className="text-2xl font-semibold text-foreground">Pattern Explorer</h2>
        <p className="text-foreground/55 leading-relaxed max-w-xl mt-1">
          The Bible is one story with one hero. See how its threads, promises, people and places connect — and what they reveal about God.
        </p>

        <div className="flex items-center gap-0 border-b border-border/20 mt-6 mb-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t.id ? 'border-foreground/60 text-foreground' : 'border-transparent text-foreground/40 hover:text-foreground/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-foreground/50 mb-6">{current.blurb}</p>

        {tab === 'arcs' && <ArcWeb onOpen={openBible} />}
        {tab === 'themes' && <ThemesTab preview={preview} onOpen={openBible} />}
        {tab === 'promises' && <PromisesTab preview={preview} onOpen={openBible} />}
        {tab === 'repeated' && <RepeatedTab preview={preview} onOpen={openBible} />}
        {tab === 'quotes' && <QuotesTab onOpen={openBible} />}
        {tab === 'line' && <LineTab preview={preview} onOpen={openBible} />}
        {tab === 'places' && <PlacesTab preview={preview} onOpen={openBible} />}
        {tab === 'covenants' && <CovenantsTab preview={preview} onOpen={openBible} />}
        {tab === 'names' && <NamesTab preview={preview} onOpen={openBible} />}
        {tab === 'words' && <WordsTab onOpen={openBible} />}
        {tab === 'people' && <PeopleWeb onOpen={openBible} />}

        <p className="mt-10 text-[11px] leading-relaxed text-foreground/35">
          {PATTERNS_ATTRIBUTION.crossRefs}. {PATTERNS_ATTRIBUTION.quotes}. {PATTERNS_ATTRIBUTION.people}.
        </p>
      </div>
    </div>
  );
}

// ============ Shared bits ============

type Opener = { onOpen: (ref: BibleReference) => void };

function RefChip({ label, refTo, onOpen }: { label: string; refTo: BibleReference } & Opener) {
  return (
    <button
      type="button"
      onClick={() => onOpen(refTo)}
      className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
    >
      {label}
    </button>
  );
}

function AboutGod({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-xl bg-hl-green/10 px-3 py-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/45">What this reveals about God</p>
      <p className="text-sm leading-relaxed text-foreground/80 mt-0.5">{children}</p>
    </div>
  );
}

function Pending() {
  return <p className="text-sm text-foreground/50">{PENDING}</p>;
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`rounded-2xl border border-border/30 px-4 py-3.5 ${className}`}>{children}</article>;
}

const visible = <T extends { reviewed: boolean }>(items: T[], preview: boolean) => items.filter(i => preview || i.reviewed);

// ============ Themes ============

function ThemesTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const themes = visible(THEMES, preview);
  const [id, setId] = useState<string | null>(themes[0]?.id ?? null);
  if (!themes.length) return <Pending />;
  const theme = themes.find(t => t.id === id) ?? themes[0];
  return (
    <div className="grid gap-6 md:grid-cols-[13rem_1fr]">
      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
        {themes.map(t => (
          <li key={t.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setId(t.id)}
              className={`w-full text-left rounded-lg px-3 py-1.5 text-sm transition-colors whitespace-nowrap md:whitespace-normal ${
                t.id === theme.id ? 'bg-foreground/[0.07] text-foreground' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]'
              }`}
            >
              {t.title}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="font-serif text-xl text-foreground/90">
          {theme.title}
          {!theme.reviewed && <DraftBadge />}
        </h3>
        <p className="text-sm text-foreground/65 mt-1 leading-relaxed">{theme.summary}</p>
        <ol className="mt-5 relative border-l border-border/50 ml-2 space-y-4">
          {theme.points.map((p, i) => (
            <li key={i} className="pl-5 relative">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-foreground/50" />
              <button type="button" onClick={() => onOpen(p.ref)} className="text-sm font-medium text-foreground/85 hover:underline">
                {p.label}
              </button>
              <p className="text-sm text-foreground/65 leading-relaxed mt-0.5">{p.note}</p>
            </li>
          ))}
        </ol>
        <AboutGod>{theme.aboutGod}</AboutGod>
      </div>
    </div>
  );
}

// ============ Promises ============

const SOURCE_LABEL: Record<PromisePair['source'], string> = {
  nt: 'Made by the New Testament',
  traditional: 'A traditional Christian reading',
};

function PromisesTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const [filter, setFilter] = useState<'all' | 'prophecy' | 'type'>('all');
  const items = visible(PROMISES, preview).filter(p => filter === 'all' || p.kind === filter);
  if (!visible(PROMISES, preview).length) return <Pending />;
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(
          [
            ['all', 'All'],
            ['prophecy', 'Promises & prophecies'],
            ['type', 'Pictures (types)'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full px-3 py-1 text-xs border transition-colors ${filter === id ? 'border-foreground/50 text-foreground bg-foreground/[0.05]' : 'border-border/50 text-foreground/55 hover:text-foreground'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-foreground/50 mb-4 leading-relaxed max-w-2xl">
        Each link is marked by where it comes from: <strong className="font-medium text-foreground/70">made by the New Testament</strong> (the apostles or Jesus draw the connection) or{' '}
        <strong className="font-medium text-foreground/70">a traditional Christian reading</strong> (a long-standing interpretation the New Testament doesn’t state outright).
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(p => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-lg text-foreground/90 leading-snug">
                {p.title}
                {!p.reviewed && <DraftBadge />}
              </p>
            </div>
            <span
              className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                p.source === 'nt' ? 'bg-hl-green/15 text-foreground/75' : 'bg-foreground/[0.06] text-foreground/60'
              }`}
            >
              {SOURCE_LABEL[p.source]}
            </span>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <RefChip label={p.ot.label} refTo={p.ot.ref} onOpen={onOpen} />
              <ArrowRight className="w-3.5 h-3.5 text-foreground/35" />
              {p.nt.map(n => (
                <RefChip key={n.label} label={n.label} refTo={n.ref} onOpen={onOpen} />
              ))}
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mt-2">{p.note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============ Repeated patterns ============

function RepeatedTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const items = visible(REPEATED_PATTERNS, preview);
  if (!items.length) return <Pending />;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(p => (
        <Card key={p.id}>
          <p className="font-serif text-lg text-foreground/90 leading-snug">
            {p.title}
            {!p.reviewed && <DraftBadge />}
          </p>
          <p className="text-sm text-foreground/65 mt-1 leading-relaxed">{p.summary}</p>
          <ul className="mt-3 space-y-1">
            {p.instances.map(i => (
              <li key={i.label} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-foreground/75">{i.who}</span>
                <button type="button" onClick={() => onOpen(i.ref)} className="text-xs text-foreground/50 hover:text-foreground hover:underline whitespace-nowrap">
                  {i.label}
                </button>
              </li>
            ))}
          </ul>
          {p.caveat && <p className="mt-3 text-xs text-foreground/50 leading-relaxed border-l-2 border-border/50 pl-2.5">{p.caveat}</p>}
          <AboutGod>{p.aboutGod}</AboutGod>
        </Card>
      ))}
    </div>
  );
}

// ============ OT quotes in the NT ============

function QuotesTab({ onOpen }: Opener) {
  const [quotes, setQuotes] = useState<QuoteEntry[] | null>(null);
  const [book, setBook] = useState<string | null>('Isa');
  useEffect(() => {
    getQuotes().then(setQuotes);
  }, []);

  const { counts, topPassages } = useMemo(() => {
    const counts: Record<string, number> = {};
    const passages = new Map<string, { label: string; ref: BibleReference; n: number }>();
    for (const q of quotes ?? []) {
      const books = new Set(q.ot.map(o => stepCode(o.book)!));
      books.forEach(b => (counts[b] = (counts[b] ?? 0) + 1));
      for (const o of q.ot) {
        const p = passages.get(o.label) ?? { label: o.label, ref: o.ref, n: 0 };
        p.n++;
        passages.set(o.label, p);
      }
    }
    return { counts, topPassages: [...passages.values()].sort((a, b) => b.n - a.n).slice(0, 10) };
  }, [quotes]);

  if (!quotes) return <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />;
  const selected = book ? quotes.filter(q => q.ot.some(o => stepCode(o.book) === book)) : [];
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div>
      <p className="text-sm text-foreground/65 mb-3">
        {quotes.length} New Testament verses quote or closely echo the Old Testament. Jesus and the apostles read the whole Old Testament as pointing to Him (Luke 24:27).
      </p>
      <BookBars counts={counts} selected={book} onSelect={setBook} unit="NT verses quote it" />
      <p className="text-xs text-foreground/45 mt-2">
        Most quoted: {ranked.map(([c, n]) => `${bookFromStep(c)} (${n})`).join(', ')}. Tap a bar to see the quotations.
      </p>

      <div className="grid gap-6 md:grid-cols-[1fr_15rem] mt-6">
        <div>
          {book && (
            <>
              <h4 className="text-sm font-medium text-foreground mb-2">
                {bookFromStep(book)} quoted in the New Testament · {selected.length}
              </h4>
              <ul className="space-y-1.5">
                {selected.map(q => (
                  <li key={q.ntLabel} className="flex flex-wrap items-center gap-1.5 text-sm">
                    <RefChip label={q.ntLabel} refTo={q.nt} onOpen={onOpen} />
                    <span className="text-foreground/35 text-xs">quotes</span>
                    {q.ot
                      .filter(o => stepCode(o.book) === book)
                      .map(o => (
                        <RefChip key={o.label} label={o.label} refTo={o.ref} onOpen={onOpen} />
                      ))}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Most-quoted passages</h4>
          <ol className="space-y-1">
            {topPassages.map(p => (
              <li key={p.label} className="flex justify-between text-sm">
                <button type="button" onClick={() => onOpen(p.ref)} className="text-foreground/75 hover:text-foreground hover:underline">
                  {p.label}
                </button>
                <span className="text-foreground/40 tabular-nums">{p.n}×</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ============ The promised line ============

function LineTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const [line, setLine] = useState<LinePerson[] | null>(null);
  const [person, setPerson] = useState<string | null>(null);
  useEffect(() => {
    getLine().then(setLine);
  }, []);
  if (!line) return <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />;
  const markers = visible(LINE_MARKERS, preview);
  const seen = new Set<string>();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)]">
      <div>
        <p className="text-sm text-foreground/65 mb-4 leading-relaxed">
          {line.length} generations from Adam to Jesus. Through famine, slavery, exile and silence, God kept the family line alive — because He had promised. Tap a name for their profile.
        </p>
        <ol className="relative border-l border-border/50 ml-2">
          {line.map((p, i) => {
            // The first "Jacob" is the patriarch; markers attach to the first match only
            const marker = !seen.has(p.name) ? markers.find(m => m.name === p.name) : undefined;
            seen.add(p.name);
            return (
              <li key={`${p.id}-${i}`} className={`pl-5 relative ${marker ? 'py-2' : 'py-0.5'}`}>
                <span className={`absolute rounded-full ${marker ? '-left-[6px] top-3.5 w-3 h-3 bg-foreground' : '-left-[3.5px] top-2.5 w-[7px] h-[7px] bg-foreground/35'}`} />
                <button
                  type="button"
                  onClick={() => setPerson(p.id)}
                  className={`text-sm hover:underline ${person === p.id ? 'text-foreground font-medium' : marker ? 'text-foreground font-medium' : 'text-foreground/70'}`}
                >
                  {p.name}
                </button>
                {p.note === 'nephew' && <span className="ml-2 text-[11px] text-foreground/45">see note on Zerubbabel</span>}
                {marker && (
                  <div className="mt-1 rounded-lg bg-hl-green/10 px-2.5 py-1.5 max-w-md">
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      {marker.promise} {!marker.reviewed && <DraftBadge />}
                    </p>
                    <button type="button" onClick={() => onOpen(marker.ref.ref)} className="text-[11px] text-foreground/55 hover:text-foreground hover:underline">
                      {marker.ref.label}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-6 space-y-2">
          {LINE_NOTES.map((n, i) => (
            <p key={i} className="text-xs text-foreground/50 leading-relaxed border-l-2 border-border/50 pl-2.5">
              {n}
            </p>
          ))}
        </div>
      </div>
      <div className="lg:sticky lg:top-4 self-start">
        {person ? (
          <PersonCard id={person} onSelectPerson={setPerson} onGoTo={onOpen} onClose={() => setPerson(null)} />
        ) : (
          <Card>
            <p className="text-sm text-foreground/60 leading-relaxed">
              “When the fullness of time had come, God sent forth His Son, born of woman.” <span className="text-foreground/45">— Galatians 4:4</span>
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ============ Places through the story ============

function PlacesTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const [photos, setPhotos] = useState<Record<string, Photo>>({});
  useEffect(() => {
    getPlacePhotos().then(setPhotos);
  }, []);
  const items = visible(STORY_PLACES, preview);
  if (!items.length) return <Pending />;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(p => {
        const photo = photos[p.placeId];
        return (
          <article key={p.id} className="rounded-2xl border border-border/30 overflow-hidden">
            {photo && <PhotoThumb photo={photo} className="rounded-none" aspect="aspect-[16/9]" />}
            <div className="px-4 py-3.5">
              <p className="font-serif text-lg text-foreground/90">
                {p.name}
                {!p.reviewed && <DraftBadge />}
              </p>
              <p className="text-sm text-foreground/65 mt-1 leading-relaxed">{p.summary}</p>
              <ol className="mt-3 space-y-1">
                {p.moments.map(m => (
                  <li key={m.label} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-foreground/75">{m.what}</span>
                    <button type="button" onClick={() => onOpen(m.ref)} className="text-xs text-foreground/50 hover:text-foreground hover:underline whitespace-nowrap">
                      {m.label}
                    </button>
                  </li>
                ))}
              </ol>
              <AboutGod>{p.aboutGod}</AboutGod>
              {photo && <PhotoCredit photo={photo} className="mt-2" />}
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ============ Covenants ============

function CovenantsTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const items = visible(COVENANTS, preview);
  if (!items.length) return <Pending />;
  return (
    <div>
      <ol className="relative border-l border-border/50 ml-2 space-y-5">
        {items.map((c, i) => (
          <li key={c.id} className="pl-6 relative">
            <span className="absolute -left-[11px] top-0.5 w-[22px] h-[22px] rounded-full bg-background border border-foreground/40 text-[11px] flex items-center justify-center text-foreground/70">{i + 1}</span>
            <Card>
              <p className="font-serif text-lg text-foreground/90">
                {c.name}
                {!c.reviewed && <DraftBadge />}
              </p>
              <p className="text-xs text-foreground/50 mt-0.5">
                With {c.with} ·{' '}
                <button type="button" onClick={() => onOpen(c.ref.ref)} className="hover:text-foreground hover:underline">
                  {c.ref.label}
                </button>
              </p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-[6rem_1fr]">
                <dt className="text-foreground/45">Promise</dt>
                <dd className="text-foreground/80 leading-relaxed">{c.promise}</dd>
                <dt className="text-foreground/45">Sign</dt>
                <dd className="text-foreground/80">{c.sign}</dd>
                <dt className="text-foreground/45">In Christ</dt>
                <dd className="text-foreground/80 leading-relaxed">
                  {c.fulfillment}
                  <span className="ml-1.5 inline-flex flex-wrap gap-1 align-middle">
                    {c.fulfillmentRefs.map(f => (
                      <RefChip key={f.label} label={f.label} refTo={f.ref} onOpen={onOpen} />
                    ))}
                  </span>
                </dd>
              </dl>
            </Card>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs text-foreground/50 leading-relaxed border-l-2 border-border/50 pl-2.5 max-w-2xl">{COVENANT_CAVEAT}</p>
    </div>
  );
}

// ============ Names of God ============

function NamesTab({ preview, onOpen }: { preview: boolean } & Opener) {
  const items = visible(NAMES_OF_GOD, preview);
  const [open, setOpen] = useState<string | null>(null);
  if (!items.length) return <Pending />;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(n => (
        <Card key={n.id} className={open === n.id ? 'sm:col-span-2' : ''}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-serif text-lg text-foreground/90">
              {n.name}
              {!n.reviewed && <DraftBadge />}
            </p>
            <span className="font-serif text-lg text-foreground/60" dir="auto">
              {n.original}
            </span>
          </div>
          <p className="text-sm text-foreground/70 italic">{n.meaning}</p>
          <p className="text-sm text-foreground/65 mt-2 leading-relaxed">{n.context}</p>
          <div className="mt-2 flex items-center gap-2">
            <RefChip label={n.firstRef.label} refTo={n.firstRef.ref} onOpen={onOpen} />
            <button type="button" onClick={() => setOpen(open === n.id ? null : n.id)} className="text-xs text-foreground/50 hover:text-foreground">
              {open === n.id ? 'Hide word study' : `Word study · ${displayStrong(n.strong)}`}
            </button>
          </div>
          <AboutGod>{n.aboutGod}</AboutGod>
          {open === n.id && (
            <div className="mt-3">
              <LexiconCard strong={n.strong} onGoTo={onOpen} onClose={() => setOpen(null)} />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

// ============ Word threads ============

interface WordChoice {
  strong: string;
  label: string;
  sub: string;
}

function WordsTab({ onOpen }: Opener) {
  const [choice, setChoice] = useState<WordChoice>(() => {
    const k = KEY_WORDS[0];
    return { strong: k.occurrenceStrong ?? k.strong, label: `${k.original} · ${k.translit}`, sub: k.english };
  });
  const [occ, setOcc] = useState<Occurrences | null>(null);
  const [book, setBook] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<LexiconHit[]>([]);

  useEffect(() => {
    let cancelled = false;
    setOcc(null);
    setBook(null);
    getOccurrences(choice.strong).then(o => !cancelled && setOcc(o));
    return () => {
      cancelled = true;
    };
  }, [choice.strong]);

  useEffect(() => {
    if (query.trim().length < 2) return setHits([]);
    let cancelled = false;
    searchLexicon(query, 10).then(h => !cancelled && setHits(h));
    return () => {
      cancelled = true;
    };
  }, [query]);

  const refsInBook = occ && book ? occ.refs.filter(r => stepCode(r.book) === book) : [];
  const truncated = occ ? occ.refs.length < occ.count : false;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {KEY_WORDS.slice(0, 18).map(k => {
          const s = k.occurrenceStrong ?? k.strong;
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => setChoice({ strong: s, label: `${k.original} · ${k.translit}`, sub: k.english })}
              className={`rounded-full px-2.5 py-1 text-xs border transition-colors ${choice.strong === s ? 'border-foreground/50 text-foreground bg-foreground/[0.05]' : 'border-border/50 text-foreground/60 hover:text-foreground'}`}
            >
              {k.translit}
            </button>
          );
        })}
      </div>
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Or search any word (e.g. grace, shalom, G26)…"
          className="w-full rounded-full border border-border/50 bg-transparent pl-9 pr-3 py-2 text-sm outline-none focus:border-foreground/40"
        />
        {hits.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-xl border border-border/40 bg-popover shadow-lg py-1 max-h-72 overflow-auto">
            {hits.map(h => (
              <li key={h.strong}>
                <button
                  type="button"
                  onClick={() => {
                    setChoice({ strong: h.strong, label: `${h.lemma} · ${formatTranslit(h.translit)}`, sub: h.gloss });
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-foreground/[0.05]"
                >
                  <span className="font-serif">{h.lemma}</span> <span className="text-foreground/60">{formatTranslit(h.translit)}</span>{' '}
                  <span className="text-foreground/45 text-xs">{h.gloss}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="font-serif text-xl text-foreground/90">{choice.label}</h3>
      <p className="text-sm text-foreground/55 mb-4">
        {choice.sub} · {displayStrong(choice.strong)}
        {occ && ` · in ${occ.count} verses`}
      </p>
      {!occ ? (
        <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
      ) : (
        <>
          <BookBars counts={occ.byBook} selected={book} onSelect={setBook} />
          <p className="text-xs text-foreground/45 mt-2">Tap a book to see where the word appears.</p>
          {book && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-foreground mb-2">
                {bookFromStep(book)} · {occ.byBook[book] ?? 0} verses
              </h4>
              <div className="flex flex-wrap gap-1">
                {refsInBook.map(r => (
                  <RefChip key={`${r.chapter}:${r.verse}`} label={`${r.chapter}:${r.verse}`} refTo={r} onOpen={onOpen} />
                ))}
              </div>
              {truncated && refsInBook.length < (occ.byBook[book] ?? 0) && (
                <p className="text-xs text-foreground/45 mt-2">Showing the verses within the first 400 occurrences.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
