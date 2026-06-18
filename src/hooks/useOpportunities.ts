/**
 * useOpportunities — React Query hooks for the Opportunities (Career Hub) page.
 * Components consume these hooks (or accept props) and never call the service directly.
 */
import { useQuery } from "@tanstack/react-query";
import { opportunitiesService } from "@/services/opportunitiesService";

const STALE = 60_000;

export const useOppSummary = () =>
  useQuery({ queryKey: ["opp", "summary"], queryFn: opportunitiesService.getSummary, staleTime: STALE });
export const useOppRecommendations = () =>
  useQuery({ queryKey: ["opp", "recs"], queryFn: opportunitiesService.getRecommendations, staleTime: STALE });
export const useOppEligible = () =>
  useQuery({ queryKey: ["opp", "eligible"], queryFn: opportunitiesService.getEligible, staleTime: STALE });
export const useOppAlmost = () =>
  useQuery({ queryKey: ["opp", "almost"], queryFn: opportunitiesService.getAlmostEligible, staleTime: STALE });
export const useOppDreamCompanies = () =>
  useQuery({ queryKey: ["opp", "dream"], queryFn: opportunitiesService.getDreamCompanies, staleTime: STALE });
export const useOppInternships = () =>
  useQuery({ queryKey: ["opp", "internships"], queryFn: opportunitiesService.getInternships, staleTime: STALE });
export const useOppHackathons = () =>
  useQuery({ queryKey: ["opp", "hackathons"], queryFn: opportunitiesService.getHackathons, staleTime: STALE });
export const useOppContests = () =>
  useQuery({ queryKey: ["opp", "contests"], queryFn: opportunitiesService.getContests, staleTime: STALE });
export const useOppScholarships = () =>
  useQuery({ queryKey: ["opp", "scholarships"], queryFn: opportunitiesService.getScholarships, staleTime: STALE });
export const useOppDrives = () =>
  useQuery({ queryKey: ["opp", "drives"], queryFn: opportunitiesService.getPlacementDrives, staleTime: STALE });
export const useOppInsight = () =>
  useQuery({ queryKey: ["opp", "insight"], queryFn: opportunitiesService.getInsight, staleTime: STALE });
