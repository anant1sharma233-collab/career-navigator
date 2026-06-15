import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DifficultyBadge, BadgeCard } from "./BadgeCard";
import { ProgressBar } from "./ProgressBar";
import type { CompanyPrep } from "@/services/dsaService";

export function CompanyPrepCard({ company }: { company: CompanyPrep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl glass-elevated flex items-center justify-center text-xl">{company.logo}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white truncate">{company.name}</h3>
          <p className="text-xs text-muted-foreground">{company.totalQuestions} DSA Qs</p>
        </div>
        <DifficultyBadge value={company.difficulty} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Rounds</p>
        <ol className="space-y-1 text-xs text-white/80">
          {company.rounds.slice(0, 4).map((r, i) => (
            <li key={r} className="flex gap-2"><span className="text-muted-foreground">{i + 1}.</span>{r}</li>
          ))}
        </ol>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">DSA Importance</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < company.dsaImportance ? "bg-primary" : "bg-white/10"}`} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {company.focusTopics.slice(0, 5).map((t) => <BadgeCard key={t}>{t}</BadgeCard>)}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Preparation</span>
          <span className="text-white">{company.preparationProgress}%</span>
        </div>
        <ProgressBar value={company.preparationProgress} />
      </div>

      <Link
        to="/dsa/company/$companyId"
        params={{ companyId: company.id }}
        className="inline-flex items-center justify-center gap-1 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)] hover:translate-y-[-1px] transition-transform"
      >
        Start Practicing <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}
