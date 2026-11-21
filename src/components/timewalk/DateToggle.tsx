import type { DateSystem } from '@/lib/timewalk/eras';

export function DateToggle({ value, onChange }: { value: DateSystem; onChange: (s: DateSystem) => void }) {
  return (
    <div className="inline-flex rounded-full border border-border/50 p-0.5 text-xs" role="group" aria-label="Dating system">
      {(
        [
          ['scholarly', 'Scholarly dates', 'Approximate dates as most evangelical scholars hold them today'],
          ['traditional', 'Traditional', 'Archbishop James Ussher’s chronology (1650)'],
        ] as [DateSystem, string, string][]
      ).map(([id, label, title]) => (
        <button
          key={id}
          type="button"
          title={title}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`rounded-full px-3 py-1 transition-colors ${value === id ? 'bg-foreground/[0.08] text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
