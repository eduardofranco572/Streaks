import { redirect } from "next/navigation";
import { updateUserStreakAndXp } from "@/services/user-streak";

interface HomePageProps {
  searchParams: {
    email?: string | string[];
    id?: string | string[];
    [key: string]: string | string[] | undefined;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await Promise.resolve(searchParams);
  const emailParam = params.email;
  const idParam = params.id;

  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const externalId = Array.isArray(idParam) ? idParam[0] : idParam;

  if (email && externalId) {
    await updateUserStreakAndXp(email, externalId);
    return redirect(`/login?email=${email}&id=${externalId}`);
  }

  return redirect("/login");
}
