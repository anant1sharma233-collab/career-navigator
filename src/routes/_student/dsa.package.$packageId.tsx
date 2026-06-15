import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, Building2 } from "lucide-react";
import { useDsaPackage, useDsaTopics } from "@/hooks/useDsa";
import { ProgressRing } from "@/components/dsa/ProgressRing";
import { DifficultyBadge, BadgeCard } from "@/components/dsa/BadgeCard";
import { SectionTitle } from "@/components/dsa/SectionTitle";
import { RoadmapCard } from "@/components/dsa/RoadmapCard";
import { LoadingState, ErrorState } from "@/components/dsa/States";
import type { Tier } from "@/services/dsaService";

export const Route = createFileRoute("/_student/dsa/package/$packageId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.packageId} LPA Prep — PrepForge` },
      { name: "description", content: "Tiered roadmap, weekly plan and recommended problems for your target package." },
    ],
  }),
  component: PackageDetail,
});

const WEEKLY_PLAN = [
  { week: "Week 1–2", focus: "Arrays, Strings, Sorting", problems: 25 },
  { week: "Week 3–4", focus: "Linked List, Stack, Queue", problems: 22 },
  { week: "Week 5–6", focus: "Hashing, Recursion, Binary Search", problems: 28 },
  { week: "Week 7–8", focus: "Trees, BST, Heap", problems: 30 },
  { week: "Week 9–10", focus: "Graphs, Greedy, DP intro", problems: 32 },
];

const CHECKPOINTS = [
  "Solve 50 easy + 30 medium problems",
  "System design basics: caching, load balancing, queues",
  "Mock interview x 3",
  "Behavioural prep: STAR framework",
];

function PackageDetail() {
  const { packageId } = Route.useParams();
  const pkg = useDsaPackage(packageId);
  const topics = useDsaTopics();

  if (pkg.isLoading || topics.isLoading) return <LoadingState rows={6} />;
  if (pkg.isError || !pkg.data) return <ErrorState onRetry={() => pkg.refetch()} />;

  const required = new Set(pkg.data.requiredTopics.map((t) => t.toLowerCase()));
  const matched = (topics.data ?? []).filter((t) => required.has(t.name.toLowerCase()) || required.has(t.id));
  const byTier = matched.reduce<Record<Tier, typeof matched>>((acc, t) => { (acc[t.tier] ||= []).push(t); return acc; }, { Foundations: [], Core: [], Advanced: [] });

  return (
    <div className="space-y-6">
      <Link to="/dsa" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to DSA
      </Link>

      <header className="glass rounded-3xl p-6 flex flex-wrap items-center gap-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-accent/30 opacity-60" />
        <ProgressRing value={pkg.data.readinessScore} size={88} stroke={9} />
        <div className="flex-1 min-w-0 relative">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Package Roadmap</p>
          <h1 className="text-3xl font-bold gradient-text">{pkg.data.salaryBand}</h1>
          <p className="text-sm text-muted-foreground mt-1">{pkg.data.audience}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <DifficultyBadge value={pkg.data.difficulty} />
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {pkg.data.estimatedTime}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Building2 className="w-3.5 h-3.5" /> {pkg.data.companies.length} target companies</span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {(["Foundations", "Core", "Advanced"] as Tier[]).map((tier) => byTier[tier].length > 0 && (
            <div key={tier} className="space-y-3">
              <SectionTitle title={tier} eyebrow="Required topics" />
              <div className="grid gap-4 md:grid-cols-2">
                {byTier[tier].map((t) => <RoadmapCard key={t.id} topic={t} />)}
              </div>
            </div>
          ))}

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Weekly Plan</h3>
            <ol className="mt-4 space-y-3">
              {WEEKLY_PLAN.map((w) => (
                <li key={w.week} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm text-white">{w.week}</p>
                    <p className="text-xs text-muted-foreground">{w.focus}</p>
                  </div>
                  <span className="text-xs text-primary">{w.problems} problems</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 h-fit">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Hiring Companies</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pkg.data.companies.map((c) => <BadgeCard key={c}>{c}</BadgeCard>)}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">System Design Checkpoints</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc list-inside">
              {CHECKPOINTS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Progress</h3>
            <p className="mt-1 text-3xl font-bold gradient-text">{pkg.data.readinessScore}%</p>
            <p className="text-xs text-muted-foreground">Readiness for this band</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
