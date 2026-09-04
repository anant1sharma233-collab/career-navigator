import { motion } from "framer-motion";

interface Props {
  value: number;
  size?: number;
  stroke?: number;
}

/**
 * Apple-Fitness style circular progress ring.
 * Animates from 0 → value on mount.
 */
export function ReadinessRing({ value, size = 200, stroke = 14 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c - (c * Math.min(100, Math.max(0, value))) / 100;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4433" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(63,75,95,0.3)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: target }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-5xl font-semibold text-white tracking-tight"
        >
          {value}%
        </motion.span>
        <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
          Placement Readiness
        </span>
      </div>
    </div>
  );
}
