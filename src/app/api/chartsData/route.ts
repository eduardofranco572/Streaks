import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEngagementMetrics(year: number) {
  const startDate = new Date(year, 0, 1); 
  const endDate = new Date(year + 1, 0, 1);

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: { createdAt: true },
  });

  const histories = await prisma.history.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: { createdAt: true },
  });

  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const chartData = months.map((month) => ({
    month,
    cadastros: 0,
    engajamento: 0,
  }));

  users.forEach((user) => {
    const monthIndex = new Date(user.createdAt).getMonth();
    chartData[monthIndex].cadastros += 1;
  });

  histories.forEach((history) => {
    const monthIndex = new Date(history.createdAt).getMonth();
    chartData[monthIndex].engajamento += 1;
  });

  return chartData;
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

  try {
    const data = await getEngagementMetrics(year);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}


 