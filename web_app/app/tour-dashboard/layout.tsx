import React from "react";
import { TourDashboardLayout } from "./_components/TourDashboardLayout";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <TourDashboardLayout>{children}</TourDashboardLayout>;
};

export default DashboardLayout;
