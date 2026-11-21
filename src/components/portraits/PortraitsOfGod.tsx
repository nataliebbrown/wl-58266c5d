import { useMemo, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import {
  GOD_ATTRIBUTES,
  countByAttribute,
  deletePortraitEntry,
  getAttribute,
  getPortraitEntries,
  type PortraitEntry,
  type PortraitSource,
} from '@/lib/portraits';
import { PortraitCaptureForm } from './PortraitCaptureForm';

const SOURCE_LABELS: Record<PortraitSource, string> = {
  study: 'Study',
  reflection: 'Reading',
  meditation: 'Meditation',
  journal: 'Journal',
};

/** A growing portrait of who God is, built from what the person has seen in Scripture. */
export function PortraitsOfGod() {
  const [entries, setEntries] = useState<PortraitEntry[]>(() => getPortraitEntries());
  const [selected, setSelected] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const counts = useMemo(() => countByAttribute(entries), [entries]);
  const refresh = () => setEntries(getPortraitEntries());

  const visible = selected ? entries.filter(e => e.attributeIds.includes(selected)) : entries;
  const attribute = selected ? getAttribute(selected) : undefined;
  const sorted = [...GOD_ATTRIBUTES].sort((a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0));

  return (
    <div className="font-sans">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <p className="text-sm text-foreground/55 leading-relaxed max-w-md">
          Everything you’ve seen of God in Scripture, gathered by who He is. It grows each time you study, read, or meditate.
        </p>
        <button
          type="button"
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-hl-green/10 text-hl-green hover:bg-hl-green/20 transition-colors"
        >
          {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {adding ? 'Close' : 'Add'}
        </button>
      </div>

      {adding && (
        <div className="mb-6 rounded-2xl border border-border/40 px-4 py-4">
          <PortraitCaptureForm
            source="journal"
            placeholder="What have you seen of God? Include where, e.g. “Psalm 23 — He leads me like a shepherd.”"
            onSaved={() => {
              refresh();
              setTimeout(() => setAdding(false), 900);
            }}
          />
        </div>
      )}

      {/* Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {sorted.map(a => {
          const n = counts[a.id] ?? 0;
          const active = selected === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(active ? null : a.id)}
              className={`text-left rounded-xl border px-3 py-2.5 transition-colors ${
                active
                  ? 'border-hl-green/60 bg-hl-green/10'
                  : n > 0
                    ? 'border-border/40 bg-foreground/[0.025] hover:bg-foreground/[0.045]'
                    : 'border-dashed border-border/40 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-[15px] text-foreground/90">{a.name}</span>
                {n > 0 && <span className="text-xs text-foreground/45">{n}</span>}
              </span>
              <span className="block text-[11px] leading-snug text-foreground/45 mt-0.5">{a.summary}</span>
            </button>
          );
        })}
      </div>

      {/* Entries */}
      {attribute && (
        <div className="mb-4">
          <h3 className="font-serif text-2xl text-foreground/90">God is {attribute.name.toLowerCase()}</h3>
          <p className="text-sm text-foreground/50">
            {attribute.summary} <span className="text-foreground/35">· {attribute.anchor}</span>
          </p>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 px-5 py-6 text-sm text-foreground/50 leading-relaxed">
          Your portrait is empty for now. When you finish a study, reflect at the end of a chapter, or complete a meditation,
          add what you saw of God — it will gather here.
        </div>
      ) : visible.length === 0 ? (
        <p className="text-sm text-foreground/50">Nothing here yet. Watch for this as you read.</p>
      ) : (
        <ul className="space-y-3">
          {visible.map(e => (
            <li key={e.id} className="group rounded-2xl border border-border/30 px-4 py-3.5">
              <p className="font-serif text-[17px] leading-relaxed text-foreground/85 whitespace-pre-line">{e.text}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/45">
                {e.reference && <span className="text-foreground/60">{e.reference}</span>}
                <span>{e.attributeIds.map(id => getAttribute(id)?.name).filter(Boolean).join(' · ')}</span>
                <span>
                  {SOURCE_LABELS[e.source]} · {new Date(e.createdAt).toLocaleDateString()}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    deletePortraitEntry(e.id);
                    refresh();
                  }}
                  className="ml-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 text-foreground/35 hover:text-foreground/70"
                  aria-label="Delete this entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
