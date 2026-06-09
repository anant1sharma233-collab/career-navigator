import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import type { RoadmapNode } from "@/types";
import { cn } from "@/utils/cn";

export function Roadmap({ nodes }: { nodes: RoadmapNode[] }) {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <div className="flex items-center gap-2 min-w-max py-2">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <RoadmapNodeView node={node} />
            {i < nodes.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 md:w-10",
                  node.status === "completed" ? "bg-success/60" : "bg-white/10",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapNodeView({ node }: { node: RoadmapNode }) {
  const base =
    "relative flex h-12 w-12 items-center justify-center rounded-full border text-sm transition-all";
  const tooltip =
    "pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover border border-white/10 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10";

  if (node.status === "completed") {
    return (
      <div className="group relative flex flex-col items-center gap-1.5">
        <button
          className={cn(base, "bg-success/15 border-success/50 text-success hover:scale-110")}
        >
          <Check className="w-5 h-5" strokeWidth={3} />
        </button>
        <span className="text-[10px] text-muted-foreground max-w-[64px] text-center truncate">
          {node.label}
        </span>
        <span className={tooltip}>{node.label} • Completed</span>
      </div>
    );
  }

  if (node.status === "current") {
    return (
      <div className="group relative flex flex-col items-center gap-1.5">
        <motion.button
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            base,
            "bg-warning/20 border-warning text-warning",
            "shadow-[0_0_24px_-2px_rgba(245,158,11,0.6)]",
          )}
        >
          <span className="text-lg">{node.icon ?? "🔥"}</span>
        </motion.button>
        <span className="text-[10px] text-warning font-medium max-w-[64px] text-center truncate">
          {node.label}
        </span>
        <span className={tooltip}>{node.label} • In Progress</span>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col items-center gap-1.5">
      <button className={cn(base, "bg-white/[0.02] border-white/10 text-white/30 cursor-not-allowed")}>
        <Lock className="w-4 h-4" />
      </button>
      <span className="text-[10px] text-white/30 max-w-[64px] text-center truncate">{node.label}</span>
      <span className={tooltip}>{node.label} • Locked</span>
    </div>
  );
}
