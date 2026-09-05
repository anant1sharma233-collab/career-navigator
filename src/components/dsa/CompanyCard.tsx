import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type { DSACompany } from "@/features/services/dsaApi";

const tierStyle: Record<DSACompany["tier"], string> = {
  "Beginner Friendly": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "Entry Level": "bg-[#ffb199]/12 text-[#ffb199] border-[#ffb199]/30",
  "Top Tier": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Elite": "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export const CompanyCard = memo(function CompanyCard({ company }: { company: DSACompany }) {
  const pct = Math.round((company.solved / company.totalQuestions) * 100);
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-5 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
            {company.logo}
          </div>
          <div>
            <div className="text-base font-semibold text-white">{company.name}</div>
            <div className="text-xs text-muted-foreground">{company.totalQuestions} questions</div>
          </div>
        </div>
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", tierStyle[company.tier])}>
          {company.tier}
        </span>
      </div>

      <div>
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>{company.solved}/{company.totalQuestions}</span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {company.topics.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80">{t}</span>
        ))}
      </div>

      <Button fullWidth variant="primary">
        Start Practicing <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
});
