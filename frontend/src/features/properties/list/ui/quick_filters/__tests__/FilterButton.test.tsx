import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterButton } from '@/features/properties/list/ui/quick_filters/FilterButton';

describe('FilterButton', () => {
  it('muestra label y abre popover', async () => {
    const user = userEvent.setup();
    render(
      <FilterButton
        label="Bedrooms"
        onApply={jest.fn()}
        onClear={jest.fn()}
        initialValue={undefined}
      >
        {() => <div>Body</div>}
      </FilterButton>
    );

    const trigger = screen.getByRole('button', { name: /bedrooms/i });
    expect(trigger).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
