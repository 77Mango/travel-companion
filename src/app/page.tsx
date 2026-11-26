import { prisma } from "@/lib/prisma";

export default async function Home() {
  const listings = await prisma.listing.findMany({ include: { host: true }, take: 12 });
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Travel Companion</h1>
      <p className="mt-1 text-stone-600">Locals earn more, travellers pay less.</p>
      <ul className="mt-6 space-y-3">
        {listings.map((l) => (
          <li key={l.id} className="rounded-lg border bg-white p-4">
            <div className="text-xs uppercase text-stone-500">{l.type} · {l.location}</div>
            <div className="font-semibold">{l.title}</div>
            <div className="text-sm">₹{l.pricePerUnit}/{l.unit} · hosted by {l.host.name}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
