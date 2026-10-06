import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeVisibility(onChange) {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

const isHidden = () => document.hidden;
const isHiddenOnServer = () => false;

/**
 * Index state for an auto-advancing carousel.
 *
 * - Autoplay advances every `interval` ms; any go/next/prev restarts the timer.
 * - `cycle` increments on every change. Use it as the `key` of the progress
 *   fill so its CSS animation restarts.
 * - While `paused` (or the tab is hidden) the timer stops and keeps the time
 *   left, so a CSS progress bar paused with `animation-play-state` stays in sync.
 */
export default function useCarousel(count = 3, interval = 6000, { autoplay = true, paused = false } = {}) {
  const [{ index, cycle }, setState] = useState({ index: 0, cycle: 0 });
  const hidden = useSyncExternalStore(subscribeVisibility, isHidden, isHiddenOnServer);
  const running = autoplay && !paused && !hidden;
  const remaining = useRef(interval);

  const go = useCallback(
    (i) => setState((s) => ({ index: ((i % count) + count) % count, cycle: s.cycle + 1 })),
    [count],
  );
  const next = useCallback(() => setState((s) => ({ index: (s.index + 1) % count, cycle: s.cycle + 1 })), [count]);
  const prev = useCallback(
    () => setState((s) => ({ index: (s.index - 1 + count) % count, cycle: s.cycle + 1 })),
    [count],
  );

  // A new slide always gets a full interval.
  useEffect(() => {
    remaining.current = interval;
  }, [cycle, interval]);

  useEffect(() => {
    if (!running) return undefined;
    const startedAt = performance.now();
    const timer = setTimeout(next, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= performance.now() - startedAt;
    };
  }, [running, cycle, next]);

  return { index, go, next, prev, cycle, running };
}
