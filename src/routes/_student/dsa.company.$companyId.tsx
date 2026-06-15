import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Video } from "lucide-react";
import { useState } from "react";
import { useDsaCompany } from "@/hooks/useDsa";
import { DifficultyBadge, BadgeCard } from "@/components/dsa/BadgeCard";
import { ProgressBar } from "@/components/dsa/ProgressBar";
import { LoadingState, ErrorState } from "@/components/dsa/States";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/_student/dsa/company/$companyId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.companyId} Prep — PrepForge` },
      { name: "description", content: "Round-by-round prep, tagged problems and interview patterns for this company." },
    ],
  }),
  component: CompanyDetail,
});

const PROBLEMS = [
  { name: "Two Sum", round: 1, difficulty: "Easy" as const },
  { name: "Number of Islands", round: 2, difficulty: "Medium" as const },
  { name: "LRU Cache", round: 2, difficulty: "Medium" as const },
  { name: "Word Ladder II", round: 3, difficulty: "Hard" as const },
  { name: "Merge K Sorted Lists", round: 3, difficulty: "Hard" as const },
  { name: "Design Twitter", round: 4, difficulty: "Hard" as const },
];

const EXPERIENCES = [
  { id: "e1", title: "SDE-1 Onsite — Cleared", rating: 5, summary: "Asked 2 graph + 1 DP in onsite. Bar Raiser focused on leadership principles." },
  { id: "e2", title: "Internship interview — Rejected R3", rating: 3, summary: "OA was tricky — sliding window + DP. Phone screen smooth, onsite tough." },
];

const PATTERNS = ["Graph traversal heavily weighted", "DP on intervals", "Concurrent data structures in LLD", "Behavioural via leadership principles"];

function CompanyDetail() {
  const { companyId } = Route.useParams();
  const [roundFilter, setRoundFilter] = useState<number | "all">("all");
  const { data: company, isLoading, isError, refetch } = useDsaCompany(companyId);

  if (isLoading) return <LoadingState rows={6} />;
  if (isError || !company) return <ErrorState onRetry={() => refetch()} />;

  const rounds = company.rounds.map((_, i) => i + 1);
  const filtered = roundFilter === "all" ? PROBLEMS : PROBLEMS.filter((p) => p.round === roundFilter);

  return (
    <div className="space-y-6">
      <Link to="/dsa" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to DSA
      </Link>

      <header className="glass rounded-3xl p-6 flex flex-wrap items-center gap-5 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-accent/30 opacity-60" />
        <div className="w-16 h-16 rounded-2xl glass-elevated flex items-center justify-center text-3xl relative">{company.logo}</div>
        <div className="flex-1 min-w-0 relative">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{company.tier}</p>
          <h1 className="text-3xl font-bold text-white">{company.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <DifficultyBadge value={company.difficulty} />
            <span className="text-muted-foreground">{company.totalQuestions} DSA Qs</span>
            <span className="text-muted-foreground">• {company.rounds.length} rounds</span>
          </div>
          <div className="mt-3 max-w-md">
            <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Your prep</span><span className="text-white">{company.preparationProgress}%</span></div>
            <ProgressBar value={company.preparationProgress} />
          </div>
        </div>
        <button className="relative inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
          <Video className="w-4 h-4" /> Start Mock Interview
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Round Breakdown</h2>
            <ol className="mt-4 space-y-3">
              {company.rounds.map((r, i) => (
                <li key={r} className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-primary">Round {i + 1}</p>
                  <p className="text-sm text-white mt-0.5">{r}</p>
                  <p className="text-xs text-muted-foreground mt-1">~60–90 min · 2–3 problems</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-lg font-semibold text-white">Top Tagged Problems</h2>
              <div className="flex items-center gap-1">
                <button onClick={() => setRoundFilter("all")} className={cn("rounded-lg px-2.5 py-1 text-xs", roundFilter === "all" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:text-white")}>All</button>
                {rounds.map((r) => (
                  <button key={r} onClick={() => setRoundFilter(r)} className={cn("rounded-lg px-2.5 py-1 text-xs", roundFilter === r ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:text-white")}>R{r}</button>
                ))}
              </div>
            </div>
            <ul className="mt-4 divide-y divide-white/5">
              {filtered.map((p) => (
                <li key={p.name} className="flex items-center justify-between py-3">
                  <span className="text-sm text-white">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <BadgeCard>R{p.round}</BadgeCard>
                    <DifficultyBadge value={p.difficulty} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Recent Interview Experiences</h2>
            <div className="mt-4 space-y-3">
              {EXPERIENCES.map((e) => (
                <details key={e.id} className="rounded-xl bg-white/5 p-4">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-white">{e.title}</span>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("w-3.5 h-3.5", i < e.rating ? "fill-warning text-warning" : "text-white/20")} />
                      ))}
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 h-fit">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Focus Topics</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {company.focusTopics.map((t) => <BadgeCard key={t} tone="primary">{t}</BadgeCard>)}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Company Patterns</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc list-inside">
              {PATTERNS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">DSA Importance</h3>
            <div className="mt-2 flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`flex-1 h-2 rounded ${i < company.dsaImportance ? "gradient-primary" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
