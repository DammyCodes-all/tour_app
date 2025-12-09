"use client";

import { TourAnalytics } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AnalyticsChartsProps {
  analytics: TourAnalytics;
  totalSteps: number;
}

export const AnalyticsCharts = ({ analytics, totalSteps }: AnalyticsChartsProps) => {
  const completionRate = (analytics.completions / analytics.starts) * 100 || 0;
  const skipRate = (analytics.skips / analytics.starts) * 100 || 0;

  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardHeader>
        <CardTitle>Tour Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm font-medium">Tour Starts</p>
          <p className="text-2xl font-bold">{analytics.starts}</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium">Tour Completions</p>
          <p className="text-2xl font-bold">{analytics.completions}</p>
          <Progress value={completionRate} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{completionRate.toFixed(1)}% Completion Rate</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium">Skipped Tours</p>
          <p className="text-2xl font-bold">{analytics.skips}</p>
          <Progress value={skipRate} className="mt-2 bg-yellow-500" />
          <p className="text-xs text-muted-foreground mt-1">{skipRate.toFixed(1)}% Skip Rate</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium mb-2">Step Drop-off Rates</p>
          {totalSteps > 0 ? (
            Object.entries(analytics.dropOffs).map(([stepId, dropCount], index) => (
              <div key={stepId} className="mb-2">
                <p className="text-xs font-medium">{`Step ${index + 1}`}</p>
                <Progress value={(dropCount / analytics.starts) * 100} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">{dropCount} drops ({(
                    (dropCount / analytics.starts) *
                    100
                  ).toFixed(1)}%)</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No steps to display drop-off rates.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
