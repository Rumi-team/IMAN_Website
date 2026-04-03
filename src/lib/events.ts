import { list } from "@vercel/blob";

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

const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Fetch all published months (current + future only) */
export async function fetchPublishedMonths(): Promise<PublishedMonth[]> {
  try {
    const { blobs } = await list({ prefix: "events/" });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const allMonths: PublishedMonth[] = [];

    for (const blob of blobs) {
      try {
        const res = await fetch(blob.url);
        const data = await res.json();
        const mi = MONTH_INDEX[data.month?.toLowerCase()];

        // Skip past months
        if (data.year < currentYear) continue;
        if (data.year === currentYear && mi !== undefined && mi < currentMonth) continue;

        allMonths.push(data);
      } catch {
        // Skip malformed blobs
      }
    }

    return allMonths;
  } catch {
    return [];
  }
}

/** Fetch a specific published month by year and month (1-indexed) */
export async function fetchPublishedMonth(year: number, month: number): Promise<PublishedMonth | null> {
  try {
    const { blobs } = await list({ prefix: "events/" });

    for (const blob of blobs) {
      try {
        const res = await fetch(blob.url);
        const data = await res.json();
        const mi = MONTH_INDEX[data.month?.toLowerCase()];

        if (data.year === year && mi === month - 1) {
          return data;
        }
      } catch {
        // Skip malformed blobs
      }
    }

    return null;
  } catch {
    return null;
  }
}
