import { render, screen } from '@testing-library/react';
import React from 'react';
import { PropertyImageGallery } from '@/features/properties/detail/ui/PropertyImageGallery';

jest.mock('next/image', () => {
  const Img = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props);
  Object.defineProperty(Img, 'displayName', { value: 'NextImageMock' });
  return Img;
});

describe('PropertyImageGallery', () => {
  it('muestra placeholder cuando no hay imágenes', () => {
    render(<PropertyImageGallery imageUrls={[]} propertyName="Apto" />);
    expect(screen.getByText(/no images available/i)).toBeInTheDocument();
  });

  it('renderiza imagen principal y hasta 4 secundarias, mostrando contador si hay más', () => {
    const urls = [
      'main.jpg',
      'a.jpg',
      'b.jpg',
      'c.jpg',
      'd.jpg',
      'e.jpg',
      'f.jpg',
    ];
    render(
      <PropertyImageGallery imageUrls={urls} propertyName="Apto Centro" />
    );

    const main = screen.getByAltText(
      /apto centro - imagen principal/i
    ) as HTMLImageElement;
    expect(main).toBeInTheDocument();
    expect(main.getAttribute('src')).toContain('main.jpg');

    expect(screen.getByAltText(/imagen 2/i)).toBeInTheDocument();
    expect(screen.getByAltText(/imagen 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/imagen 4/i)).toBeInTheDocument();
    expect(screen.getByAltText(/imagen 5/i)).toBeInTheDocument();

    expect(screen.getByText(/\+2 más/i)).toBeInTheDocument();
  });
});
