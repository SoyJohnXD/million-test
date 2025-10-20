'use client';

import { useState, useEffect } from 'react';
import { CurrencyInput } from '@/shared/ui/CurrencyInput';
import { PriceFilterProps } from '../../types/filters';

export function PriceFilter({
  initialValue,
  setTemporaryValue,
  applyError,
}: PriceFilterProps) {
  const [localMin, setLocalMin] = useState<number | ''>(
    initialValue?.min ?? ''
  );
  const [localMax, setLocalMax] = useState<number | ''>(
    initialValue?.max ?? ''
  );

  useEffect(() => {
    setLocalMin(initialValue?.min ?? '');
    setLocalMax(initialValue?.max ?? '');
  }, [initialValue]);

  const handleChange = (type: 'min' | 'max', value: string) => {
    const num = value === '' ? '' : Number(value);
    if (type === 'min') {
      setLocalMin(num);
      setTemporaryValue({
        min: num === '' ? null : Number(num),
        max: localMax === '' ? null : Number(localMax),
      });
    } else {
      setLocalMax(num);
      setTemporaryValue({
        min: localMin === '' ? null : Number(localMin),
        max: num === '' ? null : Number(num),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm" htmlFor="minPrice">
            Min
          </label>
          <CurrencyInput
            id="minPrice"
            placeholder="e.g. $100,000"
            value={localMin}
            onChange={(value) => handleChange('min', value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="maxPrice">
            Max
          </label>
          <CurrencyInput
            id="maxPrice"
            placeholder="e.g. $500,000"
            value={localMax}
            onChange={(value) => handleChange('max', value)}
            className="mt-1"
          />
        </div>
      </div>

      {applyError && (
        <div className="text-sm text-red-500" role="alert">
          {applyError}
        </div>
      )}

      <div className="text-muted-foreground text-xs">
        Prices are in USD (American Dollars)
      </div>
    </div>
  );
}
