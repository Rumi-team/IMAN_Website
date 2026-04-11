import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { isAuthed } from "@/lib/admin-auth";
import { randomUUID } from "crypto";

interface HeroSlide {
  imageUrl: string;
  message: string;
  messageFa?: string;
}

const SLIDES_KEY = "hero/slides.json";
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

async function getSlides(): Promise<HeroSlide[]> {
  try {
    const { blobs } = await list({ prefix: "hero/slides" });
    if (blobs.length === 0) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function saveSlides(slides: HeroSlide[]) {
  // Delete existing blob first to avoid overwrite issues
  try {
    const { blobs } = await list({ prefix: "hero/slides" });
    for (const b of blobs) await del(b.url);
  } catch {
    // OK if nothing to delete
  }
  await put(SLIDES_KEY, JSON.stringify(slides), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const slides = await getSlides();
  return NextResponse.json({ slides });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const images = formData.getAll("image") as File[];
    const message = formData.get("message") as string | null;
    const messageFa = formData.get("messageFa") as string | null;

    if (images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    for (const image of images) {
      if (!ALLOWED_TYPES.has(image.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${image.name}. Allowed: JPEG, PNG, WebP` },
          { status: 400 }
        );
      }
      if (image.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${image.name}. Maximum 10MB` },
          { status: 400 }
        );
      }
    }

    const slides = await getSlides();

    for (const image of images) {
      const ext = image.type.split("/")[1] === "jpeg" ? "jpg" : image.type.split("/")[1];
      const filename = `hero/images/${randomUUID()}.${ext}`;
      const blob = await put(filename, image, {
        access: "public",
        contentType: image.type,
        addRandomSuffix: false,
      });
      slides.push({
        imageUrl: blob.url,
        message: message || "",
        messageFa: messageFa || undefined,
      });
    }

    await saveSlides(slides);

    return NextResponse.json({ success: true, count: images.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Upload failed: ${msg}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slides: newOrder } = await req.json() as { slides: HeroSlide[] };
    if (!Array.isArray(newOrder)) {
      return NextResponse.json({ error: "Invalid slides array" }, { status: 400 });
    }
    await saveSlides(newOrder);
    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Reorder failed: ${msg}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    const slides = await getSlides();
    const updated = slides.filter((s) => s.imageUrl !== imageUrl);

    if (updated.length === slides.length) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    try {
      await del(imageUrl);
    } catch {
      // Image may already be deleted
    }

    await saveSlides(updated);
    return NextResponse.json({ success: true, remaining: updated.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Delete failed: ${msg}` }, { status: 500 });
  }
}
