import { PropertyListItem, PropertyDetail } from '@/entities/property/model';
import { PaginatedList, PropertyFilterParams } from '@/types/api';
import { fetchApi } from './api';

const appendParamIfExists = (
  params: URLSearchParams,
  value: string | number | null | undefined,
  paramName: string
) => {
  if (value !== undefined && value !== null) {
    params.append(paramName, value.toString());
  }
};

export async function getProperties(
  params: PropertyFilterParams = {}
): Promise<PaginatedList<PropertyListItem>> {
  const queryParams = new URLSearchParams();

  const paramMappings: { [key: string]: string } = {
    name: 'Name',
    address: 'Address',
    minPrice: 'MinPrice',
    maxPrice: 'MaxPrice',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    minYear: 'MinYear',
    minSquareMeters: 'MinSquareMeters',
    pageNumber: 'PageNumber',
    pageSize: 'PageSize',
  };

  Object.entries(params).forEach(([key, value]) => {
    appendParamIfExists(queryParams, value, paramMappings[key]);
  });

  const queryString = queryParams.toString();
  const endpoint = `/Properties${queryString ? `?${queryString}` : ''}`;

  return fetchApi<PaginatedList<PropertyListItem>>(endpoint, {
    method: 'GET',
    next: {
      revalidate: 60,
    },
  });
}

export async function getPropertyById(
  id: string
): Promise<PropertyDetail | null> {
  const endpoint = `/Properties/${id}`;
  try {
    return await fetchApi<PropertyDetail>(endpoint, {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    });
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
}
