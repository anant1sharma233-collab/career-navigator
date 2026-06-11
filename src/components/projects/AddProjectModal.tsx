import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, AlertCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProjectFeedback, ProjectSubmission, StackId, TechStack } from "@/types/projects";

const schema = z.object({
  projectName: z.string().trim().min(2, "Project name is required").max(80),
  repoUrl: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .refine((u) => /github\.com\/.+\/.+/i.test(u), "Must be a GitHub repo URL"),
  stackId: z.string().min(1, "Pick a stack"),
  completion: z.number().min(0).max(100),
});

interface Props {
  open: boolean;
  onClose: () => void;
  stacks: TechStack[];
  defaultStackId: StackId | null;
  onSubmit: (payload: ProjectSubmission) => Promise<ProjectFeedback>;
}

export function AddProjectModal({ open, onClose, stacks, defaultStackId, onSubmit }: Props) {
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [stackId, setStackId] = useState<StackId | "">(defaultStackId ?? "");
  const [completion, setCompletion] = useState(80);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ProjectFeedback | null>(null);

  const reset = () => {
    setProjectName(""); setRepoUrl(""); setStackId(defaultStackId ?? "");
    setCompletion(80); setErrors({}); setServerError(null); setFeedback(null);
  };

  const handleClose = () => { reset(); onClose(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse({ projectName, repoUrl, stackId, completion });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fb = await onSubmit(parsed.data as ProjectSubmission);
      setFeedback(fb);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c0f1d]/95 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-white" aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            {!feedback ? (
              <>
                <h3 className="text-lg font-semibold text-white">Submit your project</h3>
                <p className="text-xs text-muted-foreground">Get instant AI feedback and a score.</p>

                <form onSubmit={submit} className="mt-5 space-y-4">
                  <Input
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    error={errors.projectName}
                  />
                  <Input
                    placeholder="https://github.com/you/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    leftIcon={<Github className="w-4 h-4" />}
                    error={errors.repoUrl}
                  />
                  <div>
                    <label className="text-xs text-muted-foreground">Stack</label>
                    <select
                      value={stackId}
                      onChange={(e) => setStackId(e.target.value as StackId)}
                      className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      <option value="" className="bg-[#0c0f1d]">Choose a stack…</option>
                      {stacks.map((s) => (
                        <option key={s.id} value={s.id} className="bg-[#0c0f1d]">{s.name}</option>
                      ))}
                    </select>
                    {errors.stackId && <p className="mt-1 text-xs text-danger">{errors.stackId}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground flex justify-between">
                      <span>Completion</span><span className="text-white">{completion}%</span>
                    </label>
                    <input
                      type="range" min={0} max={100} value={completion}
                      onChange={(e) => setCompletion(Number(e.target.value))}
                      className="mt-2 w-full accent-[#7c3aed]"
                    />
                  </div>

                  {serverError && (
                    <div className="flex items-start gap-2 text-xs text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
                      <AlertCircle className="w-4 h-4 mt-0.5" /> {serverError}
                    </div>
                  )}

                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" loading={submitting}>
                      {submitting ? <>Analyzing<Loader2 className="w-4 h-4 animate-spin" /></> : "Submit for review"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <ProjectFeedbackInline feedback={feedback} onClose={handleClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectFeedbackInline({ feedback, onClose }: { feedback: ProjectFeedback; onClose: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">AI Review</p>
          <h3 className="text-lg font-semibold text-white">{feedback.projectName}</h3>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold gradient-text">{feedback.score}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span>Stack: {feedback.stackId.toUpperCase()}</span>
        <span>· Completion: {feedback.completion}%</span>
        <a href={feedback.repoUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">· Repo</a>
      </div>
      <p className="mt-4 text-sm text-white/85 leading-relaxed">{feedback.feedback}</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FbList title="Strengths" items={feedback.strengths} tone="emerald" />
        <FbList title="Improve" items={feedback.improvements} tone="amber" />
      </div>

      <div className="mt-5 flex justify-between gap-2 flex-wrap">
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button>Save score to dashboard</Button>
      </div>
    </div>
  );
}

function FbList({ title, items, tone }: { title: string; items: string[]; tone: "emerald" | "amber" }) {
  const c = tone === "emerald" ? "text-emerald-300 border-emerald-500/20 bg-emerald-500/5" : "text-amber-300 border-amber-500/20 bg-amber-500/5";
  return (
    <div className={`rounded-xl border ${c} px-3 py-2`}>
      <div className="text-[10px] uppercase tracking-wider">{title}</div>
      <ul className="mt-1 space-y-1 text-xs text-white/85 list-disc pl-4">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
