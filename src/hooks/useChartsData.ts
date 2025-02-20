import { useState, useEffect } from "react";

export function useChartsData(year: string) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/chartsData?year=${year}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      }
    }
    fetchData();
  }, [year]);

  return { data, error };
}
