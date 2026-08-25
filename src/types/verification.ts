/**
 * Verification domain types — "Evidence over claims".
 *
 * Learning Progress and Verified Capability are ALWAYS separate concepts.
 * Verification never lives on the global question record; it belongs to the
 * student's attempt / topic verification entities below.
 */

export type VerificationLevel =
  | "AI Verified"
  | "Faculty Verified"
  | "Human Verified"
  | "Industry Verified";

export type VerificationState =
  | "not_started"
  | "in_progress"
  | "partially_verified"
  | "verified";

export type FreshnessStatus = "Fresh" | "Refresh Recommended";

/** A single named concept inside a topic (e.g. Two Pointer inside Arrays). */
export interface ConceptCoverage {
  concept: string;
  /** 0-100 — demonstrated understanding, NOT questions solved. */
  mastery: number;
  status: "strong" | "needs_review" | "untested";
}

export interface VerificationEvidence {
  id: string;
  kind: "leetcode" | "github" | "certificate" | "assessment" | "project";
  label: string;
  url?: string;
  /** Supporting evidence only — never auto-grants verification. */
  accepted: boolean;
}

export interface VerificationAttempt {
  id: string;
  topicId: string;
  startedAt: string;
  completedAt?: string;
  level: VerificationLevel;
  score: number;
  outcome: "verified" | "partially_verified" | "not_cleared";
}

export interface TopicVerification {
  topicId: string;
  state: VerificationState;
  level?: VerificationLevel;
  /** 0-100 verification confidence — independent of learning progress. */
  confidence: number;
  verifiedAt?: string;
  freshness?: FreshnessStatus;
  concepts: ConceptCoverage[];
  evidence: VerificationEvidence[];
  attempts: VerificationAttempt[];
}

export interface VerificationSummary {
  aiVerified: number;
  humanVerified: number;
  facultyVerified: number;
  industryVerified: number;
  confidence: number;
  lastVerifiedAt: string;
  refreshRecommended: number;
  topicsVerified: number;
  topicsTotal: number;
  /** Verified DSA % — derived from verified topics, never from question count. */
  verifiedDsaPct: number;
  /** Learning progress % — derived from questions completed. */
  learningDsaPct: number;
  questionsCompleted: number;
  questionsTotal: number;
}

/** Shared, student-independent question record. */
export interface BankQuestion {
  id: string;
  title: string;
  slug: string;
  topic: string;
  subtopic?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  concepts: string[];
  sheetIds: string[];
  packageIds: string[];
  companyIds: string[];
  leetcodeUrl?: string;
  youtubeUrl?: string;
  notesUrl?: string;
  editorialUrl?: string;
  hint?: string;
  estimatedTime: string;
  statement?: string;
}

/** Per-student state for a shared question. */
export interface StudentQuestionProgress {
  questionId: string;
  status: "not_started" | "in_progress" | "completed";
  markedForRevision: boolean;
  /** Manual completion NEVER contributes to verification. */
  completedAt?: string;
}

export interface QuestionWithProgress extends BankQuestion {
  progress: StudentQuestionProgress;
}

/** One step of the verification challenge (new / unseen problems). */
export interface VerificationChallengeQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  concepts: string[];
  prompt: string;
}

export interface VivaQuestion {
  id: string;
  question: string;
  intent: string;
}

export interface VerificationBlueprint {
  topicId: string;
  topicName: string;
  evaluatedOn: string[];
  conceptsCovered: string[];
  challenge: VerificationChallengeQuestion[];
  viva: VivaQuestion[];
  estimatedMinutes: number;
}
