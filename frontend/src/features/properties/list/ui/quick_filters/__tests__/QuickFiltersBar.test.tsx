import { render, screen } from '@testing-library/react';
import { QuickFilters } from '@/features/properties/list/ui/quick_filters/QuickFiltersBar';

const clearAllFiltersMock = jest.fn();
jest.mock('@/features/properties/list/hooks/useFilterParams', () => ({
  useFilterParams: () => ({
    filters: {
      address: 'Bogota',
      price: { min: 1000, max: null },
      bedrooms: null,
      bathrooms: null,
      year: null,
      sqm: null,
    },
    updateFilter: jest.fn(),
    clearFilter: jest.fn(),
    clearAllFilters: clearAllFiltersMock,
  }),
}));

describe('QuickFilters', () => {
  it('muestra labels de filtros y botón Clear All cuando hay filtros', () => {
    render(<QuickFilters />);
    expect(
      screen.getByRole('button', { name: /\$1K - ∞/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /bedrooms/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /bathrooms/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /year/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /area/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clear all/i })
    ).toBeInTheDocument();
  });

  it('al hacer click en Clear All se llama clearAllFilters', async () => {
    render(<QuickFilters />);
    const btn = screen.getByRole('button', { name: /clear all/i });
    btn.click();
    expect(clearAllFiltersMock).toHaveBeenCalled();
  });
});
