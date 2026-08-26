import { BadgeCheck, GraduationCap, Users, Building2, Clock } from "lucide-react";
import type { VerificationSummary } from "@/types/verification";

/**
 * Shows Learning Progress and Verified Capability side by side — never merged.
 */
export function VerificationSummaryCard({ summary }: { summary: VerificationSummary }) {
  const items = [
    { label: "AI Verified", value: summary.aiVerified, icon: BadgeCheck },
    { label: "Human Verified", value: summary.humanVerified, icon: Users },
    { label: "Faculty Verified", value: summary.facultyVerified, icon: GraduationCap },
    { label: "Industry Verified", value: summary.industryVerified, icon: Building2 },
  ];

  return (
    <section className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-56 h-56 rounded-full blur-3xl bg-gradient-to-br from-primary/30 to-accent/20 opacity-60" />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Verified Capability</h2>
          <p className="text-xs text-muted-foreground mt-1">Evidence over claims — verification is earned, never ticked.</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3" /> Last verified {summary.lastVerifiedAt}
        </span>
      </div>

      <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-muted-foreground">Learning progress</p>
          <p className="mt-1 text-2xl font-bold text-white">{summary.learningDsaPct}%</p>
          <p className="text-[11px] text-muted-foreground">{summary.questionsCompleted} / {summary.questionsTotal} questions completed</p>
          <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-white/25" style={{ width: `${summary.learningDsaPct}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-success/25 bg-success/[0.06] p-4">
          <p className="text-xs text-muted-foreground">Verified DSA</p>
          <p className="mt-1 text-2xl font-bold text-white">{summary.verifiedDsaPct}%</p>
          <p className="text-[11px] text-muted-foreground">{summary.topicsVerified} / {summary.topicsTotal} topics verified · {summary.confidence}% confidence</p>
          <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-success/70" style={{ width: `${summary.verifiedDsaPct}%` }} />
          </div>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5">
            <Icon className="w-3.5 h-3.5 text-primary" />
            <p className="mt-1.5 text-lg font-semibold text-white leading-none">{value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {summary.refreshRecommended > 0 && (
        <p className="relative mt-4 text-xs text-warning">
          {summary.refreshRecommended} topic{summary.refreshRecommended > 1 ? "s" : ""} need a refresh to stay current.
        </p>
      )}
    </section>
  );
}
