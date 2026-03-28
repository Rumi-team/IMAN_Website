import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GeoDivider from "@/components/GeoDivider";

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

const recurring = [
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

const specialEvents = [
  {
    day: "27",
    month: "March",
    title: "Eid al-Fitr Celebration",
    fa: "عید سعید فطر",
    time: "Friday, 9:00 AM - 1:00 PM",
    desc: "Join us for Eid prayers followed by community breakfast and celebrations for all ages.",
    color: "bg-[var(--accent)]",
  },
  {
    day: "28",
    month: "March",
    title: "Nowruz 1405 Gathering",
    fa: "نوروز ۱۴۰۵",
    time: "Saturday, 5:00 PM - 9:00 PM",
    desc: "Celebrate the Persian New Year with traditional Haft-Sin, music, poetry, and community dinner.",
    color: "bg-[var(--lapis)]",
  },
  {
    day: "27",
    month: "May",
    title: "Eid al-Adha",
    fa: "عید قربان",
    time: "Wednesday, 9:00 AM - 1:00 PM",
    desc: "Celebration of Eid al-Adha with congregational prayers, community feast, and charitable giving. 10 Dhul Hijjah 1447.",
    color: "bg-[var(--accent)]",
  },
  {
    day: "16",
    month: "June",
    title: "Muharram Commemoration",
    fa: "محرم",
    time: "Tuesday — Programs throughout the month",
    desc: "Annual Muharram programs honoring the legacy of Imam Hussain with lectures, majlis, and community gatherings. 1 Muharram 1448.",
    color: "bg-[var(--cypress)]",
  },
  {
    day: "25",
    month: "June",
    title: "Tasu'a & Ashura",
    fa: "تاسوعا و عاشورا",
    time: "Thursday & Friday",
    desc: "Commemoration of the martyrdom of Imam Hussain (AS). Majlis, mourning programs, and community gathering. 9-10 Muharram 1448.",
    color: "bg-[var(--lapis)]",
  },
  {
    day: "26",
    month: "July",
    title: "Arba'een",
    fa: "اربعین",
    time: "Sunday — Special program",
    desc: "The 40th day after the martyrdom of Imam Hussain. Community walk, lectures, and remembrance. 20 Safar 1448.",
    color: "bg-[var(--cypress)]",
  },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <PageHero title="Upcoming Events" titleFa="رویدادهای پیش رو" />

      {/* ===== RECURRING ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Weekly Programs"
            title="Recurring Gatherings"
            titleFa="برنامه‌های هفتگی"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recurring.map((event) => (
              <div
                key={event.en}
                className="group bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-6 transition-all hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {event.en}
                </h3>
                <p
                  className="font-[family-name:var(--font-farsi)] text-sm text-[var(--gold)] mb-2"
                  dir="rtl"
                  lang="fa"
                >
                  {event.fa} &mdash; {event.scheduleFa}
                </p>
                <p className="text-xs font-medium text-[var(--accent)] mb-3">
                  {event.schedule}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== SPECIAL EVENTS ===== */}
      <section className="bg-[var(--surface)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Special Events"
            title="Celebrations &amp; Commemorations"
            titleFa="مراسم ویژه"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialEvents.map((event) => (
              <div
                key={event.title}
                className="bg-[var(--bg)] border border-[var(--line-light)] rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className={`${event.color} text-white p-4 text-center`}
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-none">
                    {event.day}
                  </div>
                  <div className="text-xs font-medium tracking-widest uppercase opacity-90">
                    {event.month}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text)] mb-1">
                    {event.title}
                  </h4>
                  <p
                    className="font-[family-name:var(--font-farsi)] text-sm text-[var(--gold)] mb-3"
                    dir="rtl"
                    lang="fa"
                  >
                    {event.fa}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    {event.time}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
