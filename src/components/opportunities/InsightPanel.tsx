import { motion } from "framer-motion";
import { Sparkles, Target, ChevronRight } from "lucide-react";
import type { Insight } from "@/services/opportunitiesService";

export function InsightPanel({ insight }: { insight?: Insight }) {
  if (!insight) return null;
  const pct = Math.min(100, Math.round((insight.currentReadiness / insight.requiredReadiness) * 100));
  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl border border-white/5 p-5 sticky top-4"
      aria-label="Eligibility insight panel"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Career Insight</p>
          <h3 className="font-display text-base font-semibold text-white">Why am I not eligible?</h3>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white inline-flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-primary" />{insight.goal}</span>
          <span className="text-muted-foreground">{insight.currentReadiness}% / {insight.requiredReadiness}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full gradient-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <Block label="Missing topics" items={insight.missingTopics} />
        <Block label="Missing skills" items={insight.missingSkills} />
        <Block label="Missing projects" items={insight.missingProjects} />
      </div>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Your next steps</p>
        <ul className="mt-2 space-y-2">
          {insight.nextSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-md gradient-primary text-[10px] font-semibold text-white flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-xs text-white/90">{s}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.65)]">
          Build my unlock plan <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.aside>
  );
}

function Block({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span key={i} className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
