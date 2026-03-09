import { useState, useRef, useEffect } from 'react';
import { SCROLL_ANIMATION } from '../constants/landing.constants';

/**
 * Returns a ref object and visibility flag driven by IntersectionObserver.
 * Triggers once — element stays visible after entering viewport.
 * Uses useEffect to manage the observer so it survives StrictMode remounts.
 */
export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: SCROLL_ANIMATION.THRESHOLD,
        rootMargin: SCROLL_ANIMATION.ROOT_MARGIN,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  return { isVisible, ref };
}
