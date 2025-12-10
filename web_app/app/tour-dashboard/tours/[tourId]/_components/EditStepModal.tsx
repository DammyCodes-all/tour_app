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
  const [content, setContent] = useState(editingStep?.content || "");
  const [target_selector, setTargetSelector] = useState(
    editingStep?.target_selector || ""
  );

  useEffect(() => {
    (() => {
      if (editingStep) {
        setTitle(editingStep.title);
        setContent(editingStep.content ?? "");
        setTargetSelector(editingStep.target_selector || "");
      }
    })();
  }, [editingStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStep && title.trim() && content.trim()) {
      onEditStep({
        ...editingStep,
        title,
        content,
        target_selector: target_selector || undefined,
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
            <label htmlFor="title" className="text-right mb-1">
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
            <label htmlFor="content" className="text-right mb-1">
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
            <label htmlFor="target_selector" className="text-right mb-1">
              Target Selector (Optional)
            </label>
            <Input
              id="target_selector"
              value={target_selector}
              onChange={(e) => setTargetSelector(e.target.value)}
              className="col-span-3 focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
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
