import { EngagementChart } from "@/components/dashboard/engagement-chart";
import EngagedUsers from "@/components/dashboard/engaged-users";
import { CadastroBarChart } from "@/components/dashboard/cadastro-bar-chart";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import { EngagementByYearChart } from "@/components/dashboard/engagement-by-year-chart";

export default async function Dashboard() {
  return (
    <main>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Dashboard Administrativo
      </h1>
      <div className="flex items-center justify-center flex-col w-full py-2 px-8 md:px-16 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full">
          <EngagementChart />
          <div className="flex flex-col justify-center gap-4 mt-4 md:ml-2 md:mt-0">
            <DashboardCards />
            <EngagementByYearChart />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between w-full gap-4">
          <div className="justify-self-start w-full">
            <EngagedUsers />
          </div>
          <div className="justify-self-end w-full">
            <CadastroBarChart />
          </div>
        </div>
      </div>
    </main>
  );
}
