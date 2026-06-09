/**
 * Domain types specific to the Student portal.
 */
export interface DSAProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  solved: boolean;
}

export interface ProjectIdea {
  id: string;
  title: string;
  stack: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  progress: number;
}

export interface Subject {
  id: string;
  name: string;
  semester: number;
  progress: number;
  topics: number;
  completedTopics: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  readiness: number;
  streakDays: number;
  college?: string;
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Part-time";
  salary?: string;
  postedAt: string;
  matchScore?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  college?: string;
  branch?: string;
  graduationYear?: number;
  bio?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}
