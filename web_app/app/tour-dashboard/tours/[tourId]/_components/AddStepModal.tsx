"use client";

import { useState } from "react";
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

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStep: (step: Omit<TourStep, "id">) => void;
}

export const AddStepModal = ({ isOpen, onClose, onAddStep }: AddStepModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetElement, setTargetElement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAddStep({ title, description, targetElement: targetElement || undefined });
      setTitle("");
      setDescription("");
      setTargetElement("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Step</DialogTitle>
          <DialogDescription>
            Fill in the details for the new tour step.
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
            <Button type="submit">Add Step</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
