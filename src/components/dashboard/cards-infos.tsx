"use client";

import React from "react";

interface CardInfoProps {
  title: string;
  icon: React.ReactNode;
  value: number | string;
  description?: string;
}

export default function CardInfo({
  title,
  icon,
  value,
  description,
}: CardInfoProps) {
  return (
    <div className="flex flex-col items-start border border-[#27272A] rounded-2xl p-4 w-full h-full">
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between w-full">
          <h1 className="text-sm font-medium">{title}</h1>
          {icon}
        </div>
        <h1 className="mt-1 text-xl font-bold">{value}</h1>
        {description && (
          <p className="mt-1 text-xs text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
}
