"use client";

import { useState, useEffect } from "react";
import { TourStep } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"; // Using react-beautiful-dnd for reordering

interface StepsEditorProps {
  tourId: string;
  steps: TourStep[];
  onAddStep: (tourId: string, step: Omit<TourStep, "id">) => void;
  onUpdateStep: (tourId: string, step: TourStep) => void;
  onDeleteStep: (tourId: string, stepId: string) => void;
  onReorderSteps: (tourId: string, newOrder: TourStep[]) => void;
}

export const StepsEditor = ({
  tourId,
  steps,
  onAddStep,
  onUpdateStep,
  onDeleteStep,
  onReorderSteps,
}: StepsEditorProps) => {
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<
    Omit<TourStep, "id"> | TourStep
  >({
    title: "",
    description: "",
    targetElement: "",
  });
  const [localSteps, setLocalSteps] = useState<TourStep[]>(steps);

  useEffect(() => {
    setLocalSteps(steps);
  }, [steps]);

  const handleEditClick = (step: TourStep) => {
    setEditingStepId(step.id);
    setCurrentStep(step);
  };

  const handleSaveClick = () => {
    if (editingStepId && (currentStep as TourStep).id) {
      onUpdateStep(tourId, currentStep as TourStep);
    } else {
      onAddStep(tourId, currentStep);
    }
    setEditingStepId(null);
    setCurrentStep({ title: "", description: "", targetElement: "" });
  };

  const handleCancelClick = () => {
    setEditingStepId(null);
    setCurrentStep({ title: "", description: "", targetElement: "" });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedSteps = Array.from(localSteps);
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);

    setLocalSteps(reorderedSteps);
    onReorderSteps(tourId, reorderedSteps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {localSteps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-background"
                      >
                        {editingStepId === step.id ? (
                          <div className="flex-1 space-y-2">
                            <Input
                              id={`edit-title-${step.id}`}
                              type="text"
                              value={(currentStep as TourStep).title}
                              onChange={(e) =>
                                setCurrentStep({
                                  ...currentStep,
                                  title: e.target.value,
                                })
                              }
                            />
                            <Input
                              id={`edit-description-${step.id}`}
                              type="text"
                              value={(currentStep as TourStep).description}
                              onChange={(e) =>
                                setCurrentStep({
                                  ...currentStep,
                                  description: e.target.value,
                                })
                              }
                            />
                            <Input
                              id={`edit-target-${step.id}`}
                              type="text"
                              value={
                                (currentStep as TourStep).targetElement || ""
                              }
                              onChange={(e) =>
                                setCurrentStep({
                                  ...currentStep,
                                  targetElement: e.target.value,
                                })
                              }
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={handleSaveClick}>
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelClick}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                            {step.targetElement && (
                              <p className="text-xs text-muted-foreground">
                                Target: <code>{step.targetElement}</code>
                              </p>
                            )}
                          </div>
                        )}
                        <div className="flex space-x-2 ml-4">
                          {editingStepId !== step.id && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClick(step)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteStep(tourId, step.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-6 space-y-2">
          <h4 className="font-semibold">Add New Step</h4>
          <Input
            id="new-step-title"
            type="text"
            value={currentStep.title}
            onChange={(e) =>
              setCurrentStep({ ...currentStep, title: e.target.value })
            }
          />
          <Input
            id="new-step-description"
            type="text"
            value={currentStep.description}
            onChange={(e) =>
              setCurrentStep({ ...currentStep, description: e.target.value })
            }
          />
          <Input
            id="new-step-target"
            type="text"
            value={currentStep.targetElement || ""}
            onChange={(e) =>
              setCurrentStep({ ...currentStep, targetElement: e.target.value })
            }
          />
          <Button onClick={handleSaveClick} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
