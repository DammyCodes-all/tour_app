"use client";

import { useState } from "react";
import { mockTours } from "@/lib/user-tours-mock-data";
import { Tour, TourStep } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const useUserTours = () => {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);

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

  const createTour = (name: string, description: string) => {
    const newTour: Tour = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
      status: "draft",
      steps: [],
      analytics: {
        tourId: "",
        starts: 0,
        completions: 0,
        dropOffs: {},
        skips: 0,
      },
    };
    newTour.analytics.tourId = newTour.id;
    setTours([...tours, newTour]);
    toast.success("Tour created successfully!");
  };

  const updateTour = (updatedTour: Tour) => {
    setTours(
      tours.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour))
    );
    toast.success("Tour updated successfully!");
  };

  const deleteTour = () => {
    if (tourToDelete) {
      setTours(tours.filter((tour) => tour.id !== tourToDelete));
      toast.success("Tour deleted successfully!");
      closeDeleteConfirm();
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
