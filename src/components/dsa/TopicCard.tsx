import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { QuestionItem } from "./QuestionItem";
import type { DSATopic, DSAQuestion } from "@/features/services/dsaApi";

interface Props {
  topic: DSATopic;
  onToggleRevision: (q: DSAQuestion) => void;
  defaultOpen?: boolean;
}

export const TopicCard = memo(function TopicCard({ topic, onToggleRevision, defaultOpen }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const solved = topic.questions.filter((q) => q.isMarkedForRevision).length;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-semibold">
            {topic.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{topic.name}</div>
            <div className="text-xs text-muted-foreground">{topic.questions.length} questions · {solved} marked</div>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {topic.questions.map((q) => (
                <QuestionItem key={q.id} question={q} onToggleRevision={onToggleRevision} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
