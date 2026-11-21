import { useEffect, useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { ExternalLink, MapPin, Minus, Plus } from 'lucide-react';
import {
  type Basemap,
  type ChapterPlace,
  CONFIDENCE_LABELS,
  GEO_ATTRIBUTION,
  confidenceLevel,
  getBookPlaces,
  getChapterPlaces,
  loadBasemap,
} from '@/lib/bibleGeo';
import { useDarkMode } from '@/components/layout/DarkModeContext';

interface ChapterMapProps {
  book: string;
  chapter: number;
  /** Jump the reader to a verse */
  onGoToVerse: (chapter: number, verse: number) => void;
}

type Scope = 'chapter' | 'book';

const W = 600;
const H = 400;
const PAD = 36;
// Smallest area shown (degrees), so a single town isn't zoomed to street level
const MIN_SPAN = { normal: 2.4, wide: 14 };
const MAX_LABELS = 10;

const LIGHT = {
  sea: '#D9E1E0',
  land: '#F6F1E8',
  coast: '#C9BBA3',
  river: '#9DB3BC',
  marker: '#8A7356',
  selected: '#6F8F55',
  halo: '#F6F1E8',
  label: '#3D3427',
};

const DARK: typeof LIGHT = {
  sea: '#172022',
  land: '#3A3A30',
  coast: '#5A5848',
  river: '#4F6670',
  marker: '#C5B49B',
  selected: '#9BBF7E',
  halo: '#3A3A30',
  label: '#EDE6D8',
};

type Palette = typeof LIGHT;

// ---- Label placement: greedy, avoids overlapping labels & markers ----

interface LabelPos {
  x: number;
  y: number;
  anchor: 'start' | 'end' | 'middle';
}

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

function placeLabels(
  items: { id: string; name: string; x: number; y: number; force: boolean }[],
  markers: [number, number][]
): Map<string, LabelPos> {
  const placed: Box[] = markers.map(([x, y]) => ({ x0: x - 5, y0: y - 5, x1: x + 5, y1: y + 5 }));
  const result = new Map<string, LabelPos>();
  for (const it of items) {
    const w = it.name.length * 6.6 + 4;
    const h = 14;
    const candidates: { pos: LabelPos; box: Box }[] = [
      { pos: { x: it.x + 8, y: it.y + 4, anchor: 'start' }, box: { x0: it.x + 7, y0: it.y - 8, x1: it.x + 7 + w, y1: it.y - 8 + h } },
      { pos: { x: it.x - 8, y: it.y + 4, anchor: 'end' }, box: { x0: it.x - 7 - w, y0: it.y - 8, x1: it.x - 7, y1: it.y - 8 + h } },
      { pos: { x: it.x, y: it.y - 9, anchor: 'middle' }, box: { x0: it.x - w / 2, y0: it.y - 21, x1: it.x + w / 2, y1: it.y - 7 } },
      { pos: { x: it.x, y: it.y + 17, anchor: 'middle' }, box: { x0: it.x - w / 2, y0: it.y + 6, x1: it.x + w / 2, y1: it.y + 20 } },
    ];
    // A marker's own box shouldn't block its label
    const others = placed.filter(b => !(b.x0 === it.x - 5 && b.y0 === it.y - 5));
    const inBounds = (b: Box) => b.x0 >= 2 && b.y0 >= 2 && b.x1 <= W - 2 && b.y1 <= H - 2;
    const fit = candidates.find(c => inBounds(c.box) && !others.some(o => overlaps(c.box, o)));
    const chosen = fit ?? (it.force ? candidates.find(c => inBounds(c.box)) ?? candidates[0] : null);
    if (chosen) {
      placed.push(chosen.box);
      result.set(it.id, chosen.pos);
    }
  }
  return result;
}

function prettyType(type: string): string {
  if (type === 'body of water') return 'Body of water';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function ChapterMap({ book, chapter, onGoToVerse }: ChapterMapProps) {
  const isDarkMode = useDarkMode();
  const COLORS: Palette = isDarkMode ? DARK : LIGHT;
  const [scope, setScope] = useState<Scope>('chapter');
  const [wide, setWide] = useState(false);
  const [basemap, setBasemap] = useState<Basemap | null>(null);
  const [places, setPlaces] = useState<ChapterPlace[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadBasemap().then(setBasemap).catch(() => setError('The map couldn’t be loaded.'));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setPlaces(null);
    setSelectedId(null);
    const load = scope === 'chapter' ? getChapterPlaces(book, chapter) : getBookPlaces(book);
    load
      .then(p => !cancelled && setPlaces(p))
      .catch(() => !cancelled && setError('Places couldn’t be loaded.'));
    return () => {
      cancelled = true;
    };
  }, [book, chapter, scope]);

  // Fit the projection around the places (or the Holy Land when there are none)
  const projection = useMemo(() => {
    const pts = places?.length ? places.map(p => [p.lon, p.lat] as [number, number]) : [[35.2, 31.8] as [number, number]];
    const lons = pts.map(p => p[0]);
    const lats = pts.map(p => p[1]);
    const minSpan = wide ? MIN_SPAN.wide : MIN_SPAN.normal;
    const cx = (Math.min(...lons) + Math.max(...lons)) / 2;
    const cy = (Math.min(...lats) + Math.max(...lats)) / 2;
    const spanLon = Math.max(Math.max(...lons) - Math.min(...lons), minSpan);
    const spanLat = Math.max(Math.max(...lats) - Math.min(...lats), minSpan * 0.66);
    return geoMercator().fitExtent(
      [
        [PAD, PAD],
        [W - PAD, H - PAD],
      ],
      {
        type: 'MultiPoint',
        coordinates: [
          [cx - spanLon / 2, cy - spanLat / 2],
          [cx + spanLon / 2, cy + spanLat / 2],
        ],
      }
    );
  }, [places, wide]);

  const paths = useMemo(() => {
    if (!basemap) return null;
    const path = geoPath(projection);
    return {
      land: path(basemap.land) ?? '',
      lakes: path(basemap.lakes) ?? '',
      rivers: path(basemap.rivers) ?? '',
    };
  }, [basemap, projection]);

  // Label the most-mentioned places (selected/hovered always win), skipping
  // any label that would collide with another
  const labels = useMemo(() => {
    if (!places) return new Map<string, LabelPos>();
    const projected = places
      .map(p => ({ p, xy: projection([p.lon, p.lat]) }))
      .filter((d): d is { p: ChapterPlace; xy: [number, number] } => !!d.xy);
    const priority = (id: string) => (id === selectedId ? 0 : id === hoveredId ? 1 : 2);
    const ranked = [...projected]
      .sort((a, b) => priority(a.p.id) - priority(b.p.id) || b.p.verses.length - a.p.verses.length)
      .filter((d, i) => priority(d.p.id) < 2 || i < MAX_LABELS + 2);
    return placeLabels(
      ranked.map(({ p, xy }) => ({ id: p.id, name: p.name, x: xy[0], y: xy[1], force: priority(p.id) < 2 })),
      projected.map(d => d.xy)
    );
  }, [places, projection, selectedId, hoveredId]);

  const selected = places?.find(p => p.id === selectedId) ?? null;
  const loading = !places || !paths;

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Scope toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-full border border-border/50 p-0.5 text-sm">
          {(['chapter', 'book'] as Scope[]).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setScope(s)}
              className={`rounded-full px-3 py-1 transition-colors ${
                scope === s ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'
              }`}
            >
              {s === 'chapter' ? `${book} ${chapter}` : `All of ${book}`}
            </button>
          ))}
        </div>
        {places && places.length > 0 && (
          <span className="text-xs text-foreground/45">
            {places.length} {places.length === 1 ? 'place' : 'places'}
          </span>
        )}
      </div>

      {/* Map */}
      <div className="relative overflow-hidden rounded-2xl border border-border/40" style={{ background: COLORS.sea }}>
        {error ? (
          <div className="aspect-[3/2] flex items-center justify-center text-sm text-foreground/50">{error}</div>
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className={`block w-full h-auto transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}
            role="img"
            aria-label={`Map of places in ${scope === 'chapter' ? `${book} ${chapter}` : book}`}
          >
            {paths && (
              <g>
                <path d={paths.land} fill={COLORS.land} stroke={COLORS.coast} strokeWidth={0.75} />
                <path d={paths.lakes} fill={COLORS.sea} stroke={COLORS.coast} strokeWidth={0.5} />
                <path d={paths.rivers} fill="none" stroke={COLORS.river} strokeWidth={1} />
              </g>
            )}

            {places?.map(place => {
              const xy = projection([place.lon, place.lat]);
              if (!xy) return null;
              const [x, y] = xy;
              const level = confidenceLevel(place.confidence);
              const isSelected = place.id === selectedId;
              const isHovered = place.id === hoveredId;
              const isRegion = place.type === 'region';
              const label = labels.get(place.id);
              return (
                <g
                  key={place.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${place.name}, ${CONFIDENCE_LABELS[level].toLowerCase()}`}
                  className="cursor-pointer outline-none"
                  onClick={() => setSelectedId(isSelected ? null : place.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(isSelected ? null : place.id);
                    }
                  }}
                  onMouseEnter={() => setHoveredId(place.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Larger invisible hit area for touch */}
                  <circle cx={x} cy={y} r={12} fill="transparent" />
                  {isSelected && <circle cx={x} cy={y} r={10} fill="none" stroke={COLORS.selected} strokeWidth={2} />}
                  {isRegion ? (
                    <circle cx={x} cy={y} r={2.5} fill={COLORS.marker} opacity={0.5} />
                  ) : level === 'uncertain' ? (
                    <circle cx={x} cy={y} r={4.5} fill={COLORS.land} stroke={COLORS.marker} strokeWidth={1.5} strokeDasharray="2 1.5" />
                  ) : (
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected || isHovered ? 6 : 4.5}
                      fill={isSelected ? COLORS.selected : COLORS.marker}
                      opacity={level === 'likely' ? 0.75 : 1}
                      stroke={COLORS.land}
                      strokeWidth={1.25}
                    />
                  )}
                  {label && (
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor={label.anchor}
                      fontSize={isRegion ? 12 : 12.5}
                      fontStyle={isRegion ? 'italic' : undefined}
                      fill={COLORS.label}
                      stroke={COLORS.halo}
                      strokeWidth={3.5}
                      paintOrder="stroke"
                      strokeLinejoin="round"
                      className="pointer-events-none select-none"
                    >
                      {place.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Zoom */}
        <div className="absolute right-2 top-2 flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card/90 backdrop-blur">
          <button
            type="button"
            onClick={() => setWide(false)}
            disabled={!wide}
            className="h-7 w-7 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30"
            aria-label="Zoom in to the places"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <div className="h-px bg-border/50" />
          <button
            type="button"
            onClick={() => setWide(true)}
            disabled={wide}
            className="h-7 w-7 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30"
            aria-label="Zoom out to the wider region"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-foreground/45 -mt-1">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS.marker }} />
          Confident / likely location
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-dashed" style={{ borderColor: COLORS.marker }} />
          Uncertain location
        </span>
      </div>

      {/* Selected place */}
      {selected && (
        <div className="rounded-2xl border border-border/40 bg-foreground/[0.025] px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg text-foreground/90 leading-tight">{selected.name}</p>
              <p className="text-xs text-foreground/45 mt-0.5">
                {prettyType(selected.type)} · {CONFIDENCE_LABELS[confidenceLevel(selected.confidence)]}
              </p>
            </div>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-xs text-foreground/45 hover:text-foreground/80"
            >
              OpenBible.info <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {selected.description && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{selected.description}</p>
              <p className="mt-1.5 text-[11px] text-foreground/35">Easton&rsquo;s Bible Dictionary (1897)</p>
            </>
          )}
          <VerseChips place={selected} scope={scope} onGoToVerse={onGoToVerse} />
        </div>
      )}

      {/* Place list */}
      {places && places.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/50 px-4 py-5 text-sm text-foreground/50 flex items-start gap-3">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-foreground/35" />
          <div>
            No mapped places are mentioned in {scope === 'chapter' ? `${book} ${chapter}` : book}.
            {scope === 'chapter' && (
              <button type="button" onClick={() => setScope('book')} className="block mt-1 text-foreground/75 hover:text-foreground underline underline-offset-2">
                See places across all of {book}
              </button>
            )}
          </div>
        </div>
      )}
      {places && places.length > 0 && (
        <ul className="divide-y divide-border/30 -mx-1">
          {places.map(place => {
            const level = confidenceLevel(place.confidence);
            const isSelected = place.id === selectedId;
            return (
              <li key={place.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : place.id)}
                  onMouseEnter={() => setHoveredId(place.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full text-left px-2 py-2.5 rounded-lg flex items-baseline justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-foreground/[0.05]' : 'hover:bg-foreground/[0.03]'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="text-sm text-foreground/85">{place.name}</span>
                    <span className="ml-2 text-xs text-foreground/40">
                      {prettyType(place.type)}
                      {level === 'uncertain' ? ' · uncertain' : ''}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-foreground/40">
                    {scope === 'chapter'
                      ? `v. ${place.verses.slice(0, 4).join(', ')}${place.verses.length > 4 ? '…' : ''}`
                      : `ch. ${place.chapter}`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Attribution */}
      <p className="text-[11px] leading-relaxed text-foreground/35">
        Places:{' '}
        <a href={GEO_ATTRIBUTION.places.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/60">
          {GEO_ATTRIBUTION.places.label}
        </a>{' '}
        ({GEO_ATTRIBUTION.places.license}) · Descriptions:{' '}
        <a href={GEO_ATTRIBUTION.descriptions.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/60">
          {GEO_ATTRIBUTION.descriptions.label}
        </a>{' '}
        ({GEO_ATTRIBUTION.descriptions.license}) · Map:{' '}
        <a href={GEO_ATTRIBUTION.basemap.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/60">
          {GEO_ATTRIBUTION.basemap.label}
        </a>
      </p>
    </div>
  );
}

function VerseChips({
  place,
  scope,
  onGoToVerse,
}: {
  place: ChapterPlace;
  scope: Scope;
  onGoToVerse: (chapter: number, verse: number) => void;
}) {
  const verses = place.verses.slice(0, 12);
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-foreground/45 mr-0.5">{scope === 'book' ? 'First mentioned' : 'Mentioned in'}</span>
      {verses.map(v => (
        <button
          key={v}
          type="button"
          onClick={() => onGoToVerse(place.chapter, v)}
          className="rounded-full border border-border/50 px-2.5 py-0.5 text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
        >
          {scope === 'book' ? `${place.chapter}:${v}` : `v. ${v}`}
        </button>
      ))}
      {place.verses.length > verses.length && <span className="text-xs text-foreground/40">…</span>}
    </div>
  );
}
