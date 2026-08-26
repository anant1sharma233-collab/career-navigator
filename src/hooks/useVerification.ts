/**
 * useVerification — React Query hooks for verified capability.
 * Learning progress and verification are always kept separate.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { verificationService } from "@/services/verificationService";
import type { TopicVerification } from "@/types/verification";

const STALE = 60_000;

export const useVerificationSummary = () =>
  useQuery({ queryKey: ["verification", "summary"], queryFn: () => verificationService.getSummary(), staleTime: STALE });

export const useAllVerifications = () =>
  useQuery({ queryKey: ["verification", "all"], queryFn: () => verificationService.getAll(), staleTime: STALE });

export const useTopicVerification = (topicId: string) =>
  useQuery({
    queryKey: ["verification", "topic", topicId],
    queryFn: () => verificationService.getTopic(topicId),
    staleTime: STALE,
  });

export const useVerificationBlueprint = (topicId: string, topicName: string) =>
  useQuery({
    queryKey: ["verification", "blueprint", topicId],
    queryFn: () => verificationService.getBlueprint(topicId, topicName),
    staleTime: STALE,
    enabled: !!topicId,
  });

export function useSubmitAttempt(topicId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ score, level }: { score: number; level?: TopicVerification["level"] }) =>
      verificationService.submitAttempt(topicId, score, level ?? "AI Verified"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["verification"] });
    },
  });
}
