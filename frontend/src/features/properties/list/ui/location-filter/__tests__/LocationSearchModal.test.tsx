import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationSearchModal } from '@/features/properties/list/ui/location-filter/LocationSearchModal';

const updateFilter = jest.fn();
jest.mock('@/features/properties/list/hooks/useFilterParams', () => ({
  useFilterParams: () => ({ updateFilter }),
}));

jest.mock('@/services/location', () => ({
  searchCities: jest.fn(async () => [
    { city: 'Bogota', country: 'Colombia', lat: '1', lon: '1' },
  ]),
}));

describe('LocationSearchModal', () => {
  it('se muestra cuando isOpen es true y busca al escribir', async () => {
    const user = userEvent.setup();
    render(<LocationSearchModal isOpen={true} onClose={() => {}} />);
    const input = screen.getByPlaceholderText(/search city/i);
    await user.type(input, 'Bog');
    await waitFor(() =>
      expect(screen.getByText(/bogota, colombia/i)).toBeInTheDocument()
    );
  });

  it('no busca con menos de 3 caracteres', async () => {
    const user = userEvent.setup();
    render(<LocationSearchModal isOpen={true} onClose={() => {}} />);
    const input = screen.getByPlaceholderText(/search city/i);
    await user.type(input, 'Bo');
    expect(
      screen.getByText(/enter at least 3 characters/i)
    ).toBeInTheDocument();
  });

  it('al seleccionar una ciudad, actualiza filtro y cierra', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<LocationSearchModal isOpen={true} onClose={onClose} />);
    const input = screen.getByPlaceholderText(/search city/i);
    await user.type(input, 'Bog');
    const item = await screen.findByText(/bogota, colombia/i);
    await user.click(item);
    expect(updateFilter).toHaveBeenCalledWith('address', 'Bogota, Colombia');
    expect(onClose).toHaveBeenCalled();
  });
});
