import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb";

export async function GET() {
  const rdvs = await prismadb.rdv.findMany();
  return NextResponse.json(rdvs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newRdv = await prismadb.rdv.create({
    data: {
      student: body.student,
      hour: body.hour,
      minute: body.minute,
    },
  });
  return NextResponse.json(newRdv);
}
