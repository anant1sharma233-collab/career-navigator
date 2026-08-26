import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { VerificationBadge, FreshnessBadge } from "./VerificationBadge";
import { ConceptCoverageList } from "./ConceptCoverageList";
import type { TopicVerification } from "@/types/verification";

export function TopicVerificationPanel({
  topicId,
  verification,
}: {
  topicId: string;
  verification: TopicVerification;
}) {
  const cta =
    verification.state === "verified"
      ? "Re-verify topic"
      : verification.state === "partially_verified"
        ? "Complete verification"
        : "Verify this topic";

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-white mr-auto">Verified capability</h3>
        <VerificationBadge state={verification.state} level={verification.level} confidence={verification.confidence} />
        <FreshnessBadge freshness={verification.freshness} />
      </div>

      <p className="text-[11px] text-muted-foreground">
        Marking questions complete tracks learning progress only. Verification requires unseen problems and an AI viva.
      </p>

      <div>
        <p className="text-xs font-medium text-white/80 mb-2">Concept coverage</p>
        <ConceptCoverageList concepts={verification.concepts} />
      </div>

      {verification.evidence.length > 0 && (
        <div>
          <p className="text-xs font-medium text-white/80 mb-2">Supporting evidence</p>
          <ul className="space-y-1.5">
            {verification.evidence.map((e) => (
              <li key={e.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileCheck2 className={e.accepted ? "w-3.5 h-3.5 text-success" : "w-3.5 h-3.5 text-white/30"} />
                <span className="truncate">{e.label}</span>
                <span className="ml-auto text-[10px]">{e.accepted ? "Accepted" : "Pending"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {verification.attempts.length > 0 && (
        <div>
          <p className="text-xs font-medium text-white/80 mb-2">Attempt history</p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {verification.attempts.map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <span>{a.completedAt ?? a.startedAt} · {a.level}</span>
                <span className="text-white/80">{a.score}% · {a.outcome.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/dsa/verify/$topicId"
        params={{ topicId }}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]"
      >
        {cta} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
