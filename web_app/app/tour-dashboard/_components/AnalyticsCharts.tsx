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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsChartsProps {
  tours: Tour[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AnalyticsCharts = ({ tours }: AnalyticsChartsProps) => {
  const startsData = tours.map((tour) => ({
    name: tour.name,
    starts: tour.analytics.starts,
  }));

  const completionsData = tours.map((tour) => ({
    name: tour.name,
    completions: tour.analytics.completions,
  }));

  const dropOffData = tours.flatMap((tour) =>
    Object.entries(tour.analytics.dropOffs).map(([stepId, count]) => ({
      name: `${tour.name.substring(0, 10)}... - ${stepId}`,
      dropOffs: count,
    }))
  );

  const completionRateData = tours.map(tour => ({
    name: tour.name,
    rate: tour.analytics.starts > 0 ? (tour.analytics.completions / tour.analytics.starts) * 100 : 0
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tour Starts</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={startsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="starts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tour Completions</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step Drop-offs</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dropOffData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{fontSize: 10}}/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="dropOffs" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Completion Rate (%)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
