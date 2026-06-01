export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-[81px] h-[81px] rounded-full bg-gray-200" />
          <div className="flex gap-6 flex-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-8 h-4 bg-gray-200 rounded" />
                <div className="w-12 h-3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-48 h-3 bg-gray-100 rounded" />
          <div className="w-24 h-3 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Highlights skeleton */}
      <div className="flex gap-4 px-4 py-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="w-10 h-2.5 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Toolbar skeleton */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#dbdbdb]">
        <div className="w-20 h-7 bg-gray-200 rounded-lg" />
        <div className="flex-1" />
        <div className="w-28 h-7 bg-gray-200 rounded-lg" />
        <div className="w-24 h-7 bg-gray-200 rounded-lg" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-3 gap-[2px] bg-[#dbdbdb]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="grid-image bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
