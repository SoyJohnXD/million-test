import { render, screen } from '@testing-library/react';
import { PropertyDetailsSection } from '@/features/properties/detail/ui/PropertyDetailsSection';

describe('PropertyDetailsSection', () => {
  it('muestra encabezado y detalles (año y código)', () => {
    render(<PropertyDetailsSection year={1995} codeInternal="ABC-123" />);
    expect(
      screen.getByRole('heading', { name: /details/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/year built: 1995/i)).toBeInTheDocument();
    expect(screen.getByText(/ref code: abc-123/i)).toBeInTheDocument();
  });
});
