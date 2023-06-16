import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb";

export async function GET() {
  const piscines = await prismadb.piscine.findMany();
  return NextResponse.json(piscines);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newPiscine = await prismadb.piscine.create({
    data: {
      date: new Date(body.date),
    },
  });
  return NextResponse.json(newPiscine);
}
