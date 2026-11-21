import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { ChapterMap } from '@/components/bible/ChapterMap';
import { WORLD_EVENTS, WORLD_POWERS, eraForChapter, type DateSystem } from '@/lib/timewalk/eras';
import { findsForChapter } from '@/lib/timewalk/archaeology';
import { topicsForChapter } from '@/lib/timewalk/dailyLife';
import {
  eventDates,
  getChapterSetting,
  getEventsById,
  getFindImages,
  getPeopleById,
  type ChapterSetting,
  type Photo,
  type PersonSummary,
  type TimelineEvent,
} from '@/lib/timewalk/data';
import { CaveatNote } from './CaveatNote';
import { DateToggle } from './DateToggle';
import { FindCard } from './FindCard';
import { LifeCard } from './LifeCard';
import { ArtFigure } from './ArtGallery';
import { useArt } from './useArt';
import { PersonCard } from './PersonCard';
import { useDateSystem, useDraftPreview } from './useDateSystem';

type View = 'when' | 'who' | 'where' | 'finds' | 'life';

interface SettingPanelProps {
  book: string;
  chapter: number;
  onGoToReference: (ref: BibleReference) => void;
  onAskSophia?: (prompt: string) => void;
}

/** People who aren't shown as "people in this chapter" */
const HIDDEN_PEOPLE = /^(god|holy_spirit)_/;

/** TimeWalk for the chapter being read: when, who, where, archaeology, and daily life. */
export function SettingPanel({ book, chapter, onGoToReference, onAskSophia }: SettingPanelProps) {
  const [view, setView] = useState<View>('when');
  const [system, setSystem] = useDateSystem();
  const preview = useDraftPreview();
  const navigate = useNavigate();
  const era = eraForChapter(book, chapter);
  const label = `${book === 'Psalms' ? 'Psalm' : book} ${chapter}`;

  const views: [View, string][] = [
    ['when', 'When'],
    ['who', 'Who'],
    ['where', 'Where'],
    ['finds', 'Finds'],
    ['life', 'Life'],
  ];

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs" role="tablist">
          {views.map(([id, text]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`rounded-full px-2.5 py-1 transition-colors ${view === id ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              {text}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => navigate('/timewalk', { state: { eraId: era?.id } })} className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground">
          TimeWalk <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {view === 'when' && <WhenView book={book} chapter={chapter} system={system} onSystemChange={setSystem} onAskSophia={onAskSophia} label={label} />}
      {view === 'who' && <WhoView book={book} chapter={chapter} onGoTo={onGoToReference} />}
      {view === 'where' && <ChapterMap book={book} chapter={chapter} onGoToVerse={(ch, v) => onGoToReference({ book, chapter: ch, verse: v })} />}
      {view === 'finds' && <FindsView book={book} chapter={chapter} preview={preview} onGoTo={onGoToReference} />}
      {view === 'life' && (
        <div className="space-y-3">
          {topicsForChapter(book, era?.id, preview).map(t => (
            <LifeCard key={t.id} topic={t} onGoTo={onGoToReference} />
          ))}
          {topicsForChapter(book, era?.id, preview).length === 0 && (
            <p className="text-sm text-foreground/50">Daily-life notes for this part of the Bible are coming soon.</p>
          )}
          {onAskSophia && (
            <button
              type="button"
              onClick={() =>
                onAskSophia(`What was everyday life like for the people in ${label}? Help me picture their world — and what it shows me about God.`)
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/75 hover:bg-foreground/[0.04]"
            >
              <Sparkles className="w-3.5 h-3.5" /> What was life like here?
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============ When ============

function WhenView({
  book,
  chapter,
  system,
  onSystemChange,
  onAskSophia,
  label,
}: {
  book: string;
  chapter: number;
  system: DateSystem;
  onSystemChange: (s: DateSystem) => void;
  onAskSophia?: (prompt: string) => void;
  label: string;
}) {
  const era = eraForChapter(book, chapter);
  const [setting, setSetting] = useState<ChapterSetting | null | undefined>(undefined);
  const [events, setEvents] = useState<Map<string, TimelineEvent> | null>(null);
  const art = useArt();

  useEffect(() => {
    let cancelled = false;
    setSetting(undefined);
    getChapterSetting(book, chapter).then(s => !cancelled && setSetting(s));
    getEventsById().then(e => !cancelled && setEvents(e));
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  const world = useMemo(() => {
    if (!era?.range) return { powers: [], events: [] };
    const [from, to] = era.range;
    return {
      powers: WORLD_POWERS.filter(p => p.from <= to && p.to >= from),
      events: WORLD_EVENTS.filter(e => e.year >= from - 60 && e.year <= to + 20),
    };
  }, [era]);

  if (!era) return <p className="text-sm text-foreground/50">No historical setting for this chapter.</p>;

  const chapterEvents = (setting?.events ?? []).map(id => events?.get(id)).filter((e): e is TimelineEvent => !!e);
  const chapterArt = art.filter(a => a.ref?.book === book && a.ref.chapter === chapter);

  return (
    <div className="space-y-4">
      <DateToggle value={system} onChange={onSystemChange} />

      <div className="rounded-2xl border border-border/40 bg-foreground/[0.025] px-4 py-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">Era</p>
        <p className="font-serif text-xl text-foreground/90">{era.name}</p>
        <p className="text-sm text-foreground/75 mt-0.5">{system === 'scholarly' ? era.scholarly : era.traditional}</p>
        <p className="text-xs text-foreground/45">{system === 'scholarly' ? `Traditional: ${era.traditional}` : `Scholarly: ${era.scholarly}`}</p>
        <p className="text-sm leading-relaxed text-foreground/70 mt-3">{era.summary}</p>
        <p className="mt-3 rounded-xl bg-hl-green/[0.08] border border-hl-green/25 px-3 py-2.5 text-sm leading-relaxed text-foreground/85">
          <span className="block text-[10.5px] uppercase tracking-[0.15em] text-foreground/50 mb-0.5">What God was doing</span>
          {era.godAtWork}
        </p>
      </div>

      {chapterArt.map(a => (
        <ArtFigure key={a.id} art={a} />
      ))}

      {era.caveats.length > 0 && (
        <div className="space-y-2">
          {era.caveats.map(c => (
            <CaveatNote key={c} id={c} />
          ))}
        </div>
      )}

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2">In {label}</p>
        {setting === undefined || !events ? (
          <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
        ) : chapterEvents.length === 0 ? (
          <p className="text-sm text-foreground/50">No dated events are tied to this chapter.</p>
        ) : (
          <ul className="space-y-2">
            {chapterEvents.map(e => {
              const d = eventDates(e, system);
              return (
                <li key={e.id} className="rounded-xl border border-border/30 px-3.5 py-2.5">
                  <p className="text-sm text-foreground/85">{e.title}</p>
                  <p className="text-xs text-foreground/55">{d.primary}</p>
                  {d.secondary && <p className="text-[11px] text-foreground/40">{d.secondary}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {(world.powers.length > 0 || world.events.length > 0) && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2">The wider world</p>
          <p className="text-sm text-foreground/70 mb-2">
            <span className="text-foreground/50">Ruling power:</span> {era.empire}
          </p>
          {world.events.length > 0 && (
            <ul className="space-y-1.5 text-sm text-foreground/65">
              {world.events.map(e => (
                <li key={e.label} className="flex gap-2">
                  <span className="text-foreground/30">•</span>
                  {e.label}
                </li>
              ))}
            </ul>
          )}
          <p className="text-[11px] text-foreground/40 mt-2">World dates are approximate scholarly dates.</p>
        </div>
      )}

      {onAskSophia && (
        <button
          type="button"
          onClick={() => onAskSophia(`What was happening in the world when ${label} took place, and how does that background help me understand what God was doing?`)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/75 hover:bg-foreground/[0.04]"
        >
          <Sparkles className="w-3.5 h-3.5" /> Tell me the historical background
        </button>
      )}
    </div>
  );
}

// ============ Who ============

function WhoView({ book, chapter, onGoTo }: { book: string; chapter: number; onGoTo: (r: BibleReference) => void }) {
  const [setting, setSetting] = useState<ChapterSetting | null | undefined>(undefined);
  const [people, setPeople] = useState<Map<string, PersonSummary> | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSetting(undefined);
    setSelected(null);
    getChapterSetting(book, chapter).then(s => !cancelled && setSetting(s));
    getPeopleById().then(p => !cancelled && setPeople(p));
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  if (setting === undefined || !people) return <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />;
  const list = (setting?.people ?? []).filter(([id]) => !HIDDEN_PEOPLE.test(id) && people.has(id));
  if (list.length === 0) return <p className="text-sm text-foreground/50">No named people in this chapter.</p>;

  return (
    <div className="space-y-3">
      {selected && <PersonCard id={selected} onSelectPerson={setSelected} onGoTo={onGoTo} onClose={() => setSelected(null)} />}
      <ul className="divide-y divide-border/30 rounded-2xl border border-border/30">
        {list.map(([id, verses]) => {
          const p = people.get(id)!;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => setSelected(id)}
                className={`w-full text-left px-4 py-2.5 flex items-baseline justify-between gap-3 hover:bg-foreground/[0.03] ${selected === id ? 'bg-foreground/[0.04]' : ''}`}
              >
                <span className="text-sm text-foreground/85">{p.title || p.name}</span>
                <span className="text-xs text-foreground/40 shrink-0">
                  {verses} {verses === 1 ? 'verse' : 'verses'} here
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ============ Finds ============

function FindsView({ book, chapter, preview, onGoTo }: { book: string; chapter: number; preview: boolean; onGoTo: (r: BibleReference) => void }) {
  const [images, setImages] = useState<Record<string, Photo>>({});
  useEffect(() => {
    getFindImages().then(setImages);
  }, []);
  const finds = findsForChapter(book, chapter, preview);
  if (finds.length === 0) return <p className="text-sm text-foreground/50">No archaeological finds are connected to this chapter yet.</p>;
  return (
    <div className="space-y-3">
      {finds.map(f => (
        <FindCard key={f.id} find={f} photo={images[f.id]} onGoTo={onGoTo} compact />
      ))}
    </div>
  );
}
