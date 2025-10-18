'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export interface FilterParams {
  address?: string | null;
  name?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  page?: number;
}

type FilterKey = keyof FilterParams;

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getCurrentFilters = useCallback((): FilterParams => {
    const params: FilterParams = {};
    const pageStr = searchParams.get('page');
    const minPriceStr = searchParams.get('minPrice');
    const maxPriceStr = searchParams.get('maxPrice');

    params.address = searchParams.get('address');
    params.name = searchParams.get('name');
    params.page = pageStr ? parseInt(pageStr, 10) : 1;
    params.minPrice = minPriceStr ? parseFloat(minPriceStr) : null;
    params.maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : null;

    if (isNaN(params.page)) params.page = 1;
    if (minPriceStr && isNaN(params.minPrice as number)) params.minPrice = null;
    if (maxPriceStr && isNaN(params.maxPrice as number)) params.maxPrice = null;

    return params;
  }, [searchParams]);

  const updateFilter = useCallback(
    (key: FilterKey, value: string | number | null | undefined) => {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );

      if (value === null || value === undefined || value === '') {
        currentParams.delete(key);
      } else {
        currentParams.set(key, String(value));
      }

      if (key !== 'page') {
        currentParams.set('page', '1');
      }

      const newQueryString = currentParams.toString();
      const newUrl = newQueryString
        ? `${pathname}?${newQueryString}`
        : pathname;

      router.push(newUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const currentFilters = getCurrentFilters();

  return {
    filters: currentFilters,
    updateFilter,
  };
}
