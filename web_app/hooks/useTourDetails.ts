import { useState, useEffect } from "react";
import { Tour, TourStep } from "@/lib/types";
import { mockTours } from "@/lib/user-tours-mock-data"; 
import { generateId } from "@/lib/mockTourData";
import { toast } from "sonner";

export const useTourDetails = (tourId: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchTourDetails = setTimeout(() => {
      const foundTour = mockTours.find(t => t.id === tourId);
      if (foundTour) {
        setTour(foundTour);
        toast.success("Tour details loaded successfully!");
      } else {
        setError("Tour not found.");
        toast.error("Tour not found!");
      }
      setLoading(false);
    }, 500); 

    return () => clearTimeout(fetchTourDetails);
  }, [tourId]);

  const addStep = (newStepData: Omit<TourStep, "id">) => {
    if (!tour) return;
    const newStep: TourStep = { ...newStepData, id: generateId() };
    const updatedTour = { ...tour, steps: [...tour.steps, newStep] };
    setTour(updatedTour);
    toast.success("Step added successfully!");
  };

  const editStep = (updatedStep: TourStep) => {
    if (!tour) return;
    const updatedTour = {
      ...tour,
      steps: tour.steps.map((step) =>
        step.id === updatedStep.id ? updatedStep : step
      ),
    };
    setTour(updatedTour);
    toast.success("Step updated successfully!");
  };

  const deleteStep = (stepId: string) => {
    if (!tour) return;
    const updatedTour = {
      ...tour,
      steps: tour.steps.filter((step) => step.id !== stepId),
    };
    setTour(updatedTour);
    toast.success("Step deleted successfully!");
  };

  return {
    tour,
    loading,
    error,
    addStep,
    editStep,
    deleteStep,
  };
};