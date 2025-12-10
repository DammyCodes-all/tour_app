import { useState, useEffect } from "react";
import { getTours, getAllToursAnalytics } from "@/lib/supabase/queries";
import { createTourInDb, updateTourInDb, deleteTourInDb } from "@/lib/supabase/mutations";
import { Tour, TourStep } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const useUserTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const fetchedTours = await getTours();
      const allToursAnalyticsMap = await getAllToursAnalytics(); // Fetch all analytics

      const completeTours = fetchedTours.map(tour => {
        const completeTour = {
          ...tour,
          steps: tour.tour_steps || [], // Map tour_steps to steps
          analytics: allToursAnalyticsMap[tour.id] || { // Merge fetched analytics or default
            tourId: tour.id,
            starts: 0,
            completions: 0,
            dropOffs: {},
            skips: 0,
          },
        };
        // Clean up the original tour_steps property if it exists, to match Tour interface
        delete (completeTour as any).tour_steps;
        return completeTour;
      });
      setTours(completeTours);
      setLoading(false);
    };
    fetchTours();
  }, []);

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

  const createTour = async (title: string, description: string) => {
    const newTour = await createTourInDb(title, description);
    if (newTour) {
      // Manually add steps and analytics to the new tour object
      const completeNewTour = {
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
      setTours([...tours, completeNewTour]);
    }
  };

  const updateTour = async (updatedTour: Tour) => {
    const result = await updateTourInDb(updatedTour.id, updatedTour.title, updatedTour.description);
    if (result) {
      setTours(
        tours.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour))
      );
    }
  };

  const deleteTour = async () => {
    if (tourToDelete) {
      const success = await deleteTourInDb(tourToDelete);
      if (success) {
        setTours(tours.filter((tour) => tour.id !== tourToDelete));
        closeDeleteConfirm();
      }
    }
  };
  
  const addStep = (tourId: string, step: Omit<TourStep, "id">) => {
    const newStep = { ...step, id: uuidv4() };
    const updatedTours = tours.map((tour) => {
      if (tour.id === tourId) {
        return { ...tour, steps: [...tour.steps, newStep] };
      }
      return tour;
    });
    setTours(updatedTours);
    if(editingTour?.id === tourId) {
      setEditingTour(updatedTours.find(t => t.id === tourId) || null);
    }
  };

  const updateStep = (tourId: string, updatedStep: TourStep) => {
    const updatedTours = tours.map((tour) => {
      if (tour.id === tourId) {
        return {
          ...tour,
          steps: tour.steps.map((step) =>
            step.id === updatedStep.id ? updatedStep : step
          ),
        };
      }
      return tour;
    });
    setTours(updatedTours);
    if(editingTour?.id === tourId) {
      setEditingTour(updatedTours.find(t => t.id === tourId) || null);
    }
  };

  const deleteStep = (tourId: string, stepId: string) => {
    const updatedTours = tours.map((tour) => {
      if (tour.id === tourId) {
        return { ...tour, steps: tour.steps.filter((step) => step.id !== stepId) };
      }
      return tour;
    });
    setTours(updatedTours);
    if(editingTour?.id === tourId) {
      setEditingTour(updatedTours.find(t => t.id === tourId) || null);
    }
  };

  return {
    tours,
    loading,
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
