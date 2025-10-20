import { PropertyFilterParams } from '@/types/api';

export const DEFAULT_PAGE_SIZE = 15;

export function buildPropertyFilterParams(
  searchParams: URLSearchParams
): PropertyFilterParams {
  const params: PropertyFilterParams = {
    name: searchParams.get('name'),
    address: searchParams.get('address'),
    minPrice: searchParams.has('minPrice')
      ? Number(searchParams.get('minPrice'))
      : null,
    maxPrice: searchParams.has('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : null,
    bedrooms: searchParams.has('bedrooms')
      ? Number(searchParams.get('bedrooms'))
      : null,
    bathrooms: searchParams.has('bathrooms')
      ? Number(searchParams.get('bathrooms'))
      : null,
    minYear: searchParams.has('year') ? Number(searchParams.get('year')) : null,
    minSquareMeters: searchParams.has('sqm')
      ? Number(searchParams.get('sqm'))
      : null,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  Object.keys(params).forEach((key) => {
    const typedKey = key as keyof PropertyFilterParams;
    if (params[typedKey] === null || params[typedKey] === undefined) {
      delete params[typedKey];
    }
  });

  return params;
}
