"use client"

import React, {useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useChartsData } from "@/hooks/use-charts-data";
import { availableYears } from "@/utils/years"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartConfig = {
  cadastros: {
    label: "Cadastros",
    color: "#FFCE04",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function CadastroBarChart() {
  const [selectedSemester, setSelectedSemester] = useState<string>("1semester")
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const { data: chartData, error } = useChartsData(selectedYear);

  if (error) {
    console.error("Erro ao buscar dados:", error);
  }

  const filteredData = selectedSemester === "1semester"
    ? chartData.slice(0, 6)
    : chartData.slice(6, 12)

  return (
    <Card className="w-full h-full border border-[#27272A]">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col">
          <CardTitle className="text-center">Engajamento dos Cadastros</CardTitle>
          <CardDescription className="mt-2">Exibindo dados do semestre</CardDescription>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-2">
          <Select onValueChange={(value) => setSelectedSemester(value)} value={selectedSemester}>
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1semester">Primeiro semestre</SelectItem>
              <SelectItem value="2semester">Segundo semestre</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedYear(value)} value={selectedYear}>
            <SelectTrigger className="w-[5rem]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears .map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="w-full h-full max-h-[70%]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={filteredData}
              layout="vertical"
              margin={{ right: 16 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <XAxis dataKey="cadastros" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar
                dataKey="cadastros"
                layout="vertical"
                fill={chartConfig.cadastros.color}
                radius={4}
              >
                <LabelList
                  dataKey="month"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="cadastros"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
