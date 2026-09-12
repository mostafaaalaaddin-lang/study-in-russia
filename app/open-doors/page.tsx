'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  TRACKS,
  TIMELINE,
  SUBJECT_AREAS,
  SUBJECT_AREAS_NOTE,
  WINNER_BENEFITS,
  RUNNER_UP_NOTE,
  HIGH_ACHIEVER_NOTE,
  NOT_COVERED,
  PORTFOLIO_COMPONENTS,
  KEY_RULES,
  PARTICIPATING_UNIVERSITY_COUNT,
  OPEN_DOORS_SOURCE,
  OPEN_DOORS_RULES_URL,
  type TrackId,
} from '@/data/openDoors';
import { UNIVERSITIES } from '@/data/universities';
import { Disclaimer, PageHeader, Pill, SourceLink } from '@/components/ui';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function OpenDoorsPage() {
  const [track, setTrack] = useState<TrackId>('master');
  const active = TRACKS.find((t) => t.id === track)!;
  const milestones = TIMELINE.filter((m) => m.tracks.includes(track));
  const participants = UNIVERSITIES.filter((u) => u.openDoorsParticipant);

  return (
    <>
      <PageHeader
        eyebrow="The flagship route"
        title="Open Doors: Russian Scholarship Project"
        intro="An open academic competition, not an application queue. You build a portfolio, sit a subject exam or face a supervisor interview, and winners receive a tuition-free place inside the Russian state education quota. Entry is free and your country allocation does not limit you."
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SourceLink href={OPEN_DOORS_SOURCE} label="od.globaluni.ru" />
          <SourceLink href={OPEN_DOORS_RULES_URL} label="Official rules" />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* ------------------------------------------------------------ tracks */}
        <section>
          <h2 className="section-title">Pick your track</h2>
          <p className="mt-2 max-w-3xl prose-note">
            Age bands and stages differ by track. Choose yours to see the timeline that applies to
            you.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTrack(t.id)}
                className={`card p-4 text-left transition ${
                  track === t.id
                    ? 'border-flag-blue ring-2 ring-flag-blue/20'
                    : 'hover:border-ink-300'
                }`}
              >
                <p className="text-sm font-bold text-ink-900">{t.name}</p>
                <p className="mt-1 text-xs font-medium text-flag-blue">
                  Ages {t.minAge} to {t.maxAge}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">{t.summary}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="card p-5">
              <p className="label">You need</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{active.requiredBackground}</p>
            </div>
            <div className="card p-5">
              <p className="label">You are excluded if</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{active.disqualifier}</p>
            </div>
            <div className="card p-5">
              <p className="label">Results</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{active.resultDate}</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- timeline */}
        <section className="mt-12">
          <h2 className="section-title">Timeline for the {active.name.toLowerCase()}</h2>
          <ol className="mt-6 space-y-3">
            {milestones.map((m, i) => {
              const past = new Date(m.end) < new Date();
              return (
                <li key={m.label} className="card flex gap-4 p-5">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        past ? 'bg-ink-100 text-ink-400' : 'bg-flag-blue text-white'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i < milestones.length - 1 && (
                      <span className="mt-2 w-px flex-1 bg-ink-200" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-ink-900">{m.label}</p>
                      <p className="text-sm font-medium tabular-nums text-ink-500">
                        {m.start === m.end
                          ? formatDate(m.start)
                          : `${formatDate(m.start)} — ${formatDate(m.end)}`}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{m.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="callout-danger mt-4 p-4">
            <p className="text-sm font-semibold text-flag-red">The trap in this calendar</p>
            <p className="mt-1 text-sm leading-relaxed">
              Registration closes on 1 November, almost two weeks before the portfolio deadline of 13
              November. If you have not created an account by the first date, the later one is
              irrelevant to you.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- portfolio */}
        <section className="mt-12">
          <h2 className="section-title">What the portfolio contains</h2>
          <p className="mt-2 max-w-3xl prose-note">
            Everything is submitted inside your participant account, in Russian or English. Portfolio
            results cannot be appealed, so there is no recovering from a careless submission.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {PORTFOLIO_COMPONENTS.map((c) => (
              <div key={c.name} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink-900">{c.name}</p>
                  <Pill tone={c.weightHint === 'High influence' ? 'red' : 'neutral'}>
                    {c.weightHint}
                  </Pill>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.detail}</p>
              </div>
            ))}
          </div>
          <Link href="/letter" className="btn-primary mt-5">
            Check your motivation letter
          </Link>
        </section>

        {/* ---------------------------------------------------------- benefits */}
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-ink-900">What winners receive</h3>
            <ul className="mt-4 space-y-2">
              {WINNER_BENEFITS.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                  <span className="mt-0.5 font-bold text-emerald-600 dark:text-emerald-400" aria-hidden>
                    &#10003;
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-600">
              {RUNNER_UP_NOTE}
            </p>
            <p className="mt-2 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-600">
              {HIGH_ACHIEVER_NOTE}
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-ink-900">What you still pay for</h3>
            <ul className="mt-4 space-y-2">
              {NOT_COVERED.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                  <span className="mt-0.5 font-bold text-flag-red" aria-hidden>
                    &#10007;
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/calculator"
              className="mt-5 inline-block text-sm font-semibold text-flag-blue hover:underline"
            >
              Work out what that costs in your city
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------------- subjects */}
        <section className="mt-12">
          <h2 className="section-title">Subject areas</h2>
          <p className="mt-2 max-w-3xl prose-note">{SUBJECT_AREAS_NOTE}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECT_AREAS.map((s) => (
              <div key={s.id} className="card p-4">
                <p className="text-sm font-bold text-ink-900">{s.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ universities */}
        <section className="mt-12">
          <h2 className="section-title">Participating universities</h2>
          <p className="mt-2 max-w-3xl prose-note">
            The competition runs across {PARTICIPATING_UNIVERSITY_COUNT} universities. These are the
            ones covered in this app; not every university accepts every subject area, so check the
            pairing on the official site before you choose.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {participants.map((u) => (
              <Link
                key={u.id}
                href="/universities"
                className="rounded-lg border border-ink-200 bg-surface px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-flag-blue hover:text-flag-blue"
              >
                {u.shortName}
                <span className="ml-1.5 text-xs text-ink-400">{u.cityId.replace(/-/g, ' ')}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- rules */}
        <section className="mt-12">
          <h2 className="section-title">Rules worth knowing before you start</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {KEY_RULES.map((r) => (
              <li key={r} className="card flex gap-3 p-4 text-sm leading-relaxed text-ink-700">
                <span className="mt-0.5 font-bold text-flag-blue" aria-hidden>
                  &#8226;
                </span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Disclaimer>
            The dates on this page are for the 2026/27 cycle as published on od.globaluni.ru. The
            organisers reissue the calendar, the subject list and the participating universities
            every year. Confirm on the official site and in your participant account before acting.
          </Disclaimer>
        </div>
      </div>
    </>
  );
}
