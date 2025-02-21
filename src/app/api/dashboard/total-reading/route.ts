import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

class DashboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getTotalReading() {
    const totalReadingAggregate = await this.prisma.user.aggregate({
      _sum: { totalReading: true },
    });
    const totalReading = totalReadingAggregate._sum.totalReading || 0;
    return totalReading;
  }
}

const prisma = new PrismaClient();
const dashboardService = new DashboardService(prisma);

export async function GET() {
  try {
    const totalReading = await dashboardService.getTotalReading();
    return NextResponse.json({ totalReading });
  } catch (error) {
    console.error("Erro ao buscar total de leitura:", error);
    return NextResponse.json(
      { error: "Erro ao buscar total de leitura" },
      { status: 500 }
    );
  }
}
