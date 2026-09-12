'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type CurrencyCode = 'RUB' | 'USD' | 'EUR';

/**
 * Exchange rates are assumptions, not live data. They are user-editable
 * precisely because they move, and every figure in the app is quoted in
 * roubles underneath.
 */
export const DEFAULT_RATES: Record<CurrencyCode, number> = {
  RUB: 1,
  USD: 85,
  EUR: 95,
};

type CurrencyState = {
  code: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  setCode: (c: CurrencyCode) => void;
  setRate: (c: CurrencyCode, rate: number) => void;
  resetRates: () => void;
  /** Convert an amount in roubles to the selected currency. */
  convert: (rub: number) => number;
  /** Format an amount in roubles for display in the selected currency. */
  format: (rub: number, opts?: { round?: number }) => string;
  symbol: string;
};

const CurrencyContext = createContext<CurrencyState | null>(null);

const SYMBOLS: Record<CurrencyCode, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { value: code, setValue: setCode } = useLocalStorage<CurrencyCode>(
    'sir.currency',
    'RUB'
  );
  const { value: rates, setValue: setRates, reset: resetRates } = useLocalStorage(
    'sir.rates',
    DEFAULT_RATES
  );

  const state = useMemo<CurrencyState>(() => {
    const rate = rates[code] || 1;
    const convert = (rub: number) => rub / rate;

    const format = (rub: number, opts?: { round?: number }) => {
      const amount = convert(rub);
      const round = opts?.round ?? (code === 'RUB' ? 100 : 1);
      const rounded = Math.round(amount / round) * round;
      const body = rounded.toLocaleString('en-US', { maximumFractionDigits: 0 });
      return code === 'RUB' ? `${body} ₽` : `${SYMBOLS[code]}${body}`;
    };

    return {
      code,
      rates,
      setCode,
      setRate: (c, r) => setRates({ ...rates, [c]: r > 0 ? r : 1 }),
      resetRates,
      convert,
      format,
      symbol: SYMBOLS[code],
    };
  }, [code, rates, setCode, setRates, resetRates]);

  return <CurrencyContext.Provider value={state}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}
