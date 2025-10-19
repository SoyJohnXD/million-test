import { CityResult } from '@/types/location';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

export async function searchCities(query: string): Promise<CityResult[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2', // versión recomendada
    addressdetails: '1',
    limit: '5',
    class: 'place',
  });

  const url = `${NOMINATIM_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'YourAppName (your@email.com)',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Nominatim API request failed with status ${response.status}`
      );
    }

    const data: any[] = await response.json();

    const filtered = data.filter(
      (item) =>
        item.addresstype === 'city' ||
        item.addresstype === 'town' ||
        item.addresstype === 'village' ||
        item.addresstype === 'hamlet'
    );

    const formatted: CityResult[] = filtered.map((item) => {
      const address = item.address || {};

      const cityName =
        address.city ||
        address.town ||
        address.village ||
        address.hamlet ||
        item.name ||
        'Desconocido';

      const countryName = address.country || 'País desconocido';

      return {
        city: cityName,
        country: countryName,
        lat: item.lat,
        lon: item.lon,
      };
    });

    return formatted;
  } catch (error) {
    console.error('Nominatim API Fetch Error:', error);
    return [];
  }
}
