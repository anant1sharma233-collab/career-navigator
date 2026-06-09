import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Journey } from "@/types";
import { cn } from "@/utils/cn";

const accentMap = {
  primary: { bar: "from-[#a78bfa] to-[#7c3aed]", glow: "shadow-[0_20px_60px_-20px_rgba(124,58,237,0.55)]" },
  secondary: { bar: "from-[#818cf8] to-[#6366f1]", glow: "shadow-[0_20px_60px_-20px_rgba(99,102,241,0.55)]" },
  accent: { bar: "from-[#60a5fa] to-[#3b82f6]", glow: "shadow-[0_20px_60px_-20px_rgba(59,130,246,0.55)]" },
} as const;

export function JourneyCard({ journey }: { journey: Journey }) {
  const a = accentMap[journey.accent];
  const pct = Math.round((journey.progress / journey.total) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "glass rounded-2xl p-6 group cursor-pointer",
        "hover:border-white/25 transition-all duration-300",
        "hover:" + a.glow,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{journey.icon}</div>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{journey.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {journey.progress}/{journey.total} completed
      </p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", a.bar)}
        />
      </div>

      <p className="mt-4 text-sm text-white/70">
        <span className="text-muted-foreground">{journey.nextLabel}:</span> {journey.nextItem}
      </p>

      <button
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-medium",
          "text-white/90 hover:text-white transition-colors",
        )}
      >
        Continue Journey
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}
