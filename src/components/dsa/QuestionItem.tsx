import { memo } from "react";
import { ExternalLink, FileText, Youtube, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import type { DSAQuestion, Difficulty } from "@/features/services/dsaApi";

interface Props {
  question: DSAQuestion;
  onToggleRevision: (q: DSAQuestion) => void;
}

const diffStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Hard: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export const QuestionItem = memo(function QuestionItem({ question, onToggleRevision }: Props) {
  const marked = question.isMarkedForRevision;
  return (
    <div
      className={cn(
        "group flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
        marked
          ? "border-yellow-400/40 bg-yellow-400/[0.06] shadow-[0_0_30px_-12px_rgba(255,215,0,0.5)]"
          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]",
      )}
    >
      <span className="flex-1 text-sm font-medium text-white">{question.title}</span>

      <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", diffStyles[question.difficulty])}>
        {question.difficulty}
      </span>

      <div className="flex items-center gap-1">
        <IconLink href={question.leetcodeLink} icon={<ExternalLink className="w-3.5 h-3.5" />} label="LeetCode" />
        <IconLink href={question.notesLink} icon={<FileText className="w-3.5 h-3.5" />} label="Notes" />
        <IconLink href={question.videoLink} icon={<Youtube className="w-3.5 h-3.5" />} label="Video" />

        <button
          onClick={() => onToggleRevision(question)}
          aria-pressed={marked}
          aria-label={marked ? "Unmark for revision" : "Mark for revision"}
          className={cn(
            "ml-1 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
            marked
              ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-200 hover:bg-yellow-400/30"
              : "border-white/10 text-muted-foreground hover:text-white hover:bg-white/5",
          )}
        >
          <Check className="w-3.5 h-3.5" />
          {marked ? "Marked" : "Revise"}
        </button>
      </div>
    </div>
  );
});

function IconLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
    >
      {icon}
    </a>
  );
}
