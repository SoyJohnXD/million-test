'use client';

import {
  PriceFilterValue,
  useFilterParams,
} from '@/features/properties/list/hooks/useFilterParams';
import { useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/shared/ui';
import { formatShortPrice } from '@/utils/text';
import { UseFilterParams } from '@/features/properties/list/types/filters';
import { FilterButton } from './FilterButton';
import { PriceFilter } from './PriceFilter';
import { CounterFilter } from './CounterFilter';

export function QuickFilters() {
  const { filters, updateFilter, clearFilter, clearAllFilters } =
    useFilterParams() as UseFilterParams;

  const handleApplyPrice = (value: PriceFilterValue) =>
    updateFilter('price', value);

  const handleApplyBedrooms = (value: number | null) =>
    updateFilter('bedrooms', value);
  const handleApplyBathrooms = (value: number | null) =>
    updateFilter('bathrooms', value);
  const handleApplyYear = (value: number | null) => updateFilter('year', value);
  const handleApplySqm = (value: number | null) => updateFilter('sqm', value);

  const handleClearPrice = () => clearFilter('price');
  const handleClearBedrooms = () => clearFilter('bedrooms');
  const handleClearBathrooms = () => clearFilter('bathrooms');
  const handleClearYear = () => clearFilter('year');
  const handleClearSqm = () => clearFilter('sqm');

  const priceLabel =
    filters.price?.min || filters.price?.max
      ? `${formatShortPrice(filters.price?.min || 0)} - ${
          filters.price?.max ? formatShortPrice(filters.price?.max) : '∞'
        }`
      : 'Price';

  const bedroomsLabel = filters.bedrooms
    ? `${filters.bedrooms}+ Beds`
    : 'Bedrooms';

  const bathroomsLabel = filters.bathrooms
    ? `${filters.bathrooms}+ Baths`
    : 'Bathrooms';

  const yearLabel = filters.year ? `Since ${filters.year}` : 'Year';

  const sqmLabel = filters.sqm ? `${filters.sqm}+ m²` : 'Area';

  const hasActiveFilters = useMemo(() => {
    const tempFilters = { ...filters };
    delete tempFilters.address;
    return Object.values(tempFilters).some((value) => {
      return value !== null && value !== undefined;
    });
  }, [filters]);

  return (
    <div className="flex flex-wrap gap-2">
      <FilterButton<PriceFilterValue>
        onApply={handleApplyPrice}
        onClear={handleClearPrice}
        initialValue={filters.price as PriceFilterValue | undefined}
        label={priceLabel}
        validateApply={(value) => {
          const min = value?.min ?? null;
          const max = value?.max ?? null;
          if (min != null && max != null && min > max) {
            return 'El precio mínimo no puede ser mayor que el máximo.';
          }
          return null;
        }}
      >
        {({ setTemporaryValue, initialValue, applyError }) => (
          <PriceFilter
            initialValue={initialValue as PriceFilterValue | undefined}
            setTemporaryValue={setTemporaryValue}
            applyError={applyError}
          />
        )}
      </FilterButton>

      <FilterButton<number | null>
        onApply={handleApplyBedrooms}
        onClear={handleClearBedrooms}
        initialValue={filters.bedrooms}
        label={bedroomsLabel}
      >
        {({ setTemporaryValue, initialValue }) => (
          <CounterFilter
            initialValue={initialValue as number | null | undefined}
            label="Minimum Bedrooms"
            setTemporaryValue={setTemporaryValue}
          />
        )}
      </FilterButton>

      <FilterButton<number | null>
        onApply={handleApplyBathrooms}
        onClear={handleClearBathrooms}
        initialValue={filters.bathrooms}
        label={bathroomsLabel}
      >
        {({ setTemporaryValue, initialValue }) => (
          <CounterFilter
            initialValue={initialValue as number | null | undefined}
            label="Minimum Bathrooms"
            setTemporaryValue={setTemporaryValue}
          />
        )}
      </FilterButton>

      <FilterButton<number | null>
        onApply={handleApplyYear}
        onClear={handleClearYear}
        initialValue={filters.year}
        label={yearLabel}
      >
        {({ setTemporaryValue, initialValue }) => (
          <CounterFilter
            initialValue={initialValue as number | null | undefined}
            label="Year (minimum)"
            options={[2000, 2005, 2010, 2015, 2020]}
            showAny={true}
            setTemporaryValue={setTemporaryValue}
          />
        )}
      </FilterButton>

      <FilterButton<number | null>
        onApply={handleApplySqm}
        onClear={handleClearSqm}
        initialValue={filters.sqm}
        label={sqmLabel}
      >
        {({ setTemporaryValue, initialValue }) => (
          <CounterFilter
            initialValue={initialValue as number | null | undefined}
            label="Minimum area (m²)"
            options={[50, 100, 150, 200, 300, 500]}
            showAny={true}
            setTemporaryValue={setTemporaryValue}
          />
        )}
      </FilterButton>

      {hasActiveFilters && (
        <Button
          variant={'secondary'}
          size="sm"
          className="bg-primary/35 flex items-center gap-1 rounded-full"
          onClick={clearAllFilters}
        >
          <span>Clear All</span>
          <XMarkIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
