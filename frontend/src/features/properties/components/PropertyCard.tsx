import Image from 'next/image';
import Link from 'next/link';
import { PropertyListItem } from '@/types/property';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyCard({ property }: { property: PropertyListItem }) {
  return (
    <Card className="group overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <Link href={`/${property.idProperty}`} className="block">
        <div className="relative aspect-video">
          <Image
            src={
              property.imageUrl ||
              'https://via.placeholder.com/300x200?text=No+Image'
            }
            alt={`Image of ${property.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-primary mb-1 truncate">
            {property.name}
          </CardTitle>
          <p className="mb-2 truncate text-sm text-gray-600 dark:text-gray-400">
            {property.address}
          </p>
          <p className="text-secondary mb-2 font-semibold dark:text-gray-200">
            {formatPrice(property.price)}
          </p>
          <div className="flex space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{property.bedrooms} bed</span>
            <span>&middot;</span>
            <span>{property.bathrooms} bath</span>
            <span>&middot;</span>
            <span>{property.squareMeters} m²</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
