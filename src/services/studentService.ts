import type { DashboardData } from "@/types";

/**
 * Student data service.
 * Until the ASP.NET backend is wired, returns deterministic mock data so the
 * UI is fully exercisable in dev. Swap `MOCK` for live `apiClient` calls
 * when integrating.
 */

const MOCK: DashboardData = {
  user: {
    id: "u_1",
    name: "Anant",
    email: "anant@prepforge.dev",
    role: "Student",
  },
  stats: {
    readiness: 78,
    rank: 124,
    totalStudents: 4213,
    streakDays: 12,
    daysToReady: 42,
  },
  journeys: [
    {
      id: "j_dsa",
      type: "dsa",
      title: "DSA Journey",
      icon: "💻",
      progress: 200,
      total: 600,
      nextLabel: "Next",
      nextItem: "Graph — DFS",
      accent: "primary",
    },
    {
      id: "j_proj",
      type: "projects",
      title: "Project Journey",
      icon: "🚀",
      progress: 4,
      total: 20,
      nextLabel: "Next",
      nextItem: "MERN Stack App",
      accent: "secondary",
    },
    {
      id: "j_sub",
      type: "subjects",
      title: "Subject Journey",
      icon: "📚",
      progress: 3,
      total: 8,
      nextLabel: "Next",
      nextItem: "DBMS — Semester 3",
      accent: "accent",
    },
  ],
  missions: [
    { id: "m1", title: "Solve 2 Graph Questions", category: "DSA", completed: true },
    { id: "m2", title: "Finish DBMS Notes", category: "Subject", completed: true },
    { id: "m3", title: "Work 30 Minutes on MERN Project", category: "Project", completed: false },
    { id: "m4", title: "Watch 2 System Design Videos", category: "Subject", completed: false },
  ],
  roadmap: [
    { id: "r1", label: "Semester 1", status: "completed" },
    { id: "r2", label: "Semester 2", status: "completed" },
    { id: "r3", label: "Arrays", status: "completed" },
    { id: "r4", label: "Strings", status: "completed" },
    { id: "r5", label: "Linked List", status: "completed" },
    { id: "r6", label: "Trees", status: "completed" },
    { id: "r7", label: "Graphs", status: "current", icon: "🔥" },
    { id: "r8", label: "First Project", status: "locked" },
    { id: "r9", label: "Portfolio", status: "locked" },
    { id: "r10", label: "Interview Ready", status: "locked" },
    { id: "r11", label: "Recruiter Ready", status: "locked" },
  ],
};

export const studentService = {
  async getDashboard(): Promise<DashboardData> {
    // Simulate latency for skeleton states
    await new Promise((r) => setTimeout(r, 300));
    return MOCK;
  },
};
