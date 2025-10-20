import { forwardRef, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PropertyListItem } from '@/entities/property/model';
import { formatCurrency } from '@/utils/text';

type PropertyCardProps = {
  property: PropertyListItem;
};

const PropertyCardComponent = forwardRef<HTMLDivElement, PropertyCardProps>(
  function PropertyCard({ property }, ref) {
    return (
      <div
        ref={ref}
        className="group border-border bg-surface overflow-hidden rounded-sm border shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        <Link href={`/${property.idProperty}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={
                property.imageUrl ||
                'https://via.placeholder.com/300x200?text=No+Image'
              }
              alt={`Image of ${property.name}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="p-4">
            <p className="text-text-primary mb-2 text-lg font-semibold">
              {formatCurrency(property.price)}
            </p>
            <div className="text-text-primary/90 mb-2 flex space-x-1 text-sm">
              <span>{property.bedrooms} bed</span>
              <span>&middot;</span>
              <span>{property.bathrooms} bath</span>
              <span>&middot;</span>
              <span>{property.squareMeters} m²</span>
            </div>
            <p className="text-text-muted mb-4 truncate text-sm">
              {property.address}
            </p>

            {property.owner && (
              <div className="border-border flex items-center justify-between gap-2 border-t pt-3">
                <h3 className="text-on-primary mb-1 truncate font-serif font-semibold">
                  {property.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-sm">
                    {property.owner.name}
                  </span>
                  <Image
                    src={
                      property.owner.photo || 'https://via.placeholder.com/40'
                    }
                    alt={property.owner.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
);

export const PropertyCard = memo(PropertyCardComponent);
