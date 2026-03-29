import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "events/" });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const monthIndex: Record<string, number> = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };

    const allEvents = [];

    for (const blob of blobs) {
      try {
        const res = await fetch(blob.url);
        const data = await res.json();
        const mi = monthIndex[data.month?.toLowerCase()];

        // Skip past months
        if (data.year < currentYear) continue;
        if (data.year === currentYear && mi !== undefined && mi < currentMonth) continue;

        allEvents.push(data);
      } catch {
        // Skip malformed blobs
      }
    }

    return NextResponse.json({ events: allEvents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message, events: [] }, { status: 500 });
  }
}
