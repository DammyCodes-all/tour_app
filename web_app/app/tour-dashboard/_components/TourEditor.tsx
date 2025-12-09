"use client";

import { Tour, TourStep } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepsEditor } from "./StepsEditor";
import { useState, useEffect } from "react";
import { Save, XCircle, ArrowLeft } from "lucide-react";

interface TourEditorProps {
  tour: Tour;
  onUpdateTour: (tour: Tour) => void;
  onAddStep: (tourId: string, step: Omit<TourStep, "id">) => void;
  onUpdateStep: (tourId: string, step: TourStep) => void;
  onDeleteStep: (tourId: string, stepId: string) => void;
  onReorderSteps: (tourId: string, newOrder: TourStep[]) => void;
  onBack: () => void;
}

export const TourEditor = ({
  tour,
  onUpdateTour,
  onAddStep,
  onUpdateStep,
  onDeleteStep,
  onReorderSteps,
  onBack,
}: TourEditorProps) => {
  const [editedTour, setEditedTour] = useState<Tour>(tour);

  useEffect(() => {
    setEditedTour(tour);
  }, [tour]);

  const handleSave = () => {
    onUpdateTour(editedTour);
  };

  const handleStatusChange = (status: "draft" | "published") => {
    setEditedTour((prev) => ({ ...prev, status }));
  };

  const handleStepReorder = (tourId: string, newOrder: TourStep[]) => {
    setEditedTour((prev) => ({ ...prev, steps: newOrder }));
    onReorderSteps(tourId, newOrder);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tours
        </Button>
        <h2 className="text-3xl font-bold">{editedTour.name}</h2>
        <div className="flex space-x-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Tour
          </Button>
          <Button variant="destructive" onClick={onBack}>
            <XCircle className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tour Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="tour-name"
            label="Tour Name"
            type="text"
            value={editedTour.name}
            onChange={(e) =>
              setEditedTour((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1">
              <Button
                variant={editedTour.status === "published" ? "default" : "outline"}
                onClick={() => handleStatusChange("published")}
                className="mr-2"
              >
                Published
              </Button>
              <Button
                variant={editedTour.status === "draft" ? "default" : "outline"}
                onClick={() => handleStatusChange("draft")}
              >
                Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <StepsEditor
        tourId={editedTour.id}
        steps={editedTour.steps}
        onAddStep={onAddStep}
        onUpdateStep={onUpdateStep}
        onDeleteStep={onDeleteStep}
        onReorderSteps={handleStepReorder}
      />
    </div>
  );
};
