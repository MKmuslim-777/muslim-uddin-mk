import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";

export async function GET() {
  await connectDB();
  const seo = await Seo.findOne().lean();
  return NextResponse.json(seo || {});
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const existing = await Seo.findOne();
  const seo = existing
    ? await Seo.findByIdAndUpdate(existing._id, body, { new: true })
    : await Seo.create(body);

  return NextResponse.json(seo);
}
