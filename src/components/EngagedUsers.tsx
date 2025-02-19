"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
  id: number;
  email: string;
  streaks: number;
  level: number;
  totalReading: number;
};

export default function EngagedUsers() {
  const [selected, setSelected] = useState<"streaks" | "level" | "totalReading">("streaks");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`/api/users?orderBy=${selected}`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [selected]);

  return (
    <div className="flex flex-col items-start border border-[#27272A] rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <h1 className="text-base font-semibold">Leitores mais engajados</h1>
          <p className="mt-1 text-sm text-gray-400">
            Total de <span>{users.length}</span> leitores mais engajados neste mês.
          </p>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              if (value === "Streak") setSelected("streaks");
              if (value === "level") setSelected("level");
              if (value === "Leitura") setSelected("totalReading");
            }}
          >
            <SelectTrigger className="w-[6rem]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Streak">Streak</SelectItem>
              <SelectItem value="level">Level</SelectItem>
              <SelectItem value="Leitura">Leitura</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col w-full mt-6">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-1 mt-2">
                <Skeleton className="w-1/2 h-6 rounded-md" />
                <Skeleton className="w-12 h-6 rounded-md" />
              </div>
            ))}
          </>
        ) : (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-1 mt-2">
              <h1>{user.email}</h1>
              <h1 className="text-[#FFCE04]">
                {selected === "streaks"
                  ? user.streaks
                  : selected === "level"
                  ? user.level
                  : user.totalReading}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
