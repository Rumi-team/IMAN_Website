import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { isAuthed } from "@/lib/admin-auth";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "prayer-schedule/" });
    if (blobs.length === 0) {
      return NextResponse.json({ url: null });
    }
    return NextResponse.json({ url: blobs[0].url });
  } catch {
    return NextResponse.json({ url: null });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(image.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, PDF" },
        { status: 400 }
      );
    }

    if (image.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 10MB" },
        { status: 400 }
      );
    }

    const ext = image.type === "application/pdf" ? "pdf" : image.type.split("/")[1] === "jpeg" ? "jpg" : image.type.split("/")[1];
    const filename = `prayer-schedule/current.${ext}`;
    const blob = await put(filename, image, {
      access: "public",
      contentType: image.type,
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Upload failed: ${msg}` }, { status: 500 });
  }
}
