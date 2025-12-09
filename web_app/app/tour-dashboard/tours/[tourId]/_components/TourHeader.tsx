"use client";

import { Tour } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TourHeaderProps {
  tour: Tour;
}

export const TourHeader = ({ tour }: TourHeaderProps) => {
  return (
    <div className="flex justify-between items-start p-6 bg-card text-card-foreground rounded-lg shadow">
      <div>
        <Link href="/tour-dashboard/tours" className="flex items-center text-sm text-muted-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tours
        </Link>
        <h1 className="text-3xl font-bold">{tour.name}</h1>
        <p className="mt-2 text-muted-foreground">{tour.description}</p>
      </div>
      <div className="text-right">
        <div className="text-sm text-muted-foreground">Status</div>
        <div
          className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            tour.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {tour.status}
        </div>
      </div>
    </div>
  );
};
