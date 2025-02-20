import { Header } from "@/components/header";
import { EngagementChart } from "@/components/dashboard/engagementChart";
import EngagedUsers from "@/components/dashboard/engagedUsers";
import { CadastroBarChart } from "@/components/dashboard/cadastroBarChart";  

export default async function Dashboard() {
  return (
    <div>  
      <Header title="Teste" backTo="/" />  
      <h1 className="flex items-center justify-center text-base font-semibold mb-4">Dashboard Administrativo</h1>
      <div className="flex items-center justify-center flex-col w-[100%] p-2">
        <div className="flex flex-col w-[80%] items-center justify-center">
          <div className="flex flex-col items-start w-full">
            <EngagementChart />
          </div>
          <div className="flex flex-col xl:flex-row w-full gap-4 mt-16 items-stretch">
            <div className="flex-1 min-h-0">
              <EngagedUsers />
            </div>
            <div className="flex-1 min-h-0">
              <CadastroBarChart />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
