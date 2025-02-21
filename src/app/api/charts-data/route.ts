import { NextResponse } from "next/server";
import {metricsService} from "@/services/metrics-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

  try {
    const data = await metricsService.getEngagementMetrics(year);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}