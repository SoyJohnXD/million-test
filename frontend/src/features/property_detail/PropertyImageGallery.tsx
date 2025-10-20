'use client';
import Image from 'next/image';
import { optimizeImageUrl } from '@/utils/image';

interface PropertyImageGalleryProps {
  imageUrls: string[];
  propertyName: string;
}

export function PropertyImageGallery({
  imageUrls,
  propertyName,
}: PropertyImageGalleryProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="bg-muted flex aspect-video w-full items-center justify-center rounded-md text-sm text-gray-500">
        No Images Available
      </div>
    );
  }

  const [mainImage, ...restImages] = imageUrls;
  const displayImages = restImages.slice(0, 4);
  const hasMoreImages = imageUrls.length > 5;

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div className="relative h-[280px] max-h-[420px] w-full overflow-hidden rounded-lg md:h-[460px] md:w-[60%]">
        <Image
          src={optimizeImageUrl(mainImage, { width: 900, height: 600 })}
          alt={`${propertyName} - Imagen principal`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="bg-accent/30"
        />
      </div>

      {displayImages.length > 0 && (
        <div className="grid w-full flex-1 grid-cols-2 grid-rows-2 gap-2">
          {displayImages.map((url, index) => (
            <div
              key={index}
              className="relative h-[130px] overflow-hidden rounded-md md:h-[205px]"
            >
              <Image
                src={optimizeImageUrl(url, { width: 300, height: 300 })}
                alt={`${propertyName} - Imagen ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="bg-accent/30"
              />

              {index === 3 && hasMoreImages && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white">
                  +{imageUrls.length - 5} más
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
