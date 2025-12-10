"use client";

import { useState } from "react";
import { Tour } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface AllToursTableProps {
  tours: Tour[];
  onSelectTour: (tourId: string) => void;
  onDeleteTour: (tourId: string) => void;
}

export const AllToursTable = ({
  tours,
  onSelectTour,
  onDeleteTour,
}: AllToursTableProps) => {


  return (
    <div className="space-y-4">


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell className="font-medium">{tour.id}</TableCell>
              <TableCell>{tour.name}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    tour.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tour.status}
                </span>
              </TableCell>
              <TableCell>{format(new Date(tour.createdAt), "PPP")}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onSelectTour(tour.id)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Tour</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDeleteTour(tour.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Tour</span>
                </Button>
                {/* Potentially add a preview button here */}
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview Tour</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
