import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import type { Photo } from '@/lib/timewalk/data';
import { useDarkMode } from '@/components/layout/DarkModeContext';

/** Attribution line shown with every photo. */
export function PhotoCredit({ photo, className = '', prefix }: { photo: Photo; className?: string; prefix?: string }) {
  return (
    <p className={`text-[10.5px] leading-snug text-foreground/45 ${className}`}>
      {prefix ?? (photo.near ? 'Photo taken nearby · ' : 'Photo: ')}
      {photo.author} ·{' '}
      {photo.licenseUrl ? (
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/70">
          {photo.license}
        </a>
      ) : (
        photo.license
      )}{' '}
      ·{' '}
      <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/70">
        {photo.sourceName ?? 'Wikimedia Commons'}
      </a>
    </p>
  );
}

/** Small photo that opens a large view on tap. */
export function PhotoThumb({ photo, className = '', aspect = 'aspect-[4/3]' }: { photo: Photo; className?: string; aspect?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block w-full overflow-hidden rounded-xl bg-foreground/[0.05] ${aspect} ${className}`}
        aria-label={`View larger: ${photo.alt}`}
      >
        <img src={photo.thumb} alt={photo.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className="absolute right-1.5 bottom-1.5 rounded-full bg-black/45 p-1 text-white opacity-80 group-hover:opacity-100">
          <ZoomIn className="w-3.5 h-3.5" />
        </span>
      </button>
      {open && <PhotoLightbox photo={photo} onClose={() => setOpen(false)} />}
    </>
  );
}

export function PhotoLightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const isDarkMode = useDarkMode();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return createPortal(
    <div
      className={`fixed inset-0 z-[130] flex flex-col items-center justify-center bg-black/85 p-4 sm:p-8 font-sans${isDarkMode ? ' dark' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <button type="button" onClick={onClose} className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20" aria-label="Close">
        <X className="w-5 h-5" />
      </button>
      <div className="relative max-h-[78vh] max-w-full">
        {/* Show the small image instantly, then swap in the large one */}
        {!loaded && <img src={photo.thumb} alt="" aria-hidden className="max-h-[78vh] max-w-full object-contain blur-[1px]" />}
        <img
          src={photo.large}
          alt={photo.alt}
          onLoad={() => setLoaded(true)}
          className={`max-h-[78vh] max-w-full object-contain ${loaded ? '' : 'absolute inset-0 opacity-0'}`}
        />
      </div>
      <div className="mt-4 max-w-3xl text-center text-white/85">
        {photo.alt && <p className="text-sm leading-relaxed">{photo.alt}</p>}
        <p className="mt-1.5 text-xs text-white/60">
          {photo.near ? 'Taken nearby · ' : ''}
          {photo.author} · {photo.license} ·{' '}
          <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
            {photo.sourceName ?? 'Wikimedia Commons'}
          </a>{' '}
          ·{' '}
          <a href={photo.full} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-white">
            Full resolution <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    </div>,
    document.body
  );
}
