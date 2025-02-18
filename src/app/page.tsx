import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (email && id) {
    try {
      await prisma.contact.create({
        data: {
          email,
          externalId: id,
        },
      });
      console.log("Contato salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
    }
  }

  return redirect("/login");
}
