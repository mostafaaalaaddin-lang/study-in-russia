/**
 * Open Doors: Russian Scholarship Project.
 *
 * Compiled from the official project site (od.globaluni.ru), including the
 * published rules page, for the 2026/27 cycle. Dates and subject lists are
 * re-issued every year - always confirm against the official site before acting.
 */

export const OPEN_DOORS_SOURCE = 'https://od.globaluni.ru';
export const OPEN_DOORS_RULES_URL = 'https://od.globaluni.ru/rules';

export type TrackId = 'bachelor' | 'master' | 'doctoral' | 'postdoc';

export type Track = {
  id: TrackId;
  name: string;
  minAge: number;
  maxAge: number;
  requiredBackground: string;
  disqualifier: string;
  stages: string[];
  resultDate: string;
  summary: string;
};

export const TRACKS: Track[] = [
  {
    id: 'bachelor',
    name: "Bachelor's track",
    minAge: 16,
    maxAge: 23,
    requiredBackground:
      'Secondary school certificate or a vocational college diploma, including students graduating in the current academic year.',
    disqualifier: "You must not already hold a Bachelor's or Master's degree.",
    stages: [
      'Stage 1 - portfolio, assessed separately from the other tracks',
      'Stage 2 - final proctored online exam, 180 minutes',
    ],
    resultDate: 'Announced after the Stage 2 exam window closes on 21 December 2026',
    summary:
      'For school leavers. The portfolio filters candidates, then a timed online exam decides the winners.',
  },
  {
    id: 'master',
    name: "Master's track",
    minAge: 20,
    maxAge: 33,
    requiredBackground:
      "A Bachelor's degree, Specialist degree or equivalent, including students graduating in the current academic year.",
    disqualifier: "You must not already hold a Master's degree.",
    stages: [
      "Stage 1 - portfolio, assessed jointly with the Doctoral track",
      'Stage 2 - final proctored online exam, 180 minutes',
    ],
    resultDate: 'Winners announced 21 December 2026',
    summary:
      'The largest and most competitive track. Portfolio plus a timed online exam in your subject area.',
  },
  {
    id: 'doctoral',
    name: 'Doctoral (PhD) track',
    minAge: 22,
    maxAge: 35,
    requiredBackground:
      "A Master's or Specialist degree, including students graduating in the current academic year.",
    disqualifier: 'You must not already hold a completed PhD or equivalent.',
    stages: [
      "Stage 1 - portfolio, assessed jointly with the Master's track",
      'Stage 3 - interview with a prospective research supervisor',
    ],
    resultDate: 'Winners announced 26 February 2027',
    summary:
      'No written final exam. You are judged on your portfolio and then on an interview with the supervisor you hope to work under.',
  },
  {
    id: 'postdoc',
    name: 'Postdoctoral track',
    minAge: 24,
    maxAge: 39,
    requiredBackground:
      'A PhD, Candidate of Sciences or Doctor of Sciences degree.',
    disqualifier: 'Open only to candidates who already hold a doctorate.',
    stages: [
      'Stage 1 - portfolio, assessed separately from the other tracks',
      'Stage 2 - video presentation of your research',
      'Stage 3 - interview with a project leader',
    ],
    resultDate: 'Results announced 26 February 2027',
    summary:
      'A research placement route rather than a degree route. You present your work on video and then defend it in an interview.',
  },
];

export type Milestone = {
  label: string;
  start: string; // ISO date
  end: string; // ISO date
  tracks: TrackId[];
  detail: string;
};

export const TIMELINE: Milestone[] = [
  {
    label: 'Registration opens',
    start: '2026-08-20',
    end: '2026-11-01',
    tracks: ['bachelor', 'master', 'doctoral', 'postdoc'],
    detail:
      'Create your participant account on the official portal. You may register only once per cycle and may hold only one account. Participation is free of charge.',
  },
  {
    label: 'Stage 1 - portfolio',
    start: '2026-08-20',
    end: '2026-11-13',
    tracks: ['bachelor', 'master', 'doctoral', 'postdoc'],
    detail:
      'Take the entry test, write your motivation letter, record your achievements in the portfolio fields and upload supporting documents. Registration itself closes on 1 November, ahead of the portfolio deadline.',
  },
  {
    label: 'Stage 2 - final online exam',
    start: '2026-11-13',
    end: '2026-12-21',
    tracks: ['bachelor', 'master'],
    detail:
      'A proctored online exam lasting 180 minutes, with identity verification. Test your camera, microphone and connection well before your slot.',
  },
  {
    label: "Master's results published",
    start: '2026-12-21',
    end: '2026-12-21',
    tracks: ['master'],
    detail: 'Winners and runners-up are announced in your participant account.',
  },
  {
    label: 'Stage 3 - supervisor interviews',
    start: '2026-12-22',
    end: '2027-02-26',
    tracks: ['doctoral', 'postdoc'],
    detail:
      'Book an interview slot with a prospective research supervisor through your account. Registration for interviews closes on 10 January 2027.',
  },
  {
    label: 'Doctoral and postdoctoral results',
    start: '2027-02-26',
    end: '2027-02-26',
    tracks: ['doctoral', 'postdoc'],
    detail: 'Final results for the research tracks are published.',
  },
];

/**
 * Subject areas confirmed on the official site. The organisers describe the
 * competition as covering 14 interdisciplinary areas and revise the list each
 * cycle, so treat this as a starting point, not the final list.
 */
export const SUBJECT_AREAS: { id: string; name: string; note: string }[] = [
  {
    id: 'applied-math-ai',
    name: 'Applied Mathematics and Artificial Intelligence',
    note: 'Machine learning, optimisation, applied statistics.',
  },
  {
    id: 'computer-science',
    name: 'Computer and Data Science',
    note: 'Software engineering, data engineering, information systems.',
  },
  {
    id: 'engineering',
    name: 'Engineering and Technology',
    note: 'Mechanical, electrical, materials and energy engineering.',
  },
  {
    id: 'physics',
    name: 'Physics',
    note: 'Theoretical and applied physics, photonics, nuclear physics.',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    note: 'Organic, inorganic, physical and materials chemistry.',
  },
  {
    id: 'biology',
    name: 'Biology and Biotechnology',
    note: 'Molecular biology, genetics, bioengineering.',
  },
  {
    id: 'medicine',
    name: 'Clinical Medicine and Public Health',
    note: 'Clinical specialties, epidemiology, health systems.',
  },
  {
    id: 'environment',
    name: 'Environmental Sciences',
    note: 'Ecology, earth sciences, climate and resource management.',
  },
  {
    id: 'economics',
    name: 'Economics and Econometrics',
    note: 'Quantitative economics, finance, econometric modelling.',
  },
  {
    id: 'business',
    name: 'Business and Management',
    note: 'Strategy, marketing, operations, entrepreneurship.',
  },
  {
    id: 'politics',
    name: 'Politics and International Studies',
    note: 'International relations, regional studies, public policy.',
  },
  {
    id: 'education',
    name: 'Education and Psychology',
    note: 'Pedagogy, cognitive and applied psychology.',
  },
  {
    id: 'urbanism',
    name: 'Urbanism',
    note: 'Urban planning, architecture, territorial development.',
  },
  {
    id: 'russian-language',
    name: 'Russian Language and Culture',
    note: 'Russian as a foreign language, literature, cultural studies.',
  },
];

export const SUBJECT_AREAS_NOTE =
  'The official site describes 14 interdisciplinary subject areas and adjusts them each cycle. Confirm the current list and the universities attached to each area on od.globaluni.ru before you choose.';

export const WINNER_BENEFITS: string[] = [
  'The right to study in Russia within the state education quota for foreign citizens',
  'Tuition-free study at a participating university in your subject area',
  'A preparatory year of Russian language study if your programme requires it',
  'Eligibility for the state grant paid to quota students',
  'Priority when choosing your programme and university',
];

export const RUNNER_UP_NOTE =
  "Runners-up in the Bachelor's and Master's tracks may receive the same rights as winners, but only if quota places remain available.";

export const HIGH_ACHIEVER_NOTE =
  'Participants scoring at least half of the top score receive an electronic certificate and can be put forward for grant consideration with a ministry recommendation.';

export const NOT_COVERED: string[] = [
  'International flights to Russia',
  'Visa fees and document legalisation',
  'Compulsory medical insurance',
  'Dormitory fees, which remain payable even on a tuition-free place',
  'Food, transport and everyday living costs',
];

export const PORTFOLIO_COMPONENTS: {
  name: string;
  detail: string;
  weightHint: string;
}[] = [
  {
    name: 'Entry test',
    detail:
      'A subject test taken inside your participant account during Stage 1. It sets the baseline score your portfolio builds on.',
    weightHint: 'Screening',
  },
  {
    name: 'Motivation letter',
    detail:
      'Required separately for every subject area you enter. This is the part you have the most control over and the part most applicants treat carelessly.',
    weightHint: 'High influence',
  },
  {
    name: 'Record of achievements',
    detail:
      'Publications, conference papers, olympiad results, competitions, relevant work and projects, entered in the designated portfolio fields.',
    weightHint: 'High influence',
  },
  {
    name: 'Supporting documents',
    detail:
      'Scans that evidence every claim above, in Russian or English. Unevidenced achievements are the most common reason a strong-looking portfolio scores low.',
    weightHint: 'Gatekeeper',
  },
];

export const KEY_RULES: string[] = [
  'Participation is free. Nobody should ever charge you to enter.',
  'One account per person, one registration per cycle.',
  'Portfolio documents must be in Russian or English.',
  'Portfolio evaluation results cannot be appealed.',
  'Stage 2 is proctored with identity verification, so your ID and camera must work.',
  'Winning gives you a quota place, not an automatic visa. You still complete the standard admission and visa process.',
];

export const PARTICIPATING_UNIVERSITY_COUNT = 24;
