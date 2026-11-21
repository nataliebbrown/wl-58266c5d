import { STEP_BOOK_CODES, bookFromStep } from '@/lib/originalLanguage';

/**
 * Distribution across the 66 books as thin single-hue bars (canonical order),
 * with the Old/New Testament split marked. Hover shows the book and count; tap selects.
 */
export function BookBars({
  counts,
  selected,
  onSelect,
  unit = 'verses',
}: {
  counts: Record<string, number>;
  selected?: string | null;
  onSelect?: (code: string | null) => void;
  unit?: string;
}) {
  const max = Math.max(1, ...Object.values(counts));
  const ntStart = STEP_BOOK_CODES.indexOf('Mat');
  return (
    <div>
      <div className="flex items-end gap-[2px] h-28" role="img" aria-label={`Distribution of ${unit} across the books of the Bible`}>
        {STEP_BOOK_CODES.map((code, i) => {
          const n = counts[code] ?? 0;
          const h = n ? Math.max(4, (n / max) * 100) : 0;
          const isSel = selected === code;
          return (
            <button
              key={code}
              type="button"
              disabled={!n}
              title={`${bookFromStep(code)}: ${n} ${unit}`}
              onClick={() => onSelect?.(isSel ? null : code)}
              className={`group relative flex-1 h-full flex items-end ${i === ntStart ? 'ml-1.5' : ''} ${n ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span
                className={`block w-full rounded-t-[3px] transition-colors ${
                  isSel ? 'bg-foreground' : selected ? 'bg-foreground/25 group-hover:bg-foreground/50' : 'bg-foreground/45 group-hover:bg-foreground/80'
                }`}
                style={{ height: `${h}%` }}
              />
            </button>
          );
        })}
      </div>
      <div className="flex text-[10px] text-foreground/40 mt-1 border-t border-border/30 pt-1">
        <span style={{ flex: ntStart }}>Old Testament</span>
        <span className="ml-1.5" style={{ flex: STEP_BOOK_CODES.length - ntStart }}>New Testament</span>
      </div>
    </div>
  );
}
