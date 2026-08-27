import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trophy, Target, Flame, CheckCircle2, TrendingUp, AlertTriangle, Sparkles, Goal,
  ListChecks, Briefcase, Building2, ArrowRight, Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AnalyticsCard } from "@/components/dsa/AnalyticsCard";
import { TabSwitcher } from "@/components/dsa/TabSwitcher";
import { SectionTitle } from "@/components/dsa/SectionTitle";
import { RoadmapCard } from "@/components/dsa/RoadmapCard";
import { PackageRoadmapCard } from "@/components/dsa/PackageRoadmapCard";
import { CompanyPrepCard } from "@/components/dsa/CompanyPrepCard";
import { DsaRightSidebar } from "@/components/dsa/DsaRightSidebar";
import { DsaRecommendations } from "@/components/dsa/DsaRecommendations";
import { ProgressRing } from "@/components/dsa/ProgressRing";
import { LoadingState, ErrorState } from "@/components/dsa/States";
import { VerificationSummaryCard } from "@/components/verification/VerificationSummaryCard";
import { useVerificationSummary } from "@/hooks/useVerification";
import {
  useDsaSummary, useDsaTopics, useDsaPackages, useDsaCompanies,
  useDsaRecommendations, useDsaSidebar,
} from "@/hooks/useDsa";
import type { DsaTopic, CompanyPrep, Tier } from "@/services/dsaService";

export const Route = createFileRoute("/_student/dsa/")({
  head: () => ({
    meta: [
      { title: "DSA Journey — PrepForge" },
      { name: "description", content: "Your DSA command center — structured roadmap, package-wise prep, and company-specific patterns." },
    ],
  }),
  component: DsaCommandCenter,
});

type Tab = "journey" | "package" | "company";
const TABS = [
  { key: "journey" as const, label: "Structured Journey", icon: ListChecks },
  { key: "package" as const, label: "Package-wise", icon: Briefcase },
  { key: "company" as const, label: "Company-wise", icon: Building2 },
];

const TIER_ORDER: Tier[] = ["Foundations", "Core", "Advanced"];

function DsaCommandCenter() {
  const [tab, setTab] = useState<Tab>("journey");

  const summary = useDsaSummary();
  const topics = useDsaTopics();
  const packages = useDsaPackages();
  const companies = useDsaCompanies();
  const recs = useDsaRecommendations();
  const sidebar = useDsaSidebar();
  const verification = useVerificationSummary();

  const topicsByTier = (topics.data ?? []).reduce<Record<Tier, DsaTopic[]>>(
    (acc, t) => { (acc[t.tier] ||= []).push(t); return acc; },
    { Foundations: [], Core: [], Advanced: [] },
  );

  const companiesByTier = (companies.data ?? []).reduce<Record<CompanyPrep["tier"], CompanyPrep[]>>(
    (acc, c) => { (acc[c.tier] ||= []).push(c); return acc; },
    { "Service-based": [], "Product Tier-1": [], "Product Tier-2": [] },
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="DSA Journey"
        subtitle="Master Data Structures and Algorithms with a structured roadmap."
        action={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-white hover:bg-white/5">
              <ArrowRight className="w-3.5 h-3.5" /> Resume last topic
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
              <Goal className="w-3.5 h-3.5" /> Daily Goal
            </button>
          </div>
        }
      />
      <p className="-mt-6 text-[10px] uppercase tracking-[0.18em] text-primary">Placement Hub</p>

      {/* Hero metrics */}
      {summary.isLoading ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : summary.isError || !summary.data ? (
        <ErrorState onRetry={() => summary.refetch()} message="Couldn't load DSA summary." />
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          <AnalyticsCard label="Readiness Score" value={`${summary.data.readinessScore} / 100`} delta={`+${summary.data.readinessDelta} this week`} icon={<Target className="w-4 h-4" />} countUp />
          <AnalyticsCard label="Current Rank" value={`#${summary.data.currentRankGlobal}`} delta={`#${summary.data.currentRankCollege} college`} icon={<Trophy className="w-4 h-4" />} />
          <AnalyticsCard label="Solved" value={`${summary.data.questionsSolved} / ${summary.data.questionsTotal}`} icon={<CheckCircle2 className="w-4 h-4" />} />
          <AnalyticsCard label="Streak" value={`${summary.data.streak} days 🔥`} icon={<Flame className="w-4 h-4" />} />
          <AnalyticsCard label="Strongest" value={summary.data.strongestTopic.name} delta={`${summary.data.strongestTopic.pct}%`} icon={<TrendingUp className="w-4 h-4" />} tone="success" />
          <AnalyticsCard label="Weakest" value={summary.data.weakestTopic.name} delta={`${summary.data.weakestTopic.pct}%`} icon={<AlertTriangle className="w-4 h-4" />} tone="warning" />
          <AnalyticsCard label="Next" value={summary.data.recommendedNext} icon={<Sparkles className="w-4 h-4" />} footer={
            <Link to="/dsa/journey/$topicId" params={{ topicId: summary.data.recommendedNext.toLowerCase() }} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">Open <ArrowRight className="w-3 h-3" /></Link>
          } />
          <AnalyticsCard label="Today's Goal" value={`${summary.data.todaysGoalDone} / ${summary.data.todaysGoalTotal}`} icon={<Calendar className="w-4 h-4" />} footer={
            <ProgressRing value={(summary.data.todaysGoalDone / summary.data.todaysGoalTotal) * 100} size={42} stroke={5} />
          } />
        </div>
      )}

      {/* Verified capability — kept separate from learning progress */}
      {verification.data && <VerificationSummaryCard summary={verification.data} />}

      {/* Main grid: content + sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6 min-w-0">
          <TabSwitcher tabs={TABS} value={tab} onChange={setTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {tab === "journey" && (
                topics.isLoading ? <LoadingState /> :
                topics.isError ? <ErrorState onRetry={() => topics.refetch()} /> :
                TIER_ORDER.map((tier) => (
                  <div key={tier} className="space-y-4">
                    <SectionTitle title={tier} eyebrow={tier === "Foundations" ? "Start here" : tier === "Core" ? "Build depth" : "Crack interviews"} />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {topicsByTier[tier].map((t) => <RoadmapCard key={t.id} topic={t} />)}
                    </div>
                  </div>
                ))
              )}

              {tab === "package" && (
                packages.isLoading ? <LoadingState /> :
                packages.isError ? <ErrorState onRetry={() => packages.refetch()} /> :
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                  {packages.data?.map((p) => <PackageRoadmapCard key={p.id} pkg={p} />)}
                </div>
              )}

              {tab === "company" && (
                companies.isLoading ? <LoadingState /> :
                companies.isError ? <ErrorState onRetry={() => companies.refetch()} /> :
                (["Service-based", "Product Tier-1", "Product Tier-2"] as const).map((t) => (
                  <div key={t} className="space-y-4">
                    <SectionTitle title={t} />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {companiesByTier[t].map((c) => <CompanyPrepCard key={c.id} company={c} />)}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {recs.data && <DsaRecommendations recs={recs.data} />}
        </div>

        <div className="hidden xl:block">
          {sidebar.data && <DsaRightSidebar data={sidebar.data} />}
        </div>
      </div>
    </div>
  );
}
