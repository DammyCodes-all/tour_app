import { Tour, TourAnalytics, TourStep } from "./types";

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const mockSteps: TourStep[] = [
  {
    id: generateId(),
    title: "Welcome to the Dashboard",
    description: "This step introduces the main dashboard area.",
    targetElement: "#dashboard-main",
  },
  {
    id: generateId(),
    title: "Navigate to Tours",
    description: "Learn how to access the list of available tours.",
    targetElement: "#tours-nav-link",
  },
  {
    id: generateId(),
    title: "Create Your First Tour",
    description: "A guide to creating a new interactive tour.",
    targetElement: "#create-tour-button",
  },
  {
    id: generateId(),
    title: "Edit Tour Settings",
    description: "Customize various settings for your tour, such as name and description.",
    targetElement: "#edit-tour-settings",
  },
  {
    id: generateId(),
    title: "Publish Your Tour",
    description: "Make your tour live for your users to experience.",
    targetElement: "#publish-tour-button",
  },
  {
    id: generateId(),
    title: "Review Analytics",
    description: "Check the performance and engagement of your published tours.",
    targetElement: "#analytics-tab",
  },
];

const mockTourId = generateId();

export const mockTourDetails: Tour = {
  id: mockTourId,
  name: "Getting Started with TourApp",
  description: "A comprehensive guide to using the TourApp dashboard features.",
  createdAt: new Date().toISOString(),
  status: "published",
  steps: mockSteps,
  analytics: {
    tourId: mockTourId,
    starts: 1250,
    completions: 800,
    dropOffs: {
      [mockSteps[0].id]: 50,
      [mockSteps[1].id]: 100,
      [mockSteps[2].id]: 75,
      [mockSteps[3].id]: 25,
      [mockSteps[4].id]: 10,
    },
    skips: 150,
  },
};

