import { Briefcase, CheckCircle2, Eye } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { RecruiterVisibility } from "@/types/leaderboard";

const READINESS_TONE: Record<RecruiterVisibility["hiringReadiness"], string> = {
  Excellent: "from-emerald-400/30 to-emerald-400/10 text-emerald-300 border-emerald-400/30",
  Strong: "from-primary/30 to-accent/15 text-white border-primary/30",
  Developing: "from-amber-400/25 to-amber-400/10 text-amber-300 border-amber-400/30",
};

export function RecruiterPanel({
  data,
  loading,
}: {
  data?: RecruiterVisibility;
  loading?: boolean;
}) {
  if (loading || !data) {
    return <Skeleton className="h-56 rounded-2xl bg-white/[0.04]" />;
  }

  const stats = [
    { label: "Profile Completeness", value: data.profileCompleteness },
    { label: "DSA Strength", value: data.dsaStrength },
    { label: "Project Strength", value: data.projectStrength },
    { label: "Subject Strength", value: data.subjectStrength },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-accent/25 text-white flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Recruiter Visibility
              </p>
              <h3 className="text-lg font-semibold text-white">
                {data.visibilityPercent}% discoverable
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={data.visibilityPercent} />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="text-white tabular-nums">{s.value}%</span>
              </div>
              <div className="mt-2">
                <Progress value={s.value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${READINESS_TONE[data.hiringReadiness]}`}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
          <Briefcase className="w-4 h-4" /> Hiring Readiness
        </div>
        <div className="mt-3 text-4xl font-semibold tracking-tight">{data.hiringReadiness}</div>
        <p className="mt-2 text-sm text-white/70">
          Recruiters surface profiles by visibility and readiness. Tighten weak signals to climb.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-white/80">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Profile indexed by partner pool
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Eligible for warm intros
          </li>
        </ul>
      </div>
    </section>
  );
}
