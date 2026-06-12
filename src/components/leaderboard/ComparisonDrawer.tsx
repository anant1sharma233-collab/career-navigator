import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useComparison } from "@/hooks/useLeaderboard";

interface Props {
  otherUserId: string | null;
  onClose: () => void;
}

export function ComparisonDrawer({ otherUserId, onClose }: Props) {
  const { data, isLoading } = useComparison(otherUserId);
  const open = !!otherUserId;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg border-l border-white/10 bg-popover/95 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-white">
            {data ? `You vs ${data.them.name}` : "Compare"}
          </SheetTitle>
          <SheetDescription>
            Side-by-side breakdown of every signal that drives ranking.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {isLoading || !data
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl bg-white/[0.04]" />
              ))
            : data.metrics.map((m) => {
                const max = m.max ?? Math.max(m.you, m.them, 1);
                const youPct = (m.you / max) * 100;
                const themPct = (m.them / max) * 100;
                const youWins = m.you >= m.them;
                return (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{m.label}</span>
                      <span className={youWins ? "text-emerald-400" : "text-rose-400"}>
                        {youWins ? "+" : ""}
                        {(m.you - m.them).toFixed(0)}
                        {m.unit ?? ""}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <Bar
                        label="You"
                        value={`${m.you}${m.unit ?? ""}`}
                        pct={youPct}
                        accent="from-primary to-accent"
                      />
                      <Bar
                        label="Them"
                        value={`${m.them}${m.unit ?? ""}`}
                        pct={themPct}
                        accent="from-white/30 to-white/10"
                      />
                    </div>
                  </div>
                );
              })}
        </div>

        {data && (
          <div className="mt-6">
            <Button asChild fullWidth variant="primary">
              <a href={data.themProfileHref}>
                View full profile <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Bar({
  label,
  value,
  pct,
  accent,
}: {
  label: string;
  value: string;
  pct: number;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-white/70">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${accent} transition-[width] duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
    </div>
  );
}
