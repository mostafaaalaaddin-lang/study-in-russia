'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const THEME_KEY = 'sir.theme';

/**
 * Runs before the first paint, inlined into the document head, so the page
 * never flashes light before switching to dark. Kept as a string because it
 * has to execute ahead of React hydration.
 */
export const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_KEY}');
    var theme = stored ? JSON.parse(stored) : 'system';
    var dark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

type ThemeState = {
  theme: Theme;
  /** What is actually on screen once "system" has been resolved. */
  resolved: 'light' | 'dark';
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

function systemPrefersDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function apply(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark());
  const root = document.documentElement;

  // Freeze transitions for one frame so switching theme does not animate
  // every border and background on the page at once.
  root.classList.add('theme-switching');
  root.classList.toggle('dark', dark);
  window.setTimeout(() => root.classList.remove('theme-switching'), 0);

  return dark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('light');

  // Read the stored preference after mount. The inline script has already put
  // the right class on <html>, so this only syncs React state to it.
  useEffect(() => {
    let stored: Theme = 'system';
    try {
      const raw = window.localStorage.getItem(THEME_KEY);
      if (raw) stored = JSON.parse(raw) as Theme;
    } catch {
      // Storage unavailable; the system preference still applies.
    }
    setThemeState(stored);
    setResolved(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  // Follow the OS while the preference is "system".
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setResolved(apply('system'));
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolved(apply(t));
    try {
      window.localStorage.setItem(THEME_KEY, JSON.stringify(t));
    } catch {
      // Preference will not persist, but the page still switches.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
