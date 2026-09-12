'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  DEFAULT_PROFILE,
  matchCities,
  matchScholarships,
  matchUniversities,
  type Profile,
} from '@/lib/advisor';
import { findAnswers, SUGGESTED_QUESTIONS } from '@/lib/answer';
import { TRACKS, SUBJECT_AREAS, type TrackId } from '@/data/openDoors';
import { TOPICS, KNOWLEDGE } from '@/data/knowledge';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Disclaimer, Money, PageHeader, Pill, SourceLink } from '@/components/ui';

type Tab = 'match' | 'ask';

export default function AdvisorPage() {
  const [tab, setTab] = useState<Tab>('match');

  return (
    <>
      <PageHeader
        eyebrow="Guided help"
        title="Advisor"
        intro="Two things at once: a matcher that turns your situation into a ranked shortlist, and a question box that answers from the same sourced data the rest of this app is built on."
      >
        <div className="mt-5 flex gap-1 rounded-lg border border-ink-200 bg-surface p-1">
          <button
            type="button"
            onClick={() => setTab('match')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition sm:flex-none ${
              tab === 'match' ? 'bg-flag-blue text-white' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Match my profile
          </button>
          <button
            type="button"
            onClick={() => setTab('ask')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition sm:flex-none ${
              tab === 'ask' ? 'bg-flag-blue text-white' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Ask a question
          </button>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {tab === 'match' ? <Matcher /> : <AskBox />}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ matcher */

function Matcher() {
  const { value: profile, setValue: setProfile } = useLocalStorage<Profile>(
    'sir.profile',
    DEFAULT_PROFILE
  );

  const scholarships = useMemo(() => matchScholarships(profile), [profile]);
  const universities = useMemo(() => matchUniversities(profile), [profile]);
  const cities = useMemo(() => matchCities(profile), [profile]);

  const set = (patch: Partial<Profile>) => setProfile({ ...profile, ...patch });

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="card space-y-5 p-5 lg:sticky lg:top-20 lg:self-start">
        <div>
          <label className="label" htmlFor="level">
            Study level
          </label>
          <select
            id="level"
            value={profile.level}
            onChange={(e) => set({ level: e.target.value as TrackId })}
            className="field mt-2"
          >
            {TRACKS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="age">
            Age: {profile.age}
          </label>
          <input
            id="age"
            type="range"
            min={16}
            max={42}
            value={profile.age}
            onChange={(e) => set({ age: Number(e.target.value) })}
            className="mt-3 w-full"
          />
        </div>

        <div>
          <label className="label" htmlFor="subject">
            Subject area
          </label>
          <select
            id="subject"
            value={profile.subjectArea}
            onChange={(e) => set({ subjectArea: e.target.value })}
            className="field mt-2"
          >
            {SUBJECT_AREAS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="budget">
            Monthly budget: <Money rub={profile.monthlyBudgetRub} round={1000} />
          </label>
          <input
            id="budget"
            type="range"
            min={15000}
            max={120000}
            step={2500}
            value={profile.monthlyBudgetRub}
            onChange={(e) => set({ monthlyBudgetRub: Number(e.target.value) })}
            className="mt-3 w-full"
          />
          <p className="mt-2 text-xs text-ink-500">What you can actually put in every month.</p>
        </div>

        <Choice
          label="Teaching language"
          value={profile.language}
          onChange={(v) => set({ language: v as Profile['language'] })}
          options={[
            ['english', 'English'],
            ['russian', 'Russian'],
            ['either', 'Either'],
          ]}
        />

        <Choice
          label="What matters most"
          value={profile.priority}
          onChange={(v) => set({ priority: v as Profile['priority'] })}
          options={[
            ['cost', 'Low cost'],
            ['reputation', 'Reputation'],
            ['research', 'Research'],
            ['english', 'English teaching'],
          ]}
        />

        <Choice
          label="Documented achievements"
          value={profile.achievements}
          onChange={(v) => set({ achievements: v as Profile['achievements'] })}
          options={[
            ['none', 'None yet'],
            ['some', 'Some'],
            ['strong', 'Strong'],
          ]}
        />

        <Choice
          label="Your Russian"
          value={profile.russianLevel}
          onChange={(v) => set({ russianLevel: v as Profile['russianLevel'] })}
          options={[
            ['none', 'None'],
            ['basic', 'Basic'],
            ['working', 'Working'],
          ]}
        />

        <Choice
          label="Winter tolerance"
          value={profile.climateTolerance}
          onChange={(v) => set({ climateTolerance: v as Profile['climateTolerance'] })}
          options={[
            ['any', 'Cold is fine'],
            ['mild', 'Prefer mild'],
          ]}
        />

        <button type="button" onClick={() => setProfile(DEFAULT_PROFILE)} className="btn-ghost w-full">
          Reset
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="section-title">Routes, ranked for you</h2>
          <div className="mt-4 space-y-3">
            {scholarships.map((m) => (
              <div
                key={m.scholarship.id}
                className={`card p-5 ${
                  m.verdict === 'Not eligible' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-ink-900">{m.scholarship.name}</h3>
                    <p className="mt-0.5 text-sm text-ink-500">{m.scholarship.provider}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Pill
                      tone={
                        m.verdict === 'Eligible'
                          ? 'green'
                          : m.verdict === 'Check carefully'
                            ? 'amber'
                            : 'red'
                      }
                    >
                      {m.verdict}
                    </Pill>
                    <span className="text-sm font-bold tabular-nums text-ink-900">{m.score}</span>
                  </div>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-flag-blue"
                    style={{ width: `${m.score}%` }}
                  />
                </div>

                {m.blockers.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {m.blockers.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-relaxed text-flag-red">
                        <span aria-hidden>&#10007;</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-3 space-y-1">
                  {m.reasons.map((r) => (
                    <li key={r} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                      <span className="mt-0.5 text-ink-400" aria-hidden>
                        &#8226;
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <SourceLink href={m.scholarship.officialUrl} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Universities worth your application</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {universities.map((m) => (
              <div key={m.university.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-ink-900">{m.university.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-500">{m.city.name}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-flag-blue">
                    {m.score}
                  </span>
                </div>

                <ul className="mt-3 space-y-1">
                  {m.reasons.map((r) => (
                    <li key={r} className="flex gap-2 text-xs leading-relaxed text-ink-700">
                      <span className="mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden>
                        &#10003;
                      </span>
                      {r}
                    </li>
                  ))}
                  {m.cautions.map((r) => (
                    <li key={r} className="flex gap-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400">
                      <span className="mt-0.5" aria-hidden>
                        !
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 border-t border-ink-100 pt-3 text-xs text-ink-500">
                  Dormitory living in {m.city.name} runs about{' '}
                  <span className="font-semibold text-ink-900">
                    <Money rub={m.monthlyFloorRub} round={500} />
                  </span>{' '}
                  a month.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Cities that fit your budget</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {cities.map((m) => (
              <div key={m.city.id} className="card p-5">
                <h3 className="text-sm font-bold text-ink-900">{m.city.name}</h3>
                <p className="mt-1 text-lg font-bold text-flag-blue">
                  <Money rub={m.monthlyFloorRub} round={500} />
                  <span className="text-xs font-normal text-ink-400"> /month</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">{m.reason}</p>
              </div>
            ))}
          </div>
          <Link href="/compare" className="btn-ghost mt-4">
            Compare these side by side
          </Link>
        </section>

        <Disclaimer>
          This matcher applies published eligibility rules and the cost data in this app. It cannot
          see your grades, your references or your competition, and it does not predict whether you
          will win. Use it to narrow a shortlist, then verify every rule on the official site.
        </Disclaimer>
      </div>
    </div>
  );
}

function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <p className="label">{label}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
              value === v
                ? 'border-flag-blue bg-flag-blue text-white'
                : 'border-ink-200 bg-surface text-ink-600 hover:border-ink-300'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ ask box */

function AskBox() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [topic, setTopic] = useState<string>('all');

  const results = useMemo(() => (submitted ? findAnswers(submitted, 3) : []), [submitted]);

  const browse = useMemo(
    () => (topic === 'all' ? KNOWLEDGE : KNOWLEDGE.filter((e) => e.topic === topic)),
    [topic]
  );

  const ask = (q: string) => {
    setQuery(q);
    setSubmitted(q);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(query);
          }}
          className="card p-5"
        >
          <label className="label" htmlFor="ask">
            Ask about scholarships, visas, housing or money
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="ask"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How much money do I need per month?"
              className="field"
            />
            <button type="submit" className="btn-primary shrink-0">
              Ask
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-600 transition hover:border-flag-blue hover:text-flag-blue"
              >
                {q}
              </button>
            ))}
          </div>
        </form>

        {submitted && (
          <div className="mt-6 space-y-4">
            {results.length === 0 ? (
              <div className="card p-6">
                <p className="text-sm font-semibold text-ink-900">
                  Nothing in the knowledge base matches that.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  This answers from a fixed set of sourced entries rather than generating text, so it
                  says nothing rather than guessing. Try different words, or browse the topics on the
                  right.
                </p>
              </div>
            ) : (
              results.map((r, i) => (
                <article key={r.entry.id} className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={i === 0 ? 'blue' : 'neutral'}>{r.entry.topic}</Pill>
                    {i === 0 && <Pill tone="green">Best match</Pill>}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-ink-900">{r.entry.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{r.entry.answer}</p>

                  {r.entry.points && (
                    <ul className="mt-3 space-y-1.5">
                      {r.entry.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm leading-relaxed text-ink-600">
                          <span className="mt-0.5 text-ink-400" aria-hidden>
                            &#8226;
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  {r.entry.sourceUrl && (
                    <div className="mt-4 border-t border-ink-100 pt-3">
                      <SourceLink href={r.entry.sourceUrl} label={r.entry.sourceLabel} />
                    </div>
                  )}

                  {r.entry.related && r.entry.related.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-ink-400">Related:</span>
                      {r.entry.related.map((id) => {
                        const e = KNOWLEDGE.find((k) => k.id === id);
                        if (!e) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => ask(e.question)}
                            className="text-xs font-medium text-flag-blue hover:underline"
                          >
                            {e.question}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        )}

        {!submitted && (
          <div className="mt-6 card p-6">
            <p className="text-sm font-semibold text-ink-900">How this answers</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Your question is matched against {KNOWLEDGE.length} written entries, each carrying the
              official source it came from. It does not generate new text and it will not invent a
              deadline. When nothing matches, it says so.
            </p>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="card p-5">
          <p className="label">Browse by topic</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setTopic('all')}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                topic === 'all'
                  ? 'border-flag-blue bg-flag-blue text-white'
                  : 'border-ink-200 text-ink-600'
              }`}
            >
              All
            </button>
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                  topic === t
                    ? 'border-flag-blue bg-flag-blue text-white'
                    : 'border-ink-200 text-ink-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <ul className="mt-4 space-y-2 border-t border-ink-100 pt-4">
            {browse.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => ask(e.question)}
                  className="text-left text-sm leading-snug text-ink-600 transition hover:text-flag-blue"
                >
                  {e.question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
