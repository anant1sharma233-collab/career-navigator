/**
 * Projects domain types.
 * These are stable DTOs returned by services/projectService — the UI consumes
 * these shapes, so swapping the backend only requires re-mapping inside the
 * service layer.
 */

export type StackId = "aspnet" | "mern" | "llm" | "ml" | "ai";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface TechStack {
  id: StackId;
  name: string;
  shortDescription: string;
  difficulty: Difficulty;
  estimatedDuration: string;
  progress: number; // 0-100
  accent: string;  // tailwind gradient classes
  icon: string;    // emoji or short symbol
}

export interface RoadmapTopic {
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
  videoLink?: string;
  notesLink?: string;
  comingSoon?: boolean;
  completed?: boolean;
}

export interface RoadmapStage {
  id: string;
  title: string;
  summary: string;
  topics: RoadmapTopic[];
  projectSuggestions?: string[]; // project IDs surfaced after this stage
}

export interface Roadmap {
  stackId: StackId;
  stages: RoadmapStage[];
}

export interface ProjectSuggestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  skills: string[];
  estimatedTime: string;
  recommendedAfter: string;
  description: string;
}

export interface ProjectProgress {
  stackId: StackId;
  rank: number;
  rankLabel: string;
  overallProgress: number;
  topicsCompleted: number;
  topicsTotal: number;
  streakDays: number;
  nextTopic: string;
}

export interface ProjectSubmission {
  projectName: string;
  stackId: StackId;
  repoUrl: string;
  completion: number;
}

export interface ProjectFeedback {
  id: string;
  projectName: string;
  stackId: StackId;
  completion: number;
  repoUrl: string;
  score: number;            // 0-100
  feedback: string;         // mentor-tone summary
  strengths: string[];
  improvements: string[];
  nextProject?: string;
}

export interface Contributor {
  name: string;
  title: string;
  avatar?: string;
}
