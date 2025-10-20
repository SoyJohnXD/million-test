import { render, screen } from '@testing-library/react';
import { Input } from '@/shared/ui/Input';

describe('Input', () => {
  it('propaga props básicas y renderiza placeholder', () => {
    render(<Input placeholder="Buscar" aria-label="campo" />);
    const el = screen.getByPlaceholderText(/buscar/i);
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'campo');
  });
});
