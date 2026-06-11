import { Flame, Target, TrendingUp, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import type { ProjectProgress } from "@/types/projects";

interface Props {
  progress: ProjectProgress;
  stackName: string;
}

export function ProgressDisplay({ progress, stackName }: Props) {
  return (
    <section
      className="relative rounded-2xl p-6 border border-white/10 overflow-hidden"
      style={{
        background:
          "radial-gradient(600px 200px at 0% 0%, rgba(124,58,237,0.18), transparent 60%)," +
          "radial-gradient(600px 200px at 100% 100%, rgba(34,211,238,0.15), transparent 60%)," +
          "rgba(15, 18, 32, 0.55)",
        backdropFilter: "blur(24px) saturate(160%)",
      }}
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{stackName} Progress</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            {progress.overallProgress}% <span className="text-muted-foreground text-base font-normal">complete</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Metric icon={<Trophy className="w-4 h-4" />} label="Rank" value={progress.rankLabel} />
          <Metric icon={<Target className="w-4 h-4" />} label="Topics" value={`${progress.topicsCompleted}/${progress.topicsTotal}`} />
          <Metric icon={<Flame className="w-4 h-4" />} label="Streak" value={`${progress.streakDays}d`} />
          <Metric icon={<TrendingUp className="w-4 h-4" />} label="Next" value={progress.nextTopic} />
        </div>
      </div>
      <div className="mt-5">
        <Progress value={progress.overallProgress} />
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl px-3 py-2 bg-white/[0.04] border border-white/10 min-w-[140px]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
        {icon} {label}
      </div>
      <div className="mt-0.5 text-sm text-white font-medium truncate">{value}</div>
    </div>
  );
}
