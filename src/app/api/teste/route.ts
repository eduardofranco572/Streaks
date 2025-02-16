import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        "username":"Alex"
    }

    return NextResponse.json(data,{status:201})
}