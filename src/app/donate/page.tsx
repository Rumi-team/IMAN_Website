import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GeoDivider from "@/components/GeoDivider";

export const metadata: Metadata = {
  title: "Donate | IMAN",
  description:
    "Support IMAN Foundation with a tax-deductible donation. Help us serve the Iranian-American Muslim community in Los Angeles.",
  openGraph: {
    title: "Donate | IMAN",
    description:
      "Support IMAN Foundation with a tax-deductible donation. Help us serve the Iranian-American Muslim community in Los Angeles.",
    url: "https://iman.org/donate",
    siteName: "IMAN",
    type: "website",
  },
};

const stats = [
  { number: "500+", label: "Families Served", fa: "خانواده" },
  { number: "52", label: "Weekly Programs", fa: "برنامه هفتگی" },
  { number: "35+", label: "Years of Service", fa: "سال خدمت" },
];

const otherWays = [
  {
    en: "Volunteer",
    fa: "داوطلب",
    desc: "Join our volunteer team and contribute your time and skills. From event coordination to teaching, there are many ways to help.",
  },
  {
    en: "In-Kind Donations",
    fa: "کمک‌های غیر نقدی",
    desc: "Donate supplies, food, equipment, or other resources. Contact our office to learn about current needs and drop-off details.",
  },
];

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <PageHero title="Support IMAN" titleFa="حمایت از ایمان" />

      {/* ===== WHY DONATE ===== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Your Impact"
            title="Why Your Support Matters"
            titleFa="تاثیر شما"
          />
          <div className="max-w-[800px] space-y-5 mb-16">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              For over 35 years, IMAN has been a home for the Iranian-American
              Muslim community in Los Angeles. Your generous contributions help
              us maintain our center, expand our programs, and serve families in
              need. Every donation directly supports our educational programs,
              community services, and cultural events.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              From weekly Quran classes and youth programs to memorial services
              and counseling, your support ensures that these essential services
              continue for generations to come. Together, we build a stronger,
              more connected community.
            </p>
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-8 text-center"
              >
                <div className="font-[family-name:var(--font-display)] text-4xl font-medium text-[var(--accent)] leading-none mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-[var(--text)] mb-1">
                  {stat.label}
                </div>
                <div
                  className="font-[IranNastaliq] text-xs text-[var(--gold)]"
                  dir="rtl"
                  lang="fa"
                >
                  {stat.fa}
                </div>
              </div>
            ))}
          </div>

          {/* Donate CTA */}
          <div className="bg-[var(--text)] text-[var(--bg)] rounded-xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="girih-pattern" />
            <div className="relative z-10">
              <h3 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--bg)] mb-3">
                Make a Difference Today
              </h3>
              <p
                className="font-[IranNastaliq] text-lg text-[var(--gold)] mb-6"
                dir="rtl"
                lang="fa"
              >
                حمایت مالی
              </p>
              <a
                href="#"
                className="inline-block bg-[var(--gold)] text-[var(--text)] px-10 py-4 rounded text-base font-semibold tracking-wide hover:bg-[var(--gold-light)] transition-colors"
              >
                Donate Now
              </a>
              <p className="text-sm text-[var(--surface-2)] mt-6 max-w-[500px] mx-auto">
                IMAN Foundation is a 501(c)(3) tax-exempt organization. Your
                donation is tax-deductible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== OTHER WAYS ===== */}
      <section className="bg-[var(--surface)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="Get Involved"
            title="Other Ways to Help"
            titleFa="راه‌های دیگر کمک"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherWays.map((item) => (
              <div
                key={item.en}
                className="group bg-[var(--bg)] border border-[var(--line-light)] rounded-lg p-6 transition-all hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {item.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-3"
                  dir="rtl"
                  lang="fa"
                >
                  {item.fa}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-4 text-xs font-semibold text-[var(--accent)] tracking-wide"
                >
                  Contact Us &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
