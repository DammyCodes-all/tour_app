"use client";

import { TourStep } from "@/lib/types";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, TrashIcon } from "lucide-react";

interface StepCardProps {
  step: TourStep;
  stepNumber: number;
  onEdit: (step: TourStep) => void;
  onDelete: (stepId: string) => void;
}

export const StepCard = ({ step, stepNumber, onEdit, onDelete }: StepCardProps) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(step);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(step.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="group"
    >
      <div className="bg-linear-to-br from-custom-orange/20 to-custom-orange/5 rounded-2xl p-6 border border-custom-orange/20 hover:border-custom-orange relative">
        <div className="absolute top-4 right-4 text-white font-bold text-lg opacity-50 group-hover:opacity-100 transition-opacity">
          {stepNumber}
        </div>
        <Card className="flex flex-col h-full bg-custom-black/90 border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span className="flex-1">{step.title}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="icon" onClick={handleEditClick}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={handleDeleteClick}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{step.description}</p>
            {step.targetElement && (
              <div className="mt-2">
                <Badge variant="secondary">Target: {step.targetElement}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};