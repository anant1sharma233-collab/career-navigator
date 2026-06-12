import { Lock, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AchievementBadge } from "@/types/leaderboard";

export function AchievementGrid({
  badges,
  loading,
}: {
  badges?: AchievementBadge[];
  loading?: boolean;
}) {
  if (loading || !badges) {
    return (
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <Tooltip key={b.id}>
            <TooltipTrigger asChild>
              <div
                className={`relative overflow-hidden rounded-2xl border p-4 transition ${
                  b.earned
                    ? "border-primary/30 bg-gradient-to-br from-primary/15 to-accent/10"
                    : "border-white/10 bg-white/[0.02] opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                    b.earned ? "bg-primary/30 text-white" : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {b.earned ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="mt-3 text-sm font-medium text-white">{b.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {b.description}
                </div>
                {!b.earned && typeof b.progress === "number" && (
                  <div className="mt-3">
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full gradient-primary"
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground tabular-nums">
                      {b.progress}% to unlock
                    </div>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-popover text-xs">
              {b.unlockCriteria}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
