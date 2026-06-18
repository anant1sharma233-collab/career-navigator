import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import type { Opportunity } from "@/services/opportunitiesService";
import { Chip, MatchRing } from "./primitives";

export function OpportunityCard({ o, variant = "default" }: { o: Opportunity; variant?: "default" | "compact" }) {
  const isEligible = o.status === "eligible";
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="glass-card rounded-2xl border border-white/5 hover:border-white/10 p-5 flex flex-col gap-4 shadow-[0_8px_28px_-18px_rgba(0,0,0,0.6)]"
    >
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
          {o.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-white truncate">{o.company}</h3>
            <Chip tone="primary">{o.type}</Chip>
          </div>
          <p className="text-sm text-muted-foreground truncate">{o.role}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="text-emerald-300 font-medium">{o.package}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{o.location} · {o.mode}</span>
            {o.deadline && (
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{o.deadline}</span>
            )}
          </div>
        </div>
        <MatchRing value={o.matchScore} />
      </header>

      {variant === "default" && (
        <div className="space-y-2 text-xs">
          {isEligible ? (
            <div className="flex items-start gap-2 text-emerald-300/90">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <p><span className="text-white">Why it matches:</span> {o.whyMatch.join(" · ")}</p>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-amber-300/90">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <p>
                <span className="text-white">{o.eligibilityPct}% eligible</span> · need {o.missing.join(" + ")}
              </p>
            </div>
          )}
          {o.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {o.tags.slice(0, 4).map((t) => <Chip key={t}>{t}</Chip>)}
            </div>
          )}
        </div>
      )}

      <footer className="flex items-center gap-2 pt-1">
        <button
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-shadow ${
            isEligible
              ? "gradient-primary text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.65)] hover:shadow-[0_10px_28px_-10px_rgba(124,58,237,0.85)]"
              : "border border-white/10 text-white hover:bg-white/5"
          }`}
        >
          {isEligible ? "Apply Now" : "Unlock"} <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5">
          Details
        </button>
      </footer>
    </motion.article>
  );
}
