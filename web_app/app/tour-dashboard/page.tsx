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
    loading,
    openDeleteConfirm,
    isDeleteConfirmOpen,
    tourToDelete,
    closeDeleteConfirm,
    deleteTour,
  } = useUserTours();

  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="h-8 w-48 rounded-md bg-gray-700/40" />
        <div className="grid gap-6">
          {/* Analytics skeleton */}
          <div className="rounded-2xl bg-gradient-to-b from-black/20 to-black/10 p-6 border border-gray-800/40">
            <div className="h-48 rounded-md bg-gray-800/30" />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-16 rounded bg-gray-700/30" />
              <div className="h-16 rounded bg-gray-700/30" />
              <div className="h-16 rounded bg-gray-700/30" />
            </div>
          </div>

          {/* Your Tours header skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-56 rounded-md bg-gray-700/40" />
            <div className="h-10 w-56 rounded-md bg-gray-700/40" />
          </div>

          {/* Table / cards skeleton */}
          <div className="rounded-2xl p-4 space-y-4">
            <div className="overflow-hidden rounded-lg border border-gray-800/40 bg-custom-black/60 p-4">
              <div className="h-3 w-1/3 rounded bg-gray-700/30 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-gray-700/30" />
                      <div className="space-y-2">
                        <div className="h-4 w-48 rounded bg-gray-700/30" />
                        <div className="h-3 w-36 rounded bg-gray-700/20" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-9 w-24 rounded-md bg-gray-700/30" />
                      <div className="h-9 w-24 rounded-md bg-gray-700/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
