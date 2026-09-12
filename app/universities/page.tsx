'use client';

import { useMemo, useState } from 'react';
import { UNIVERSITIES } from '@/data/universities';
import { CITY_BY_ID } from '@/data/cities';
import { SUBJECT_AREAS } from '@/data/openDoors';
import { Disclaimer, Money, PageHeader, Pill, SourceLink } from '@/components/ui';

type SortKey = 'name' | 'tuition' | 'city';

export default function UniversitiesPage() {
  const [subject, setSubject] = useState('any');
  const [english, setEnglish] = useState(false);
  const [openDoorsOnly, setOpenDoorsOnly] = useState(false);
  const [maxTuition, setMaxTuition] = useState(900000);
  const [sort, setSort] = useState<SortKey>('tuition');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const filtered = UNIVERSITIES.filter((u) => {
      if (subject !== 'any' && !u.subjectAreas.includes(subject)) return false;
      if (english && u.englishTaught === 'Limited') return false;
      if (openDoorsOnly && !u.openDoorsParticipant) return false;
      if (u.tuitionRub.min > maxTuition) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const city = CITY_BY_ID[u.cityId];
        const hay = `${u.name} ${u.shortName} ${city.name} ${u.strengths.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (sort === 'tuition') return a.tuitionRub.min - b.tuitionRub.min;
      if (sort === 'city') return CITY_BY_ID[a.cityId].name.localeCompare(CITY_BY_ID[b.cityId].name);
      return a.name.localeCompare(b.name);
    });
  }, [subject, english, openDoorsOnly, maxTuition, sort, query]);

  return (
    <>
      <PageHeader
        eyebrow="Where to apply"
        title="Universities"
        intro="Sixteen universities with the things that actually change your decision: what they are strong at, whether they teach in English, what self-funded tuition would cost, and what living in that city costs before you even start."
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card grid gap-4 p-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <div>
            <label className="label" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, city or strength"
              className="field mt-2"
            />
          </div>

          <div>
            <label className="label" htmlFor="subject">
              Subject area
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="field mt-2"
            >
              <option value="any">Any subject area</option>
              {SUBJECT_AREAS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="tuition">
              Tuition from, at most <Money rub={maxTuition} round={10000} /> a year
            </label>
            <input
              id="tuition"
              type="range"
              min={150000}
              max={900000}
              step={10000}
              value={maxTuition}
              onChange={(e) => setMaxTuition(Number(e.target.value))}
              className="mt-4 w-full"
            />
          </div>

          <div className="flex flex-col justify-end gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={english}
                onChange={(e) => setEnglish(e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-flag-blue"
              />
              English-taught available
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={openDoorsOnly}
                onChange={(e) => setOpenDoorsOnly(e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-flag-blue"
              />
              Open Doors participants
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-500">
            {list.length} of {UNIVERSITIES.length} universities
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-500">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="field w-auto py-1.5"
            >
              <option value="tuition">Lowest tuition</option>
              <option value="name">Name</option>
              <option value="city">City</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {list.map((u) => {
            const city = CITY_BY_ID[u.cityId];
            const dormFloor =
              city.costs.dorm.min +
              city.costs.food.min +
              city.costs.transport +
              city.costs.connectivity +
              city.costs.misc.min;

            return (
              <article key={u.id} className="card flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-ink-900">{u.name}</h2>
                    <p className="mt-0.5 text-sm text-ink-500">
                      {city.name} &middot; founded {u.founded}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Pill tone={u.reputation === 'Global' ? 'blue' : 'neutral'}>{u.reputation}</Pill>
                    {u.openDoorsParticipant && <Pill tone="red">Open Doors</Pill>}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-600">{u.note}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {u.strengths.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-ink-100 px-2 py-1 text-xs font-medium text-ink-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-ink-100 pt-4 text-sm">
                  <div>
                    <dt className="label">Tuition a year</dt>
                    <dd className="mt-1 font-semibold text-ink-900">
                      <Money rub={u.tuitionRub.min} round={10000} /> +
                    </dd>
                  </div>
                  <div>
                    <dt className="label">English</dt>
                    <dd className="mt-1 font-semibold text-ink-900">{u.englishTaught}</dd>
                  </div>
                  <div>
                    <dt className="label">Living, dorm</dt>
                    <dd className="mt-1 font-semibold text-ink-900">
                      <Money rub={dormFloor} round={1000} />
                      <span className="text-xs font-normal text-ink-400"> /mo</span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 pt-1">
                  <SourceLink href={u.site} label="University site" />
                </div>
              </article>
            );
          })}
        </div>

        {list.length === 0 && (
          <p className="card mt-6 p-8 text-center text-sm text-ink-500">
            Nothing matches those filters. Widen the tuition range or clear the subject area.
          </p>
        )}

        <div className="mt-10">
          <Disclaimer>
            Tuition bands are indicative annual figures for self-funded international students and
            vary widely by faculty. Medicine is almost always the most expensive programme at any
            university. Confirm on the university site before budgeting.
          </Disclaimer>
        </div>
      </div>
    </>
  );
}
