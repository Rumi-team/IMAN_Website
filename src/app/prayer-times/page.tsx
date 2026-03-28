import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GeoDivider from "@/components/GeoDivider";
import PrayerCard from "@/components/PrayerCard";
import { fetchDailyPrayers, fetchMonthlyPrayers } from "@/lib/prayer-api";
import type { MonthlyPrayerDay } from "@/lib/prayer-api";

export const metadata: Metadata = {
  title: "Prayer Times | IMAN",
  description:
    "Daily and monthly prayer times for Los Angeles. Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times for the IMAN community.",
  openGraph: {
    title: "Prayer Times | IMAN",
    description:
      "Daily and monthly prayer times for Los Angeles. Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times for the IMAN community.",
    url: "https://iman.org/prayer-times",
    siteName: "IMAN",
    type: "website",
  },
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FARSI_DAYS: Record<string, string> = {
  Sun: "یکشنبه",
  Mon: "دوشنبه",
  Tue: "سه‌شنبه",
  Wed: "چهارشنبه",
  Thu: "پنجشنبه",
  Fri: "جمعه",
  Sat: "شنبه",
};

function getEventForDay(dayName: string): string | null {
  if (dayName === "Thu") return "Dua Kumayl";
  if (dayName === "Fri") return "Jumu'ah";
  return null;
}

export default async function PrayerTimesPage() {
  const [dailyData, monthlyDataRaw] = await Promise.all([
    fetchDailyPrayers(),
    fetchMonthlyPrayers(2026, 3).catch(() => [] as MonthlyPrayerDay[]),
  ]);

  // Transform MonthlyPrayerDay[] into flat rows for the table
  const monthlyRows = monthlyDataRaw.map((row) => {
    const dayNum = parseInt(row.day, 10);
    const dateObj = new Date(2026, 2, dayNum); // March = month 2
    const dayName = DAY_NAMES[dateObj.getDay()];

    // Extract individual prayer times from the prayers array
    const prayerMap: Record<string, string> = {};
    for (const p of row.prayers) {
      prayerMap[p.en] = p.time;
    }

    return {
      day: dayNum,
      dayName,
      fajr: prayerMap["Fajr"] ?? "",
      sunrise: prayerMap["Sunrise"] ?? "",
      dhuhr: prayerMap["Dhuhr"] ?? "",
      asr: prayerMap["Asr"] ?? "",
      maghrib: prayerMap["Maghrib"] ?? "",
      isha: prayerMap["Isha"] ?? "",
    };
  });

  // Current day for highlighting (March 27)
  const today = 27;

  return (
    <>
      <Navbar />
      <PageHero
        title="Prayer Times"
        titleFa="اوقات شرعی"
      />

      {/* ===== TODAY ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col items-center">
          <SectionHeader
            overline="Today"
            title="Daily Prayer Times"
            titleFa="اوقات شرعی امروز"
            className="text-center"
          />
          <div className="w-full max-w-[480px]">
            <PrayerCard prayers={dailyData.prayers} date={dailyData.date} calendarHref="#monthly-calendar" />
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== MONTHLY CALENDAR ===== */}
      <section id="monthly-calendar" className="bg-[var(--surface)] py-24 scroll-mt-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Monthly Calendar"
            title="March 2026 Prayer Times"
            titleFa="تقویم ماهانه"
          />

          {monthlyRows.length === 0 ? (
            <p className="text-[var(--text-secondary)]">
              Prayer times data is currently unavailable. Please check back
              later.
            </p>
          ) : (
            <>
            <p className="text-xs text-[var(--muted)] mb-2 lg:hidden">Scroll horizontally to see all times →</p>
            <div className="overflow-x-auto rounded-lg border border-[var(--line-light)]">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-[var(--accent)] text-white">
                    <th className="px-3 py-3 text-left font-semibold text-xs tracking-wide">
                      Day
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-xs tracking-wide">
                      Date
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Fajr
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Sunrise
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Dhuhr
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Asr
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Maghrib
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-xs tracking-wide">
                      Isha
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-xs tracking-wide">
                      Events
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRows.map((row, i) => {
                    const isToday = row.day === today;
                    const isEven = i % 2 === 0;
                    const event = getEventForDay(row.dayName);
                    const farsiDay = FARSI_DAYS[row.dayName] || "";

                    return (
                      <tr
                        key={row.day}
                        className={`transition-colors ${
                          isToday
                            ? "border-l-[3px] border-l-[var(--gold)] bg-[var(--gold)]/5"
                            : isEven
                            ? "bg-[var(--surface)]"
                            : "bg-[var(--bg)]"
                        }`}
                      >
                        <td className="px-3 py-2.5">
                          <span className="font-medium text-[var(--text)]">
                            {row.dayName}
                          </span>
                          <span
                            className="block font-[family-name:var(--font-farsi)] text-xs text-[var(--muted)]"
                            dir="rtl"
                            lang="fa"
                          >
                            {farsiDay}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[var(--text-secondary)]">
                          Mar {row.day}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.fajr}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.sunrise}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.dhuhr}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.asr}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.maghrib}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text)]">
                          {row.isha}
                        </td>
                        <td className="px-3 py-2.5">
                          {event && (
                            <span className="text-xs font-medium text-[var(--accent)]">
                              {event}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
