import { useState, useEffect } from "react";

type ChartData = {
  label: string;
  value: number;
};

export function useChartsData(year: string) {
  const [data, setData] = useState<ChartData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/charts-data?year=${year}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const json: ChartData[] = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      }
    }
    fetchData();
  }, [year]);

  return { data, error };
}