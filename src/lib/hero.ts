import { list } from "@vercel/blob";

export interface HeroSlide {
  imageUrl: string;
  message: string;
  messageFa?: string;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { blobs } = await list({ prefix: "hero/slides" });
    if (blobs.length === 0) return [];
    const res = await fetch(blobs[0].url);
    return await res.json();
  } catch {
    return [];
  }
}
