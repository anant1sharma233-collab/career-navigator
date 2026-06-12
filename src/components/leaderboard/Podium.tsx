import { motion } from "framer-motion";
import { Crown, Flame, Medal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { PodiumEntry } from "@/types/leaderboard";

const HIGHLIGHT = {
  gold: {
    ring: "ring-yellow-300/60",
    glow: "bg-yellow-300/20",
    text: "text-yellow-300",
    label: "1st",
    icon: <Crown className="w-5 h-5" />,
    height: "lg:h-72",
  },
  silver: {
    ring: "ring-slate-300/50",
    glow: "bg-slate-300/15",
    text: "text-slate-200",
    label: "2nd",
    icon: <Medal className="w-5 h-5" />,
    height: "lg:h-60",
  },
  bronze: {
    ring: "ring-amber-500/50",
    glow: "bg-amber-500/15",
    text: "text-amber-400",
    label: "3rd",
    icon: <Medal className="w-5 h-5" />,
    height: "lg:h-52",
  },
} as const;

export function Podium({ entries, loading }: { entries?: PodiumEntry[]; loading?: boolean }) {
  if (loading || !entries) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  // Reorder so 1st sits center: [silver, gold, bronze]
  const ordered = [entries[1], entries[0], entries[2]].filter(Boolean) as PodiumEntry[];

  return (
    <div className="grid gap-4 md:grid-cols-3 items-end">
      {ordered.map((e, i) => {
        const tone = HIGHLIGHT[e.highlight ?? "gold"];
        return (
          <motion.div
            key={e.userId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 bg-white/[0.03] ${tone.height}`}
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className={`pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full ${tone.glow} blur-3xl`} />
            <div className="relative flex flex-col items-center text-center">
              <div className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider ${tone.text}`}>
                {tone.icon} {tone.label}
              </div>
              <div className={`mt-3 h-16 w-16 rounded-full ring-2 ${tone.ring} bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xl font-semibold text-white`}>
                {e.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="mt-3 text-base font-semibold text-white">{e.name}</div>
              {e.collegeName && (
                <div className="text-xs text-muted-foreground">{e.collegeName}</div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                <Stat label="Score" value={e.totalScore.toLocaleString()} />
                <Stat label="Readiness" value={`${Math.round(e.readinessScore)}`} />
              </div>
              {e.streakDays >= 7 && (
                <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 text-[10px] text-orange-300">
                  <Flame className="w-3 h-3" /> {e.streakDays}d streak
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white tabular-nums">{value}</div>
    </div>
  );
}
