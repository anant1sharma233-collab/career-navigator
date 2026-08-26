import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, Brain, ClipboardList, Loader2, Sparkles } from "lucide-react";
import { useDsaTopic } from "@/hooks/useDsa";
import { useTopicVerification, useVerificationBlueprint, useSubmitAttempt } from "@/hooks/useVerification";
import { VerificationBadge } from "@/components/verification/VerificationBadge";
import { ConceptCoverageList } from "@/components/verification/ConceptCoverageList";
import { DifficultyBadge } from "@/components/dsa/BadgeCard";
import { LoadingState, ErrorState } from "@/components/dsa/States";

export const Route = createFileRoute("/_student/dsa/verify/$topicId")({
  head: ({ params }) => ({
    meta: [
      { title: `Verify ${params.topicId} — PrepForge` },
      { name: "description", content: "Prove your capability with unseen problems and an adaptive AI viva." },
      { property: "og:title", content: `Verify ${params.topicId} — PrepForge` },
      { property: "og:description", content: "Evidence over claims: verification is earned, never ticked." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifyTopic,
});

type Step = "prep" | "challenge" | "viva" | "result";

function VerifyTopic() {
  const { topicId } = Route.useParams();
  const topic = useDsaTopic(topicId);
  const verification = useTopicVerification(topicId);
  const blueprint = useVerificationBlueprint(topicId, topic.data?.name ?? topicId);
  const submit = useSubmitAttempt(topicId);

  const [step, setStep] = useState<Step>("prep");
  const [solved, setSolved] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const bp = blueprint.data;

  const score = useMemo(() => {
    if (!bp) return 0;
    const challengePct = (Object.values(solved).filter(Boolean).length / Math.max(bp.challenge.length, 1)) * 100;
    const answered = bp.viva.filter((v) => (answers[v.id] ?? "").trim().length >= 30).length;
    const vivaPct = (answered / Math.max(bp.viva.length, 1)) * 100;
    return Math.round(challengePct * 0.6 + vivaPct * 0.4);
  }, [bp, solved, answers]);

  if (topic.isLoading || verification.isLoading || blueprint.isLoading) return <LoadingState rows={4} />;
  if (topic.isError || !bp || !verification.data) return <ErrorState onRetry={() => { topic.refetch(); blueprint.refetch(); }} />;

  const v = submit.data ?? verification.data;

  return (
    <div className="space-y-6">
      <Link to="/dsa/journey/$topicId" params={{ topicId }} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to {bp.topicName}
      </Link>

      <header className="glass rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full blur-3xl bg-gradient-to-br from-primary/40 to-accent/30 opacity-60" />
        <div className="relative flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Verification</p>
            <h1 className="text-2xl font-bold text-white">{bp.topicName}</h1>
          </div>
          <VerificationBadge state={v.state} level={v.level} confidence={v.confidence} />
        </div>
        <div className="relative mt-4 flex items-center gap-2 text-[11px]">
          {(["prep", "challenge", "viva", "result"] as Step[]).map((s, i) => (
            <span
              key={s}
              className={`rounded-full border px-2.5 py-1 capitalize ${
                step === s ? "border-primary/40 bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-muted-foreground"
              }`}
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </header>

      {step === "prep" && (
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary" /> What you'll be evaluated on
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {bp.evaluatedOn.map((e) => (
                <li key={e} className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white/85">{e}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Estimated time: {bp.estimatedMinutes} minutes · {bp.challenge.length} unseen problems + {bp.viva.length} viva questions.
              These are new variants — never the questions you already practised.
            </p>
            <button
              onClick={() => setStep("challenge")}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]"
            >
              Start verification <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <aside className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Current concept coverage</h3>
            <div className="mt-3"><ConceptCoverageList concepts={v.concepts} /></div>
          </aside>
        </section>
      )}

      {step === "challenge" && (
        <section className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Unseen challenge
          </h2>
          <ul className="space-y-3">
            {bp.challenge.map((q) => (
              <li key={q.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{q.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{q.prompt}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {q.concepts.map((c) => (
                        <span key={c} className="rounded-full bg-primary/10 border border-primary/25 px-2 py-0.5 text-[10px] text-primary">{c}</span>
                      ))}
                    </div>
                  </div>
                  <DifficultyBadge value={q.difficulty} />
                </div>
                <label className="mt-3 inline-flex items-center gap-2 text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={!!solved[q.id]}
                    onChange={(e) => setSolved((s) => ({ ...s, [q.id]: e.target.checked }))}
                    className="accent-[hsl(263,70%,60%)]"
                  />
                  I solved this and my solution passes all cases
                </label>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <button onClick={() => setStep("prep")} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-muted-foreground hover:text-white">Back</button>
            <button
              onClick={() => setStep("viva")}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white"
            >
              Continue to AI viva <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {step === "viva" && (
        <section className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> AI viva — explain your reasoning
          </h2>
          <ul className="space-y-4">
            {bp.viva.map((q) => (
              <li key={q.id}>
                <p className="text-sm text-white">{q.question}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{q.intent}</p>
                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  rows={3}
                  placeholder="Answer in your own words (min ~30 characters)…"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <button onClick={() => setStep("challenge")} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-muted-foreground hover:text-white">Back</button>
            <button
              disabled={submit.isPending}
              onClick={async () => {
                await submit.mutateAsync({ score });
                setStep("result");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {submit.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <BadgeCheck className="w-4 h-4" />} Submit for evaluation
            </button>
          </div>
        </section>
      )}

      {step === "result" && (
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-white">Verification result</h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-white">{v.confidence}%</span>
              <VerificationBadge state={v.state} level={v.level} confidence={v.confidence} />
            </div>
            <p className="text-xs text-muted-foreground">
              {v.state === "verified"
                ? "You demonstrated capability on unseen problems and explained your reasoning. This is now part of your verified profile."
                : v.state === "partially_verified"
                  ? "Some concepts still need review. Strengthen the weak areas below and re-attempt to reach full verification."
                  : "Not cleared yet. Review the weak concepts and try again — attempts are never deleted, only added."}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link to="/dsa/journey/$topicId" params={{ topicId }} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5">
                Back to topic
              </Link>
              <button onClick={() => setStep("prep")} className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white">
                Re-attempt
              </button>
            </div>
          </div>
          <aside className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white">Updated concept coverage</h3>
            <div className="mt-3"><ConceptCoverageList concepts={v.concepts} /></div>
          </aside>
        </section>
      )}
    </div>
  );
}
