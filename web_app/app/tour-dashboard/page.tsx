"use client";

import { useState } from "react";
import { useUserTours } from "@/hooks/useUserTours";
import { AnalyticsCharts } from "./_components/AnalyticsCharts";
import { TourSearchBar } from "./_components/TourSearchBar";
import { CurrentUserToursTable } from "./_components/CurrentUserToursTable";
import { DeleteTourConfirmation } from "./tours/_components/DeleteTourConfirmation";

export default function TourDashboardPage() {
  const {
    tours,
    openDeleteConfirm,
    isDeleteConfirmOpen,
    tourToDelete,
    closeDeleteConfirm,
    deleteTour,
  } = useUserTours();

  const [searchQuery, setSearchQuery] = useState("");

  const currentUserTours = tours.filter((tour) =>
    tour.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTourToDelete = tours.find((tour) => tour.id === tourToDelete);
  const tourNameToDelete = currentTourToDelete?.title || "";

  return (
    <>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <AnalyticsCharts tours={currentUserTours} />

        {currentUserTours.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Tours</h2>
              <TourSearchBar onSearch={setSearchQuery} />
            </div>

            <CurrentUserToursTable
              tours={currentUserTours}
              onDeleteTour={openDeleteConfirm}
            />
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteTourConfirmation
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={deleteTour}
        tourName={tourNameToDelete}
      />
    </>
  );
}
