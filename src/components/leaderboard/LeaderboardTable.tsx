import { ArrowDown, ArrowUp, Flame, Minus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { LeaderboardEntry } from "@/types/leaderboard";

interface Props {
  entries?: LeaderboardEntry[];
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  onSelect: (entry: LeaderboardEntry) => void;
  showCollegeColumns: boolean;
  emptyMessage?: string;
}

export function LeaderboardTable({
  entries,
  loading,
  error,
  onRetry,
  onSelect,
  showCollegeColumns,
  emptyMessage,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-white font-medium">Couldn't load the leaderboard</p>
        <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
        {emptyMessage ?? "Nothing to show here yet."}
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="hidden md:grid grid-cols-[60px_minmax(200px,1.5fr)_1fr_120px_120px_100px_100px_120px] gap-4 px-5 py-3 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-white/10">
        <span>Rank</span>
        <span>Student</span>
        <span>{showCollegeColumns ? "College / Dept" : "Status"}</span>
        <span className="text-right">Readiness</span>
        <span className="text-right">DSA</span>
        <span className="text-right">Projects</span>
        <span className="text-right">Streak</span>
        <span className="text-right">Score</span>
      </div>
      <ul className="divide-y divide-white/5">
        {entries.map((e) => (
          <li key={e.userId}>
            <button
              onClick={() => onSelect(e)}
              className="group w-full text-left grid grid-cols-1 md:grid-cols-[60px_minmax(200px,1.5fr)_1fr_120px_120px_100px_100px_120px] gap-4 px-5 py-3 items-center hover:bg-white/[0.03] transition-all hover:-translate-y-px"
            >
              <RankCell rank={e.rank} change={e.rankChange} />
              <StudentCell entry={e} />
              <CollegeCell entry={e} showCollegeColumns={showCollegeColumns} />
              <MetricCell value={Math.round(e.readinessScore)} />
              <MetricCell value={`${Math.round(e.dsaProgress)}%`} />
              <MetricCell value={e.projectsBuilt} />
              <StreakCell value={e.streakDays} />
              <ScoreCell value={e.totalScore} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RankCell({ rank, change }: { rank: number; change: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-semibold text-white tabular-nums">#{rank}</span>
      <span
        className={`inline-flex items-center text-[10px] ${
          change > 0 ? "text-emerald-400" : change < 0 ? "text-rose-400" : "text-muted-foreground"
        }`}
      >
        {change > 0 ? <ArrowUp className="w-3 h-3" /> : change < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
        {change !== 0 && Math.abs(change)}
      </span>
    </div>
  );
}

function StudentCell({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xs font-semibold text-white shrink-0">
        {entry.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-white truncate">{entry.name}</div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          {entry.badges.slice(0, 2).map((b) => (
            <Badge key={b.id} tone={b.tone ?? "primary"} className="px-1.5 py-0 text-[10px]">
              {b.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollegeCell({
  entry,
  showCollegeColumns,
}: {
  entry: LeaderboardEntry;
  showCollegeColumns: boolean;
}) {
  if (!showCollegeColumns || !entry.collegeName) {
    return <span className="text-xs text-muted-foreground">Off-campus</span>;
  }
  return (
    <div className="min-w-0">
      <div className="text-sm text-white truncate">{entry.collegeName}</div>
      <div className="text-xs text-muted-foreground truncate">
        {entry.departmentName}
        {entry.collegeRank && (
          <span className="ml-1.5 text-[10px] text-primary/80">· College #{entry.collegeRank}</span>
        )}
      </div>
    </div>
  );
}

function MetricCell({ value }: { value: string | number }) {
  return (
    <span className="text-right text-sm text-white tabular-nums">{value}</span>
  );
}

function StreakCell({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center justify-end gap-1 text-sm text-white tabular-nums">
      <Flame className="w-3.5 h-3.5 text-orange-400" />
      {value}d
    </span>
  );
}

function ScoreCell({ value }: { value: number }) {
  return (
    <span className="text-right text-sm font-semibold gradient-text tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}
