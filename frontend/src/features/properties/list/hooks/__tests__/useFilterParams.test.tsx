import { renderHook } from '@testing-library/react';
import { useFilterParams } from '@/features/properties/list/hooks/useFilterParams';

const replaceMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => '/properties',
  useSearchParams: () => new URLSearchParams('address=Bogota&minPrice=1000'),
}));

describe('useFilterParams', () => {
  it('lee parámetros iniciales de la URL', () => {
    const { result } = renderHook(() => useFilterParams());
    expect(result.current.filters.address).toBe('Bogota');
    expect(result.current.filters.price?.min).toBe(1000);
    expect(result.current.filters.price?.max).toBeNull();
  });

  it('updateFilter(price) compone min/max correctamente', () => {
    const { result } = renderHook(() => useFilterParams());
    result.current.updateFilter('price', { min: 2000, max: 5000 });
    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining('/properties?'),
      { scroll: false }
    );
    const urlArg: string = (replaceMock.mock.calls[0][0] as string) || '';
    expect(urlArg).toContain('minPrice=2000');
    expect(urlArg).toContain('maxPrice=5000');
  });

  it('clearAllFilters mantiene address', () => {
    replaceMock.mockClear();
    const { result } = renderHook(() => useFilterParams());
    result.current.clearAllFilters();
    const urlArg: string = (replaceMock.mock.calls[0][0] as string) || '';
    expect(urlArg).toContain('address=Bogota');
    expect(urlArg).not.toContain('minPrice');
  });
});
