import { useState, useEffect, useRef } from 'react';

const DURATION_MS = 1200;
const FRAME_MS = 16;

/**
 * Animates a number from 0 to `target` using ease-out timing.
 * Only starts counting when `isActive` becomes true.
 */
export function useAnimatedCounter(target: number, isActive: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return undefined;
    hasRun.current = true;

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += FRAME_MS;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));

      if (progress >= 1) clearInterval(interval);
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [isActive, target]);

  return value;
}
