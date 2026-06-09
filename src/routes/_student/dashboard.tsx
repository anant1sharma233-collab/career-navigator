import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Flame, CalendarCheck, ArrowRight } from "lucide-react";

import { studentService } from "@/services/studentService";
import { ReadinessRing } from "@/components/dashboard/ReadinessRing";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JourneyCard } from "@/components/dashboard/JourneyCard";
import { MissionItem } from "@/components/dashboard/MissionItem";
import { Roadmap } from "@/components/dashboard/Roadmap";
import { Button } from "@/components/ui/Button";
import type { Mission } from "@/types";

export const Route = createFileRoute("/_student/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PrepForge" },
      { name: "description", content: "Your career operating system. Track readiness, missions, and roadmap." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["student", "dashboard"],
    queryFn: () => studentService.getDashboard(),
  });

  const [missions, setMissions] = useState<Mission[] | null>(null);
  const current = missions ?? data?.missions ?? [];
  const completed = current.filter((m) => m.completed).length;
  const total = current.length || 1;
  const pct = Math.round((completed / total) * 100);

  const toggle = (id: string) => {
    const base = missions ?? data?.missions ?? [];
    setMissions(base.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)));
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-white font-medium">We couldn't load your dashboard.</p>
        <p className="text-sm text-muted-foreground mt-1">Please refresh or try again shortly.</p>
      </div>
    );
  }

  const { stats, journeys, roadmap } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-10 pb-12"
    >
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 space-y-5">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Welcome back, {data.user.name} <span aria-hidden>👋</span>
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Let's boost your placement readiness.
            </p>
          </div>
          <div className="glass rounded-3xl p-8 flex items-center gap-8">
            <ReadinessRing value={stats.readiness} />
            <div className="space-y-2 min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                You're on track
              </p>
              <p className="text-2xl text-white font-semibold leading-tight">
                Interview ready in{" "}
                <span className="gradient-text">{stats.daysToReady} days</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Keep your streak alive and ship one project this week.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <StatsCard
            icon="🏆"
            label="Your Rank"
            value={`#${stats.rank} of ${stats.totalStudents.toLocaleString()}`}
            accentClass="from-primary/30 to-pink/20"
          />
          <StatsCard
            icon="🔥"
            label="Current Streak"
            value={`${stats.streakDays} days`}
            accentClass="from-warning/30 to-danger/20"
          />
          <StatsCard
            icon="📅"
            label="Interview Ready In"
            value={`${stats.daysToReady} days`}
            accentClass="from-success/30 to-accent/20"
          />
          <Button fullWidth size="lg" className="mt-2">
            Continue Journey <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Journeys */}
      <section>
        <SectionTitle title="Your Journeys" subtitle="Three tracks, one career." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {journeys.map((j) => (
            <JourneyCard key={j.id} journey={j} />
          ))}
        </div>
      </section>

      {/* Today's Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <SectionTitle title="Today's Mission" subtitle="Small reps, compounding wins." />
          <div className="glass rounded-2xl p-6">
            <div className="divide-y divide-white/5">
              {current.map((m) => (
                <MissionItem key={m.id} mission={m} onToggle={toggle} />
              ))}
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {completed}/{total} completed ({pct}%)
                </span>
                <span className="text-success">+5 SRI if all completed today</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-success transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <SectionTitle title="Quick Stats" subtitle="At a glance." />
          <div className="grid grid-cols-1 gap-3">
            <MiniStat icon={<Trophy className="w-4 h-4" />} label="Rank" value={`#${stats.rank}`} />
            <MiniStat icon={<Flame className="w-4 h-4" />} label="Streak" value={`${stats.streakDays} days`} />
            <MiniStat icon={<CalendarCheck className="w-4 h-4" />} label="Days to Ready" value={`${stats.daysToReady}`} />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <SectionTitle title="Career Roadmap" subtitle="Your full path, from semester one to recruiter ready." />
        <div className="glass rounded-2xl p-6">
          <Roadmap nodes={roadmap} />
        </div>
      </section>
    </motion.div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span className="text-white/70">{icon}</span>
        {label}
      </div>
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  );
}
