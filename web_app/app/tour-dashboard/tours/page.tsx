"use client";

import { TourCard } from "./_components/TourCard";
import { AddTourModal } from "./_components/AddTourModal";
import { EditTourModal } from "./_components/EditTourModal";
import { DeleteTourConfirmation } from "./_components/DeleteTourConfirmation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useUserTours } from "@/hooks/useUserTours";
import { Toaster } from "@/components/ui/sonner"; // For sonner toasts

export default function UserToursPage() {
  const {
    tours,
    editingTour,
    isAddModalOpen,
    isDeleteConfirmOpen,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    createTour,
    updateTour,
    deleteTour,
  } = useUserTours();

  // Filter tours if needed (e.g., current user's tours vs. all)
  // For now, we display all tours from the mock data
  const displayedTours = tours;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Tours</h1>
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Tour
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTours.length === 0 ? (
            <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
              No tours found. Create one to get started!
            </p>
          ) : (
            displayedTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onEdit={openEditModal}
                onDelete={openDeleteConfirm}
              />
            ))
          )}
        </div>
      </div>

      <AddTourModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onCreate={createTour}
      />
      <EditTourModal
        tour={editingTour}
        isOpen={!!editingTour}
        onClose={closeEditModal}
        onUpdate={updateTour}
      />
      <DeleteTourConfirmation
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={deleteTour}
        tourName={
          tours.find((t) => t.id === editingTour?.id)?.title || "selected tour"
        }
      />
      <Toaster />
    </>
  );
}
