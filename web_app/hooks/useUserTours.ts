import { useState, useEffect, useCallback } from "react";
import { getTours, getAllToursAnalytics } from "@/lib/supabase/queries";
import {
  createTourInDb,
  updateTourInDb,
  deleteTourInDb,
  addStepToDb,
  updateStepInDb,
  deleteStepInDb,
} from "@/lib/supabase/mutations";
import { useAuth } from "@/context/AuthProvider";
import { Tour, TourStep, TourAnalytics } from "@/lib/types";
import { toast } from "sonner";

// --- Helper Functions ---

const mergeToursWithAnalytics = (
  tours: Tour[],
  analyticsMap: Record<string, TourAnalytics>
): Tour[] => {
  return tours.map((tour) => ({
    ...tour, // `tour` already has a `steps` property from `getTours`
    analytics: analyticsMap[tour.id] || {
      tourId: tour.id,
      starts: 0,
      completions: 0,
      dropOffs: {},
      skips: 0,
    },
  }));
};

// --- Hook ---

export const useUserTours = () => {
  // --- State ---

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);
  const { session } = useAuth();
  const userId = session?.user?.id;

  // --- Data Fetching ---

  const fetchToursAndAnalytics = useCallback(async () => {
    if (!userId) {
      setTours([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // 1. Fetch tours for the user (already includes steps)
      const fetchedTours = await getTours(userId);
      
      // 2. If tours exist, fetch their analytics
      if (fetchedTours && fetchedTours.length > 0) {
        const tourIds = fetchedTours.map(t => t.id);
        const allToursAnalyticsMap = await getAllToursAnalytics(tourIds);
        
        // 3. Merge the results
        const completeTours = mergeToursWithAnalytics(
          fetchedTours,
          allToursAnalyticsMap
        );
        setTours(completeTours);
      } else {
        // No tours found, set state to empty
        setTours([]);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error(errorMessage || "Failed to load tours.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchToursAndAnalytics();
  }, [fetchToursAndAnalytics]);

  // --- Modal Handlers ---

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (tour: Tour) => setEditingTour(tour);
  const closeEditModal = () => setEditingTour(null);

  const openDeleteConfirm = (tourId: string) => {
    setIsDeleteConfirmOpen(true);
    setTourToDelete(tourId);
  };
  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setTourToDelete(null);
  };

  // --- CRUD Operations ---

  const createTour = async (title: string, description: string) => {
    if (!session?.user) {
      toast.error("You must be logged in to create a tour.");
      return;
    }
    try {
      const newTour = await createTourInDb(title, description, session.user.id);
      if (newTour) {
        const completeNewTour: Tour = {
          ...newTour,
          steps: [],
          analytics: {
            tourId: newTour.id,
            starts: 0,
            completions: 0,
            dropOffs: {},
            skips: 0,
          },
        };
        setTours((prevTours) => [...prevTours, completeNewTour]);
        return completeNewTour;
      }
    } catch (error) {
      toast.error("Failed to create tour.");
    }
  };

  const updateTour = async (updatedTour: Tour) => {
    try {
      const result = await updateTourInDb(
        updatedTour.id,
        updatedTour.title || "",
        updatedTour.description || ""
      );
      if (result) {
        setTours(
          tours.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour))
        );
      }
    } catch (error) {
      toast.error("Failed to update tour.");
    }
  };

  const deleteTour = async () => {
    if (!tourToDelete) return;
    try {
      const success = await deleteTourInDb(tourToDelete);
      if (success) {
        setTours(tours.filter((tour) => tour.id !== tourToDelete));
        closeDeleteConfirm();
      }
    } catch (error) {
      toast.error("Failed to delete tour.");
    }
  };

  const addStep = async (tourId: string, stepData: Omit<TourStep, "id" | "step_number" | "step_id">) => {
    try {
      const tourIndex = tours.findIndex((t) => t.id === tourId);
      if (tourIndex === -1) return;

      const tour = tours[tourIndex];
      const step_number = (tour.steps?.length || 0) + 1;
      const newStep = await addStepToDb(tourId, stepData, step_number);

      if (newStep) {
        const updatedSteps = [...(tour.steps || []), newStep];
        const updatedTour = { ...tour, steps: updatedSteps };
        
        const newTours = [...tours];
        newTours[tourIndex] = updatedTour;

        setTours(newTours);
        if (editingTour?.id === tourId) {
          setEditingTour(updatedTour);
        }
      }
    } catch (error) {
      toast.error("Failed to add step.");
    }
  };

  const updateStep = async (tourId: string, updatedStep: TourStep) => {
    try {
      const result = await updateStepInDb(updatedStep);
      if (result) {
        const tourIndex = tours.findIndex((t) => t.id === tourId);
        if (tourIndex === -1) return;

        const tour = tours[tourIndex];
        const updatedSteps = (tour.steps || []).map((step) =>
          step.id === updatedStep.id ? updatedStep : step
        );
        const updatedTour = { ...tour, steps: updatedSteps };
        
        const newTours = [...tours];
        newTours[tourIndex] = updatedTour;

        setTours(newTours);
        if (editingTour?.id === tourId) {
          setEditingTour(updatedTour);
        }
      }
    } catch (error) {
      toast.error("Failed to update step.");
    }
  };

  const deleteStep = async (tourId: string, stepId: string) => {
    try {
      const success = await deleteStepInDb(stepId);
      if (success) {
        const tourIndex = tours.findIndex((t) => t.id === tourId);
        if (tourIndex === -1) return;
        
        const tour = tours[tourIndex];
        const updatedSteps = (tour.steps || []).filter((step) => step.id !== stepId);
        const updatedTour = { ...tour, steps: updatedSteps };

        const newTours = [...tours];
        newTours[tourIndex] = updatedTour;

        setTours(newTours);
        if (editingTour?.id === tourId) {
          setEditingTour(updatedTour);
        }
      }
    } catch (error) {
      toast.error("Failed to delete step.");
    }
  };

  // --- Return Values ---

  return {
    tours,
    loading,
    error,
    editingTour,
    isAddModalOpen,
    isDeleteConfirmOpen,
    tourToDelete,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    createTour,
    updateTour,
    deleteTour,
    addStep,
    updateStep,
    deleteStep,
  };
};
