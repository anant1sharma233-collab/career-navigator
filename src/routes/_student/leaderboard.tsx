import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/common/PageHeader";
import { HeroSummary } from "@/components/leaderboard/HeroSummary";
import { Podium } from "@/components/leaderboard/Podium";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { ComparisonDrawer } from "@/components/leaderboard/ComparisonDrawer";
import { AchievementGrid } from "@/components/leaderboard/AchievementGrid";
import { AIInsightsCard } from "@/components/leaderboard/AIInsightsCard";
import { RecruiterPanel } from "@/components/leaderboard/RecruiterPanel";
import {
  useAchievements,
  useCurrentUser,
  useLeaderboardBoard,
  usePodium,
  useRankInsights,
  useRankSummary,
  useRecruiterVisibility,
  useScoringFormula,
} from "@/hooks/useLeaderboard";
import type { LeaderboardScope } from "@/types/leaderboard";

export const Route = createFileRoute("/_student/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — PrepForge" },
      {
        name: "description",
        content:
          "See how you rank across PrepForge — global, college, department, and friends leaderboards with AI-powered insights.",
      },
    ],
  }),
  component: LeaderboardPage,
});

type Tab = { id: LeaderboardScope; label: string };

function LeaderboardPage() {
  const user = useCurrentUser();
  const formula = useScoringFormula();
  const summary = useRankSummary();
  const achievements = useAchievements();
  const insights = useRankInsights();
  const recruiter = useRecruiterVisibility();

  const tabs = useMemo<Tab[]>(() => {
    const base: Tab[] = [{ id: "overall", label: "Overall" }];
    if (user.data?.hasCollege) {
      base.push({ id: "college", label: "College" }, { id: "department", label: "Department" });
    }
    base.push({ id: "friends", label: "Friends" }, { id: "offcampus", label: "Off-Campus" });
    return base;
  }, [user.data?.hasCollege]);

  const [scope, setScope] = useState<LeaderboardScope>("overall");
  const podium = usePodium(scope);
  const board = useLeaderboardBoard(scope);
  const [comparingId, setComparingId] = useState<string | null>(null);

  const showCollegeColumns = scope !== "offcampus";

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Leaderboard"
        subtitle="A composite, college-aware ranking of every student on PrepForge."
      />

      <HeroSummary
        user={user.data}
        summary={summary.data}
        formula={formula.data}
        loading={user.isLoading || summary.isLoading || formula.isLoading}
      />

      <section className="space-y-4">
        <SectionLabel title="Top of the leaderboard" subtitle="The three highest composite scores in this view." />
        <Podium entries={podium.data} loading={podium.isLoading} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <SectionLabel title="Full ranking" subtitle="Click any student to compare against your stats." />
          <TabBar tabs={tabs} value={scope} onChange={setScope} />
        </div>

        {scope === "college" && !user.data?.hasCollege && (
          <OnboardingHint
            text="Link your college from your profile to unlock College and Department rankings."
            href="/profile"
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={scope}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <LeaderboardTable
              entries={board.data}
              loading={board.isLoading}
              error={board.error}
              onRetry={() => board.refetch()}
              onSelect={(e) => setComparingId(e.userId)}
              showCollegeColumns={showCollegeColumns}
              emptyMessage={
                scope === "friends"
                  ? "No friends yet — connect with peers to populate this view."
                  : "Nothing here yet."
              }
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <AIInsightsCard
        rank={summary.data?.rank}
        insights={insights.data}
        loading={insights.isLoading}
      />

      <section className="space-y-4">
        <SectionLabel
          title="Achievements"
          subtitle="Earned badges and the ones still ahead of you."
        />
        <AchievementGrid badges={achievements.data} loading={achievements.isLoading} />
      </section>

      <section className="space-y-4">
        <SectionLabel
          title="Recruiter visibility"
          subtitle="How discoverable and hire-ready your profile looks to recruiters."
        />
        <RecruiterPanel data={recruiter.data} loading={recruiter.isLoading} />
      </section>

      <ComparisonDrawer otherUserId={comparingId} onClose={() => setComparingId(null)} />
    </div>
  );
}

function SectionLabel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function TabBar({
  tabs,
  value,
  onChange,
}: {
  tabs: Tab[];
  value: LeaderboardScope;
  onChange: (v: LeaderboardScope) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Leaderboard scope"
      className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur"
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition ${
              active ? "text-white" : "text-muted-foreground hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="leaderboard-tab-active"
                className="absolute inset-0 rounded-lg gradient-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function OnboardingHint({ text, href }: { text: string; href: string }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-white/90 flex items-center justify-between gap-4">
      <span>{text}</span>
      <a href={href} className="text-primary hover:text-white transition whitespace-nowrap">
        Link college →
      </a>
    </div>
  );
}
