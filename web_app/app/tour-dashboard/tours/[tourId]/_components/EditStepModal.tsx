"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TourStep } from "@/lib/types";

interface EditStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditStep: (step: TourStep) => void;
  editingStep: TourStep | null;
}

export const EditStepModal = ({
  isOpen,
  onClose,
  onEditStep,
  editingStep,
}: EditStepModalProps) => {
  const [title, setTitle] = useState(editingStep?.title || "");
  const [description, setDescription] = useState(editingStep?.description || "");
  const [targetElement, setTargetElement] = useState(
    editingStep?.targetElement || ""
  );

  useEffect(() => {
    if (editingStep) {
      setTitle(editingStep.title);
      setDescription(editingStep.description);
      setTargetElement(editingStep.targetElement || "");
    }
  }, [editingStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStep && title.trim() && description.trim()) {
      onEditStep({
        ...editingStep,
        title,
        description,
        targetElement: targetElement || undefined,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tour Step</DialogTitle>
          <DialogDescription>
            Make changes to the tour step here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="targetElement" className="text-right">
              Target Selector (Optional)
            </label>
            <Input
              id="targetElement"
              value={targetElement}
              onChange={(e) => setTargetElement(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
