import { Suspense } from 'react';
import { PropertyList } from '@/features/properties/components/PropertyList';
import { getProperties } from '@/services/properties';
import { PropertyListItem } from '@/types/property';
import { Spinner } from '@/components/ui/Spinner';
import { QuickFilters } from '@/features/properties/components/quick_filters/QuickFiltersBar';
import PropertiesClient from '@/features/properties/components/PropertiesClient';
import { buildPropertyFilterParams } from '@/features/properties/utils/queryParams';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined) {
      urlSearchParams.append(key, value);
    }
  });

  const filterParams = buildPropertyFilterParams(urlSearchParams);

  let initialData: {
    items: PropertyListItem[];
    totalCount: number;
    hasNextPage: boolean;
  } | null = null;
  let initialError: string | null = null;

  try {
    const data = await getProperties(filterParams);
    initialData = {
      items: data.items,
      totalCount: data.totalCount,
      hasNextPage: data.hasNextPage,
    };
  } catch (err) {
    initialError =
      err instanceof Error ? err.message : 'Failed to load properties.';
  }

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
        {initialData && !initialError && (
          <p className="text-text-muted mb-4 text-sm">
            {initialData.totalCount}+ properties found.
          </p>
        )}
      </div>

      {initialError && (
        <p className="py-10 text-center text-red-600 dark:text-red-400">
          Error loading properties: {initialError}
        </p>
      )}

      {!initialError && initialData && initialData.items.length > 0 && (
        <>
          <PropertyList properties={initialData.items} />
          <Suspense
            fallback={
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            }
          >
            <PropertiesClient
              key={JSON.stringify(filterParams)}
              initialParams={filterParams}
              hasNextPageInitial={initialData.hasNextPage}
            />
          </Suspense>
        </>
      )}

      {!initialError && initialData && initialData.items.length === 0 && (
        <p className="text-text-muted py-10 text-center">
          No properties found matching your criteria.
        </p>
      )}

      {!initialData && !initialError && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}
    </div>
  );
}
