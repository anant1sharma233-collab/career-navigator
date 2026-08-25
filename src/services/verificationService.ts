/**
 * Verification Service — the only place verification data is produced.
 *
 * Core principle: EVIDENCE OVER CLAIMS.
 * Learning progress (questions completed) and verified capability
 * (topic verification) are computed and stored separately and are never merged.
 */
import { apiClient } from "./apiClient";
import type {
  TopicVerification,
  VerificationSummary,
  VerificationBlueprint,
  VerificationEvidence,
  VerificationAttempt,
} from "@/types/verification";

async function safe<T>(live: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await live();
  } catch {
    return fallback;
  }
}

const VERIFICATIONS: Record<string, TopicVerification> = {
  arrays: {
    topicId: "arrays",
    state: "verified",
    level: "AI Verified",
    confidence: 89,
    verifiedAt: "2026-08-12",
    freshness: "Fresh",
    concepts: [
      { concept: "Traversal", mastery: 95, status: "strong" },
      { concept: "Hashing", mastery: 91, status: "strong" },
      { concept: "Two Pointer", mastery: 88, status: "strong" },
      { concept: "Sliding Window", mastery: 74, status: "strong" },
      { concept: "Prefix Sum", mastery: 68, status: "needs_review" },
      { concept: "Kadane", mastery: 72, status: "strong" },
    ],
    evidence: [
      { id: "e1", kind: "assessment", label: "PrepForge Arrays Challenge", accepted: true },
      { id: "e2", kind: "leetcode", label: "LeetCode profile (240 solved)", url: "https://leetcode.com", accepted: true },
    ],
    attempts: [
      { id: "a1", topicId: "arrays", startedAt: "2026-08-12", completedAt: "2026-08-12", level: "AI Verified", score: 89, outcome: "verified" },
    ],
  },
  strings: {
    topicId: "strings",
    state: "partially_verified",
    level: "AI Verified",
    confidence: 61,
    verifiedAt: "2026-07-30",
    freshness: "Refresh Recommended",
    concepts: [
      { concept: "Traversal", mastery: 88, status: "strong" },
      { concept: "Hashing", mastery: 81, status: "strong" },
      { concept: "Sliding Window", mastery: 52, status: "needs_review" },
      { concept: "Sorting", mastery: 47, status: "needs_review" },
    ],
    evidence: [],
    attempts: [
      { id: "a2", topicId: "strings", startedAt: "2026-07-30", completedAt: "2026-07-30", level: "AI Verified", score: 61, outcome: "partially_verified" },
    ],
  },
  basics: {
    topicId: "basics",
    state: "verified",
    level: "Faculty Verified",
    confidence: 94,
    verifiedAt: "2026-06-18",
    freshness: "Fresh",
    concepts: [
      { concept: "Traversal", mastery: 96, status: "strong" },
      { concept: "Greedy", mastery: 90, status: "strong" },
    ],
    evidence: [{ id: "e3", kind: "assessment", label: "College lab evaluation (TPO verified)", accepted: true }],
    attempts: [
      { id: "a3", topicId: "basics", startedAt: "2026-06-18", completedAt: "2026-06-18", level: "Faculty Verified", score: 94, outcome: "verified" },
    ],
  },
  sorting: {
    topicId: "sorting",
    state: "verified",
    level: "AI Verified",
    confidence: 83,
    verifiedAt: "2026-08-01",
    freshness: "Fresh",
    concepts: [
      { concept: "Sorting", mastery: 87, status: "strong" },
      { concept: "Two Pointer", mastery: 79, status: "strong" },
    ],
    evidence: [],
    attempts: [],
  },
  hashing: {
    topicId: "hashing",
    state: "verified",
    level: "Human Verified",
    confidence: 85,
    verifiedAt: "2026-07-22",
    freshness: "Fresh",
    concepts: [
      { concept: "Hashing", mastery: 89, status: "strong" },
      { concept: "Prefix Sum", mastery: 76, status: "strong" },
    ],
    evidence: [{ id: "e4", kind: "assessment", label: "PrepForge-approved evaluator session", accepted: true }],
    attempts: [],
  },
  "binary-search": {
    topicId: "binary-search",
    state: "in_progress",
    confidence: 0,
    concepts: [
      { concept: "Binary Search", mastery: 0, status: "untested" },
      { concept: "Traversal", mastery: 0, status: "untested" },
    ],
    evidence: [],
    attempts: [],
  },
};

const DEFAULT_CONCEPTS = ["Traversal", "Hashing", "Two Pointer", "Sliding Window", "Prefix Sum", "Sorting"];

function emptyVerification(topicId: string): TopicVerification {
  return {
    topicId,
    state: "not_started",
    confidence: 0,
    concepts: DEFAULT_CONCEPTS.map((c) => ({ concept: c, mastery: 0, status: "untested" as const })),
    evidence: [],
    attempts: [],
  };
}

const EVALUATED_ON = [
  "Core concepts",
  "Problem solving",
  "Multiple patterns",
  "New unseen problems",
  "Complexity understanding",
  "Follow-up questions",
];

const BLUEPRINTS: Record<string, VerificationBlueprint> = {};

function blueprintFor(topicId: string, topicName: string): VerificationBlueprint {
  return (
    BLUEPRINTS[topicId] ?? {
      topicId,
      topicName,
      evaluatedOn: EVALUATED_ON,
      conceptsCovered: (VERIFICATIONS[topicId]?.concepts ?? emptyVerification(topicId).concepts).map((c) => c.concept),
      estimatedMinutes: 45,
      // Unseen variants — never the questions the student already practised.
      challenge: [
        {
          id: "vc1",
          title: "Unseen problem · Hashing pattern",
          difficulty: "Medium",
          concepts: ["Hashing"],
          prompt: "A new problem that tests the same reasoning as your practice set, with different constraints.",
        },
        {
          id: "vc2",
          title: "Unseen problem · Two Pointer / Window",
          difficulty: "Medium",
          concepts: ["Two Pointer", "Sliding Window"],
          prompt: "A variant requiring you to choose between two pointers and a window on your own.",
        },
        {
          id: "vc3",
          title: "Unseen problem · Optimisation",
          difficulty: "Hard",
          concepts: ["Prefix Sum", "Kadane"],
          prompt: "An optimisation problem where the brute force will time out.",
        },
      ],
      viva: [
        { id: "v1", question: "Why did you choose this approach over the alternatives?", intent: "Approach reasoning" },
        { id: "v2", question: "What is the time and space complexity of your solution?", intent: "Complexity understanding" },
        { id: "v3", question: "Can you optimise it further? What would you trade off?", intent: "Optimisation" },
        { id: "v4", question: "What happens for an empty input or all-duplicate values?", intent: "Edge cases" },
        { id: "v5", question: "Could you solve it with a different pattern?", intent: "Pattern flexibility" },
      ],
    }
  );
}

/** Derived summary — verified % comes from verified topics, not question counts. */
function buildSummary(topicsTotal: number, questionsCompleted: number, questionsTotal: number): VerificationSummary {
  const all = Object.values(VERIFICATIONS);
  const verified = all.filter((v) => v.state === "verified");
  const count = (level: string) => verified.filter((v) => v.level === level).length;
  const confidence = verified.length
    ? Math.round(verified.reduce((s, v) => s + v.confidence, 0) / verified.length)
    : 0;
  const lastVerifiedAt = all
    .map((v) => v.verifiedAt)
    .filter(Boolean)
    .sort()
    .reverse()[0] ?? "—";

  return {
    aiVerified: count("AI Verified"),
    humanVerified: count("Human Verified"),
    facultyVerified: count("Faculty Verified"),
    industryVerified: count("Industry Verified"),
    confidence,
    lastVerifiedAt,
    refreshRecommended: all.filter((v) => v.freshness === "Refresh Recommended").length,
    topicsVerified: verified.length,
    topicsTotal,
    verifiedDsaPct: topicsTotal ? Math.round((verified.length / topicsTotal) * 100) : 0,
    learningDsaPct: questionsTotal ? Math.round((questionsCompleted / questionsTotal) * 100) : 0,
    questionsCompleted,
    questionsTotal,
  };
}

export const verificationService = {
  getSummary: (topicsTotal = 25, questionsCompleted = 200, questionsTotal = 600) =>
    safe(
      async () => (await apiClient.get<VerificationSummary>("/verification/summary")).data,
      buildSummary(topicsTotal, questionsCompleted, questionsTotal),
    ),

  getAll: () =>
    safe(
      async () => (await apiClient.get<TopicVerification[]>("/verification/topics")).data,
      Object.values(VERIFICATIONS),
    ),

  getTopic: (topicId: string) =>
    safe(
      async () => (await apiClient.get<TopicVerification>(`/verification/topics/${topicId}`)).data,
      VERIFICATIONS[topicId] ?? emptyVerification(topicId),
    ),

  getBlueprint: (topicId: string, topicName: string) =>
    safe(
      async () => (await apiClient.get<VerificationBlueprint>(`/verification/topics/${topicId}/blueprint`)).data,
      blueprintFor(topicId, topicName),
    ),

  /** Attach supporting evidence. Never grants verification by itself. */
  addEvidence: async (topicId: string, evidence: Omit<VerificationEvidence, "id" | "accepted">) => {
    const record = VERIFICATIONS[topicId] ?? (VERIFICATIONS[topicId] = emptyVerification(topicId));
    const item: VerificationEvidence = { ...evidence, id: `e-${Date.now()}`, accepted: false };
    record.evidence = [...record.evidence, item];
    await safe(async () => (await apiClient.post(`/verification/topics/${topicId}/evidence`, evidence)).data, undefined);
    return item;
  },

  /**
   * Submit a verification attempt (challenge + AI viva).
   * Historical attempts are appended, never overwritten or deleted.
   */
  submitAttempt: async (topicId: string, score: number, level: TopicVerification["level"] = "AI Verified") => {
    const record = VERIFICATIONS[topicId] ?? (VERIFICATIONS[topicId] = emptyVerification(topicId));
    const outcome: VerificationAttempt["outcome"] =
      score >= 80 ? "verified" : score >= 55 ? "partially_verified" : "not_cleared";
    const attempt: VerificationAttempt = {
      id: `a-${Date.now()}`,
      topicId,
      startedAt: new Date().toISOString().slice(0, 10),
      completedAt: new Date().toISOString().slice(0, 10),
      level: level ?? "AI Verified",
      score,
      outcome,
    };
    record.attempts = [...record.attempts, attempt];
    record.confidence = score;
    record.level = level;
    record.verifiedAt = attempt.completedAt;
    record.freshness = "Fresh";
    record.state = outcome === "verified" ? "verified" : outcome === "partially_verified" ? "partially_verified" : "in_progress";
    record.concepts = record.concepts.map((c, i) => {
      const mastery = Math.max(0, Math.min(100, score + (i % 3 === 0 ? 6 : i % 3 === 1 ? -4 : -18)));
      return { ...c, mastery, status: mastery >= 70 ? "strong" : "needs_review" };
    });
    await safe(async () => (await apiClient.post(`/verification/topics/${topicId}/attempts`, { score, level })).data, undefined);
    return record;
  },
};
