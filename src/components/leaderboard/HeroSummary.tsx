import { ArrowDown, ArrowUp, Flame, Info, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import type { CurrentUser, RankSummary, ScoringFormula } from "@/types/leaderboard";

interface Props {
  user?: CurrentUser;
  summary?: RankSummary;
  formula?: ScoringFormula;
  loading?: boolean;
}

export function HeroSummary({ user, summary, formula, loading }: Props) {
  if (loading || !user || !summary || !formula) {
    return (
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Your Rank",
      value: `#${summary.rank}`,
      hint: `Top ${summary.topPercentile}%`,
      featured: true,
      icon: <Trophy className="w-4 h-4 text-yellow-300" />,
    },
    {
      label: "Readiness Score",
      value: `${summary.readinessScore}`,
      hint: "Hiring readiness",
      featured: true,
      icon: <Sparkles className="w-4 h-4 text-cyan-300" />,
    },
    { label: "Total Score", value: summary.totalScore.toLocaleString(), hint: "Composite" },
    user.hasCollege && summary.collegeRank
      ? { label: "College Rank", value: `#${summary.collegeRank}`, hint: user.collegeName }
      : null,
    user.hasCollege && summary.departmentRank
      ? { label: "Department Rank", value: `#${summary.departmentRank}`, hint: user.departmentName }
      : null,
    {
      label: "Current Streak",
      value: `${summary.streakDays}d`,
      hint: "Keep it going",
      icon: <Flame className="w-4 h-4 text-orange-400" />,
    },
    {
      label: "Weekly Change",
      value:
        summary.weeklyRankChange === 0
          ? "—"
          : `${summary.weeklyRankChange > 0 ? "+" : ""}${summary.weeklyRankChange}`,
      hint: "vs last week",
      icon:
        summary.weeklyRankChange >= 0 ? (
          <ArrowUp className="w-4 h-4 text-emerald-400" />
        ) : (
          <ArrowDown className="w-4 h-4 text-rose-400" />
        ),
    },
    { label: "Top Percentile", value: `${summary.topPercentile}%`, hint: "Platform-wide" },
  ].filter(Boolean) as Array<{ label: string; value: string; hint?: string; featured?: boolean; icon?: React.ReactNode }>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Your snapshot</p>
        <Popover>
          <PopoverTrigger className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition">
            <Info className="w-3.5 h-3.5" /> How is my score calculated?
          </PopoverTrigger>
          <PopoverContent className="w-72 border-white/10 bg-popover/95 backdrop-blur-xl">
            <p className="text-sm font-medium text-white">Composite Score Formula</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Weights are backend-configurable. Update them and every page reflects automatically.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs">
              <FormulaRow label="DSA Progress" pct={formula.dsa} />
              <FormulaRow label="Projects Built" pct={formula.projects} />
              <FormulaRow label="Subject Mastery" pct={formula.subjects} />
              <FormulaRow label="Consistency (streak)" pct={formula.consistency} />
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 p-5 ${
              c.featured
                ? "bg-gradient-to-br from-primary/20 via-white/[0.03] to-accent/15"
                : "bg-white/[0.03]"
            }`}
            style={{ backdropFilter: "blur(20px)" }}
          >
            {c.featured && (
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
            )}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>{c.label}</span>
              {c.icon}
            </div>
            <div
              className={`mt-2 font-semibold tracking-tight text-white ${
                c.featured ? "text-4xl" : "text-2xl"
              }`}
            >
              {c.value}
            </div>
            {c.hint && <div className="mt-1 text-xs text-muted-foreground">{c.hint}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FormulaRow({ label, pct }: { label: string; pct: number }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-20 rounded-full bg-white/5 overflow-hidden">
          <span
            className="block h-full gradient-primary rounded-full"
            style={{ width: `${pct * 100}%` }}
          />
        </span>
        <span className="text-white font-medium tabular-nums">{Math.round(pct * 100)}%</span>
      </span>
    </li>
  );
}
