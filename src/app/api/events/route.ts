import { NextResponse } from "next/server";
import { fetchPublishedMonths, fetchPublishedMonth } from "@/lib/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month"); // 1-indexed number

  try {
    // Specific month requested
    if (yearParam && monthParam) {
      const data = await fetchPublishedMonth(
        parseInt(yearParam),
        parseInt(monthParam)
      );
      if (data) {
        return NextResponse.json(data);
      }
      return NextResponse.json({ events: [], prayerTimes: [] });
    }

    // Return all current/future months
    const allMonths = await fetchPublishedMonths();
    return NextResponse.json({ events: allMonths });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message, events: [] }, { status: 500 });
  }
}
