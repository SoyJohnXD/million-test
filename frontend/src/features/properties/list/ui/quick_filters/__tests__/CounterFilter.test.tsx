import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CounterFilter } from '@/features/properties/list/ui/quick_filters/CounterFilter';

describe('CounterFilter', () => {
  it('selecciona Any y luego un valor', async () => {
    const user = userEvent.setup();
    const setTemp = jest.fn();
    render(
      <CounterFilter
        label="Minimum Bedrooms"
        initialValue={null}
        setTemporaryValue={setTemp}
        options={[1, 2, 3]}
        showAny={true}
      />
    );

    await user.click(screen.getByRole('button', { name: /any/i }));
    expect(setTemp).toHaveBeenLastCalledWith(null);

    await user.click(screen.getByRole('button', { name: '2+' }));
    expect(setTemp).toHaveBeenLastCalledWith(2);
  });
});
