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
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-[200px] items-center justify-start space-x-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" // Estilo similar a la inspiración
    >
      <MapPinIcon className="h-5 w-5 text-gray-400" />
      <span className="truncate">
        {currentAddress ? currentAddress : 'Search location...'}
      </span>
    </button>
  );
}
