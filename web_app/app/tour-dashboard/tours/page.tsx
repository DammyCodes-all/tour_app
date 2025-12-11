"use client";

import { useState } from "react";
import { useUserTours } from "@/hooks/useUserTours";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"; // For sonner toasts
import { TourCard } from "./_components/TourCard";
import { AddTourModal } from "./_components/AddTourModal";
import { DeleteTourConfirmation } from "./_components/DeleteTourConfirmation";
import Loading from "./loading";

export default function UserToursPage() {
  const {
    tours,
    loading,
    isAddModalOpen,
    isDeleteConfirmOpen,
    tourToDelete,
    openAddModal,
    closeAddModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    createTour,
    deleteTour,
  } = useUserTours();

  if (loading) {
    return <Loading />;
  }

  const displayedTours = tours;

  const currentTourToDelete = tours.find((t) => t.id === tourToDelete);
  const tourNameToDelete = currentTourToDelete?.title || "selected tour";

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Tours</h1>
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Tour
          </Button>
        </div>

        <div className="flex flex-wrap -mx-4">
          {displayedTours.length === 0 ? (
            <p className="w-full text-center text-muted-foreground">
              No tours found. Create one to get started!
            </p>
          ) : (
            displayedTours.map((tour) => (
              <div
                key={tour.id}
                className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 px-4 mb-8"
              >
                <TourCard
                  tour={tour}
                  // onEdit prop is no longer passed as TourCard handles navigation directly
                  onDelete={openDeleteConfirm}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <AddTourModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onCreate={createTour}
      />
      <DeleteTourConfirmation
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={deleteTour}
        tourName={tourNameToDelete}
      />
      <Toaster />
    </>
  );
}
