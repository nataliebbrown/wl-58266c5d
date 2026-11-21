import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Loader2, Search, X } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { ERAS, WORLD_EVENTS, WORLD_POWERS, type Era } from '@/lib/timewalk/eras';
import { FINDS } from '@/lib/timewalk/archaeology';
import { LIFE_TOPICS } from '@/lib/timewalk/dailyLife';
import {
  TIMEWALK_ATTRIBUTION,
  eraOfEvent,
  eventDates,
  getEvents,
  getFindImages,
  getPeopleById,
  labelForRange,
  lifespan,
  refFromRange,
  searchPeople,
  type Photo,
  type PersonSummary,
  type TimelineEvent,
} from '@/lib/timewalk/data';
import { CaveatNote } from '@/components/timewalk/CaveatNote';
import { DateToggle } from '@/components/timewalk/DateToggle';
import { FindCard } from '@/components/timewalk/FindCard';
import { LifeCard } from '@/components/timewalk/LifeCard';
import { PersonCard } from '@/components/timewalk/PersonCard';
import { ArtGallery } from '@/components/timewalk/ArtGallery';
import { useArt } from '@/components/timewalk/useArt';
import { useDateSystem, useDraftPreview } from '@/components/timewalk/useDateSystem';

type Tab = 'timeline' | 'people' | 'finds' | 'life';

export default function TimeWalk() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEra = (location.state as { eraId?: string } | null)?.eraId;
  const [tab, setTab] = useState<Tab>('timeline');
  const [system, setSystem] = useDateSystem();
  const preview = useDraftPreview();
  const [eraId, setEraId] = useState<string>(initialEra && ERAS.some(e => e.id === initialEra) ? initialEra : 'patriarchs');
  const [events, setEvents] = useState<TimelineEvent[] | null>(null);
  const [images, setImages] = useState<Record<string, Photo>>({});

  useEffect(() => {
    getEvents().then(setEvents);
    getFindImages().then(setImages);
  }, []);

  const openBible = (ref: BibleReference) => navigate('/bible', { state: { initialReference: ref } });
  const era = ERAS.find(e => e.id === eraId)!;

  const tabs: [Tab, string][] = [
    ['timeline', 'Timeline'],
    ['people', 'People'],
    ['finds', 'Archaeology'],
    ['life', 'Daily life'],
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">TimeWalk</h2>
            <p className="text-foreground/55 leading-relaxed max-w-xl mt-1">
              Step into the world of the Bible — when it happened, who was there, what life was like, and what has been found. History is the stage where God works out His plan.
            </p>
          </div>
          <DateToggle value={system} onChange={setSystem} />
        </div>

        <div className="flex items-center gap-0 border-b border-border/20 mb-6 overflow-x-auto">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === id ? 'border-foreground/60 text-foreground' : 'border-transparent text-foreground/40 hover:text-foreground/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'timeline' && (
          <TimelineTab era={era} onSelectEra={setEraId} system={system} events={events} images={images} preview={preview} onOpenBible={openBible} />
        )}
        {tab === 'people' && <PeopleTab onOpenBible={openBible} />}
        {tab === 'finds' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {ERAS.flatMap(e => FINDS.filter(f => f.eraId === e.id && (preview || f.reviewed))).map(f => (
              <FindCard key={f.id} find={f} photo={images[f.id]} onGoTo={openBible} />
            ))}
            {!preview && FINDS.every(f => !f.reviewed) && <p className="text-sm text-foreground/50 sm:col-span-2">Archaeology notes are being reviewed and will appear here soon.</p>}
          </div>
        )}
        {tab === 'life' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {LIFE_TOPICS.filter(t => preview || t.reviewed).map(t => (
              <LifeCard key={t.id} topic={t} onGoTo={openBible} />
            ))}
            {!preview && LIFE_TOPICS.every(t => !t.reviewed) && <p className="text-sm text-foreground/50 sm:col-span-2">Daily-life notes are being reviewed and will appear here soon.</p>}
          </div>
        )}

        <p className="mt-10 text-[11px] leading-relaxed text-foreground/35">
          {TIMEWALK_ATTRIBUTION.people}. {TIMEWALK_ATTRIBUTION.photos}. Traditional dates follow Archbishop James Ussher (1650); scholarly dates are approximate.
        </p>
      </div>
    </div>
  );
}

// ============ Timeline ============

function TimelineTab({
  era,
  onSelectEra,
  system,
  events,
  images,
  preview,
  onOpenBible,
}: {
  era: Era;
  onSelectEra: (id: string) => void;
  system: 'scholarly' | 'traditional';
  events: TimelineEvent[] | null;
  images: Record<string, Photo>;
  preview: boolean;
  onOpenBible: (r: BibleReference) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [people, setPeople] = useState<Map<string, PersonSummary> | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getPeopleById().then(setPeople);
  }, []);
  useEffect(() => {
    setShowAll(false);
    // Scroll only the strip (scrollIntoView would also scroll the page sideways)
    const strip = stripRef.current;
    const card = strip?.querySelector<HTMLElement>(`[data-era="${era.id}"]`);
    if (strip && card) strip.scrollTo({ left: card.offsetLeft - strip.clientWidth / 2 + card.clientWidth / 2, behavior: 'smooth' });
  }, [era.id]);

  const eraEvents = useMemo(() => (events ?? []).filter(e => eraOfEvent(e)?.id === era.id), [events, era.id]);
  // Skip the "Lifetime of…" and birth/death markers in the main list — they crowd it
  const keyEvents = eraEvents.filter(e => !/^(Lifetime of|Birth of|Death of)\b/.test(e.title));
  const shown = showAll ? keyEvents : keyEvents.slice(0, 12);

  const eraPeople = useMemo(() => {
    if (!people) return [];
    const ids = new Set(eraEvents.flatMap(e => e.people));
    return [...ids]
      .map(id => people.get(id))
      .filter((p): p is PersonSummary => !!p && !/^(god|holy_spirit|jesus)_/.test(p.id))
      .sort((a, b) => b.verseCount - a.verseCount)
      .slice(0, 14);
  }, [people, eraEvents]);

  const world = era.range
    ? {
        powers: WORLD_POWERS.filter(p => p.from <= era.range![1] && p.to >= era.range![0]),
        events: WORLD_EVENTS.filter(e => e.year >= era.range![0] - 60 && e.year <= era.range![1] + 20),
      }
    : { powers: [], events: [] };
  const finds = FINDS.filter(f => f.eraId === era.id && (preview || f.reviewed));
  const topics = LIFE_TOPICS.filter(t => t.eras.includes(era.id) && (preview || t.reviewed)).slice(0, 4);
  const art = useArt().filter(a => a.era === era.id);

  return (
    <div>
      {/* Era strip */}
      <div ref={stripRef} className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 snap-x" role="tablist" aria-label="Eras">
        {ERAS.map((e, i) => {
          const active = e.id === era.id;
          return (
            <button
              key={e.id}
              data-era={e.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectEra(e.id)}
              className={`snap-start shrink-0 w-44 text-left rounded-2xl border px-3.5 py-3 transition-colors ${
                active ? 'border-hl-green/60 bg-hl-green/10' : 'border-border/30 hover:bg-foreground/[0.03]'
              }`}
            >
              <span className="block text-[10.5px] text-foreground/40">{i + 1}</span>
              <span className="block font-serif text-[15px] leading-tight text-foreground/90">{e.name}</span>
              <span className="block text-[11px] text-foreground/50 mt-1 leading-snug">{system === 'scholarly' ? e.scholarly : e.traditional}</span>
            </button>
          );
        })}
      </div>

      {/* Era detail */}
      <section className="mt-4">
        <h3 className="font-serif text-3xl text-foreground/90">{era.name}</h3>
        <p className="text-foreground/75 mt-1">{system === 'scholarly' ? era.scholarly : era.traditional}</p>
        <p className="text-xs text-foreground/45">{system === 'scholarly' ? `Traditional: ${era.traditional}` : `Scholarly: ${era.scholarly}`}</p>
        <p className="text-[15px] leading-relaxed text-foreground/70 mt-3 max-w-2xl">{era.summary}</p>
        <div className="mt-4 rounded-2xl border border-hl-green/30 bg-hl-green/[0.07] px-4 py-4 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 mb-1">What God was doing</p>
          <p className="font-serif text-lg leading-relaxed text-foreground/85">{era.godAtWork}</p>
        </div>
        {era.caveats.length > 0 && (
          <div className="mt-4 space-y-2 max-w-2xl">
            {era.caveats.map(c => (
              <CaveatNote key={c} id={c} />
            ))}
          </div>
        )}
        {era.books.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {era.books.map(b => (
              <button
                key={`${b.book}-${b.from ?? 1}`}
                type="button"
                onClick={() => onOpenBible({ book: b.book, chapter: b.from ?? 1 })}
                className="inline-flex items-center gap-1 rounded-full border border-border/50 px-2.5 py-0.5 text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
              >
                <BookOpen className="w-3 h-3" />
                {b.book}
                {b.from ? ` ${b.from}–${b.to}` : ''}
              </button>
            ))}
          </div>
        )}
      </section>

      {art.length > 0 && (
        <div className="mt-8">
          <ArtGallery items={art} onGoTo={onOpenBible} />
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Events */}
        <section>
          <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Events</h4>
          {!events ? (
            <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
          ) : keyEvents.length === 0 ? (
            <p className="text-sm text-foreground/50">No events recorded for this era — see the wider world below.</p>
          ) : (
            <ol className="relative border-l border-border/50 ml-2 space-y-3">
              {shown.map(e => {
                const d = eventDates(e, system);
                const first = e.refs[0] ? refFromRange(e.refs[0]) : null;
                return (
                  <li key={e.id} className="ml-4">
                    <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-hl-green/70" aria-hidden />
                    <p className="text-[15px] text-foreground/85">{e.title}</p>
                    <p className="text-xs text-foreground/55">{d.primary}</p>
                    {d.secondary && <p className="text-[11px] text-foreground/40">{d.secondary}</p>}
                    {first && (
                      <button type="button" onClick={() => onOpenBible(first)} className="mt-0.5 text-xs text-foreground/55 underline underline-offset-2 hover:text-foreground">
                        Read {labelForRange(e.refs[0])}
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
          {keyEvents.length > 12 && (
            <button type="button" onClick={() => setShowAll(s => !s)} className="mt-3 text-sm text-foreground/55 hover:text-foreground">
              {showAll ? 'Show fewer' : `Show all ${keyEvents.length} events`}
            </button>
          )}
        </section>

        <aside className="space-y-6">
          {eraPeople.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-2">People</h4>
              <div className="flex flex-wrap gap-1.5">
                {eraPeople.map(p => (
                  <span key={p.id} className="rounded-full border border-border/40 px-2.5 py-0.5 text-xs text-foreground/70">
                    {p.name}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-foreground/40 mt-1.5">See the People tab for profiles and families.</p>
            </div>
          )}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-2">The wider world</h4>
            <p className="text-sm text-foreground/70">{era.empire}</p>
            {world.powers.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {world.powers.map(p => (
                  <span key={p.name} className="rounded-full bg-foreground/[0.05] px-2.5 py-0.5 text-[11px] text-foreground/60">
                    {p.name}
                  </span>
                ))}
              </div>
            )}
            {world.events.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/65">
                {world.events.map(e => (
                  <li key={e.label} className="flex gap-2">
                    <span className="text-foreground/30">•</span>
                    {e.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {finds.length > 0 && (
        <section className="mt-10">
          <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Archaeology from this era</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {finds.map(f => (
              <FindCard key={f.id} find={f} photo={images[f.id]} onGoTo={onOpenBible} compact />
            ))}
          </div>
        </section>
      )}
      {topics.length > 0 && (
        <section className="mt-10">
          <h4 className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">Daily life</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map(t => (
              <LifeCard key={t.id} topic={t} onGoTo={onOpenBible} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============ People ============

function PeopleTab({ onOpenBible }: { onOpenBible: (r: BibleReference) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PersonSummary[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      searchPeople(query, 60).then(list => setResults(list.filter(p => !/^(god|holy_spirit)_/.test(p.id))));
    }, 200);
    return () => clearTimeout(t);
  }, [query]);
  useEffect(() => {
    if (selected) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
      <div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 3,000+ people"
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-border/40 bg-card/60 text-sm focus:outline-none focus:border-foreground/30"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/35" aria-label="Clear">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {!query && <p className="text-xs text-foreground/45 mb-2">Most-mentioned people</p>}
        {!results ? (
          <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
        ) : (
          <ul className="rounded-2xl border border-border/30 divide-y divide-border/30 max-h-[60vh] overflow-y-auto">
            {results.map(p => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelected(p.id)}
                  className={`w-full text-left px-3.5 py-2.5 hover:bg-foreground/[0.03] ${selected === p.id ? 'bg-foreground/[0.05]' : ''}`}
                >
                  <span className="block text-sm text-foreground/85">{p.title || p.name}</span>
                  <span className="block text-[11px] text-foreground/45">
                    {p.verseCount.toLocaleString()} verses{lifespan(p) ? ` · ${lifespan(p)} (traditional)` : ''}
                  </span>
                </button>
              </li>
            ))}
            {results.length === 0 && <li className="px-3.5 py-3 text-sm text-foreground/50">No one by that name.</li>}
          </ul>
        )}
      </div>
      <div ref={cardRef} className="scroll-mt-4">
        {selected ? (
          <PersonCard id={selected} onSelectPerson={setSelected} onGoTo={onOpenBible} />
        ) : (
          <p className="text-sm text-foreground/50 rounded-2xl border border-dashed border-border/50 px-5 py-6">
            Choose someone to see their story, family, and key passages. Tap a relative to follow the family line.
          </p>
        )}
      </div>
    </div>
  );
}
