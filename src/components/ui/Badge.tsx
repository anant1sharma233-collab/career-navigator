import * as React from "react";
import { cn } from "@/utils/cn";

type Tone = "default" | "primary" | "success" | "warning" | "danger" | "accent";

const toneMap: Record<Tone, string> = {
  default: "bg-white/5 text-white/80 border-white/10",
  primary: "bg-primary/10 text-[#ff8a73] border-primary/40",
  success: "bg-success/10 text-[#86efac] border-success/40",
  warning: "bg-warning/10 text-[#fcd34d] border-warning/40",
  danger: "bg-danger/10 text-[#ffa494] border-danger/40",
  accent: "bg-accent/10 text-[#ffc9b3] border-accent/40",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneMap[tone],
        className,
      )}
      {...props}
    />
  );
}
