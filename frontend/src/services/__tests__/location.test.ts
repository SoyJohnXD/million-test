import { searchCities } from '@/services/location';

describe('services/location', () => {
  afterEach(() => {
    // @ts-expect-error: reset global.fetch to undefined in tests
    global.fetch = undefined;
  });

  it('devuelve [] si query es corta', async () => {
    const res = await searchCities('ab');
    expect(res).toEqual([]);
  });

  it('llama a Nominatim y transforma respuesta', async () => {
    // @ts-expect-error: set global.fetch mock for test
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => [
        {
          addresstype: 'city',
          address: { city: 'Bogota', country: 'Colombia' },
          lat: '1',
          lon: '1',
        },
      ],
    }));

    const res = await searchCities('Bogo');
    expect(res[0]).toEqual({
      city: 'Bogota',
      country: 'Colombia',
      lat: '1',
      lon: '1',
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('maneja errores y devuelve []', async () => {
    // @ts-expect-error: set failing global.fetch mock for test
    global.fetch = jest.fn(async () => ({ ok: false, status: 500 }));
    const res = await searchCities('Bogo');
    expect(res).toEqual([]);
  });
});
