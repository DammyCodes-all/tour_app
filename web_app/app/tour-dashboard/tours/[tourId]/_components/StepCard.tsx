"use client";

import { TourStep } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, TrashIcon, GripVertical } from "lucide-react";

interface StepCardProps {
  step: TourStep;
  stepNumber: number;
  onEdit: (step: TourStep) => void;
  onDelete: (stepId: string) => void;
}

export const StepCard = ({ step, stepNumber, onEdit, onDelete }: StepCardProps) => {
  return (
    <div className="group flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
      {/* Drag Handle and Step Number */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <GripVertical className="h-5 w-5 cursor-grab" />
        <span className="text-lg font-medium">{String(stepNumber).padStart(2, '0')}</span>
      </div>

      {/* Step Content */}
      <div className="flex-grow mx-6">
        <p className="text-lg font-semibold text-card-foreground group-hover:underline">
          {step.title}
        </p>
        {step.target_selector && (
          <Badge variant="secondary" className="mt-1 font-mono">
            {step.target_selector}
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(step)} className="hover:bg-custom-orange/10 hover:text-custom-orange">
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDelete(step.id)} className="hover:bg-custom-orange/10 hover:text-custom-orange">
          <TrashIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};