'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Persisted state that degrades gracefully. Storage can be unavailable
 * (private windows, blocked site data), so every access is guarded and the
 * initial render always uses the fallback to keep the server and client markup
 * identical.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // Ignore: the fallback value is already in place.
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore: persistence is a convenience, not a requirement.
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return { value, setValue, reset, hydrated } as const;
}
