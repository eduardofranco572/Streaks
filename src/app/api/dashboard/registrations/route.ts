import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

class DashboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserCounts() {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthCount = await this.prisma.user.count({
      where: { createdAt: { gte: startOfCurrentMonth } },
    });

    const lastMonthCount = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    return { currentMonthCount, lastMonthCount };
  }
}

const prisma = new PrismaClient();
const dashboardService = new DashboardService(prisma);

export async function GET(request: Request) {
  try {
    const userCounts = await dashboardService.getUserCounts();
    return NextResponse.json(userCounts);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
