import { motion } from "framer-motion";
import { Check, Clock, FileText, PlayCircle, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import type { RoadmapTopic } from "@/types/projects";

interface Props {
  topic: RoadmapTopic;
  onToggleComplete: (topic: RoadmapTopic) => void;
  pending?: boolean;
}

export function TopicCard({ topic, onToggleComplete, pending }: Props) {
  const done = !!topic.completed;
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-xl p-4 border bg-white/[0.03] backdrop-blur-xl transition-all",
        done ? "border-emerald-500/40" : "border-white/10 hover:border-white/25",
      )}
    >
      {topic.comingSoon && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Coming soon
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">{topic.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{topic.description}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.timeEstimate}</span>
        {topic.videoLink && !topic.comingSoon && (
          <a href={topic.videoLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            <PlayCircle className="w-3 h-3" /> Watch
          </a>
        )}
        {topic.notesLink && !topic.comingSoon && (
          <a href={topic.notesLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            <FileText className="w-3 h-3" /> Notes
          </a>
        )}
      </div>

      {!topic.comingSoon && (
        <button
          onClick={() => onToggleComplete(topic)}
          disabled={pending}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all",
            done
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-white/10 bg-white/[0.04] text-white hover:bg-white/10",
            pending && "opacity-60",
          )}
          aria-pressed={done}
        >
          <Check className="w-3.5 h-3.5" /> {done ? "Completed" : "Mark complete"}
        </button>
      )}
    </motion.div>
  );
}
