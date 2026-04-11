import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { EVENT_TYPES } from "@/lib/event-types";
import { isAuthed } from "@/lib/admin-auth";
import { MONTH_INDEX, VALID_MONTHS } from "@/lib/months";

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { month, year, events, prayerTimes } = await req.json();

    if (!month || !year || !events) {
      return NextResponse.json(
        { error: "Missing month, year, or events" },
        { status: 400 }
      );
    }

    if (!VALID_MONTHS.has(month.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid month name" },
        { status: 400 }
      );
    }

    // Validate and normalize event types
    const validTypes = new Set<string>(EVENT_TYPES);
    const validatedEvents = events.map((e: { type?: string; [key: string]: unknown }) => ({
      ...e,
      type: validTypes.has(e.type ?? "") ? e.type : "special",
    }));

    const filename = `events/${year}-${month.toLowerCase()}.json`;
    const data = JSON.stringify({
      month,
      year,
      events: validatedEvents,
      prayerTimes,
      publishedAt: new Date().toISOString(),
    });

    const blob = await put(filename, data, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    // Cleanup: delete blobs older than 1 month (keep current + previous)
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-indexed

      const { blobs } = await list({ prefix: "events/" });
      for (const b of blobs) {
        if (b.url === blob.url) continue; // skip the one we just wrote

        // Parse month from blob pathname (events/2026-april.json)
        const match = b.pathname.match(/events\/(\d+)-(\w+)\.json/);
        if (!match) continue;
        const blobYear = parseInt(match[1], 10);
        const blobMonth = MONTH_INDEX[match[2]];
        if (blobMonth === undefined) continue;

        // Keep current month and previous month
        const blobDate = new Date(blobYear, blobMonth);
        const cutoff = new Date(currentYear, currentMonth - 1); // 1 month ago
        if (blobDate < cutoff) {
          await del(b.url);
        }
      }
    } catch {
      // Cleanup failure is non-fatal
    }

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Publish failed: ${message}` },
      { status: 500 }
    );
  }
}
