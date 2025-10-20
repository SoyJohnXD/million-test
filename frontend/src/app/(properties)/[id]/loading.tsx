export default function Loading() {
  return (
    <div className="bg-background text-secondary container mx-auto px-4">
      <div className="flex w-full items-end justify-end py-1 md:py-2">
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="lg:flex-1">
          <div className="mb-6 h-64 w-full animate-pulse rounded-md bg-gray-200" />
          <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="border-border my-6 border-t pt-6 md:my-8 md:pt-8">
            <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
          </div>
          <div className="border-border my-6 border-t pt-6 md:my-8 md:pt-8">
            <div className="h-12 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center lg:flex-1">
          <div className="bg-surface border-border sticky top-24 flex-1 rounded-md border p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
              <div>
                <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
            <div className="mt-4 h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
