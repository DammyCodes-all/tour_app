"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea"; // Assuming a textarea component exists
import { PlusCircle } from "lucide-react";

interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export const AddTourModal = ({
  isOpen,
  onClose,
  onCreate,
}: AddTourModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      onCreate(name, description);
      setName("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tour</DialogTitle>
          <DialogDescription>
            Give your new tour a name and a short description.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <label htmlFor="new-tour-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1">
              Tour Name
            </label>
            <Input
              id="new-tour-name"
              placeholder="e.g., Onboarding Flow for New Users"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:border-custom-orange focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-custom-orange"
            />
          </div>
          <div>
            <label htmlFor="new-tour-description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1">
              Description
            </label>
            <Textarea
              id="new-tour-description"
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
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
