import { NextResponse } from "next/server";
import { findBuddies } from "@/lib/matching";

// GET /api/buddies?tripId=...
export async function GET(req: Request) {
  const tripId = new URL(req.url).searchParams.get("tripId");
  if (!tripId) return NextResponse.json({ error: "tripId required" }, { status: 400 });
  return NextResponse.json(await findBuddies(tripId));
}
