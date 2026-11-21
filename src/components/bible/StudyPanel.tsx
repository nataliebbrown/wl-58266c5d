import { useEffect, useRef, useState, type ReactNode } from 'react';
import { NotebookText, Link2, Asterisk, Map as MapIcon, Sparkles, ChevronDown, ArrowUpRight, Loader2, X, BookOpenCheck, Languages } from 'lucide-react';
import { OriginalPanel } from '@/components/original/OriginalPanel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { OriginalWord } from '@/lib/originalLanguage';
import { ChapterMap } from './ChapterMap';
import { fetchPassage, type BibleReference } from '@/lib/bibleApi';
import {
  type ChapterNotes,
  type CommentarySource,
  type CrossRef,
  type Footnote,
  type VerseCrossRefs,
  COMMENTARY_SOURCES,
  crossRefToReference,
  fetchBookIntroduction,
  fetchChapterNotes,
  fetchCrossRefs,
  fetchFootnotes,
} from '@/lib/studyResources';

export type StudyTab = 'notes' | 'crossrefs' | 'footnotes' | 'original' | 'places' | 'sophia';

interface StudyPanelProps {
  book: string;
  chapter: number;
  /** Verse the reader last tapped; notes and cross-refs scroll to it */
  focusVerse: number | null;
  tab: StudyTab;
  onTabChange: (tab: StudyTab) => void;
  /** Open a reference in the reader */
  onGoToReference: (ref: BibleReference) => void;
  /** Start a guided study of this chapter */
  onStartStudy?: () => void;
  /** Rendered in the Sophia tab (omit to hide the tab, e.g. on mobile) */
  sophia?: ReactNode;
  /** Ask Sophia a question (e.g. "Why do these translations differ?") */
  onAskSophia?: (prompt: string) => void;
  /** Start a word study of an original-language word */
  onStudyWord?: (word: OriginalWord, verse: number) => void;
  onClose?: () => void;
}

const TABS: { id: StudyTab; label: string; icon: typeof NotebookText }[] = [
  { id: 'notes', label: 'Notes', icon: NotebookText },
  { id: 'crossrefs', label: 'Cross-refs', icon: Link2 },
  { id: 'footnotes', label: 'Footnotes', icon: Asterisk },
  { id: 'original', label: 'Original', icon: Languages },
  { id: 'places', label: 'Places', icon: MapIcon },
  { id: 'sophia', label: 'Sophia', icon: Sparkles },
];

// Small hook: load async data keyed by deps, with loading + error state
function useAsync<T>(load: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: boolean }>({
    data: null,
    loading: true,
    error: false,
  });
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: false });
    load()
      .then(data => !cancelled && setState({ data, loading: false, error: false }))
      .catch(() => !cancelled && setState({ data: null, loading: false, error: true }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export function StudyPanel({
  book,
  chapter,
  focusVerse,
  tab,
  onTabChange,
  onGoToReference,
  onStartStudy,
  sophia,
  onAskSophia,
  onStudyWord,
  onClose,
}: StudyPanelProps) {
  const tabs = sophia ? TABS : TABS.filter(t => t.id !== 'sophia');

  return (
    <div className="h-full flex flex-col font-sans bg-background">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-border/30">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/40">Study</p>
            <p className="font-serif text-base text-foreground/90 truncate">
              {book} {chapter}
              {focusVerse ? <span className="text-foreground/45"> · v. {focusVerse}</span> : null}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onStartStudy && (
              <button
                type="button"
                onClick={onStartStudy}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                Study this passage
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/[0.05]"
                aria-label="Close study panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {/* Selected tab shows icon + name; the others show just the icon, with the name on hover */}
        <div className="flex items-center gap-1 -mx-1" role="tablist">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            if (active) {
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected
                  onClick={() => onTabChange(t.id)}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground/[0.08] px-3 h-8 text-xs text-foreground"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {t.label}
                </button>
              );
            }
            return (
              <Tooltip key={t.id} delayDuration={150}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={false}
                    aria-label={t.label}
                    onClick={() => onTabChange(t.id)}
                    className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full text-foreground/50 hover:text-foreground/85 hover:bg-foreground/[0.05] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {t.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Body */}
      {tab === 'sophia' && sophia ? (
        <div className="flex-1 min-h-0">{sophia}</div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
          {tab === 'notes' && <NotesTab book={book} chapter={chapter} focusVerse={focusVerse} />}
          {tab === 'crossrefs' && (
            <CrossRefsTab book={book} chapter={chapter} focusVerse={focusVerse} onGoToReference={onGoToReference} />
          )}
          {tab === 'footnotes' && <FootnotesTab book={book} chapter={chapter} focusVerse={focusVerse} />}
          {tab === 'original' && (
            <OriginalPanel
              book={book}
              chapter={chapter}
              verse={focusVerse}
              onGoTo={onGoToReference}
              onAskSophia={onAskSophia}
              onStudyWord={onStudyWord}
            />
          )}
          {tab === 'places' && (
            <ChapterMap
              book={book}
              chapter={chapter}
              onGoToVerse={(ch, v) => onGoToReference({ book, chapter: ch, verse: v })}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ============ Shared pieces ============

function Loading() {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/45 py-6 justify-center">
      <Loader2 className="w-4 h-4 animate-spin" /> Loading…
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-foreground/50 py-4">{children}</p>;
}

function ErrorNote() {
  return <p className="text-sm text-foreground/50 py-4">This couldn&rsquo;t be loaded. Check your connection and try again.</p>;
}

function Credit({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[11px] leading-relaxed text-foreground/35">{children}</p>;
}

/** Scroll the focused verse's block into view when it changes. */
function useScrollToVerse(focusVerse: number | null, ready: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ready || !focusVerse || !containerRef.current) return;
    // Find the last block that starts at or before the focused verse
    const blocks = Array.from(containerRef.current.querySelectorAll<HTMLElement>('[data-note-verse]'));
    const target = blocks.filter(b => Number(b.dataset.noteVerse) <= focusVerse).pop();
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [focusVerse, ready]);
  return containerRef;
}

/** Which block "covers" the focused verse: the last one starting at or before it. */
function coveringVerse(starts: number[], focusVerse: number | null): number | null {
  if (!focusVerse) return null;
  const before = starts.filter(v => v <= focusVerse);
  return before.length ? before[before.length - 1] : null;
}

// ============ Notes ============

function NotesTab({ book, chapter, focusVerse }: { book: string; chapter: number; focusVerse: number | null }) {
  const [source, setSource] = useState<CommentarySource>('tyndale');
  const [introOpen, setIntroOpen] = useState(false);
  const notes = useAsync<ChapterNotes>(() => fetchChapterNotes(book, chapter, source), [book, chapter, source]);
  const intro = useAsync<string | undefined>(() => fetchBookIntroduction(book), [book]);
  const containerRef = useScrollToVerse(focusVerse, !notes.loading);
  const active = coveringVerse(notes.data?.notes.map(n => n.verse) ?? [], focusVerse);

  return (
    <div ref={containerRef}>
      <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs mb-4">
        {COMMENTARY_SOURCES.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSource(s.id)}
            className={`rounded-full px-3 py-1 transition-colors ${
              source === s.id ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {source === 'tyndale' && intro.data && (
        <div className="mb-5 rounded-xl border border-border/40 bg-foreground/[0.02]">
          <button
            type="button"
            onClick={() => setIntroOpen(o => !o)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-foreground/75"
          >
            About {book}
            <ChevronDown className={`w-4 h-4 transition-transform ${introOpen ? 'rotate-180' : ''}`} />
          </button>
          {introOpen && (
            <p className="px-3.5 pb-3.5 text-sm leading-relaxed text-foreground/65 whitespace-pre-line">{intro.data}</p>
          )}
        </div>
      )}

      {notes.loading && <Loading />}
      {notes.error && <ErrorNote />}
      {notes.data && notes.data.introduction && (
        <p className="mb-5 text-sm leading-relaxed text-foreground/65 italic">{notes.data.introduction}</p>
      )}
      {notes.data && notes.data.notes.length === 0 && <Empty>No notes for this chapter.</Empty>}
      {notes.data && notes.data.notes.length > 0 && (
        <div className="space-y-4">
          {notes.data.notes.map(n => (
            <NoteBlock key={`${source}-${n.verse}`} verse={n.verse} paragraphs={n.paragraphs} active={active === n.verse} long={source === 'matthew-henry'} />
          ))}
        </div>
      )}
      <Credit>{COMMENTARY_SOURCES.find(s => s.id === source)?.credit} · via the Free Use Bible API</Credit>
    </div>
  );
}

function NoteBlock({ verse, paragraphs, active, long }: { verse: number; paragraphs: string[]; active: boolean; long: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const clamp = long && !expanded && paragraphs.join(' ').length > 600;
  const shown = clamp ? paragraphs.slice(0, 2) : paragraphs;
  return (
    <div
      data-note-verse={verse}
      className={`rounded-xl px-3 py-2.5 -mx-3 transition-colors scroll-mt-2 ${active ? 'bg-hl-green/10' : ''}`}
    >
      <p className="text-xs font-medium text-foreground/45 mb-1">v. {verse}</p>
      <div className="space-y-2">
        {shown.map((p, i) => {
          // Sub-notes start with their own reference, e.g. "3:16-21 might be…"
          const m = p.match(/^(\d+:\d+(?:-\d+)?)\s+(.*)$/s);
          return (
            <p key={i} className="text-sm leading-relaxed text-foreground/75">
              {m ? (
                <>
                  <span className="font-medium text-foreground/55">{m[1].replace('-', '–')}</span> {m[2]}
                </>
              ) : (
                p
              )}
            </p>
          );
        })}
      </div>
      {clamp && (
        <button type="button" onClick={() => setExpanded(true)} className="mt-1.5 text-xs text-foreground/50 hover:text-foreground/80 underline underline-offset-2">
          Read more
        </button>
      )}
    </div>
  );
}

// ============ Cross-references ============

function CrossRefsTab({
  book,
  chapter,
  focusVerse,
  onGoToReference,
}: {
  book: string;
  chapter: number;
  focusVerse: number | null;
  onGoToReference: (ref: BibleReference) => void;
}) {
  const refs = useAsync<VerseCrossRefs[]>(() => fetchCrossRefs(book, chapter), [book, chapter]);
  const containerRef = useScrollToVerse(focusVerse, !refs.loading);

  return (
    <div ref={containerRef}>
      {!focusVerse && <p className="text-xs text-foreground/45 mb-4">Tap a verse in the text to jump to its cross-references.</p>}
      {refs.loading && <Loading />}
      {refs.error && <ErrorNote />}
      {refs.data && refs.data.length === 0 && <Empty>No cross-references for this chapter.</Empty>}
      {refs.data && refs.data.length > 0 && (
        <div className="space-y-4">
          {refs.data.map(v => (
            <div
              key={v.verse}
              data-note-verse={v.verse}
              className={`rounded-xl px-3 py-2.5 -mx-3 transition-colors scroll-mt-2 ${focusVerse === v.verse ? 'bg-hl-green/10' : ''}`}
            >
              <p className="text-xs font-medium text-foreground/45 mb-1.5">v. {v.verse}</p>
              <div className="space-y-2">
                {v.groups.map((g, i) => (
                  <div key={i}>
                    {g.keyword && <p className="text-xs italic text-foreground/55 mb-1">{g.keyword}</p>}
                    <CrossRefChips refs={g.refs} onGoToReference={onGoToReference} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Credit>Treasury of Scripture Knowledge (public domain) · via the Free Use Bible API</Credit>
    </div>
  );
}

function CrossRefChips({ refs, onGoToReference }: { refs: CrossRef[]; onGoToReference: (ref: BibleReference) => void }) {
  const [open, setOpen] = useState<CrossRef | null>(null);
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {refs.map((r, i) => {
          const isOpen = open === r;
          return (
            <button
              key={`${r.label}-${i}`}
              type="button"
              onClick={() => setOpen(isOpen ? null : r)}
              className={`rounded-full border px-2 py-0.5 text-[11px] transition-colors ${
                isOpen
                  ? 'border-foreground/40 bg-foreground/[0.06] text-foreground'
                  : 'border-border/50 text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04]'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
      {open && <RefPreview ref_={open} onOpen={() => onGoToReference(crossRefToReference(open))} />}
    </div>
  );
}

function RefPreview({ ref_, onOpen }: { ref_: CrossRef; onOpen: () => void }) {
  const passage = useAsync(() => fetchPassage({ book: ref_.book, chapter: ref_.chapter }), [ref_.book, ref_.chapter]);
  const verses = passage.data?.verses.filter(v =>
    ref_.verse === undefined ? v.number <= 3 : v.number >= ref_.verse && v.number <= (ref_.endVerse ?? ref_.verse)
  );
  return (
    <div className="mt-2 rounded-xl border border-border/40 bg-card/60 px-3 py-2.5">
      {passage.loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground/40" />}
      {passage.error && <p className="text-xs text-foreground/50">Couldn&rsquo;t load this passage.</p>}
      {verses && (
        <p className="font-serif text-sm leading-relaxed text-foreground/80">
          {verses.map(v => (
            <span key={v.number}>
              <sup className="text-[9px] text-foreground/40 mr-0.5">{v.number}</sup>
              {v.text}{' '}
            </span>
          ))}
          {ref_.verse === undefined && '…'}
        </p>
      )}
      <button type="button" onClick={onOpen} className="mt-1.5 inline-flex items-center gap-1 text-xs text-foreground/55 hover:text-foreground">
        Open {ref_.label} <ArrowUpRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ============ Footnotes ============

function FootnotesTab({ book, chapter, focusVerse }: { book: string; chapter: number; focusVerse: number | null }) {
  const notes = useAsync<Footnote[]>(() => fetchFootnotes(book, chapter), [book, chapter]);
  const containerRef = useScrollToVerse(focusVerse, !notes.loading);
  return (
    <div ref={containerRef}>
      {notes.loading && <Loading />}
      {notes.error && <ErrorNote />}
      {notes.data && notes.data.length === 0 && <Empty>No footnotes for this chapter.</Empty>}
      {notes.data && notes.data.length > 0 && (
        <ul className="space-y-2.5">
          {notes.data.map((f, i) => (
            <li
              key={i}
              data-note-verse={f.verse}
              className={`rounded-lg px-3 py-2 -mx-3 text-sm leading-relaxed transition-colors scroll-mt-2 ${focusVerse === f.verse ? 'bg-hl-green/10' : ''}`}
            >
              <span className="text-xs font-medium text-foreground/45 mr-2">v. {f.verse}</span>
              <span className="text-foreground/75">{f.text}</span>
            </li>
          ))}
        </ul>
      )}
      <Credit>Translation footnotes from the Berean Standard Bible (public domain) · via the Free Use Bible API</Credit>
    </div>
  );
}
