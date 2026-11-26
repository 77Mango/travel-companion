import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Travel Companion", description: "Travellers and locals, helping each other" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
