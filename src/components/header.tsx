import { ModeToggleTheme } from "@/components/mode-toggle-theme";

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-between relative w-full">
      <div className="bg-custom-gradient w-full min-h-8 flex items-center">
        <div className="ml-auto pr-2 my-2 flex gap-6 items-center">
          <ModeToggleTheme />
        </div>
      </div>
    </header>
  );
};