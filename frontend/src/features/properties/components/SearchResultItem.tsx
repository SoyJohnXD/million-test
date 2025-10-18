import { LocationSearchResult } from '@/types/location';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface SearchResultItemProps {
  location: LocationSearchResult;
  onSelect: (locationName: string) => void;
}

export function SearchResultItem({
  location,
  onSelect,
}: SearchResultItemProps) {
  const handleSelect = () => {
    onSelect(location.display_name);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="flex w-full items-center rounded-md px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <MapPinIcon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
      <span className="truncate text-sm text-gray-800 dark:text-gray-200">
        {location.display_name}
      </span>
    </button>
  );
}
