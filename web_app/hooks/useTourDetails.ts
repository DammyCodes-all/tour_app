import { useState, useEffect } from "react";
import { Tour, TourStep } from "@/lib/types";
import { getTourById, getTourAnalytics } from "@/lib/supabase/queries";
import {
  addStepToDb,
  updateStepInDb,
  deleteStepInDb,
} from "@/lib/supabase/mutations";
import { toast } from "sonner";

export const useTourDetails = (tourId: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteStepConfirmOpen, setIsDeleteStepConfirmOpen] = useState(false); // New state
  const [stepToDeleteId, setStepToDeleteId] = useState<string | null>(null); // New state

  useEffect(() => {
    const fetchTourDetails = async () => {
      setLoading(true);
      setError(null);
      const foundTour = await getTourById(tourId);
      if (foundTour) {
        const analytics = await getTourAnalytics(foundTour.id); // Fetch analytics
        const completeTour = {
          ...foundTour,
          steps: foundTour.steps || [],
          analytics: analytics || {
            // Use fetched analytics or default
            tourId: foundTour.id,
            starts: 0,
            completions: 0,
            dropOffs: {},
            skips: 0,
          },
        };
        setTour(completeTour);
        toast.success("Tour details loaded successfully!");
      } else {
        setError("Tour not found.");
        toast.error("Tour not found!");
      }
      setLoading(false);
    };

    if (tourId) {
      fetchTourDetails();
    }
  }, [tourId]);

  const openDeleteStepConfirm = (stepId: string) => {
    // New function
    setStepToDeleteId(stepId);
    setIsDeleteStepConfirmOpen(true);
  };
  const closeDeleteStepConfirm = () => {
    // New function
    setStepToDeleteId(null);
    setIsDeleteStepConfirmOpen(false);
  };

  const addStep = async (
    stepData: Omit<TourStep, "id" | "step_number" | "step_id">
  ) => {
    if (!tour) return;
    const step_number = tour.steps?.length ?? 0 + 1;
    const newStep = await addStepToDb(tour.id, stepData, step_number);

    if (newStep) {
      const updatedTour = { ...tour, steps: [...(tour.steps ?? []), newStep] };
      setTour(updatedTour);
    }
  };

  const editStep = async (updatedStep: TourStep) => {
    if (!tour) return;
    const result = await updateStepInDb(updatedStep);
    if (result) {
      const updatedTour = {
        ...tour,
        steps: tour.steps?.map((step) =>
          step.id === updatedStep.id ? updatedStep : step
        ),
      };
      setTour(updatedTour);
    }
  };

  const confirmDeleteStep = async () => {
    // Modified deleteStep
    if (!tour || !stepToDeleteId) return;
    const success = await deleteStepInDb(stepToDeleteId);
    if (success) {
      const updatedTour = {
        ...tour,
        steps: tour.steps?.filter((step) => step.id !== stepToDeleteId),
      };
      setTour(updatedTour);
      closeDeleteStepConfirm();
    }
  };

  return {
    tour,
    loading,
    error,
    addStep,
    editStep,
    // Original deleteStep replaced by openDeleteStepConfirm and confirmDeleteStep
    openDeleteStepConfirm,
    closeDeleteStepConfirm,
    isDeleteStepConfirmOpen,
    stepToDeleteId,
    confirmDeleteStep,
  };
};
