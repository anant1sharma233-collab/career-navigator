/**
 * Opportunities Service Layer
 * All Opportunities data access lives here. Components and hooks must never
 * import apiClient directly. To switch from mock to live data, set
 * `VITE_API_URL` and flip `opportunitiesConfig.useMocks` to false.
 */
import { apiClient } from "./apiClient";

/* ---------------- Types ---------------- */

export type OpportunityType =
  | "job"
  | "internship"
  | "hackathon"
  | "contest"
  | "scholarship"
  | "drive";

export type EligibilityStatus = "eligible" | "almost" | "locked";
export type WorkMode = "Remote" | "Onsite" | "Hybrid";

export interface OpportunitySummary {
  matchScore: number;
  eligibleCount: number;
  almostEligibleCount: number;
  dreamUnlocked: number;
  recruiterVisibility: number;
  resumeStrength: number;
  readinessScore: number;
  applicationsSaved: number;
}

export interface Opportunity {
  id: string;
  type: OpportunityType;
  company: string;
  logo: string;
  role: string;
  package: string;
  location: string;
  mode: WorkMode;
  matchScore: number;
  status: EligibilityStatus;
  eligibilityPct: number;
  whyMatch: string[];
  missing: string[];
  deadline?: string;
  tags: string[];
}

export interface EligibilityBreakdown extends Opportunity {
  gapPct: number;
  nextSteps: string[];
}

export interface DreamCompany {
  id: string;
  name: string;
  logo: string;
  role: string;
  package: string;
  currentReadiness: number;
  requiredReadiness: number;
  gapPct: number;
  missingSkills: string[];
  dsaTopics: string[];
  projectLevel: string;
}

export interface Internship {
  id: string;
  company: string;
  logo: string;
  role: string;
  duration: string;
  stipend: string;
  mode: WorkMode;
  season: "Summer" | "Winter" | "Year-round";
  skills: string[];
  matchScore: number;
  deadline: string;
}

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  deadline: string;
  teamSize: string;
  reward: string;
  skills: string[];
  matchScore: number;
  mode: WorkMode;
  verified: boolean;
}

export interface Contest {
  id: string;
  name: string;
  platform: "LeetCode" | "Codeforces" | "CodeChef" | "AtCoder" | "PrepForge";
  difficulty: "Easy" | "Medium" | "Hard";
  startsAt: string;
  duration: string;
  registrations: number;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  provider: string;
}

export interface PlacementDrive {
  id: string;
  company: string;
  logo: string;
  role: string;
  package: string;
  branches: string[];
  cgpaCutoff: number;
  deadline: string;
  driveType: "College" | "Open";
}

export interface Insight {
  goal: string;
  currentReadiness: number;
  requiredReadiness: number;
  missingSkills: string[];
  missingProjects: string[];
  missingTopics: string[];
  nextSteps: string[];
}

/* ---------------- Config ---------------- */

export const opportunitiesConfig = { useMocks: true };

/* ---------------- Mocks ---------------- */

const MOCK_SUMMARY: OpportunitySummary = {
  matchScore: 72,
  eligibleCount: 18,
  almostEligibleCount: 11,
  dreamUnlocked: 3,
  recruiterVisibility: 64,
  resumeStrength: 76,
  readinessScore: 68,
  applicationsSaved: 9,
};

const MOCK_RECS: Opportunity[] = [
  {
    id: "o1", type: "job", company: "Razorpay", logo: "💳",
    role: "SDE-1, Backend", package: "22 LPA", location: "Bangalore", mode: "Hybrid",
    matchScore: 92, status: "eligible", eligibilityPct: 100,
    whyMatch: ["Arrays · Strings · DBMS · OS complete", "3 backend projects", "CGPA 8.4 ≥ 7.5"],
    missing: [], deadline: "2026-07-04",
    tags: ["Backend", "Node.js", "SQL"],
  },
  {
    id: "o2", type: "job", company: "Atlassian", logo: "🔷",
    role: "Software Engineer Intern → FTE", package: "28 LPA", location: "Bangalore", mode: "Onsite",
    matchScore: 88, status: "eligible", eligibilityPct: 100,
    whyMatch: ["Trees + Hashing strong", "OOPs project shipped", "Eligible branches: CSE/IT"],
    missing: [], deadline: "2026-06-30",
    tags: ["Full-stack", "React", "Java"],
  },
  {
    id: "o3", type: "internship", company: "Zomato", logo: "🍱",
    role: "Frontend Intern", package: "₹80k/mo", location: "Gurgaon", mode: "Remote",
    matchScore: 84, status: "eligible", eligibilityPct: 100,
    whyMatch: ["React + TS skills match", "2 deployed projects"],
    missing: [], deadline: "2026-07-12",
    tags: ["React", "TypeScript"],
  },
  {
    id: "o4", type: "job", company: "Microsoft", logo: "🟦",
    role: "SWE Intern", package: "30 LPA equivalent", location: "Hyderabad", mode: "Onsite",
    matchScore: 71, status: "almost", eligibilityPct: 78,
    whyMatch: ["Strong Trees + DBMS", "Resume score 76"],
    missing: ["Graphs", "DP", "1 advanced system project"], deadline: "2026-07-20",
    tags: ["C#", "Azure"],
  },
];

const MOCK_ELIGIBLE: Opportunity[] = [
  ...MOCK_RECS.filter((o) => o.status === "eligible"),
  {
    id: "e1", type: "job", company: "Freshworks", logo: "🟢",
    role: "Associate SDE", package: "14 LPA", location: "Chennai", mode: "Hybrid",
    matchScore: 81, status: "eligible", eligibilityPct: 100,
    whyMatch: ["Branch + CGPA match", "Strings · OS · CN cleared"], missing: [],
    deadline: "2026-07-08", tags: ["SaaS", "Java"],
  },
  {
    id: "e2", type: "job", company: "Postman", logo: "🟠",
    role: "Backend Engineer I", package: "18 LPA", location: "Bangalore", mode: "Onsite",
    matchScore: 79, status: "eligible", eligibilityPct: 100,
    whyMatch: ["Node + APIs project shipped", "DBMS strong"], missing: [],
    deadline: "2026-07-15", tags: ["Node.js", "REST"],
  },
];

const MOCK_ALMOST: EligibilityBreakdown[] = [
  {
    id: "a1", type: "job", company: "Google", logo: "🟩",
    role: "SWE-I", package: "44 LPA", location: "Bangalore", mode: "Onsite",
    matchScore: 68, status: "almost", eligibilityPct: 72, gapPct: 28,
    whyMatch: ["Strong fundamentals", "CGPA above cutoff"],
    missing: ["Graphs", "Dynamic Programming", "System Design basics"],
    nextSteps: [
      "Complete Graphs (BFS/DFS, Dijkstra, Topo Sort)",
      "Solve 25 DP problems (LIS, Knapsack, Partition)",
      "Ship 1 advanced backend project with system design",
    ],
    deadline: "2026-08-05", tags: ["Algorithms", "Distributed"],
  },
  {
    id: "a2", type: "job", company: "Stripe", logo: "🟣",
    role: "Software Engineer", package: "38 LPA", location: "Remote", mode: "Remote",
    matchScore: 64, status: "almost", eligibilityPct: 66, gapPct: 34,
    whyMatch: ["Backend strong", "TypeScript proficient"],
    missing: ["Concurrency", "Distributed Systems", "Open source PR"],
    nextSteps: [
      "Finish concurrency module (mutex, atomics)",
      "Read DDIA Ch. 1–4 and complete notes",
      "Ship 1 OSS PR merged in a known repo",
    ],
    deadline: "2026-08-20", tags: ["Payments", "Backend"],
  },
  {
    id: "a3", type: "internship", company: "Adobe", logo: "🟥",
    role: "MTS Intern", package: "₹1.1L/mo", location: "Noida", mode: "Onsite",
    matchScore: 70, status: "almost", eligibilityPct: 81, gapPct: 19,
    whyMatch: ["OOPs strong", "Projects above bar"],
    missing: ["Trie", "Heap"],
    nextSteps: ["Complete Trie + Heap (12 problems)", "Take a mock interview"],
    deadline: "2026-07-22", tags: ["C++", "Systems"],
  },
];

const MOCK_DREAM: DreamCompany[] = [
  {
    id: "d1", name: "Microsoft", logo: "🟦", role: "SWE", package: "30 LPA",
    currentReadiness: 62, requiredReadiness: 80, gapPct: 18,
    missingSkills: ["Distributed Systems basics", "Concurrency"],
    dsaTopics: ["Graphs", "DP"], projectLevel: "1 advanced full-stack project",
  },
  {
    id: "d2", name: "Amazon", logo: "🟧", role: "SDE-1", package: "32 LPA",
    currentReadiness: 58, requiredReadiness: 82, gapPct: 24,
    missingSkills: ["LP Principles", "AWS basics"],
    dsaTopics: ["Graphs", "DP", "Trees Advanced"], projectLevel: "1 scalable backend project",
  },
  {
    id: "d3", name: "Google", logo: "🟩", role: "SWE-I", package: "44 LPA",
    currentReadiness: 49, requiredReadiness: 88, gapPct: 39,
    missingSkills: ["Algorithms (Hard)", "Math/Probability"],
    dsaTopics: ["DP", "Graphs", "Greedy", "Advanced DSA"], projectLevel: "Research / OSS contribution",
  },
  {
    id: "d4", name: "Adobe", logo: "🟥", role: "MTS", package: "26 LPA",
    currentReadiness: 71, requiredReadiness: 78, gapPct: 7,
    missingSkills: ["Heap", "Trie"], dsaTopics: ["Heap", "Trie"], projectLevel: "1 mid-level project",
  },
];

const MOCK_INTERNS: Internship[] = [
  { id: "i1", company: "Zomato", logo: "🍱", role: "Frontend Intern", duration: "3 months", stipend: "₹80k/mo", mode: "Remote", season: "Summer", skills: ["React", "TS"], matchScore: 84, deadline: "2026-07-12" },
  { id: "i2", company: "Swiggy", logo: "🟧", role: "Backend Intern", duration: "6 months", stipend: "₹70k/mo", mode: "Hybrid", season: "Year-round", skills: ["Node.js", "SQL"], matchScore: 81, deadline: "2026-07-18" },
  { id: "i3", company: "Adobe", logo: "🟥", role: "MTS Intern", duration: "2 months", stipend: "₹1.1L/mo", mode: "Onsite", season: "Summer", skills: ["C++", "DSA"], matchScore: 70, deadline: "2026-07-22" },
  { id: "i4", company: "Sprinklr", logo: "🔶", role: "PE Intern", duration: "6 months", stipend: "₹60k/mo", mode: "Onsite", season: "Winter", skills: ["Java", "Spring"], matchScore: 74, deadline: "2026-08-10" },
];

const MOCK_HACK: Hackathon[] = [
  { id: "h1", name: "Smart India Hackathon 2026", organizer: "MoE, GoI", deadline: "2026-08-15", teamSize: "6", reward: "₹1 Lakh + Internship", skills: ["Full-stack", "AI/ML"], matchScore: 86, mode: "Onsite", verified: true },
  { id: "h2", name: "Flipkart GRiD 7.0", organizer: "Flipkart", deadline: "2026-07-30", teamSize: "2-3", reward: "PPO + ₹4L", skills: ["Backend", "System Design"], matchScore: 78, mode: "Hybrid", verified: true },
  { id: "h3", name: "Amazon HackOn 5.0", organizer: "Amazon", deadline: "2026-09-05", teamSize: "4", reward: "Interview Fast-track", skills: ["DSA", "AWS"], matchScore: 73, mode: "Remote", verified: true },
  { id: "h4", name: "PrepForge Sprint", organizer: "PrepForge", deadline: "2026-07-10", teamSize: "1-3", reward: "Pro Plan + Badge", skills: ["React", "TS"], matchScore: 88, mode: "Remote", verified: true },
];

const MOCK_CONTESTS: Contest[] = [
  { id: "c1", name: "LeetCode Weekly 412", platform: "LeetCode", difficulty: "Medium", startsAt: "Sun 8:00 AM", duration: "90 min", registrations: 24800 },
  { id: "c2", name: "Codeforces Round 1024", platform: "Codeforces", difficulty: "Hard", startsAt: "Sat 8:35 PM", duration: "2h 15m", registrations: 18700 },
  { id: "c3", name: "Starters 142", platform: "CodeChef", difficulty: "Easy", startsAt: "Wed 8:00 PM", duration: "2h", registrations: 12100 },
  { id: "c4", name: "PrepForge Mock Drive", platform: "PrepForge", difficulty: "Medium", startsAt: "Fri 7:00 PM", duration: "75 min", registrations: 980 },
];

const MOCK_SCHOLARSHIPS: Scholarship[] = [
  { id: "s1", name: "Google Generation Scholarship", amount: "$1000", eligibility: "Women in CS, CGPA ≥ 7.5", deadline: "2026-08-30", provider: "Google" },
  { id: "s2", name: "AICTE Pragati", amount: "₹50,000", eligibility: "Girl students, family income < ₹8L", deadline: "2026-09-15", provider: "AICTE" },
  { id: "s3", name: "Reliance Foundation UG", amount: "₹2,00,000", eligibility: "Merit + Need based, UG students", deadline: "2026-10-01", provider: "Reliance Foundation" },
];

const MOCK_DRIVES: PlacementDrive[] = [
  { id: "p1", company: "TCS NQT", logo: "🟦", role: "Systems Engineer", package: "7 LPA", branches: ["CSE", "IT", "ECE", "EEE"], cgpaCutoff: 6.5, deadline: "2026-07-25", driveType: "Open" },
  { id: "p2", company: "Infosys SP", logo: "🟩", role: "Specialist Programmer", package: "9 LPA", branches: ["CSE", "IT"], cgpaCutoff: 7.0, deadline: "2026-08-02", driveType: "College" },
  { id: "p3", company: "Cognizant GenC Next", logo: "🟨", role: "Programmer Analyst", package: "9.5 LPA", branches: ["CSE", "IT", "ECE"], cgpaCutoff: 6.5, deadline: "2026-07-29", driveType: "Open" },
];

const MOCK_INSIGHT: Insight = {
  goal: "Unlock Microsoft SWE",
  currentReadiness: 62,
  requiredReadiness: 80,
  missingSkills: ["Concurrency", "Distributed Systems basics"],
  missingProjects: ["1 advanced full-stack project"],
  missingTopics: ["Graphs", "Dynamic Programming"],
  nextSteps: [
    "Complete Graphs (BFS/DFS, Dijkstra, Topo Sort)",
    "Complete DP (12–15 patterns)",
    "Ship 1 advanced project with auth + DB + deploy",
    "Push resume score from 76 → 80+",
  ],
};

/* ---------------- API ---------------- */

const wait = <T,>(d: T, ms = 280) => new Promise<T>((r) => setTimeout(() => r(d), ms));

async function safe<T>(live: () => Promise<T>, mock: T): Promise<T> {
  if (opportunitiesConfig.useMocks) return wait(mock);
  try { return await live(); } catch { return mock; }
}

export const opportunitiesService = {
  getSummary: () => safe(async () => (await apiClient.get<OpportunitySummary>("/opportunities/summary")).data, MOCK_SUMMARY),
  getRecommendations: () => safe(async () => (await apiClient.get<Opportunity[]>("/opportunities/recommendations")).data, MOCK_RECS),
  getEligible: () => safe(async () => (await apiClient.get<Opportunity[]>("/opportunities/eligible")).data, MOCK_ELIGIBLE),
  getAlmostEligible: () => safe(async () => (await apiClient.get<EligibilityBreakdown[]>("/opportunities/almost")).data, MOCK_ALMOST),
  getDreamCompanies: () => safe(async () => (await apiClient.get<DreamCompany[]>("/opportunities/dream-companies")).data, MOCK_DREAM),
  getInternships: () => safe(async () => (await apiClient.get<Internship[]>("/opportunities/internships")).data, MOCK_INTERNS),
  getHackathons: () => safe(async () => (await apiClient.get<Hackathon[]>("/opportunities/hackathons")).data, MOCK_HACK),
  getContests: () => safe(async () => (await apiClient.get<Contest[]>("/opportunities/contests")).data, MOCK_CONTESTS),
  getScholarships: () => safe(async () => (await apiClient.get<Scholarship[]>("/opportunities/scholarships")).data, MOCK_SCHOLARSHIPS),
  getPlacementDrives: () => safe(async () => (await apiClient.get<PlacementDrive[]>("/opportunities/drives")).data, MOCK_DRIVES),
  getInsight: () => safe(async () => (await apiClient.get<Insight>("/opportunities/insight")).data, MOCK_INSIGHT),
};
