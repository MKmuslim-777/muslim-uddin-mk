import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function GET() {
  await connectDB();
  const hero = await Hero.findOne().lean();
  return NextResponse.json(hero || {});
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const existing = await Hero.findOne();
  const hero = existing
    ? await Hero.findByIdAndUpdate(existing._id, body, { new: true })
    : await Hero.create(body);

  return NextResponse.json(hero);
}
