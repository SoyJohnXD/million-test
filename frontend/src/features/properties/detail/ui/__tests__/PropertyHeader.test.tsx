import { render, screen } from '@testing-library/react';
import { PropertyHeader } from '@/features/properties/detail/ui/PropertyHeader';

describe('PropertyHeader', () => {
  it('muestra nombre, dirección, precio y atributos', () => {
    render(
      <PropertyHeader
        name="Casa Linda"
        address="Calle 123"
        price={250000}
        bedrooms={3}
        bathrooms={2}
        squareMeters={120}
      />
    );

    expect(
      screen.getByRole('heading', { name: /casa linda/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/calle 123/i)).toBeInTheDocument();
    expect(screen.getByText(/\$|€|£/)).toBeInTheDocument();

    expect(screen.getByText(/3 beds/i)).toBeInTheDocument();
    expect(screen.getByText(/2 baths/i)).toBeInTheDocument();
    expect(screen.getByText(/120 m²/i)).toBeInTheDocument();
  });
});
