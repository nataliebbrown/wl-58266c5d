import { useEffect, useState } from 'react';
import { getArt, type ArtImage } from '@/lib/timewalk/data';

export const KIND_LABEL: Record<ArtImage['kind'], string> = {
  art: 'Artist’s interpretation',
  photo: 'Historical photo',
  artifact: 'Museum object',
};

/** Full description used in the large view, so the "interpretation" label travels with the image. */
export function withDescription(a: ArtImage): ArtImage {
  const by = [a.artist, a.date].filter(Boolean).join(', ');
  const note = a.kind === 'art' ? ' · An artist’s interpretation, not a historical record.' : a.kind === 'photo' ? ' · Photographed in the early 1900s, not in Bible times.' : '';
  return { ...a, alt: `${a.caption}${by ? ` — ${by}` : ''}${note}` };
}

let artCache: ArtImage[] | null = null;

/** All hand-picked images (loaded once). */
export function useArt(): ArtImage[] {
  const [art, setArt] = useState<ArtImage[]>(artCache ?? []);
  useEffect(() => {
    if (artCache) return;
    getArt()
      .then(a => {
        artCache = a;
        setArt(a);
      })
      .catch(() => {});
  }, []);
  return art;
}
