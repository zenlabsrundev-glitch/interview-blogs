export function SkeletonLoader() {
  return (
    <div className="rounded-3xl border border-white/30 bg-white/60 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur-xl">
      <div className="mb-4 h-5 w-1/2 animate-pulse rounded bg-zinc-200" />
      <div className="mb-3 h-4 w-1/3 animate-pulse rounded bg-zinc-200" />
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-11/12 animate-pulse rounded bg-zinc-200" />
      </div>
    </div>
  );
}
