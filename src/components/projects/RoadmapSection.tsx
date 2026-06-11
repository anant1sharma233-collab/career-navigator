import { motion } from "framer-motion";
import { TopicCard } from "./TopicCard";
import type { RoadmapStage, RoadmapTopic } from "@/types/projects";

interface Props {
  stage: RoadmapStage;
  index: number;
  onToggleComplete: (topic: RoadmapTopic) => void;
  pendingTopicId?: string;
}

export function RoadmapSection({ stage, index, onToggleComplete, pendingTopicId }: Props) {
  const completed = stage.topics.filter((t) => t.completed).length;
  const total = stage.topics.length;
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative rounded-2xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl"
    >
      <header className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
          <p className="text-sm text-muted-foreground">{stage.summary}</p>
        </div>
        <span className="text-xs text-muted-foreground">{completed} / {total} done</span>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {stage.topics.map((t) => (
          <TopicCard
            key={t.id}
            topic={t}
            onToggleComplete={onToggleComplete}
            pending={pendingTopicId === t.id}
          />
        ))}
      </div>
    </motion.section>
  );
}
