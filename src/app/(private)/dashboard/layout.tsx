import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Streaks - Dashboard",
  };

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
      <>
        {children}
      </>
    )
}
  