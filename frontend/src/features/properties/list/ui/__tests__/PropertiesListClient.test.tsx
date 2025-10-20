import { render, screen } from '@testing-library/react';
import PropertiesListClient from '@/features/properties/list/ui/PropertiesListClient';
import * as propertiesService from '@/services/properties';

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}));

jest.mock('@/services/properties', () => ({
  getProperties: jest.fn(async () => ({
    items: [
      {
        idProperty: '10',
        name: 'Loaded',
        address: 'Addr',
        price: 1,
        bedrooms: 1,
        bathrooms: 1,
        squareMeters: 10,
        imageUrl: null,
      },
    ],
    hasNextPage: false,
  })),
}));

jest.mock('@/features/properties/list/ui/PropertyList', () => ({
  PropertyList: ({
    properties,
  }: {
    properties: Array<{ idProperty: string; name: string }>;
  }) => (
    <div>
      {properties.map((p) => (
        <div key={p.idProperty}>{p.name}</div>
      ))}
    </div>
  ),
}));

describe('PropertiesListClient', () => {
  it('carga más elementos cuando el sentinel entra en vista', async () => {
    render(
      <PropertiesListClient initialParams={{}} hasNextPageInitial={true} />
    );
    expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
  });

  it('muestra error si la carga falla', async () => {
    (propertiesService.getProperties as jest.Mock).mockRejectedValueOnce(
      new Error('failed')
    );
    render(
      <PropertiesListClient initialParams={{}} hasNextPageInitial={true} />
    );
    expect(await screen.findByText(/failed/i)).toBeInTheDocument();
  });
});
