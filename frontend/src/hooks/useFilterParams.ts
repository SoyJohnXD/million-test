'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface PriceFilterValue {
  min: number | null;
  max: number | null;
}

export interface Filters {
  address?: string | null;
  price?: PriceFilterValue;
  bedrooms?: number | null;
  bathrooms?: number | null;
  year?: number | null;
  sqm?: number | null;
}

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const address = searchParams.get('address');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const bathrooms = searchParams.get('bathrooms');
  const year = searchParams.get('year');
  const sqm = searchParams.get('sqm');

  const filters: Filters = useMemo(() => {
    return {
      address: address ?? null,
      price:
        minPrice || maxPrice
          ? {
              min: minPrice ? Number(minPrice) : null,
              max: maxPrice ? Number(maxPrice) : null,
            }
          : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      year: year ? Number(year) : null,
      sqm: sqm ? Number(sqm) : null,
    };
  }, [address, minPrice, maxPrice, bedrooms, bathrooms, year, sqm]);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      const newParams = new URLSearchParams(searchParams.toString());

      switch (key) {
        case 'price': {
          const priceVal = value as PriceFilterValue;
          if (priceVal?.min != null)
            newParams.set('minPrice', String(priceVal.min));
          else newParams.delete('minPrice');

          if (priceVal?.max != null)
            newParams.set('maxPrice', String(priceVal.max));
          else newParams.delete('maxPrice');
          break;
        }

        case 'address': {
          const addressVal = (value as string | null)?.trim();
          if (addressVal) newParams.set('address', addressVal);
          else newParams.delete('address');
          break;
        }

        default: {
          const numericVal = value as number | null;
          if (numericVal != null)
            newParams.set(String(key), String(numericVal));
          else newParams.delete(String(key));
          break;
        }
      }

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearFilter = useCallback(
    (key: keyof Filters) => {
      const newParams = new URLSearchParams(searchParams.toString());

      switch (key) {
        case 'price':
          newParams.delete('minPrice');
          newParams.delete('maxPrice');
          break;
        case 'address':
          newParams.delete('address');
          break;
        default:
          newParams.delete(String(key));
          break;
      }

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    const address = searchParams.get('address');
    if (address) newParams.set('address', address);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
}
