import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { geoMercator, geoPath } from 'd3-geo';
import { ExternalLink, MapPin, Maximize2, Minimize2, Minus, Plus, RotateCcw } from 'lucide-react';
import {
  type Basemap,
  type ChapterPlace,
  CONFIDENCE_LABELS,
  GEO_ATTRIBUTION,
  confidenceLevel,
  getBookPlaces,
  getChapterPlaces,
  loadBasemap,
  loadBasemapDetail,
} from '@/lib/bibleGeo';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { getPlacePhotos, type Photo } from '@/lib/timewalk/data';
import { PhotoCredit, PhotoThumb } from '@/components/timewalk/PhotoViewer';

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
const MIN_SPAN = 2.4;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 16;
const STEP = 1.6;

/** Pan/zoom applied on top of the fitted projection: screen = projected * k + (x, y) */
interface View {
  k: number;
  x: number;
  y: number;
}
const FIT: View = { k: 1, x: 0, y: 0 };
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
  const [view, setView] = useState<View>(FIT);
  const [expanded, setExpanded] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ moved: boolean; pinchDist?: number }>({ moved: false });
  const [basemap, setBasemap] = useState<Basemap | null>(null);
  const [detail, setDetail] = useState<Basemap | null>(null);
  const [photos, setPhotos] = useState<Record<string, Photo>>({});
  useEffect(() => {
    getPlacePhotos().then(setPhotos).catch(() => {});
  }, []);
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
    const minSpan = MIN_SPAN;
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
  }, [places]);

  // New places → fit the view again
  useEffect(() => setView(FIT), [places]);

  // Switch to high-detail coastlines once zoomed in
  const useDetail = view.k >= 2.5;
  useEffect(() => {
    if (useDetail && !detail) loadBasemapDetail().then(setDetail).catch(() => {});
  }, [useDetail, detail]);
  const activeMap = useDetail && detail ? detail : basemap;

  const paths = useMemo(() => {
    if (!activeMap) return null;
    const path = geoPath(projection);
    return {
      land: path(activeMap.land) ?? '',
      lakes: path(activeMap.lakes) ?? '',
      rivers: path(activeMap.rivers) ?? '',
    };
  }, [activeMap, projection]);

  // Label the most-mentioned places (selected/hovered always win), skipping
  // any label that would collide with another
  const labels = useMemo(() => {
    if (!places) return new Map<string, LabelPos>();
    const projected = places
      .map(p => {
        const xy = projection([p.lon, p.lat]);
        return { p, xy: xy ? ([xy[0] * view.k + view.x, xy[1] * view.k + view.y] as [number, number]) : null };
      })
      .filter((d): d is { p: ChapterPlace; xy: [number, number] } => !!d.xy && d.xy[0] > -20 && d.xy[0] < W + 20 && d.xy[1] > -20 && d.xy[1] < H + 20);
    const priority = (id: string) => (id === selectedId ? 0 : id === hoveredId ? 1 : 2);
    const ranked = [...projected]
      .sort((a, b) => priority(a.p.id) - priority(b.p.id) || b.p.verses.length - a.p.verses.length)
      .filter((d, i) => priority(d.p.id) < 2 || i < MAX_LABELS + 2);
    return placeLabels(
      ranked.map(({ p, xy }) => ({ id: p.id, name: p.name, x: xy[0], y: xy[1], force: priority(p.id) < 2 })),
      projected.map(d => d.xy)
    );
  }, [places, projection, selectedId, hoveredId, view]);

  // ---- Zoom & pan ----
  const clampK = (k: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k));
  /** Zoom by `factor`, keeping the point (cx, cy) in viewBox units fixed on screen. */
  const zoomAt = useCallback((factor: number, cx = W / 2, cy = H / 2) => {
    setView(v => {
      const k = clampK(v.k * factor);
      const f = k / v.k;
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
    });
  }, []);
  /** Where the +/- buttons zoom toward: the selected place, else the centre of the places */
  const focusPoint = (): [number, number] => {
    const pts = (selectedId ? places?.filter(p => p.id === selectedId) : places) ?? [];
    const xy = pts.map(p => projection([p.lon, p.lat])).filter((d): d is [number, number] => !!d);
    if (!xy.length) return [W / 2, H / 2];
    const px = xy.reduce((a, d) => a + d[0], 0) / xy.length;
    const py = xy.reduce((a, d) => a + d[1], 0) / xy.length;
    return [px * view.k + view.x, py * view.k + view.y];
  };
  /** Zoom with the buttons, gently drawing the focus point toward the centre */
  const zoomButton = (factor: number) => {
    const [fx, fy] = focusPoint();
    setView(v => {
      const k = clampK(v.k * factor);
      const f = k / v.k;
      // Keep the focus point fixed, then pull it halfway toward the middle of the map
      let x = fx - (fx - v.x) * f;
      let y = fy - (fy - v.y) * f;
      if (factor > 1) {
        x += (W / 2 - fx) * 0.5;
        y += (H / 2 - fy) * 0.5;
      }
      return { k, x, y };
    });
  };
  const toViewBox = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: ((clientX - rect.left) / rect.width) * W, y: ((clientY - rect.top) / rect.height) * H };
  };

  // Scroll-wheel zoom (needs a non-passive listener to stop the page scrolling)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = toViewBox(e.clientX, e.clientY);
      zoomAt(Math.exp(-e.deltaY * 0.0015), p.x, p.y);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  });

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, toViewBox(e.clientX, e.clientY));
    if (pointers.current.size === 1) gesture.current = { moved: false };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const next = toViewBox(e.clientX, e.clientY);
    pointers.current.set(e.pointerId, next);
    if (pointers.current.size === 1) {
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) gesture.current.moved = true;
      setView(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (pointers.current.size === 2 && gesture.current.pinchDist) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.moved = true;
      zoomAt(dist / gesture.current.pinchDist, (a.x + b.x) / 2, (a.y + b.y) / 2);
      gesture.current.pinchDist = dist;
    }
  };
  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current.pinchDist = undefined;
  };
  /** Ignore the click that ends a drag */
  const clickPlace = (id: string, isSelected: boolean) => {
    if (gesture.current.moved) return;
    setSelectedId(isSelected ? null : id);
  };

  // Esc closes the expanded map
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

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
      {(() => {
        const mapBlock = (
      <div className={`relative overflow-hidden rounded-2xl border border-border/40 ${expanded ? 'w-full max-w-[1400px]' : ''}`} style={{ background: COLORS.sea }}>
        {error ? (
          <div className="aspect-[3/2] flex items-center justify-center text-sm text-foreground/50">{error}</div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ touchAction: 'none' }}
            className={`block w-full h-auto cursor-grab active:cursor-grabbing select-none transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}
            role="img"
            aria-label={`Map of places in ${scope === 'chapter' ? `${book} ${chapter}` : book}`}
          >
            {paths && (
              <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                <path d={paths.land} fill={COLORS.land} stroke={COLORS.coast} strokeWidth={0.75} vectorEffect="non-scaling-stroke" />
                <path d={paths.lakes} fill={COLORS.sea} stroke={COLORS.coast} strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
                <path d={paths.rivers} fill="none" stroke={COLORS.river} strokeWidth={1} vectorEffect="non-scaling-stroke" />
              </g>
            )}

            {places?.map(place => {
              const xy = projection([place.lon, place.lat]);
              if (!xy) return null;
              const x = xy[0] * view.k + view.x;
              const y = xy[1] * view.k + view.y;
              if (x < -30 || x > W + 30 || y < -30 || y > H + 30) return null;
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
                  onClick={() => clickPlace(place.id, isSelected)}
                  onPointerDown={e => e.stopPropagation() /* let the svg handle drags only off markers */}
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

        {/* Zoom & expand */}
        <div className="absolute right-2 top-2 flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card/90 backdrop-blur">
          <button
            type="button"
            onClick={() => zoomButton(STEP)}
            disabled={view.k >= MAX_ZOOM}
            className="h-8 w-8 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-border/50" />
          <button
            type="button"
            onClick={() => zoomButton(1 / STEP)}
            disabled={view.k <= MIN_ZOOM}
            className="h-8 w-8 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-border/50" />
          <button
            type="button"
            onClick={() => setView(FIT)}
            disabled={view.k === 1 && view.x === 0 && view.y === 0}
            className="h-8 w-8 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30"
            aria-label="Reset view"
            title="Fit to places"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          className="absolute left-2 top-2 h-8 w-8 flex items-center justify-center rounded-lg border border-border/50 bg-card/90 backdrop-blur text-foreground/60 hover:text-foreground"
          aria-label={expanded ? 'Close full-screen map' : 'Expand map'}
          title={expanded ? 'Close full screen' : 'Full screen'}
        >
          {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <p className="pointer-events-none absolute left-2 bottom-1.5 text-[10px] text-foreground/40">Drag to move · scroll or pinch to zoom</p>
      </div>
        );
        return expanded
          ? createPortal(
              <div
                className={`fixed inset-0 z-[120] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-8 font-sans${isDarkMode ? ' dark' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Full-screen map"
                onClick={e => e.target === e.currentTarget && setExpanded(false)}
              >
                {mapBlock}
              </div>,
              document.body
            )
          : mapBlock;
      })()}

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
          {photos[selected.id] && (
            <div className="mb-3">
              <PhotoThumb photo={photos[selected.id]} aspect="aspect-[16/9]" />
              <PhotoCredit photo={photos[selected.id]} className="mt-1" />
            </div>
          )}
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
