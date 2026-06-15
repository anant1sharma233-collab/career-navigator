import { cn } from "@/utils/cn";
import type { Difficulty } from "@/services/dsaService";

const map: Record<Difficulty, string> = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Hard: "bg-danger/15 text-danger border-danger/30",
};

export function DifficultyBadge({ value, className }: { value: Difficulty; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", map[value], className)}>
      {value}
    </span>
  );
}

export function BadgeCard({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "primary" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs",
      tone === "primary" ? "bg-primary/15 text-primary border border-primary/30" : "bg-white/5 text-muted-foreground border border-white/10",
    )}>{children}</span>
  );
}
