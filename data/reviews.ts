export type Route = 'Open Doors' | 'Government quota' | 'Self-funded' | 'University scholarship';

export type Review = {
  id: string;
  /**
   * 'sample' entries are illustrative composites written to show what a useful
   * review looks like. They are NOT real people and the interface labels them
   * as such everywhere they appear. Replace them with real submissions as you
   * collect them, and set kind to 'real' along with a verifiable attribution.
   */
  kind: 'sample' | 'real';
  displayName: string;
  route: Route;
  level: string;
  subject: string;
  cityId: string;
  universityId?: string;
  yearStarted: number;
  rating: 1 | 2 | 3 | 4 | 5;
  headline: string;
  body: string;
  bestPart: string;
  hardestPart: string;
  costSurprise: string;
  adviceForApplicants: string;
};

export const SAMPLE_NOTICE =
  'The entries below marked as illustrative are composites written to show the level of detail a useful review has. They are not real students and no real person said these words. Real submissions appear separately and are labelled as such.';

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'sample-1',
    kind: 'sample',
    displayName: 'Illustrative profile A',
    route: 'Open Doors',
    level: "Master's",
    subject: 'Computer and Data Science',
    cityId: 'saint-petersburg',
    universityId: 'itmo',
    yearStarted: 2024,
    rating: 4,
    headline: 'The competition was fair. The paperwork afterwards was the hard part.',
    body: 'The portfolio stage rewarded the two years of project work I could actually evidence, and the Stage 2 exam was closer to a normal subject exam than to a trick test. What nobody prepared me for was the gap between winning and arriving: the invitation, the consular appointment and the migration registration each took longer than I budgeted for, and none of them started until the competition was over.',
    bestPart: 'Being judged on work I had done rather than on which country I applied from.',
    hardestPart: 'Six weeks of document chasing between the result and the visa.',
    costSurprise: 'The dormitory fee. I had read "tuition free" and assumed housing was included.',
    adviceForApplicants:
      'Assemble every certificate as a clean scan before registration opens. You cannot add evidence after the portfolio closes.',
  },
  {
    id: 'sample-2',
    kind: 'sample',
    displayName: 'Illustrative profile B',
    route: 'Government quota',
    level: 'Bachelor',
    subject: 'Clinical Medicine',
    cityId: 'kazan',
    universityId: 'kfu',
    yearStarted: 2023,
    rating: 4,
    headline: 'The preparatory year was the best thing that happened to me.',
    body: 'I arrived with no Russian at all and spent a funded year on the preparatory faculty before the degree began. It felt like a delay at the time. By the second semester of first year it was obvious that the students who skipped it were the ones struggling, because the clinical side of medicine happens in Russian no matter what language the lectures are in.',
    bestPart: 'Reaching a working level of Russian before the degree counted towards anything.',
    hardestPart: 'The first three months, when I understood almost nothing outside class.',
    costSurprise: 'An extra full year of living costs that I had not put in the plan.',
    adviceForApplicants:
      'If your programme is taught in Russian, budget for the preparatory year as a real year, not a formality.',
  },
  {
    id: 'sample-3',
    kind: 'sample',
    displayName: 'Illustrative profile C',
    route: 'Open Doors',
    level: 'PhD',
    subject: 'Physics',
    cityId: 'novosibirsk',
    universityId: 'nsu',
    yearStarted: 2025,
    rating: 5,
    headline: 'Contacting the supervisor early decided the whole thing.',
    body: 'The doctoral track has no written final exam, so the interview is everything. I emailed two prospective supervisors in October with a one-page proposal built on their recent papers. One replied and we had already discussed the direction twice before the formal interview slot in January. The interview then felt like a continuation rather than an audition.',
    bestPart: 'Direct access to a research group from the first month.',
    hardestPart: 'The winter. Minus twenty-five is not an abstraction.',
    costSurprise: 'Proper winter clothing, which I bought locally and should have budgeted for.',
    adviceForApplicants:
      'Read your prospective supervisor recent work and write to them before the interview window opens, not during it.',
  },
  {
    id: 'sample-4',
    kind: 'sample',
    displayName: 'Illustrative profile D',
    route: 'Self-funded',
    level: "Master's",
    subject: 'Economics and Econometrics',
    cityId: 'moscow',
    universityId: 'hse',
    yearStarted: 2024,
    rating: 3,
    headline: 'Moscow is a different financial planet from the rest of the country.',
    body: 'I missed the scholarship rounds and enrolled paying my own tuition, which was manageable. The living costs were not. A room in a shared flat cost more than my entire monthly budget in my home city, and the dormitory waiting list was long because I applied late. The academic side was excellent and the English-taught catalogue was genuinely large.',
    bestPart: 'The breadth of English-taught courses and the internship market.',
    hardestPart: 'Finding housing as a late applicant with no local guarantor.',
    costSurprise: 'A deposit of one month rent on top of the first month, paid in cash on the spot.',
    adviceForApplicants:
      'If you are self-funding, price a regional city before you assume you need the capital.',
  },
];

export const REVIEW_PROMPTS = [
  { key: 'headline', label: 'One line that sums up your experience' },
  { key: 'body', label: 'What actually happened' },
  { key: 'bestPart', label: 'The best part' },
  { key: 'hardestPart', label: 'The hardest part' },
  { key: 'costSurprise', label: 'The cost that surprised you' },
  { key: 'adviceForApplicants', label: 'What you would tell an applicant today' },
] as const;

export const ROUTES: Route[] = [
  'Open Doors',
  'Government quota',
  'University scholarship',
  'Self-funded',
];
