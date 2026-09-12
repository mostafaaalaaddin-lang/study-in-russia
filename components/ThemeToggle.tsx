'use client';

import { useTheme, type Theme } from '@/lib/theme';

const OPTIONS: { value: Theme; label: string; glyph: string }[] = [
  { value: 'light', label: 'Light', glyph: '☀' },
  { value: 'dark', label: 'Dark', glyph: '☾' },
  { value: 'system', label: 'Follow system', glyph: '◐' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-ink-200 bg-surface p-0.5"
      role="group"
      aria-label="Colour theme"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setTheme(o.value)}
          title={o.label}
          aria-label={o.label}
          aria-pressed={theme === o.value}
          className={`rounded px-1.5 py-1 text-xs leading-none transition ${
            theme === o.value
              ? 'bg-flag-blue text-white'
              : 'text-ink-400 hover:text-ink-900'
          }`}
        >
          <span aria-hidden>{o.glyph}</span>
        </button>
      ))}
    </div>
  );
}
