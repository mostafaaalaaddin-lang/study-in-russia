'use client';

import { useMemo, useState } from 'react';
import { SCHOLARSHIPS, type Level } from '@/data/scholarships';
import { Check, Disclaimer, Money, PageHeader, Pill, SourceLink } from '@/components/ui';

const LEVELS: (Level | 'Any')[] = [
  'Any',
  'Preparatory year',
  'Bachelor',
  'Master',
  'PhD',
  'Postdoctoral',
];

export default function ScholarshipsPage() {
  const [level, setLevel] = useState<Level | 'Any'>('Any');
  const [fullTuitionOnly, setFullTuitionOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>('open-doors');

  const list = useMemo(
    () =>
      SCHOLARSHIPS.filter((s) => {
        if (level !== 'Any' && !s.levels.includes(level)) return false;
        if (fullTuitionOnly && s.coverage.tuition !== 'Full') return false;
        return true;
      }),
    [level, fullTuitionOnly]
  );

  return (
    <>
      <PageHeader
        eyebrow="Funded routes"
        title="Every way to study in Russia without paying tuition"
        intro="Six routes, what each one actually covers, and the part of the cost each one quietly leaves with you. Two of them are national competitions; the rest are worth knowing about because most applicants never hear of them."
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card flex flex-wrap items-end gap-4 p-4">
          <div>
            <span className="label">Study level</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    level === l
                      ? 'border-flag-blue bg-flag-blue text-white'
                      : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2 pb-1.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={fullTuitionOnly}
              onChange={(e) => setFullTuitionOnly(e.target.checked)}
              className="h-4 w-4 rounded border-ink-300 text-flag-blue"
            />
            Full tuition only
          </label>
          <p className="ml-auto pb-1.5 text-sm text-ink-500">
            {list.length} of {SCHOLARSHIPS.length} shown
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {list.map((s) => {
            const open = openId === s.id;
            return (
              <article
                key={s.id}
                className={`card overflow-hidden ${s.featured ? 'border-flag-blue/40' : ''}`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-ink-900">{s.name}</h2>
                        {s.featured && <Pill tone="red">Main route</Pill>}
                      </div>
                      <p className="mt-1 text-sm text-ink-500">{s.provider}</p>
                    </div>
                    <Pill
                      tone={
                        s.competitiveness === 'Very high'
                          ? 'red'
                          : s.competitiveness === 'High'
                            ? 'amber'
                            : 'green'
                      }
                    >
                      {s.competitiveness} competition
                    </Pill>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700">{s.summary}</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="label">Levels</p>
                      <p className="mt-1 text-sm text-ink-800">{s.levels.join(', ')}</p>
                    </div>
                    <div>
                      <p className="label">Tuition</p>
                      <p className="mt-1 text-sm text-ink-800">{s.coverage.tuition}</p>
                    </div>
                    <div>
                      <p className="label">Monthly stipend</p>
                      <p className="mt-1 text-sm text-ink-800">
                        {s.stipendRub ? (
                          <>
                            <Money rub={s.stipendRub.min} round={100} /> to{' '}
                            <Money rub={s.stipendRub.max} round={100} />
                          </>
                        ) : (
                          'Varies or none'
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="label">Window</p>
                      <p className="mt-1 text-sm text-ink-800">{s.applicationWindow}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg bg-ink-50 px-4 py-3 text-sm">
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.stipend} /> Stipend
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.dormitoryPlace} /> Dormitory place
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.dormitoryFeePaid} /> Dormitory fee paid
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.flights} /> Flights
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.insurance} /> Insurance
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <Check on={s.coverage.livingCosts} /> Living costs
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : s.id)}
                      className="btn-ghost"
                      aria-expanded={open}
                    >
                      {open ? 'Hide details' : 'How to apply'}
                    </button>
                    <SourceLink href={s.officialUrl} />
                    <span className="text-sm text-ink-500">{s.costToApply}</span>
                  </div>
                </div>

                {open && (
                  <div className="grid gap-6 border-t border-ink-200 bg-ink-50 p-5 sm:p-6 lg:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">Who can apply</h3>
                      <ul className="mt-2 space-y-1.5">
                        {s.eligibility.map((e) => (
                          <li key={e} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                            <span className="mt-0.5 text-ink-400" aria-hidden>
                              &#8226;
                            </span>
                            {e}
                          </li>
                        ))}
                      </ul>

                      <h3 className="mt-5 text-sm font-bold text-ink-900">Language</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.languageNote}</p>

                      <h3 className="mt-5 text-sm font-bold text-ink-900">Not covered</h3>
                      <ul className="mt-2 space-y-1.5">
                        {s.notCovered.map((e) => (
                          <li key={e} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                            <span className="mt-0.5 font-bold text-flag-red" aria-hidden>
                              &#10007;
                            </span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-ink-900">Steps</h3>
                      <ol className="mt-2 space-y-2">
                        {s.steps.map((step, i) => (
                          <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flag-blue text-[11px] font-bold text-white">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>

                      <h3 className="mt-5 text-sm font-bold text-flag-red">Watch out</h3>
                      <ul className="mt-2 space-y-1.5">
                        {s.watchOut.map((w) => (
                          <li key={w} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                            <span className="mt-0.5 font-bold text-flag-red" aria-hidden>
                              !
                            </span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </>
  );
}
