import { motion } from "framer-motion";
import { ArrowRight, ListChecks, Sparkles } from "lucide-react";
import type { EligibilityBreakdown } from "@/services/opportunitiesService";
import { Chip, MatchRing } from "./primitives";

export function EligibilityCard({ o }: { o: EligibilityBreakdown }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="glass-card rounded-2xl border border-white/5 hover:border-amber-300/30 p-5 flex flex-col gap-4"
    >
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
          {o.logo}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold text-white truncate">
            {o.company} · <span className="text-muted-foreground font-medium">{o.role}</span>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <Chip tone="warning">{o.eligibilityPct}% eligible</Chip>
            <span className="text-emerald-300">{o.package}</span>
            <span className="text-muted-foreground">Gap {o.gapPct}%</span>
          </div>
        </div>
        <MatchRing value={o.matchScore} />
      </header>

      {/* Eligibility bar */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Eligibility</span><span>{o.eligibilityPct}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full gradient-primary" style={{ width: `${o.eligibilityPct}%` }} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 text-xs">
        <div>
          <p className="flex items-center gap-1.5 text-white"><ListChecks className="w-3.5 h-3.5 text-amber-300" /> Missing</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {o.missing.map((m) => <Chip key={m} tone="warning">{m}</Chip>)}
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-white"><Sparkles className="w-3.5 h-3.5 text-primary" /> Unlock plan</p>
          <ul className="mt-1.5 space-y-1 text-muted-foreground">
            {o.nextSteps.slice(0, 3).map((s) => (
              <li key={s} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="flex items-center gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.65)]">
          See Unlock Plan <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5">
          Save
        </button>
      </footer>
    </motion.article>
  );
}
