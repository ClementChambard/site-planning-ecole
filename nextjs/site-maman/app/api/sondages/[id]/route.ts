import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const sondage = await prismadb.sondage.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(sondage);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const sondage = await prismadb.sondage.update({
    where: {
      id: params.id,
    },
    data: data,
  });
  return NextResponse.json(sondage);
}

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  await prismadb.sondage.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "ok" });
}
