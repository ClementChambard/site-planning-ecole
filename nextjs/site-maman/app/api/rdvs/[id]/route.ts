import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rdv = await prismadb.rdv.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(rdv);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const rdv = await prismadb.rdv.update({
    where: {
      id: params.id,
    },
    data: data,
  });
  return NextResponse.json(rdv);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prismadb.rdv.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "ok" });
}
