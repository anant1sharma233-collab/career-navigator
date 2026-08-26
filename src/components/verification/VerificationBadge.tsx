import { BadgeCheck, CircleDashed, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/utils/cn";
import type { FreshnessStatus, VerificationLevel, VerificationState } from "@/types/verification";

const STATE_STYLES: Record<VerificationState, string> = {
  verified: "bg-success/15 text-success border-success/30",
  partially_verified: "bg-warning/15 text-warning border-warning/30",
  in_progress: "bg-primary/15 text-primary border-primary/30",
  not_started: "bg-white/5 text-muted-foreground border-white/10",
};

const STATE_LABEL: Record<VerificationState, string> = {
  verified: "Verified",
  partially_verified: "Partially Verified",
  in_progress: "Verification in progress",
  not_started: "Not verified",
};

export function VerificationBadge({
  state,
  level,
  confidence,
  className,
}: {
  state: VerificationState;
  level?: VerificationLevel;
  confidence?: number;
  className?: string;
}) {
  const Icon = state === "verified" ? BadgeCheck : state === "partially_verified" ? ShieldAlert : CircleDashed;
  const label = state === "verified" && level ? level : STATE_LABEL[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATE_STYLES[state],
        className,
      )}
      title={`${STATE_LABEL[state]}${typeof confidence === "number" ? ` · ${confidence}% confidence` : ""}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
      {state !== "not_started" && typeof confidence === "number" && confidence > 0 && (
        <span className="opacity-70">· {confidence}%</span>
      )}
    </span>
  );
}

export function FreshnessBadge({ freshness }: { freshness?: FreshnessStatus }) {
  if (!freshness) return null;
  const stale = freshness === "Refresh Recommended";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px]",
        stale ? "bg-warning/10 text-warning border-warning/30" : "bg-white/5 text-muted-foreground border-white/10",
      )}
    >
      <Clock className="w-3 h-3" /> {freshness}
    </span>
  );
}
