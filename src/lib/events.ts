import { list } from "@vercel/blob";
import { MONTH_INDEX } from "@/lib/months";

export interface PublishedEvent {
  day: number;
  eventEn: string;
  eventFa: string;
  type: string;
}

export interface PublishedPrayerTime {
  day: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PublishedMonth {
  month: string;
  year: number;
  events: PublishedEvent[];
  prayerTimes: PublishedPrayerTime[];
  publishedAt?: string;
}

/** Fetch all published months (current + future only) */
export async function fetchPublishedMonths(): Promise<PublishedMonth[]> {
  try {
    const { blobs } = await list({ prefix: "events/" });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const results = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url);
          const data = await res.json();
          const mi = MONTH_INDEX[data.month?.toLowerCase()];

          if (data.year < currentYear) return null;
          if (data.year === currentYear && mi !== undefined && mi < currentMonth) return null;

          return data as PublishedMonth;
        } catch {
          return null;
        }
      })
    );

    return results.filter((m): m is PublishedMonth => m !== null);
  } catch {
    return [];
  }
}

/** Fetch a specific published month by year and month (1-indexed) */
export async function fetchPublishedMonth(year: number, month: number): Promise<PublishedMonth | null> {
  try {
    const { blobs } = await list({ prefix: "events/" });

    const results = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url);
          const data = await res.json();
          const mi = MONTH_INDEX[data.month?.toLowerCase()];

          if (data.year === year && mi === month - 1) return data as PublishedMonth;
          return null;
        } catch {
          return null;
        }
      })
    );

    return results.find((m): m is PublishedMonth => m !== null) ?? null;
  } catch {
    return null;
  }
}
