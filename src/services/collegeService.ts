import type { CollegeStudent, Cohort, CollegeAnalytics } from "@/types/college";

const STUDENTS: CollegeStudent[] = [
  { id: "s1", name: "Anant Kumar", email: "anant@col.edu", rollNumber: "21CS001", branch: "CSE", year: 4, readiness: 86, placed: true },
  { id: "s2", name: "Priya Sharma", email: "priya@col.edu", rollNumber: "21CS012", branch: "CSE", year: 4, readiness: 79, placed: true },
  { id: "s3", name: "Rohit Verma", email: "rohit@col.edu", rollNumber: "21EC020", branch: "ECE", year: 4, readiness: 64, placed: false },
  { id: "s4", name: "Sara Khan", email: "sara@col.edu", rollNumber: "22CS108", branch: "CSE", year: 3, readiness: 52, placed: false },
  { id: "s5", name: "Vikram Singh", email: "vikram@col.edu", rollNumber: "22IT045", branch: "IT", year: 3, readiness: 71, placed: false },
];

const COHORTS: Cohort[] = [
  { id: "c1", name: "CSE 2025", year: 2025, branch: "CSE", studentCount: 180, averageReadiness: 74, placementRate: 89 },
  { id: "c2", name: "ECE 2025", year: 2025, branch: "ECE", studentCount: 120, averageReadiness: 62, placementRate: 71 },
  { id: "c3", name: "IT 2026", year: 2026, branch: "IT", studentCount: 95, averageReadiness: 58, placementRate: 0 },
];

const ANALYTICS: CollegeAnalytics = {
  totalStudents: 1240,
  averageReadiness: 68,
  placementRate: 82,
  topRecruiters: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"],
  readinessTrend: [
    { month: "Jan", value: 54 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 61 },
    { month: "Apr", value: 63 },
    { month: "May", value: 66 },
    { month: "Jun", value: 68 },
  ],
};

export const collegeService = {
  async getStudents() {
    await new Promise((r) => setTimeout(r, 200));
    return STUDENTS;
  },
  async getCohorts() {
    await new Promise((r) => setTimeout(r, 200));
    return COHORTS;
  },
  async getAnalytics() {
    await new Promise((r) => setTimeout(r, 200));
    return ANALYTICS;
  },
};
