import type { Candidate, RecruiterJob, Interview } from "@/types/recruiter";

const CANDIDATES: Candidate[] = [
  { id: "c1", name: "Anant Kumar", email: "anant@prepforge.dev", college: "IIT Delhi", branch: "CSE", graduationYear: 2025, readiness: 86, skills: ["React", "Node", "DSA", "System Design"], matchScore: 94 },
  { id: "c2", name: "Priya Sharma", email: "priya@prepforge.dev", college: "BITS Pilani", branch: "CSE", graduationYear: 2025, readiness: 79, skills: ["Python", "ML", "TensorFlow"], matchScore: 81 },
  { id: "c3", name: "Rohit Verma", email: "rohit@prepforge.dev", college: "NIT Trichy", branch: "ECE", graduationYear: 2025, readiness: 71, skills: ["C++", "Embedded", "DSA"], matchScore: 68 },
];

const JOBS: RecruiterJob[] = [
  { id: "j1", title: "Full Stack Engineer", description: "Build core product surfaces.", location: "Bangalore", type: "Full-time", skills: ["React", "Node", "Postgres"], applicants: 124, status: "Open", postedAt: "2026-05-12" },
  { id: "j2", title: "ML Engineer Intern", description: "Work on ranking models.", location: "Remote", type: "Internship", skills: ["Python", "PyTorch"], applicants: 87, status: "Open", postedAt: "2026-05-20" },
  { id: "j3", title: "Backend Engineer", description: "Scale APIs to 1M users.", location: "Hyderabad", type: "Full-time", skills: ["Go", "Kafka"], applicants: 42, status: "Draft", postedAt: "2026-06-01" },
];

const INTERVIEWS: Interview[] = [
  { id: "i1", candidateId: "c1", candidateName: "Anant Kumar", jobTitle: "Full Stack Engineer", scheduledAt: "2026-06-12T10:00:00Z", status: "Scheduled", round: "Technical 1" },
  { id: "i2", candidateId: "c2", candidateName: "Priya Sharma", jobTitle: "ML Engineer Intern", scheduledAt: "2026-06-11T15:30:00Z", status: "Scheduled", round: "Phone Screen" },
];

export const recruiterService = {
  async getCandidates() {
    await new Promise((r) => setTimeout(r, 200));
    return CANDIDATES;
  },
  async getJobs() {
    await new Promise((r) => setTimeout(r, 200));
    return JOBS;
  },
  async getInterviews() {
    await new Promise((r) => setTimeout(r, 200));
    return INTERVIEWS;
  },
};
