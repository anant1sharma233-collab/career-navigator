import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProgressRing } from "./ProgressRing";
import { DifficultyBadge, BadgeCard } from "./BadgeCard";
import type { PackageRoadmap } from "@/services/dsaService";

export function PackageRoadmapCard({ pkg }: { pkg: PackageRoadmap }) {
  const shown = pkg.requiredTopics.slice(0, 6);
  const extra = pkg.requiredTopics.length - shown.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-accent/30 opacity-60" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold gradient-text">{pkg.salaryBand}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{pkg.audience}</p>
        </div>
        <ProgressRing value={pkg.readinessScore} size={64} />
      </div>

      <div className="relative flex flex-wrap gap-1.5">
        {shown.map((t) => <BadgeCard key={t}>{t}</BadgeCard>)}
        {extra > 0 && <BadgeCard tone="primary">+{extra} more</BadgeCard>}
      </div>

      <div className="relative grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <p className="text-muted-foreground">Est. prep</p>
          <p className="text-white font-medium">{pkg.estimatedTime}</p>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Difficulty</p>
            <DifficultyBadge value={pkg.difficulty} className="mt-0.5" />
          </div>
        </div>
      </div>

      <div className="relative">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Hiring</p>
        <div className="flex flex-wrap gap-1.5">
          {pkg.companies.slice(0, 5).map((c) => (
            <span key={c} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/80">{c}</span>
          ))}
        </div>
      </div>

      <Link
        to="/dsa/package/$packageId"
        params={{ packageId: pkg.id }}
        className="relative inline-flex items-center justify-center gap-1 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)] hover:translate-y-[-1px] transition-transform"
      >
        Start Learning <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}
