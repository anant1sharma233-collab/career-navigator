/**
 * useProjects — the only React entrypoint the UI uses for project data.
 *
 * Wraps every projectService call with TanStack Query. UI components never
 * import projectService directly; they call these hooks. Backend swaps stay
 * confined to services/projectService.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/projectService";
import type { ProjectSubmission, StackId } from "@/types/projects";

const keys = {
  stacks: ["projects", "stacks"] as const,
  roadmap: (id: StackId) => ["projects", "roadmap", id] as const,
  topics: (id: StackId) => ["projects", "topics", id] as const,
  progress: (id: StackId) => ["projects", "progress", id] as const,
  suggestions: ["projects", "suggestions"] as const,
  contributors: ["projects", "contributors"] as const,
};

export function useStacks() {
  return useQuery({ queryKey: keys.stacks, queryFn: () => projectService.getStacks() });
}

export function useRoadmap(stackId: StackId | null) {
  return useQuery({
    queryKey: stackId ? keys.roadmap(stackId) : ["projects", "roadmap", "none"],
    queryFn: () => projectService.getRoadmap(stackId as StackId),
    enabled: !!stackId,
  });
}

export function useProgress(stackId: StackId | null) {
  return useQuery({
    queryKey: stackId ? keys.progress(stackId) : ["projects", "progress", "none"],
    queryFn: () => projectService.getProgress(stackId as StackId),
    enabled: !!stackId,
  });
}

export function useProjectSuggestions() {
  return useQuery({ queryKey: keys.suggestions, queryFn: () => projectService.getProjectSuggestions() });
}

export function useContributors() {
  return useQuery({ queryKey: keys.contributors, queryFn: () => projectService.getContributors() });
}

export function useMarkTopicComplete(stackId: StackId | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, completed }: { topicId: string; completed: boolean }) =>
      projectService.markTopicComplete(topicId, completed),
    onSuccess: () => {
      if (stackId) {
        qc.invalidateQueries({ queryKey: keys.roadmap(stackId) });
        qc.invalidateQueries({ queryKey: keys.progress(stackId) });
      }
    },
  });
}

export function useSubmitProject() {
  return useMutation({
    mutationFn: (payload: ProjectSubmission) => projectService.submitProject(payload),
  });
}

/** Convenience aggregate for pages that want everything in one call. */
export function useProjects(stackId: StackId | null) {
  const stacks = useStacks();
  const roadmap = useRoadmap(stackId);
  const progress = useProgress(stackId);
  const suggestions = useProjectSuggestions();
  const markTopic = useMarkTopicComplete(stackId);
  const submitProject = useSubmitProject();

  return {
    stacks,
    roadmap,
    progress,
    suggestions,
    markTopic,
    submitProject,
    isLoading: stacks.isLoading || roadmap.isLoading || progress.isLoading,
    isError: stacks.isError || roadmap.isError || progress.isError,
  };
}
