import { Progress } from "@/components/ui/progress";

type LevelDetailsProps = {
    userLevel: number;
    userExperience: number;
}

export const LevelDetails = ({
    userLevel,
    userExperience,
}: LevelDetailsProps) => {
    const progress = (userExperience / 500) * 100;

    return (
        <div className="flex flex-col items-center mt-16 w-[70%] border border-[#27272A] rounded-2xl p-4 select-none">
            <h1>Detalhes do seu nível</h1>
            <div className="flex flex-col items-center w-full mt-4">
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex items-center justify-center w-full">
                        <p>{userLevel}</p>
                        <Progress
                            className="w-[80%] mx-2.5"
                            value={progress}
                        />
                        <p>{userLevel + 1}</p>
                    </div>
                    <div className="flex items-center justify-between w-[80%] mt-2">
                        <p className="text-sm">0</p>
                        <p className="text-sm">{userExperience} XP</p>
                        <p className="text-sm">500</p>
                    </div>
                </div>
            </div>
        </div>
    )
}