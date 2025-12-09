"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useTourDetails } from "@/hooks/useTourDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton component exists
import { StepCard } from "./_components/StepCard";
import { AddStepModal } from "./_components/AddStepModal";
import { EditStepModal } from "./_components/EditStepModal";
import { AnalyticsCharts } from "./_components/AnalyticsCharts";
import { TourStep } from "@/lib/types";

export default function TourDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.tourId as string;

  const { tour, loading, error, addStep, editStep, deleteStep } = useTourDetails(tourId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<TourStep | null>(null);

  const handleEditClick = (step: TourStep) => {
    setEditingStep(step);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-96" />
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-muted-foreground">{error || "Tour not found."}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tour-dashboard/tours" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{tour.name}</h1>
          <p className="text-lg text-muted-foreground">{tour.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Tour Steps Section */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Tour Steps</CardTitle>
              <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4" /> Add Step
              </Button>
            </CardHeader>
            <CardContent>
              {tour.steps.length === 0 ? (
                <p className="text-muted-foreground">No steps added yet. Click "Add Step" to begin!</p>
              ) : (
                <div className="grid gap-4">
                  {tour.steps.map((step, index) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      stepNumber={index + 1}
                      onEdit={handleEditClick}
                      onDelete={deleteStep}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="col-span-12 lg:col-span-4">
          <AnalyticsCharts analytics={tour.analytics} totalSteps={tour.steps.length} />
        </div>
      </div>

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
    </div>
  );
}

