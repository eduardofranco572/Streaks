"use client";

import { useEffect, useState } from "react";

interface EngagementData {
  year: number;
  count: number;
}

export function useEngagementByYear() {
  const [data, setData] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard/engagement-by-year");
        if (!response.ok) {
          throw new Error("Erro ao buscar engajamento por ano");
        }
        const result: EngagementData[] = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
