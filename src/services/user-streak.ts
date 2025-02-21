import { PrismaClient } from "@prisma/client";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private calculateXpIncrement(streaks: number): number {
    return streaks > 1 ? (1 + (streaks / 6) * 0.1) * 100 : 100;
  }

  private calculateLevelAndExperience(
    currentXp: number,
    currentLevel: number,
    streaks: number
  ): { newExperience: number; newLevel: number } {
    const xpIncrement = this.calculateXpIncrement(streaks);
    let newExperience = currentXp + xpIncrement;
    let newLevel = currentLevel;

    while (newExperience >= 500) {
      newExperience -= 500;
      newLevel++;
    }

    return { newExperience, newLevel };
  }

  private async updateXpAndLevel(user: any): Promise<any> {
    const { newExperience, newLevel } = this.calculateLevelAndExperience(
      user.experience,
      user.level,
      user.streaks
    );
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { experience: newExperience, level: newLevel },
    });
  }

  private getDayRange(date: Date): { startOfDay: Date; endOfDay: Date } {
    const startOfDay = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const endOfDay = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );
    return { startOfDay, endOfDay };
  }

  private calculateDiffDays(from: Date, to: Date): number {
    const diffTime = to.getTime() - from.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  public async updateUserStreakAndXp(email: string, externalId: string): Promise<void> {
    const currentDate = new Date();

    let user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { externalId }],
      },
    });
    
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          externalId,
          streaks: 1,
          totalReading: 1,
          experience: 100,
          level: 1,
        },
      });
      await this.prisma.history.create({ data: { userId: user!.id } });
      return;
    }

    const { startOfDay, endOfDay } = this.getDayRange(currentDate);

    const todayHistory = await this.prisma.history.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    if (todayHistory) return;
   
    const lastHistory = await this.prisma.history.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    let diffDays = 0;
    if (lastHistory) {
      diffDays = this.calculateDiffDays(new Date(lastHistory.createdAt), currentDate);
    }

    if (diffDays === 1) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { streaks: { increment: 1 }, totalReading: { increment: 1 } },
      });

      user = await this.updateXpAndLevel(user);
    } else if (diffDays === 2) {
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);

      if (yesterday.getDay() !== 0) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { streaks: 1, totalReading: { increment: 1 } },
        });

        user = await this.updateXpAndLevel(user);
      }

    } else if (diffDays > 2) {
      const updateData: any = { streaks: 1, totalReading: { increment: 1 } };
      if (user.streaks > user.personalRecord) {
        updateData.personalRecord = user.streaks;
      }

      user = await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      user = await this.updateXpAndLevel(user);
    } else if (diffDays === 0) {
      console.log("Mesmo dia, mas nenhum registro encontrado na busca por range. Isso não deveria ocorrer.");
    }

    await this.prisma.history.create({ data: { userId: user!.id } });
  }
}

const userService = new UserService();
export const updateUserStreakAndXp = userService.updateUserStreakAndXp.bind(userService);
