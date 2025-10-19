import { PropertyList } from '@/features/properties/components/PropertyLsit';
import { QuickFilters } from '@/features/properties/components/filters/QuickFiltersBar';
import { getProperties } from '@/services/properties';

export default async function PropertiesPage() {
  const paginatedProperties = await getProperties({
    pageNumber: 1,
    pageSize: 9,
  });

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

      <p className="text-text-muted mb-4 text-sm">
        {paginatedProperties.totalCount}+ properties found.
      </p>

      <PropertyList properties={paginatedProperties.items} />
    </div>
  );
}
