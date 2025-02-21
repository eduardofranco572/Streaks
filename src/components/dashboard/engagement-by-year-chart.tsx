"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEngagementByYear } from "@/hooks/use-engagement-by-year";

const COLORS = ["#FFCE04", "#E5B800", "#CC9900", "#B38300", "#996600"];

export function EngagementByYearChart() {
  const { data, loading, error } = useEngagementByYear();

  return (
    <Card className="w-full items-center justify-center">
      <CardHeader className="p-4">
        <CardTitle>Engajamento por Ano</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] w-full flex justify-center items-center p-4">
        {loading ? (
          <Skeleton className="w-full h-full rounded-md" />
        ) : error ? (
          <p className="text-[#FFCE04]">Ops! Erro ao carregar dados.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="year"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                label={false}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
