import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(request.url);
    const orderBy = searchParams.get("orderBy") || "streaks";

    const allowedFields = ["streaks", "level", "totalReading"];
    if (!allowedFields.includes(orderBy)) {
        return NextResponse.json({ error: "Campo de ordenação inválido" }, { status: 400 });
    }

    try {
    const users = await prisma.user.findMany({
        orderBy: {
        [orderBy]: "desc",
        },
        take: 10,
    });
    return NextResponse.json(users);
    } catch (error) {
        console.error("Erro no endpoint:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
    }
}
