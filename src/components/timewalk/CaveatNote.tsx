import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { CAVEATS } from '@/lib/timewalk/eras';

/** "Scholars differ" note — collapsed to its title until opened. */
export function CaveatNote({ id, defaultOpen = false }: { id: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const c = CAVEATS[id];
  if (!c) return null;
  return (
    <div className="rounded-xl border border-amber-700/20 bg-amber-500/[0.06] font-sans">
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs text-foreground/70" aria-expanded={open}>
        <Info className="w-3.5 h-3.5 shrink-0 text-amber-700/70 dark:text-amber-300/70" />
        <span className="flex-1">{c.title}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="px-3 pb-3 text-[13px] leading-relaxed text-foreground/70">{c.text}</p>}
    </div>
  );
}
