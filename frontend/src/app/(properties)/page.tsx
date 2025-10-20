import { Suspense } from 'react';
import { PropertyList } from '@/features/properties/list/ui/PropertyList';
import { getProperties } from '@/services/properties';
import { PropertyListItem } from '@/entities/property/model';
import { Spinner, Toast } from '@/shared/ui';
import PropertiesListClient from '@/features/properties/list/ui/PropertiesListClient';
import { buildPropertyFilterParams } from '@/features/properties/list/utils/queryParams';
import { QuickFilters } from '@/features/properties/list/ui/quick_filters/QuickFiltersBar';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await searchParams;

  const urlSearchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
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
    const message =
      err instanceof Error ? err.message : 'Failed to load properties.';
    initialError = message;
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
        <Suspense fallback={null}>
          <QuickFilters />
        </Suspense>
        {initialData && !initialError && (
          <p className="text-text-muted mb-4 text-sm">
            {initialData.totalCount}+ properties found.
          </p>
        )}
      </div>

      {initialError && (
        <div className="mb-4">
          <Toast
            variant="error"
            title="No se pudieron cargar las propiedades"
            description={
              initialError.includes('400') ||
              initialError.toLowerCase().includes('bad request')
                ? 'Verifica que los filtros sean válidos e inténtalo nuevamente.'
                : initialError
            }
          />
        </div>
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
            <PropertiesListClient
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
