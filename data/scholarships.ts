export type Level = 'Preparatory year' | 'Bachelor' | 'Master' | 'PhD' | 'Postdoctoral';

export type Coverage = {
  tuition: 'Full' | 'Partial' | 'None';
  stipend: boolean;
  dormitoryPlace: boolean;
  dormitoryFeePaid: boolean;
  flights: boolean;
  insurance: boolean;
  livingCosts: boolean;
};

export type Scholarship = {
  id: string;
  name: string;
  shortName: string;
  provider: string;
  officialUrl: string;
  featured?: boolean;
  levels: Level[];
  coverage: Coverage;
  stipendRub: { min: number; max: number } | null;
  applicationWindow: string;
  competitiveness: 'Very high' | 'High' | 'Moderate';
  languageNote: string;
  costToApply: string;
  summary: string;
  eligibility: string[];
  steps: string[];
  notCovered: string[];
  watchOut: string[];
};

/**
 * Scholarship records compiled from the official programme sites.
 * Dates, amounts and rules change every cycle - the officialUrl on each record
 * is the only authoritative source.
 */
export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'open-doors',
    name: 'Open Doors: Russian Scholarship Project',
    shortName: 'Open Doors',
    provider: 'Global Universities Association, with the Ministry of Science and Higher Education',
    officialUrl: 'https://od.globaluni.ru',
    featured: true,
    levels: ['Bachelor', 'Master', 'PhD', 'Postdoctoral'],
    coverage: {
      tuition: 'Full',
      stipend: true,
      dormitoryPlace: true,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: { min: 1500, max: 6500 },
    applicationWindow: 'Registration 20 August - 1 November 2026; portfolio closes 13 November 2026',
    competitiveness: 'Very high',
    languageNote:
      'The competition runs in Russian or English. You may submit your portfolio in either language, and English-taught programmes exist at most participating universities.',
    costToApply: 'Free. There is no participation fee at any stage.',
    summary:
      'An open academic competition rather than an application queue. You build a portfolio, sit a subject exam or an interview, and winners receive a tuition-free place inside the state quota at one of 24 participating universities.',
    eligibility: [
      'Foreign citizens, stateless persons and compatriots living abroad',
      "Bachelor's track: age 16-23, secondary school certificate or vocational diploma, no existing degree",
      "Master's track: age 20-33, a Bachelor or Specialist degree, no existing Master's degree",
      'Doctoral track: age 22-35, a Master or Specialist degree, no completed PhD',
      'Postdoctoral track: age 24-39, holding a PhD, Candidate of Sciences or Doctor of Sciences',
      'Students graduating in the current academic year may apply',
    ],
    steps: [
      'Register a participant account on od.globaluni.ru between 20 August and 1 November 2026',
      'Choose your subject area, and check which of the 24 universities accept that area',
      'Take the entry test inside your account',
      'Write a separate motivation letter for every subject area you enter',
      'Record your achievements in the portfolio fields and upload a scan evidencing each one',
      "Bachelor's and Master's candidates sit a proctored 180-minute online exam before 21 December 2026",
      'Doctoral and postdoctoral candidates book a supervisor interview between 22 December 2026 and 26 February 2027',
      'If you win, complete the standard university admission and student visa process',
    ],
    notCovered: [
      'International flights',
      'Visa fees and document legalisation',
      'Medical insurance',
      'Dormitory fees',
      'Food, transport and daily living costs',
    ],
    watchOut: [
      'Registration closes on 1 November, almost two weeks before the portfolio deadline. Missing that date ends your cycle.',
      'Portfolio results cannot be appealed.',
      'An achievement with no uploaded document behind it is the single most common reason a strong profile scores badly.',
      'Runners-up only receive a place if quota places are left over.',
    ],
  },
  {
    id: 'government-quota',
    name: 'Russian Government Scholarship (state quota)',
    shortName: 'Government quota',
    provider: 'Rossotrudnichestvo and the Ministry of Science and Higher Education',
    officialUrl: 'https://education-in-russia.com',
    featured: true,
    levels: ['Preparatory year', 'Bachelor', 'Master', 'PhD'],
    coverage: {
      tuition: 'Full',
      stipend: true,
      dormitoryPlace: true,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: { min: 1500, max: 6500 },
    applicationWindow: 'Usually opens in November and closes in February, but the exact dates are set country by country',
    competitiveness: 'High',
    languageNote:
      'Most quota places lead to Russian-taught programmes. A funded preparatory year of Russian language is normally included where needed.',
    costToApply: 'Free through the official portal and your local Russian mission.',
    summary:
      'The main state route, with roughly 15,000 places distributed annually across more than 180 countries. Your local Russian embassy or Rossotrudnichestvo office runs the first round of selection.',
    eligibility: [
      'Foreign citizens who meet the academic requirements of the level applied for',
      'A recognised school certificate, Bachelor degree or Master degree depending on the level',
      'A medical certificate including the tests the portal specifies',
      'Country-specific conditions set by the local Russian mission',
    ],
    steps: [
      'Register on education-in-russia.com and complete your profile',
      'Upload your education documents, transcript with grades, personal data consent and medical certificate',
      'Choose your preferred universities and programmes in the portal',
      'Pass the first selection round in your own country, which may include an interview and a qualifying test',
      'Wait for the ministry to confirm your placement and issue an invitation',
      'Apply for the student visa with the invitation letter',
    ],
    notCovered: [
      'International flights',
      'Visa fees and document legalisation',
      'Medical insurance',
      'Dormitory fees, typically a few thousand roubles per month',
      'Food, transport and daily living costs',
    ],
    watchOut: [
      'Deadlines differ by country. The date on a general blog is not the date for your embassy.',
      'The monthly stipend is a modest state payment, not a living allowance. Plan to fund living costs yourself.',
      'Medical certificate requirements are strict and take time to arrange. Start them early.',
      'Being awarded a quota place does not let you choose any university freely; placement is decided centrally.',
    ],
  },
  {
    id: 'preparatory-year',
    name: 'Preparatory faculty year (Russian language foundation)',
    shortName: 'Preparatory year',
    provider: 'Russian universities, funded inside the state quota',
    officialUrl: 'https://education-in-russia.com',
    levels: ['Preparatory year'],
    coverage: {
      tuition: 'Full',
      stipend: true,
      dormitoryPlace: true,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: { min: 1500, max: 2500 },
    applicationWindow: 'Granted together with a quota place, so it follows the quota timetable',
    competitiveness: 'Moderate',
    languageNote:
      'The entire point of the year is to take you to the Russian level your degree programme requires, usually around B1.',
    costToApply: 'No separate application when it comes as part of a quota award.',
    summary:
      'A funded year of intensive Russian before your degree starts. If your programme is taught in Russian and you do not speak it yet, this year is normally part of the package rather than an extra cost.',
    eligibility: [
      'Awarded to quota students whose programme is taught in Russian',
      'Not usually needed if you are admitted to an English-taught programme',
    ],
    steps: [
      'Indicate in your quota application that you need language preparation',
      'Accept the preparatory faculty place assigned to you',
      'Pass the end-of-year language certification to progress to your degree',
    ],
    notCovered: ['Flights, insurance, dormitory fees and living costs, as with any quota place'],
    watchOut: [
      'It adds a year to your stay, so add a full year of living costs to your budget.',
      'Failing the end-of-year certification can delay entry to your degree.',
    ],
  },
  {
    id: 'university-scholarships',
    name: 'University scholarships and tuition discounts',
    shortName: 'University awards',
    provider: 'Individual Russian universities',
    officialUrl: 'https://studyinrussia.ru/en/',
    levels: ['Bachelor', 'Master', 'PhD'],
    coverage: {
      tuition: 'Partial',
      stipend: false,
      dormitoryPlace: true,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: null,
    applicationWindow: 'Tied to each university admission cycle, commonly spring to summer',
    competitiveness: 'Moderate',
    languageNote:
      'The universities with the largest English-taught catalogues, such as HSE, ITMO and MISIS, also run the most developed discount schemes.',
    costToApply: 'Usually free, though some universities charge a document processing fee.',
    summary:
      'Discounts and merit awards a university funds from its own budget. They rarely cover everything, but they stack with your own funds and are far less competitive than the national programmes.',
    eligibility: [
      'Strong academic results in your previous degree',
      'Sometimes a required score in the university entrance examination',
      'Occasionally restricted to specific faculties or partner countries',
    ],
    steps: [
      'Apply directly through the university admission portal',
      'Check the scholarship page of that specific university, not a general directory',
      'Submit any additional documents the award requires alongside your admission file',
    ],
    notCovered: [
      'Typically the remaining share of tuition',
      'Flights, insurance, dormitory fees and living costs',
    ],
    watchOut: [
      'Terms vary enormously between universities. Read the page for the exact programme you want.',
      'A discount is often conditional on maintaining a grade average each semester.',
    ],
  },
  {
    id: 'academic-excellence',
    name: 'Academic excellence stipends for enrolled students',
    shortName: 'Excellence stipends',
    provider: 'Russian state and university funds',
    officialUrl: 'https://studyinrussia.ru/en/',
    levels: ['Bachelor', 'Master', 'PhD'],
    coverage: {
      tuition: 'None',
      stipend: true,
      dormitoryPlace: false,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: null,
    applicationWindow: 'Assessed each semester once you are enrolled',
    competitiveness: 'Moderate',
    languageNote: 'Judged on academic performance rather than language.',
    costToApply: 'No application fee.',
    summary:
      'Raised stipends paid to students who perform well after enrolment. Not a route into Russia, but a reason to take your first semester seriously.',
    eligibility: [
      'Already enrolled at a Russian university',
      'Consistently high grades, and often research or public activity as well',
    ],
    steps: [
      'Enrol and complete your first assessed semester',
      'Ask your faculty international office which stipends you can be nominated for',
      'Keep evidence of research output and competition results',
    ],
    notCovered: ['Tuition, flights, insurance and living costs'],
    watchOut: ['Amounts are modest and are withdrawn if your grades fall.'],
  },
  {
    id: 'bilateral',
    name: 'Bilateral intergovernmental agreements',
    shortName: 'Bilateral agreements',
    provider: 'Your national ministry of higher education, with Russian counterparts',
    officialUrl: 'https://education-in-russia.com',
    levels: ['Bachelor', 'Master', 'PhD'],
    coverage: {
      tuition: 'Full',
      stipend: true,
      dormitoryPlace: true,
      dormitoryFeePaid: false,
      flights: false,
      insurance: false,
      livingCosts: false,
    },
    stipendRub: null,
    applicationWindow: 'Set by your own ministry, often on a different calendar from the quota',
    competitiveness: 'High',
    languageNote: 'Depends entirely on the programme assigned under the agreement.',
    costToApply: 'Normally free through your national ministry.',
    summary:
      'Some countries negotiate their own allocation of places with Russia and run the selection themselves. Applicants routinely miss these because they only watch the Russian portals.',
    eligibility: [
      'Citizenship of a country holding an active agreement with Russia',
      'Conditions set by your own ministry, which may include age limits or service commitments',
    ],
    steps: [
      'Check the missions or cultural affairs department of your national ministry of higher education',
      'Apply through the national call rather than the Russian portal',
      'Complete the Russian side of the admission once nominated',
    ],
    notCovered: ['Usually flights, insurance and living costs, though terms vary by agreement'],
    watchOut: [
      'Some agreements require you to return home and work for a set period afterwards.',
      'Announcements often appear only on the national ministry site, in the local language.',
    ],
  },
];

export const SCHOLARSHIP_BY_ID = Object.fromEntries(
  SCHOLARSHIPS.map((s) => [s.id, s])
) as Record<string, Scholarship>;
