export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive";
}

export interface Tour {
  id: string;
  title: string; // Changed from name
  description: string;
  created_at: string; // Changed from createdAt
  is_published: boolean;
  steps: TourStep[];
  analytics?: TourAnalytics; // Made optional as it's not in the DB
}

export interface TourStep {
  id: string;
  title: string;
  content: string; // Changed from description
  target_selector?: string; // Changed from targetElement
  step_number: number;
  step_id: string;
}

export interface TourAnalytics {
  tourId: string;
  starts: number;
  completions: number;
  dropOffs: Record<string, number>; // Key is step_id
  skips: number;
}

