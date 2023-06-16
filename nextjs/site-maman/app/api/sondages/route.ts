import prismadb from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const sondages = await prismadb.sondage.findMany({});
  return NextResponse.json(sondages);
}

export async function POST(req: Request) {
  const body = await req.json();
  const sondage = await prismadb.sondage.create({
    data: {
      name: body.name,
      active: body.active,
      buttonText: body.buttonText,
      info: body.info,
    },
  });
  return NextResponse.json(sondage);
}
