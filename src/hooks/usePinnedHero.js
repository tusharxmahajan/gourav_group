import { useEffect, useRef, useState } from 'react';

/**
 * The hero (and the header over it) stay pinned while the page scrolls up
 * over them. `sentinelRef` marks the top edge of the overlapping content.
 *
 * Returns `covered`: true once that edge has passed the top of the viewport,
 * i.e. the hero is completely hidden (used to pause the carousel). The 200px
 * margin flips it back just before the hero starts to show again.
 *
 * Also keeps keyboard focus visible: tabbing into the covered header or hero
 * ([data-pinned]) scrolls back to the top so the focused control is on screen.
 */
export default function usePinnedHero(sentinelRef) {
  const [covered, setCovered] = useState(false);
  const coveredRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        coveredRef.current = next;
        setCovered(next);
      },
      { rootMargin: '200px 0px 0px 0px' },
    );
    observer.observe(sentinel);

    const onFocusIn = (e) => {
      if (coveredRef.current && e.target.closest?.('[data-pinned]')) window.scrollTo({ top: 0, behavior: 'instant' });
    };
    document.addEventListener('focusin', onFocusIn);

    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [sentinelRef]);

  return covered;
}
