"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tourName: string) => void;
}

export const CreateTourModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateTourModalProps) => {
  const [tourName, setTourName] = useState("");

  const handleSubmit = () => {
    if (tourName.trim()) {
      onCreate(tourName);
      setTourName("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tour</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            id="new-tour-name"
            label="Tour Name"
            placeholder="e.g., Onboarding Flow for New Users"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
