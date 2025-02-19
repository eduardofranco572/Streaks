"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  cadastros: {
    label: "Cadastros",
    color: "#FFCE04",
  },
  engajamento: {
    label: "Engajamento",
    color: "#615A5A",
  },
} satisfies ChartConfig;

export function EngagementChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/chartsData");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] max-h-[28rem] w-full"
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
        <Bar dataKey="cadastros" fill="var(--color-cadastros)" radius={4} />
        <Bar dataKey="engajamento" fill="var(--color-engajamento)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
