import type { Prayer, PrayerDate } from "./types";

export interface DailyPrayerResponse {
  prayers: Prayer[];
  date: PrayerDate;
}

export interface MonthlyPrayerDay {
  day: string;
  prayers: Prayer[];
  date: PrayerDate;
}

const ALADHAN_BASE = "https://api.aladhan.com/v1";
const LA_TZ = "America/Los_Angeles";

const FALLBACK_PRAYERS: Prayer[] = [
  { en: "Fajr", fa: "\u0627\u0630\u0627\u0646 \u0635\u0628\u062D", time: "5:27 AM" },
  { en: "Sunrise", fa: "\u0637\u0644\u0648\u0639 \u0622\u0641\u062A\u0627\u0628", time: "6:41 AM" },
  { en: "Dhuhr", fa: "\u0627\u0630\u0627\u0646 \u0638\u0647\u0631", time: "12:57 PM" },
  { en: "Asr", fa: "\u0646\u0645\u0627\u0632 \u0639\u0635\u0631", time: "4:30 PM" },
  { en: "Maghrib", fa: "\u0627\u0630\u0627\u0646 \u0645\u063A\u0631\u0628", time: "7:29 PM" },
  { en: "Isha", fa: "\u0646\u0645\u0627\u0632 \u0639\u0634\u0627", time: "8:18 PM" },
];

const FALLBACK_DATE: PrayerDate = {
  gregorian: "Thursday, Mar 27, 2026",
  shamsi: "\u06F7 \u0641\u0631\u0648\u0631\u062F\u06CC\u0646 \u06F1\u06F4\u06F0\u06F5",
  hijri: "8 Shawwal 1447",
};

const PRAYER_FA_NAMES: Record<string, string> = {
  Fajr: "\u0627\u0630\u0627\u0646 \u0635\u0628\u062D",
  Sunrise: "\u0637\u0644\u0648\u0639 \u0622\u0641\u062A\u0627\u0628",
  Dhuhr: "\u0627\u0630\u0627\u0646 \u0638\u0647\u0631",
  Asr: "\u0646\u0645\u0627\u0632 \u0639\u0635\u0631",
  Maghrib: "\u0627\u0630\u0627\u0646 \u0645\u063A\u0631\u0628",
  Isha: "\u0646\u0645\u0627\u0632 \u0639\u0634\u0627",
};

const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

/** Convert "HH:MM" (24h) to "h:MM AM/PM" */
function to12Hour(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${suffix}`;
}

/** Parse "h:MM AM/PM" to minutes since midnight */
function parse12HourToMinutes(time12: string): number {
  const parts = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!parts) return 0;
  let h = parseInt(parts[1], 10);
  const m = parseInt(parts[2], 10);
  const ampm = parts[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

/** Detect which prayer is currently active based on LA time */
function detectActivePrayer(prayers: Prayer[]): Prayer[] {
  const nowLA = new Date(
    new Date().toLocaleString("en-US", { timeZone: LA_TZ })
  );
  const nowMinutes = nowLA.getHours() * 60 + nowLA.getMinutes();

  const prayerMinutes = prayers.map((p) => parse12HourToMinutes(p.time));

  // Find the current active prayer: the latest prayer whose time has passed
  let activeIndex = -1;
  for (let i = prayerMinutes.length - 1; i >= 0; i--) {
    if (nowMinutes >= prayerMinutes[i]) {
      activeIndex = i;
      break;
    }
  }

  return prayers.map((p, i) => ({
    ...p,
    active: i === activeIndex,
  }));
}

interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface AladhanDateField {
  readable?: string;
  date?: string;
  day?: string;
  month?: { en?: string; number?: number };
  year?: string;
}

interface AladhanHijriDate extends AladhanDateField {
  month?: { en?: string; ar?: string; number?: number };
}

interface AladhanDayData {
  timings: AladhanTimings;
  date: {
    readable?: string;
    gregorian?: AladhanDateField;
    hijri?: AladhanHijriDate;
  };
}

interface AladhanResponse {
  code: number;
  data: AladhanDayData;
}

interface AladhanCalendarResponse {
  code: number;
  data: AladhanDayData[];
}

function formatGregorianDate(data: AladhanDayData): string {
  const g = data.date?.gregorian;
  if (g?.day && g?.month?.en && g?.year) {
    const nowLA = new Date(
      new Date().toLocaleString("en-US", { timeZone: LA_TZ })
    );
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ];
    const dayName = days[nowLA.getDay()];
    return `${dayName}, ${g.month.en.slice(0, 3)} ${g.day}, ${g.year}`;
  }
  return data.date?.readable ?? FALLBACK_DATE.gregorian;
}

function formatHijriDate(data: AladhanDayData): string {
  const h = data.date?.hijri;
  if (h?.day && h?.month?.en && h?.year) {
    return `${h.day} ${h.month.en} ${h.year}`;
  }
  return FALLBACK_DATE.hijri;
}

function parsePrayers(timings: AladhanTimings): Prayer[] {
  return PRAYER_KEYS.map((key) => ({
    en: key,
    fa: PRAYER_FA_NAMES[key],
    time: to12Hour(timings[key].split(" ")[0]),
  }));
}

export async function fetchDailyPrayers(): Promise<DailyPrayerResponse> {
  try {
    const res = await fetch(
      `${ALADHAN_BASE}/timingsByCity?city=Los+Angeles&country=US&method=2`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`Aladhan API returned ${res.status}`);

    const json: AladhanResponse = await res.json();
    const prayers = parsePrayers(json.data.timings);

    const date: PrayerDate = {
      gregorian: formatGregorianDate(json.data),
      shamsi: FALLBACK_DATE.shamsi, // Aladhan does not provide Shamsi dates
      hijri: formatHijriDate(json.data),
    };

    return { prayers: detectActivePrayer(prayers), date };
  } catch {
    return {
      prayers: detectActivePrayer(FALLBACK_PRAYERS),
      date: FALLBACK_DATE,
    };
  }
}

export async function fetchMonthlyPrayers(
  year: number,
  month: number
): Promise<MonthlyPrayerDay[]> {
  try {
    const res = await fetch(
      `${ALADHAN_BASE}/calendarByCity/${year}/${month}?city=Los+Angeles&country=US&method=2`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`Aladhan API returned ${res.status}`);

    const json: AladhanCalendarResponse = await res.json();

    return json.data.map((dayData) => {
      const prayers = parsePrayers(dayData.timings);
      const g = dayData.date?.gregorian;
      const h = dayData.date?.hijri;

      const date: PrayerDate = {
        gregorian: dayData.date?.readable ?? "",
        shamsi: "",
        hijri:
          h?.day && h?.month?.en && h?.year
            ? `${h.day} ${h.month.en} ${h.year}`
            : "",
      };

      return {
        day: g?.day ?? "",
        prayers,
        date,
      };
    });
  } catch {
    return [];
  }
}
