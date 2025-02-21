"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useChartsData } from "@/hooks/use-charts-data";
import { availableYears } from "@/utils/years";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  engajamento: {
    label: "Engajamento",
    color: "#FFCE04",
  },
} satisfies ChartConfig;

export function EngagementChart() {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const { data: chartData, error } = useChartsData(selectedYear);

  if (error) {
    console.error("Erro ao buscar dados:", error);
  }
  
  return (
    <div className="border border-[#27272A] rounded-2xl w-full p-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="mb-5 text-base font-semibold">Engajamento geral</h1>
        <Select onValueChange={(value) => setSelectedYear(value)} value={selectedYear}>
            <SelectTrigger className="w-[5rem]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
        </Select>
      </div>
      <ChartContainer
        config={chartConfig}
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="engajamento" fill="var(--color-engajamento)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
