import { Search, SlidersHorizontal } from "lucide-react";

export interface OppFilters {
  q: string;
  type: "all" | "job" | "internship" | "hackathon" | "contest" | "scholarship" | "drive";
  eligibility: "all" | "eligible" | "almost";
  mode: "all" | "Remote" | "Onsite" | "Hybrid";
  minMatch: number;
}

export const defaultFilters: OppFilters = {
  q: "", type: "all", eligibility: "all", mode: "all", minMatch: 0,
};

const types: { v: OppFilters["type"]; label: string }[] = [
  { v: "all", label: "All" }, { v: "job", label: "Jobs" }, { v: "internship", label: "Internships" },
  { v: "hackathon", label: "Hackathons" }, { v: "contest", label: "Contests" },
  { v: "scholarship", label: "Scholarships" }, { v: "drive", label: "Drives" },
];

export function FilterBar({ value, onChange }: { value: OppFilters; onChange: (v: OppFilters) => void }) {
  return (
    <div className="glass-card rounded-2xl border border-white/5 p-3 flex flex-col gap-3 lg:flex-row lg:items-center">
      <label className="flex-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          aria-label="Search opportunities"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search by company, role, skill…"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground outline-none"
        />
      </label>

      <div className="flex flex-wrap items-center gap-1.5">
        {types.map((t) => {
          const active = value.type === t.v;
          return (
            <button
              key={t.v}
              onClick={() => onChange({ ...value, type: t.v })}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                active
                  ? "gradient-primary text-white shadow-[0_6px_18px_-8px_rgba(124,58,237,0.7)]"
                  : "border border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <select
          aria-label="Eligibility"
          value={value.eligibility}
          onChange={(e) => onChange({ ...value, eligibility: e.target.value as OppFilters["eligibility"] })}
          className="rounded-xl border border-white/10 bg-background/40 px-2.5 py-2 text-xs text-white outline-none"
        >
          <option value="all">All eligibility</option>
          <option value="eligible">Eligible</option>
          <option value="almost">Almost eligible</option>
        </select>
        <select
          aria-label="Work mode"
          value={value.mode}
          onChange={(e) => onChange({ ...value, mode: e.target.value as OppFilters["mode"] })}
          className="rounded-xl border border-white/10 bg-background/40 px-2.5 py-2 text-xs text-white outline-none"
        >
          <option value="all">Any mode</option>
          <option>Remote</option><option>Onsite</option><option>Hybrid</option>
        </select>
        <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-2.5 py-2 text-[11px] text-muted-foreground">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Match ≥
          <input
            type="range" min={0} max={100} step={5} value={value.minMatch}
            onChange={(e) => onChange({ ...value, minMatch: Number(e.target.value) })}
            className="accent-primary w-20"
          />
          <span className="text-white tabular-nums w-7 text-right">{value.minMatch}%</span>
        </label>
      </div>
    </div>
  );
}
