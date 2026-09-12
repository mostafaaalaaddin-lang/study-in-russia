'use client';

import Link from 'next/link';
import { SITE, ABOUT } from '@/data/site';
import { SCHOLARSHIPS } from '@/data/scholarships';
import { UNIVERSITIES } from '@/data/universities';
import { CITIES } from '@/data/cities';
import { KNOWLEDGE } from '@/data/knowledge';
import { TOTAL_ITEMS } from '@/data/checklist';
import { PageHeader, Pill, SourceLink } from '@/components/ui';

const CONTACTS: { label: string; value: string; href?: (v: string) => string }[] = [
  { label: 'Email', value: SITE.email, href: (v) => `mailto:${v}` },
  { label: 'GitHub', value: SITE.github, href: (v) => v },
  { label: 'LinkedIn', value: SITE.linkedin, href: (v) => v },
  { label: 'Based in', value: SITE.location },
];

export default function AboutPage() {
  const contacts = CONTACTS.filter((c) => c.value);

  return (
    <>
      <PageHeader
        eyebrow="About this project"
        title={`Built by ${SITE.author}`}
        intro={SITE.role}
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <section>
          <h2 className="section-title">Why I built it</h2>
          {ABOUT.why.map((p) => (
            <p key={p.slice(0, 30)} className="mt-4 text-base leading-relaxed text-ink-700">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="section-title">What is in it</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ['Funded routes documented', SCHOLARSHIPS.length],
              ['Universities profiled', UNIVERSITIES.length],
              ['Cities costed', CITIES.length],
              ['Sourced answers', KNOWLEDGE.length],
              ['Checklist steps', TOTAL_ITEMS],
              ['Interactive tools', 5],
            ].map(([label, value]) => (
              <div key={String(label)} className="card p-4">
                <dt className="label">{label}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="section-title">The rules I held myself to</h2>
          <div className="mt-5 space-y-3">
            {ABOUT.principles.map((p, i) => (
              <div key={p.title} className="card flex gap-4 p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-flag-blue text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink-900">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="section-title">How it is built</h2>
          <div className="card mt-5 divide-y divide-ink-100">
            {ABOUT.build.map((b) => (
              <div key={b.label} className="flex flex-wrap gap-2 p-4">
                <p className="w-32 shrink-0 text-sm font-semibold text-ink-900">{b.label}</p>
                <p className="flex-1 text-sm text-ink-600">{b.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            The three assistants are rules engines rather than a language model. That was a
            deliberate choice: a matcher that applies published eligibility rules can explain exactly
            which rule blocked you, and an answer box that only returns written entries cannot invent
            a deadline that someone then acts on.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Where the information comes from</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            Programme rules, dates, eligibility and coverage were taken from the official sites
            below. Every record in the app links back to the page it came from, and cost figures are
            labelled as planning estimates wherever they appear.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <SourceLink href="https://od.globaluni.ru" label="Open Doors" />
            <SourceLink href="https://od.globaluni.ru/rules" label="Open Doors official rules" />
            <SourceLink href="https://education-in-russia.com" label="Education in Russia" />
            <SourceLink href="https://studyinrussia.ru/en/" label="Study in Russia portal" />
          </div>
        </section>

        {contacts.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title">Contact</h2>
            <div className="card mt-5 divide-y divide-ink-100">
              {contacts.map((c) => (
                <div key={c.label} className="flex flex-wrap gap-2 p-4">
                  <p className="w-32 shrink-0 text-sm font-semibold text-ink-900">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href(c.value)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex-1 text-sm font-medium text-flag-blue hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="flex-1 text-sm text-ink-600">{c.value}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <div className="card p-6">
            <Pill tone="blue">Independent project</Pill>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {SITE.name} is not affiliated with any university, with Rossotrudnichestvo or with the
              Open Doors organisers, and it is not an official application channel. It is a planning
              tool. Confirm every deadline and rule on the official site before you act on it.
            </p>
            <p className="mt-4 text-sm text-ink-500">
              &copy; {SITE.year} {SITE.author}. Built independently.
            </p>
            <Link href="/" className="btn-primary mt-5">
              Back to the tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
