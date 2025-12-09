"use client";

import Link from "next/link";
import {
  Home,
  Menu,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const TourDashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-[#4a4a4a] bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center">
              <Link href={"/"} className="text-2xl font-bold tracking-tight">
                <span className="text-custom-orange">Tour</span>Rify
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/tour-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-[#4a4a4a] hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/tour-dashboard/tours"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-[#4a4a4a] hover:text-primary"
              >
                <Eye className="h-4 w-4" />
                Tours
              </Link>

            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-background">
              <nav className="grid gap-2 text-lg font-medium px-5 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="text-custom-orange">Tour</span>Rify
                </Link>
                <Link
                  href="/tour-dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-[#4a4a4a] hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Overview
                </Link>
                <Link
                  href="/tour-dashboard/tours"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-[#4a4a4a] hover:text-foreground"
                >
                  <Eye className="h-5 w-5" />
                  Tours
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center lg:hidden">
            <Link href={"/"} className="text-2xl font-bold tracking-tight">
              <span className="text-custom-orange">Tour</span>Rify
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-6 py-4 lg:gap-6 lg:p-6 mx-auto w-full max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
};
