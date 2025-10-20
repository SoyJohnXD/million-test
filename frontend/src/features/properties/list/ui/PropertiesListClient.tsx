'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getProperties } from '@/services/properties';
import { PropertyListItem } from '@/entities/property/model';
import { PropertyList } from '@/features/properties/list/ui/PropertyList';
import { PropertyFilterParams } from '@/types/api';

function PropertyCardSkeleton() {
  return (
    <div className="bg-surface flex animate-pulse flex-col gap-2 rounded-lg p-4 shadow-sm">
      <div className="h-40 w-full rounded-md bg-gray-200" />
      <div className="h-6 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
      <div className="h-4 w-1/3 rounded bg-gray-200" />
      <div className="h-4 w-1/4 rounded bg-gray-200" />
    </div>
  );
}

type Props = {
  initialParams: PropertyFilterParams;
  hasNextPageInitial: boolean;
};

export default function PropertiesListClient({
  initialParams,
  hasNextPageInitial,
}: Props) {
  const [page, setPage] = useState<number>(2);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(hasNextPageInitial);
  const [error, setError] = useState<string | null>(null);
  const [extraItems, setExtraItems] = useState<PropertyListItem[]>([]);

  const { ref, inView } = useInView({ threshold: 0 });

  const paramsHash = useMemo(
    () => JSON.stringify(initialParams),
    [initialParams]
  );
  const prevInView = useRef(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const shouldTrigger =
      inView && !prevInView.current && !isFetchingRef.current && hasNextPage;
    if (!shouldTrigger) {
      prevInView.current = inView;
      return;
    }

    const loadMore = async () => {
      isFetchingRef.current = true;
      setIsMoreLoading(true);
      try {
        const data = await getProperties({
          ...initialParams,
          pageNumber: page,
        });
        setExtraItems((prev) => [...prev, ...data.items]);
        setHasNextPage(data.hasNextPage);
        setPage((p) => p + 1);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Failed to load more properties'
        );
      } finally {
        setIsMoreLoading(false);
        isFetchingRef.current = false;
      }
    };

    loadMore();
    prevInView.current = inView;
  }, [inView, hasNextPage, page, paramsHash, initialParams]);

  return (
    <div className="pt-6">
      {extraItems.length > 0 && <PropertyList properties={extraItems} />}
      {error && (
        <p className="py-6 text-center text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <div ref={ref} />
      {isMoreLoading && (
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
