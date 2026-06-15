/**
 * useDsa — React Query hooks for the DSA Command Center.
 * Components must consume these hooks (or accept props); never call dsaService directly.
 */
import { useQuery } from "@tanstack/react-query";
import { dsaService } from "@/services/dsaService";

const STALE = 60_000;

export const useDsaSummary = () => useQuery({ queryKey: ["dsa", "summary"], queryFn: dsaService.getSummary, staleTime: STALE });
export const useDsaTopics = () => useQuery({ queryKey: ["dsa", "topics"], queryFn: dsaService.getTopics, staleTime: STALE });
export const useDsaTopic = (id: string) => useQuery({ queryKey: ["dsa", "topic", id], queryFn: () => dsaService.getTopic(id), staleTime: STALE });
export const useDsaPackages = () => useQuery({ queryKey: ["dsa", "packages"], queryFn: dsaService.getPackages, staleTime: STALE });
export const useDsaPackage = (id: string) => useQuery({ queryKey: ["dsa", "package", id], queryFn: () => dsaService.getPackage(id), staleTime: STALE });
export const useDsaCompanies = () => useQuery({ queryKey: ["dsa", "companies"], queryFn: dsaService.getCompanies, staleTime: STALE });
export const useDsaCompany = (id: string) => useQuery({ queryKey: ["dsa", "company", id], queryFn: () => dsaService.getCompany(id), staleTime: STALE });
export const useDsaRecommendations = () => useQuery({ queryKey: ["dsa", "recs"], queryFn: dsaService.getRecommendations, staleTime: STALE });
export const useDsaSidebar = () => useQuery({ queryKey: ["dsa", "sidebar"], queryFn: dsaService.getSidebar, staleTime: STALE });
