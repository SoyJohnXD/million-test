import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PriceFilter } from '@/features/properties/list/ui/quick_filters/PriceFilter';

describe('PriceFilter', () => {
  it('actualiza min y max con CurrencyInput', async () => {
    const user = userEvent.setup();
    const setTemp = jest.fn();
    render(
      <PriceFilter
        initialValue={{ min: null, max: null }}
        setTemporaryValue={setTemp}
      />
    );

    const minInput = screen.getByLabelText(/min/i);
    const maxInput = screen.getByLabelText(/max/i);

    await user.type(minInput, '1500');
    expect(setTemp).toHaveBeenLastCalledWith({ min: 1500, max: null });

    await user.type(maxInput, '2000');
    expect(setTemp).toHaveBeenLastCalledWith({ min: 1500, max: 2000 });
  });

  it('muestra applyError cuando se pasa', () => {
    const setTemp = jest.fn();
    render(
      <PriceFilter
        initialValue={{ min: 100, max: 50 }}
        setTemporaryValue={setTemp}
        applyError={'El precio mínimo no puede ser mayor que el máximo.'}
      />
    );
    expect(
      screen.getByRole('alert', { name: '' }) || screen.getByRole('alert')
    ).toHaveTextContent(/mínimo no puede ser mayor/i);
  });
});
