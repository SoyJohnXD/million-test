'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { PropertyList } from '@/features/properties/components/PropertyList';
import { getProperties } from '@/services/properties';
import { PropertyListItem } from '@/types/property';
import { PropertyFilterParams } from '@/types/api';
import { Spinner } from '@/components/ui/Spinner';
import { QuickFilters } from '@/features/properties/components/quick_filters/QuickFiltersBar';

const PAGE_SIZE = 15;

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView) loadMoreProperties(inView);
    },
  });

  useEffect(() => {
    const fetchProperties = async () => {
      if (page > 1) {
        setIsMoreLoading(true);
      } else {
        setIsInitialLoading(true);
        setProperties([]);
      }
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
        pageNumber: page,
        pageSize: PAGE_SIZE,
      };

      Object.keys(params).forEach((key) => {
        const typedKey = key as keyof PropertyFilterParams;
        if (params[typedKey] === null || params[typedKey] === undefined) {
          delete params[typedKey];
        }
      });

      try {
        const data = await getProperties(params);
        setProperties((prev) =>
          page === 1 ? data.items : [...prev, ...data.items]
        );
        setTotalCount(data.totalCount);
        setHasNextPage(data.hasNextPage);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An unknown error occurred while fetching properties.'
        );
        setProperties([]);
      } finally {
        setIsInitialLoading(false);
        setIsMoreLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams, page]);

  const loadMoreProperties = (inView: boolean) => {
    if (inView && hasNextPage && !isMoreLoading && !isInitialLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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

      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <QuickFilters />
        {!isInitialLoading && !error && (
          <p className="text-text-muted mb-4 text-sm">
            {totalCount}+ properties found.
          </p>
        )}
      </div>

      {isInitialLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {error && (
        <p className="py-10 text-center text-red-600 dark:text-red-400">
          Error loading properties: {error}
        </p>
      )}

      {!isInitialLoading && !error && properties.length > 0 && (
        <PropertyList properties={properties} ref={ref} />
      )}

      {isMoreLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {!isInitialLoading && !error && properties.length === 0 && (
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
