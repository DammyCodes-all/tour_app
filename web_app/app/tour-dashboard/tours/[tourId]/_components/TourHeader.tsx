"use client";

import { Tour } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TourHeaderProps {
  title: string;
}

export const TourHeader = ({ title }: TourHeaderProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <Link href="/tour-dashboard" className="text-2xl font-bold tracking-tight">
          <span className="text-custom-orange">Tour</span>Rify
        </Link>
        <Button asChild variant="outline" className="hover:border-custom-orange hover:text-custom-orange">
          <Link href="/tour-dashboard/tours">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tours
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
    </div>
  );
};
