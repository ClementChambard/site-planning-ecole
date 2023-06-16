import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (body.password === "MamanQueJ'Aime") {
    return NextResponse.json({ message: "OK" });
  } else {
    return NextResponse.json({ message: "NON" });
  }
}
