/**
 * Core domain types for PrepForge frontend.
 * Backend (ASP.NET) is the source of truth; these mirror the API contract.
 */

export type UserRole = "Student" | "College" | "Recruiter" | "Admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
}

export interface Journey {
  id: string;
  type: "dsa" | "projects" | "subjects";
  title: string;
  icon: string;
  progress: number;
  total: number;
  nextLabel: string;
  nextItem: string;
  accent: "primary" | "secondary" | "accent";
}

export interface Mission {
  id: string;
  title: string;
  category: "DSA" | "Subject" | "Project";
  completed: boolean;
}

export type RoadmapStatus = "completed" | "current" | "locked";

export interface RoadmapNode {
  id: string;
  label: string;
  status: RoadmapStatus;
  icon?: string;
}

export interface DashboardStats {
  readiness: number;
  rank: number;
  totalStudents: number;
  streakDays: number;
  daysToReady: number;
}

export interface DashboardData {
  user: User;
  stats: DashboardStats;
  journeys: Journey[];
  missions: Mission[];
  roadmap: RoadmapNode[];
}

export interface ApiError {
  error: string;
  code: number;
}
