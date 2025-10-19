import { PropertyListItem } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: PropertyListItem[];
}

export function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return <p className="text-center text-gray-500">No properties found.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.idProperty} property={property} />
      ))}
    </div>
  );
}
