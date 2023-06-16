import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb";

export async function GET() {
  const rollers = await prismadb.roller.findMany();
  return NextResponse.json(rollers);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newRoller = await prismadb.roller.create({
    data: {
      student: body.student,
    },
  });
  return NextResponse.json(newRoller);
}
