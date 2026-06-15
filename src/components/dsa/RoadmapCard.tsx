import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { ProgressRing } from "./ProgressRing";
import { DifficultyBadge } from "./BadgeCard";
import type { DsaTopic } from "@/services/dsaService";

export function RoadmapCard({ topic }: { topic: DsaTopic }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-secondary/30 opacity-60" />
      <div className="flex items-start justify-between gap-3 relative">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{topic.tier}</p>
          <h3 className="mt-1 text-lg font-semibold text-white truncate">{topic.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <DifficultyBadge value={topic.difficulty} />
            <span className="text-xs text-muted-foreground">{topic.estimatedTime}</span>
          </div>
        </div>
        <ProgressRing value={topic.progress} />
      </div>

      <div className="relative grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <p className="text-muted-foreground">Solved</p>
          <p className="text-white font-medium">{topic.questionsSolved} / {topic.questionsTotal}</p>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <p className="text-muted-foreground">Readiness</p>
          <p className="text-white font-medium">+{topic.readinessContribution}</p>
        </div>
      </div>

      <div className="relative mt-1 flex items-center gap-2">
        <Link
          to="/dsa/journey/$topicId"
          params={{ topicId: topic.id }}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)] hover:translate-y-[-1px] transition-transform"
        >
          Start Learning <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={topic.prepVideoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5"
        >
          <Play className="w-3.5 h-3.5" /> Prep
        </a>
      </div>
    </motion.div>
  );
}
