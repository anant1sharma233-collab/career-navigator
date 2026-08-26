import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play, BookOpen, CheckCircle2 } from "lucide-react";
import { useDsaTopic } from "@/hooks/useDsa";
import { useTopicVerification } from "@/hooks/useVerification";
import { TopicVerificationPanel } from "@/components/verification/TopicVerificationPanel";
import { ProgressRing } from "@/components/dsa/ProgressRing";
import { DifficultyBadge, BadgeCard } from "@/components/dsa/BadgeCard";
import { LoadingState, ErrorState } from "@/components/dsa/States";

export const Route = createFileRoute("/_student/dsa/journey/$topicId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.topicId} — DSA Journey` },
      { name: "description", content: `Master ${params.topicId} with curated problems, videos, and patterns.` },
    ],
  }),
  component: TopicDetail,
});

const PROBLEMS = [
  { name: "Two Sum", difficulty: "Easy" as const, solved: true },
  { name: "Best Time to Buy and Sell Stock", difficulty: "Easy" as const, solved: true },
  { name: "Container With Most Water", difficulty: "Medium" as const, solved: false },
  { name: "Trapping Rain Water", difficulty: "Hard" as const, solved: false },
  { name: "Longest Consecutive Sequence", difficulty: "Medium" as const, solved: false },
];

const PATTERNS = ["Two Pointers", "Sliding Window", "Prefix Sum", "Kadane", "Sorting + Greedy"];

function TopicDetail() {
  const { topicId } = Route.useParams();
  const { data: topic, isLoading, isError, refetch } = useDsaTopic(topicId);

  if (isLoading) return <LoadingState rows={5} />;
  if (isError || !topic) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Link to="/dsa" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to DSA
      </Link>

      <header className="glass rounded-3xl p-6 flex flex-wrap items-center gap-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-accent/30 opacity-60" />
        <ProgressRing value={topic.progress} size={88} stroke={9} />
        <div className="flex-1 min-w-0 relative">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{topic.tier}</p>
          <h1 className="text-3xl font-bold text-white">{topic.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <DifficultyBadge value={topic.difficulty} />
            <span className="text-xs text-muted-foreground">{topic.estimatedTime}</span>
            <span className="text-xs text-muted-foreground">• {topic.questionsSolved} / {topic.questionsTotal} solved</span>
            <span className="text-xs text-success">+{topic.readinessContribution} to readiness</span>
          </div>
        </div>
        <a href={topic.prepVideoUrl} target="_blank" rel="noreferrer"
          className="relative inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
          <Play className="w-4 h-4" /> Watch Prep Video
        </a>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> Curated Problems</h2>
          <ul className="mt-4 divide-y divide-white/5">
            {PROBLEMS.map((p) => (
              <li key={p.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`w-4 h-4 ${p.solved ? "text-success" : "text-white/20"}`} />
                  <span className="text-sm text-white">{p.name}</span>
                </div>
                <DifficultyBadge value={p.difficulty} />
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Patterns</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PATTERNS.map((p) => <BadgeCard key={p} tone="primary">{p}</BadgeCard>)}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Checkpoints</h3>
            <ol className="mt-3 space-y-2 text-sm text-white/80 list-decimal list-inside">
              <li>Understand brute force + complexity</li>
              <li>Identify optimal pattern</li>
              <li>Solve 5 medium variants</li>
              <li>Time yourself on 2 hard problems</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
