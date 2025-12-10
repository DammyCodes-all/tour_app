"use client";

import { Tour } from "@/lib/types";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Trash2, CheckCircle, ListChecks } from "lucide-react";

interface TourCardProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete: (tourId: string) => void;
}

export const TourCard = ({ tour, onEdit, onDelete }: TourCardProps) => {
  const router = useRouter(); // Initialize useRouter

  const handleCardClick = () => {
    console.log("Card clicked, attempting to navigate to:", `/tour-dashboard/tours/${tour.id}`);
    router.push(`/tour-dashboard/tours/${tour.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="cursor-pointer h-full"
      onClick={handleCardClick} // Handle card click here
    >
      <div className="bg-linear-to-br from-custom-orange/20 to-custom-orange/5 rounded-2xl p-8 border border-custom-orange/20 hover:border-custom-orange h-full">
        <Card className="flex flex-col h-full bg-custom-black/90 border-none shadow-none">
          <CardHeader>
            <CardTitle>{tour.title}</CardTitle>
            <CardDescription>{tour.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center text-sm text-muted-foreground">
              <ListChecks className="mr-2 h-4 w-4" />
              <span>{tour.steps.length} Steps</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>{tour.analytics.completions} Completions</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button variant="outline" size="sm" className="w-24" onClick={(e) => { e.stopPropagation(); onEdit(tour); }}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" size="sm" className="w-24 bg-red-600 hover:bg-red-700" onClick={(e) => { e.stopPropagation(); onDelete(tour.id); }}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};
