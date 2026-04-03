import Image from "next/image";
import Navbar from "@/components/Navbar";
import PrayerCard from "@/components/PrayerCard";
import GeoDivider from "@/components/GeoDivider";
import Footer from "@/components/Footer";
import DailyWisdom from "@/components/DailyWisdom";
import SectionHeader from "@/components/SectionHeader";
import { fetchDailyPrayers } from "@/lib/prayer-api";

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
  },
  {
    en: "Marriage Services",
    fa: "خدمات ازدواج",
    desc: "Traditional Islamic marriage ceremonies (Aqd) with full cultural observance. Pre-marriage counseling and family guidance available.",
  },
  {
    en: "Memorial Services",
    fa: "مراسم یادبود",
    desc: "Compassionate funeral and memorial support following Islamic traditions. Community support for families during difficult times.",
  },
  {
    en: "Dua Kumayl",
    fa: "دعای کمیل",
    desc: "Every Thursday evening, join the community for this beloved supplication. A weekly gathering of spiritual reflection and collective prayer.",
  },
];

const events = [
  {
    day: "20",
    month: "March",
    title: "Eid al-Fitr Celebration",
    fa: "عید سعید فطر",
    time: "Friday, 9:00 AM - 1:00 PM",
    desc: "Join us for Eid prayers followed by community breakfast and celebrations for all ages.",
    color: "bg-[var(--accent)]",
  },
  {
    day: "20",
    month: "March",
    title: "Nowruz Gathering",
    fa: "جشن نوروز ۱۴۰۵",
    time: "Saturday, 5:00 PM - 9:00 PM",
    desc: "Celebrate the Persian New Year with traditional Haft-Sin, music, poetry, and community dinner.",
    color: "bg-[var(--lapis)]",
  },
  {
    day: "03",
    month: "April",
    title: "Dua Kumayl",
    fa: "دعای کمیل",
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
          <div className="flex flex-col items-center text-center">
            <p
              className="font-[IranNastaliq] text-xl text-[var(--gold)] opacity-85 mb-4"
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
              className="font-[IranNastaliq] text-lg text-[var(--text-secondary)] mb-6"
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
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {service.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-3"
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
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEOS ===== */}
      <section className="bg-[var(--surface)] py-24">
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
      <section className="py-24">
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
                src="/iran-map.jpg"
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

      <GeoDivider />

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
                className="font-[IranNastaliq] text-2xl text-[var(--gold)] mb-6"
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

      <DailyWisdom />

      <Footer />
    </>
  );
}
