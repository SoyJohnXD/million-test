'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useFilterParams } from '@/hooks/useFilterParams';

interface PriceFilterProps {
  onApply: (filters: {
    minPrice?: number | null;
    maxPrice?: number | null;
  }) => void;
  onClear: () => void;
}

export function PriceFilter({ onApply, onClear }: PriceFilterProps) {
  const { filters } = useFilterParams();
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? '');

  useEffect(() => {
    setMinPrice(filters.minPrice?.toString() ?? '');
    setMaxPrice(filters.maxPrice?.toString() ?? '');
  }, [filters.minPrice, filters.maxPrice]);

  const handleApply = () => {
    onApply({
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="$ No Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="Minimum price"
        />
        <span>-</span>
        <Input
          type="number"
          placeholder="$ No Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}
