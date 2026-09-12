import type { Config } from 'tailwindcss';

/**
 * Colours are driven by CSS custom properties so the whole palette can be
 * swapped for dark mode in one place. The `ink` scale is semantic rather than
 * literal: `ink-900` always means "primary text" and `ink-200` always means
 * "border", which is why the scale inverts under `.dark` instead of just
 * getting darker.
 */
const ink = (n: string) => `rgb(var(--ink-${n}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: ink('50'),
          100: ink('100'),
          200: ink('200'),
          300: ink('300'),
          400: ink('400'),
          500: ink('500'),
          600: ink('600'),
          700: ink('700'),
          800: ink('800'),
          900: ink('900'),
          950: ink('950'),
        },
        /** Card and header background. White in light mode, near-black in dark. */
        surface: 'rgb(var(--surface) / <alpha-value>)',
        /** Deliberately high-contrast panel that stays dark in both themes. */
        slab: {
          DEFAULT: 'rgb(var(--slab) / <alpha-value>)',
          fg: 'rgb(var(--slab-fg) / <alpha-value>)',
          muted: 'rgb(var(--slab-muted) / <alpha-value>)',
        },
        flag: {
          blue: 'rgb(var(--flag-blue) / <alpha-value>)',
          red: 'rgb(var(--flag-red) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
