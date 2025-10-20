import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LocationSearchTrigger', () => {
  it('muestra dirección actual y permite limpiar', async () => {
    const clearFilter = jest.fn();
    const user = userEvent.setup();
    await jest.isolateModulesAsync(async () => {
      jest.doMock('next/navigation', () => ({
        useSearchParams: () => new URLSearchParams('address=Bogota'),
      }));
      jest.doMock('@/features/properties/list/hooks/useFilterParams', () => ({
        useFilterParams: () => ({ clearFilter }),
      }));
      const mod = await import(
        '@/features/properties/list/ui/location-filter/LocationSearchTrigger'
      );
      const Trigger = mod.LocationSearchTrigger;
      render(<Trigger onClick={jest.fn()} />);
    });
    expect(screen.getByText(/bogota/i)).toBeInTheDocument();
    const clearBtn = screen.getByRole('button', { name: '' });
    await user.click(clearBtn);
    expect(clearFilter).toHaveBeenCalledWith('address');
  });

  it('muestra placeholder cuando no hay address', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.doMock('next/navigation', () => ({
        useSearchParams: () => new URLSearchParams(''),
      }));
      jest.doMock('@/features/properties/list/hooks/useFilterParams', () => ({
        useFilterParams: () => ({ clearFilter: jest.fn() }),
      }));
      const mod = await import(
        '@/features/properties/list/ui/location-filter/LocationSearchTrigger'
      );
      const Trigger = mod.LocationSearchTrigger;
      render(<Trigger onClick={jest.fn()} />);
      expect(screen.getByText(/search by location/i)).toBeInTheDocument();
    });
  });
});
