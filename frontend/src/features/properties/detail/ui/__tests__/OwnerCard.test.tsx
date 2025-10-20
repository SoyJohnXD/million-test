import { render, screen } from '@testing-library/react';
import { OwnerCard } from '@/features/properties/detail/ui/OwnerCard';

describe('OwnerCard', () => {
  it('muestra info del propietario y formulario', () => {
    render(
      <OwnerCard
        owner={{
          idOwner: '1',
          name: 'Alice',
          address: 'Street 1',
          photo: null,
        }}
      />
    );
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/street 1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your message/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /contact agent/i })
    ).toBeInTheDocument();
  });
});
