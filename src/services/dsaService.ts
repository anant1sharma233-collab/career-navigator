/**
 * DSA Service Layer
 * All DSA data access lives here. Swap mocks for live API by setting
 * `VITE_API_URL` and `useMocks: false`.
 */
import { apiClient } from "./apiClient";

export interface DsaSummary {
  readinessScore: number;
  readinessDelta: number;
  currentRankGlobal: number;
  currentRankCollege: number;
  questionsSolved: number;
  questionsTotal: number;
  streak: number;
  strongestTopic: { name: string; pct: number };
  weakestTopic: { name: string; pct: number };
  recommendedNext: string;
  todaysGoalDone: number;
  todaysGoalTotal: number;
}

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Tier = "Foundations" | "Core" | "Advanced";

export interface DsaTopic {
  id: string;
  name: string;
  tier: Tier;
  progress: number;
  questionsSolved: number;
  questionsTotal: number;
  estimatedTime: string;
  difficulty: Difficulty;
  readinessContribution: number;
  prepVideoUrl: string;
}

export interface PackageRoadmap {
  id: string;
  salaryBand: string;
  audience: string;
  readinessScore: number;
  requiredTopics: string[];
  estimatedTime: string;
  companies: string[];
  difficulty: Difficulty;
}

export interface CompanyPrep {
  id: string;
  name: string;
  logo: string;
  tier: "Service-based" | "Product Tier-1" | "Product Tier-2";
  totalQuestions: number;
  difficulty: Difficulty;
  rounds: string[];
  dsaImportance: number; // 1-5
  focusTopics: string[];
  preparationProgress: number;
}

export interface DsaRecommendation {
  id: string;
  title: string;
  problems: string[];
  actionLabel: string;
  type: "solve" | "revise";
  topic: string;
}

export interface RecentActivity {
  id: string;
  problemName: string;
  timestamp: string;
  difficulty: Difficulty;
}

export interface SidebarData {
  recent: RecentActivity[];
  bookmarks: { id: string; name: string }[];
  revisionCount: number;
  weeklyProgress: number[];
  weeklyDelta: number;
  monthlyGrowth: number[];
  monthlyDelta: number;
}

export const dsaConfig = { useMocks: true };

/* ---------- MOCK DATA ---------- */

const MOCK_SUMMARY: DsaSummary = {
  readinessScore: 78,
  readinessDelta: 4,
  currentRankGlobal: 412,
  currentRankCollege: 22,
  questionsSolved: 184,
  questionsTotal: 450,
  streak: 12,
  strongestTopic: { name: "Arrays", pct: 94 },
  weakestTopic: { name: "DP", pct: 22 },
  recommendedNext: "Graphs",
  todaysGoalDone: 3,
  todaysGoalTotal: 5,
};

const MOCK_TOPICS: DsaTopic[] = [
  { id: "basics", name: "Programming Basics", tier: "Foundations", progress: 100, questionsSolved: 20, questionsTotal: 20, estimatedTime: "~4 hrs", difficulty: "Easy", readinessContribution: 4, prepVideoUrl: "https://youtu.be/8hly31xKli0" },
  { id: "arrays", name: "Arrays", tier: "Foundations", progress: 94, questionsSolved: 42, questionsTotal: 45, estimatedTime: "~10 hrs", difficulty: "Easy", readinessContribution: 8, prepVideoUrl: "https://youtu.be/n60Dn0UsbEk" },
  { id: "strings", name: "Strings", tier: "Foundations", progress: 68, questionsSolved: 17, questionsTotal: 25, estimatedTime: "~7 hrs", difficulty: "Easy", readinessContribution: 5, prepVideoUrl: "https://youtu.be/_l-OXgcrJh0" },
  { id: "sorting", name: "Sorting", tier: "Foundations", progress: 80, questionsSolved: 12, questionsTotal: 15, estimatedTime: "~5 hrs", difficulty: "Medium", readinessContribution: 4, prepVideoUrl: "https://youtu.be/HGk_ypEuS24" },
  { id: "searching", name: "Searching", tier: "Foundations", progress: 60, questionsSolved: 9, questionsTotal: 15, estimatedTime: "~4 hrs", difficulty: "Easy", readinessContribution: 3, prepVideoUrl: "https://youtu.be/MFhxShGxHWc" },
  { id: "recursion", name: "Recursion", tier: "Foundations", progress: 50, questionsSolved: 10, questionsTotal: 20, estimatedTime: "~8 hrs", difficulty: "Medium", readinessContribution: 6, prepVideoUrl: "https://youtu.be/M2uO2nMT0Bk" },
  { id: "linked-list", name: "Linked List", tier: "Core", progress: 55, questionsSolved: 17, questionsTotal: 30, estimatedTime: "~10 hrs", difficulty: "Medium", readinessContribution: 6, prepVideoUrl: "https://youtu.be/Nq7ok-OyEpg" },
  { id: "stack", name: "Stack", tier: "Core", progress: 70, questionsSolved: 14, questionsTotal: 20, estimatedTime: "~6 hrs", difficulty: "Medium", readinessContribution: 5, prepVideoUrl: "https://youtu.be/wjI1WNcIntg" },
  { id: "queue", name: "Queue", tier: "Core", progress: 45, questionsSolved: 9, questionsTotal: 20, estimatedTime: "~5 hrs", difficulty: "Medium", readinessContribution: 4, prepVideoUrl: "https://youtu.be/okr-XE8yTO8" },
  { id: "binary-search", name: "Binary Search", tier: "Core", progress: 40, questionsSolved: 12, questionsTotal: 30, estimatedTime: "~9 hrs", difficulty: "Medium", readinessContribution: 7, prepVideoUrl: "https://youtu.be/MFhxShGxHWc" },
  { id: "hashing", name: "Hashing", tier: "Core", progress: 65, questionsSolved: 13, questionsTotal: 20, estimatedTime: "~6 hrs", difficulty: "Medium", readinessContribution: 5, prepVideoUrl: "https://youtu.be/KEs5UyBJ39g" },
  { id: "trees", name: "Trees", tier: "Core", progress: 35, questionsSolved: 14, questionsTotal: 40, estimatedTime: "~14 hrs", difficulty: "Medium", readinessContribution: 9, prepVideoUrl: "https://youtu.be/_ANrF3FJm7I" },
  { id: "bst", name: "BST", tier: "Core", progress: 30, questionsSolved: 9, questionsTotal: 30, estimatedTime: "~10 hrs", difficulty: "Medium", readinessContribution: 7, prepVideoUrl: "https://youtu.be/p1QDdNLIPzc" },
  { id: "heap", name: "Heap", tier: "Core", progress: 25, questionsSolved: 6, questionsTotal: 25, estimatedTime: "~8 hrs", difficulty: "Medium", readinessContribution: 6, prepVideoUrl: "https://youtu.be/Qf-TDPr0nYw" },
  { id: "graphs", name: "Graphs", tier: "Advanced", progress: 18, questionsSolved: 9, questionsTotal: 50, estimatedTime: "~18 hrs", difficulty: "Hard", readinessContribution: 12, prepVideoUrl: "https://youtu.be/M3_pLsDdeuU" },
  { id: "greedy", name: "Greedy", tier: "Advanced", progress: 30, questionsSolved: 9, questionsTotal: 30, estimatedTime: "~10 hrs", difficulty: "Hard", readinessContribution: 6, prepVideoUrl: "https://youtu.be/ARvQcqJ_-NY" },
  { id: "trie", name: "Trie", tier: "Advanced", progress: 12, questionsSolved: 3, questionsTotal: 15, estimatedTime: "~6 hrs", difficulty: "Hard", readinessContribution: 4, prepVideoUrl: "https://youtu.be/dBGUmUQhjaM" },
  { id: "dp", name: "Dynamic Programming", tier: "Advanced", progress: 22, questionsSolved: 11, questionsTotal: 50, estimatedTime: "~20 hrs", difficulty: "Hard", readinessContribution: 14, prepVideoUrl: "https://youtu.be/tyB0ztf0DNY" },
  { id: "advanced", name: "Advanced DSA", tier: "Advanced", progress: 8, questionsSolved: 2, questionsTotal: 25, estimatedTime: "~12 hrs", difficulty: "Hard", readinessContribution: 8, prepVideoUrl: "https://youtu.be/0n-3hciDOqg" },
];

const MOCK_PACKAGES: PackageRoadmap[] = [
  { id: "4-7", salaryBand: "4–7 LPA", audience: "Service-based / mass recruiters", readinessScore: 82, requiredTopics: ["Arrays", "Strings", "Sorting", "Searching", "Recursion", "Linked List", "Stack", "Queue"], estimatedTime: "~6 weeks", companies: ["TCS", "Infosys", "Wipro", "Accenture", "Capgemini"], difficulty: "Easy" },
  { id: "7-12", salaryBand: "7–12 LPA", audience: "Mid-tier product companies", readinessScore: 64, requiredTopics: ["Arrays", "Strings", "Linked List", "Trees", "Hashing", "Binary Search", "Stack", "Recursion"], estimatedTime: "~10 weeks", companies: ["Cognizant", "Accenture", "Deloitte", "Sapient", "ZS"], difficulty: "Medium" },
  { id: "12-20", salaryBand: "12–20 LPA", audience: "Tier-1 product companies", readinessScore: 48, requiredTopics: ["Trees", "Graphs", "DP", "Heap", "Trie", "Hashing", "Binary Search", "Greedy"], estimatedTime: "~14 weeks", companies: ["Flipkart", "Adobe", "Microsoft", "Atlassian"], difficulty: "Hard" },
  { id: "20-plus", salaryBand: "20+ LPA", audience: "FAANG / top-tier", readinessScore: 31, requiredTopics: ["DP", "Graphs", "Trees", "System Design", "Trie", "Heap", "Advanced DSA", "Greedy"], estimatedTime: "~20 weeks", companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"], difficulty: "Hard" },
];

const MOCK_COMPANIES: CompanyPrep[] = [
  { id: "tcs", name: "TCS", logo: "🟦", tier: "Service-based", totalQuestions: 120, difficulty: "Easy", rounds: ["Online Test", "Technical", "Managerial", "HR"], dsaImportance: 2, focusTopics: ["Arrays", "Strings", "Sorting"], preparationProgress: 78 },
  { id: "infosys", name: "Infosys", logo: "🟩", tier: "Service-based", totalQuestions: 110, difficulty: "Easy", rounds: ["Aptitude", "Pseudocode", "Technical", "HR"], dsaImportance: 2, focusTopics: ["Arrays", "Strings", "Recursion"], preparationProgress: 70 },
  { id: "wipro", name: "Wipro", logo: "🟪", tier: "Service-based", totalQuestions: 90, difficulty: "Easy", rounds: ["Online Test", "Coding", "Technical", "HR"], dsaImportance: 2, focusTopics: ["Arrays", "Loops", "Strings"], preparationProgress: 65 },
  { id: "accenture", name: "Accenture", logo: "🟧", tier: "Service-based", totalQuestions: 95, difficulty: "Easy", rounds: ["Cognitive", "Coding", "Communication", "HR"], dsaImportance: 2, focusTopics: ["Arrays", "Strings", "Hashing"], preparationProgress: 55 },
  { id: "capgemini", name: "Capgemini", logo: "🟫", tier: "Service-based", totalQuestions: 80, difficulty: "Easy", rounds: ["Game Based", "Coding", "Technical", "HR"], dsaImportance: 2, focusTopics: ["Arrays", "Strings"], preparationProgress: 40 },
  { id: "cognizant", name: "Cognizant", logo: "🟨", tier: "Service-based", totalQuestions: 100, difficulty: "Medium", rounds: ["Aptitude", "Coding", "Technical", "HR"], dsaImportance: 3, focusTopics: ["Arrays", "Strings", "Linked List"], preparationProgress: 52 },
  { id: "amazon", name: "Amazon", logo: "🟧", tier: "Product Tier-1", totalQuestions: 350, difficulty: "Hard", rounds: ["Online Assessment", "Phone Screen", "On-site (4 rounds)", "Bar Raiser"], dsaImportance: 5, focusTopics: ["Graphs", "DP", "Trees", "Arrays", "Hashing"], preparationProgress: 38 },
  { id: "microsoft", name: "Microsoft", logo: "🟦", tier: "Product Tier-1", totalQuestions: 300, difficulty: "Hard", rounds: ["OA", "Technical", "Technical", "AS Round"], dsaImportance: 5, focusTopics: ["Trees", "DP", "Graphs", "Linked List"], preparationProgress: 42 },
  { id: "google", name: "Google", logo: "🟩", tier: "Product Tier-1", totalQuestions: 400, difficulty: "Hard", rounds: ["Phone Screen", "Onsite x4", "Team Match"], dsaImportance: 5, focusTopics: ["Graphs", "DP", "Trees", "Greedy", "Math"], preparationProgress: 25 },
  { id: "adobe", name: "Adobe", logo: "🟥", tier: "Product Tier-1", totalQuestions: 220, difficulty: "Medium", rounds: ["OA", "Technical x2", "Hiring Manager"], dsaImportance: 4, focusTopics: ["DP", "Trees", "Arrays", "Strings"], preparationProgress: 48 },
  { id: "flipkart", name: "Flipkart", logo: "🟦", tier: "Product Tier-2", totalQuestions: 180, difficulty: "Medium", rounds: ["OA", "Machine Coding", "Technical", "HM"], dsaImportance: 4, focusTopics: ["Trees", "Graphs", "DP", "LLD"], preparationProgress: 55 },
];

const MOCK_RECS: DsaRecommendation[] = [
  { id: "r1", title: "Solve 2 Graph Questions", problems: ["BFS on Grid", "Course Schedule II"], actionLabel: "Start", type: "solve", topic: "graphs" },
  { id: "r2", title: "Solve 1 DP Question", problems: ["Longest Increasing Subsequence"], actionLabel: "Start", type: "solve", topic: "dp" },
  { id: "r3", title: "Revise Binary Search", problems: ["4 bookmarked"], actionLabel: "Review", type: "revise", topic: "binary-search" },
];

const MOCK_SIDEBAR: SidebarData = {
  recent: [
    { id: "p1", problemName: "Two Sum", timestamp: "2h ago", difficulty: "Easy" },
    { id: "p2", problemName: "Valid Parentheses", timestamp: "5h ago", difficulty: "Easy" },
    { id: "p3", problemName: "Course Schedule", timestamp: "Yesterday", difficulty: "Medium" },
    { id: "p4", problemName: "LIS", timestamp: "2d ago", difficulty: "Medium" },
    { id: "p5", problemName: "Word Ladder", timestamp: "3d ago", difficulty: "Hard" },
  ],
  bookmarks: [
    { id: "b1", name: "Median of Two Sorted Arrays" },
    { id: "b2", name: "Trapping Rain Water" },
    { id: "b3", name: "Serialize Tree" },
    { id: "b4", name: "Word Break II" },
  ],
  revisionCount: 14,
  weeklyProgress: [3, 5, 4, 6, 7, 9, 8],
  weeklyDelta: 18,
  monthlyGrowth: [12, 18, 24, 31, 38, 47, 58, 64, 72, 78],
  monthlyDelta: 24,
};

/* ---------- API ---------- */

const wait = <T,>(d: T, ms = 300) => new Promise<T>((r) => setTimeout(() => r(d), ms));

async function safe<T>(live: () => Promise<T>, mock: T): Promise<T> {
  if (dsaConfig.useMocks) return wait(mock);
  try { return await live(); } catch { return mock; }
}

export const dsaService = {
  getSummary: () => safe(async () => (await apiClient.get<DsaSummary>("/dsa/summary")).data, MOCK_SUMMARY),
  getTopics: () => safe(async () => (await apiClient.get<DsaTopic[]>("/dsa/topics")).data, MOCK_TOPICS),
  getTopic: (id: string) => safe(
    async () => (await apiClient.get<DsaTopic>(`/dsa/topics/${id}`)).data,
    MOCK_TOPICS.find((t) => t.id === id) ?? MOCK_TOPICS[0],
  ),
  getPackages: () => safe(async () => (await apiClient.get<PackageRoadmap[]>("/dsa/packages")).data, MOCK_PACKAGES),
  getPackage: (id: string) => safe(
    async () => (await apiClient.get<PackageRoadmap>(`/dsa/packages/${id}`)).data,
    MOCK_PACKAGES.find((p) => p.id === id) ?? MOCK_PACKAGES[0],
  ),
  getCompanies: () => safe(async () => (await apiClient.get<CompanyPrep[]>("/dsa/companies")).data, MOCK_COMPANIES),
  getCompany: (id: string) => safe(
    async () => (await apiClient.get<CompanyPrep>(`/dsa/companies/${id}`)).data,
    MOCK_COMPANIES.find((c) => c.id === id) ?? MOCK_COMPANIES[0],
  ),
  getRecommendations: () => safe(async () => (await apiClient.get<DsaRecommendation[]>("/dsa/recommendations")).data, MOCK_RECS),
  getSidebar: () => safe(async () => (await apiClient.get<SidebarData>("/dsa/sidebar")).data, MOCK_SIDEBAR),
};
