import { render, screen } from '@testing-library/react';
import { Toast } from '@/shared/ui/Toast';

describe('Toast', () => {
  it('renderiza título y descripción', () => {
    render(<Toast title="Hola" description="Mensaje" variant="success" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/hola/i)).toBeInTheDocument();
    expect(screen.getByText(/mensaje/i)).toBeInTheDocument();
  });

  it('aplica variant por defecto', () => {
    render(<Toast description="Texto" />);
    expect(screen.getByRole('status')).toHaveClass('bg-blue-50');
  });
});
