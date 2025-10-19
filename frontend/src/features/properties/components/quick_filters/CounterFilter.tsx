'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CounterFilterProps } from '../../types/filters';

export function CounterFilter({
  initialValue,
  setTemporaryValue,
  label = 'Select',
  options = [1, 2, 3, 4, 5],
  showAny = true,
  suffix = '+',
}: CounterFilterProps) {
  const [localValue, setLocalValue] = useState<number | null>(
    initialValue ?? null
  );

  useEffect(() => setLocalValue(initialValue ?? null), [initialValue]);

  const handleSelect = (option: number | null) => {
    setLocalValue(option);
    setTemporaryValue(option);
  };

  return (
    <div className="space-y-3">
      <p className="text-secondary text-sm">{label}</p>
      <div className="flex flex-wrap gap-2">
        {showAny && (
          <Button
            type="button"
            onClick={() => handleSelect(null)}
            variant={localValue === null ? 'secondary' : 'outline'}
            size="sm"
            className="flex items-center gap-1"
          >
            Any
          </Button>
        )}
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            variant={localValue === option ? 'secondary' : 'outline'}
            size="sm"
            className="flex items-center gap-1"
          >
            {option}
            {suffix}
          </Button>
        ))}
      </div>
    </div>
  );
}
