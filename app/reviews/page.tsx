'use client';

import { useMemo, useState } from 'react';
import {
  SAMPLE_REVIEWS,
  SAMPLE_NOTICE,
  ROUTES,
  type Review,
  type Route,
} from '@/data/reviews';
import { CITIES, CITY_BY_ID } from '@/data/cities';
import { UNIVERSITY_BY_ID } from '@/data/universities';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { PageHeader, Pill } from '@/components/ui';

type Draft = {
  displayName: string;
  route: Route;
  level: string;
  subject: string;
  cityId: string;
  yearStarted: number;
  rating: 1 | 2 | 3 | 4 | 5;
  headline: string;
  body: string;
  bestPart: string;
  hardestPart: string;
  costSurprise: string;
  adviceForApplicants: string;
};

const EMPTY: Draft = {
  displayName: '',
  route: 'Open Doors',
  level: "Master's",
  subject: '',
  cityId: 'moscow',
  yearStarted: 2025,
  rating: 4,
  headline: '',
  body: '',
  bestPart: '',
  hardestPart: '',
  costSurprise: '',
  adviceForApplicants: '',
};

function Stars({ n }: { n: number }) {
  return (
    <span className="text-sm tracking-wide text-amber-500 dark:text-amber-400" aria-label={`${n} out of 5`}>
      {'★'.repeat(n)}
      <span className="text-ink-300">{'★'.repeat(5 - n)}</span>
    </span>
  );
}

export default function ReviewsPage() {
  const { value: mine, setValue: setMine } = useLocalStorage<Review[]>('sir.reviews', []);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [writing, setWriting] = useState(false);
  const [routeFilter, setRouteFilter] = useState<Route | 'all'>('all');
  const [copied, setCopied] = useState(false);

  const all = useMemo(() => [...mine, ...SAMPLE_REVIEWS], [mine]);

  const shown = useMemo(
    () => (routeFilter === 'all' ? all : all.filter((r) => r.route === routeFilter)),
    [all, routeFilter]
  );

  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });

  const canSubmit =
    draft.displayName.trim().length > 1 &&
    draft.headline.trim().length > 5 &&
    draft.body.trim().length > 40;

  const submit = () => {
    const review: Review = {
      ...draft,
      id: `own-${Date.now()}`,
      kind: 'real',
    };
    setMine([review, ...mine]);
    setDraft(EMPTY);
    setWriting(false);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(mine, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="What it is actually like"
        title="Student voices"
        intro="Official pages tell you what a scholarship covers. They do not tell you which cost caught someone out, or which part of the process took six weeks longer than expected. This is where that goes."
      >
        <button type="button" onClick={() => setWriting((v) => !v)} className="btn-primary mt-5">
          {writing ? 'Close the form' : 'Share your experience'}
        </button>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="callout-warn p-4">
          <p className="text-sm font-semibold">About the entries marked illustrative</p>
          <p className="mt-1 text-sm leading-relaxed opacity-90">{SAMPLE_NOTICE}</p>
        </div>

        {/* ------------------------------------------------------------- form */}
        {writing && (
          <div className="card mt-6 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-ink-900">Write your review</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              Saved in this browser only. Nothing is sent anywhere, and nobody else sees it until you
              export it and add it to the site yourself.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="label">Name or handle</span>
                <input
                  value={draft.displayName}
                  onChange={(e) => set({ displayName: e.target.value })}
                  placeholder="How you want to be credited"
                  className="field mt-2"
                />
              </label>

              <label className="block">
                <span className="label">Route</span>
                <select
                  value={draft.route}
                  onChange={(e) => set({ route: e.target.value as Route })}
                  className="field mt-2"
                >
                  {ROUTES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="label">Level</span>
                <input
                  value={draft.level}
                  onChange={(e) => set({ level: e.target.value })}
                  placeholder="Bachelor, Master's, PhD"
                  className="field mt-2"
                />
              </label>

              <label className="block">
                <span className="label">Subject</span>
                <input
                  value={draft.subject}
                  onChange={(e) => set({ subject: e.target.value })}
                  placeholder="What you study"
                  className="field mt-2"
                />
              </label>

              <label className="block">
                <span className="label">City</span>
                <select
                  value={draft.cityId}
                  onChange={(e) => set({ cityId: e.target.value })}
                  className="field mt-2"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="label">Year you started: {draft.yearStarted}</span>
                <input
                  type="range"
                  min={2018}
                  max={2027}
                  value={draft.yearStarted}
                  onChange={(e) => set({ yearStarted: Number(e.target.value) })}
                  className="mt-4 w-full"
                />
              </label>
            </div>

            <div className="mt-4">
              <span className="label">Overall</span>
              <div className="mt-2 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => set({ rating: n as Draft['rating'] })}
                    className={`h-9 w-9 rounded-lg border text-sm font-semibold transition ${
                      draft.rating === n
                        ? 'border-flag-blue bg-flag-blue text-white'
                        : 'border-ink-200 text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 block">
              <span className="label">One line that sums it up</span>
              <input
                value={draft.headline}
                onChange={(e) => set({ headline: e.target.value })}
                placeholder="The competition was fair. The paperwork afterwards was the hard part."
                className="field mt-2"
              />
            </label>

            <label className="mt-4 block">
              <span className="label">What actually happened</span>
              <textarea
                value={draft.body}
                onChange={(e) => set({ body: e.target.value })}
                rows={5}
                placeholder="The specific things a future applicant cannot find on an official page."
                className="field mt-2 resize-y"
              />
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="label">Best part</span>
                <textarea
                  value={draft.bestPart}
                  onChange={(e) => set({ bestPart: e.target.value })}
                  rows={2}
                  className="field mt-2 resize-y"
                />
              </label>
              <label className="block">
                <span className="label">Hardest part</span>
                <textarea
                  value={draft.hardestPart}
                  onChange={(e) => set({ hardestPart: e.target.value })}
                  rows={2}
                  className="field mt-2 resize-y"
                />
              </label>
              <label className="block">
                <span className="label">The cost that surprised you</span>
                <textarea
                  value={draft.costSurprise}
                  onChange={(e) => set({ costSurprise: e.target.value })}
                  rows={2}
                  className="field mt-2 resize-y"
                />
              </label>
              <label className="block">
                <span className="label">Advice for applicants today</span>
                <textarea
                  value={draft.adviceForApplicants}
                  onChange={(e) => set({ adviceForApplicants: e.target.value })}
                  rows={2}
                  className="field mt-2 resize-y"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add my review
              </button>
              <button type="button" onClick={() => setDraft(EMPTY)} className="btn-ghost">
                Clear
              </button>
              {!canSubmit && (
                <p className="text-xs text-ink-500">
                  Needs a name, a headline and at least a couple of sentences of detail.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="label">Route</span>
          <button
            type="button"
            onClick={() => setRouteFilter('all')}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              routeFilter === 'all'
                ? 'border-flag-blue bg-flag-blue text-white'
                : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
            }`}
          >
            All
          </button>
          {ROUTES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRouteFilter(r)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                routeFilter === r
                  ? 'border-flag-blue bg-flag-blue text-white'
                  : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
              }`}
            >
              {r}
            </button>
          ))}
          <span className="ml-auto text-sm text-ink-500">{shown.length} shown</span>
        </div>

        {/* ----------------------------------------------------------- reviews */}
        <div className="mt-5 space-y-4">
          {shown.map((r) => {
            const city = CITY_BY_ID[r.cityId];
            const uni = r.universityId ? UNIVERSITY_BY_ID[r.universityId] : undefined;
            const sample = r.kind === 'sample';

            return (
              <article
                key={r.id}
                className={`card p-5 sm:p-6 ${sample ? 'border-dashed' : 'border-flag-blue/30'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-bold text-ink-900">{r.displayName}</p>
                      {sample ? (
                        <Pill tone="amber">Illustrative, not a real student</Pill>
                      ) : (
                        <Pill tone="green">Submitted in this browser</Pill>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink-500">
                      {r.level} in {r.subject || 'an unnamed subject'} &middot;{' '}
                      {uni ? `${uni.shortName}, ` : ''}
                      {city?.name ?? 'unknown city'} &middot; started {r.yearStarted}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Pill tone="blue">{r.route}</Pill>
                    <Stars n={r.rating} />
                  </div>
                </div>

                <p className="mt-4 text-base font-semibold leading-snug text-ink-900">
                  {r.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{r.body}</p>

                <dl className="mt-5 grid gap-4 border-t border-ink-100 pt-4 sm:grid-cols-2">
                  {[
                    ['Best part', r.bestPart],
                    ['Hardest part', r.hardestPart],
                    ['Cost that surprised them', r.costSurprise],
                    ['Advice for applicants', r.adviceForApplicants],
                  ]
                    .filter(([, v]) => Boolean(v))
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt className="label">{label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-600">{value}</dd>
                      </div>
                    ))}
                </dl>
              </article>
            );
          })}
        </div>

        {/* ------------------------------------------------------------ export */}
        {mine.length > 0 && (
          <div className="card mt-8 p-5">
            <h2 className="text-base font-bold text-ink-900">Your submissions</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              {mine.length} review{mine.length === 1 ? '' : 's'} saved in this browser. Copy them as
              JSON and paste them into the reviews data file to publish them for everyone.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={copyJson} className="btn-ghost">
                {copied ? 'Copied' : 'Copy as JSON'}
              </button>
              <button type="button" onClick={() => setMine([])} className="btn-ghost">
                Delete mine
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
