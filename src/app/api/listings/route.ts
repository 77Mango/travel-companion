import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/listings?type=STAY&location=Spiti
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? undefined;
  const location = searchParams.get("location") ?? undefined;

  const listings = await prisma.listing.findMany({
    where: { type, location: location ? { contains: location } : undefined },
    include: { host: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(listings);
}
