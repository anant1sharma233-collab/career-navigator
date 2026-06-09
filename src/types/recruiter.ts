export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  college: string;
  branch: string;
  graduationYear: number;
  readiness: number;
  skills: string[];
  matchScore?: number;
}

export interface RecruiterJob {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "Full-time" | "Internship" | "Part-time";
  skills: string[];
  applicants: number;
  status: "Open" | "Closed" | "Draft";
  postedAt: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  scheduledAt: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  round: string;
}
