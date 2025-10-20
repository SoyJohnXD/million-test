import { render, screen } from '@testing-library/react';
import { Spinner } from '@/shared/ui/Spinner';

describe('Spinner', () => {
  it('expone role status y aria-label loading', () => {
    render(<Spinner />);
    const el = screen.getByRole('status', { name: /loading/i });
    expect(el).toBeInTheDocument();
  });
});
