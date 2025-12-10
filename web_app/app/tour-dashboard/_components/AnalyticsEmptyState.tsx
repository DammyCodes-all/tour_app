"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AnalyticsEmptyState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
        <p className="text-lg font-semibold">No analytics to display yet.</p>
        <p className="text-muted-foreground">
          Create your first tour to start seeing some data.
        </p>
      </CardContent>
    </Card>
  );
};
