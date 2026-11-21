import type { BiblePassage } from '@/lib/bibleApi';

export type PassagePickMode = 'none' | 'verse' | 'word';

interface StudyPassageViewProps {
  passage: BiblePassage | null;
  title: string;
  loading: boolean;
  error: boolean;
  pickMode: PassagePickMode;
  selectedVerse?: number;
  /** Word study: highlight every occurrence of this word */
  highlightWord?: string;
  onPickVerse?: (verse: number, text: string) => void;
  onPickWord?: (word: string, verse: number, index: number) => void;
}

/** Strip punctuation around a tapped word: “loved,” -> loved */
function cleanWord(raw: string): string {
  return raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
}

export function StudyPassageView({
  passage,
  title,
  loading,
  error,
  pickMode,
  selectedVerse,
  highlightWord,
  onPickVerse,
  onPickWord,
}: StudyPassageViewProps) {
  return (
    <div className="font-serif">
      <h2 className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/45 mb-4">{title}</h2>
      {loading && <p className="font-sans text-sm text-foreground/45">Loading passage…</p>}
      {error && <p className="font-sans text-sm text-foreground/50">The passage couldn’t be loaded. Check your connection and try again.</p>}
      {passage && (
        <div className="text-[17px] leading-8 text-foreground/85">
          {passage.verses.map(v => {
            const isSelected = selectedVerse === v.number;
            if (pickMode === 'word') {
              const words = v.text.split(/\s+/).filter(Boolean);
              return (
                <span key={v.number}>
                  <sup className="font-sans text-[10px] text-foreground/40 mr-0.5">{v.number}</sup>
                  {words.map((w, i) => {
                    const clean = cleanWord(w);
                    const chosen = !!highlightWord && clean.toLowerCase() === highlightWord.toLowerCase();
                    return (
                      <span key={i}>
                        <button
                          type="button"
                          disabled={!clean}
                          onClick={() => clean && onPickWord?.(clean, v.number, i)}
                          className={`rounded px-0.5 -mx-0.5 transition-colors ${
                            chosen ? 'bg-hl-green/25 text-foreground' : 'hover:bg-foreground/[0.07]'
                          }`}
                        >
                          {w}
                        </button>{' '}
                      </span>
                    );
                  })}
                </span>
              );
            }
            return (
              <span
                key={v.number}
                role={pickMode === 'verse' ? 'button' : undefined}
                tabIndex={pickMode === 'verse' ? 0 : undefined}
                onClick={pickMode === 'verse' ? () => onPickVerse?.(v.number, v.text) : undefined}
                onKeyDown={
                  pickMode === 'verse'
                    ? e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onPickVerse?.(v.number, v.text);
                        }
                      }
                    : undefined
                }
                className={`rounded transition-colors ${
                  isSelected ? 'bg-hl-green/20' : pickMode === 'verse' ? 'cursor-pointer hover:bg-foreground/[0.05]' : ''
                }`}
              >
                <sup className="font-sans text-[10px] text-foreground/40 mr-0.5">{v.number}</sup>
                {v.text}{' '}
              </span>
            );
          })}
          <p className="font-sans text-[11px] text-foreground/35 mt-4">{passage.copyright}</p>
        </div>
      )}
    </div>
  );
}
