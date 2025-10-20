import { render, screen } from '@testing-library/react';
import { PropertyDescription } from '@/features/properties/detail/ui/PropertyDescription';

describe('PropertyDescription', () => {
  it('renderiza título y descripción con saltos de línea', () => {
    const text = 'Linea 1\nLinea 2';
    render(<PropertyDescription description={text} />);
    expect(
      screen.getByRole('heading', { name: /description/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Linea 1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Linea 2', { exact: false })).toBeInTheDocument();
  });
});
