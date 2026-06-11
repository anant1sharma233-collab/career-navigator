import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import type { TechStack } from "@/types/projects";

interface Props {
  stack: TechStack;
  selected: boolean;
  onSelect: (id: TechStack["id"]) => void;
}

const diffColor: Record<TechStack["difficulty"], string> = {
  Beginner: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  Intermediate: "text-amber-300 bg-amber-500/10 border-amber-400/20",
  Advanced: "text-pink-300 bg-pink-500/10 border-pink-400/20",
};

export function StackCard({ stack, selected, onSelect }: Props) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(stack.id)}
      aria-pressed={selected}
      className={cn(
        "group relative text-left rounded-2xl p-5 border transition-all duration-300 overflow-hidden",
        "bg-white/[0.03] backdrop-blur-xl",
        selected
          ? "border-primary/60 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.55)]"
          : "border-white/10 hover:border-white/25",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br -z-10",
          stack.accent,
        )}
      />
      <div className="flex items-center justify-between">
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br", stack.accent)}>
          {stack.icon}
        </div>
        <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border", diffColor[stack.difficulty])}>
          {stack.difficulty}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{stack.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{stack.shortDescription}</p>

      <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{stack.estimatedDuration}</span>
        {stack.progress > 0 && (
          <span className="inline-flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="w-3 h-3" />{stack.progress}% done
          </span>
        )}
      </div>

      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
        <div className={cn("h-full bg-gradient-to-r transition-all duration-700", stack.accent)} style={{ width: `${stack.progress}%` }} />
      </div>
    </motion.button>
  );
}
