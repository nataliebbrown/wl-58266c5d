import { useEffect, useRef, useState } from 'react';

/** Scroll distance that triggers the collapse. */
const COLLAPSE_AT = 24;
/** Scroll distance below which the header expands again. Kept well under
 *  COLLAPSE_AT so small scroll jitter can't flip the state back and forth. */
const EXPAND_AT = 8;
/** Room we assume collapsing frees, until we've measured it for real. */
const ASSUMED_FREED = 140;

/**
 * Drives a card header that condenses once its content is scrolled.
 *
 * Attach `scrollRef` to the scrolling element and `headerRef` to the header
 * whose height changes; render according to `collapsed`.
 *
 * The subtlety this handles: collapsing grows the scroll viewport, which
 * shrinks the scrollable distance by the same amount. If there isn't enough
 * content to absorb that, the browser clamps scrollTop back to the top, the
 * header expands, and the two states oscillate. So we only collapse when the
 * remaining scroll distance would still keep us past the expand threshold.
 */
export function useCollapsingHeader<
  S extends HTMLElement = HTMLDivElement,
  H extends HTMLElement = HTMLDivElement,
>() {
  const scrollRef = useRef<S>(null);
  const headerRef = useRef<H>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Mirrors `collapsed` for use inside the scroll handler without re-binding
  // the listener on every toggle.
  const collapsedRef = useRef(false);
  // Header height observed in each state, so we know what collapsing frees.
  const heights = useRef({ expanded: 0, collapsed: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const evaluate = () => {
      const header = headerRef.current;
      if (header) {
        const height = header.offsetHeight;
        if (collapsedRef.current) heights.current.collapsed = height;
        else heights.current.expanded = height;
      }

      const { expanded, collapsed: collapsedHeight } = heights.current;
      const freed =
        expanded && collapsedHeight ? expanded - collapsedHeight : ASSUMED_FREED;
      const maxScroll = el.scrollHeight - el.clientHeight;

      const next = collapsedRef.current
        ? el.scrollTop > EXPAND_AT
        : el.scrollTop > COLLAPSE_AT && maxScroll - freed > EXPAND_AT;

      if (next !== collapsedRef.current) {
        collapsedRef.current = next;
        setCollapsed(next);
      }
    };

    el.addEventListener('scroll', evaluate, { passive: true });
    // Card size and content both change independently of scrolling.
    const observer = new ResizeObserver(evaluate);
    observer.observe(el);
    evaluate();

    return () => {
      el.removeEventListener('scroll', evaluate);
      observer.disconnect();
    };
  }, []);

  return { scrollRef, headerRef, collapsed };
}
