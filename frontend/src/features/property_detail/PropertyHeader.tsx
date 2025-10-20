import { MapPinIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/text';

interface PropertyHeaderProps {
  name: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
}

// Simple Icon mapping or direct usage
const BedIcon = () => (
  // Replace with actual icon component if you have one
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
);
const BathIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
    />
  </svg>
);
const AreaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

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
          <BedIcon /> <span className="ml-1">{bedrooms} Beds</span>
        </span>
        <span className="flex items-center">
          <BathIcon /> <span className="ml-1">{bathrooms} Baths</span>
        </span>
        <span className="flex items-center">
          <AreaIcon /> <span className="ml-1">{squareMeters} m²</span>
        </span>
      </div>
    </div>
  );
}
