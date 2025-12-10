"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { useTourDetails } from "@/hooks/useTourDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StepCard } from "./_components/StepCard";
import { AddStepModal } from "./_components/AddStepModal";
import { EditStepModal } from "./_components/EditStepModal";
import { DeleteStepConfirmation } from "./_components/DeleteStepConfirmation";
import { TourHeader } from "./_components/TourHeader";
import { GenerateScript } from "./_components/GenerateScript";
import { TourStep } from "@/lib/types";

export default function TourDetailsPage() {
  const params = useParams();
  const tourId = params.tourId as string;

  const {
    tour,
    loading,
    error,
    addStep,
    editStep,
    openDeleteStepConfirm,
    closeDeleteStepConfirm,
    isDeleteStepConfirmOpen,
    stepToDeleteId,
    confirmDeleteStep,
  } = useTourDetails(tourId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<TourStep | null>(null);

  const handleEditClick = (step: TourStep) => {
    setEditingStep(step);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-8 animate-pulse">
        <Skeleton className="h-16 w-1/2" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || "Tour not found."}</h1>
        <Button onClick={() => window.history.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const currentStepToDelete = tour.steps?.find(
    (step) => step.id === stepToDeleteId
  );
  const stepTitleToDelete = currentStepToDelete?.title || "";

  return (
    <div className="container mx-auto py-8 px-4">
      {/* 1. Modern Header */}
      <TourHeader title={tour.title || ""} />

      {/* 2. Descriptive Text */}
      <p className="text-muted-foreground mb-8">
        You need at least 5 steps before your tour script can be generated. Add
        clear CSS selectors and short descriptions to guide your users effectively.
      </p>

      {/* 3. Tour Steps Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tour Steps</h2>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" /> Add Step
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            {tour.steps?.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground font-semibold">No steps added yet.</p>
                <p className="text-sm text-muted-foreground">Click "Add Step" to begin!</p>
              </div>
            ) : (
              <div className="-mt-2">
                {tour.steps?.map((step, index) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    stepNumber={index + 1}
                    onEdit={handleEditClick}
                    onDelete={openDeleteStepConfirm}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* 4. Generate Script Button/Section */}
      <GenerateScript tourId={tour.id} stepsCount={tour.steps?.length || 0} />

      {/* Modals */}
      <AddStepModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStep={addStep}
      />
      <EditStepModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStep(null);
        }}
        onEditStep={editStep}
        editingStep={editingStep}
      />
      <DeleteStepConfirmation
        isOpen={isDeleteStepConfirmOpen}
        onClose={closeDeleteStepConfirm}
        onConfirm={confirmDeleteStep}
        stepTitle={stepTitleToDelete}
      />
    </div>
  );
}
