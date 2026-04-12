import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GeoDivider from "@/components/GeoDivider";
import PrayerCard from "@/components/PrayerCard";
import { fetchDailyPrayers, fetchMonthlyPrayers } from "@/lib/prayer-api";
import type { MonthlyPrayerDay } from "@/lib/prayer-api";
import { fetchPublishedMonth } from "@/lib/events";
import type { PublishedEvent } from "@/lib/events";
import { list } from "@vercel/blob";

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

/** Convert "HH:MM" (24h) to "h:MM AM/PM" */
function to12Hour(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  if (isNaN(h)) return time24;
  const suffix = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${suffix}`;
}

export default async function PrayerTimesPage() {
  // Dynamic: use current month in LA timezone
  const laDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentYear = laDate.getFullYear();
  const currentMonth = laDate.getMonth() + 1; // 1-indexed
  const currentDay = laDate.getDate();
  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [dailyData, monthlyDataRaw, published, scheduleImageUrl] = await Promise.all([
    fetchDailyPrayers(),
    fetchMonthlyPrayers(currentYear, currentMonth).catch(() => [] as MonthlyPrayerDay[]),
    fetchPublishedMonth(currentYear, currentMonth),
    list({ prefix: "prayer-schedule/" }).then(({ blobs }) => blobs[0]?.url ?? null).catch(() => null),
  ]);

  // Build event lookup from published data: day -> event names
  const eventsByDay: Record<number, PublishedEvent[]> = {};
  if (published?.events) {
    for (const ev of published.events) {
      if (!eventsByDay[ev.day]) eventsByDay[ev.day] = [];
      eventsByDay[ev.day].push(ev);
    }
  }

  // Build prayer time lookup from published data: day -> times
  const publishedTimesByDay: Record<number, { day: number; fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string }> = {};
  if (published?.prayerTimes) {
    for (const pt of published.prayerTimes) {
      publishedTimesByDay[pt.day] = pt;
    }
  }
  const hasPublishedTimes = Object.keys(publishedTimesByDay).length > 0;

  // If published prayer times exist, use them. Otherwise fall back to Aladhan.
  let monthlyRows: Array<{
    day: number;
    dayName: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  }>;

  if (hasPublishedTimes) {
    // Use admin-uploaded IMAN prayer times
    const days = Object.keys(publishedTimesByDay).map(Number).sort((a, b) => a - b);
    monthlyRows = days.map((dayNum) => {
      const pt = publishedTimesByDay[dayNum];
      const dateObj = new Date(currentYear, currentMonth - 1, dayNum);
      const dayName = DAY_NAMES[dateObj.getDay()];
      return {
        day: dayNum,
        dayName,
        fajr: to12Hour(pt.fajr),
        sunrise: to12Hour(pt.sunrise),
        dhuhr: to12Hour(pt.dhuhr),
        asr: to12Hour(pt.asr),
        maghrib: to12Hour(pt.maghrib),
        isha: to12Hour(pt.isha),
      };
    });
  } else {
    // Fall back to Aladhan API
    monthlyRows = monthlyDataRaw.map((row) => {
      const dayNum = parseInt(row.day, 10);
      const dateObj = new Date(currentYear, currentMonth - 1, dayNum);
      const dayName = DAY_NAMES[dateObj.getDay()];
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
  }

  const today = currentDay;

  return (
    <>
      <Navbar />
      <PageHero
        title="Prayer Times"
        titleFa="اوقات شرعی"
      />

      {/* ===== TODAY ===== */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col items-center">
          <SectionHeader
            overline="Today"
            title="Daily Prayer Times"
            titleFa="اوقات شرعی امروز"
            className="text-center"
          />
          <div className="w-full max-w-[480px]">
            <PrayerCard
              prayers={
                hasPublishedTimes && publishedTimesByDay[currentDay]
                  ? (() => {
                      const pt = publishedTimesByDay[currentDay];
                      return [
                        { en: "Fajr", fa: "اذان صبح", time: to12Hour(pt.fajr) },
                        { en: "Sunrise", fa: "طلوع آفتاب", time: to12Hour(pt.sunrise) },
                        { en: "Dhuhr", fa: "اذان ظهر", time: to12Hour(pt.dhuhr) },
                        { en: "Asr", fa: "نماز عصر", time: to12Hour(pt.asr) },
                        { en: "Maghrib", fa: "اذان مغرب", time: to12Hour(pt.maghrib) },
                        { en: "Isha", fa: "نماز عشا", time: to12Hour(pt.isha) },
                      ];
                    })()
                  : dailyData.prayers
              }
              date={{ gregorian: dailyData.date.gregorian, shamsi: "", hijri: "" }}
              calendarHref="#monthly-calendar"
            />
          </div>
        </div>
      </section>

      {/* ===== OFFICIAL SCHEDULE IMAGE ===== */}
      {scheduleImageUrl && (
        <>
          <GeoDivider />
          <section className="py-12">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
              <SectionHeader
                overline="Official Schedule"
                title="IMAN Prayer Schedule"
                titleFa="برنامه نماز ایمان"
              />
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 text-center">
                <p className="text-xs text-[var(--muted)] mb-3">Official schedule provided by IMAN</p>
                {scheduleImageUrl.endsWith(".pdf") ? (
                  <a
                    href={scheduleImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    View Full Schedule PDF &rarr;
                  </a>
                ) : (
                  <img
                    src={scheduleImageUrl}
                    alt="IMAN official prayer schedule"
                    className="max-w-full rounded-lg mx-auto"
                  />
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <GeoDivider />

      {/* ===== MONTHLY CALENDAR ===== */}
      <section id="monthly-calendar" className="bg-[var(--surface)] py-12 scroll-mt-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Monthly Calendar"
            title={`${monthNames[currentMonth]} ${currentYear} Prayer Times`}
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
                    const dayEvents = eventsByDay[row.day] || [];
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
                            className="block font-[IranNastaliq] text-xs text-[var(--muted)]"
                            dir="rtl"
                            lang="fa"
                          >
                            {farsiDay}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[var(--text-secondary)]">
                          {monthNames[currentMonth].slice(0, 3)} {row.day}
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
                          {dayEvents.length > 0 ? (
                            <div className="space-y-0.5">
                              {dayEvents.map((ev, j) => (
                                <span
                                  key={j}
                                  className={`block text-xs font-medium ${
                                    ev.type === "special"
                                      ? "text-[var(--gold)]"
                                      : "text-[var(--accent)]"
                                  }`}
                                >
                                  {ev.eventEn}
                                </span>
                              ))}
                            </div>
                          ) : null}
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
