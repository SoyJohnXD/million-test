import { notFound } from 'next/navigation';

import { getPropertyById } from '@/services/properties';
import { PropertyImageGallery } from '@/features/properties/detail/ui/PropertyImageGallery';
import { PropertyHeader } from '@/features/properties/detail/ui/PropertyHeader';
import { PropertyDescription } from '@/features/properties/detail/ui/PropertyDescription';
import { PropertyDetailsSection } from '@/features/properties/detail/ui/PropertyDetailsSection';
import { PropertyTraceList } from '@/features/properties/detail/ui/PropertyTraceList';
import { OwnerCard } from '@/features/properties/detail/ui/OwnerCard';
import { BackButton } from '@/shared/ui/BackButton';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const awaitedParams = await params;
  const property = await getPropertyById(awaitedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background text-secondary container mx-auto px-4">
      <div className="flex w-full items-end justify-end py-1 md:py-2">
        <BackButton />
      </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const awaitedParams = await params;
  const property = await getPropertyById(awaitedParams.id);
  if (!property) {
    return { title: 'Property Not Found' };
  }
  return {
    title: `${property.name} | Million Test`,
    description: property.description.substring(0, 150) + '...',
  };
}
