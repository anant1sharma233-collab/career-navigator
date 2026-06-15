import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  delta?: string;
  icon: ReactNode;
  tone?: "default" | "warning" | "success" | "danger";
  footer?: ReactNode;
  countUp?: boolean;
}

const toneRing: Record<NonNullable<AnalyticsCardProps["tone"]>, string> = {
  default: "from-primary/30 to-secondary/30",
  warning: "from-warning/40 to-warning/10",
  success: "from-success/40 to-success/10",
  danger: "from-danger/40 to-danger/10",
};

function CountUp({ to }: { to: number }) {
  const v = useMotionValue(0);
  const rounded = useTransform(v, (x) => Math.round(x).toString());
  useEffect(() => {
    const c = animate(v, to, { duration: 0.9, ease: "easeOut" });
    return c.stop;
  }, [to, v]);
  return <motion.span>{rounded}</motion.span>;
}

export function AnalyticsCard({ label, value, delta, icon, tone = "default", footer, countUp }: AnalyticsCardProps) {
  const numeric = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
  const useCount = countUp && Number.isFinite(numeric);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group"
    >
      <div className={cn("absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-50 bg-gradient-to-br", toneRing[tone])} />
      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white truncate">
            {useCount ? <CountUp to={numeric} /> : value}
          </p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
          {footer && <div className="mt-3">{footer}</div>}
        </div>
        <div className="shrink-0 rounded-xl gradient-primary p-2 text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
