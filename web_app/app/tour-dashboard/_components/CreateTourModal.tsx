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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Tour } from "@/lib/types";

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => Promise<Tour | void>;
}

export const CreateTourModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateTourModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTourId, setNewTourId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    setNewTourId(null);
    setIsCopied(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (title.trim()) {
      const newTour = await onCreate(title, description);
      if (newTour) {
        setNewTourId(newTour.id);
        toast.success("Tour created successfully!");
      }
    }
  };

  const handleCopy = () => {
    const scriptTag = `<script src="${window.location.origin}/loader.js" data-tour-id="${newTourId}"></script>`;
    navigator.clipboard.writeText(scriptTag);
    setIsCopied(true);
    toast.success("Script tag copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{newTourId ? "Tour Created!" : "Create New Tour"}</DialogTitle>
        </DialogHeader>
        {newTourId ? (
          <div className="py-4 space-y-4">
            <p>Your new tour has been created. Embed the following script in your application to start the tour:</p>
            <div className="flex items-center space-x-2">
              <Input readOnly value={`<script src="${window.location.origin}/loader.js" data-tour-id="${newTourId}"></script>`} />
              <Button onClick={handleCopy} size="icon">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <Input
              id="new-tour-title"
              placeholder="e.g., Onboarding Flow for New Users"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              id="new-tour-description"
              placeholder="A brief description of the tour."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
        <DialogFooter>
          {newTourId ? (
            <Button onClick={resetAndClose}>Done</Button>
          ) : (
            <>
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
