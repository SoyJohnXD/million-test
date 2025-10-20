'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getProperties } from '@/services/properties';
import { PropertyFilterParams } from '@/types/api';
import { PropertyListItem } from '@/types/property';
import { PropertyList } from './PropertyList';
import { Spinner } from '@/components/ui/Spinner';

type Props = {
  initialParams: PropertyFilterParams;
  hasNextPageInitial: boolean;
};

export default function PropertiesClient({
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
    <>
      {extraItems.length > 0 && <PropertyList properties={extraItems} />}
      {error && (
        <p className="py-6 text-center text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <div ref={ref} />
      {isMoreLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
    </>
  );
}
