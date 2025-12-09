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
  onAddStep: (step: Omit<TourStep, "id" | "step_number" | "step_id">) => void;
}

export const AddStepModal = ({ isOpen, onClose, onAddStep }: AddStepModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target_selector, setTargetSelector] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddStep({ title, content, target_selector: target_selector || undefined });
      setTitle("");
      setContent("");
      setTargetSelector("");
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
              className="col-span-3 focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="content" className="text-right">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="target_selector" className="text-right">
              Target Selector
            </label>
            <Input
              id="target_selector"
              value={target_selector}
              onChange={(e) => setTargetSelector(e.target.value)}
              className="col-span-3 focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
              required
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
