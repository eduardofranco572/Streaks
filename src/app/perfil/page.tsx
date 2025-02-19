import { Header } from "@/components/header";
import { PrismaClient } from "@prisma/client";
import { PiBookOpenThin } from "react-icons/pi";
import { CiMedal } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { Progress } from "@/components/ui/progress"
import { CalendarPersonalized } from "@/components/CalendarPersonalized";

const prisma = new PrismaClient();

type Props = {
    searchParams: {
      id?: string;
    };
  };

export default async function Perfil(props: Props) {
    const searchParams = await Promise.resolve(props.searchParams);
    const externalId = searchParams.id;
  
    const user = externalId
    ? await prisma.user.findUnique({
        where: { externalId },
        include: { histories: true },
      })
    : null;

    const markedDates = user ? user.histories.map(history => new Date(history.createdAt)) : [];
  
    return (
      <div>
        <Header title="Perfil" backTo="/" />
        {user ? (
            <div className="flex justify-center max-w-2xl mx-auto px-3 h-screen">
                <div className="flex flex-col items-center mt-5 w-full">
                    <h1 className="text-3xl font-bold mb-4">
                        Acompanhe seu progresso
                    </h1>
                    <div className="flex flex-col items-center mt-16 w-full">
                        <div className="flex items-center justify-center flex-col border-4 border-[#FFCE04] rounded-full w-28 h-28 select-none">
                            <h1 className="text-5xl font-bold">
                                {user.streaks}
                            </h1>
                            <p className="text-base mt-2">Dias</p>
                        </div>
                
                        <div className="flex items-center justify-between mt-16 w-full select-none">
                            <div className="relative flex flex-col items-center flex-1">
                                <PiBookOpenThin className="text-4xl" />
                                <p className="text-base text-center mt-2">Total de Leituras</p>
                                <p className="text-base"><span>{user.totalReading}</span>  Dias</p>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-r border-gray-300 h-full"></div>
                            </div>
                            <div className="relative flex flex-col items-center flex-1">
                                <CiMedal className="text-4xl" />
                                <p className="text-base text-center mt-2">Recorde Pessoal</p>
                                <p className="text-base"><span>{user.personalRecord}</span> Dias</p>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-r border-gray-300 h-full"></div>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <CiStar className="text-4xl" />
                                <p className="text-base text-center mt-2">Seu Nível</p>
                                <p className="text-base>1">{user.level}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-16 w-full">
                            <h1>teste para o level</h1>
                            <div className="flex items-center flex-col justify-center w-full">
                                <div className="flex items-center justify-center w-full">
                                    <p>{user.level}</p>
                                    <Progress className="w-[50%] mx-2.5" value={50} />
                                    <p>{user.level + 1}</p>
                                </div>
                                <div className="flex items-center justify-evenly w-full mt-2">
                                    <p className="text-sm">0</p>
                                    <p className="text-sm">{user.experience} XP</p>
                                    <p className="text-sm">100</p>
                                </div>
                            </div>    
                        </div>

                        <div className="flex flex-col items-center mt-16 w-full">
                            <h1>Historico de dias</h1>
                            <div className="mt-5 mb-16">
                                <CalendarPersonalized markedDates={markedDates} />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>          
        ) : (
            <p>Usuário não encontrado.</p>
        )}
      </div>
    );
}

// {user.email}
// {user.id}
// {user.externalId}
// {user.totalReading}
// {user.personalRecord}
// {user.level}
// {user.experience}

//text-[#FFCE04]


// const data = new Date("2025-02-16T00:00:00Z");
// const timestamp = data.getTime();
// console.log(timestamp);