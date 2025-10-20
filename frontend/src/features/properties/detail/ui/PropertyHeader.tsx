import {
  MapPinIcon,
  HomeIcon,
  Square3Stack3DIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/text';

interface PropertyHeaderProps {
  name: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
}

export function PropertyHeader({
  name,
  address,
  price,
  bedrooms,
  bathrooms,
  squareMeters,
}: PropertyHeaderProps) {
  return (
    <div>
      <h1 className="font-heading text-text-primary mb-2 text-2xl font-bold md:text-3xl">
        {name}
      </h1>
      <div className="text-text-muted mb-4 flex items-center text-sm">
        <MapPinIcon className="mr-1 h-4 w-4" />
        <span>{address}</span>
      </div>
      <div className="mb-4 flex items-baseline space-x-4">
        <span className="text-text-primary text-2xl font-semibold">
          {formatCurrency(price)}
        </span>
      </div>
      <div className="text-text-muted flex space-x-4 text-sm">
        <span className="flex items-center">
          <HomeIcon className="mr-1 h-4 w-4" />
          <span>{bedrooms} Beds</span>
        </span>
        <span className="flex items-center">
          <Square3Stack3DIcon className="mr-1 h-4 w-4" />
          <span>{bathrooms} Baths</span>
        </span>
        <span className="flex items-center">
          <ArrowsPointingOutIcon className="mr-1 h-4 w-4" />
          <span>{squareMeters} m²</span>
        </span>
      </div>
    </div>
  );
}
