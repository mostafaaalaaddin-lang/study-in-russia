import type { City, Range } from '@/data/cities';

export type HousingType = 'dorm' | 'sharedRoom' | 'studio';
export type LifestyleLevel = 'frugal' | 'moderate' | 'comfortable';

export const HOUSING_LABEL: Record<HousingType, string> = {
  dorm: 'University dormitory',
  sharedRoom: 'Room in a shared flat',
  studio: 'Own studio flat',
};

export const LIFESTYLE_LABEL: Record<LifestyleLevel, string> = {
  frugal: 'Frugal',
  moderate: 'Moderate',
  comfortable: 'Comfortable',
};

/** Where in each cost band a given lifestyle lands: 0 is the floor, 1 is the ceiling. */
const LIFESTYLE_POSITION: Record<LifestyleLevel, number> = {
  frugal: 0,
  moderate: 0.45,
  comfortable: 1,
};

function pick(range: Range, position: number): number {
  return Math.round(range.min + (range.max - range.min) * position);
}

export type BudgetLine = {
  key: string;
  label: string;
  monthlyRub: number;
  note: string;
};

export type Budget = {
  lines: BudgetLine[];
  monthlyTotalRub: number;
  academicYearRub: number;
  oneOffLines: BudgetLine[];
  oneOffTotalRub: number;
  firstYearTotalRub: number;
};

export type BudgetInput = {
  city: City;
  housing: HousingType;
  lifestyle: LifestyleLevel;
  /** Monthly scholarship stipend, subtracted from the shortfall calculation. */
  stipendRub: number;
  months: number;
};

export function buildBudget({ city, housing, lifestyle, months }: BudgetInput): Budget {
  const p = LIFESTYLE_POSITION[lifestyle];
  const c = city.costs;

  const rent = pick(c[housing], p);
  const privateRental = housing !== 'dorm';

  const lines: BudgetLine[] = [
    {
      key: 'housing',
      label: HOUSING_LABEL[housing],
      monthlyRub: rent,
      note: privateRental
        ? 'Rent only. Utilities are billed separately.'
        : 'Dormitory fee. Payable even on a fully funded place.',
    },
    {
      key: 'food',
      label: 'Food',
      monthlyRub: pick(c.food, p),
      note: 'Groceries with occasional meals out.',
    },
    {
      key: 'transport',
      label: 'Transport',
      monthlyRub: c.transport,
      note: 'Discounted student travel card.',
    },
    {
      key: 'connectivity',
      label: 'Mobile and internet',
      monthlyRub: c.connectivity,
      note: 'Local SIM with data.',
    },
    {
      key: 'misc',
      label: 'Everything else',
      monthlyRub: pick(c.misc, p),
      note: 'Clothing, books, social life, small emergencies.',
    },
  ];

  if (privateRental) {
    lines.splice(1, 0, {
      key: 'utilities',
      label: 'Utilities',
      monthlyRub: pick(c.utilities, p),
      note: 'Heating, electricity, water. Higher in winter.',
    });
  }

  const monthlyTotalRub = lines.reduce((n, l) => n + l.monthlyRub, 0);

  const winterKit = city.climate.winterLowC <= -15 ? 22000 : city.climate.winterLowC <= -8 ? 15000 : 8000;

  const oneOffLines: BudgetLine[] = [
    {
      key: 'flight',
      label: 'Flights',
      monthlyRub: 45000,
      note: 'One-way, varies enormously by origin. Adjust this for your own route.',
    },
    {
      key: 'insurance',
      label: 'Medical insurance',
      monthlyRub: 9000,
      note: 'Annual policy, usually required before enrolment is confirmed.',
    },
    {
      key: 'documents',
      label: 'Visa, translation and legalisation',
      monthlyRub: 18000,
      note: 'Consular fees, certified translation, apostille.',
    },
    {
      key: 'winter',
      label: 'Winter clothing',
      monthlyRub: winterKit,
      note: `Sized for winter lows near ${city.climate.winterLowC} degrees. Cheaper to buy in Russia.`,
    },
  ];

  if (privateRental) {
    oneOffLines.push({
      key: 'deposit',
      label: 'Rental deposit',
      monthlyRub: rent,
      note: 'Landlords typically ask for one month rent up front as a deposit.',
    });
  }

  const oneOffTotalRub = oneOffLines.reduce((n, l) => n + l.monthlyRub, 0);
  const academicYearRub = monthlyTotalRub * months;

  return {
    lines,
    monthlyTotalRub,
    academicYearRub,
    oneOffLines,
    oneOffTotalRub,
    firstYearTotalRub: academicYearRub + oneOffTotalRub,
  };
}

export const COLORS: Record<string, string> = {
  housing: '#0b5fd6',
  utilities: '#3b82f6',
  food: '#0ea5a4',
  transport: '#f59e0b',
  connectivity: '#a855f7',
  misc: '#d52b1e',
};
