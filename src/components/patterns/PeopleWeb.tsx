import { useEffect, useMemo, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { getPeopleWeb } from '@/lib/patterns/data';
import { getPeopleById, searchPeople, type PersonSummary } from '@/lib/timewalk/data';
import { PersonCard } from '@/components/timewalk/PersonCard';

const SIZE = 420;
const C = SIZE / 2;
const MAX_NODES = 16;

/** A person in the centre, ringed by the people most often named in the same verses. */
export function PeopleWeb({ onOpen, initialId = 'david_994' }: { onOpen: (ref: BibleReference) => void; initialId?: string }) {
  const [web, setWeb] = useState<Record<string, [string, number][]> | null>(null);
  const [people, setPeople] = useState<Map<string, PersonSummary> | null>(null);
  const [center, setCenter] = useState(initialId);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PersonSummary[]>([]);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    getPeopleWeb().then(setWeb);
    getPeopleById().then(setPeople);
  }, []);

  useEffect(() => {
    if (!query.trim() || !web) return setResults([]);
    let cancelled = false;
    searchPeople(query, 60).then(r => !cancelled && setResults(r.filter(p => web[p.id]).slice(0, 8)));
    return () => {
      cancelled = true;
    };
  }, [query, web]);

  // Fall back to the best-connected person if the default id isn't present
  const centerId = web && !web[center] ? Object.keys(web).sort((a, b) => web[b].length - web[a].length)[0] : center;

  const nodes = useMemo(() => {
    const list = (web?.[centerId] ?? []).slice(0, MAX_NODES);
    const max = Math.max(1, ...list.map(l => l[1]));
    return list.map(([id, count], i) => {
      const angle = (i / list.length) * Math.PI * 2 - Math.PI / 2;
      const r = 150 - (count / max) * 40;
      return { id, count, x: C + Math.cos(angle) * r, y: C + Math.sin(angle) * r, w: count / max };
    });
  }, [web, centerId]);

  if (!web || !people) return <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />;
  const name = (id: string) => people.get(id)?.name ?? id.replace(/_\d+$/, '');

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)]">
      <div>
        <div className="relative mb-3 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Find a person…"
            className="w-full rounded-full border border-border/50 bg-transparent pl-9 pr-3 py-2 text-sm outline-none focus:border-foreground/40"
          />
          {results.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-xl border border-border/40 bg-popover shadow-lg py-1">
              {results.map(p => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCenter(p.id);
                      setQuery('');
                      setProfile(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-foreground/[0.05]"
                  >
                    {p.name} <span className="text-foreground/45 text-xs">{p.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-md mx-auto h-auto" role="img" aria-label={`People most often named with ${name(centerId)}`}>
          <g className="stroke-foreground">
            {nodes.map(n => (
              <line key={n.id} x1={C} y1={C} x2={n.x} y2={n.y} strokeWidth={0.6 + n.w * 2.4} strokeOpacity={0.12 + n.w * 0.3} />
            ))}
          </g>
          {nodes.map(n => (
            <g key={n.id} onClick={() => { setCenter(n.id); setProfile(false); }} className="cursor-pointer group">
              <title>{`${name(n.id)} — named together in ${n.count} verse${n.count === 1 ? '' : 's'}`}</title>
              <circle cx={n.x} cy={n.y} r={6 + n.w * 6} className="fill-card stroke-foreground/50 group-hover:stroke-foreground" strokeWidth={1.5} />
              <text x={n.x} y={n.y + (n.y > C ? 22 + n.w * 6 : -12 - n.w * 6)} textAnchor="middle" className="fill-foreground/75 text-[11px] font-sans group-hover:fill-foreground">
                {name(n.id)}
              </text>
            </g>
          ))}
          <g onClick={() => setProfile(p => !p)} className="cursor-pointer">
            <circle cx={C} cy={C} r={30} className="fill-foreground" />
            <text x={C} y={C + 4} textAnchor="middle" className="fill-background text-[12px] font-sans font-medium">
              {name(centerId).length > 9 ? `${name(centerId).slice(0, 8)}…` : name(centerId)}
            </text>
          </g>
        </svg>
        <p className="text-xs text-foreground/45 text-center mt-1">
          Thicker lines mean they’re named together in more verses. Tap someone to move them to the centre; tap the centre for their profile.
        </p>
      </div>

      <div>
        {profile ? (
          <PersonCard id={centerId} onSelectPerson={id => setCenter(id)} onGoTo={onOpen} onClose={() => setProfile(false)} />
        ) : (
          <div className="rounded-2xl border border-border/30 px-4 py-3.5">
            <p className="font-serif text-lg text-foreground/90">{name(centerId)}</p>
            <p className="text-xs text-foreground/50 mb-2">Most often named alongside</p>
            <ol className="space-y-1">
              {(web[centerId] ?? []).slice(0, 12).map(([id, count]) => (
                <li key={id} className="flex justify-between text-sm">
                  <button type="button" onClick={() => setCenter(id)} className="text-foreground/75 hover:text-foreground hover:underline">
                    {name(id)}
                  </button>
                  <span className="text-foreground/40 tabular-nums">{count}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => setProfile(true)} className="mt-3 text-xs text-foreground/55 hover:text-foreground">
              Open profile →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
