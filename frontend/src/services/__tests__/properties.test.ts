import { getProperties, getPropertyById } from '@/services/properties';
import { fetchApi } from '@/services/api';

jest.mock('@/services/api', () => ({
  fetchApi: jest.fn(),
}));

describe('services/properties', () => {
  it('construye URL con parámetros y llama fetchApi', async () => {
    (fetchApi as jest.Mock).mockResolvedValue({
      items: [],
      pageNumber: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    });

    await getProperties({ address: 'Bogota', minPrice: 1000, pageNumber: 2 });

    expect(fetchApi).toHaveBeenCalledWith(
      expect.stringContaining('/Properties?'),
      expect.objectContaining({ method: 'GET' })
    );
    const endpoint = (fetchApi as jest.Mock).mock.calls[0][0] as string;
    expect(endpoint).toContain('Address=Bogota');
    expect(endpoint).toContain('MinPrice=1000');
    expect(endpoint).toContain('PageNumber=2');
  });

  it('getPropertyById devuelve detalle cuando ok', async () => {
    (fetchApi as jest.Mock).mockResolvedValueOnce({
      idProperty: '1',
      name: 'X',
      address: 'A',
      price: 1,
      codeInternal: 'C',
      year: 2020,
      description: '',
      bedrooms: 1,
      bathrooms: 1,
      squareMeters: 10,
      imageUrls: [],
      traces: [],
    });
    const res = await getPropertyById('1');
    expect(fetchApi).toHaveBeenCalledWith('/Properties/1', expect.any(Object));
    expect(res?.idProperty).toBe('1');
  });

  it('getPropertyById devuelve null en error', async () => {
    (fetchApi as jest.Mock).mockRejectedValueOnce(new Error('boom'));
    const res = await getPropertyById('2');
    expect(res).toBeNull();
  });
});
