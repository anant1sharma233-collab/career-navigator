/**
 * useLeaderboard — TanStack Query hooks. UI components MUST go through here
 * (never import leaderboardService directly).
 */
import { useQuery } from "@tanstack/react-query";
import { leaderboardService } from "@/services/leaderboardService";
import type { LeaderboardScope } from "@/types/leaderboard";

const keys = {
  user: ["leaderboard", "user"] as const,
  formula: ["leaderboard", "formula"] as const,
  summary: ["leaderboard", "summary"] as const,
  podium: (s: LeaderboardScope) => ["leaderboard", "podium", s] as const,
  board: (s: LeaderboardScope) => ["leaderboard", "board", s] as const,
  achievements: ["leaderboard", "achievements"] as const,
  insights: ["leaderboard", "insights"] as const,
  recruiter: ["leaderboard", "recruiter"] as const,
  compare: (id: string) => ["leaderboard", "compare", id] as const,
};

export const useCurrentUser = () =>
  useQuery({ queryKey: keys.user, queryFn: () => leaderboardService.getCurrentUser() });

export const useScoringFormula = () =>
  useQuery({ queryKey: keys.formula, queryFn: () => leaderboardService.getScoringFormula() });

export const useRankSummary = () =>
  useQuery({ queryKey: keys.summary, queryFn: () => leaderboardService.getRankSummary() });

export const usePodium = (scope: LeaderboardScope) =>
  useQuery({ queryKey: keys.podium(scope), queryFn: () => leaderboardService.getPodium(scope) });

export const useLeaderboardBoard = (scope: LeaderboardScope) =>
  useQuery({ queryKey: keys.board(scope), queryFn: () => leaderboardService.getLeaderboard(scope) });

export const useAchievements = () =>
  useQuery({ queryKey: keys.achievements, queryFn: () => leaderboardService.getAchievements() });

export const useRankInsights = () =>
  useQuery({ queryKey: keys.insights, queryFn: () => leaderboardService.getRankInsights() });

export const useRecruiterVisibility = () =>
  useQuery({ queryKey: keys.recruiter, queryFn: () => leaderboardService.getRecruiterVisibility() });

export const useComparison = (otherUserId: string | null) =>
  useQuery({
    queryKey: otherUserId ? keys.compare(otherUserId) : ["leaderboard", "compare", "none"],
    queryFn: () => leaderboardService.compareWith(otherUserId as string),
    enabled: !!otherUserId,
  });
