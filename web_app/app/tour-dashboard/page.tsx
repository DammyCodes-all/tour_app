"use client";

import { useState } from "react";
import { useUserTours } from "@/hooks/useUserTours";
import { AnalyticsCharts } from "./_components/AnalyticsCharts";
import { TourSearchBar } from "./_components/TourSearchBar";
import { CurrentUserToursTable } from "./_components/CurrentUserToursTable";
import { TourEditor } from "./_components/TourEditor";
import { DeleteTourConfirmation } from "./tours/_components/DeleteTourConfirmation"; // Corrected import path

export default function TourDashboardPage() {
  const {
    tours,
    editingTour,
    openEditModal,
    closeEditModal,
    openDeleteConfirm,
    isDeleteConfirmOpen, // Added
    tourToDelete, // Added
    closeDeleteConfirm, // Added
    deleteTour, // Added
    updateTour,
    addStep,
    updateStep,
    deleteStep,
  } = useUserTours();

  const [searchQuery, setSearchQuery] = useState("");

  const currentUserTours = tours.filter((tour) =>
    tour.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReorderSteps = (tourId: string, newOrder: any[]) => {
    const tourToUpdate = tours.find((t) => t.id === tourId);
    if (tourToUpdate) {
      updateTour({ ...tourToUpdate, steps: newOrder });
    }
  };

  const handleSelectTour = (tourId: string) => {
    const tourToEdit = currentUserTours.find((t) => t.id === tourId);
    if (tourToEdit) {
      openEditModal(tourToEdit);
    }
  };

  const currentTourToDelete = tours.find((tour) => tour.id === tourToDelete); // Added
  const tourNameToDelete = currentTourToDelete?.title || ""; // Added

  return (
    <>
      {editingTour ? (
        <TourEditor
          tour={editingTour}
          onUpdateTour={updateTour}
          onAddStep={addStep}
          onUpdateStep={updateStep}
          onDeleteStep={deleteStep}
          onReorderSteps={handleReorderSteps}
          onBack={closeEditModal}
        />
      ) : (
        <div className="flex flex-col gap-6 ">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <AnalyticsCharts tours={currentUserTours} />

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Tours</h2>
            <TourSearchBar onSearch={setSearchQuery} />
          </div>

          <CurrentUserToursTable
            tours={currentUserTours}
            onSelectTour={handleSelectTour}
            onDeleteTour={openDeleteConfirm}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteTourConfirmation // Added
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={deleteTour}
        tourName={tourNameToDelete}
      />
    </>
  );
}
