'use client';

import Link from 'next/link';
import { TIMELINE, PARTICIPATING_UNIVERSITY_COUNT } from '@/data/openDoors';
import { SCHOLARSHIPS } from '@/data/scholarships';
import { CITIES } from '@/data/cities';
import { UNIVERSITIES } from '@/data/universities';
import { Disclaimer, Money, Pill, SourceLink } from '@/components/ui';

const TOOLS = [
  {
    href: '/open-doors',
    title: 'Open Doors, in full',
    body: 'Tracks, age limits, every stage with its date, what the portfolio contains and what winners actually receive.',
    tag: 'Start here',
  },
  {
    href: '/advisor',
    title: 'Find your route',
    body: 'Answer eight questions and get a ranked shortlist of scholarships, universities and cities that fit your profile.',
    tag: 'Interactive',
  },
  {
    href: '/letter',
    title: 'Motivation letter review',
    body: 'Paste your draft and get a scored breakdown against the things portfolio reviewers actually count.',
    tag: 'Interactive',
  },
  {
    href: '/calculator',
    title: 'Cost of living calculator',
    body: 'Build a monthly and first-year budget for any city, housing type and lifestyle, in roubles, dollars or euros.',
    tag: 'Interactive',
  },
  {
    href: '/compare',
    title: 'Compare cities',
    body: 'Put three cities side by side on rent, food, transport, utilities and winter temperatures.',
    tag: 'Interactive',
  },
  {
    href: '/reviews',
    title: 'Student voices',
    body: 'What the official pages leave out: which cost caught someone out and which step took six weeks longer than expected.',
    tag: 'Community',
  },
  {
    href: '/checklist',
    title: 'Application checklist',
    body: '47 tracked steps from first research to your first week in Russia, saved in your browser.',
    tag: 'Tracked',
  },
];

function nextMilestone() {
  const today = new Date();
  return (
    TIMELINE.find((m) => new Date(m.end) >= today) ?? TIMELINE[TIMELINE.length - 1]
  );
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
}

export default function HomePage() {
  const milestone = nextMilestone();
  const days = daysUntil(milestone.end);
  const cheapest = [...CITIES].sort(
    (a, b) =>
      a.costs.dorm.min + a.costs.food.min - (b.costs.dorm.min + b.costs.food.min)
  )[0];

  return (
    <>
      <section className="border-b border-ink-200 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-8 flex-col overflow-hidden rounded-sm border border-ink-200">
                  <span className="h-1/3 bg-[#ffffff]" />
                  <span className="h-1/3 bg-flag-blue" />
                  <span className="h-1/3 bg-flag-red" />
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-500">
                  For international applicants
                </p>
              </div>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Work out whether studying in Russia actually adds up.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
                Most scholarship guides stop at the word <em>fully funded</em>. This one keeps
                going: what Open Doors and the government quota really cover, what they leave you to
                pay, and what a month in Moscow or Tomsk costs once you are there.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/open-doors" className="btn-primary">
                  Open Doors explained
                </Link>
                <Link href="/advisor" className="btn-ghost">
                  Find my route
                </Link>
                <Link href="/calculator" className="btn-ghost">
                  Build a budget
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <dt className="label">Funded routes</dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">{SCHOLARSHIPS.length}</dd>
                </div>
                <div>
                  <dt className="label">Universities</dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">{UNIVERSITIES.length}</dd>
                </div>
                <div>
                  <dt className="label">Cities costed</dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">{CITIES.length}</dd>
                </div>
                <div>
                  <dt className="label">Cheapest month</dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">
                    <Money
                      rub={
                        cheapest.costs.dorm.min +
                        cheapest.costs.food.min +
                        cheapest.costs.transport +
                        cheapest.costs.connectivity +
                        cheapest.costs.misc.min
                      }
                      round={1000}
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card overflow-hidden">
              <div className="border-b border-ink-200 bg-slab px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slab-muted">
                  Open Doors, next date
                </p>
                <p className="mt-1 text-xl font-bold text-slab-fg">{milestone.label}</p>
              </div>
              <div className="p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold tracking-tight text-flag-blue">
                    {days > 0 ? days : 0}
                  </span>
                  <span className="text-sm font-medium text-ink-500">
                    {days === 1 ? 'day left' : 'days left'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  Closes{' '}
                  {new Date(milestone.end).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{milestone.detail}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {milestone.tracks.map((t) => (
                    <Pill key={t} tone="blue">
                      {t}
                    </Pill>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                  <SourceLink href="https://od.globaluni.ru" label="od.globaluni.ru" />
                  <Link
                    href="/open-doors"
                    className="text-sm font-semibold text-ink-900 hover:underline"
                  >
                    Full timeline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title">The honest version</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-5">
            <p className="text-sm font-bold text-ink-900">Tuition free is not cost free</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Both Open Doors and the government quota cover tuition and hand you a dormitory place.
              Neither pays for your flights, your visa fees, your medical insurance, your dormitory
              fee or a single meal.
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-bold text-ink-900">The stipend is not an income</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              The state stipend runs to a few thousand roubles a month. It is real money and it is
              worth having, but it will not cover your food, let alone your rent. Budget as if it
              were not there.
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-bold text-ink-900">Where you go changes everything</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              The same degree costs roughly twice as much to live through in Moscow as in Tomsk or
              Rostov-on-Don. Choosing the city is a financial decision as much as an academic one.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="section-title">Tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card group p-5 transition hover:border-flag-blue hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-bold text-ink-900 group-hover:text-flag-blue">
                  {t.title}
                </p>
                <Pill tone={t.tag === 'Start here' ? 'red' : 'blue'}>{t.tag}</Pill>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{t.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="card overflow-hidden">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="border-b border-ink-200 p-6 md:border-b-0 md:border-r">
              <Pill tone="red">Merit competition</Pill>
              <h3 className="mt-3 text-xl font-bold text-ink-900">Open Doors</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                An open academic contest across {PARTICIPATING_UNIVERSITY_COUNT} universities and 14
                subject areas. You are judged on a portfolio and then on an exam or a supervisor
                interview. Your country allocation does not limit you, and entry is free.
              </p>
              <Link
                href="/open-doors"
                className="mt-4 inline-block text-sm font-semibold text-flag-blue hover:underline"
              >
                Read the full breakdown
              </Link>
            </div>
            <div className="p-6">
              <Pill tone="blue">State allocation</Pill>
              <h3 className="mt-3 text-xl font-bold text-ink-900">Government quota</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Around 15,000 places a year spread across more than 180 countries, with the first
                round of selection run by the Russian mission in your own country. Different
                calendar, different competition, and worth entering in the same year.
              </p>
              <Link
                href="/scholarships"
                className="mt-4 inline-block text-sm font-semibold text-flag-blue hover:underline"
              >
                Compare all six routes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
