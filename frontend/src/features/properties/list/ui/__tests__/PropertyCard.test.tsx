import { render, screen } from '@testing-library/react';
import { PropertyCard } from '@/features/properties/list/ui/PropertyCard';
import { PropertyListItem } from '@/entities/property/model';

const base: PropertyListItem = {
  idProperty: '1',
  name: 'Nice House',
  address: '123 Main St',
  price: 250000,
  bedrooms: 3,
  bathrooms: 2,
  squareMeters: 120,
  imageUrl: null,
  owner: { name: 'John Owner', photo: null },
};

describe('PropertyCard', () => {
  it('renderiza información clave', () => {
    render(<PropertyCard property={base} />);
    expect(screen.getByText(/nice house/i)).toBeInTheDocument();
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.getByText(/3 bed/i)).toBeInTheDocument();
    expect(screen.getByText(/2 bath/i)).toBeInTheDocument();
    expect(screen.getByText(/120 m²/i)).toBeInTheDocument();
  });

  it('usa imagen placeholder si no hay imageUrl', () => {
    render(<PropertyCard property={{ ...base, imageUrl: null }} />);
    const img = screen.getByAltText(/image of nice house/i);
    expect(img).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });
});
