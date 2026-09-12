export type Range = { min: number; max: number };

export type City = {
  id: string;
  name: string;
  region: string;
  tagline: string;
  /** All figures are indicative monthly amounts in Russian roubles (RUB). */
  costs: {
    dorm: Range;
    sharedRoom: Range;
    studio: Range;
    food: Range;
    transport: number;
    utilities: Range;
    connectivity: number;
    misc: Range;
  };
  climate: { winterLowC: number; summerHighC: number };
  studentPopulationNote: string;
  universities: string[];
  highlights: string[];
};

/**
 * Indicative cost bands compiled for planning purposes only.
 * Rents, tariffs and food prices move quickly - verify against a current
 * source (university housing office, local listing sites) before relying on them.
 */
export const CITIES: City[] = [
  {
    id: 'moscow',
    name: 'Moscow',
    region: 'Central Federal District',
    tagline: 'The capital: most opportunities, highest prices.',
    costs: {
      dorm: { min: 2500, max: 9000 },
      sharedRoom: { min: 22000, max: 40000 },
      studio: { min: 45000, max: 80000 },
      food: { min: 18000, max: 32000 },
      transport: 700,
      utilities: { min: 5000, max: 8000 },
      connectivity: 700,
      misc: { min: 4000, max: 12000 },
    },
    climate: { winterLowC: -10, summerHighC: 24 },
    studentPopulationNote:
      'Largest concentration of universities and international students in Russia.',
    universities: ['msu', 'hse', 'mipt', 'bauman', 'rudn', 'sechenov'],
    highlights: [
      'Dense metro network with a heavily discounted student travel card',
      'The widest choice of English-taught Master programmes',
      'Best internship market, but also the toughest rental market',
    ],
  },
  {
    id: 'saint-petersburg',
    name: 'Saint Petersburg',
    region: 'Northwestern Federal District',
    tagline: 'Cultural capital with strong universities and softer rents than Moscow.',
    costs: {
      dorm: { min: 1500, max: 7000 },
      sharedRoom: { min: 16000, max: 28000 },
      studio: { min: 30000, max: 55000 },
      food: { min: 16000, max: 28000 },
      transport: 1100,
      utilities: { min: 4500, max: 7000 },
      connectivity: 600,
      misc: { min: 3500, max: 10000 },
    },
    climate: { winterLowC: -8, summerHighC: 22 },
    studentPopulationNote:
      'Second-largest student city with a very visible international community.',
    universities: ['spbu', 'itmo'],
    highlights: [
      'Roughly 25-30 percent cheaper to rent in than Moscow',
      'Long winter nights and a damp Baltic climate - budget for good clothing',
      'Compact historic centre, most campuses reachable without a car',
    ],
  },
  {
    id: 'kazan',
    name: 'Kazan',
    region: 'Republic of Tatarstan',
    tagline: 'Mid-size, modern and notably affordable.',
    costs: {
      dorm: { min: 800, max: 3500 },
      sharedRoom: { min: 10000, max: 18000 },
      studio: { min: 20000, max: 32000 },
      food: { min: 13000, max: 22000 },
      transport: 600,
      utilities: { min: 3500, max: 5500 },
      connectivity: 500,
      misc: { min: 2500, max: 7000 },
    },
    climate: { winterLowC: -12, summerHighC: 25 },
    studentPopulationNote:
      'Large student share of the population, with an established Muslim community and halal food options.',
    universities: ['kfu'],
    highlights: [
      'One of the best cost-to-quality ratios among Russian university cities',
      'Halal restaurants and mosques are easy to find',
      'Good rail and air links to Moscow',
    ],
  },
  {
    id: 'novosibirsk',
    name: 'Novosibirsk',
    region: 'Siberian Federal District',
    tagline: 'Research heavyweight built around the Akademgorodok science town.',
    costs: {
      dorm: { min: 800, max: 3000 },
      sharedRoom: { min: 10000, max: 17000 },
      studio: { min: 18000, max: 30000 },
      food: { min: 13000, max: 21000 },
      transport: 600,
      utilities: { min: 3500, max: 6000 },
      connectivity: 500,
      misc: { min: 2500, max: 7000 },
    },
    climate: { winterLowC: -20, summerHighC: 25 },
    studentPopulationNote:
      'Akademgorodok is a dedicated science town with dormitories next to the research institutes.',
    universities: ['nsu'],
    highlights: [
      'Strong for physics, mathematics and the natural sciences',
      'Severe winters - serious winter clothing is a real budget line',
      'Low rents even by regional standards',
    ],
  },
  {
    id: 'yekaterinburg',
    name: 'Yekaterinburg',
    region: 'Ural Federal District',
    tagline: 'Industrial and engineering hub on the Europe-Asia border.',
    costs: {
      dorm: { min: 900, max: 3200 },
      sharedRoom: { min: 11000, max: 18000 },
      studio: { min: 20000, max: 33000 },
      food: { min: 13000, max: 21000 },
      transport: 700,
      utilities: { min: 3500, max: 6000 },
      connectivity: 500,
      misc: { min: 2500, max: 7500 },
    },
    climate: { winterLowC: -16, summerHighC: 24 },
    studentPopulationNote:
      'Ural Federal University alone hosts thousands of international students.',
    universities: ['urfu'],
    highlights: [
      'Engineering, metallurgy and IT strengths',
      'Fourth-largest city in Russia but far cheaper than the two capitals',
      'Growing number of English-taught programmes',
    ],
  },
  {
    id: 'tomsk',
    name: 'Tomsk',
    region: 'Siberian Federal District',
    tagline: 'A small city where a large share of residents are students.',
    costs: {
      dorm: { min: 600, max: 2500 },
      sharedRoom: { min: 8000, max: 14000 },
      studio: { min: 15000, max: 24000 },
      food: { min: 12000, max: 19000 },
      transport: 500,
      utilities: { min: 3000, max: 5000 },
      connectivity: 450,
      misc: { min: 2000, max: 6000 },
    },
    climate: { winterLowC: -21, summerHighC: 24 },
    studentPopulationNote:
      'Among the highest student-to-resident ratios in Russia; the city is built around its campuses.',
    universities: ['tsu', 'tpu'],
    highlights: [
      'The cheapest option in this list by a clear margin',
      'Everything is walkable or a short bus ride away',
      'Very cold winters and limited international flight connections',
    ],
  },
  {
    id: 'nizhny-novgorod',
    name: 'Nizhny Novgorod',
    region: 'Volga Federal District',
    tagline: 'Close to Moscow, priced like a region.',
    costs: {
      dorm: { min: 900, max: 3200 },
      sharedRoom: { min: 11000, max: 18000 },
      studio: { min: 20000, max: 32000 },
      food: { min: 13000, max: 21000 },
      transport: 700,
      utilities: { min: 3500, max: 5500 },
      connectivity: 500,
      misc: { min: 2500, max: 7000 },
    },
    climate: { winterLowC: -12, summerHighC: 24 },
    studentPopulationNote:
      'Solid IT and engineering student community with a large second campus of HSE.',
    universities: ['unn'],
    highlights: [
      'High-speed train reaches Moscow in about four hours',
      'Active IT sector with internship openings',
      'Rents roughly half of Moscow levels',
    ],
  },
  {
    id: 'rostov-on-don',
    name: 'Rostov-on-Don',
    region: 'Southern Federal District',
    tagline: 'The mildest winters of any major Russian university city.',
    costs: {
      dorm: { min: 800, max: 3000 },
      sharedRoom: { min: 10000, max: 16000 },
      studio: { min: 18000, max: 28000 },
      food: { min: 13000, max: 20000 },
      transport: 600,
      utilities: { min: 3200, max: 5000 },
      connectivity: 500,
      misc: { min: 2500, max: 6500 },
    },
    climate: { winterLowC: -5, summerHighC: 30 },
    studentPopulationNote:
      'Popular with students from the Middle East and North Africa.',
    universities: ['sfedu'],
    highlights: [
      'Warmest climate on this list - much lower winter clothing costs',
      'Established Arabic-speaking student community',
      'Lower cost of living than the Volga and Ural cities',
    ],
  },
];

export const CITY_BY_ID = Object.fromEntries(
  CITIES.map((c) => [c.id, c])
) as Record<string, City>;
