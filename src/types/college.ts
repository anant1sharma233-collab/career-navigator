export interface CollegeStudent {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  branch: string;
  year: number;
  readiness: number;
  placed: boolean;
}

export interface Cohort {
  id: string;
  name: string;
  year: number;
  branch: string;
  studentCount: number;
  averageReadiness: number;
  placementRate: number;
}

export interface CollegeAnalytics {
  totalStudents: number;
  averageReadiness: number;
  placementRate: number;
  topRecruiters: string[];
  readinessTrend: { month: string; value: number }[];
}
