export type Topic =
  | 'Open Doors'
  | 'Government quota'
  | 'Applying'
  | 'Visa and documents'
  | 'Housing'
  | 'Money'
  | 'Language'
  | 'Life in Russia';

export type Entry = {
  id: string;
  topic: Topic;
  question: string;
  /** Terms the matcher scores against. Include likely misspellings and synonyms. */
  keywords: string[];
  answer: string;
  /** Short follow-up lines shown under the answer. */
  points?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
  related?: string[];
};

export const KNOWLEDGE: Entry[] = [
  // ---------------------------------------------------------------- Open Doors
  {
    id: 'od-what',
    topic: 'Open Doors',
    question: 'What is Open Doors and how is it different from the government quota?',
    keywords: ['open doors', 'opendoors', 'olympiad', 'globaluni', 'difference', 'quota', 'competition', 'what is'],
    answer:
      'Open Doors is an academic competition run by the Global Universities Association with the Ministry of Science and Higher Education. You compete on a portfolio and an exam or interview, and winners receive a tuition-free place inside the state education quota at one of 24 participating universities. The government quota is the broader state route, administered by Rossotrudnichestvo through your local Russian embassy, where selection happens in your own country.',
    points: [
      'Open Doors is judged on merit in an open competition, so your country quota does not limit you.',
      'The government quota is allocated per country, so your competition is mostly local.',
      'You can pursue both in the same year, and many applicants do.',
    ],
    sourceLabel: 'od.globaluni.ru',
    sourceUrl: 'https://od.globaluni.ru',
    related: ['od-benefits', 'quota-what'],
  },
  {
    id: 'od-benefits',
    topic: 'Open Doors',
    question: 'What exactly do Open Doors winners receive?',
    keywords: ['winner', 'win', 'prize', 'benefit', 'receive', 'award', 'cover', 'free tuition', 'open doors'],
    answer:
      'Winners receive the right to study in Russia within the education quota for foreign citizens, which means tuition-free study at a participating university in their subject area, a preparatory year of Russian if the programme needs it, eligibility for the state grant paid to quota students, and priority in choosing a programme.',
    points: [
      'Flights, visa fees, medical insurance, dormitory fees and living costs remain yours to pay.',
      "Runners-up in the Bachelor's and Master's tracks may get the same rights, but only if quota places remain.",
      'Scoring at least half the top score earns an electronic certificate and possible grant consideration.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
    related: ['od-what', 'od-notcovered'],
  },
  {
    id: 'od-eligibility',
    topic: 'Open Doors',
    question: 'Am I eligible for Open Doors, and what are the age limits?',
    keywords: ['eligible', 'eligibility', 'age', 'limit', 'old', 'young', 'requirement', 'qualify', 'can i apply'],
    answer:
      "Age bands are set per track. Bachelor's runs 16 to 23 with a school certificate or vocational diploma. Master's runs 20 to 33 with a Bachelor or Specialist degree. Doctoral runs 22 to 35 with a Master or Specialist degree. Postdoctoral runs 24 to 39 and requires an existing doctorate. Students graduating in the current academic year may apply.",
    points: [
      "You must not already hold the degree the track leads to - no existing Master's for the Master's track, for example.",
      'Foreign citizens, stateless persons and compatriots living abroad are all eligible.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
    related: ['od-what', 'od-dates'],
  },
  {
    id: 'od-dates',
    topic: 'Open Doors',
    question: 'What are the Open Doors dates for this cycle?',
    keywords: ['date', 'deadline', 'when', 'timeline', 'schedule', 'close', 'open', 'registration', 'results'],
    answer:
      'For the 2026/27 cycle, registration runs from 20 August to 1 November 2026 and the Stage 1 portfolio closes on 13 November 2026. The Stage 2 proctored exam window for Bachelor and Master candidates runs from 13 November to 21 December 2026, with Master results published on 21 December 2026. Doctoral and postdoctoral interviews run from 22 December 2026 to 26 February 2027, with results on 26 February 2027.',
    points: [
      'Registration closes almost two weeks before the portfolio deadline. That gap catches people out every year.',
      'Interview registration for the research tracks closes on 10 January 2027.',
      'Dates are reissued each cycle, so confirm on the official site.',
    ],
    sourceLabel: 'od.globaluni.ru',
    sourceUrl: 'https://od.globaluni.ru',
    related: ['od-portfolio'],
  },
  {
    id: 'od-portfolio',
    topic: 'Open Doors',
    question: 'What goes into the Open Doors portfolio?',
    keywords: ['portfolio', 'stage 1', 'first stage', 'document', 'upload', 'achievement', 'entry test'],
    answer:
      'Inside your participant account you take an entry test, write a motivation letter for each subject area you enter, record your achievements in the designated portfolio fields, and upload documents that evidence those achievements. Everything must be in Russian or English.',
    points: [
      'An achievement with no supporting scan behind it is the most common reason a strong profile scores badly.',
      'Portfolio results cannot be appealed, so there is no second chance on a careless submission.',
      'A separate motivation letter is required for every subject area you enter.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
    related: ['od-letter', 'od-exam'],
  },
  {
    id: 'od-letter',
    topic: 'Open Doors',
    question: 'How should I write the Open Doors motivation letter?',
    keywords: ['motivation letter', 'motivation', 'letter', 'essay', 'statement', 'write', 'personal statement'],
    answer:
      'Treat it as an argument, not an introduction. Say what specific problem you want to work on, show evidence that you have already started working on it, explain why this subject area and this set of universities fit that work, and state what you intend to do afterwards. Name supervisors, labs or courses where you can.',
    points: [
      'Generic praise of Russia or of the university adds nothing and costs you space.',
      'Every claim you make should map to something a reviewer can see in your uploaded documents.',
      'Write a distinct letter per subject area rather than reusing one text.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
    related: ['od-portfolio'],
  },
  {
    id: 'od-exam',
    topic: 'Open Doors',
    question: 'What is the Open Doors Stage 2 exam like?',
    keywords: ['exam', 'test', 'stage 2', 'second stage', 'proctor', 'online exam', 'final'],
    answer:
      "Bachelor's and Master's candidates sit a proctored online exam lasting 180 minutes, with identity verification. It is taken from your own device inside the announced window.",
    points: [
      'Check your camera, microphone, identity document and internet connection before the slot.',
      'Doctoral and postdoctoral candidates do not sit this exam; they are interviewed instead.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
    related: ['od-dates', 'od-interview'],
  },
  {
    id: 'od-interview',
    topic: 'Open Doors',
    question: 'How do the Open Doors PhD interviews work?',
    keywords: ['interview', 'phd', 'doctoral', 'supervisor', 'stage 3', 'third stage', 'postdoc', 'research'],
    answer:
      'Doctoral and postdoctoral candidates book an interview slot with a prospective research supervisor or project leader through their participant account. The window runs from 22 December 2026 to 26 February 2027, and interview registration closes on 10 January 2027.',
    points: [
      'Read your prospective supervisor recent work before the interview and come with a concrete proposal.',
      'Postdoctoral candidates also submit a video presentation of their research at Stage 2.',
    ],
    sourceLabel: 'od.globaluni.ru',
    sourceUrl: 'https://od.globaluni.ru',
    related: ['od-dates'],
  },
  {
    id: 'od-cost',
    topic: 'Open Doors',
    question: 'Does Open Doors cost anything to enter?',
    keywords: ['fee', 'cost', 'pay', 'free', 'price', 'money', 'scam', 'agent'],
    answer:
      'Nothing. Participation is free at every stage. If anyone asks you to pay for registration, for a guaranteed place or for an agent to submit on your behalf, that is not part of the official process.',
    points: [
      'Register only through od.globaluni.ru.',
      'One account per person, one registration per cycle.',
    ],
    sourceLabel: 'Official rules',
    sourceUrl: 'https://od.globaluni.ru/rules',
  },
  {
    id: 'od-notcovered',
    topic: 'Open Doors',
    question: 'What does Open Doors not pay for?',
    keywords: ['not covered', 'exclude', 'pay myself', 'extra', 'hidden cost', 'flight', 'insurance'],
    answer:
      'It does not pay for international flights, visa fees and document legalisation, medical insurance, dormitory fees, or your food, transport and daily living costs. Tuition is free; living is not.',
    points: [
      'Budget realistically for at least a year of living costs before you travel.',
      'Dormitory fees are modest but still monthly.',
    ],
    sourceLabel: 'od.globaluni.ru',
    sourceUrl: 'https://od.globaluni.ru',
    related: ['money-budget'],
  },
  {
    id: 'od-subjects',
    topic: 'Open Doors',
    question: 'Which subject areas and universities take part in Open Doors?',
    keywords: ['subject', 'area', 'field', 'track', 'university', 'universities', '24', 'participat'],
    answer:
      'The competition covers 14 interdisciplinary subject areas across 24 participating universities, from applied mathematics and artificial intelligence through clinical medicine to Russian language and culture. Not every university accepts every subject area, so check the pairing before you choose.',
    points: [
      'The subject list is revised each cycle.',
      'Your subject area determines both your exam content and the universities open to you.',
    ],
    sourceLabel: 'od.globaluni.ru',
    sourceUrl: 'https://od.globaluni.ru',
  },

  // ------------------------------------------------------------ Government quota
  {
    id: 'quota-what',
    topic: 'Government quota',
    question: 'How does the Russian Government Scholarship quota work?',
    keywords: ['quota', 'government scholarship', 'rossotrudnichestvo', 'education-in-russia', 'state', 'embassy'],
    answer:
      'The Russian state sets aside roughly 15,000 places a year, distributed across more than 180 countries. You register on education-in-russia.com, and the first round of selection is run in your own country by Rossotrudnichestvo or the Russian embassy, which may include an interview and a qualifying test.',
    points: [
      'It covers full tuition, a place in a dormitory and a modest monthly stipend.',
      'Placement is decided centrally, so you rank preferences rather than pick freely.',
      'Deadlines are set country by country, usually somewhere between November and February.',
    ],
    sourceLabel: 'education-in-russia.com',
    sourceUrl: 'https://education-in-russia.com',
    related: ['quota-docs', 'od-what'],
  },
  {
    id: 'quota-docs',
    topic: 'Government quota',
    question: 'Which documents does the quota application need?',
    keywords: ['document', 'paper', 'require', 'transcript', 'certificate', 'medical', 'need', 'quota'],
    answer:
      'The portal asks for a scan of your education document, a transcript with grades, or a certificate of study with grades if you are still graduating, your consent to the processing of personal data, and a medical certificate giving a full assessment of your health including specified tests.',
    points: [
      'Start the medical certificate early. It is the step that most often delays applications.',
      'Requirements differ by country, so follow your own embassy instructions over any general guide.',
    ],
    sourceLabel: 'education-in-russia.com',
    sourceUrl: 'https://education-in-russia.com',
    related: ['visa-docs'],
  },
  {
    id: 'quota-stipend',
    topic: 'Government quota',
    question: 'How much is the monthly state stipend?',
    keywords: ['stipend', 'monthly', 'allowance', 'how much', 'salary', 'grant', 'payment'],
    answer:
      "The state stipend is a modest payment rather than a living allowance. Reported bands sit around 1,500 to 2,500 roubles a month for Bachelor's students, 2,500 to 4,000 for Master's students and up to roughly 6,500 for PhD students. Figures vary by university and are revised over time.",
    points: [
      'On its own this will not cover food, let alone rent. Plan separate funding.',
      'It is paid regardless of your family income, and it is not means-tested.',
    ],
    sourceLabel: 'Reported by participating universities',
    sourceUrl: 'https://en.misis.ru/applicants/scholarships/quota/',
    related: ['money-budget', 'od-notcovered'],
  },

  // -------------------------------------------------------------------- Applying
  {
    id: 'apply-both',
    topic: 'Applying',
    question: 'Can I apply to Open Doors and the government quota at the same time?',
    keywords: ['both', 'same time', 'two', 'multiple', 'parallel', 'apply twice'],
    answer:
      'Yes, and it is usually the right strategy. They are separate processes on separate calendars, judged by different people. Open Doors is decided on merit in an open field; the quota is decided partly by your country allocation.',
    points: [
      'Keep one master folder of documents so you are not rebuilding your file twice.',
      'Track both sets of deadlines separately. They do not align.',
    ],
    related: ['od-what', 'quota-what'],
  },
  {
    id: 'apply-chances',
    topic: 'Applying',
    question: 'What actually improves my chances?',
    keywords: ['chance', 'improve', 'better', 'competitive', 'tips', 'advice', 'strong', 'accepted'],
    answer:
      'Evidence beats enthusiasm. Reviewers reward documented achievements, a specific research or career direction, and a clear fit between what you want to do and what the university actually offers. The applicants who fail are usually the ones with an unfocused letter and unevidenced claims.',
    points: [
      'Upload a document for every single achievement you list.',
      'Name specific labs, supervisors or courses rather than praising the university in general.',
      'Apply early enough that a missing document does not end your cycle.',
      'Consider a strong regional university where your profile stands out rather than only the famous names.',
    ],
    related: ['od-letter', 'od-portfolio'],
  },
  {
    id: 'apply-recognition',
    topic: 'Applying',
    question: 'Will my Russian degree be recognised back home?',
    keywords: ['recognis', 'recogniz', 'accredit', 'valid', 'equivalen', 'back home', 'medical licence', 'license'],
    answer:
      'That depends entirely on your own country, and it matters most for regulated professions like medicine, dentistry, pharmacy and engineering. Check with the licensing body in the country where you intend to work before you commit to a programme, not after you graduate.',
    points: [
      'Ask specifically about the exact university and programme, not about Russia in general.',
      'Some countries require an additional qualifying examination regardless of where you studied.',
    ],
  },

  // ----------------------------------------------------------- Visa and documents
  {
    id: 'visa-process',
    topic: 'Visa and documents',
    question: 'How does the student visa work?',
    keywords: ['visa', 'invitation', 'consulate', 'embassy', 'entry', 'permit'],
    answer:
      'Your university issues an official invitation once you are admitted. You take that invitation to a Russian consulate and apply for a student visa. The first visa is typically issued for a short period and is extended inside Russia after you arrive.',
    points: [
      'Winning a scholarship does not give you a visa. It is a separate step with its own timeline.',
      'Start the consular appointment early. Slots are the bottleneck in many countries.',
    ],
    related: ['visa-docs', 'life-registration'],
  },
  {
    id: 'visa-docs',
    topic: 'Visa and documents',
    question: 'What documents should I prepare in advance?',
    keywords: ['document', 'prepare', 'apostille', 'translat', 'legalis', 'legaliz', 'notar', 'passport'],
    answer:
      'A passport valid well beyond your intended stay, your education certificate and transcript, certified translations into Russian, legalisation or an apostille where your country requires it, a medical certificate including the tests the portal specifies, an HIV test certificate, and passport photographs.',
    points: [
      'Translation and legalisation take weeks, not days. Sequence them first.',
      'Keep both digital scans and several certified paper copies with you.',
    ],
    related: ['quota-docs', 'life-registration'],
  },

  // --------------------------------------------------------------------- Housing
  {
    id: 'house-dorm',
    topic: 'Housing',
    question: 'What is a Russian student dormitory actually like?',
    keywords: ['dorm', 'dormitory', 'hostel', 'accommodation', 'room', 'housing', 'obshezhitie'],
    answer:
      'Usually a shared room for two or three students, with a shared kitchen and bathroom on the floor or between blocks. Quality varies enormously between universities and even between buildings on the same campus. Fees are low, commonly a few thousand roubles a month.',
    points: [
      'A quota or Open Doors place guarantees a dormitory place, not a free one. You still pay the monthly fee.',
      'Ask the international office which specific building your faculty uses, and how far it is from your classes.',
      'Dormitories usually have registration and guest rules that private flats do not.',
    ],
    related: ['house-private', 'money-budget'],
  },
  {
    id: 'house-private',
    topic: 'Housing',
    question: 'Should I rent privately instead of the dormitory?',
    keywords: ['rent', 'private', 'flat', 'apartment', 'studio', 'share', 'lease'],
    answer:
      'Renting buys privacy and quiet at several times the price. A room in a shared flat typically costs ten to forty thousand roubles a month depending on the city, and a studio considerably more, with utilities on top. Most international students start in the dormitory and move out later once they know the city.',
    points: [
      'Landlords usually want a deposit of one month rent plus the first month up front.',
      'Utilities are a separate monthly bill when you rent privately.',
      'Your migration registration is tied to your address, so any move has a paperwork consequence.',
    ],
    related: ['house-dorm', 'life-registration'],
  },

  // ----------------------------------------------------------------------- Money
  {
    id: 'money-budget',
    topic: 'Money',
    question: 'How much money do I actually need per month?',
    keywords: ['budget', 'cost', 'living', 'month', 'expense', 'how much', 'money', 'afford', 'spend'],
    answer:
      'In a dormitory in a regional city, a careful student can live on roughly 20,000 to 30,000 roubles a month. In Moscow with a rented room, the same lifestyle runs closer to 50,000 to 70,000. The calculator in this app breaks that down by city and housing choice.',
    points: [
      'Add one-off arrival costs: flights, insurance, a deposit if you rent, winter clothing and initial documents.',
      'Winter clothing is a real line item in Siberian cities and a small one in the south.',
    ],
    related: ['money-insurance', 'money-bank'],
  },
  {
    id: 'money-insurance',
    topic: 'Money',
    question: 'Do I need medical insurance?',
    keywords: ['insurance', 'medical', 'health', 'doctor', 'hospital', 'dms'],
    answer:
      'Yes. Compulsory medical insurance for international students is bought annually and is usually required before enrolment is finalised. It is not covered by any of the scholarships listed here.',
    points: [
      'Many universities sell an approved policy directly, which is simpler than arranging your own.',
      'Budget for it as a yearly lump sum rather than a monthly cost.',
    ],
  },
  {
    id: 'money-bank',
    topic: 'Money',
    question: 'How do I handle money and banking in Russia?',
    keywords: ['bank', 'card', 'money transfer', 'mir', 'atm', 'payment', 'account', 'cash'],
    answer:
      'International cards issued outside Russia generally do not work inside the country, so plan to open a local account and get a Mir card soon after you arrive. Ask your international office which bank the university works with, since student onboarding is easier there.',
    points: [
      'Bring enough cash in a major currency to cover your first weeks.',
      'Test how you will move money from home before you depend on it.',
    ],
    related: ['money-budget'],
  },
  {
    id: 'money-work',
    topic: 'Money',
    question: 'Can I work while studying?',
    keywords: ['work', 'job', 'part time', 'employ', 'earn', 'income'],
    answer:
      'International students can work, but the rules on permits and hours have changed repeatedly, and they differ depending on your visa and your university. Ask your international office for the current position rather than relying on older guidance online.',
    points: [
      'Do not plan your budget on the assumption that work income will arrive.',
      'On-campus research and teaching assistance is often the most accessible option.',
    ],
  },

  // -------------------------------------------------------------------- Language
  {
    id: 'lang-need',
    topic: 'Language',
    question: 'Do I need Russian to study in Russia?',
    keywords: ['russian', 'language', 'speak', 'english', 'taught', 'fluent', 'level'],
    answer:
      'Not to be admitted, if you choose an English-taught programme, and universities like HSE, ITMO, RUDN and MISIS have substantial English catalogues. You will need Russian to live comfortably, deal with administration, and work in most laboratories and hospitals.',
    points: [
      'Most Russian-taught programmes include a funded preparatory year to get you to roughly B1.',
      'Clinical placements in medicine effectively require Russian regardless of the teaching language.',
    ],
    related: ['lang-prep'],
  },
  {
    id: 'lang-prep',
    topic: 'Language',
    question: 'What is the preparatory faculty year?',
    keywords: ['preparatory', 'prep', 'foundation', 'podfak', 'language year', 'b1'],
    answer:
      'A year of intensive Russian language study before your degree begins, aimed at the level your programme requires. When it is granted as part of a quota or Open Doors award, the tuition is covered.',
    points: [
      'It adds a year to your stay, so add a year of living costs to your plan.',
      'You must pass the end-of-year certification to move on to your degree.',
    ],
    related: ['lang-need'],
  },

  // --------------------------------------------------------------- Life in Russia
  {
    id: 'life-registration',
    topic: 'Life in Russia',
    question: 'What is migration registration and when must I do it?',
    keywords: ['registration', 'migration', 'register', 'arrival', 'police', 'address', 'propiska'],
    answer:
      'Every foreign national must be registered at their address shortly after arrival, and again after any change of address or any trip abroad. In a dormitory the university normally handles it; in a private flat your landlord must cooperate.',
    points: [
      'Deadlines are counted in working days and are enforced with fines. Confirm the exact figure with your university on arrival.',
      'Keep your migration card and registration slip with your passport at all times.',
      'Ask a prospective landlord about registration before you sign anything.',
    ],
    related: ['house-private', 'visa-process'],
  },
  {
    id: 'life-climate',
    topic: 'Life in Russia',
    question: 'How bad is the winter, and what should I bring?',
    keywords: ['winter', 'cold', 'climate', 'weather', 'snow', 'clothes', 'temperature'],
    answer:
      'It depends heavily on the city. Rostov-on-Don rarely drops below about minus five, Moscow sits around minus ten, and Siberian cities like Tomsk and Novosibirsk reach minus twenty or lower. Buildings are heated well, so the cost is in the time you spend outdoors.',
    points: [
      'Buy the heavy coat and boots in Russia rather than at home. Local kit is better suited and often cheaper.',
      'Treat winter clothing as a one-off arrival cost of several thousand roubles.',
    ],
  },
  {
    id: 'life-halal',
    topic: 'Life in Russia',
    question: 'Is halal food available, and are there mosques?',
    keywords: ['halal', 'muslim', 'mosque', 'islam', 'prayer', 'ramadan', 'food'],
    answer:
      'Yes, particularly in Kazan, which has an established Muslim community, and in Moscow, Saint Petersburg and Rostov-on-Don. Halal sections in supermarkets and dedicated restaurants are straightforward to find in those cities and thinner in small Siberian ones.',
    points: [
      'Student communities from Arabic-speaking countries are largest in Moscow, Kazan and Rostov-on-Don.',
    ],
  },
  {
    id: 'life-arrival',
    topic: 'Life in Russia',
    question: 'What should I do in my first week after arriving?',
    keywords: ['arrive', 'arrival', 'first week', 'landing', 'what to do', 'start'],
    answer:
      'Report to the international office, complete migration registration, finish the medical checks your university requires, buy a local SIM card, open a bank account, collect your student card and dormitory pass, and find out where your faculty building actually is.',
    points: [
      'Do the registration first. Everything else can wait a few days; that cannot.',
      'Keep every piece of paper you are given, including receipts.',
    ],
    related: ['life-registration', 'money-bank'],
  },
];

export const TOPICS: Topic[] = [
  'Open Doors',
  'Government quota',
  'Applying',
  'Visa and documents',
  'Housing',
  'Money',
  'Language',
  'Life in Russia',
];

export const ENTRY_BY_ID = Object.fromEntries(
  KNOWLEDGE.map((e) => [e.id, e])
) as Record<string, Entry>;
