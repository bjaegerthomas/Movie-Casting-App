// a skeleton shimmer card to show while loading
export default function SkeletonCard() {
    // render a rounded card with animated shimmer blocks
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
        {/* poster block with shimmer */}
        <div className="w-full aspect-[2/3] animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%]" />
        {/* text rows with shimmer */}
        <div className="p-3 space-y-2">
          <div className="h-4 w-3/4 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%] rounded" />
          <div className="h-3 w-1/3 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%] rounded" />
        </div>
      </div>
    )
  }
  