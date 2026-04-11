import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { fetchPublishedMonths } from "@/lib/events";
import type { PublishedEvent } from "@/lib/events";
import {
  TYPE_COLORS,
  CANONICAL_RECURRING,
  findCanonicalRecurring,
} from "@/lib/event-types";

export const metadata: Metadata = {
  title: "Events | IMAN",
  description:
    "Upcoming events at IMAN including Eid celebrations, Nowruz, Muharram, weekly prayers, and community gatherings in Los Angeles.",
  openGraph: {
    title: "Events | IMAN",
    description:
      "Upcoming events at IMAN including Eid celebrations, Nowruz, Muharram, weekly prayers, and community gatherings.",
    url: "https://iman.org/events",
    siteName: "IMAN",
    type: "website",
  },
};

/** Hardcoded fallback for recurring events when no published data exists */
const FALLBACK_RECURRING = [
  {
    en: "Dua Kumayl",
    fa: "دعای کمیل",
    schedule: "Every Thursday, 7:30 PM",
    scheduleFa: "هر پنج‌شنبه",
    desc: "Weekly Thursday evening supplication followed by community fellowship and refreshments.",
  },
  {
    en: "Jumu'ah Prayer",
    fa: "نماز جمعه",
    schedule: "Every Friday, 1:00 PM",
    scheduleFa: "هر جمعه",
    desc: "Friday congregational prayer with sermon. Open to all members of the community.",
  },
];

interface DeduplicatedRecurring {
  en: string;
  fa: string;
  schedule: string;
  scheduleFa: string;
  desc: string;
}

/** Deduplicate recurring events using canonical name matching */
function deduplicateRecurring(
  events: PublishedEvent[]
): DeduplicatedRecurring[] {
  const seen = new Set<string>();
  const result: DeduplicatedRecurring[] = [];

  for (const event of events) {
    const canonical = findCanonicalRecurring(event.eventEn);
    const key = canonical ? canonical.key : event.eventEn.toLowerCase();

    if (seen.has(key)) continue;
    seen.add(key);

    if (canonical) {
      result.push({
        en: event.eventEn,
        fa: canonical.fa,
        schedule: canonical.schedule,
        scheduleFa: canonical.scheduleFa,
        desc: canonical.desc,
      });
    } else {
      // Non-canonical recurring event — show with basic info
      result.push({
        en: event.eventEn,
        fa: event.eventFa,
        schedule: "Weekly",
        scheduleFa: "هفتگی",
        desc: "",
      });
    }
  }

  return result;
}

export default async function EventsPage() {
  const months = await fetchPublishedMonths();

  // Flatten all events across published months with month context
  const allEvents: Array<PublishedEvent & { month: string; year: number }> = [];
  for (const m of months) {
    for (const e of m.events) {
      allEvents.push({ ...e, month: m.month, year: m.year });
    }
  }

  // Split by type
  const special = allEvents.filter(
    (e) => e.type === "special" || !["recurring", "special"].includes(e.type)
  );
  const recurringEvents = allEvents.filter((e) => e.type === "recurring");
  const recurringCards = deduplicateRecurring(recurringEvents);

  return (
    <>
      <Navbar />
      <PageHero title="Upcoming Events" titleFa="رویدادهای پیش رو" />

      {/* ===== 1. SPECIAL EVENTS ===== */}
      {special.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <SectionHeader
              overline="From Admin"
              title="Special Events"
              titleFa="رویدادهای ویژه"
            />

            {months.map((m) => {
              const monthEvents = special.filter(
                (e) => e.month === m.month && e.year === m.year
              );
              if (monthEvents.length === 0) return null;

              return (
                <div key={`${m.month}-${m.year}`} className="mb-10">
                  <div className="inline-block bg-[var(--lapis)] text-white px-4 py-1.5 rounded-lg mb-4">
                    <span className="font-[family-name:var(--font-display)] font-semibold">
                      {m.month} {m.year}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthEvents.map((event, i) => (
                      <div
                        key={i}
                        className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div
                          className={`${TYPE_COLORS[event.type] || "bg-[var(--accent)]"} text-white p-3 text-center`}
                        >
                          <div className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-none">
                            {event.day}
                          </div>
                          <div className="text-xs font-medium tracking-widest uppercase opacity-90">
                            {event.month}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-[family-name:var(--font-display)] text-base font-medium text-[var(--text)] mb-1">
                            {event.eventEn}
                          </h4>
                          <p
                            className="font-[IranNastaliq] text-sm text-[var(--gold)]"
                            dir="rtl"
                            lang="fa"
                          >
                            {event.eventFa}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== 2. RECURRING GATHERINGS ===== */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Weekly Programs"
            title="Recurring Gatherings"
            titleFa="برنامه‌های هفتگی"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(recurringCards.length > 0
              ? recurringCards
              : FALLBACK_RECURRING
            ).map((event) => (
              <div
                key={event.en}
                className="group bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-6 transition-all hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {event.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-2"
                  dir="rtl"
                  lang="fa"
                >
                  {event.fa} &mdash; {event.scheduleFa}
                </p>
                <p className="text-xs font-medium text-[var(--accent)] mb-3">
                  {event.schedule}
                </p>
                {event.desc && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {event.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
