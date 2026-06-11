import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Plus } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { StackSelector } from "@/components/projects/StackSelector";
import { ProgressDisplay } from "@/components/projects/ProgressDisplay";
import { RoadmapSection } from "@/components/projects/RoadmapSection";
import { RoadmapSkeleton } from "@/components/projects/RoadmapSkeleton";
import { ProjectList } from "@/components/projects/ProjectList";
import { AddProjectModal } from "@/components/projects/AddProjectModal";
import { CreditsMarquee } from "@/components/projects/CreditsMarquee";
import { EmptyState } from "@/components/projects/EmptyState";

import {
  useContributors,
  useProjects,
} from "@/hooks/useProjects";
import type { RoadmapTopic, StackId } from "@/types/projects";

export const Route = createFileRoute("/_student/projects")({
  head: () => ({
    meta: [
      { title: "Projects — PrepForge" },
      { name: "description", content: "Pick a stack, follow the roadmap, and ship projects with AI feedback." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [selectedStackId, setSelectedStackId] = useState<StackId | null>("mern");
  const [submitOpen, setSubmitOpen] = useState(false);

  const { stacks, roadmap, progress, suggestions, markTopic, submitProject } =
    useProjects(selectedStackId);
  const contributors = useContributors();

  // Default-select first available stack once list loads.
  useEffect(() => {
    if (!selectedStackId && stacks.data?.[0]) setSelectedStackId(stacks.data[0].id);
  }, [stacks.data, selectedStackId]);

  const selectedStack = useMemo(
    () => stacks.data?.find((s) => s.id === selectedStackId) ?? null,
    [stacks.data, selectedStackId],
  );

  const onToggleComplete = (topic: RoadmapTopic) =>
    markTopic.mutate({ topicId: topic.id, completed: !topic.completed });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PageHeader
          title="Project Journey"
          subtitle="Pick a stack, follow the roadmap, ship projects — get AI mentorship at every step."
        />
        <Button onClick={() => setSubmitOpen(true)}>
          <Plus className="w-4 h-4" /> Submit project
        </Button>
      </div>

      {/* Tech stack selector */}
      <section aria-labelledby="stacks-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="stacks-heading" className="text-sm uppercase tracking-wider text-muted-foreground">
            Choose your stack
          </h2>
          {stacks.isFetching && <span className="text-[10px] text-muted-foreground">Syncing…</span>}
        </div>
        {stacks.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : stacks.isError ? (
          <ErrorBlock onRetry={() => stacks.refetch()} />
        ) : (
          <StackSelector
            stacks={stacks.data ?? []}
            selectedId={selectedStackId}
            onSelect={setSelectedStackId}
          />
        )}
      </section>

      {/* Progress & rank */}
      {progress.data && selectedStack && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <ProgressDisplay progress={progress.data} stackName={selectedStack.name} />
        </motion.div>
      )}

      {/* Roadmap */}
      <section aria-labelledby="roadmap-heading" className="space-y-4">
        <header>
          <h2 id="roadmap-heading" className="text-lg font-semibold text-white">Roadmap</h2>
          <p className="text-sm text-muted-foreground">
            {selectedStack ? `Structured path for ${selectedStack.name}.` : "Select a stack to see the roadmap."}
          </p>
        </header>
        {roadmap.isLoading ? (
          <RoadmapSkeleton />
        ) : roadmap.isError ? (
          <ErrorBlock onRetry={() => roadmap.refetch()} />
        ) : roadmap.data?.stages.length ? (
          <div className="space-y-4">
            {roadmap.data.stages.map((stage, idx) => (
              <RoadmapSection
                key={stage.id}
                stage={stage}
                index={idx}
                onToggleComplete={onToggleComplete}
                pendingTopicId={markTopic.isPending ? markTopic.variables?.topicId : undefined}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No roadmap yet" description="This stack's roadmap is being prepared." />
        )}
      </section>

      {/* Project suggestions */}
      <section aria-labelledby="suggestions-heading" className="space-y-4">
        <header>
          <h2 id="suggestions-heading" className="text-lg font-semibold text-white">Project ideas to build next</h2>
          <p className="text-sm text-muted-foreground">Curated by mentors — start small, ship often.</p>
        </header>
        {suggestions.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : suggestions.data?.length ? (
          <ProjectList projects={suggestions.data} onStart={() => setSubmitOpen(true)} />
        ) : (
          <EmptyState title="No suggestions yet" />
        )}
      </section>

      {/* Credits marquee */}
      <CreditsMarquee contributors={contributors.data ?? []} />

      {/* Submission modal */}
      <AddProjectModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        stacks={stacks.data ?? []}
        defaultStackId={selectedStackId}
        onSubmit={(payload) => submitProject.mutateAsync(payload)}
      />
    </div>
  );
}

function ErrorBlock({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-danger/30 bg-danger/5 p-5 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-danger mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-white">We couldn't load this section.</p>
        <p className="text-xs text-muted-foreground">Check your connection and try again.</p>
      </div>
      <Button size="sm" variant="secondary" onClick={onRetry}>Retry</Button>
    </div>
  );
}
