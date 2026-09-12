'use client';

import { useState } from 'react';
import { CITIES, type City } from '@/data/cities';
import { UNIVERSITIES } from '@/data/universities';
import { Disclaimer, Money, PageHeader, Pill } from '@/components/ui';

const MAX = 3;

function monthlyFloor(c: City) {
  return (
    c.costs.dorm.min +
    c.costs.food.min +
    c.costs.transport +
    c.costs.connectivity +
    c.costs.misc.min
  );
}

function monthlyPrivate(c: City) {
  return (
    c.costs.sharedRoom.min +
    c.costs.utilities.min +
    c.costs.food.min +
    c.costs.transport +
    c.costs.connectivity +
    c.costs.misc.min
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['moscow', 'kazan', 'tomsk']);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const cities = selected
    .map((id) => CITIES.find((c) => c.id === id))
    .filter((c): c is City => Boolean(c));

  const cheapestFloor = Math.min(...cities.map(monthlyFloor));

  const rows: { label: string; render: (c: City) => React.ReactNode; highlight?: boolean }[] = [
    {
      label: 'Dormitory living, per month',
      render: (c) => <Money rub={monthlyFloor(c)} round={500} />,
      highlight: true,
    },
    {
      label: 'Shared flat living, per month',
      render: (c) => <Money rub={monthlyPrivate(c)} round={500} />,
    },
    {
      label: 'Dormitory fee',
      render: (c) => (
        <>
          <Money rub={c.costs.dorm.min} round={100} /> to <Money rub={c.costs.dorm.max} round={100} />
        </>
      ),
    },
    {
      label: 'Room in a shared flat',
      render: (c) => (
        <>
          <Money rub={c.costs.sharedRoom.min} round={500} /> to{' '}
          <Money rub={c.costs.sharedRoom.max} round={500} />
        </>
      ),
    },
    {
      label: 'Own studio',
      render: (c) => (
        <>
          <Money rub={c.costs.studio.min} round={500} /> to{' '}
          <Money rub={c.costs.studio.max} round={500} />
        </>
      ),
    },
    {
      label: 'Food',
      render: (c) => (
        <>
          <Money rub={c.costs.food.min} round={500} /> to <Money rub={c.costs.food.max} round={500} />
        </>
      ),
    },
    {
      label: 'Student transport card',
      render: (c) => <Money rub={c.costs.transport} round={50} />,
    },
    {
      label: 'Utilities, if renting',
      render: (c) => (
        <>
          <Money rub={c.costs.utilities.min} round={100} /> to{' '}
          <Money rub={c.costs.utilities.max} round={100} />
        </>
      ),
    },
    {
      label: 'Winter lows',
      render: (c) => <span className="tabular-nums">{c.climate.winterLowC}&deg;C</span>,
    },
    {
      label: 'Summer highs',
      render: (c) => <span className="tabular-nums">{c.climate.summerHighC}&deg;C</span>,
    },
    {
      label: 'Universities here',
      render: (c) => (
        <span className="text-sm">
          {c.universities
            .map((id) => UNIVERSITIES.find((u) => u.id === id)?.shortName)
            .filter(Boolean)
            .join(', ') || '—'}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Location is a budget decision"
        title="Compare cities"
        intro="The same scholarship funds a very different life depending on where you land. Pick up to three cities and put the numbers next to each other."
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card p-5">
          <p className="label">Choose up to {MAX} cities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CITIES.map((c) => {
              const on = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    on
                      ? 'border-flag-blue bg-flag-blue text-white'
                      : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Selecting a fourth city replaces the oldest choice.
          </p>
        </div>

        {cities.length === 0 ? (
          <p className="card mt-6 p-8 text-center text-sm text-ink-500">
            Select at least one city to compare.
          </p>
        ) : (
          <div className="card mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="p-4 text-left font-semibold text-ink-500">&nbsp;</th>
                  {cities.map((c) => (
                    <th key={c.id} className="p-4 text-left">
                      <p className="text-base font-bold text-ink-900">{c.name}</p>
                      <p className="mt-0.5 text-xs font-normal text-ink-500">{c.region}</p>
                      {monthlyFloor(c) === cheapestFloor && cities.length > 1 && (
                        <span className="mt-2 inline-block">
                          <Pill tone="green">Cheapest here</Pill>
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.label}
                    className={`border-b border-ink-100 last:border-0 ${
                      r.highlight ? 'bg-flag-blue/5' : ''
                    }`}
                  >
                    <td
                      className={`p-4 align-top text-ink-600 ${r.highlight ? 'font-semibold text-ink-900' : ''}`}
                    >
                      {r.label}
                    </td>
                    {cities.map((c) => (
                      <td
                        key={c.id}
                        className={`p-4 align-top tabular-nums text-ink-900 ${
                          r.highlight ? 'text-base font-bold' : ''
                        }`}
                      >
                        {r.render(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cities.length > 1 && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cities.map((c) => (
              <div key={c.id} className="card p-5">
                <p className="text-base font-bold text-ink-900">{c.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{c.tagline}</p>
                <ul className="mt-3 space-y-1.5">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                      <span className="mt-0.5 text-ink-400" aria-hidden>
                        &#8226;
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </>
  );
}
