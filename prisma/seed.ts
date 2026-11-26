import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const local = await prisma.user.upsert({
    where: { email: "dolma@example.com" },
    update: {},
    create: { name: "Dolma", email: "dolma@example.com", role: "LOCAL", bio: "Homestay host in Spiti" },
  });
  const traveller = await prisma.user.upsert({
    where: { email: "asha@example.com" },
    update: {},
    create: { name: "Asha", email: "asha@example.com", role: "TRAVELLER" },
  });

  await prisma.listing.createMany({
    data: [
      { hostId: local.id, type: "STAY", title: "Room in family home", description: "Warm room, mountain view", location: "Kaza, Spiti", pricePerUnit: 600, unit: "night" },
      { hostId: local.id, type: "FOOD", title: "Home-cooked thali", description: "3-4 plates, local dishes", location: "Kaza, Spiti", pricePerUnit: 150, unit: "plate" },
      { hostId: local.id, type: "VEHICLE", title: "Royal Enfield (spare)", description: "Well maintained, helmet included", location: "Kaza, Spiti", pricePerUnit: 500, unit: "day" },
    ],
  });

  await prisma.trip.create({
    data: {
      userId: traveller.id,
      destination: "Spiti Valley",
      startDate: new Date("2027-06-10"),
      endDate: new Date("2027-06-17"),
      budgetPerDay: 1500,
      preferences: JSON.stringify(["scenic", "low-budget", "local-interaction"]),
    },
  });
}

main().finally(() => prisma.$disconnect());
