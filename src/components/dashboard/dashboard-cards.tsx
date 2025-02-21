"use client";

import React from "react";
import CardInfo from "./cards-infos";
import { FaUsers, FaBook } from "react-icons/fa";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardCards() {
  const { data, loading, error } = useDashboardData();

  const percentChange =
    data?.users.lastMonthCount > 0
      ? (
          ((data.users.currentMonthCount - data.users.lastMonthCount) /
            data.users.lastMonthCount) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="flex gap-4 flex-row md:gap-4">
      {loading ? (
        <>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col items-start border border-[#27272A] rounded-2xl p-4 w-full h-full"
            >
              <div className="flex flex-col w-full">
                <div className="flex items-start justify-between w-full">
                  <Skeleton className="w-1/3 h-5 rounded-md" />
                  <Skeleton className="w-5 h-5 rounded-md" />
                </div>
                <Skeleton className="w-1/2 h-8 mt-1 rounded-md" />
                <Skeleton className="w-2/3 h-4 mt-1 rounded-md" />
              </div>
            </div>
          ))}
        </>
      ) : error ? (
        <p className="text-[#FFCE04]">Ops! Erro ao carregar dados.</p>
      ) : (
        <>
          <CardInfo
            title="Cadastros"
            icon={<FaUsers size={20} className="text-gray-400" />}
            value={data.users.currentMonthCount}
            description={`${
              Number(percentChange) >= 0 ? "+" : ""
            }${percentChange}% em relação ao mês passado`}
          />
          <CardInfo
            title="Total de Leitura"
            icon={<FaBook size={20} className="text-gray-400" />}
            value={data.totalReading}
            description="Leituras acumuladas de todos os usuários"
          />
        </>
      )}
    </div>
  );
}
