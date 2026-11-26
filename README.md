# Travel Companion

Travellers and locals helping each other: stays, home food, bike rentals, travel buddies, AI itineraries.

## Stack
Next.js 14 (App Router, TypeScript) · Tailwind · Prisma + SQLite (swap to Postgres to deploy) · Google Gemini (free tier) for itineraries

## Setup
```bash
cp .env.example .env        # add your free GEMINI_API_KEY (optional at first)
npm run setup               # install, create DB, seed demo data
npm run dev                 # http://localhost:3000
```

## Try the API
```bash
curl localhost:3000/api/listings?type=STAY
curl -X POST localhost:3000/api/itinerary -H 'content-type: application/json' \
  -d '{"destination":"Spiti Valley","days":5,"budgetPerDay":1500,"preferences":["scenic","low-budget"]}'
```

## Where things live
- `prisma/schema.prisma`: data model (User, Trip, Listing, Request)
- `src/lib/ai.ts`: AI itinerary generation
- `src/lib/matching.ts`: travel-buddy matching (date overlap + shared preferences)
- `src/app/api/*`: backend routes
- `src/app/page.tsx`: home page
