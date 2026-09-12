export type Phase = {
  id: string;
  title: string;
  window: string;
  intro: string;
  items: { id: string; label: string; detail?: string; critical?: boolean }[];
};

export const PHASES: Phase[] = [
  {
    id: 'research',
    title: 'Research and shortlist',
    window: 'Start 3 to 6 months before registration opens',
    intro:
      'Decisions made here are hard to undo later. Your subject area fixes both your exam content and the universities available to you.',
    items: [
      {
        id: 'r1',
        label: 'Decide your study level and confirm you meet the age band',
        detail: "Open Doors sets age limits per track: 16-23 Bachelor's, 20-33 Master's, 22-35 Doctoral, 24-39 Postdoctoral.",
        critical: true,
      },
      {
        id: 'r2',
        label: 'Choose your Open Doors subject area',
        detail: 'Check which of the 24 participating universities accept that area before committing.',
        critical: true,
      },
      { id: 'r3', label: 'Shortlist five to eight universities across a range of selectivity' },
      {
        id: 'r4',
        label: 'Check whether your programme is taught in Russian or English',
        detail: 'A Russian-taught programme usually means an extra preparatory year.',
      },
      {
        id: 'r5',
        label: 'Verify how your home country recognises the degree',
        detail: 'Essential for medicine, dentistry, pharmacy and engineering.',
        critical: true,
      },
      { id: 'r6', label: 'Build a first budget for your chosen city and housing type' },
      { id: 'r7', label: 'Find out your local embassy quota deadline, which differs by country' },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    window: 'Allow 2 to 3 months. Translation and legalisation are the slow parts.',
    intro:
      'Almost every failed application fails here, not at the exam. Sequence the slow items first.',
    items: [
      {
        id: 'd1',
        label: 'Passport valid well beyond your intended stay',
        critical: true,
      },
      { id: 'd2', label: 'Education certificate or degree, original plus certified copies', critical: true },
      { id: 'd3', label: 'Full academic transcript with grades' },
      {
        id: 'd4',
        label: 'Certified translation into Russian',
        detail: 'Start this early; turnaround is measured in weeks.',
        critical: true,
      },
      {
        id: 'd5',
        label: 'Apostille or legalisation if your country requires it',
        critical: true,
      },
      {
        id: 'd6',
        label: 'Medical certificate with the tests the portal specifies',
        detail: 'The most common cause of a delayed quota application.',
        critical: true,
      },
      { id: 'd7', label: 'HIV test certificate' },
      { id: 'd8', label: 'Passport photographs to the specified format' },
      {
        id: 'd9',
        label: 'Evidence for every achievement you plan to claim',
        detail: 'Certificates, publications, competition results, employment letters. Unevidenced claims score nothing.',
        critical: true,
      },
      { id: 'd10', label: 'Language certificate if you already hold one' },
    ],
  },
  {
    id: 'application',
    title: 'Application and competition',
    window: '20 August to 13 November 2026 for Open Doors',
    intro:
      'Registration closes on 1 November, almost two weeks before the portfolio deadline. Do not plan around the later date.',
    items: [
      {
        id: 'a1',
        label: 'Register your Open Doors participant account before 1 November 2026',
        detail: 'One account per person, one registration per cycle. Participation is free.',
        critical: true,
      },
      { id: 'a2', label: 'Take the entry test inside your account' },
      {
        id: 'a3',
        label: 'Write a separate motivation letter for each subject area you enter',
        detail: 'Use the letter reviewer in this app before you submit.',
        critical: true,
      },
      { id: 'a4', label: 'Fill in every achievement field and upload the matching document' },
      { id: 'a5', label: 'Submit the portfolio before 13 November 2026', critical: true },
      {
        id: 'a6',
        label: 'Register in parallel on education-in-russia.com for the government quota',
        detail: 'Separate process, separate calendar, and worth doing in the same year.',
      },
      {
        id: 'a7',
        label: 'Test your camera, microphone, connection and ID before the Stage 2 exam',
        detail: 'The exam is proctored with identity verification and lasts 180 minutes.',
        critical: true,
      },
      {
        id: 'a8',
        label: 'PhD applicants: contact prospective supervisors and book an interview slot',
        detail: 'Interview registration closes 10 January 2027.',
      },
    ],
  },
  {
    id: 'admission',
    title: 'Admission and visa',
    window: 'From results publication until roughly one month before travel',
    intro:
      'An award is not an admission and an admission is not a visa. Each is its own process with its own delay.',
    items: [
      { id: 'v1', label: 'Accept your place and confirm your programme and university' },
      { id: 'v2', label: 'Complete the university admission file' },
      { id: 'v3', label: 'Receive the official invitation letter from the university', critical: true },
      { id: 'v4', label: 'Book the consular appointment as early as slots allow', critical: true },
      { id: 'v5', label: 'Submit the student visa application with the invitation' },
      { id: 'v6', label: 'Apply for your dormitory place through the international office' },
      { id: 'v7', label: 'Arrange medical insurance for the first year' },
    ],
  },
  {
    id: 'predeparture',
    title: 'Before you fly',
    window: 'The final month',
    intro: 'One-off costs cluster here. Budget for them separately from your monthly plan.',
    items: [
      { id: 'p1', label: 'Book flights and confirm your arrival date with the university' },
      { id: 'p2', label: 'Tell the international office your flight details so someone expects you' },
      { id: 'p3', label: 'Carry enough cash for your first weeks', detail: 'Foreign-issued cards generally do not work in Russia.' },
      { id: 'p4', label: 'Pack original documents in your hand luggage, never checked baggage', critical: true },
      { id: 'p5', label: 'Buy essential winter clothing, or budget to buy it on arrival' },
      { id: 'p6', label: 'Learn the Cyrillic alphabet and thirty survival phrases' },
      { id: 'p7', label: 'Save the addresses of your dormitory and faculty in Russian' },
    ],
  },
  {
    id: 'arrival',
    title: 'First weeks in Russia',
    window: 'Your first month',
    intro: 'Migration registration is the one item with a legal deadline. Do it before anything else.',
    items: [
      { id: 'f1', label: 'Report to the international office on your first working day', critical: true },
      {
        id: 'f2',
        label: 'Complete migration registration at your address',
        detail: 'Required shortly after arrival, and again after any move or trip abroad. Confirm the exact deadline locally.',
        critical: true,
      },
      { id: 'f3', label: 'Finish the medical checks your university requires' },
      { id: 'f4', label: 'Collect your student card and dormitory pass' },
      { id: 'f5', label: 'Buy a local SIM card' },
      { id: 'f6', label: 'Open a local bank account and get a Mir card' },
      { id: 'f7', label: 'Buy the discounted student transport card' },
      { id: 'f8', label: 'Register with the student association for your country or faculty' },
    ],
  },
];

export const TOTAL_ITEMS = PHASES.reduce((n, p) => n + p.items.length, 0);
