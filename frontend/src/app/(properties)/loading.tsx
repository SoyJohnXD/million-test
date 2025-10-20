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

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
