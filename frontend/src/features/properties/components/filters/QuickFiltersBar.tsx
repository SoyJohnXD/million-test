'use client';
import { FilterButton } from './FilterButton';
import { PriceFilter } from './PriceFilter';
import { CounterFilter } from './CounterFilter';
import { useFilterParams } from '@/hooks/useFilterParams';

const formatShortPrice = (value: number | null | undefined): string => {
  if (!value) return '0';

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

export function QuickFilters() {
  const { filters, updateFilter, clearFilter } = useFilterParams();

  const handleApplyPrice = (value: {
    min: number | null;
    max: number | null;
  }) => updateFilter('price', value);

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

  return (
    <div className="flex flex-wrap gap-2">
      <FilterButton
        onApply={handleApplyPrice}
        onClear={handleClearPrice}
        initialValue={filters.price}
        label={priceLabel}
      >
        <PriceFilter
          initialValue={filters.price}
          setTemporaryValue={() => {}}
        />
      </FilterButton>

      <FilterButton
        onApply={handleApplyBedrooms}
        onClear={handleClearBedrooms}
        initialValue={filters.bedrooms}
        label={bedroomsLabel}
      >
        <CounterFilter
          initialValue={filters.bedrooms}
          label="Minimum Bedrooms"
          setTemporaryValue={() => {}}
        />
      </FilterButton>

      <FilterButton
        onApply={handleApplyBathrooms}
        onClear={handleClearBathrooms}
        initialValue={filters.bathrooms}
        label={bathroomsLabel}
      >
        <CounterFilter
          initialValue={filters.bathrooms}
          label="Minimum Bathrooms"
          setTemporaryValue={() => {}}
        />
      </FilterButton>

      <FilterButton
        onApply={handleApplyYear}
        onClear={handleClearYear}
        initialValue={filters.year}
        label={yearLabel}
      >
        <CounterFilter
          initialValue={filters.year}
          label="Year (minimum)"
          options={[2000, 2005, 2010, 2015, 2020]}
          showAny={true}
          setTemporaryValue={() => {}}
        />
      </FilterButton>

      <FilterButton
        onApply={handleApplySqm}
        onClear={handleClearSqm}
        initialValue={filters.sqm}
        label={sqmLabel}
      >
        <CounterFilter
          initialValue={filters.sqm}
          label="Minimum area (m²)"
          options={[50, 100, 150, 200, 300, 500]}
          showAny={true}
          setTemporaryValue={() => {}}
        />
      </FilterButton>
    </div>
  );
}
