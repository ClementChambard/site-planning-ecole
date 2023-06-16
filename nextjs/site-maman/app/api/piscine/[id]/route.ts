import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const piscine = await prismadb.piscine.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(piscine);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  let data = await req.json();
  if (data.date) data = { ...data, date: new Date(data?.date) };
  const piscine = await prismadb.piscine.update({
    where: {
      id: params.id,
    },
    data: data,
  });
  return NextResponse.json(piscine);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prismadb.piscine.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "ok" });
}
