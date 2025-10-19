import { CityResult } from '@/types/location';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface SearchResultItemProps {
  location: CityResult;
  onSelect: (locationName: string) => void;
}

export function SearchResultItem({
  location,
  onSelect,
}: SearchResultItemProps) {
  const handleSelect = () => {
    onSelect(`${location.city}, ${location.country}`);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="hover:bg-accent flex w-full cursor-pointer items-center rounded-md px-4 py-3 text-left transition-colors"
    >
      <MapPinIcon className="text-text-muted mr-3 h-5 w-5 flex-shrink-0" />
      <span className="text-text-muted truncate text-sm">
        {location.city}, {location.country}
      </span>
    </button>
  );
}
