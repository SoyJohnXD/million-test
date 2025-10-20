'use client';

import { Input } from './Input';
import React, { ChangeEvent, useState, useEffect } from 'react';

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  value: number | '';
  onChange: (value: string) => void;
}

export function CurrencyInput({
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value === '') {
      setDisplayValue('');
    } else {
      setDisplayValue(formatCurrency(value));
    }
  }, [value]);

  const formatCurrency = (num: number): string => {
    const formattedNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

    return `$ ${formattedNumber}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    onChange(rawValue);
  };

  return (
    <Input
      {...props}
      type="text"
      value={displayValue}
      onChange={handleChange}
    />
  );
}
