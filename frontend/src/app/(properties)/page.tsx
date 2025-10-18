import { PropertyList } from '@/features/properties/components/PropertyLsit';
import { QuickFilters } from '@/features/properties/components/QuickFiltersBar';
import { getProperties } from '@/services/properties';

export default async function PropertiesPage() {
  const paginatedProperties = await getProperties({
    pageNumber: 1,
    pageSize: 9,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-secondary mb-6 text-3xl font-bold md:text-4xl">
        Find your ideal new space right now – start your journey!
      </h1>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <QuickFilters />
        </div>
      </div>

      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Showing {paginatedProperties.items.length} of{' '}
        {paginatedProperties.totalCount} properties found.
      </p>

      <div className="flex flex-wrap">
        <PropertyList properties={paginatedProperties.items} />
      </div>
    </div>
  );
}
