import { notFound } from 'next/navigation';

import { getPropertyById } from '@/services/properties';
import { PropertyImageGallery } from '@/features/property_detail/PropertyImageGallery';
import { PropertyHeader } from '@/features/property_detail/PropertyHeader';
import { PropertyDescription } from '@/features/property_detail/PropertyDescription';
import { PropertyDetailsSection } from '@/features/property_detail/PropertyDetailsSection';
import { PropertyTraceList } from '@/features/property_detail/PropertyTraceList';
import { OwnerCard } from '@/features/property_detail/OwnerCard';
import { Button } from '@/components/ui/Button';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background text-secondary container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="lg:flex-1">
          <PropertyImageGallery
            imageUrls={property.imageUrls}
            propertyName={property.name}
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="flex-[2]">
              <div className="mt-6 md:mt-8">
                <PropertyHeader
                  name={property.name}
                  address={property.address}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  squareMeters={property.squareMeters}
                />
              </div>

              <div className="border-border my-6 border-t pt-6 md:my-8 md:pt-8">
                <PropertyDescription description={property.description} />
              </div>

              <div className="border-border my-6 border-t pt-6 md:my-8 md:pt-8">
                <PropertyDetailsSection
                  year={property.year}
                  codeInternal={property.codeInternal}
                />
              </div>

              {property.traces && property.traces.length > 0 && (
                <div className="border-border my-6 border-t pt-6 md:my-8 md:pt-8">
                  <PropertyTraceList traces={property.traces} />
                </div>
              )}
            </div>
            <div className="flex items-center lg:flex-1">
              <div className="bg-surface border-border sticky top-24 flex-1 rounded-md border p-6 shadow-sm">
                {property.owner ? (
                  <OwnerCard owner={property.owner} />
                ) : (
                  <p className="text-text-muted text-sm">
                    Owner information not available.
                  </p>
                )}

                <Button variant="primary" className="mt-6 w-full">
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Add metadata generation
export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id);
  if (!property) {
    return { title: 'Property Not Found' };
  }
  return {
    title: `${property.name} | Million Test`,
    description: property.description.substring(0, 150) + '...', // Short description for SEO
  };
}
