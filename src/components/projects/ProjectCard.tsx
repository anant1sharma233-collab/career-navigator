import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import type { ProjectSuggestion } from "@/types/projects";

interface Props {
  project: ProjectSuggestion;
  onStart?: (id: string) => void;
}

const diffColor: Record<ProjectSuggestion["difficulty"], string> = {
  Beginner: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  Intermediate: "text-amber-300 bg-amber-500/10 border-amber-400/20",
  Advanced: "text-pink-300 bg-pink-500/10 border-pink-400/20",
};

export function ProjectCard({ project, onStart }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl p-5 border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-primary/40 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-white">{project.title}</h4>
        <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border", diffColor[project.difficulty])}>
          {project.difficulty}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.skills.map((s) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {project.estimatedTime}</span>
        <span>After: {project.recommendedAfter}</span>
      </div>
      <button
        onClick={() => onStart?.(project.id)}
        className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-95 transition-opacity"
      >
        Start building <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
