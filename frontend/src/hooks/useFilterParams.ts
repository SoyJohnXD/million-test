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

  const filters: Filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      address: params.address ?? null,
      price:
        params.minPrice || params.maxPrice
          ? {
              min: params.minPrice ? Number(params.minPrice) : null,
              max: params.maxPrice ? Number(params.maxPrice) : null,
            }
          : undefined,
      bedrooms: params.bedrooms ? Number(params.bedrooms) : null,
      bathrooms: params.bathrooms ? Number(params.bathrooms) : null,
      year: params.year ? Number(params.year) : null,
      sqm: params.sqm ? Number(params.sqm) : null,
    };
  }, [searchParams]);

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
    const currentAddress = searchParams.get('address');
    if (currentAddress) {
      router.replace(`${pathname}?address=${currentAddress}`, {
        scroll: false,
      });
    } else {
      router.replace(pathname, { scroll: false });
    }
  }, [router, pathname, searchParams]);

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
}
