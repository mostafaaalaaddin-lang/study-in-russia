'use client';

import { useMemo, useState } from 'react';
import { CITIES } from '@/data/cities';
import {
  buildBudget,
  COLORS,
  HOUSING_LABEL,
  LIFESTYLE_LABEL,
  type HousingType,
  type LifestyleLevel,
} from '@/lib/budget';
import { Disclaimer, Money, PageHeader, Pill, StackedBar, Stat } from '@/components/ui';
import { useLocalStorage } from '@/lib/useLocalStorage';

const HOUSING: HousingType[] = ['dorm', 'sharedRoom', 'studio'];
const LIFESTYLES: LifestyleLevel[] = ['frugal', 'moderate', 'comfortable'];

type Saved = {
  cityId: string;
  housing: HousingType;
  lifestyle: LifestyleLevel;
  stipend: number;
  months: number;
};

const DEFAULTS: Saved = {
  cityId: 'kazan',
  housing: 'dorm',
  lifestyle: 'moderate',
  stipend: 3000,
  months: 12,
};

export default function CalculatorPage() {
  const { value: saved, setValue: setSaved } = useLocalStorage<Saved>('sir.budget', DEFAULTS);
  const [showOneOff, setShowOneOff] = useState(true);

  const city = CITIES.find((c) => c.id === saved.cityId) ?? CITIES[0];

  const budget = useMemo(
    () =>
      buildBudget({
        city,
        housing: saved.housing,
        lifestyle: saved.lifestyle,
        stipendRub: saved.stipend,
        months: saved.months,
      }),
    [city, saved.housing, saved.lifestyle, saved.stipend, saved.months]
  );

  const shortfall = budget.monthlyTotalRub - saved.stipend;
  const segments = budget.lines.map((l) => ({
    key: l.key,
    label: l.label,
    value: l.monthlyRub,
    color: COLORS[l.key] ?? '#94a3b8',
  }));

  const update = (patch: Partial<Saved>) => setSaved({ ...saved, ...patch });

  return (
    <>
      <PageHeader
        eyebrow="The part nobody funds"
        title="Cost of living calculator"
        intro="Tuition is the easy part to solve. This works out what a month actually costs in each city, what your stipend covers, and what you need to have arranged before you land."
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* ------------------------------------------------------- controls */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="card p-5">
              <label className="label" htmlFor="city">
                City
              </label>
              <select
                id="city"
                value={saved.cityId}
                onChange={(e) => update({ cityId: e.target.value })}
                className="field mt-2"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs leading-relaxed text-ink-500">{city.tagline}</p>

              <p className="label mt-5">Housing</p>
              <div className="mt-2 space-y-1.5">
                {HOUSING.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => update({ housing: h })}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                      saved.housing === h
                        ? 'border-flag-blue bg-flag-blue/5 font-semibold text-flag-blue'
                        : 'border-ink-200 text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    <span>{HOUSING_LABEL[h]}</span>
                    <span className="tabular-nums text-xs">
                      <Money rub={city.costs[h].min} round={500} />+
                    </span>
                  </button>
                ))}
              </div>

              <p className="label mt-5">Lifestyle</p>
              <div className="mt-2 flex gap-1.5">
                {LIFESTYLES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => update({ lifestyle: l })}
                    className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                      saved.lifestyle === l
                        ? 'border-flag-blue bg-flag-blue text-white'
                        : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    {LIFESTYLE_LABEL[l]}
                  </button>
                ))}
              </div>

              <label className="label mt-5" htmlFor="stipend">
                Monthly stipend, <Money rub={saved.stipend} round={100} />
              </label>
              <input
                id="stipend"
                type="range"
                min={0}
                max={10000}
                step={250}
                value={saved.stipend}
                onChange={(e) => update({ stipend: Number(e.target.value) })}
                className="mt-3 w-full"
              />
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                Reported state stipends run from roughly 1,500 roubles for bachelor students to
                around 6,500 for doctoral students.
              </p>

              <label className="label mt-5" htmlFor="months">
                Months a year: {saved.months}
              </label>
              <input
                id="months"
                type="range"
                min={9}
                max={12}
                step={1}
                value={saved.months}
                onChange={(e) => update({ months: Number(e.target.value) })}
                className="mt-3 w-full"
              />
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                Use nine or ten if you go home over the summer, twelve if you stay.
              </p>

              <button
                type="button"
                onClick={() => setSaved(DEFAULTS)}
                className="btn-ghost mt-5 w-full"
              >
                Reset
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------- results */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat
                label="Per month"
                value={<Money rub={budget.monthlyTotalRub} round={500} />}
                note={`${city.name}, ${HOUSING_LABEL[saved.housing].toLowerCase()}, ${LIFESTYLE_LABEL[
                  saved.lifestyle
                ].toLowerCase()}`}
              />
              <Stat
                label={`${saved.months} months`}
                value={<Money rub={budget.academicYearRub} round={1000} />}
                note="Recurring living costs only"
              />
              <Stat
                label="First year, all in"
                value={<Money rub={budget.firstYearTotalRub} round={1000} />}
                note="Living costs plus one-off arrival costs"
              />
            </div>

            <div className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-ink-900">Monthly breakdown</h2>
                <p className="text-sm text-ink-500">
                  {city.name} &middot; {HOUSING_LABEL[saved.housing]}
                </p>
              </div>

              <div className="mt-4">
                <StackedBar segments={segments} />
              </div>

              <table className="mt-5 w-full text-sm">
                <tbody>
                  {budget.lines.map((l) => (
                    <tr key={l.key} className="border-b border-ink-100 last:border-0">
                      <td className="py-3 pr-3 align-top">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: COLORS[l.key] ?? '#94a3b8' }}
                          />
                          <span className="font-medium text-ink-900">{l.label}</span>
                        </div>
                        <p className="mt-1 pl-[18px] text-xs leading-relaxed text-ink-500">{l.note}</p>
                      </td>
                      <td className="py-3 text-right align-top font-semibold tabular-nums text-ink-900">
                        <Money rub={l.monthlyRub} round={100} />
                      </td>
                      <td className="w-14 py-3 text-right align-top text-xs tabular-nums text-ink-400">
                        {Math.round((l.monthlyRub / budget.monthlyTotalRub) * 100)}%
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-3 font-bold text-ink-900">Total per month</td>
                    <td className="pt-3 text-right text-lg font-bold tabular-nums text-ink-900">
                      <Money rub={budget.monthlyTotalRub} round={100} />
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className={`p-5 sm:p-6 ${shortfall > 0 ? 'callout-danger' : 'callout-ok'}`}
            >
              <h2 className="text-lg font-bold text-ink-900">
                {shortfall > 0 ? 'What you still need to find' : 'Your stipend covers this'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {shortfall > 0 ? (
                  <>
                    A stipend of <Money rub={saved.stipend} round={100} /> leaves a gap of{' '}
                    <strong className="font-bold">
                      <Money rub={shortfall} round={100} />
                    </strong>{' '}
                    every month, which is{' '}
                    <strong className="font-bold">
                      <Money rub={shortfall * saved.months} round={1000} />
                    </strong>{' '}
                    across {saved.months} months. That is the number to have arranged before you
                    accept a place.
                  </>
                ) : (
                  <>
                    At this lifestyle the stipend covers your monthly costs. That is unusual, so
                    check the stipend figure against what your university actually pays.
                  </>
                )}
              </p>
            </div>

            <div className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-ink-900">One-off arrival costs</h2>
                <button
                  type="button"
                  onClick={() => setShowOneOff((v) => !v)}
                  className="text-sm font-semibold text-flag-blue hover:underline"
                >
                  {showOneOff ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="mt-1 text-sm text-ink-500">
                Paid once, mostly before you arrive. Easy to forget and hard to borrow for.
              </p>

              {showOneOff && (
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {budget.oneOffLines.map((l) => (
                      <tr key={l.key} className="border-b border-ink-100 last:border-0">
                        <td className="py-3 pr-3 align-top">
                          <span className="font-medium text-ink-900">{l.label}</span>
                          <p className="mt-1 text-xs leading-relaxed text-ink-500">{l.note}</p>
                        </td>
                        <td className="py-3 text-right align-top font-semibold tabular-nums text-ink-900">
                          <Money rub={l.monthlyRub} round={500} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="pt-3 font-bold text-ink-900">Total one-off</td>
                      <td className="pt-3 text-right text-lg font-bold tabular-nums text-ink-900">
                        <Money rub={budget.oneOffTotalRub} round={500} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-bold text-ink-900">About {city.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="blue">{city.region}</Pill>
                <Pill tone={city.climate.winterLowC <= -15 ? 'red' : 'neutral'}>
                  Winter lows near {city.climate.winterLowC}&deg;C
                </Pill>
                <Pill tone="neutral">Summer highs near {city.climate.summerHighC}&deg;C</Pill>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {city.studentPopulationNote}
              </p>
              <ul className="mt-3 space-y-1.5">
                {city.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                    <span className="mt-0.5 text-ink-400" aria-hidden>
                      &#8226;
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <Disclaimer>
              These are indicative cost bands, not quotes. Rents and food prices move quickly, and
              the flight figure in particular depends entirely on where you are flying from. Treat
              the output as a planning baseline and check the big lines against real listings.
            </Disclaimer>
          </div>
        </div>
      </div>
    </>
  );
}
