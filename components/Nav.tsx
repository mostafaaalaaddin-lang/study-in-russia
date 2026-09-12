'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CurrencySwitch } from './CurrencySwitch';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/open-doors', label: 'Open Doors' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/universities', label: 'Universities' },
  { href: '/calculator', label: 'Budget' },
  { href: '/compare', label: 'Cities' },
  { href: '/advisor', label: 'Advisor' },
  { href: '/letter', label: 'Letter' },
  { href: '/reviews', label: 'Student voices' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-ink-200 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 flex-col overflow-hidden rounded border border-ink-200">
            <span className="h-1/3 bg-[#ffffff]" />
            <span className="h-1/3 bg-flag-blue" />
            <span className="h-1/3 bg-flag-red" />
          </span>
          <span className="text-sm font-bold tracking-tight text-ink-900">Study in Russia</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-0.5 xl:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2 py-1.5 text-sm font-medium transition ${
                isActive(l.href)
                  ? 'bg-flag-blue/10 text-flag-blue'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <ThemeToggle />
          <CurrencySwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost px-2.5 py-1.5 xl:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid grid-cols-2 gap-1 border-t border-ink-200 bg-surface px-4 py-3 xl:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                isActive(l.href) ? 'bg-flag-blue/10 text-flag-blue' : 'text-ink-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
