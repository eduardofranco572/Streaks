import { ModeToggleTheme } from "@/components/mode-toggle-theme";

type HeaderProps = {
  title: string;
  backTo?: string;
};

export const Header = ({ title, backTo }: HeaderProps) => {
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

{
  /*  import Link from "next/link";
      import { Button } from "@/components/ui/button";
      import Icon from "@/components/ui/icon";
      {backTo && (
        <Button size="icon" className="[&_svg]:size-6 " asChild>
          <Link href={backTo}>
            <Icon color="white" name="ArrowLeft" size={32} />
          </Link>
        </Button>
      )} 
  */
}