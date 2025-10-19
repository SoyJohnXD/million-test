'use client';

import { useSearchParams } from 'next/navigation';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useFilterParams } from '@/hooks/useFilterParams';

interface LocationSearchTriggerProps {
  onClick: () => void;
}

export function LocationSearchTrigger({ onClick }: LocationSearchTriggerProps) {
  const searchParams = useSearchParams();
  const { clearFilter } = useFilterParams();
  const currentAddress = searchParams.get('address');

  return (
    <div className="xs:max-w-[280px] absolute top-1/2 left-1/2 w-full max-w-[250px] -translate-x-1/2 -translate-y-1/2 sm:max-w-[230px] md:max-w-[300px] lg:max-w-[400px]">
      <div className="relative flex w-full items-center">
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
        {currentAddress && (
          <button
            type="button"
            onClick={() => clearFilter('address')}
            className="hover:bg-accent absolute right-2 cursor-pointer rounded-full p-1"
          >
            <XMarkIcon className="text-text-muted h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
