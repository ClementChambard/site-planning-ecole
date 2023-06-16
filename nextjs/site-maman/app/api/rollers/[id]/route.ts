import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roller = await prismadb.roller.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(roller);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const roller = await prismadb.roller.update({
    where: {
      id: params.id,
    },
    data: data,
  });
  return NextResponse.json(roller);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prismadb.roller.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "ok" });
}
