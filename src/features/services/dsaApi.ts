/**
 * DSA API Gateway — single source of truth for all DSA data/mutations.
 *
 * Components MUST consume the exported hooks (useDSAData, useMarkForRevision,
 * useUnmarkForRevision). If the backend contract changes, only this file is
 * touched — no UI component edits required.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";

// ===== Types =====
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface DSAQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  leetcodeLink: string;
  notesLink: string;
  videoLink: string;
  isMarkedForRevision: boolean;
}

export interface DSATopic {
  id: string;
  name: string;
  stage?: "BASICS" | "BASIC_TO_ADVANCE" | "ADVANCED";
  questions: DSAQuestion[];
}

export interface DSAPackage {
  id: string;
  name: string; // e.g. "4-7 LPA"
  level: "Beginner" | "Intermediate" | "Advanced";
  totalQuestions: number;
  solved: number;
  durationMonths: string;
  topics: string[];
  videoTitle: string;
  videoDuration: string;
  videoThumb: string;
  videoLink: string;
  accent: string; // tailwind gradient classes
}

export interface DSACompany {
  id: string;
  name: string;
  logo: string;
  tier: "Beginner Friendly" | "Entry Level" | "Top Tier" | "Elite";
  totalQuestions: number;
  solved: number;
  topics: string[];
}

export interface DSAData {
  userRank: number;
  totalSolved: number;
  totalQuestions: number;
  nextQuestion: DSAQuestion & { lastSolvedTitle?: string };
  topics: DSATopic[];
  packages: DSAPackage[];
  companies: DSACompany[];
}

// ===== Endpoints =====
const ENDPOINTS = {
  data: "/dsa/data",
  revision: (id: string) => `/dsa/revision/${id}`,
};

// ===== Mock fallback (backend not yet wired) =====
const MOCK: DSAData = {
  userRank: 245,
  totalSolved: 45,
  totalQuestions: 600,
  nextQuestion: {
    id: "q123",
    title: "Two Sum",
    difficulty: "Medium",
    leetcodeLink: "https://leetcode.com/problems/two-sum",
    notesLink: "/notes/two-sum.pdf",
    videoLink: "https://youtube.com/watch?v=KLlXCFG5TnA",
    isMarkedForRevision: false,
    lastSolvedTitle: "Reverse Array",
  },
  topics: [
    {
      id: "t1", name: "Arrays Basics", stage: "BASICS",
      questions: [
        { id: "q1", title: "Reverse Array", difficulty: "Easy", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: true },
        { id: "q2", title: "Max Subarray Sum", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q3", title: "Rotate Array", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t2", name: "Strings Basics", stage: "BASICS",
      questions: [
        { id: "q4", title: "Reverse String", difficulty: "Easy", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q5", title: "Valid Anagram", difficulty: "Easy", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t3", name: "Linked List Basics", stage: "BASICS",
      questions: [
        { id: "q6", title: "Reverse Linked List", difficulty: "Easy", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: true },
        { id: "q7", title: "Detect Cycle", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t4", name: "Arrays Advanced", stage: "BASIC_TO_ADVANCE",
      questions: [
        { id: "q8", title: "Trapping Rain Water", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q9", title: "Sliding Window Maximum", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t5", name: "Binary Search", stage: "BASIC_TO_ADVANCE",
      questions: [
        { id: "q10", title: "Search in Rotated Array", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q11", title: "Median of Two Sorted Arrays", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t6", name: "Trees Basics", stage: "BASIC_TO_ADVANCE",
      questions: [
        { id: "q12", title: "Inorder Traversal", difficulty: "Easy", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t7", name: "Graph", stage: "ADVANCED",
      questions: [
        { id: "q13", title: "Number of Islands", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q14", title: "Word Ladder", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t8", name: "Dynamic Programming", stage: "ADVANCED",
      questions: [
        { id: "q15", title: "Longest Common Subsequence", difficulty: "Medium", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
        { id: "q16", title: "Edit Distance", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
    {
      id: "t9", name: "System Design", stage: "ADVANCED",
      questions: [
        { id: "q17", title: "Design Twitter", difficulty: "Hard", leetcodeLink: "#", notesLink: "#", videoLink: "#", isMarkedForRevision: false },
      ],
    },
  ],
  packages: [
    {
      id: "p1", name: "4-7 LPA", level: "Beginner",
      totalQuestions: 150, solved: 45, durationMonths: "2-3 months",
      topics: ["Array Basics", "Strings Basics", "Linked List Basics", "Sorting", "Binary Search"],
      videoTitle: "How to Prepare for 4-7 LPA", videoDuration: "15 min",
      videoThumb: "https://img.youtube.com/vi/KLlXCFG5TnA/maxresdefault.jpg",
      videoLink: "https://youtube.com/watch?v=KLlXCFG5TnA",
      accent: "from-emerald-500/30 to-teal-500/10",
    },
    {
      id: "p2", name: "7-11 LPA", level: "Intermediate",
      totalQuestions: 300, solved: 120, durationMonths: "4-6 months",
      topics: ["Arrays Advanced", "Strings Advanced", "Sorting + Binary Search", "Trees Advanced", "Graph Basics", "DP Basics"],
      videoTitle: "How to Prepare for 7-11 LPA", videoDuration: "20 min",
      videoThumb: "https://img.youtube.com/vi/KLlXCFG5TnA/maxresdefault.jpg",
      videoLink: "https://youtube.com/watch?v=KLlXCFG5TnA",
      accent: "from-[#ff5b4a]/30 to-[#ff8a65]/10",
    },
    {
      id: "p3", name: "11-15+ LPA", level: "Advanced",
      totalQuestions: 500, solved: 80, durationMonths: "6-9 months",
      topics: ["Advanced Trees", "Graph Advanced", "Dynamic Programming", "Backtracking", "System Design", "Hard Problems"],
      videoTitle: "How to Prepare for 11-15+ LPA", videoDuration: "25 min",
      videoThumb: "https://img.youtube.com/vi/KLlXCFG5TnA/maxresdefault.jpg",
      videoLink: "https://youtube.com/watch?v=KLlXCFG5TnA",
      accent: "from-pink-500/30 to-rose-500/10",
    },
  ],
  companies: [
    { id: "c1", name: "Accenture", logo: "🅰️", tier: "Beginner Friendly", totalQuestions: 100, solved: 30, topics: ["Array Basics", "Strings", "Basic Logic"] },
    { id: "c2", name: "TCS NQT", logo: "🟦", tier: "Entry Level", totalQuestions: 120, solved: 45, topics: ["Arrays", "Strings", "Basic DSA"] },
    { id: "c3", name: "Amazon", logo: "🛒", tier: "Top Tier", totalQuestions: 200, solved: 80, topics: ["Trees", "Graph", "DP", "System Design"] },
    { id: "c4", name: "Microsoft", logo: "🪟", tier: "Top Tier", totalQuestions: 250, solved: 95, topics: ["Trees", "Graph", "DP", "Backtracking"] },
    { id: "c5", name: "Google", logo: "🔵", tier: "Elite", totalQuestions: 300, solved: 40, topics: ["Advanced Graph", "DP", "System Design"] },
    { id: "c6", name: "Netflix", logo: "🔴", tier: "Elite", totalQuestions: 180, solved: 25, topics: ["System Design", "Advanced Algorithms"] },
  ],
};

// ===== Raw API functions =====
async function fetchDSAData(): Promise<DSAData> {
  try {
    const { data } = await apiClient.get<DSAData>(ENDPOINTS.data);
    return data;
  } catch {
    // Backend not yet wired → return mock so UI is fully functional.
    return MOCK;
  }
}

async function markForRevision(questionId: string): Promise<void> {
  try {
    await apiClient.post(ENDPOINTS.revision(questionId));
  } catch {
    /* swallow when backend is not yet wired — optimistic update covers UI */
  }
}

async function unmarkForRevision(questionId: string): Promise<void> {
  try {
    await apiClient.delete(ENDPOINTS.revision(questionId));
  } catch {
    /* swallow when backend is not yet wired */
  }
}

// ===== React Query hooks (the only public surface) =====
const QK = { dsa: ["dsa", "data"] as const };

export function useDSAData() {
  return useQuery({ queryKey: QK.dsa, queryFn: fetchDSAData, staleTime: 60_000 });
}

export function useMarkForRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) => markForRevision(questionId),
    onMutate: async (questionId) => {
      await qc.cancelQueries({ queryKey: QK.dsa });
      const prev = qc.getQueryData<DSAData>(QK.dsa);
      if (prev) qc.setQueryData<DSAData>(QK.dsa, toggleRevision(prev, questionId, true));
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(QK.dsa, ctx.prev),
  });
}

export function useUnmarkForRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) => unmarkForRevision(questionId),
    onMutate: async (questionId) => {
      await qc.cancelQueries({ queryKey: QK.dsa });
      const prev = qc.getQueryData<DSAData>(QK.dsa);
      if (prev) qc.setQueryData<DSAData>(QK.dsa, toggleRevision(prev, questionId, false));
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(QK.dsa, ctx.prev),
  });
}

function toggleRevision(data: DSAData, id: string, marked: boolean): DSAData {
  return {
    ...data,
    nextQuestion:
      data.nextQuestion.id === id
        ? { ...data.nextQuestion, isMarkedForRevision: marked }
        : data.nextQuestion,
    topics: data.topics.map((t) => ({
      ...t,
      questions: t.questions.map((q) =>
        q.id === id ? { ...q, isMarkedForRevision: marked } : q,
      ),
    })),
  };
}
