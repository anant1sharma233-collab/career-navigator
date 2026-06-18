import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Users, Trophy, GraduationCap, Building2, Code2 } from "lucide-react";
import type {
  DreamCompany, Internship, Hackathon, Contest, Scholarship, PlacementDrive,
} from "@/services/opportunitiesService";
import { Chip, MatchRing } from "./primitives";

const cardBase =
  "glass-card rounded-2xl border border-white/5 hover:border-white/10 p-5 flex flex-col gap-4";

export function DreamCompanyCard({ c }: { c: DreamCompany }) {
  const ready = c.currentReadiness >= c.requiredReadiness;
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">{c.logo}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-white">{c.name}</h3>
          <p className="text-xs text-muted-foreground">{c.role} · <span className="text-emerald-300">{c.package}</span></p>
        </div>
        <Chip tone={ready ? "success" : "warning"}>{ready ? "Ready" : `Gap ${c.gapPct}%`}</Chip>
      </header>

      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <Stat label="Your readiness" value={`${c.currentReadiness}%`} />
        <Stat label="Required" value={`${c.requiredReadiness}%`} />
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full gradient-primary" style={{ width: `${Math.min(100, (c.currentReadiness / c.requiredReadiness) * 100)}%` }} />
      </div>

      <div className="text-xs space-y-1.5">
        <p className="text-white">Missing</p>
        <div className="flex flex-wrap gap-1.5">
          {[...c.missingSkills, ...c.dsaTopics].slice(0, 5).map((m) => <Chip key={m} tone="warning">{m}</Chip>)}
        </div>
        <p className="text-muted-foreground">Projects: {c.projectLevel}</p>
      </div>

      <button className="inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.65)]">
        See Unlock Plan <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export function InternshipCard({ i }: { i: Internship }) {
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">{i.logo}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-white truncate">{i.company}</h3>
          <p className="text-xs text-muted-foreground truncate">{i.role}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{i.duration}</span>
            <span className="text-emerald-300">{i.stipend}</span>
            <Chip>{i.mode}</Chip><Chip>{i.season}</Chip>
          </div>
        </div>
        <MatchRing value={i.matchScore} />
      </header>
      <div className="flex flex-wrap gap-1.5">
        {i.skills.map((s) => <Chip key={s} tone="primary">{s}</Chip>)}
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white">
          Apply Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5">Details</button>
      </div>
      <p className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-3 h-3" />Apply by {i.deadline}</p>
    </motion.article>
  );
}

export function HackathonCard({ h }: { h: Hackathon }) {
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-primary" /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-white truncate">{h.name}</h3>
            {h.verified && <Chip tone="success">Verified</Chip>}
          </div>
          <p className="text-xs text-muted-foreground">{h.organizer}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />Team {h.teamSize}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{h.deadline}</span>
            <Chip>{h.mode}</Chip>
          </div>
        </div>
        <MatchRing value={h.matchScore} />
      </header>
      <div>
        <p className="text-xs text-white">Reward · <span className="text-emerald-300">{h.reward}</span></p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {h.skills.map((s) => <Chip key={s} tone="primary">{s}</Chip>)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white">
          Register <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5">Details</button>
      </div>
    </motion.article>
  );
}

export function ContestCard({ c }: { c: Contest }) {
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Code2 className="w-5 h-5 text-primary" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-white truncate">{c.name}</h3>
          <p className="text-xs text-muted-foreground">{c.platform} · {c.difficulty}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{c.startsAt}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
            <span>{c.registrations.toLocaleString()} registered</span>
          </div>
        </div>
      </header>
      <div className="flex items-center gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-medium text-white">
          Start Practicing <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5">Remind</button>
      </div>
    </motion.article>
  );
}

export function ScholarshipCard({ s }: { s: Scholarship }) {
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center"><GraduationCap className="w-5 h-5 text-emerald-300" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-white truncate">{s.name}</h3>
          <p className="text-xs text-muted-foreground">{s.provider}</p>
        </div>
        <Chip tone="success">{s.amount}</Chip>
      </header>
      <p className="text-xs text-muted-foreground">{s.eligibility}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-3 h-3" />Apply by {s.deadline}</span>
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/5">
          Apply <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export function PlacementDriveCard({ d }: { d: PlacementDrive }) {
  return (
    <motion.article whileHover={{ y: -3 }} className={cardBase}>
      <header className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-primary" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-white truncate">{d.company}</h3>
          <p className="text-xs text-muted-foreground">{d.role} · <span className="text-emerald-300">{d.package}</span></p>
        </div>
        <Chip tone="primary">{d.driveType}</Chip>
      </header>
      <div className="text-xs space-y-1.5">
        <p className="text-muted-foreground">Eligible: <span className="text-white">CGPA ≥ {d.cgpaCutoff}</span></p>
        <div className="flex flex-wrap gap-1.5">
          {d.branches.map((b) => <Chip key={b}>{b}</Chip>)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-3 h-3" />Register by {d.deadline}</span>
        <button className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3 py-1.5 text-xs font-medium text-white">
          Register <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
