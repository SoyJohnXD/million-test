import { forwardRef } from 'react';
import { PropertyListItem } from '@/entities/property/model';
import { PropertyCard } from '@/features/properties/list/ui/PropertyCard';

interface PropertyListProps {
  properties: PropertyListItem[];
}

export const PropertyList = forwardRef<HTMLDivElement, PropertyListProps>(
  function PropertyList({ properties }, ref) {
    return (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.idProperty}
            property={property}
            ref={index === properties.length - 1 ? ref : null}
          />
        ))}
      </div>
    );
  }
);
