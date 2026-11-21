import { useEffect, useState } from 'react';
import { getDateSystem, saveDateSystem, type DateSystem } from '@/lib/timewalk/eras';

const EVENT = 'wl-date-system-change';

/** Shared Scholarly/Traditional preference, kept in sync across components. */
export function useDateSystem(): [DateSystem, (s: DateSystem) => void] {
  const [system, setSystem] = useState<DateSystem>(() => getDateSystem());
  useEffect(() => {
    const onChange = () => setSystem(getDateSystem());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const update = (s: DateSystem) => {
    saveDateSystem(s);
    setSystem(s);
    window.dispatchEvent(new Event(EVENT));
  };
  return [system, update];
}

/** Drafts (unreviewed archaeology and daily-life notes) are visible only in preview mode: add ?drafts=1 to the URL once. */
export function useDraftPreview(): boolean {
  const [on] = useState(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('drafts');
      if (param === '1') localStorage.setItem('wl-preview-drafts', '1');
      if (param === '0') localStorage.removeItem('wl-preview-drafts');
      return localStorage.getItem('wl-preview-drafts') === '1';
    } catch {
      return false;
    }
  });
  return on;
}
