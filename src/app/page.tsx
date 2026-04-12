export const dynamic = "force-dynamic";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import PrayerCard from "@/components/PrayerCard";
import HeroCarousel from "@/components/HeroCarousel";
import GeoDivider from "@/components/GeoDivider";
import Footer from "@/components/Footer";
import WisdomCard from "@/components/WisdomCard";
import SectionHeader from "@/components/SectionHeader";
import { fetchDailyPrayers } from "@/lib/prayer-api";
import { fetchPublishedMonths, fetchPublishedMonth } from "@/lib/events";
import { fetchHeroSlides } from "@/lib/hero";
import type { PublishedEvent } from "@/lib/events";
import type { Prayer } from "@/lib/types";

const videos = [
  { id: "ZW3Q4dUxjSo", title: "Ey Iran — ای ایران", featured: true },
  { id: "gW3LaJPDePs", title: "IMAN Community Event" },
  { id: "_oRsRIP31o4", title: "IMAN Cultural Program" },
  { id: "DLExzQvCTmI", title: "IMAN Lecture Series" },
];

const galleryPhotos = [
  { src: "https://iman.org/wp-content/uploads/2020/04/IMG_8274.jpg", alt: "IMAN interfaith dialogue" },
  { src: "https://iman.org/wp-content/uploads/2020/04/MG_8435.jpg", alt: "IMAN community gathering" },
  { src: "https://iman.org/wp-content/uploads/2020/04/MG_8243.jpg", alt: "IMAN cultural event" },
  { src: "https://iman.org/wp-content/uploads/2020/04/MG_8357.jpg", alt: "IMAN community celebration" },
  { src: "https://iman.org/wp-content/uploads/2020/04/MG_8152.jpg", alt: "IMAN event program" },
  { src: "https://iman.org/wp-content/uploads/2020/04/MG_8100_test-2.jpg", alt: "IMAN community members" },
];

const services = [
  {
    en: "Weekly Classes",
    fa: "کلاس‌های هفتگی",
    desc: "Quran study, Islamic jurisprudence, and Persian language classes for all ages. Weekly gatherings that strengthen knowledge and community bonds.",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  },
  {
    en: "Marriage Services",
    fa: "خدمات ازدواج",
    desc: "Traditional Islamic marriage ceremonies (Aqd) with full cultural observance. Pre-marriage counseling and family guidance available.",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
  {
    en: "Memorial Services",
    fa: "مراسم یادبود",
    desc: "Compassionate funeral and memorial support following Islamic traditions. Community support for families during difficult times.",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3 3 5 6 5-1 4-3 8-6 12-3-4-5-8-6-12 3 0 5-2 6-5z"/><line x1="12" y1="22" x2="12" y2="19"/></svg>`,
  },
  {
    en: "Dua Kumayl",
    fa: "دعای کمیل",
    desc: "Every Thursday evening, join the community for this beloved supplication. A weekly gathering of spiritual reflection and collective prayer.",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10c0-4-3.6-7-8-7S2 6 2 10c0 5 8 12 8 12s2-1.8 4-4.5"/><path d="M22 10c0-4-3.6-7-8-7"/></svg>`,
  },
];

const EVENT_COLORS = ["bg-[var(--accent)]", "bg-[var(--lapis)]", "bg-[var(--cypress)]"];

const FALLBACK_EVENTS = [
  {
    day: "—",
    month: "",
    title: "Dua Kumayl",
    fa: "دعای کمیل",
    time: "Every Thursday, 7:30 PM",
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

function publishedToDisplayEvents(published: PublishedEvent[]) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentDay = now.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[now.getMonth()];

  return published
    .filter((e) => e.day >= currentDay)
    .slice(0, 3)
    .map((e, i) => ({
      day: String(e.day).padStart(2, "0"),
      month: currentMonthName,
      title: e.eventEn,
      fa: e.eventFa,
      time: "",
      desc: "",
      color: EVENT_COLORS[i % EVENT_COLORS.length],
    }));
}

function to12Hour(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  if (isNaN(h)) return time24;
  const suffix = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${suffix}`;
}

export default async function Home() {
  const laDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentYear = laDate.getFullYear();
  const currentMonth = laDate.getMonth() + 1;
  const currentDay = laDate.getDate();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateStr = `${dayNames[laDate.getDay()]}, ${monthNames[currentMonth]} ${currentDay}, ${currentYear}`;

  let prayers: Prayer[] = [];
  let date = { gregorian: dateStr, shamsi: "", hijri: "" };

  // Try admin-uploaded prayer times first (single source of truth)
  try {
    const published = await fetchPublishedMonth(currentYear, currentMonth);
    if (published?.prayerTimes) {
      const todayTimes = published.prayerTimes.find((pt) => pt.day === currentDay);
      if (todayTimes) {
        prayers = [
          { en: "Fajr", fa: "اذان صبح", time: to12Hour(todayTimes.fajr) },
          { en: "Sunrise", fa: "طلوع آفتاب", time: to12Hour(todayTimes.sunrise) },
          { en: "Dhuhr", fa: "اذان ظهر", time: to12Hour(todayTimes.dhuhr) },
          { en: "Asr", fa: "نماز عصر", time: to12Hour(todayTimes.asr) },
          { en: "Maghrib", fa: "اذان مغرب", time: to12Hour(todayTimes.maghrib) },
          { en: "Isha", fa: "نماز عشا", time: to12Hour(todayTimes.isha) },
        ];
      }
    }
  } catch {
    // Published data unavailable
  }

  // Fall back to Aladhan API if no admin data
  if (prayers.length === 0) {
    try {
      const data = await fetchDailyPrayers();
      prayers = data.prayers;
      date = { gregorian: data.date.gregorian, shamsi: "", hijri: "" };
    } catch {
      // Prayer API down too
    }
  }

  let dynamicEvents: ReturnType<typeof publishedToDisplayEvents> = [];
  try {
    const months = await fetchPublishedMonths();
    if (months.length > 0 && months[0].events?.length > 0) {
      dynamicEvents = publishedToDisplayEvents(months[0].events);
    }
  } catch {
    // Blob fetch failed — use fallback
  }

  const events = dynamicEvents.length > 0 ? dynamicEvents : FALLBACK_EVENTS;

  let heroSlides: Awaited<ReturnType<typeof fetchHeroSlides>> = [];
  try {
    heroSlides = await fetchHeroSlides();
  } catch {
    // Blob fetch failed — carousel shows girih fallback
  }

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <HeroCarousel slides={heroSlides} />

      {/* ===== PRAYER TIMES + DAILY WISDOM ===== */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {prayers.length > 0 ? (
              <PrayerCard prayers={prayers} date={date} />
            ) : (
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6 shadow-lg flex items-center justify-center text-[var(--text-secondary)]">
                Prayer times temporarily unavailable
              </div>
            )}
            <WisdomCard />
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-[var(--surface)] py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">
              Our Services
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-normal text-[var(--text)] mb-2">
              Serving the Community
            </h2>
            <p
              className="font-[IranNastaliq] text-lg text-[var(--gold)]"
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
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1 flex items-center gap-2">
                  <span className="text-[var(--accent)] shrink-0" dangerouslySetInnerHTML={{ __html: service.icon }} />
                  {service.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-3"
                  dir="rtl"
                >
                  {service.fa}
                </p>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {service.desc}
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 text-sm font-semibold text-[var(--accent)] tracking-wide"
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
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">
              Upcoming Events
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-normal text-[var(--text)] mb-2">
              What&apos;s Happening at IMAN
            </h2>
            <p
              className="font-[IranNastaliq] text-lg text-[var(--gold)]"
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
                    className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-3"
                    dir="rtl"
                  >
                    {event.fa}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    {event.time}
                  </p>
                  <p className="text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
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
        className="bg-[var(--text)] text-[var(--bg)] py-12 relative overflow-hidden"
      >
        <div className="girih-pattern" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="font-[IranNastaliq] text-2xl text-[var(--gold)] mb-6"
                dir="rtl"
                style={{ lineHeight: 2.4 }}
              >
                درهای ما همیشه باز است
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-normal text-[var(--bg)] mb-4">
                Join the IMAN Community
              </h2>
              <p className="text-[var(--surface-2)] leading-relaxed mb-8">
                Our door is always open for new members. Visit our center,
                attend our events and classes, and find your community in Los
                Angeles. We are here to support, connect, and grow together.
              </p>
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

      {/* ===== VIDEOS ===== */}
      <section className="bg-[var(--surface)] py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Watch"
            title="From Our Community"
            titleFa="از جامعه ما"
          />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
            {/* Featured video */}
            <div className="rounded-lg overflow-hidden shadow-md aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].id}`}
                title={videos[0].title}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            {/* Side stack */}
            <div className="flex flex-col gap-5">
              {videos.slice(1).map((video) => (
                <div
                  key={video.id}
                  className="rounded-lg overflow-hidden shadow-sm aspect-video"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== GALLERY ===== */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Gallery"
            title="Life at IMAN"
            titleFa="زندگی در ایمان"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          {/* Iran map + cultural element */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square max-w-[500px] mx-auto lg:mx-0">
              <Image
                src="/iran-map.png"
                alt="Illustrated map of Iran showing historic landmarks and mosques"
                fill
                sizes="500px"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--text)] mb-2">
                Bridging Cultures
              </h3>
              <p
                className="font-[IranNastaliq] text-lg text-[var(--gold)] mb-4"
                dir="rtl"
                lang="fa"
              >
                پلی میان فرهنگ‌ها
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                IMAN connects the rich heritage of Iranian civilization with the vibrant
                Iranian-American community in Los Angeles. Through cultural events, educational
                programs, and community gatherings, we preserve our traditions while building
                bridges across cultures and faiths.
              </p>
              <a
                href="/about"
                className="inline-block text-sm font-semibold text-[var(--accent)] tracking-wide"
              >
                Learn About Our History &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
