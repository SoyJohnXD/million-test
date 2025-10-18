import { LocationSearchResult } from '@/types/location';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

export async function searchLocations(
  query: string
): Promise<LocationSearchResult[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '0',
    limit: '5',
  });

  const url = `${NOMINATIM_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {},
    });

    if (!response.ok) {
      throw new Error(
        `Nominatim API request failed with status ${response.status}`
      );
    }

    const data: LocationSearchResult[] = await response.json();
    return data;
  } catch (error) {
    console.error('Nominatim API Fetch Error:', error);
    return [];
  }
}
