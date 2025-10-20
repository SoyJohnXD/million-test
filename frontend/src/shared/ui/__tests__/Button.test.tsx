import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui/Button';

describe('Button', () => {
  it('renderiza un button por defecto', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button', { name: /click/i });
    expect(btn).toBeInTheDocument();
  });

  it('renderiza un Link cuando se pasa href', () => {
    render(<Button href="/go">Go</Button>);
    const link = screen.getByRole('link', { name: /go/i });
    expect(link).toHaveAttribute('href', '/go');
  });
});
