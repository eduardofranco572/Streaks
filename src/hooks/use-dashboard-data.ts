"use client";

import { useState, useEffect } from "react";

interface UsersData {
  currentMonthCount: number;
  lastMonthCount: number;
}

interface DashboardData {
  users: UsersData;
  totalReading: number;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    users: { currentMonthCount: 0, lastMonthCount: 0 },
    totalReading: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, readingRes] = await Promise.all([
          fetch("/api/dashboard/registrations"),
          fetch("/api/dashboard/total-reading"),
        ]);

        if (!usersRes.ok || !readingRes.ok) {
          throw new Error("Erro ao buscar dados do dashboard");
        }

        const usersData = await usersRes.json();
        const readingData = await readingRes.json();

        setData({
          users: usersData,
          totalReading: readingData.totalReading,
        });
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
