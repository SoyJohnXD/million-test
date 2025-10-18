import { fetchApi } from './api';
import { PropertyListItem, PropertyDetail } from '@/types/property';
import { PaginatedList, PropertyFilterParams } from '@/types/api';

export async function getProperties(
  params: PropertyFilterParams = {}
): Promise<PaginatedList<PropertyListItem>> {
  const queryParams = new URLSearchParams();
  if (params.name) queryParams.append('Name', params.name);
  if (params.address) queryParams.append('Address', params.address);
  if (params.minPrice !== undefined && params.minPrice !== null)
    queryParams.append('MinPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined && params.maxPrice !== null)
    queryParams.append('MaxPrice', params.maxPrice.toString());
  if (params.pageNumber)
    queryParams.append('PageNumber', params.pageNumber.toString());
  if (params.pageSize)
    queryParams.append('PageSize', params.pageSize.toString());

  const queryString = queryParams.toString();
  const endpoint = `/Properties${queryString ? `?${queryString}` : ''}`;

  return fetchApi<PaginatedList<PropertyListItem>>(endpoint, {
    method: 'GET',
    // TODO: cache: 'no-store',
  });
}

export async function getPropertyById(
  id: string
): Promise<PropertyDetail | null> {
  const endpoint = `/Properties/${id}`;
  try {
    return await fetchApi<PropertyDetail>(endpoint, {
      method: 'GET',
      // cache: 'no-store',
    });
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
}
