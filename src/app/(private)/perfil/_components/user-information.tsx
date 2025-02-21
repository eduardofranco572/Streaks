import { PiBookOpenThin } from "react-icons/pi";
import { CiMedal } from "react-icons/ci";
import { CiStar } from "react-icons/ci";

type LevelDetailsProps = {
    userLevel: number;
    userExperience: number;
    userTotalReading: number;
    userPersonalRecord: number;
}

export const UserInformation = ({
    userLevel,
    userExperience,
    userTotalReading,
    userPersonalRecord
}: LevelDetailsProps) => {
    const progress = (userExperience / 500) * 100;

    return (
        <div className="flex items-center justify-between mt-16 w-full select-none">
            <div className="relative flex flex-col items-center flex-1">
                <PiBookOpenThin className="text-4xl" />
                <p className="text-base text-center mt-2">Total de Leituras</p>
                <p className="text-base"><span>{userTotalReading}</span>  Dias</p>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-r border-gray-300 h-full"></div>
            </div>
            <div className="relative flex flex-col items-center flex-1">
                <CiMedal className="text-4xl" />
                <p className="text-base text-center mt-2">Recorde Pessoal</p>
                <p className="text-base"><span>{userPersonalRecord}</span> Dias</p>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-r border-gray-300 h-full"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
                <CiStar className="text-4xl" />
                <p className="text-base text-center mt-2">Seu Nível</p>
                <p className="text-base>1">{userLevel}</p>
            </div>
        </div> 
    )
}