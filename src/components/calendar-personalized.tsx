"use client";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

interface CalendarPersonalizedProps {
  markedDates: Date[];
  sizeClass?: string;
}

export function CalendarPersonalized({ markedDates }: CalendarPersonalizedProps) {
  return (
    <div>
      <Calendar
        mode="multiple"
        locale={ptBR}
        selected={markedDates}
        onSelect={() => {}}
        className="rounded-md border"
      />
    </div>
  );
}
