export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6" role="status" aria-busy="true">
      {/* header / controls skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 rounded-md bg-gray-700/40 dark:bg-gray-800/40" />
        <div className="h-10 w-36 rounded-md bg-gray-700/40 dark:bg-gray-800/40" />
      </div>

      {/* cards grid skeleton - fewer cards and mirror TourCard layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="cursor-default">
            <div className="bg-linear-to-br from-custom-orange/20 to-custom-orange/5 rounded-2xl p-6 border border-custom-orange/20">
              <div className="bg-custom-black/90 rounded-lg p-4">
                {/* Card header */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-700/40 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 rounded bg-gray-700/40 mb-2" />
                    <div className="h-3 w-1/2 rounded bg-gray-700/30" />
                  </div>
                </div>

                {/* Card content */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="h-3 w-24 rounded bg-gray-700/30 mr-3" />
                    <div className="h-3 w-12 rounded bg-gray-700/20" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="h-3 w-28 rounded bg-gray-700/30 mr-3" />
                    <div className="h-3 w-16 rounded bg-gray-700/20" />
                  </div>
                </div>

                {/* Card footer (buttons) */}
                <div className="flex justify-center gap-3 mt-6">
                  <div className="h-9 w-24 rounded-md bg-gray-700/30" />
                  <div className="h-9 w-24 rounded-md bg-gray-700/30" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
