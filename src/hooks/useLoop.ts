import { useEffect, useRef } from 'react';
import { $motionPaused, prefersReducedMotion } from '@/stores/ui';

/**
 * Runs `fn` every `ms` milliseconds, skipping ticks while the visitor has paused
 * motion or the tab is hidden. Never runs when reduced motion is requested.
 */
export function useLoop(ms: number, fn: () => void) {
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!$motionPaused.get() && !document.hidden) saved.current();
    }, ms);
    return () => window.clearInterval(id);
  }, [ms]);
}
