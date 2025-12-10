"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteStepConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stepTitle: string;
}

export const DeleteStepConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  stepTitle,
}: DeleteStepConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Step Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the step &quot;{stepTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
