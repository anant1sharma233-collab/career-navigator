import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ListChecks, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  useDSAData,
  useMarkForRevision,
  useUnmarkForRevision,
  type DSAQuestion,
} from "@/features/services/dsaApi";
import { UserInfoBar } from "@/components/dsa/UserInfoBar";
import { DSASheet } from "@/components/dsa/DSASheet";
import { PackageCard } from "@/components/dsa/PackageCard";
import { CompanyCard } from "@/components/dsa/CompanyCard";

export const Route = createFileRoute("/_student/dsa")({
  head: () => ({
    meta: [
      { title: "DSA — PrepForge" },
      { name: "description", content: "Master DSA: topic-wise sheet, package targets, and company-specific prep." },
    ],
  }),
  component: DSAPage,
});

type Tab = "sheet" | "package" | "company";
type Diff = "All" | "Easy" | "Medium" | "Hard";

const TABS: { key: Tab; label: string; icon: typeof ListChecks }[] = [
  { key: "sheet", label: "DSA Sheet", icon: ListChecks },
  { key: "package", label: "Package-wise", icon: Briefcase },
  { key: "company", label: "Company-wise", icon: Building2 },
];

function DSAPage() {
  const [tab, setTab] = useState<Tab>("sheet");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Diff>("All");

  const { data, isLoading, isError, refetch } = useDSAData();
  const mark = useMarkForRevision();
  const unmark = useUnmarkForRevision();

  const handleToggle = (q: DSAQuestion) => {
    if (q.isMarkedForRevision) unmark.mutate(q.id);
    else mark.mutate(q.id);
  };

  if (isLoading) return <DSALoading />;
  if (isError || !data) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-white">Couldn't load DSA data.</p>
        <button onClick={() => refetch()} className="mt-3 text-sm text-primary hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">DSA Journey</h1>
        <p className="mt-1 text-sm text-muted-foreground">Patterns, problems, and progress — all in one place.</p>
      </header>

      <UserInfoBar data={data} />

      {/* Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="inline-flex glass rounded-xl p-1">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-muted-foreground hover:text-white",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg gradient-primary shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-2">
                  <Icon className="w-4 h-4" /> {label}
                </span>
              </button>
            );
          })}
        </div>

        {tab === "sheet" && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions…"
                className="h-10 w-56 rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
              />
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Diff)}
              className="h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white focus:outline-none focus:border-primary/60"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "sheet" && (
            <DSASheet data={data} search={search} difficulty={difficulty} onToggleRevision={handleToggle} />
          )}
          {tab === "package" && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          )}
          {tab === "company" && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {data.companies.map((c) => <CompanyCard key={c.id} company={c} />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DSALoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 rounded-lg bg-white/5 animate-pulse" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-36 rounded-2xl bg-white/5 animate-pulse" />)}
      </div>
      <div className="h-10 w-72 rounded-xl bg-white/5 animate-pulse" />
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />)}
      </div>
    </div>
  );
}
