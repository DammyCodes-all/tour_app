"use client";

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
import { Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CurrentUserToursTableProps {
  tours: Tour[];
  onSelectTour: (tourId: string) => void;
  onDeleteTour: (tourId: string) => void;
}

export const CurrentUserToursTable = ({
  tours,
  onSelectTour,
  onDeleteTour,
}: CurrentUserToursTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.map((tour) => (
          <TableRow key={tour.id}>
            <TableCell className="font-medium">{tour.id}</TableCell>
            <TableCell>{tour.title}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tour.is_published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {tour.is_published ? "Published" : "Draft"}
              </span>
            </TableCell>
            <TableCell>
              {format(new Date(tour?.created_at ?? ""), "PPP")}
            </TableCell>
            <TableCell className="text-right">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectTour(tour.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Tour</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Tour</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTour(tour.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Tour</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Tour</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview Tour</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Preview Tour</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
