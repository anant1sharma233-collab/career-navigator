import { cn } from "@/utils/cn";

interface Props {
  icon: string;
  label: string;
  value: string;
  accentClass?: string;
}

export function StatsCard({ icon, label, value, accentClass = "from-primary/30 to-secondary/20" }: Props) {
  return (
    <div className="glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-white/20">
      <div
        className={cn(
          "h-11 w-11 rounded-xl flex items-center justify-center text-xl",
          "bg-gradient-to-br border border-white/10",
          accentClass,
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg text-white font-semibold leading-tight truncate">{value}</p>
      </div>
    </div>
  );
}
