import { PrismaClient } from "@prisma/client";

type ChartData ={
  month: string;
  cadastros: number;
  engajamento: number;
}

interface IMetricsService {
  getEngagementMetrics(year: number):Promise<ChartData[]>;
}

class MetricsService implements IMetricsService{
    private prisma: PrismaClient;
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getEngagementMetrics(year: number) {
        const startDate = new Date(year, 0, 1); 
        const endDate = new Date(year + 1, 0, 1);
      
        const users = await this.prisma.user.findMany({
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          select: { createdAt: true },
        });
      
        const histories = await this.prisma.history.findMany({
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
          const monthIndex = new Date(user.createdAt as Date).getMonth();
          chartData[monthIndex].cadastros += 1;
        });
      
        histories.forEach((history) => {
          const monthIndex = new Date(history.createdAt as Date).getMonth();
          chartData[monthIndex].engajamento += 1;
        });
      
        return chartData;
    }
   
}

const prisma = new PrismaClient();
export const metricsService = new MetricsService(prisma);