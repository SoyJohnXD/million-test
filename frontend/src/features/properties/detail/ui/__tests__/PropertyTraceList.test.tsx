import { render, screen } from '@testing-library/react';
import { PropertyTraceList } from '@/features/properties/detail/ui/PropertyTraceList';
import { PropertyTrace } from '@/entities/property/model';

describe('PropertyTraceList', () => {
  const traces: PropertyTrace[] = [
    {
      name: 'Venta',
      value: 120000,
      tax: 6000,
      dateSale: '2023-05-10T00:00:00Z',
    },
    {
      name: '',
      value: 90000,
      tax: 4500,
      dateSale: 'invalid',
    },
  ];

  it('muestra historial con formato de fecha y moneda', () => {
    render(<PropertyTraceList traces={traces} />);
    expect(
      screen.getByRole('heading', { name: /property history/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/venta/i)).toBeInTheDocument();
    expect(screen.getAllByText(/transaction/i)[0]).toBeInTheDocument();

    expect(screen.getByText(/\w{3} \d{1,2}, \d{4}/)).toBeInTheDocument();
    expect(screen.getByText(/invalid date/i)).toBeInTheDocument();

    expect(screen.getAllByText(/value:/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/tax:/i)[0]).toBeInTheDocument();
  });
});
