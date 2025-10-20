import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FilterPopover } from '@/features/properties/list/ui/quick_filters/FilterPopover';

describe('FilterPopover', () => {
  function TriggerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button type="button" {...props}>
        Open
      </button>
    );
  }

  it('abre con trigger y aplica valor temporal', async () => {
    const onApply = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterPopover
        trigger={<TriggerButton />}
        onApply={onApply}
        onClear={jest.fn()}
        initialValue={undefined}
      >
        {({ setTemporaryValue }) => (
          <button type="button" onClick={() => setTemporaryValue('X')}>
            Set
          </button>
        )}
      </FilterPopover>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /set/i }));
    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(onApply).toHaveBeenCalledWith('X');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clear llama onClear y cierra', async () => {
    const onClear = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterPopover
        trigger={<TriggerButton />}
        onApply={jest.fn()}
        onClear={onClear}
        initialValue={undefined}
      >
        {() => <div>Body</div>}
      </FilterPopover>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(onClear).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('muestra error de validación y no aplica', async () => {
    const onApply = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterPopover
        trigger={<TriggerButton />}
        onApply={onApply}
        onClear={jest.fn()}
        validateApply={() => 'Error msg'}
      >
        {() => <div>Body</div>}
      </FilterPopover>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /apply/i }));
    expect(onApply).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('cierra con tecla Escape', async () => {
    const user = userEvent.setup();
    render(
      <FilterPopover
        trigger={<TriggerButton />}
        onApply={jest.fn()}
        onClear={jest.fn()}
      >
        {() => <div>Body</div>}
      </FilterPopover>
    );
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
