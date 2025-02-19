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
  const externalId = Array.isArray(idParam) ? idParam[0] : idParam;

  if (email && externalId) {
    try {
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { email },
          data: { streaks: { increment: 1 } },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email,
            externalId,
            streaks: 1,
          },
        });
      }

      await prisma.history.create({
        data: {
          userId: user.id,
        },
      });

      console.log("Streak atualizado e histórico registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar o streak do usuário:", error);
    }
    return redirect(`/login?email=${email}&id=${externalId}`);
  } else {
    return redirect('/login');
  }
}
