interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full rounded-full bg-white/5 overflow-hidden ${className ?? ""}`}>
      <div
        className="h-full rounded-full gradient-primary transition-[width] duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
