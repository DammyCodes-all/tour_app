"use client";

import { LucideIcon } from "lucide-react"; // Import LucideIcon type

interface StatCardProps {
  title: string;
  value: number | string;
  Icon: LucideIcon; // New prop for the icon
}

export const StatCard = ({ title, value, Icon }: StatCardProps) => {
  return (
    <div className="bg-linear-to-br from-custom-orange/10 to-transparent border border-custom-orange/20 rounded-2xl p-8 h-full flex flex-col justify-between">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-custom-orange/10 text-custom-orange mb-4">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-4xl font-bold text-custom-orange">{value}</p>
      </div>
    </div>
  );
};
