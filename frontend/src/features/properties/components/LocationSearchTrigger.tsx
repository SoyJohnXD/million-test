'use client';

import { useSearchParams } from 'next/navigation';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationSearchTriggerProps {
  onClick: () => void;
}

export function LocationSearchTrigger({ onClick }: LocationSearchTriggerProps) {
  const searchParams = useSearchParams();
  const currentAddress = searchParams.get('address');

  return (
    <div className="xs:max-w-[280px] absolute top-1/2 left-1/2 w-full max-w-[250px] -translate-x-1/2 -translate-y-1/2 sm:max-w-[230px] md:max-w-[300px] lg:max-w-[400px]">
      <button
        type="button"
        onClick={onClick}
        className="dark:hover:bg-primary/30 dark:border-primary/60 text-secondary/30 flex w-full cursor-pointer items-center justify-start space-x-2 rounded-full border border-gray-300 px-3 py-1.5 text-sm transition-all duration-300 ease-in hover:bg-gray-100"
      >
        <MapPinIcon className="text-text-muted h-5 w-5" />
        <span className="text-text-muted truncate">
          {currentAddress ? currentAddress : 'Search location or name...'}
        </span>
      </button>
    </div>
  );
}
