export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive";
}

export interface Tour {
  id: string;
  title?: string;
  description?: string;
  created_at?: string;
  is_published?: boolean;
  tour_steps?: TourStep[];
  steps?: TourStep[];
  status?: "draft" | "published";
  analytics?: TourAnalytics;
}

export interface TourStep {
  id: string;
  title: string;
  description?: string;
  content?: string;
  // selector can come as either name
  target_selector?: string;
  targetElement?: string;
  step_number?: number;
  step_id?: string;
  placement?: "auto" | "top" | "bottom" | "left" | "right" | string;
}

/**
 * Optional analytics shape
 */
export interface TourAnalytics {
  tourId: string;
  starts: number;
  completions: number;
  dropOffs: Record<string, number>;
  skips: number;
}
