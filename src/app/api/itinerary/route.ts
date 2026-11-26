import { NextResponse } from "next/server";
import { z } from "zod";
import { generateItinerary } from "@/lib/ai";

const Body = z.object({
  destination: z.string().min(2),
  days: z.number().int().min(1).max(30),
  budgetPerDay: z.number().int().positive().optional(),
  preferences: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json(parsed.error.flatten(), { status: 400 });
  try {
    return NextResponse.json(await generateItinerary(parsed.data));
  } catch {
    return NextResponse.json({ error: "Could not generate itinerary" }, { status: 502 });
  }
}
