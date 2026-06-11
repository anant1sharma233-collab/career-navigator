/**
 * projectService — single source of truth for Projects backend I/O.
 *
 * All Projects pages/components consume these methods (via the `useProjects`
 * hook). When the real backend ships, swap the mock data fetchers here for
 * `apiClient` calls aligned to the StudentPlatform_ProjectDoc endpoints:
 *
 *   GET  /api/projects             -> getStacks()
 *   GET  /api/projects/{tech}      -> getRoadmap(stackId) / getTopicsByStack
 *   POST /api/projects/submit      -> submitProject(payload)
 *   GET  /api/projects/{id}/review -> getProjectFeedback(id)
 *   POST /api/projects/topic/{id}/complete -> markTopicComplete(id)
 *   GET  /api/projects/{tech}/progress     -> getProgress(stackId)
 *
 * The exported DTO shapes (see @/types/projects) are the public contract —
 * keep them stable across backend revisions to insulate the UI.
 */
import type {
  Contributor,
  ProjectFeedback,
  ProjectProgress,
  ProjectSubmission,
  ProjectSuggestion,
  Roadmap,
  RoadmapTopic,
  StackId,
  TechStack,
} from "@/types/projects";

// Toggle to false once a real backend is wired in.
const USE_MOCK = true;

const delay = <T,>(value: T, ms = 350) => new Promise<T>((r) => setTimeout(() => r(value), ms));

// ============== MOCK DATA ==============
const STACKS: TechStack[] = [
  {
    id: "mern", name: "MERN Stack",
    shortDescription: "MongoDB · Express · React · Node — full-stack JavaScript.",
    difficulty: "Intermediate", estimatedDuration: "12 weeks", progress: 42,
    accent: "from-emerald-500 to-cyan-500", icon: "⚛️",
  },
  {
    id: "aspnet", name: "ASP.NET",
    shortDescription: "Build enterprise APIs and web apps with C# and .NET.",
    difficulty: "Intermediate", estimatedDuration: "10 weeks", progress: 12,
    accent: "from-violet-500 to-indigo-500", icon: "🟣",
  },
  {
    id: "llm", name: "LLM Engineering",
    shortDescription: "RAG, prompt design, fine-tuning, and agentic systems.",
    difficulty: "Advanced", estimatedDuration: "8 weeks", progress: 0,
    accent: "from-fuchsia-500 to-pink-500", icon: "🧠",
  },
  {
    id: "ml", name: "Machine Learning",
    shortDescription: "From regression to deep learning — math + code.",
    difficulty: "Intermediate", estimatedDuration: "14 weeks", progress: 8,
    accent: "from-amber-500 to-orange-500", icon: "📊",
  },
  {
    id: "ai", name: "Applied AI",
    shortDescription: "Computer vision, NLP, and production AI pipelines.",
    difficulty: "Advanced", estimatedDuration: "10 weeks", progress: 0,
    accent: "from-sky-500 to-blue-500", icon: "🤖",
  },
];

const mernRoadmap: Roadmap = {
  stackId: "mern",
  stages: [
    {
      id: "s1", title: "Stage 1 · Web Basics",
      summary: "Master HTML, CSS, and modern JavaScript before frameworks.",
      topics: [
        { id: "html", name: "HTML5 Semantics", timeEstimate: "4h", description: "Tags, forms, accessibility.", videoLink: "#", notesLink: "#", completed: true },
        { id: "css", name: "CSS + Flex/Grid", timeEstimate: "8h", description: "Layouts, responsive design.", videoLink: "#", notesLink: "#", completed: true },
        { id: "js", name: "JavaScript ES6+", timeEstimate: "20h", description: "Closures, async, modules.", videoLink: "#", notesLink: "#" },
      ],
      projectSuggestions: ["portfolio", "todo"],
    },
    {
      id: "s2", title: "Stage 2 · Frontend Framework",
      summary: "React JS — components, hooks, state, routing.",
      topics: [
        { id: "react-basics", name: "React Fundamentals", timeEstimate: "12h", description: "JSX, props, state.", videoLink: "#", notesLink: "#" },
        { id: "react-hooks", name: "Hooks Deep Dive", timeEstimate: "8h", description: "useEffect, useMemo, custom hooks.", videoLink: "#", notesLink: "#" },
        { id: "react-router", name: "Routing & Data", timeEstimate: "6h", description: "Routing, TanStack Query.", videoLink: "#", notesLink: "#" },
      ],
      projectSuggestions: ["auth-app", "admin"],
    },
    {
      id: "s3", title: "Stage 3 · Backend Introduction",
      summary: "Node.js & Express — REST APIs, middleware.",
      topics: [
        { id: "node", name: "Node.js Runtime", timeEstimate: "6h", description: "Modules, event loop.", videoLink: "#", notesLink: "#" },
        { id: "express", name: "Express APIs", timeEstimate: "10h", description: "Routing, middleware, auth.", videoLink: "#", notesLink: "#" },
        { id: "auth", name: "JWT & Sessions", timeEstimate: "—", description: "Auth strategies.", comingSoon: true },
      ],
    },
    {
      id: "s4", title: "Stage 4 · Database",
      summary: "MongoDB — schemas, aggregations, indexes.",
      topics: [
        { id: "mongo", name: "MongoDB + Mongoose", timeEstimate: "8h", description: "CRUD, schemas.", videoLink: "#", notesLink: "#" },
        { id: "agg", name: "Aggregation Pipeline", timeEstimate: "—", description: "Advanced queries.", comingSoon: true },
      ],
    },
    {
      id: "s5", title: "Stage 5 · Industry Project",
      summary: "Ship a full-stack production app end to end.",
      topics: [
        { id: "industry", name: "Capstone: SaaS Dashboard", timeEstimate: "40h", description: "Auth, payments, deploys.", videoLink: "#", notesLink: "#" },
      ],
      projectSuggestions: ["ecommerce", "chat", "industry-fullstack"],
    },
  ],
};

const ROADMAPS: Partial<Record<StackId, Roadmap>> = { mern: mernRoadmap };

const SUGGESTIONS: ProjectSuggestion[] = [
  { id: "portfolio", title: "Portfolio Website", difficulty: "Beginner", skills: ["HTML", "CSS", "JS"], estimatedTime: "1 week", recommendedAfter: "Web Basics", description: "Personal portfolio showcasing projects." },
  { id: "todo", title: "Todo App", difficulty: "Beginner", skills: ["React"], estimatedTime: "3 days", recommendedAfter: "React Basics", description: "CRUD app with local persistence." },
  { id: "auth-app", title: "Authentication App", difficulty: "Intermediate", skills: ["React", "Node", "JWT"], estimatedTime: "1 week", recommendedAfter: "Express APIs", description: "Sign up / login / protected routes." },
  { id: "admin", title: "Admin Dashboard", difficulty: "Intermediate", skills: ["React", "Charts"], estimatedTime: "2 weeks", recommendedAfter: "React Hooks", description: "Analytics dashboard with charts." },
  { id: "ecommerce", title: "E-commerce Mini", difficulty: "Intermediate", skills: ["MERN"], estimatedTime: "3 weeks", recommendedAfter: "MongoDB", description: "Cart, checkout, orders." },
  { id: "chat", title: "Real-time Chat", difficulty: "Advanced", skills: ["Socket.io", "Node"], estimatedTime: "2 weeks", recommendedAfter: "Express APIs", description: "Rooms, presence, typing indicators." },
  { id: "industry-fullstack", title: "Industry Fullstack App", difficulty: "Advanced", skills: ["MERN", "CI/CD"], estimatedTime: "4 weeks", recommendedAfter: "Capstone", description: "Production-grade SaaS clone." },
];

const PROGRESS: Record<StackId, ProjectProgress> = {
  mern: { stackId: "mern", rank: 124, rankLabel: "#124 / 4,213", overallProgress: 42, topicsCompleted: 8, topicsTotal: 19, streakDays: 12, nextTopic: "JavaScript ES6+" },
  aspnet: { stackId: "aspnet", rank: 980, rankLabel: "#980 / 2,104", overallProgress: 12, topicsCompleted: 2, topicsTotal: 16, streakDays: 3, nextTopic: "C# Basics" },
  llm: { stackId: "llm", rank: 0, rankLabel: "Unranked", overallProgress: 0, topicsCompleted: 0, topicsTotal: 12, streakDays: 0, nextTopic: "Prompt Engineering" },
  ml: { stackId: "ml", rank: 1450, rankLabel: "#1450 / 3,002", overallProgress: 8, topicsCompleted: 1, topicsTotal: 18, streakDays: 1, nextTopic: "Linear Regression" },
  ai: { stackId: "ai", rank: 0, rankLabel: "Unranked", overallProgress: 0, topicsCompleted: 0, topicsTotal: 14, streakDays: 0, nextTopic: "CV Fundamentals" },
};

const CONTRIBUTORS: Contributor[] = [
  { name: "Hitesh Choudhary", title: "Founder, Chai aur Code" },
  { name: "Akshay Saini", title: "Namaste JavaScript" },
  { name: "Striver", title: "TakeUForward" },
  { name: "Harkirat Singh", title: "100xDevs" },
  { name: "Kunal Kushwaha", title: "DSA Bootcamp" },
  { name: "Sanket Singh", title: "ex-Google" },
  { name: "Piyush Garg", title: "FullStack Mentor" },
  { name: "Aman Dhattarwal", title: "ApnaCollege" },
  { name: "Love Babbar", title: "CodeHelp" },
  { name: "Anuj Bhaiya", title: "Frontend Mentor" },
];

// ============== PUBLIC API ==============

export const projectService = {
  /** Fetch all available tech tracks. */
  async getStacks(): Promise<TechStack[]> {
    if (USE_MOCK) return delay(STACKS);
    // const { data } = await apiClient.get<TechStack[]>("/projects");
    // return data;
    throw new Error("Not implemented");
  },

  /** Fetch the full multi-stage roadmap for a stack. */
  async getRoadmap(stackId: StackId): Promise<Roadmap> {
    if (USE_MOCK) {
      const r = ROADMAPS[stackId];
      if (r) return delay(r);
      return delay({
        stackId,
        stages: [
          {
            id: "soon", title: "Roadmap launching soon",
            summary: "We're polishing this roadmap with industry mentors.",
            topics: [{ id: "soon-1", name: "Curriculum drop", timeEstimate: "—", description: "Stay tuned.", comingSoon: true }],
          },
        ],
      });
    }
    throw new Error("Not implemented");
  },

  /** Flat topic list for a stack (useful for progress / next-up). */
  async getTopicsByStack(stackId: StackId): Promise<RoadmapTopic[]> {
    const roadmap = await this.getRoadmap(stackId);
    return roadmap.stages.flatMap((s) => s.topics);
  },

  /** Submit a built project for AI feedback. */
  async submitProject(payload: ProjectSubmission): Promise<ProjectFeedback> {
    if (USE_MOCK) {
      const score = Math.min(100, 60 + Math.round(payload.completion * 0.35));
      return delay<ProjectFeedback>({
        id: `fb-${Date.now()}`,
        projectName: payload.projectName,
        stackId: payload.stackId,
        completion: payload.completion,
        repoUrl: payload.repoUrl,
        score,
        feedback:
          "Strong commit hygiene and a clean component split. Consider extracting more shared hooks and tightening loading states. Add integration tests around the auth flow before shipping.",
        strengths: ["Clean component architecture", "Readable commit history", "Responsive layout"],
        improvements: ["Add unit tests", "Improve error boundaries", "Document setup in README"],
        nextProject: "admin",
      }, 900);
    }
    throw new Error("Not implemented");
  },

  /** Retrieve previously generated AI feedback. */
  async getProjectFeedback(_projectId: string): Promise<ProjectFeedback | null> {
    if (USE_MOCK) return delay(null);
    throw new Error("Not implemented");
  },

  /** Toggle topic completion status. */
  async markTopicComplete(topicId: string, completed: boolean): Promise<{ topicId: string; completed: boolean }> {
    if (USE_MOCK) return delay({ topicId, completed });
    throw new Error("Not implemented");
  },

  /** Aggregate progress and ranking for a stack. */
  async getProgress(stackId: StackId): Promise<ProjectProgress> {
    if (USE_MOCK) return delay(PROGRESS[stackId]);
    throw new Error("Not implemented");
  },

  /** Curated project suggestions surfaced after key topics. */
  async getProjectSuggestions(): Promise<ProjectSuggestion[]> {
    if (USE_MOCK) return delay(SUGGESTIONS);
    throw new Error("Not implemented");
  },

  /** Footer credits roll. */
  async getContributors(): Promise<Contributor[]> {
    if (USE_MOCK) return delay(CONTRIBUTORS);
    throw new Error("Not implemented");
  },
};

export type ProjectService = typeof projectService;
