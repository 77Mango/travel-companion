// Free AI itinerary generation using Google Gemini (free tier via Google AI Studio).
// If no API key is set, a built-in mock is returned so you can keep building without AI.

export type ItineraryInput = {
  destination: string;
  days: number;
  budgetPerDay?: number;
  preferences: string[];
};

const SYSTEM =
  "You are a travel planner for India. Reply with ONLY valid JSON in this shape: " +
  '{"days":[{"day":1,"title":"","stops":[{"name":"","note":"","estCostINR":0}]}],"tips":[""]}. ' +
  "Favour staying and eating with locals when the traveller prefers local interaction.";

function mockItinerary(input: ItineraryInput) {
  return {
    days: Array.from({ length: input.days }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1} in ${input.destination}`,
      stops: [
        { name: "Morning walk", note: "Explore the village", estCostINR: 0 },
        { name: "Lunch with a local family", note: "Home-cooked food", estCostINR: 150 },
      ],
    })),
    tips: ["(Mock data: add GEMINI_API_KEY in .env for real AI itineraries)"],
  };
}

export async function generateItinerary(input: ItineraryInput) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return mockItinerary(input);

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: JSON.stringify(input) }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}
