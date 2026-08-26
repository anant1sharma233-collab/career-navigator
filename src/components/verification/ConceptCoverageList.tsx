import { cn } from "@/utils/cn";
import type { ConceptCoverage } from "@/types/verification";

export function ConceptCoverageList({ concepts }: { concepts: ConceptCoverage[] }) {
  if (!concepts.length) return <p className="text-xs text-muted-foreground">No concepts evaluated yet.</p>;
  return (
    <ul className="space-y-2.5">
      {concepts.map((c) => (
        <li key={c.concept}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/85">{c.concept}</span>
            <span
              className={cn(
                c.status === "strong" && "text-success",
                c.status === "needs_review" && "text-warning",
                c.status === "untested" && "text-muted-foreground",
              )}
            >
              {c.status === "untested" ? "Untested" : `${c.mastery}%`}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                c.status === "strong" ? "bg-success/70" : c.status === "needs_review" ? "bg-warning/70" : "bg-white/10",
              )}
              style={{ width: `${Math.max(c.mastery, c.status === "untested" ? 0 : 4)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
