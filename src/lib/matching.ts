import { prisma } from "./prisma";

// Find other travellers going to the same place with overlapping dates.
// Score = days of overlap + number of shared preferences.
export async function findBuddies(tripId: string) {
  const trip = await prisma.trip.findUniqueOrThrow({ where: { id: tripId } });
  const myPrefs: string[] = JSON.parse(trip.preferences);

  const candidates = await prisma.trip.findMany({
    where: {
      id: { not: trip.id },
      userId: { not: trip.userId },
      destination: trip.destination,
      startDate: { lte: trip.endDate },
      endDate: { gte: trip.startDate },
    },
    include: { user: { select: { id: true, name: true } } },
  });

  const DAY = 86_400_000;
  return candidates
    .map((c) => {
      const overlapDays =
        (Math.min(+c.endDate, +trip.endDate) - Math.max(+c.startDate, +trip.startDate)) / DAY + 1;
      const shared = (JSON.parse(c.preferences) as string[]).filter((p) => myPrefs.includes(p)).length;
      return { trip: c, score: overlapDays + shared * 2 };
    })
    .sort((a, b) => b.score - a.score);
}
