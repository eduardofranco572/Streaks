import { Header } from "@/components/header";
import { EngagementChart } from "@/components/engagementChart";
import EngagedUsers from "@/components/EngagedUsers";
export default async function Dashboard() {
  return (
    <div>
      <Header title="Teste" backTo="/" />
      <div className="flex items-center justify-center flex-col w-full p-[2rem]">
        <div className="flex flex-col items-start w-full">
          <h1 className="mb-5">Engajamento geral</h1>
          <div className="border border-[#27272A] rounded-2xl p-2 w-full ">
            <EngagementChart />
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-start justify-start mt-16 w-full">
            <EngagedUsers />
          </div>
          <div className="flex items-start justify-start mt-16 w-full">
            <div className="flex flex-col items-start border border-[#27272A] rounded-2xl p-4 w-full">
              <h1 className="font-semibold">Outro componente ou informação</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
