import { useMemo } from "react";
import { TopicCard } from "./TopicCard";
import type { DSAData, DSAQuestion } from "@/features/services/dsaApi";

interface Props {
  data: DSAData;
  search: string;
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  onToggleRevision: (q: DSAQuestion) => void;
}

const STAGES = [
  { key: "BASICS", label: "Basics" },
  { key: "BASIC_TO_ADVANCE", label: "Basic → Advance" },
  { key: "ADVANCED", label: "Advanced" },
] as const;

export function DSASheet({ data, search, difficulty, onToggleRevision }: Props) {
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return data.topics
      .map((t) => ({
        ...t,
        questions: t.questions.filter(
          (q) =>
            (difficulty === "All" || q.difficulty === difficulty) &&
            (!s || q.title.toLowerCase().includes(s) || t.name.toLowerCase().includes(s)),
        ),
      }))
      .filter((t) => t.questions.length > 0);
  }, [data.topics, search, difficulty]);

  const revisionQs = useMemo(
    () => data.topics.flatMap((t) => t.questions.filter((q) => q.isMarkedForRevision)),
    [data.topics],
  );

  return (
    <div className="space-y-10">
      {revisionQs.length > 0 && (
        <section>
          <SectionHeader label="For Revision" count={revisionQs.length} accent="from-yellow-400 to-amber-500" />
          <div className="glass rounded-2xl p-4 space-y-2">
            {revisionQs.map((q) => (
              <button
                key={q.id}
                onClick={() => onToggleRevision(q)}
                className="w-full text-left rounded-xl border border-yellow-400/30 bg-yellow-400/[0.06] px-4 py-2.5 text-sm text-white hover:bg-yellow-400/10 transition-colors"
              >
                {q.title} <span className="ml-2 text-xs text-yellow-300/80">{q.difficulty}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {STAGES.map((stage) => {
        const topics = filtered.filter((t) => t.stage === stage.key);
        if (topics.length === 0) return null;
        return (
          <section key={stage.key}>
            <SectionHeader label={stage.label} count={topics.reduce((n, t) => n + t.questions.length, 0)} />
            <div className="grid gap-3">
              {topics.map((t) => (
                <TopicCard key={t.id} topic={t} onToggleRevision={onToggleRevision} />
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No questions match your filters.
        </div>
      )}
    </div>
  );
}

function SectionHeader({ label, count, accent }: { label: string; count: number; accent?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className={accent ? `bg-gradient-to-r ${accent} bg-clip-text text-transparent` : "text-white/70"}>
          {label}
        </span>
      </h2>
      <span className="text-xs text-muted-foreground">{count} questions</span>
    </div>
  );
}
