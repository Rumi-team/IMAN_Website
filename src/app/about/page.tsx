import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GeoDivider from "@/components/GeoDivider";

export const metadata: Metadata = {
  title: "About IMAN | IMAN",
  description:
    "Learn about the Iranian-American Muslim Association of North America, our mission, history, and values serving the LA community.",
  openGraph: {
    title: "About IMAN | IMAN",
    description:
      "Learn about the Iranian-American Muslim Association of North America, our mission, history, and values serving the LA community.",
    url: "https://iman.org/about",
    siteName: "IMAN",
    type: "website",
  },
};

const values = [
  {
    en: "Faith",
    fa: "ایمان",
    desc: "Rooted in Islamic principles and guided by the teachings of the Quran and Ahlul-Bayt. We nurture spiritual growth through prayer, education, and reflection.",
  },
  {
    en: "Community",
    fa: "جامعه",
    desc: "Building bridges across generations and cultures within the Iranian-American diaspora. Our center is a home where families gather, friendships form, and bonds strengthen.",
  },
  {
    en: "Culture",
    fa: "فرهنگ",
    desc: "Celebrating the richness of Persian heritage alongside Islamic traditions. From Nowruz to Muharram, we honor the cultural tapestry that defines our identity.",
  },
];

const milestones = [
  {
    year: "1990",
    title: "Foundation",
    desc: "IMAN was established to serve the growing Iranian-American Muslim community in Los Angeles, providing a spiritual and cultural home.",
  },
  {
    year: "2005",
    title: "Community Center",
    desc: "Opened our doors at 3376 Motor Ave, creating a permanent home for worship, education, and cultural events in the heart of LA.",
  },
  {
    year: "2026",
    title: "35 Years of Service",
    desc: "Celebrating over three decades of continuous service to the community, with expanded programs for youth, families, and new arrivals.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHero title="About IMAN" titleFa="درباره ایمان" />

      {/* ===== MISSION ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Our Mission"
            title="Serving with Faith and Purpose"
            titleFa="ماموریت ما"
          />
          <div className="max-w-[800px] space-y-5">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Iranian-American Muslim Association of North America (IMAN)
              serves as a spiritual, cultural, and educational hub for the
              Iranian-American Muslim community in Los Angeles. Our mission is to
              promote Islamic values, preserve Persian cultural heritage, and
              foster a strong, connected community in the diaspora.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We provide a welcoming space for worship, learning, and
              celebration — from weekly prayers and Quran study to marriage
              ceremonies, memorial services, and cultural gatherings. IMAN is
              more than a center; it is a home where faith and culture meet, and
              where every member of the community finds belonging.
            </p>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== HISTORY ===== */}
      <section className="bg-[var(--surface)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Our History"
            title="A Legacy of Service"
            titleFa="تاریخچه"
          />
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-[800px] mb-12">
            For over three decades, IMAN has been a cornerstone of the
            Iranian-American Muslim community in Los Angeles. What began as a
            small gathering of families has grown into a vibrant cultural and
            spiritual institution serving hundreds of families across Southern
            California.
          </p>
          <div className="space-y-8">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex gap-6 items-start"
              >
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--accent)] shrink-0 w-20">
                  {m.year}
                </div>
                <div className="border-l-2 border-[var(--line)] pl-6 pb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== VALUES ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Our Values"
            title="What We Stand For"
            titleFa="ارزش‌های ما"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.en}
                className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-8 text-center"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--text)] mb-1">
                  {value.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-base text-[var(--gold)] mb-4"
                  dir="rtl"
                  lang="fa"
                >
                  {value.fa}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== LOCATION ===== */}
      <section className="bg-[var(--surface)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Visit Us"
            title="Our Location"
            titleFa="آدرس ما"
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.2!2d-118.3986!3d34.0237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba4c9e8d4a8b%3A0x4e1e3f8c9f0d5a2b!2s3376+Motor+Ave%2C+Los+Angeles%2C+CA+90034!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="IMAN Foundation Location"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text)] mb-2">
                  Address
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  3376 Motor Ave
                  <br />
                  Los Angeles, CA 90034
                </p>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text)] mb-2">
                  Office Hours
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Monday &ndash; Sunday
                  <br />
                  9:00 AM &ndash; 6:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text)] mb-2">
                  Contact
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Phone: (310) 202-8181
                  <br />
                  Fax: (310) 202-0878
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:info@iman.org"
                    className="text-[var(--accent)] hover:underline"
                  >
                    info@iman.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
