"use client";

import { Tour } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
} from "@/components/ui/card";
import { Edit, Trash2, CheckCircle, MapPinCheckInside } from "lucide-react"; // Corrected icon import

interface TourCardProps {
  tour: Tour;
  onEdit: (tour: Tour) => void; // Re-introduced onEdit prop
  onDelete: (tourId: string) => void;
}

export const TourCard = ({ tour, onEdit, onDelete }: TourCardProps) => { // Re-introduced onEdit
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/tour-dashboard/tours/${tour.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-custom-orange/20 bg-linear-to-br from-custom-orange/10 to-transparent p-8 transition-all hover:border-custom-orange"
    >
      <div>
        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-custom-orange">
          <MapPinCheckInside size={32} className="text-white" /> {/* Corrected icon usage */}
        </div>

        {/* Title and Description */}
        <h2 className="mb-2 text-2xl font-bold">{tour.title}</h2>
        <CardDescription className="mb-6 line-clamp-3">
          {tour.description}
        </CardDescription>

        {/* Hover Actions */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(tour); // Call onEdit prop
            }}
            className="hover:bg-custom-orange/10 hover:text-custom-orange"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(tour.id);
            }}
            className="hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-auto flex items-center justify-between border-t border-custom-orange/20 pt-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <MapPinCheckInside className="mr-2 h-4 w-4" /> {/* Corrected icon usage */}
          <span>{tour.steps?.length || 0} Steps</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          <span>{tour.analytics?.completions || 0} Completions</span>
        </div>
      </div>
    </div>
  );
};
