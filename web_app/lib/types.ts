export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive";
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "draft" | "published";
  steps: TourStep[];
  analytics: TourAnalytics;
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
}

export interface TourAnalytics {
  tourId: string;
  starts: number;
  completions: number;
  dropOffs: Record<string, number>; // Key is stepId
  skips: number;
}

