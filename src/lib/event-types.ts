export const EVENT_TYPES = ["special", "recurring"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const TYPE_COLORS: Record<string, string> = {
  special: "bg-[var(--lapis)]",
  recurring: "bg-[var(--accent)]",
};

/** Badge text colors for admin UI */
export const TYPE_BADGE_COLORS: Record<string, string> = {
  special: "bg-[var(--lapis)]/10 text-[var(--lapis)]",
  recurring: "bg-[var(--muted)]/10 text-[var(--muted)]",
};

/** Canonical recurring event names for dedup matching */
export const CANONICAL_RECURRING: Record<string, { fa: string; schedule: string; scheduleFa: string; desc: string }> = {
  "dua kumayl": {
    fa: "دعای کمیل",
    schedule: "Every Thursday, 7:30 PM",
    scheduleFa: "هر پنج‌شنبه",
    desc: "Weekly Thursday evening supplication followed by community fellowship and refreshments.",
  },
  "jumua prayer": {
    fa: "نماز جمعه",
    schedule: "Every Friday, 1:00 PM",
    scheduleFa: "هر جمعه",
    desc: "Friday congregational prayer with sermon. Open to all members of the community.",
  },
  "quran class": {
    fa: "کلاس قرآن",
    schedule: "Weekly",
    scheduleFa: "هفتگی",
    desc: "Quran recitation and study class open to the community.",
  },
};

/** Normalize event name for canonical matching (strips diacritics, apostrophes, extra spaces) */
export function normalizeEventName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`ʼ\-–—]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Find canonical match for a recurring event name */
export function findCanonicalRecurring(eventEn: string) {
  const normalized = normalizeEventName(eventEn);
  for (const [key, data] of Object.entries(CANONICAL_RECURRING)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return { key, ...data };
    }
  }
  return null;
}
