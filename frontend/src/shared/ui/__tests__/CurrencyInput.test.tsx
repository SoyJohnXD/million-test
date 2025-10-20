import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { CurrencyInput } from '@/shared/ui/CurrencyInput';

describe('CurrencyInput', () => {
  it('formatea el valor como moneda en display', () => {
    render(<CurrencyInput value={1000} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('$ 1000');
  });

  it('onChange entrega el valor numérico sin formato', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();

    function Controlled() {
      const [val, setVal] = useState<number | ''>('');
      return (
        <CurrencyInput
          value={val}
          onChange={(raw) => {
            handle(raw);
            setVal(raw === '' ? '' : Number(raw));
          }}
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByRole('textbox');
    await user.type(input, '1234');
    const calls: string[] = (handle.mock.calls as Array<[string]>).map(
      (c) => c[0]
    );
    expect(calls[calls.length - 1]).toBe('1234');
  });
});
