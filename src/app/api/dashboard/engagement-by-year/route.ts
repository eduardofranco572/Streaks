import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

class EngagementService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getEngagementByYear() {
    const years = [2022, 2023, 2024, 2025, 2026];
  
    const engagementData = await Promise.all(
      years.map(async (year) => {
        const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
        const endOfYear = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
  
        const count = await this.prisma.user.count({
          where: {
            createdAt: {
              gte: startOfYear,
              lt: endOfYear,
            },
          },
        });
  
        return { year, count };
      })
    );
  
    return engagementData;
  }  
    
}

const prisma = new PrismaClient();
const engagementService = new EngagementService(prisma);

export async function GET() {
  try {
    const data = await engagementService.getEngagementByYear();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar engajamento por ano:", error);
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}
