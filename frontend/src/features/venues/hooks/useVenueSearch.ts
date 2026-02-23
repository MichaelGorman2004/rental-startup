import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { SEARCH_DEBOUNCE_MS } from '../constants/venue-defaults';

/**
 * Hook for debounced venue search input.
 * Provides immediate input value for responsive UI and a debounced
 * value for triggering API calls after user stops typing.
 */
export function useVenueSearch(initialValue: string) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Sync internal state when external initialValue changes (e.g., browser back/forward). */
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setInputValue(initialValue);
    setDebouncedValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputValue]);

  const handleSearchChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const clearSearch = useCallback(() => {
    setInputValue('');
    setDebouncedValue('');
  }, []);

  return {
    inputValue, debouncedValue, handleSearchChange, clearSearch,
  };
}
