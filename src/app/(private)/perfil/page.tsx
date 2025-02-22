"use server";

import { PrismaClient } from "@prisma/client";
import { CalendarPersonalized } from "@/components/calendar-personalized";
import { LevelDetails } from "./_components/level-details";
import { UserInformation } from "./_components/user-information";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserProfile(externalId: string) {
    return await this.prisma.user.findUnique({
      where: { externalId },
      include: { histories: true },
    });
  }
}

const userService = new UserService();

type Props = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function Perfil(props: Props) {
  const searchParams = await Promise.resolve(props.searchParams);
  const externalId = searchParams.id;

  const user = externalId ? await userService.getUserProfile(externalId) : null;

  if (!user) {
    notFound();
  }

  const markedDates = user.histories.map((history) => new Date(history.createdAt));

  return (
    <div>
      <Header/>
      <div className="flex justify-center max-w-2xl mx-auto px-3 h-screen">
        <div className="flex flex-col items-center mt-5 w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Acompanhe seu progresso
          </h1>
          <div className="flex flex-col items-center mt-16 w-full">
            <div className="flex items-center justify-center flex-col border-4 border-[#FFCE04] rounded-full w-28 h-28 select-none shadow-yellow-custom animate-pulsate transition-all duration-300 hover:scale-105 hover:border-yellow-300">
              <h1 className="text-5xl font-bold">{user.streaks}</h1>
              <p className="text-base mt-2">Dias</p>
            </div>
            
            <UserInformation  
              userExperience={user.experience}
              userLevel={user.level}
              userTotalReading={user.totalReading}
              userPersonalRecord={user.personalRecord}
            />

            <LevelDetails 
              userExperience={user.experience}
              userLevel={user.level}
            />

            <div className="flex flex-col items-center mt-16 w-full">
              <h1>Historico de dias</h1>
              <div className="mt-5 mb-16">
                <CalendarPersonalized markedDates={markedDates} />
              </div>
            </div>
          </div>
        </div>
      </div>          
    </div>
  );
}
