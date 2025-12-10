"use client";

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tour } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { AnalyticsEmptyState } from "./AnalyticsEmptyState";
import { StatCard } from "./StatCard";
import { Map, ListChecks, Target } from "lucide-react"; // Import new icons

interface AnalyticsChartsProps {
  tours: Tour[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF0000", "#00FF00", "#0000FF"]; // Expanded COLORS

export const AnalyticsCharts = ({ tours }: AnalyticsChartsProps) => {
  if (tours.length === 0) {
    return <AnalyticsEmptyState />;
  }

  const totalTours = tours.length;
  const totalSteps = tours.reduce(
    (acc, tour) => acc + (tour.steps?.length || 0),
    0
  );
  const averageSteps = totalTours > 0 ? totalSteps / totalTours : 0;

  const stepsPerTourData = tours.map((tour) => ({
    name: (tour.title && tour.title.length > 20) ? `${tour.title.substring(0, 20)}...` : (tour.title || "Untitled Tour"),
    steps: tour.steps?.length || 0,
  }));

  return (
    <div className="space-y-4">
      {/* Row for Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Tours" value={totalTours} Icon={Map} />
        <StatCard title="Total Steps" value={totalSteps} Icon={ListChecks} />
        <StatCard title="Avg Steps per Tour" value={averageSteps.toFixed(1)} Icon={Target} />
      </div>

      {/* Row for Bar Chart */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Steps per Tour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stepsPerTourData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type="category" />
                <YAxis type="number" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="steps"
                  isAnimationActive={false} // Disable animation
                  barSize={150} // Give explicit bar size
                  stroke="rgba(0,0,0,0.5)" // Add a stroke
                  strokeWidth={1}
                >
                  {stepsPerTourData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
