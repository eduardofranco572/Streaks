import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateXpAndLevel = async (user: any, email: string) => {
  // Se a sequência for maior que 1, aplica o bônus; caso contrário, soma 100 xp fixos
  const xpIncrement = user.streaks > 1 ? (1 + (user.streaks / 6) * 0.1) * 100 : 100;
  let newExperience = user.experience + xpIncrement;
  let newLevel = user.level;

  while (newExperience >= 500) {
    newExperience -= 500;
    newLevel++;
  }

  return await prisma.user.update({
    where: { email },
    data: { experience: newExperience, level: newLevel },
  });
};

export const updateUserStreakAndXp = async (email: string, externalId: string) => {
  const currentDate = new Date();

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    const lastHistory = await prisma.history.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (lastHistory) {
      const lastDate = new Date(lastHistory.createdAt);
      const diffTime = currentDate.getTime() - lastDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Atualiza dia seguinte – incrementa streak e totalReading
        user = await prisma.user.update({
          where: { email },
          data: { streaks: { increment: 1 }, totalReading: { increment: 1 } },
        });
        user = await updateXpAndLevel(user, email);
      } else if (diffDays === 2) {
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday.getDay() !== 0) {
            // Se ontem não foi domingo: reseta streak para 1 e incrementa totalReading
          user = await prisma.user.update({
            where: { email },
            data: { streaks: 1, totalReading: { increment: 1 } },
          });
          user = await updateXpAndLevel(user, email);
        }
      } else if (diffDays > 2) {
        // Sequência quebrada se o streak anterior foi o recorde pessoal, atualiza o personalRecord
        if (user.streaks > user.personalRecord) {
          user = await prisma.user.update({
            where: { email },
            data: { personalRecord: user.streaks, streaks: 1, totalReading: { increment: 1 } },
          });
        } else {
          user = await prisma.user.update({
            where: { email },
            data: { streaks: 1, totalReading: { increment: 1 } },
          });
        }
        user = await updateXpAndLevel(user, email);
      } else if (diffDays === 0) {
        // Caso já tenha sido registrado um histórico hoje
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const todayHistory = await prisma.history.findFirst({
          where: {
            userId: user.id,
            createdAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        });

        if (!todayHistory) {
            
          user = await prisma.user.update({
            where: { email },
            data: { streaks: { increment: 1 }, totalReading: { increment: 1 } },
          });
          user = await updateXpAndLevel(user, email);
        }
      }
    } else {
      // Se não houver histórico, inicializa com 1
      user = await prisma.user.update({
        where: { email },
        data: { streaks: 1, totalReading: { increment: 1 } },
      });
      user = await updateXpAndLevel(user, email);
    }
  } else {
    user = await prisma.user.create({
      data: {
        email,
        externalId,
        streaks: 1,
        totalReading: 1,
        experience: 100,
        level: 1,
      },
    });
  }

  await prisma.history.create({
    data: {
      userId: user.id,
    },
  });

  console.log("Streak, XP, nível e total de leituras atualizados e histórico registrado com sucesso!");
};
