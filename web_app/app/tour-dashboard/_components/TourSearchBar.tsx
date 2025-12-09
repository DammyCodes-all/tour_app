"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TourSearchBarProps {
  onSearch: (query: string) => void;
}

export const TourSearchBar = ({ onSearch }: TourSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tours..."
        className="pl-8 sm:w-[300px]"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
