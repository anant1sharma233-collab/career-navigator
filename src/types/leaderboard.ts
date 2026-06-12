/**
 * Leaderboard domain types — stable DTOs that the UI consumes.
 * Backend swaps only require re-mapping inside leaderboardService.
 */

export type LeaderboardScope = "overall" | "college" | "department" | "friends" | "offcampus";

export interface ScoringFormula {
  /** Each weight is 0-1; UI renders these in the breakdown tooltip. */
  dsa: number;
  projects: number;
  subjects: number;
  consistency: number;
}

export interface CurrentUser {
  userId: string;
  name: string;
  avatar?: string;
  collegeId: string | null;
  collegeName?: string;
  departmentId: string | null;
  departmentName?: string;
  hasCollege: boolean; // derived backend flag
}

export interface RankSummary {
  rank: number;
  totalScore: number;
  readinessScore: number;
  collegeRank?: number;
  departmentRank?: number;
  streakDays: number;
  weeklyRankChange: number; // positive = climbed
  topPercentile: number;    // e.g. 8 = top 8%
}

export interface LeaderboardBadge {
  id: string;
  label: string;
  tone?: "primary" | "success" | "warning" | "accent";
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  rankChange: number;       // +up / -down
  name: string;
  avatar?: string;
  collegeName?: string;
  departmentName?: string;
  readinessScore: number;
  dsaProgress: number;      // 0-100
  projectsBuilt: number;
  streakDays: number;
  totalScore: number;
  badges: LeaderboardBadge[];
  collegeRank?: number;
  departmentRank?: number;
}

export interface PodiumEntry extends LeaderboardEntry {
  highlight?: "gold" | "silver" | "bronze";
}

export interface AchievementBadge {
  id: string;
  label: string;
  description: string;
  earned: boolean;
  progress?: number;       // 0-100 toward unlock
  unlockCriteria: string;
}

export interface RankInsight {
  id: string;
  message: string;
  impact: string;          // e.g. "+200 pts", "→ #120"
  actionLabel?: string;
  actionHref?: string;
}

export interface RecruiterVisibility {
  visibilityPercent: number;
  profileCompleteness: number;
  dsaStrength: number;
  projectStrength: number;
  subjectStrength: number;
  hiringReadiness: "Excellent" | "Strong" | "Developing";
}

export interface ComparisonMetric {
  label: string;
  you: number;
  them: number;
  max?: number;
  unit?: string;
}

export interface ComparisonResult {
  you: { userId: string; name: string; avatar?: string };
  them: { userId: string; name: string; avatar?: string };
  metrics: ComparisonMetric[];
  themProfileHref: string;
}
