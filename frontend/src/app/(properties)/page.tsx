'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { PropertyList } from '@/features/properties/components/PropertyLsit';
import { getProperties } from '@/services/properties';
import { PropertyListItem } from '@/types/property';
import { PaginatedList, PropertyFilterParams } from '@/types/api';
import { Spinner } from '@/components/ui/Spinner';
import { QuickFilters } from '@/features/properties/components/quick_filters/QuickFiltersBar';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [paginatedProperties, setPaginatedProperties] =
    useState<PaginatedList<PropertyListItem> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);

      const params: PropertyFilterParams = {
        name: searchParams.get('name'),
        address: searchParams.get('address'),
        minPrice: searchParams.has('minPrice')
          ? Number(searchParams.get('minPrice'))
          : null,
        maxPrice: searchParams.has('maxPrice')
          ? Number(searchParams.get('maxPrice'))
          : null,
        bedrooms: searchParams.has('bedrooms')
          ? Number(searchParams.get('bedrooms'))
          : null,
        bathrooms: searchParams.has('bathrooms')
          ? Number(searchParams.get('bathrooms'))
          : null,
        minYear: searchParams.has('year')
          ? Number(searchParams.get('year'))
          : null,
        minSquareMeters: searchParams.has('sqm')
          ? Number(searchParams.get('sqm'))
          : null,
        pageNumber: searchParams.has('pageNumber')
          ? Number(searchParams.get('pageNumber'))
          : 1,
        pageSize: 15,
      };

      Object.keys(params).forEach((key) => {
        const typedKey = key as keyof PropertyFilterParams;
        if (params[typedKey] === null || params[typedKey] === undefined) {
          delete params[typedKey];
        }
      });

      try {
        const data = await getProperties(params);
        setPaginatedProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An unknown error occurred while fetching properties.'
        );
        setPaginatedProperties(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-text-primary mb-2 text-2xl font-bold md:text-3xl">
        Find your ideal new space right now – start your journey!
      </h1>

      <p className="text-text-secondary mb-6 text-sm sm:text-base">
        Browse through our curated selection of properties. Use our filters to
        find the perfect home, apartment, or commercial space that matches your
        needs and preferences.
      </p>

      <div className="mb-4">
        <QuickFilters />
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {error && (
        <p className="text-center text-red-600 dark:text-red-400">
          Error loading properties: {error}
        </p>
      )}

      {!isLoading && !error && paginatedProperties && (
        <>
          <p className="text-text-muted mb-4 text-sm">
            {paginatedProperties.totalCount}+ properties found.
          </p>
          <PropertyList properties={paginatedProperties.items} />
        </>
      )}

      {!isLoading &&
        !error &&
        (!paginatedProperties || paginatedProperties.items.length === 0) && (
          <p className="text-text-muted py-10 text-center">
            No properties found matching your criteria.
          </p>
        )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
