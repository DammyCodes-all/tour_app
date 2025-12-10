"use client";

import { useState, useEffect } from "react";
import { Tour } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

interface EditTourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (tour: Tour) => void;
}

export const EditTourModal = ({
  tour,
  isOpen,
  onClose,
  onUpdate,
}: EditTourModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (() => {
      if (tour) {
        setTitle(tour.title ?? "");
        setDescription(tour.description ?? "");
      }
    })();
  }, [tour]);

  const handleSubmit = () => {
    if (tour && title.trim() && description.trim()) {
      onUpdate({ ...tour, title, description });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
          <DialogDescription>
            Update the name and description of your tour.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <label
              htmlFor="edit-tour-title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
            >
              Tour Title
            </label>
            <Input
              id="edit-tour-title"
              placeholder="e.g., Onboarding Flow for New Users"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
            />
          </div>
          <div>
            <label
              htmlFor="edit-tour-description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
            >
              Description
            </label>
            <Textarea
              id="edit-tour-description"
              placeholder="A short description of the tour."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Edit className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
