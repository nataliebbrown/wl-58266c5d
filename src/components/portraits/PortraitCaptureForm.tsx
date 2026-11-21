import { useState } from 'react';
import { Check } from 'lucide-react';
import { GOD_ATTRIBUTES, addPortraitEntry, type PortraitSource } from '@/lib/portraits';

interface PortraitCaptureFormProps {
  source: PortraitSource;
  reference?: string;
  placeholder?: string;
  /** Called after a successful save */
  onSaved?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}

const MAX = 3;

/** "What did you see of God?" — text + up to 3 attributes, saved to Portraits of God. */
export function PortraitCaptureForm({ source, reference, placeholder, onSaved, onCancel, compact }: PortraitCaptureFormProps) {
  const [text, setText] = useState('');
  const [ids, setIds] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const canSave = text.trim().length > 0 && ids.length > 0;

  if (saved) {
    return (
      <p className="inline-flex items-center gap-1.5 text-sm text-foreground/65 font-sans">
        <Check className="w-4 h-4 text-hl-green" /> Added to your Portraits of God
      </p>
    );
  }

  return (
    <form
      className="font-sans"
      onSubmit={e => {
        e.preventDefault();
        if (!canSave) return;
        addPortraitEntry({ attributeIds: ids, text, reference, source });
        setSaved(true);
        onSaved?.();
      }}
    >
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder ?? 'What did you see of God?'}
        rows={compact ? 2 : 3}
        className="w-full rounded-xl border border-border/50 bg-card/60 px-3.5 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-foreground/30 resize-y"
      />
      <p className="text-xs text-foreground/50 mt-2.5 mb-1.5">Which attributes of God? (up to {MAX})</p>
      <div className="flex flex-wrap gap-1.5">
        {GOD_ATTRIBUTES.map(a => {
          const on = ids.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              disabled={!on && ids.length >= MAX}
              onClick={() => setIds(on ? ids.filter(i => i !== a.id) : [...ids, a.id])}
              className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors disabled:opacity-35 ${
                on ? 'border-hl-green/60 bg-hl-green/15 text-foreground' : 'border-border/50 text-foreground/60 hover:text-foreground'
              }`}
            >
              {a.name}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          disabled={!canSave}
          className="rounded-full bg-foreground text-background px-3.5 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          Add to Portraits
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-xs text-foreground/50 hover:text-foreground">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
