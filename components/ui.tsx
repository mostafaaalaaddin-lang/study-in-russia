'use client';

import type { ReactNode } from 'react';
import { useCurrency } from '@/lib/currency';

export function Money({ rub, round }: { rub: number; round?: number }) {
  const { format } = useCurrency();
  return <span className="tabular-nums">{format(rub, { round })}</span>;
}

export function MoneyRange({ min, max }: { min: number; max: number }) {
  const { format } = useCurrency();
  return (
    <span className="tabular-nums">
      {format(min)} to {format(max)}
    </span>
  );
}

export function Pill({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'blue' | 'green' | 'amber' | 'red';
  children: ReactNode;
}) {
  const tones = {
    neutral: 'bg-ink-100 text-ink-600',
    blue: 'bg-flag-blue/10 text-flag-blue',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    red: 'bg-red-100 text-flag-red dark:bg-flag-red/15',
  } as const;
  return <span className={`pill ${tones[tone]}`}>{children}</span>;
}

export function SourceLink({ href, label }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-sm font-medium text-flag-blue underline-offset-2 hover:underline"
    >
      {label ?? 'Official source'}
      <span aria-hidden>&#8599;</span>
    </a>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <div className="callout-warn p-4">
      <p className="text-sm font-semibold">Verify before you rely on this</p>
      <p className="mt-1 text-sm leading-relaxed opacity-90">
        {children ??
          'Deadlines, stipends, rents and rules are reissued every cycle. This app is a planning tool built from published sources, not an official channel. The official site linked on each record is the only authority.'}
      </p>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-ink-200 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-flag-blue">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-600">{intro}</p>}
        {children}
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: string;
}) {
  return (
    <div className="card p-4">
      <p className="label">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-ink-900">{value}</p>
      {note && <p className="mt-1 text-xs leading-relaxed text-ink-500">{note}</p>}
    </div>
  );
}

export type BarSegment = { key: string; label: string; value: number; color: string };

export function StackedBar({ segments }: { segments: BarSegment[] }) {
  const total = segments.reduce((n, s) => n + s.value, 0) || 1;
  return (
    <div className="flex h-4 w-full overflow-hidden rounded-full bg-ink-100">
      {segments.map((s) => (
        <div
          key={s.key}
          style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
          title={`${s.label}: ${Math.round((s.value / total) * 100)}%`}
        />
      ))}
    </div>
  );
}

export function Check({ on }: { on: boolean }) {
  return on ? (
    <span className="font-bold text-emerald-600 dark:text-emerald-400" aria-label="yes">
      &#10003;
    </span>
  ) : (
    <span className="text-ink-300" aria-label="no">
      &#8212;
    </span>
  );
}
