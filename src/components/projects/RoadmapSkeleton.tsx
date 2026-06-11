export function RoadmapSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
          <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
          <div className="mt-2 h-3 w-72 rounded bg-white/5 animate-pulse" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((__, j) => (
              <div key={j} className="h-28 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
