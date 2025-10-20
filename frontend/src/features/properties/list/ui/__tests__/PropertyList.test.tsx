import { render, screen } from '@testing-library/react';
import React from 'react';
import { PropertyList } from '@/features/properties/list/ui/PropertyList';
import { PropertyListItem } from '@/entities/property/model';

jest.mock('@/features/properties/list/ui/PropertyCard', () => {
  type MockProps = { property: { idProperty: string; name: string } };
  const Mock = React.forwardRef<HTMLDivElement, MockProps>(
    ({ property }, ref) => (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-testid={`card-${property.idProperty}`}
      >
        {property.name}
      </div>
    )
  );
  Mock.displayName = 'PropertyCardMock';
  return { PropertyCard: Mock };
});

const props: PropertyListItem[] = [
  {
    idProperty: '1',
    name: 'A',
    address: 'X',
    price: 1,
    bedrooms: 1,
    bathrooms: 1,
    squareMeters: 10,
    imageUrl: null,
  },
  {
    idProperty: '2',
    name: 'B',
    address: 'Y',
    price: 2,
    bedrooms: 2,
    bathrooms: 2,
    squareMeters: 20,
    imageUrl: null,
  },
];

describe('PropertyList', () => {
  it('renderiza un card por propiedad', () => {
    render(<PropertyList properties={props} />);
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
  });
});
