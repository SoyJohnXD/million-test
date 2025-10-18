'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import { useFilterParams } from '@/hooks/useFilterParams';

import { FilterPopover } from './FilterPopover';
import { PriceFilter } from './PriceFilter';

export function QuickFilters() {
  const { filters, updateFilter } = useFilterParams();

  const handleApplyPrice = (priceFilters: {
    minPrice?: number | null;
    maxPrice?: number | null;
  }) => {
    updateFilter('minPrice', priceFilters.minPrice);
    updateFilter('maxPrice', priceFilters.maxPrice);
  };

  const handleClearPrice = () => {
    updateFilter('minPrice', null);
    updateFilter('maxPrice', null);
  };

  const isPriceFilterActive =
    filters.minPrice != null || filters.maxPrice != null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPopover
        title="Price Range"
        onApply={() => {}}
        onClear={handleClearPrice}
        trigger={
          <Button
            variant={isPriceFilterActive ? 'secondary' : 'outline'}
            size="sm"
          >
            <span>Price</span>
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        }
      >
        <PriceFilter onApply={handleApplyPrice} onClear={handleClearPrice} />
      </FilterPopover>

      <Button variant="outline" size="sm" disabled>
        Beds <ChevronDownIcon className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" disabled>
        Baths <ChevronDownIcon className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" disabled>
        Year <ChevronDownIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
