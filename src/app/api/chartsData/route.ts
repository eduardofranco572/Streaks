import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEngagementMetrics() {
  const users = await prisma.user.findMany({
    select: { createdAt: true },
  });
  const histories = await prisma.history.findMany({
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

  // Conta os cadastros (usuários) por mês
  users.forEach((user) => {
    const monthIndex = new Date(user.createdAt).getMonth();
    chartData[monthIndex].cadastros += 1;
  });

  // Conta os registros de history por mês
  histories.forEach((history) => {
    const monthIndex = new Date(history.createdAt).getMonth();
    chartData[monthIndex].engajamento += 1;
  });

  return chartData;
}

export async function GET(request: Request) {
  try {
    const data = await getEngagementMetrics();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}



 