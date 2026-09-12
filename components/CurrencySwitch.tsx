'use client';

import { useState } from 'react';
import { useCurrency, type CurrencyCode } from '@/lib/currency';

const CODES: CurrencyCode[] = ['RUB', 'USD', 'EUR'];

export function CurrencySwitch() {
  const { code, setCode, rates, setRate, resetRates } = useCurrency();
  const [editing, setEditing] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-1 rounded-lg border border-ink-200 bg-surface p-0.5">
        {CODES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCode(c)}
            className={`rounded px-2 py-1 text-xs font-semibold transition ${
              code === c ? 'bg-flag-blue text-white' : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="rounded px-1.5 py-1 text-xs text-ink-400 hover:text-ink-900"
          aria-label="Edit exchange rates"
          title="Edit exchange rates"
        >
          rate
        </button>
      </div>

      {editing && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-ink-200 bg-surface p-4 shadow-lg">
          <p className="text-sm font-semibold text-ink-900">Exchange rates</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-500">
            Every figure in this app is stored in roubles. These rates are assumptions, not live
            data. Set them to whatever your bank is actually quoting.
          </p>
          <div className="mt-3 space-y-2">
            {(['USD', 'EUR'] as CurrencyCode[]).map((c) => (
              <label key={c} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-ink-600">
                  1 {c} = <span className="font-semibold text-ink-900">RUB</span>
                </span>
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  value={rates[c]}
                  onChange={(e) => setRate(c, Number(e.target.value))}
                  className="field w-24 py-1 text-right"
                />
              </label>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={resetRates} className="btn-ghost flex-1 py-1.5 text-xs">
              Reset
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn-primary flex-1 py-1.5 text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
