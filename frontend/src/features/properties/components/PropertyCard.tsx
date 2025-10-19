import Image from 'next/image';
import Link from 'next/link';
import { PropertyListItem } from '@/types/property';

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
    <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link href={`/${property.idProperty}`} className="block">
        <div className="relative aspect-video overflow-hidden">
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
        <div className="p-4">
          <h3 className="text-primary mb-1 truncate text-lg font-semibold">
            {property.name}
          </h3>
          <p className="mb-2 truncate text-sm text-gray-600 dark:text-gray-400">
            {property.address}
          </p>
          <p className="text-secondary mb-3 text-xl font-semibold dark:text-gray-200">
            {formatPrice(property.price)}
          </p>

          <div className="mb-4 flex space-x-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{property.bedrooms} bed</span>
            <span>&middot;</span>
            <span>{property.bathrooms} bath</span>
            <span>&middot;</span>
            <span>{property.squareMeters} m²</span>
          </div>

          {property.owner && (
            <div className="flex items-center gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
              <Image
                src={property.owner.photo || 'https://via.placeholder.com/40'}
                alt={property.owner.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {property.owner.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
