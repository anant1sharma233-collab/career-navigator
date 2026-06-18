import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";

/* SectionTitle */
export function SectionTitle({
  eyebrow, title, subtitle, action,
}: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 className="font-display text-xl font-semibold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* Count up */
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

/* AnalyticsCard */
export function AnalyticsCard({
  icon: Icon, label, value, suffix, accent = "primary", delta,
}: {
  icon: LucideIcon; label: string; value: number; suffix?: string;
  accent?: "primary" | "success" | "warning" | "destructive";
  delta?: string;
}) {
  const ring: Record<string, string> = {
    primary: "from-primary/30 to-primary-glow/10 text-primary",
    success: "from-emerald-400/30 to-emerald-500/10 text-emerald-300",
    warning: "from-amber-400/30 to-amber-500/10 text-amber-300",
    destructive: "from-rose-400/30 to-rose-500/10 text-rose-300",
  };
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ring[accent]} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground truncate">{label}</p>
          <p className="font-display text-xl font-semibold text-white leading-tight">
            <CountUp value={value} suffix={suffix} />
          </p>
        </div>
      </div>
      {delta && <p className="mt-2 text-[11px] text-emerald-300/90">{delta}</p>}
    </motion.div>
  );
}

/* States */
export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
          <div className="mt-3 h-3 w-3/4 rounded bg-white/5 animate-pulse" />
          <div className="mt-2 h-3 w-2/3 rounded bg-white/5 animate-pulse" />
          <div className="mt-5 h-9 w-full rounded-xl bg-white/5 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl border border-white/5 p-8 text-center">
      <div className="mx-auto w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground">
        <Inbox className="w-5 h-5" />
      </div>
      <p className="mt-3 text-sm font-medium text-white">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="glass-card rounded-2xl border border-rose-500/20 p-6 text-center">
      <AlertTriangle className="w-5 h-5 text-rose-300 mx-auto" />
      <p className="mt-2 text-sm text-white">Couldn’t load opportunities</p>
      <p className="text-xs text-muted-foreground">Check your connection and try again.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      )}
    </div>
  );
}

/* Tag chips */
export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "primary" }) {
  const tones: Record<string, string> = {
    neutral: "bg-white/5 text-muted-foreground border-white/10",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
    warning: "bg-amber-500/10 text-amber-300 border-amber-400/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* MatchRing — small radial */
export function MatchRing({ value, size = 44 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const o = c - (value / 100) * c;
  const color = value >= 80 ? "stroke-emerald-400" : value >= 60 ? "stroke-primary" : "stroke-amber-400";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="4" fill="none" strokeLinecap="round"
          className={color} strokeDasharray={c} strokeDashoffset={o} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">
        {value}%
      </div>
    </div>
  );
}
