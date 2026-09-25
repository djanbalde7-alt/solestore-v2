export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul
      aria-hidden="true"
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="animate-pulse">
          <div className="aspect-square rounded-2xl bg-subtle" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-16 rounded bg-subtle" />
            <div className="h-4 w-3/4 rounded bg-subtle" />
            <div className="h-4 w-12 rounded bg-subtle" />
          </div>
        </li>
      ))}
    </ul>
  );
}