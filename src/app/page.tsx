import Navbar from "@/components/Navbar";
import PrayerCard from "@/components/PrayerCard";
import GeoDivider from "@/components/GeoDivider";
import Footer from "@/components/Footer";
import { fetchDailyPrayers } from "@/lib/prayer-api";

const services = [
  {
    en: "Weekly Classes",
    fa: "\u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u0647\u0641\u062A\u06AF\u06CC",
    desc: "Quran study, Islamic jurisprudence, and Persian language classes for all ages. Weekly gatherings that strengthen knowledge and community bonds.",
  },
  {
    en: "Marriage Services",
    fa: "\u062E\u062F\u0645\u0627\u062A \u0627\u0632\u062F\u0648\u0627\u062C",
    desc: "Traditional Islamic marriage ceremonies (Aqd) with full cultural observance. Pre-marriage counseling and family guidance available.",
  },
  {
    en: "Memorial Services",
    fa: "\u0645\u0631\u0627\u0633\u0645 \u06CC\u0627\u062F\u0628\u0648\u062F",
    desc: "Compassionate funeral and memorial support following Islamic traditions. Community support for families during difficult times.",
  },
  {
    en: "Dua Kumayl",
    fa: "\u062F\u0639\u0627\u06CC \u06A9\u0645\u06CC\u0644",
    desc: "Every Thursday evening, join the community for this beloved supplication. A weekly gathering of spiritual reflection and collective prayer.",
  },
];

const events = [
  {
    day: "27",
    month: "March",
    title: "Eid al-Fitr Celebration",
    fa: "\u0639\u06CC\u062F \u0633\u0639\u06CC\u062F \u0641\u0637\u0631",
    time: "Friday, 9:00 AM - 1:00 PM",
    desc: "Join us for Eid prayers followed by community breakfast and celebrations for all ages.",
    color: "bg-[var(--accent)]",
  },
  {
    day: "28",
    month: "March",
    title: "Nowruz Gathering",
    fa: "\u062C\u0634\u0646 \u0646\u0648\u0631\u0648\u0632 \u06F1\u06F4\u06F0\u06F5",
    time: "Saturday, 5:00 PM - 9:00 PM",
    desc: "Celebrate the Persian New Year with traditional Haft-Sin, music, poetry, and community dinner.",
    color: "bg-[var(--lapis)]",
  },
  {
    day: "03",
    month: "April",
    title: "Dua Kumayl",
    fa: "\u062F\u0639\u0627\u06CC \u06A9\u0645\u06CC\u0644",
    time: "Thursday, 7:30 PM",
    desc: "Weekly Thursday evening supplication followed by community fellowship.",
    color: "bg-[var(--cypress)]",
  },
];

const stats = [
  { number: "35+", label: "Years Serving LA" },
  { number: "500+", label: "Active Members" },
  { number: "52", label: "Weekly Programs" },
  { number: "2", label: "Languages" },
];

export default async function Home() {
  const { prayers, date } = await fetchDailyPrayers();

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[600px]">
        <div className="girih-pattern" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p
                className="font-[family-name:var(--font-nastaliq)] text-xl text-[var(--gold)] opacity-85 mb-4"
                dir="rtl"
              >
                بسم الله الرحمن الرحیم
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-4xl lg:text-6xl font-normal leading-[1.15] text-[var(--text)] mb-4">
                A Home for <em className="text-[var(--accent)] font-medium">Faith</em>,
                <br />
                Culture &amp; Community
              </h1>
              <p
                className="font-[family-name:var(--font-farsi)] text-lg text-[var(--text-secondary)] mb-6"
                dir="rtl"
                style={{ lineHeight: 2 }}
              >
                خانه‌ای برای ایمان، فرهنگ و اجتماع
              </p>
              <p className="text-lg text-[var(--text-secondary)] max-w-[520px] mb-8">
                Serving the Iranian-American Muslim community in Los Angeles
                since 1990. Join us for prayer, learning, and celebration.
              </p>
              <div className="flex gap-4">
                <a
                  href="#community"
                  className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Join Our Community
                </a>
                <a
                  href="/about"
                  className="inline-block border-[1.5px] border-[var(--line)] text-[var(--text)] px-6 py-3 rounded text-sm font-semibold tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Prayer Card */}
            <PrayerCard prayers={prayers} date={date} />
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-[var(--surface)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">
              Our Services
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--text)] mb-2">
              Serving the Community
            </h2>
            <p
              className="font-[family-name:var(--font-farsi)] text-lg text-[var(--gold)]"
              dir="rtl"
            >
              در خدمت جامعه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service.en}
                className="group bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-6 transition-all hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {service.en}
                </h3>
                <p
                  className="font-[family-name:var(--font-farsi)] text-sm text-[var(--gold)] mb-3"
                  dir="rtl"
                >
                  {service.fa}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {service.desc}
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 text-xs font-semibold text-[var(--accent)] tracking-wide"
                >
                  Learn More &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== EVENTS ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">
              Upcoming Events
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--text)] mb-2">
              What&apos;s Happening at IMAN
            </h2>
            <p
              className="font-[family-name:var(--font-farsi)] text-lg text-[var(--gold)]"
              dir="rtl"
            >
              رویدادهای پیش رو
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((event) => (
              <div
                key={event.title}
                className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
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

      {/* ===== COMMUNITY CTA ===== */}
      <section
        id="community"
        className="bg-[var(--text)] text-[var(--bg)] py-24 relative overflow-hidden"
      >
        <div className="girih-pattern" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="font-[family-name:var(--font-nastaliq)] text-2xl text-[var(--gold)] mb-6"
                dir="rtl"
                style={{ lineHeight: 2.4 }}
              >
                درهای ما همیشه باز است
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--bg)] mb-4">
                Join the IMAN Community
              </h2>
              <p className="text-[var(--surface-2)] leading-relaxed mb-8">
                Our door is always open for new members. Visit our center,
                attend our events and classes, and find your community in Los
                Angeles. We are here to support, connect, and grow together.
              </p>
              <a
                href="#"
                className="inline-block bg-[var(--gold)] text-[var(--text)] px-8 py-3 rounded text-sm font-semibold tracking-wide hover:bg-[var(--gold-light)] transition-colors"
              >
                Become a Member
              </a>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 border border-white/10 rounded-lg"
                >
                  <div className="font-[family-name:var(--font-display)] text-4xl font-medium text-[var(--gold)] leading-none mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[var(--surface-2)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
