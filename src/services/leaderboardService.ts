/**
 * leaderboardService — the only place UI code talks to the leaderboard backend.
 *
 * Swap `USE_MOCK = false` and wire each method to the real endpoint when the
 * backend ships. Method signatures and return shapes (see types/leaderboard.ts)
 * are the public contract — keep them stable.
 */
import type {
  AchievementBadge,
  ComparisonResult,
  CurrentUser,
  LeaderboardEntry,
  LeaderboardScope,
  PodiumEntry,
  RankInsight,
  RankSummary,
  RecruiterVisibility,
  ScoringFormula,
} from "@/types/leaderboard";

const USE_MOCK = true;

// ---------- mock data ----------
const MOCK_USER: CurrentUser = {
  userId: "u_me",
  name: "Anant Sharma",
  collegeId: "iitb",
  collegeName: "IIT Bombay",
  departmentId: "cse",
  departmentName: "Computer Science",
  hasCollege: true,
};

const MOCK_FORMULA: ScoringFormula = { dsa: 0.4, projects: 0.25, subjects: 0.2, consistency: 0.15 };

const MOCK_SUMMARY: RankSummary = {
  rank: 142,
  totalScore: 7820,
  readinessScore: 78,
  collegeRank: 12,
  departmentRank: 4,
  streakDays: 23,
  weeklyRankChange: 18,
  topPercentile: 8,
};

const NAMES = [
  "Aarav Mehta", "Priya Nair", "Rohan Iyer", "Ishita Sen", "Karan Patel",
  "Diya Kapoor", "Vihaan Rao", "Ananya Joshi", "Arjun Reddy", "Saanvi Gupta",
  "Devansh Singh", "Meera Pillai", "Yash Verma", "Tara Bose", "Kabir Khanna",
  "Anant Sharma", "Ria Malhotra", "Aditya Bhatt", "Naina Sethi", "Veer Chauhan",
];

const COLLEGES = ["IIT Bombay", "BITS Pilani", "NIT Trichy", "IIIT Hyderabad", "DTU Delhi", "VIT Vellore"];
const DEPARTMENTS = ["Computer Science", "Information Tech", "Electronics", "Mechanical", "Data Science"];

const BADGE_POOL = [
  { id: "dsa_warrior", label: "DSA Warrior", tone: "primary" as const },
  { id: "project_builder", label: "Project Builder", tone: "accent" as const },
  { id: "streak", label: "30-Day Streak", tone: "warning" as const },
  { id: "top10", label: "Top 10%", tone: "success" as const },
];

function makeEntry(i: number, scope: LeaderboardScope): LeaderboardEntry {
  const seed = (i * 7919) % NAMES.length;
  const isOff = scope === "offcampus";
  return {
    userId: `u_${scope}_${i}`,
    rank: i + 1,
    rankChange: ((i * 13) % 11) - 5,
    name: NAMES[seed],
    collegeName: isOff ? undefined : COLLEGES[(i + seed) % COLLEGES.length],
    departmentName: isOff ? undefined : DEPARTMENTS[(i + seed) % DEPARTMENTS.length],
    readinessScore: Math.max(40, 98 - i * 0.6 - (seed % 5)),
    dsaProgress: Math.max(20, 95 - i * 0.7 - (seed % 7)),
    projectsBuilt: Math.max(0, 18 - Math.floor(i / 3) + (seed % 4)),
    streakDays: Math.max(0, 60 - i + (seed % 9)),
    totalScore: Math.max(1000, 9800 - i * 35 - (seed % 50)),
    badges: BADGE_POOL.filter((_, bi) => (i + bi) % 3 === 0).slice(0, 2),
    collegeRank: isOff ? undefined : 1 + ((i + seed) % 40),
    departmentRank: isOff ? undefined : 1 + ((i + seed) % 15),
  };
}

function mockBoard(scope: LeaderboardScope, n = 24): LeaderboardEntry[] {
  return Array.from({ length: n }, (_, i) => makeEntry(i, scope));
}

const MOCK_ACHIEVEMENTS: AchievementBadge[] = [
  { id: "dsa_warrior", label: "DSA Warrior", description: "Solve 200+ DSA problems.", earned: true, unlockCriteria: "Solve 200 problems" },
  { id: "project_builder", label: "Project Builder", description: "Ship 5 production-grade projects.", earned: true, unlockCriteria: "Ship 5 projects" },
  { id: "consistency_king", label: "Consistency King", description: "Maintain a 60-day streak.", earned: false, progress: 38, unlockCriteria: "60-day streak" },
  { id: "top_performer", label: "Top Performer", description: "Reach top 5% on platform.", earned: false, progress: 62, unlockCriteria: "Top 5% rank" },
  { id: "interview_ready", label: "Interview Ready", description: "Score 85+ readiness.", earned: false, progress: 92, unlockCriteria: "Readiness ≥ 85" },
  { id: "streak_30", label: "30-Day Streak", description: "30 consecutive active days.", earned: true, unlockCriteria: "30-day streak" },
  { id: "top10", label: "Top 10%", description: "Reach top 10% on platform.", earned: true, unlockCriteria: "Top 10% rank" },
];

const MOCK_INSIGHTS: RankInsight[] = [
  { id: "i1", message: "Solve 5 more Graph problems", impact: "→ #120", actionLabel: "Open DSA", actionHref: "/dsa" },
  { id: "i2", message: "Complete 1 project", impact: "+200 pts", actionLabel: "Browse projects", actionHref: "/projects" },
  { id: "i3", message: "Maintain streak for 3 more days", impact: "Unlock Consistency King", actionLabel: "View plan" },
  { id: "i4", message: "Improve OS subject mastery", impact: "+5% readiness", actionLabel: "Open subjects", actionHref: "/subjects" },
];

const MOCK_RECRUITER: RecruiterVisibility = {
  visibilityPercent: 72,
  profileCompleteness: 86,
  dsaStrength: 78,
  projectStrength: 64,
  subjectStrength: 70,
  hiringReadiness: "Strong",
};

// ---------- helpers ----------
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

// ---------- service ----------
export const leaderboardService = {
  async getCurrentUser(): Promise<CurrentUser> {
    if (USE_MOCK) return delay(MOCK_USER);
    throw new Error("not implemented");
  },

  async getScoringFormula(): Promise<ScoringFormula> {
    if (USE_MOCK) return delay(MOCK_FORMULA);
    throw new Error("not implemented");
  },

  async getRankSummary(): Promise<RankSummary> {
    if (USE_MOCK) return delay(MOCK_SUMMARY);
    throw new Error("not implemented");
  },

  async getPodium(scope: LeaderboardScope): Promise<PodiumEntry[]> {
    if (USE_MOCK) {
      const top = mockBoard(scope, 3).map((e, i) => ({
        ...e,
        highlight: (["gold", "silver", "bronze"] as const)[i],
      }));
      return delay(top);
    }
    throw new Error("not implemented");
  },

  async getLeaderboard(scope: LeaderboardScope): Promise<LeaderboardEntry[]> {
    if (USE_MOCK) {
      if (scope === "friends") return delay(mockBoard(scope, 6));
      return delay(mockBoard(scope, 24));
    }
    throw new Error("not implemented");
  },

  async getAchievements(): Promise<AchievementBadge[]> {
    if (USE_MOCK) return delay(MOCK_ACHIEVEMENTS);
    throw new Error("not implemented");
  },

  async getRankInsights(): Promise<RankInsight[]> {
    if (USE_MOCK) return delay(MOCK_INSIGHTS);
    throw new Error("not implemented");
  },

  async getRecruiterVisibility(): Promise<RecruiterVisibility> {
    if (USE_MOCK) return delay(MOCK_RECRUITER);
    throw new Error("not implemented");
  },

  async compareWith(otherUserId: string): Promise<ComparisonResult> {
    if (USE_MOCK) {
      const seed = otherUserId.length;
      return delay({
        you: { userId: "u_me", name: "You" },
        them: { userId: otherUserId, name: NAMES[seed % NAMES.length] },
        metrics: [
          { label: "Total Score", you: 7820, them: 9200 - seed * 30, max: 10000 },
          { label: "Readiness Score", you: 78, them: 88 - (seed % 10), max: 100, unit: "%" },
          { label: "DSA Progress", you: 72, them: 84 - (seed % 7), max: 100, unit: "%" },
          { label: "Projects Built", you: 8, them: 12 - (seed % 4), max: 20 },
          { label: "Subject Mastery", you: 70, them: 80 - (seed % 6), max: 100, unit: "%" },
          { label: "Current Streak", you: 23, them: 40 - (seed % 12), max: 60, unit: "d" },
        ],
        themProfileHref: `/profile?u=${otherUserId}`,
      });
    }
    throw new Error("not implemented");
  },
};
