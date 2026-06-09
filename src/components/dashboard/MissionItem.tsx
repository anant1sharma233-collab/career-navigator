import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Mission } from "@/types";
import { cn } from "@/utils/cn";

interface Props {
  mission: Mission;
  onToggle: (id: string) => void;
}

export function MissionItem({ mission, onToggle }: Props) {
  return (
    <div className="flex items-center gap-4 py-3 group">
      <button
        onClick={() => onToggle(mission.id)}
        aria-label={mission.completed ? "Mark incomplete" : "Mark complete"}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200",
          mission.completed
            ? "bg-primary border-primary shadow-[0_0_0_4px_rgba(124,58,237,0.15)]"
            : "border-white/20 hover:border-primary/70 hover:bg-primary/10",
        )}
      >
        {mission.completed && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.span>
        )}
      </button>

      <span
        className={cn(
          "flex-1 text-sm transition-colors",
          mission.completed ? "text-muted-foreground line-through" : "text-white",
        )}
      >
        {mission.title}
      </span>

      <Badge tone={mission.category === "DSA" ? "primary" : mission.category === "Project" ? "accent" : "success"}>
        {mission.category}
      </Badge>
    </div>
  );
}
