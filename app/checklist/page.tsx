'use client';

import { useMemo } from 'react';
import { PHASES, TOTAL_ITEMS } from '@/data/checklist';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Disclaimer, PageHeader, Pill } from '@/components/ui';

export default function ChecklistPage() {
  const { value: done, setValue: setDone } = useLocalStorage<Record<string, boolean>>(
    'sir.checklist',
    {}
  );

  const doneCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const pct = Math.round((doneCount / TOTAL_ITEMS) * 100);

  const toggle = (id: string) => setDone({ ...done, [id]: !done[id] });

  return (
    <>
      <PageHeader
        eyebrow="From first search to first week"
        title="Application checklist"
        intro={`${TOTAL_ITEMS} steps in the order they actually have to happen, with the slow ones flagged. Your progress is saved in this browser, so you can close the tab and come back.`}
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="card sticky top-20 z-30 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-ink-900">
                {doneCount} of {TOTAL_ITEMS} complete
              </p>
              <p className="mt-0.5 text-xs text-ink-500">Saved in this browser only</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tabular-nums text-flag-blue">{pct}%</span>
              <button
                type="button"
                onClick={() => setDone({})}
                className="btn-ghost px-3 py-1.5 text-xs"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-flag-blue transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {PHASES.map((phase, pi) => {
            const phaseDone = phase.items.filter((i) => done[i.id]).length;
            const complete = phaseDone === phase.items.length;

            return (
              <section key={phase.id} className="card overflow-hidden">
                <div className="border-b border-ink-200 bg-ink-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            complete ? 'bg-emerald-500 text-white' : 'bg-flag-blue text-white'
                          }`}
                        >
                          {complete ? '✓' : pi + 1}
                        </span>
                        <h2 className="text-lg font-bold text-ink-900">{phase.title}</h2>
                      </div>
                      <p className="mt-1 text-sm text-ink-500">{phase.window}</p>
                    </div>
                    <Pill tone={complete ? 'green' : 'neutral'}>
                      {phaseDone}/{phase.items.length}
                    </Pill>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{phase.intro}</p>
                </div>

                <ul className="divide-y divide-ink-100">
                  {phase.items.map((item) => {
                    const on = Boolean(done[item.id]);
                    return (
                      <li key={item.id}>
                        <label className="flex cursor-pointer items-start gap-3 p-4 transition hover:bg-ink-50">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggle(item.id)}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-flag-blue"
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={`flex flex-wrap items-center gap-2 text-sm font-medium ${
                                on ? 'text-ink-400 line-through' : 'text-ink-900'
                              }`}
                            >
                              {item.label}
                              {item.critical && !on && <Pill tone="red">Critical</Pill>}
                            </span>
                            {item.detail && (
                              <span
                                className={`mt-1 block text-xs leading-relaxed ${
                                  on ? 'text-ink-300' : 'text-ink-500'
                                }`}
                              >
                                {item.detail}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-10">
          <Disclaimer>
            Document requirements and registration deadlines differ by country and by university,
            and the migration rules in particular carry real penalties. Treat this as a planning
            spine and confirm each legal step with your university international office and your
            local Russian mission.
          </Disclaimer>
        </div>
      </div>
    </>
  );
}
