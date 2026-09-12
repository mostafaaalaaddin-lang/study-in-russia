# Study in Russia

**Live site:** <https://mostafaaalaaddin-lang.github.io/study-in-russia/>

A planning tool for international applicants to Russian universities. It covers the two national
funded routes in depth, with the Open Doors competition as the centrepiece, and then does the part
most scholarship guides skip: what the award does not pay for, and what that actually costs month by
month in each city.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS. Everything runs in the browser and
exports to static files, so it can be hosted anywhere.

## Running it

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>.

To produce a static build in `out/`, ready to upload to any host:

```bash
npm run build
```

To rebuild and republish to GitHub Pages in one step:

```bash
npm run deploy
```

That builds with the `/study-in-russia` base path a project site needs, writes
`.nojekyll` so the `_next` directory is not stripped, and pushes the result to the
`gh-pages` branch. See `docs/README.md` to switch to automatic deploys instead.

## What is in it

| Page | What it does |
| --- | --- |
| Overview | Landing page with a live countdown to the next Open Doors date |
| Open Doors | Tracks, age bands, every stage with its date, portfolio contents, winner benefits, rules |
| Scholarships | Six funded routes, filterable by level, each with coverage, steps and pitfalls |
| Universities | Sixteen universities, filterable by subject area, tuition, English teaching, Open Doors status |
| Budget | Cost-of-living calculator by city, housing type and lifestyle, with one-off arrival costs |
| Compare cities | Up to three cities side by side on rent, food, transport, utilities and climate |
| Advisor | Profile matcher plus a sourced question-and-answer box |
| Letter review | Rubric-based review of an Open Doors motivation letter |
| Student voices | Reviews of the application and of life in each city, with a form to add your own |
| Checklist | 47 tracked steps from first research to the first week in Russia |
| About | Who built this, the rules it holds itself to, and where the information comes from |

## The assistant

Three helpers, all of them rules engines running locally. There is no model API behind them, no key
to manage and no per-question cost.

**Profile matcher** (`lib/advisor.ts`) applies published eligibility rules to a profile and ranks the
six routes, then scores universities and cities against subject area, budget, teaching language,
priority and climate tolerance. Age limits come from the official Open Doors rules, so an applicant
outside a track's band is told which rule blocks them.

**Question box** (`lib/answer.ts`) matches a question against 33 written entries in
`data/knowledge.ts`, each carrying the official source it came from. It stems tokens, weights
whole-phrase keyword hits above single words, and rewards entries that cover more of the question.
When nothing scores above the threshold it says so rather than guessing.

**Letter reviewer** (`lib/letterReview.ts`) scores a motivation letter out of 100 against things that
can be counted reliably: length, paragraph structure, average sentence length, stock phrases,
numeric detail, mid-sentence proper nouns, evidence verbs, vague quantifiers, hedging, programme-fit
markers and a stated plan after graduation. It returns findings grouped by severity with a concrete
fix for each. Calibration check: the weak sample letter bundled in the page scores 0, a specific and
evidenced letter scores in the 90s.

## Data and sourcing

All content lives in `data/` as typed TypeScript, so nothing is hardcoded in a component.

- Open Doors tracks, stages, dates, benefits and rules come from `od.globaluni.ru` and its published
  rules page, for the 2026/27 cycle.
- Government quota coverage and the application procedure come from `education-in-russia.com` and
  the quota pages published by participating universities.
- Cost bands are indicative planning figures, not quotes. Every page carries a notice saying so.

Deadlines, stipends and rules are reissued every cycle. Each record links the official source, which
is the only authority.

## Theme

Light, dark and follow-the-system, switched from the header and remembered per browser. The palette
lives entirely in CSS custom properties in `app/globals.css`. The `ink` scale is semantic rather than
literal: `ink-900` always means primary text and `ink-200` always means border, so the scale inverts
under `.dark` and every component keeps working without a single `dark:` override. Tinted callouts
and the high-contrast slab panels are the exceptions and carry their own dark treatment. An inline
script in the document head applies the stored theme before the first paint, so the page never
flashes light on its way to dark.

## Student reviews

Real experience is the one thing the official sites cannot give you, so `/reviews` collects it.

The page ships with four entries clearly marked **illustrative**: composites written to show the
level of detail a useful review has. They are not real people, they are labelled as such on every
card, and a notice at the top of the page says so. Replace them in `data/reviews.ts` as you collect
real submissions, setting `kind` to `'real'`.

Visitors can write their own review through the form. It is stored in their browser only and never
uploaded. Your own submissions can be exported as JSON from the bottom of the page and pasted into
the data file to publish them.

## Currency

Every figure is stored in roubles. The switch in the header converts to dollars or euros using rates
the user can edit, because published rates go stale. The chosen currency and rates persist in
`localStorage`, as do the budget inputs, the advisor profile, the letter draft and the checklist.
Nothing is sent anywhere.

## Editing the credit

Your name, role and contact links live in `data/site.ts`. Change `SITE.author` and every place that
credits you updates: the footer on every page, the copyright line, and the About page heading. Fill
in `email`, `github`, `linkedin` or `location` to have them appear in the About contact table, and
leave any of them empty to hide that row.

## Not affiliated

This is an independent planning tool. It is not connected to any university, to Rossotrudnichestvo or
to the Open Doors organisers.
