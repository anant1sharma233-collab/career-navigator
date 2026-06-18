import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Target, CheckCircle2, AlertCircle, Star, Eye, FileText, Gauge, Bookmark,
  Sparkles, Briefcase, Trophy, Code2, GraduationCap, Building2, ArrowRight, SlidersHorizontal,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AnalyticsCard, SectionTitle, LoadingState, EmptyState, ErrorState } from "@/components/opportunities/primitives";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { EligibilityCard } from "@/components/opportunities/EligibilityCard";
import {
  DreamCompanyCard, InternshipCard, HackathonCard, ContestCard, ScholarshipCard, PlacementDriveCard,
} from "@/components/opportunities/SpecialCards";
import { FilterBar, defaultFilters, type OppFilters } from "@/components/opportunities/FilterBar";
import { InsightPanel } from "@/components/opportunities/InsightPanel";
import {
  useOppSummary, useOppRecommendations, useOppEligible, useOppAlmost,
  useOppDreamCompanies, useOppInternships, useOppHackathons, useOppContests,
  useOppScholarships, useOppDrives, useOppInsight,
} from "@/hooks/useOpportunities";
import type { Opportunity } from "@/services/opportunitiesService";

export const Route = createFileRoute("/_student/jobs")({
  head: () => ({
    meta: [
      { title: "Opportunities — PrepForge Career Hub" },
      { name: "description", content: "Personalized jobs, internships, hackathons, contests, scholarships, and placement drives — matched to your readiness and unlock path." },
    ],
  }),
  component: OpportunitiesPage,
});

function filterOpps<T extends Opportunity>(items: T[], f: OppFilters): T[] {
  const q = f.q.trim().toLowerCase();
  return items.filter((o) => {
    if (f.type !== "all" && o.type !== f.type) return false;
    if (f.eligibility !== "all" && o.status !== f.eligibility) return false;
    if (f.mode !== "all" && o.mode !== f.mode) return false;
    if (o.matchScore < f.minMatch) return false;
    if (q && !`${o.company} ${o.role} ${o.tags.join(" ")}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

function OpportunitiesPage() {
  const [filters, setFilters] = useState<OppFilters>(defaultFilters);

  const summary = useOppSummary();
  const recs = useOppRecommendations();
  const eligible = useOppEligible();
  const almost = useOppAlmost();
  const dream = useOppDreamCompanies();
  const interns = useOppInternships();
  const hackathons = useOppHackathons();
  const contests = useOppContests();
  const scholarships = useOppScholarships();
  const drives = useOppDrives();
  const insight = useOppInsight();

  const filteredRecs = useMemo(() => filterOpps(recs.data ?? [], filters), [recs.data, filters]);
  const filteredEligible = useMemo(() => filterOpps(eligible.data ?? [], filters), [eligible.data, filters]);
  const filteredAlmost = useMemo(() => filterOpps(almost.data ?? [], filters), [almost.data, filters]);

  const s = summary.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Opportunities"
        subtitle="Personalized jobs, internships, hackathons, contests, scholarships, and placement drives."
        action={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-white hover:bg-white/5">
              <FileText className="w-3.5 h-3.5" /> Update Profile
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
              <SlidersHorizontal className="w-3.5 h-3.5" /> View All Filters
            </button>
          </div>
        }
      />
      <p className="-mt-6 text-[10px] uppercase tracking-[0.18em] text-primary">Career Hub</p>

      {/* Summary strip */}
      {summary.isLoading ? (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/5 p-4 h-[78px] animate-pulse" />
          ))}
        </div>
      ) : summary.isError ? (
        <ErrorState onRetry={() => summary.refetch()} />
      ) : s ? (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          <AnalyticsCard icon={Target} label="Match Score" value={s.matchScore} suffix="%" />
          <AnalyticsCard icon={CheckCircle2} label="Eligible" value={s.eligibleCount} accent="success" />
          <AnalyticsCard icon={AlertCircle} label="Almost Eligible" value={s.almostEligibleCount} accent="warning" />
          <AnalyticsCard icon={Star} label="Dream Unlocked" value={s.dreamUnlocked} accent="primary" />
          <AnalyticsCard icon={Eye} label="Recruiter Visibility" value={s.recruiterVisibility} suffix="%" />
          <AnalyticsCard icon={FileText} label="Resume Strength" value={s.resumeStrength} suffix="%" accent="success" />
          <AnalyticsCard icon={Gauge} label="Readiness" value={s.readinessScore} suffix="%" accent="primary" />
          <AnalyticsCard icon={Bookmark} label="Saved" value={s.applicationsSaved} />
        </div>
      ) : null}

      {/* Main + Insight panel */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10 min-w-0">
          <FilterBar value={filters} onChange={setFilters} />

          {/* Recommended */}
          <section className="space-y-4">
            <SectionTitle eyebrow="For You" title="Recommended" subtitle="Top matches based on your readiness, skills, and goals." />
            {recs.isLoading ? <LoadingState /> :
              recs.isError ? <ErrorState onRetry={() => recs.refetch()} /> :
              filteredRecs.length === 0 ? <EmptyState title="No recommendations match your filters" hint="Loosen filters or update your profile to get fresh matches." /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredRecs.slice(0, 6).map((o) => <OpportunityCard key={o.id} o={o} />)}
              </div>}
          </section>

          {/* Eligible */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Apply Now" title="Eligible Opportunities" subtitle="You already meet CGPA, branch, skills, and readiness for these roles." />
            {eligible.isLoading ? <LoadingState /> :
              eligible.isError ? <ErrorState onRetry={() => eligible.refetch()} /> :
              filteredEligible.length === 0 ? <EmptyState title="Nothing matches yet" hint="Try widening your filters." /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredEligible.map((o) => <OpportunityCard key={o.id} o={o} />)}
              </div>}
          </section>

          {/* Almost Eligible */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Close The Gap" title="Almost Eligible" subtitle="You're nearly there. Knock out a few items to unlock these roles." />
            {almost.isLoading ? <LoadingState /> :
              almost.isError ? <ErrorState onRetry={() => almost.refetch()} /> :
              filteredAlmost.length === 0 ? <EmptyState title="No almost-eligible roles" hint="Check back as your profile evolves." /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredAlmost.map((o) => <EligibilityCard key={o.id} o={o} />)}
              </div>}
          </section>

          {/* Dream Companies */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Your Picks" title="Dream Companies" subtitle="Track readiness vs. requirement for the companies that matter most." />
            {dream.isLoading ? <LoadingState /> :
              dream.isError ? <ErrorState onRetry={() => dream.refetch()} /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(dream.data ?? []).map((c) => <DreamCompanyCard key={c.id} c={c} />)}
              </div>}
          </section>

          {/* Internships */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Hands-On" title="Internships" subtitle="Remote, summer, winter, and year-round internships." />
            {interns.isLoading ? <LoadingState /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(interns.data ?? []).map((i) => <InternshipCard key={i.id} i={i} />)}
              </div>}
          </section>

          {/* Hackathons */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Build & Win" title="Hackathons" subtitle="Verified hackathons with PPOs, prize pools, and fast-track interviews." />
            {hackathons.isLoading ? <LoadingState /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(hackathons.data ?? []).map((h) => <HackathonCard key={h.id} h={h} />)}
              </div>}
          </section>

          {/* Contests */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Sharpen" title="Coding Contests" subtitle="Stay rated — practice contests aligned to your prep level." />
            {contests.isLoading ? <LoadingState /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(contests.data ?? []).map((c) => <ContestCard key={c.id} c={c} />)}
              </div>}
          </section>

          {/* Scholarships */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Fund Your Journey" title="Scholarships" subtitle="Merit and need-based scholarships you qualify for." />
            {scholarships.isLoading ? <LoadingState /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(scholarships.data ?? []).map((s) => <ScholarshipCard key={s.id} s={s} />)}
              </div>}
          </section>

          {/* Placement Drives */}
          <section className="space-y-4">
            <SectionTitle eyebrow="Don't Miss" title="Placement Drives" subtitle="Active drives with branch eligibility and CGPA cutoffs." />
            {drives.isLoading ? <LoadingState /> :
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(drives.data ?? []).map((d) => <PlacementDriveCard key={d.id} d={d} />)}
              </div>}
          </section>
        </div>

        <div className="lg:block">
          <InsightPanel insight={insight.data} />
        </div>
      </div>
    </div>
  );
}
