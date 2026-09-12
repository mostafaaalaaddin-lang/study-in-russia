'use client';

import { useMemo, useState } from 'react';
import { reviewLetter, LETTER_STRUCTURE_GUIDE, type Severity } from '@/lib/letterReview';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Disclaimer, PageHeader, Pill } from '@/components/ui';

const SAMPLE = `I am writing to express my interest in the Master's programme in your world-class university. Since childhood I have always been fascinated by computers and technology. Studying in Russia has been my dream for many years because of its rich culture and great country.

During my bachelor degree I studied many subjects and got good results in various courses. I am a hard worker and a fast learner. I believe that education is the key to making the world a better place.

I hope you will consider my application. It would be an honour to study at your prestigious university.`;

const TONE: Record<Severity, 'green' | 'amber' | 'red'> = {
  good: 'green',
  warning: 'amber',
  problem: 'red',
};

const HEADING: Record<Severity, string> = {
  problem: 'Fix these',
  warning: 'Worth improving',
  good: 'Working well',
};

export default function LetterPage() {
  const { value: text, setValue: setText } = useLocalStorage<string>('sir.letter', '');
  const [checked, setChecked] = useState(false);

  const review = useMemo(() => (text.trim() ? reviewLetter(text) : null), [text]);
  const show = checked && review;

  const grouped = useMemo(() => {
    if (!review) return null;
    return {
      problem: review.findings.filter((f) => f.severity === 'problem'),
      warning: review.findings.filter((f) => f.severity === 'warning'),
      good: review.findings.filter((f) => f.severity === 'good'),
    };
  }, [review]);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio component"
        title="Motivation letter review"
        intro="The Open Doors portfolio asks for a separate motivation letter in every subject area you enter, and portfolio results cannot be appealed. This checks your draft against the things reviewers can actually count, before you submit it."
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* ---------------------------------------------------------- input */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <label className="label" htmlFor="letter">
                  Your draft
                </label>
                <div className="flex gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setText(SAMPLE);
                      setChecked(false);
                    }}
                    className="font-medium text-flag-blue hover:underline"
                  >
                    Load a weak example
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setText('');
                      setChecked(false);
                    }}
                    className="font-medium text-ink-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                id="letter"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setChecked(false);
                }}
                rows={18}
                placeholder="Paste your motivation letter here. Nothing leaves your browser."
                className="field mt-3 resize-y font-normal leading-relaxed"
              />

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-ink-500">
                  {text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Empty'} &middot; saved
                  in your browser only
                </p>
                <button
                  type="button"
                  onClick={() => setChecked(true)}
                  disabled={!text.trim()}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review it
                </button>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-base font-bold text-ink-900">The structure that works</h2>
              <ol className="mt-4 space-y-4">
                {LETTER_STRUCTURE_GUIDE.map((g, i) => (
                  <li key={g.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flag-blue text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink-900">{g.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{g.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* --------------------------------------------------------- output */}
          <div className="space-y-4">
            {!show ? (
              <div className="card flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
                <p className="text-base font-semibold text-ink-900">No review yet</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
                  Paste a draft and press review. Your text is analysed in your own browser and is
                  never uploaded anywhere.
                </p>
              </div>
            ) : (
              <>
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b border-ink-200 bg-slab px-5 py-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slab-muted">
                        Assessment
                      </p>
                      <p className="mt-1 text-xl font-bold text-slab-fg">{review.band}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold tabular-nums text-slab-fg">{review.score}</p>
                      <p className="text-xs text-slab-muted">out of 100</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-ink-100">
                    {[
                      ['Words', review.wordCount],
                      ['Sentences', review.sentenceCount],
                      ['Paragraphs', review.paragraphCount],
                      ['Avg sentence', review.avgSentenceWords],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="p-3 text-center">
                        <p className="text-lg font-bold tabular-nums text-ink-900">{value}</p>
                        <p className="mt-0.5 text-[11px] text-ink-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {(['problem', 'warning', 'good'] as Severity[]).map((sev) => {
                  const items = grouped?.[sev] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <div key={sev} className="card p-5">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-ink-900">{HEADING[sev]}</h2>
                        <Pill tone={TONE[sev]}>{items.length}</Pill>
                      </div>
                      <ul className="mt-4 space-y-4">
                        {items.map((f) => (
                          <li key={f.id} className="border-l-2 border-ink-200 pl-4">
                            <p className="text-sm font-bold text-ink-900">{f.label}</p>
                            <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.message}</p>
                            {f.evidence.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {f.evidence.map((e) => (
                                  <code
                                    key={e}
                                    className="rounded bg-ink-100 px-1.5 py-0.5 text-xs text-ink-700"
                                  >
                                    {e}
                                  </code>
                                ))}
                              </div>
                            )}
                            {f.fix && (
                              <p className="mt-2 rounded-lg bg-flag-blue/5 px-3 py-2 text-sm leading-relaxed text-ink-700">
                                <span className="font-semibold text-flag-blue">Try this. </span>
                                {f.fix}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                <Disclaimer>
                  This is a rules engine, not a language model. It counts length, structure, stock
                  phrases, named specifics and evidence verbs. It cannot tell you whether your
                  argument is convincing or whether your research idea is any good, and a high score
                  here is not a prediction that you will win.
                </Disclaimer>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
