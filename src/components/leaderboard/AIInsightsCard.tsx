import { ArrowRight, Brain, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { RankInsight } from "@/types/leaderboard";

interface Props {
  rank?: number;
  insights?: RankInsight[];
  loading?: boolean;
}

export function AIInsightsCard({ rank, insights, loading }: Props) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6"
      style={{
        background:
          "radial-gradient(500px 200px at 0% 0%, rgba(124,58,237,0.18), transparent 60%)," +
          "radial-gradient(500px 200px at 100% 100%, rgba(34,211,238,0.15), transparent 60%)," +
          "rgba(15, 18, 32, 0.55)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/25 text-white flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">AI Insights</p>
            <h3 className="text-lg font-semibold text-white">
              Why am I rank {rank ? `#${rank}` : "—"}?
            </h3>
          </div>
        </div>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-white transition"
        >
          View improvement plan <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {loading || !insights
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl bg-white/[0.04]" />
            ))
          : insights.map((i) => (
              <div
                key={i.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3"
              >
                <Sparkles className="w-4 h-4 text-[#ff8a73] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white">{i.message}</div>
                  <div className="mt-0.5 text-xs text-primary">{i.impact}</div>
                </div>
                {i.actionLabel && i.actionHref && (
                  <a
                    href={i.actionHref}
                    className="text-xs text-muted-foreground hover:text-white transition whitespace-nowrap"
                  >
                    {i.actionLabel} →
                  </a>
                )}
              </div>
            ))}
      </div>
    </section>
  );
}
