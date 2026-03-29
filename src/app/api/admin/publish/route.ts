import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get("iman-admin")?.value;
  return !!cookie && cookie === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { month, year, events } = await req.json();

    if (!month || !year || !events) {
      return NextResponse.json(
        { error: "Missing month, year, or events" },
        { status: 400 }
      );
    }

    const filename = `events/${year}-${month.toLowerCase()}.json`;
    const data = JSON.stringify({ month, year, events, publishedAt: new Date().toISOString() });

    const blob = await put(filename, data, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Publish failed: ${message}` },
      { status: 500 }
    );
  }
}
