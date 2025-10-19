'use client';
import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useDebounce } from '@/hooks/useDebounce';
import { CityResult } from '@/types/location';
import { useFilterParams } from '@/hooks/useFilterParams';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { searchCities } from '@/services/location';
import { SearchResultItem } from '../SearchResultItem';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationSearchModal({
  isOpen,
  onClose,
}: LocationSearchModalProps) {
  const { updateFilter } = useFilterParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchTerm.length >= 3) {
        setIsLoading(true);
        const locations = await searchCities(debouncedSearchTerm);
        setResults(locations);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  const handleSelectLocation = useCallback(
    (locationName: string) => {
      updateFilter('address', locationName);
      onClose();
    },
    [updateFilter, onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setResults([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="bg-surface mx-4 w-full max-w-lg overflow-hidden rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border relative border-b p-4">
          <MagnifyingGlassIcon className="absolute top-1/2 left-7 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search city, neighborhood..."
            className="!rounded-full pr-10 pl-10"
            autoFocus
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchTerm('')}
              className="hover:bg- absolute top-1/2 right-5 h-6 w-6 -translate-y-1/2 rounded-full"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Spinner />
            </div>
          )}
          {!isLoading &&
            results.length === 0 &&
            debouncedSearchTerm.length >= 3 && (
              <p className="text-text-muted px-4 py-6 text-center text-sm">
                No results found for &quot;{debouncedSearchTerm}&quot;.
              </p>
            )}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((location, index) => (
                <li key={'location-' + index}>
                  <SearchResultItem
                    location={location}
                    onSelect={handleSelectLocation}
                  />
                </li>
              ))}
            </ul>
          )}
          {!isLoading &&
            results.length === 0 &&
            debouncedSearchTerm.length < 3 && (
              <p className="px-4 py-6 text-center text-sm text-gray-400">
                Enter at least 3 characters to search.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
