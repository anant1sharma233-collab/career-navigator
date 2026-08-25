/**
 * Shared question bank.
 *
 * ONE question record is reused by the Sheet-wise, Package-wise and
 * Company-wise views (via sheetIds / packageIds / companyIds). No duplication.
 * Student-specific state lives in StudentQuestionProgress, never here.
 */
import { apiClient } from "./apiClient";
import type { BankQuestion, QuestionWithProgress, StudentQuestionProgress } from "@/types/verification";

const Q = (q: BankQuestion) => q;

const QUESTIONS: BankQuestion[] = [
  Q({
    id: "q-two-sum", title: "Two Sum", slug: "two-sum", topic: "arrays", subtopic: "Hashing",
    difficulty: "Easy", concepts: ["Traversal", "Hashing"], sheetIds: ["dsa-core"],
    packageIds: ["4-7", "7-12"], companyIds: ["amazon", "microsoft", "google"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    youtubeUrl: "https://youtu.be/KLlXCFG5TnA", notesUrl: "/notes/arrays/two-sum",
    editorialUrl: "https://leetcode.com/problems/two-sum/editorial/",
    hint: "Store each seen value in a hash map with its index, then look for target - current.",
    estimatedTime: "15 min",
    statement: "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
  }),
  Q({
    id: "q-max-subarray", title: "Maximum Subarray", slug: "maximum-subarray", topic: "arrays", subtopic: "Kadane",
    difficulty: "Medium", concepts: ["Kadane", "Prefix Sum"], sheetIds: ["dsa-core"],
    packageIds: ["7-12", "12-20"], companyIds: ["amazon", "microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    youtubeUrl: "https://youtu.be/AHZpyENo7k4", notesUrl: "/notes/arrays/kadane",
    hint: "Track the best sum ending at the current index; reset when it drops below zero.",
    estimatedTime: "20 min",
    statement: "Find the contiguous subarray with the largest sum and return its sum.",
  }),
  Q({
    id: "q-container-water", title: "Container With Most Water", slug: "container-with-most-water", topic: "arrays",
    subtopic: "Two Pointer", difficulty: "Medium", concepts: ["Two Pointer", "Greedy"], sheetIds: ["dsa-core"],
    packageIds: ["7-12", "12-20"], companyIds: ["amazon", "google"],
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    youtubeUrl: "https://youtu.be/UuiTKBwPgAo",
    hint: "Move the pointer at the shorter line inward — the taller one can never improve.",
    estimatedTime: "20 min",
    statement: "Given heights, find two lines that together with the x-axis hold the most water.",
  }),
  Q({
    id: "q-longest-substring", title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters", topic: "arrays", subtopic: "Sliding Window",
    difficulty: "Medium", concepts: ["Sliding Window", "Hashing"], sheetIds: ["dsa-core"],
    packageIds: ["7-12", "12-20", "20-plus"], companyIds: ["amazon", "google", "microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    youtubeUrl: "https://youtu.be/qtVh-XEpsJo", notesUrl: "/notes/arrays/sliding-window",
    hint: "Expand the window; when a duplicate appears, shrink from the left past its last index.",
    estimatedTime: "25 min",
    statement: "Return the length of the longest substring without repeating characters.",
  }),
  Q({
    id: "q-subarray-sum-k", title: "Subarray Sum Equals K", slug: "subarray-sum-equals-k", topic: "arrays",
    subtopic: "Prefix Sum", difficulty: "Medium", concepts: ["Prefix Sum", "Hashing"], sheetIds: ["dsa-core"],
    packageIds: ["12-20"], companyIds: ["amazon", "google"],
    leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
    hint: "Count prefix sums seen so far; the answer at index i uses prefix[i] - k.",
    estimatedTime: "25 min",
    statement: "Count the number of contiguous subarrays whose sum equals k.",
  }),
  Q({
    id: "q-sort-colors", title: "Sort Colors", slug: "sort-colors", topic: "arrays", subtopic: "Sorting",
    difficulty: "Medium", concepts: ["Sorting", "Two Pointer"], sheetIds: ["dsa-core"],
    packageIds: ["4-7", "7-12"], companyIds: ["microsoft", "tcs"],
    leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
    notesUrl: "/notes/arrays/dutch-national-flag",
    hint: "Dutch national flag: keep low, mid and high pointers in one pass.",
    estimatedTime: "20 min",
    statement: "Sort an array containing only 0s, 1s and 2s in a single pass.",
  }),
  Q({
    id: "q-search-rotated", title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array",
    topic: "binary-search", subtopic: "Binary Search", difficulty: "Medium",
    concepts: ["Binary Search", "Traversal"], sheetIds: ["dsa-core"], packageIds: ["7-12", "12-20"],
    companyIds: ["amazon", "microsoft", "google"],
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    youtubeUrl: "https://youtu.be/r3pMQ8-Ad5s",
    hint: "One half is always sorted — decide which half the target belongs to.",
    estimatedTime: "25 min",
    statement: "Search a target in a rotated sorted array in O(log n).",
  }),
  Q({
    id: "q-reverse-string", title: "Reverse String", slug: "reverse-string", topic: "strings",
    difficulty: "Easy", concepts: ["Two Pointer", "Traversal"], sheetIds: ["dsa-core"],
    packageIds: ["4-7"], companyIds: ["tcs", "infosys"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-string/",
    hint: "Swap from both ends until the pointers cross.",
    estimatedTime: "10 min",
    statement: "Reverse a character array in place.",
  }),
  Q({
    id: "q-valid-anagram", title: "Valid Anagram", slug: "valid-anagram", topic: "strings",
    difficulty: "Easy", concepts: ["Hashing", "Sorting"], sheetIds: ["dsa-core"],
    packageIds: ["4-7", "7-12"], companyIds: ["tcs", "accenture", "amazon"],
    leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
    notesUrl: "/notes/strings/anagram",
    hint: "Compare character frequency maps, or compare sorted strings.",
    estimatedTime: "10 min",
    statement: "Check whether two strings are anagrams of each other.",
  }),
  Q({
    id: "q-number-of-islands", title: "Number of Islands", slug: "number-of-islands", topic: "graphs",
    difficulty: "Medium", concepts: ["Traversal", "Greedy"], sheetIds: ["dsa-core"],
    packageIds: ["12-20", "20-plus"], companyIds: ["amazon", "google", "microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    youtubeUrl: "https://youtu.be/__98uL6wst8",
    hint: "Flood-fill each unvisited land cell and count how many fills you start.",
    estimatedTime: "30 min",
    statement: "Count the number of islands in a 2D grid of land and water.",
  }),
];

/** Deterministic mock of the student's own progress. */
const PROGRESS: Record<string, StudentQuestionProgress> = {
  "q-two-sum": { questionId: "q-two-sum", status: "completed", markedForRevision: false, completedAt: "2026-08-02" },
  "q-max-subarray": { questionId: "q-max-subarray", status: "completed", markedForRevision: true, completedAt: "2026-08-04" },
  "q-container-water": { questionId: "q-container-water", status: "completed", markedForRevision: false, completedAt: "2026-08-06" },
  "q-longest-substring": { questionId: "q-longest-substring", status: "in_progress", markedForRevision: false },
  "q-subarray-sum-k": { questionId: "q-subarray-sum-k", status: "not_started", markedForRevision: false },
  "q-sort-colors": { questionId: "q-sort-colors", status: "completed", markedForRevision: false, completedAt: "2026-08-08" },
  "q-search-rotated": { questionId: "q-search-rotated", status: "not_started", markedForRevision: true },
  "q-reverse-string": { questionId: "q-reverse-string", status: "completed", markedForRevision: false, completedAt: "2026-07-28" },
  "q-valid-anagram": { questionId: "q-valid-anagram", status: "completed", markedForRevision: false, completedAt: "2026-07-29" },
  "q-number-of-islands": { questionId: "q-number-of-islands", status: "not_started", markedForRevision: false },
};

function withProgress(q: BankQuestion): QuestionWithProgress {
  return {
    ...q,
    progress: PROGRESS[q.id] ?? { questionId: q.id, status: "not_started", markedForRevision: false },
  };
}

async function safe<T>(live: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await live();
  } catch {
    return fallback;
  }
}

export interface QuestionFilter {
  topicId?: string;
  sheetId?: string;
  packageId?: string;
  companyId?: string;
}

export const questionBank = {
  /** Same underlying records, filtered per view (sheet / package / company / topic). */
  list: (filter: QuestionFilter = {}) =>
    safe(
      async () => (await apiClient.get<QuestionWithProgress[]>("/dsa/questions", { params: filter })).data,
      QUESTIONS.filter(
        (q) =>
          (!filter.topicId || q.topic === filter.topicId) &&
          (!filter.sheetId || q.sheetIds.includes(filter.sheetId)) &&
          (!filter.packageId || q.packageIds.includes(filter.packageId)) &&
          (!filter.companyId || q.companyIds.includes(filter.companyId)),
      ).map(withProgress),
    ),

  /**
   * Manual completion / revision toggle.
   * IMPORTANT: affects Learning Progress only — never verification.
   */
  setProgress: async (questionId: string, patch: Partial<StudentQuestionProgress>) => {
    const current = PROGRESS[questionId] ?? { questionId, status: "not_started" as const, markedForRevision: false };
    PROGRESS[questionId] = { ...current, ...patch };
    await safe(async () => (await apiClient.post(`/dsa/questions/${questionId}/progress`, patch)).data, undefined);
    return PROGRESS[questionId];
  },
};
