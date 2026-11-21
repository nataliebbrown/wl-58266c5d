import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import {
  TIMEWALK_ATTRIBUTION,
  getPeopleById,
  getPerson,
  labelForRange,
  lifespan,
  refFromRange,
  type PersonDetail,
  type PersonSummary,
} from '@/lib/timewalk/data';

interface PersonCardProps {
  id: string;
  onSelectPerson: (id: string) => void;
  onGoTo?: (ref: BibleReference) => void;
  onClose?: () => void;
}

/** A person's profile: lifespan, family connections, key passages, and biography. */
export function PersonCard({ id, onSelectPerson, onGoTo, onClose }: PersonCardProps) {
  const [people, setPeople] = useState<Map<string, PersonSummary> | null>(null);
  const [detail, setDetail] = useState<PersonDetail | null | undefined>(undefined);
  const [bioOpen, setBioOpen] = useState(false);

  useEffect(() => {
    getPeopleById().then(setPeople);
  }, []);
  useEffect(() => {
    let cancelled = false;
    setDetail(undefined);
    setBioOpen(false);
    getPerson(id)
      .then(d => !cancelled && setDetail(d))
      .catch(() => !cancelled && setDetail(null));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const me = people?.get(id);
  const name = (pid: string) => people?.get(pid)?.name ?? pid.replace(/_\d+$/, '').replace(/_/g, ' ');

  const family: [string, string[]][] = detail
    ? [
        ['Parents', [...detail.father, ...detail.mother]],
        ['Spouse', detail.partners],
        ['Siblings', detail.siblings],
        ['Children', detail.children],
      ]
    : [];

  const bio = detail?.bio ?? '';
  const shortBio = bio.length > 520 && !bioOpen ? bio.slice(0, 520).replace(/\s+\S*$/, '') + '…' : bio;

  return (
    <div className="rounded-2xl border border-border/40 bg-card/70 px-4 py-4 font-sans">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-2xl text-foreground/90 leading-tight">{me?.title || me?.name || name(id)}</p>
          <p className="text-xs text-foreground/50 mt-0.5">
            {me && lifespan(me) && <>Traditional dates: {lifespan(me)} · </>}
            {me ? `mentioned in ${me.verseCount.toLocaleString()} verses` : ''}
          </p>
          {detail?.also && <p className="text-xs text-foreground/45 mt-0.5">Also called {detail.also}</p>}
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.05]" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {detail === undefined && <Loader2 className="mt-3 w-4 h-4 animate-spin text-foreground/40" />}

      {detail && family.some(([, ids]) => ids.length) && (
        <div className="mt-4 space-y-2">
          {family
            .filter(([, ids]) => ids.length)
            .map(([label, ids]) => (
              <div key={label} className="flex flex-wrap items-baseline gap-1.5">
                <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.12em] text-foreground/40">{label}</span>
                {ids.slice(0, 14).map(pid => (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => onSelectPerson(pid)}
                    className="rounded-full border border-border/50 px-2.5 py-0.5 text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                  >
                    {name(pid)}
                  </button>
                ))}
                {ids.length > 14 && <span className="text-xs text-foreground/40">+{ids.length - 14}</span>}
              </div>
            ))}
        </div>
      )}

      {detail && detail.refs.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/40 mb-1.5">Key passages</p>
          <div className="flex flex-wrap gap-1">
            {detail.refs.slice(0, 16).map(r => {
              const target = refFromRange(r);
              return (
                <button
                  key={r}
                  type="button"
                  disabled={!onGoTo || !target}
                  onClick={() => target && onGoTo?.(target)}
                  className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04] disabled:cursor-default"
                >
                  {labelForRange(r)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {bio && (
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/40 mb-1">From Easton’s Bible Dictionary (1897)</p>
          <p className="text-sm leading-relaxed text-foreground/75 whitespace-pre-line">{shortBio}</p>
          {bio.length > 520 && (
            <button type="button" onClick={() => setBioOpen(o => !o)} className="mt-1 text-xs text-foreground/50 hover:text-foreground underline underline-offset-2">
              {bioOpen ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      <p className="mt-4 text-[10.5px] leading-relaxed text-foreground/35">{TIMEWALK_ATTRIBUTION.people}</p>
    </div>
  );
}
